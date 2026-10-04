# Clasificados Platform/Posteate

Plataforma de clasificados e información local — un "centro digital" para una ciudad,
partiendo por Melipilla, Chile, con miras a expandirse a otras comunas. Permite publicar
y descubrir arriendos, venta de propiedades, artículos usados, vehículos, empleos,
servicios, eventos, noticias locales, mascotas perdidas/en adopción, objetos
perdidos/encontrados, promociones de negocios y avisos comunitarios.

Cada publicación es estructurada (título, descripción, fotos, precio opcional, ubicación,
categoría/subcategoría, estado, fechas de publicación/expiración y contacto) y se puede
encontrar por buscador, categorías, filtros, ordenamiento y ubicación geográfica.

## Estructura del monorepo

```
posteate/
├── frontend/          # Next.js + TypeScript + Yarn
├── backend/            # Django REST Framework + uv + Pyright
├── docker-compose.yml  # Postgres local
└── README.md
```

### Backend (`backend/`)

```
backend/
├── core/               # Configuración del proyecto Django (settings, urls)
├── usuarios/           # Usuario extendido (AbstractUser) con info de contacto/perfil
├── ubicaciones/        # Ciudad y Comuna (pensado para expansión multi-ciudad)
├── categorias/         # Categoria y Subcategoria
├── publicaciones/      # Publicacion e ImagenPublicacion (modelo central)
├── pyrightconfig.json
├── pyproject.toml
├── .env / .env.example
└── manage.py
```

### Frontend (`frontend/`)

```
frontend/src/
├── app/
│   └── publicaciones/[categoria]/page.tsx
│   └── publicaciones/[categoria]/[slug]/page.tsx
├── features/
│   ├── publicaciones/ (components, hooks, types.ts)
│   └── categorias/    (components, hooks, types.ts)
└── lib/
    └── api.ts
```

## Cómo levantar el proyecto

### 1. Base de datos (Postgres)

```bash
docker compose up -d
```

### 2. Backend (Django + uv)

```bash
cd backend
uv run manage.py migrate
uv run manage.py runserver
```

La API queda disponible en `http://localhost:8000/api/`.

### 3. Frontend (Next.js + Yarn)

```bash
cd frontend
yarn dev
```

El sitio queda disponible en `http://localhost:3000`.

## Variables de entorno

- `backend/.env.example` → copiar a `backend/.env` y ajustar según sea necesario.
- `frontend/.env.local.example` → copiar a `frontend/.env.local` y ajustar según sea necesario.


# Posteate — Claude Code configuration

Copy the contents of this package into the root of the Posteate repository.

Expected result:

```text
posteate/
├── CLAUDE.md
├── .claude/
│   ├── agents/
│   ├── skills/
│   └── settings.json
└── docs/
    ├── product/
    └── technical/
```

The configuration intentionally leaves several decisions as TBD:
authentication, object storage, deployment, CI/CD, API type generation and some MVP policies.

After copying the files, start Claude Code from the repository root and verify the configuration with:

- `/memory`
- `/agents`
- `/skills`
- `/permissions`
- `/doctor`

Do not commit `.claude/settings.local.json` if Claude Code creates it; it is intended for local/personal overrides.
