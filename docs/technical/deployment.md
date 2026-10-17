# Deployment

Estado: `develop` se despliega activamente para detectar errores que solo
aparecen en producción, antes de mergear a `main`.

- **Frontend** → Vercel (detecta Next.js solo, root directory `frontend`).
- **Backend** → Render (`render.yaml` en la raíz del repo, Web Service + Postgres).
- **Imágenes** → Cloudinary (ver más abajo).
- **Base de datos** → Postgres administrado por Render en producción; Postgres local en desarrollo.

## Por qué frontend y backend están en dominios distintos

Vercel (`*.vercel.app`) y Render (`*.onrender.com`) son dominios completamente
distintos — esto es **cross-site**, no solo cross-origin como pasa en local
(`localhost:3000` ↔ `localhost:8000`, que el navegador sí trata como "mismo sitio").

El login usa `SessionAuthentication` de Django (cookie de sesión + CSRF). Para que
esa cookie viaje en los `fetch`/`axios` del frontend hacia el backend entre dos
sitios distintos, el navegador exige `SameSite=None` + `Secure=True` en la cookie.
Sin esto, el login funcionaría en local pero fallaría en producción de forma
silenciosa (exactamente el tipo de error que esto busca atrapar temprano).

Por eso `SESSION_COOKIE_SAMESITE` / `CSRF_COOKIE_SAMESITE` quedan en `"Lax"` por
default (correcto en local) y se pasan a `"None"` solo vía variables de entorno
en Render (ver `render.yaml`).

## Variables de entorno

Todas están documentadas con sus defaults en `backend/.env.example`. Las de
producción (`SECURE_SSL_REDIRECT`, `SESSION_COOKIE_SECURE`, etc.) **no deben
activarse en local** — requieren HTTPS real, y en local siguen en `False`/`Lax`
porque no hay HTTPS.

### Variables que hay que cargar a mano en Render (nunca van en `render.yaml`)

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### Variables con placeholder en `render.yaml` que hay que ajustar

- `ALLOWED_HOSTS` → dominio real que Render asigne al servicio.
- `CORS_ALLOWED_ORIGINS` / `CSRF_TRUSTED_ORIGINS` → dominio real del proyecto en Vercel.

## Pasos para el primer deploy

### Backend (Render)

1. En el dashboard de Render: **New → Blueprint**, conectar el repo, apuntar a `render.yaml`.
2. Render crea solo el Web Service + la base de datos Postgres (`posteate-db`) y
   conecta `DATABASE_URL` automáticamente.
3. Cargar a mano las 3 variables de Cloudinary (arriba).
4. Ajustar `ALLOWED_HOSTS`/`CORS_ALLOWED_ORIGINS`/`CSRF_TRUSTED_ORIGINS` una vez
   que se conozcan los dominios reales de Render y Vercel.
5. El build corre `uv sync`, `collectstatic` y `migrate` automáticamente
   (ver `buildCommand` en `render.yaml`).

### Frontend (Vercel)

1. **New Project**, importar el repo, **Root Directory: `frontend`**.
2. Variable de entorno `NEXT_PUBLIC_API_URL` = `https://<dominio-de-render>/api`.
3. Vercel detecta Next.js automáticamente, no hace falta configurar build command.

## Static files (backend)

Render no sirve archivos estáticos de Django por sí solo. Se usa **WhiteNoise**
(`whitenoise.middleware.WhiteNoiseMiddleware` + `CompressedManifestStaticFilesStorage`)
para servirlos directo desde el mismo proceso de Django, sin necesitar un
servicio/CDN aparte. `collectstatic` corre como parte del build.

Las imágenes de publicaciones/avatares **no** pasan por esto — van a Cloudinary
(`STORAGES["default"]`), completamente aparte de los estáticos.

## Proxy HTTPS de Render

Render termina el HTTPS en su load balancer y reenvía por HTTP interno al
contenedor. Sin `SECURE_PROXY_SSL_HEADER` configurado, Django no se entera de
que la conexión original era HTTPS y, con `SECURE_SSL_REDIRECT=True`, entra en
un loop infinito de redirects. Ya está configurado en `settings.py`
(`SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")`) — no tocar
sin entender esto primero.

## HSTS: por qué `SECURE_HSTS_INCLUDE_SUBDOMAINS` y `SECURE_HSTS_PRELOAD` quedan en False

`manage.py check --deploy` los va a seguir marcando como warning aunque actives
`SECURE_HSTS_SECONDS`. Es intencional: `PRELOAD` en particular es casi
irreversible (una vez que el dominio entra a la lista de precarga de los
navegadores, sacarlo toma meses). Activar cuando haya certeza de que **todo**
el dominio y sus subdominios van a vivir siempre en HTTPS.

## gunicorn no corre en Windows

`gunicorn` depende de `fcntl` (módulo exclusivo de Unix) para manejar procesos
y señales — no es compatible con Windows, punto. En desarrollo local se sigue
usando `python manage.py runserver`. En Render (Linux) `gunicorn core.wsgi:application`
corre sin problema — es el `startCommand` en `render.yaml`.

## Pre-deploy checks (`backend/Makefile`)

```bash
make pre-deploy
```

Corre, en orden: `check --deploy`, `collectstatic --dry-run`, `migrate --check`,
`pyright`, `ruff check`, `manage.py test`.

**Windows**: `make` no viene instalado con Git for Windows. Instalar con
`choco install make`, o correr los comandos del `Makefile` uno por uno
directamente (están listados ahí, son simples).

**PowerShell**: los comandos de Django hay que correrlos como
`python manage.py <comando>` (o `.venv\Scripts\python.exe manage.py <comando>`),
nunca `.\manage.py <comando>` directo — PowerShell no ejecuta nada desde el
directorio actual sin ruta explícita, por diseño (no es un error del proyecto).

### Estado actual de `make test`

Hoy corre 0 tests (`Ran 0 tests`) — las apps tienen `tests.py` vacíos (boilerplate
de Django), todavía no se escribió ningún test real. El target pasa igual
porque "0 tests" no es un fallo para Django, pero es un hueco real pendiente
(ver sección 10 del `CLAUDE.md`, "Testing is required").
