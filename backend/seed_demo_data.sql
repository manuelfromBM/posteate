-- Datos de prueba para Posteate
-- Pensado para pegar completo en el Query Tool de pgAdmin, conectado a la BD "posteate_db".
-- Todo va dentro de una transaccion: si algo falla, no se aplica nada (seguro reintentar tras corregir).
-- Respeta los IDs ya existentes (categorias 1-3, comuna 1-5, sector 1, usuario 1, publicacion 1).

BEGIN;

-- =========================================================
-- CATEGORIAS (completa las 12 del catalogo MVP que faltaban)
-- =========================================================
INSERT INTO categorias_categoria (id, nombre, slug, icono, orden) VALUES
  (4,  'Compra y venta',               'compra-y-venta',              'shopping-bag',  4),
  (5,  'Vehículos',                    'vehiculos',                   'car',           5),
  (6,  'Servicios',                    'servicios',                   'wrench',        6),
  (7,  'Eventos',                      'eventos',                     'party-popper',  7),
  (8,  'Mascotas',                     'mascotas',                    'paw-print',     8),
  (9,  'Perdidos y encontrados',       'perdidos-y-encontrados',      'search',        9),
  (10, 'Promociones',                  'promociones',                 'tag',          10),
  (11, 'Avisos comunitarios',          'avisos-comunitarios',         'megaphone',    11),
  (12, 'Noticias / información local', 'noticias-informacion-local',  'newspaper',    12),
  (13, 'Otros',                        'otros',                       'sparkles',     13);

-- =========================================================
-- SUBCATEGORIAS
-- =========================================================
INSERT INTO categorias_subcategoria (id, categoria_id, nombre, slug) VALUES
  (6,  4, 'Electrónica',          'electronica'),
  (7,  4, 'Ropa',                 'ropa'),
  (8,  5, 'Autos',                'autos'),
  (9,  5, 'Motos',                'motos'),
  (10, 6, 'Gasfitería',           'gasfiteria'),
  (11, 6, 'Clases particulares',  'clases-particulares'),
  (12, 8, 'Perros',               'perros'),
  (13, 8, 'Gatos',                'gatos');

-- =========================================================
-- SECTORES (Melipilla tenía solo "Galilea"; sumamos mas variedad
-- y un sector "centro" por cada otra comuna para probar el filtro)
-- =========================================================
INSERT INTO ubicaciones_sector (id, nombre, comuna_id, slug) VALUES
  (2, 'Centro',          1, 'centro'),
  (3, 'San Manuel',      1, 'san-manuel'),
  (4, 'Las Mercedes',    1, 'las-mercedes'),
  (5, 'Popeta',          1, 'popeta'),
  (6, 'Centro',          2, 'centro-maria-pinto'),
  (7, 'Centro',          3, 'centro-curacavi'),
  (8, 'Centro',          4, 'centro-san-pedro'),
  (9, 'Centro',          5, 'centro-alhue');

-- =========================================================
-- USUARIOS DEMO
-- Password para TODOS: Posteate2026!  (hash real de Django, sirve para login)
-- =========================================================
INSERT INTO usuarios_usuario
  (id, password, last_login, is_superuser, username, first_name, last_name, email,
   is_staff, is_active, date_joined, telefono, whatsapp, direccion, avatar, fecha_nacimiento)
VALUES
  (2, 'pbkdf2_sha256$1200000$5KZSOjihhmXcXr7z3Mt5XW$Fn45RVOTrOQmENb0J9PUF3cFtt4xz6NdVFtCt8wXZwM=',
   NULL, false, 'camila', 'Camila', 'Rojas', 'camila@example.com',
   false, true, NOW() - INTERVAL '40 days', '+56 9 1234 5678', '+56 9 1234 5678', 'Melipilla', NULL, NULL),

  (3, 'pbkdf2_sha256$1200000$5KZSOjihhmXcXr7z3Mt5XW$Fn45RVOTrOQmENb0J9PUF3cFtt4xz6NdVFtCt8wXZwM=',
   NULL, false, 'jorge', 'Jorge', 'Soto', 'jorge@example.com',
   false, true, NOW() - INTERVAL '35 days', '', '', 'Melipilla', NULL, NULL),

  (4, 'pbkdf2_sha256$1200000$5KZSOjihhmXcXr7z3Mt5XW$Fn45RVOTrOQmENb0J9PUF3cFtt4xz6NdVFtCt8wXZwM=',
   NULL, false, 'valentina', 'Valentina', 'Muñoz', 'valentina@example.com',
   false, true, NOW() - INTERVAL '20 days', '+56 9 2222 3333', '+56 9 2222 3333', 'Melipilla', NULL, NULL),

  (5, 'pbkdf2_sha256$1200000$5KZSOjihhmXcXr7z3Mt5XW$Fn45RVOTrOQmENb0J9PUF3cFtt4xz6NdVFtCt8wXZwM=',
   NULL, false, 'distribuidora_mp', 'Distribuidora', 'MP', 'contacto@distribuidoramp.cl',
   false, true, NOW() - INTERVAL '60 days', '+56 9 8765 4321', '', 'Melipilla', NULL, NULL),

  (6, 'pbkdf2_sha256$1200000$5KZSOjihhmXcXr7z3Mt5XW$Fn45RVOTrOQmENb0J9PUF3cFtt4xz6NdVFtCt8wXZwM=',
   NULL, false, 'sofia', 'Sofía', 'Lagos', 'sofia@example.com',
   false, true, NOW() - INTERVAL '10 days', '+56 9 5555 1111', '+56 9 5555 1111', 'Melipilla', NULL, NULL);

-- =========================================================
-- PUBLICACIONES (22 nuevas, cubren las 13 categorias, varias
-- comunas/sectores/estados/precios para probar filtros y busqueda)
-- =========================================================
INSERT INTO publicaciones_publicacion
  (id, titulo, slug, descripcion, categoria_id, subcategoria_id, precio, recompensa, estado,
   comuna_id, sector_id, usuario_id, fecha_publicacion, fecha_expiracion, contacto)
VALUES
  (2, 'Arriendo pieza amoblada cerca del centro', 'arriendo-pieza-amoblada-cerca-del-centro',
   'Pieza amoblada, baño compartido, incluye wifi y acceso a cocina.',
   1, 1, 180000, NULL, 'activo', 1, 2, 2, NOW() - INTERVAL '5 days', NULL, '+56 9 1234 5678'),

  (3, 'Se busca vendedora para local de ropa', 'se-busca-vendedora-para-local-de-ropa',
   'Media jornada, turno tarde. Se valora experiencia en atención de público.',
   3, 4, NULL, NULL, 'activo', 1, 3, 3, NOW() - INTERVAL '6 days', NULL, 'jorge@example.com'),

  (4, 'Se perdió gato gris cerca de Manuel Rodríguez', 'se-perdio-gato-gris-cerca-de-manuel-rodriguez',
   'Es muy tímido, responde al nombre de "Ceniza". Última vez visto cerca de la plaza.',
   9, NULL, NULL, 10000, 'activo', 1, 2, 4, NOW() - INTERVAL '3 days', NULL, '+56 9 2222 3333'),

  (5, 'Vendo Chevrolet Sail 2018', 'vendo-chevrolet-sail-2018',
   'Único dueño, mantenciones al día, papeles en regla. Trato directo.',
   5, 8, 6200000, NULL, 'activo', 1, 4, 5, NOW() - INTERVAL '8 days', NULL, '+56 9 8765 4321'),

  (6, 'Feria costumbrista de primavera', 'feria-costumbrista-de-primavera',
   'Gastronomía local, artesanía y música en vivo durante todo el fin de semana.',
   7, NULL, NULL, NULL, 'activo', 1, NULL, 1, NOW() - INTERVAL '2 days', NOW() + INTERVAL '5 days', 'eventos@posteate.cl'),

  (7, 'Bicicleta aro 26 seminueva', 'bicicleta-aro-26-seminueva',
   'Poco uso, ideal para paseos. Incluye candado y luces.',
   4, NULL, 65000, NULL, 'activo', 1, 5, 2, NOW() - INTERVAL '9 days', NULL, '+56 9 1234 5678'),

  (8, 'Gasfitería y reparaciones a domicilio', 'gasfiteria-y-reparaciones-a-domicilio',
   'Servicio técnico con más de 10 años de experiencia. Presupuesto sin costo.',
   6, 10, NULL, NULL, 'activo', 1, NULL, 6, NOW() - INTERVAL '10 days', NULL, '+56 9 5555 1111'),

  (9, '2x1 en pizzas todos los martes', '2x1-en-pizzas-todos-los-martes',
   'Válido solo para pedidos en local, no aplica a delivery.',
   10, NULL, NULL, NULL, 'activo', 1, 2, 1, NOW() - INTERVAL '4 days', NULL, 'pizzeria@example.com'),

  (10, 'Corte de agua programado sector oriente', 'corte-de-agua-programado-sector-oriente',
   'Mantención de la red el día jueves entre 09:00 y 17:00 hrs.',
   11, NULL, NULL, NULL, 'activo', 1, NULL, 1, NOW() - INTERVAL '1 days', NULL, 'municipalidad@melipilla.cl'),

  (11, 'Encontré mochila escolar en la plaza', 'encontre-mochila-escolar-en-la-plaza',
   'Mochila azul con cuadernos y una botella. Contactar para coordinar entrega.',
   9, NULL, NULL, NULL, 'resuelto', 1, 2, 4, NOW() - INTERVAL '15 days', NULL, '+56 9 2222 3333'),

  (12, 'Pieza amoblada para estudiante', 'pieza-amoblada-para-estudiante',
   'Incluye baño compartido, wifi y acceso a cocina. Solo mujeres.',
   1, 1, 150000, NULL, 'pausado', 1, 3, 3, NOW() - INTERVAL '12 days', NULL, 'jorge@example.com'),

  (13, 'Notebook Lenovo 8GB RAM', 'notebook-lenovo-8gb-ram',
   'Funciona perfecto, se vende por cambio de equipo. Incluye cargador.',
   4, 6, 210000, NULL, 'activo', 1, 4, 2, NOW() - INTERVAL '7 days', NULL, '+56 9 1234 5678'),

  (14, 'Reparto en moto, jornada completa', 'reparto-en-moto-jornada-completa',
   'Se requiere moto propia y licencia al día. Sueldo base más bonos.',
   3, 5, NULL, NULL, 'activo', 1, 2, 5, NOW() - INTERVAL '11 days', NULL, '+56 9 8765 4321'),

  (15, 'Clases particulares de matemática', 'clases-particulares-de-matematica',
   'Enseñanza media y básica. Clases de una hora, materiales incluidos.',
   6, 11, 8000, NULL, 'activo', 1, NULL, 6, NOW() - INTERVAL '13 days', NULL, '+56 9 5555 1111'),

  (16, 'Cachorros en adopción', 'cachorros-en-adopcion',
   'Camada de 4 cachorros, aprox. 2 meses, desparasitados.',
   8, 12, NULL, NULL, 'activo', 1, 5, 4, NOW() - INTERVAL '14 days', NULL, '+56 9 2222 3333'),

  (17, 'Taller gratuito de emprendimiento', 'taller-gratuito-de-emprendimiento',
   'Cupos limitados, inscripción previa requerida. Duración 2 horas.',
   7, NULL, NULL, NULL, 'expirado', 1, NULL, 1, NOW() - INTERVAL '20 days', NOW() - INTERVAL '5 days', 'emprendimiento@melipilla.cl'),

  (18, 'Arriendo local comercial centro', 'arriendo-local-comercial-centro',
   'Excelente ubicación, alto flujo peatonal, 45m2 aprox.',
   1, NULL, 450000, NULL, 'activo', 1, 2, 1, NOW() - INTERVAL '1 days', NULL, 'contacto@posteate.cl'),

  (19, 'Camioneta Toyota Hilux 2015', 'camioneta-toyota-hilux-2015',
   'Doble cabina, diésel, excelente estado mecánico.',
   5, 8, 12500000, NULL, 'activo', 2, NULL, 5, NOW() - INTERVAL '6 days', NULL, '+56 9 8765 4321'),

  (20, 'Se busca niñera por horas', 'se-busca-ninera-por-horas',
   'Dos tardes a la semana, zona céntrica. Se piden referencias.',
   3, NULL, NULL, NULL, 'activo', 3, NULL, 6, NOW() - INTERVAL '2 days', NULL, '+56 9 5555 1111'),

  (21, 'Se perdió perro salchicha color café', 'se-perdio-perro-salchicha-color-cafe',
   'Responde al nombre "Toby", muy cariñoso. Se ofrece recompensa.',
   2, 3, NULL, 15000, 'activo', 1, 3, 3, NOW() - INTERVAL '5 days', NULL, 'jorge@example.com'),

  (22, 'Nueva ciclovía conectará el centro con el sector poniente', 'nueva-ciclovia-conectara-el-centro-con-el-sector-poniente',
   'Las obras comenzarían el próximo mes según la municipalidad.',
   12, NULL, NULL, NULL, 'activo', 1, NULL, 1, NOW() - INTERVAL '3 days', NULL, NULL),

  (23, 'Se extravió billetera con documentos', 'se-extravio-billetera-con-documentos',
   'Contiene cédula de identidad y tarjetas. Se agradece devolución.',
   13, NULL, NULL, NULL, 'activo', 1, 2, 4, NOW() - INTERVAL '1 days', NULL, '+56 9 2222 3333');

-- =========================================================
-- Reseteo de secuencias (clave: evita choques de ID cuando
-- Django/el admin creen la proxima fila nueva)
-- =========================================================
SELECT setval(pg_get_serial_sequence('categorias_categoria', 'id'), (SELECT MAX(id) FROM categorias_categoria));
SELECT setval(pg_get_serial_sequence('categorias_subcategoria', 'id'), (SELECT MAX(id) FROM categorias_subcategoria));
SELECT setval(pg_get_serial_sequence('ubicaciones_sector', 'id'), (SELECT MAX(id) FROM ubicaciones_sector));
SELECT setval(pg_get_serial_sequence('usuarios_usuario', 'id'), (SELECT MAX(id) FROM usuarios_usuario));
SELECT setval(pg_get_serial_sequence('publicaciones_publicacion', 'id'), (SELECT MAX(id) FROM publicaciones_publicacion));

COMMIT;
