# Posteate — MVP v1

## Product goal

Validate whether a local community will use Posteate to publish and discover structured local information.

Initial community: Melipilla, Chile.

## Core flow

> publicar → encontrar → descubrir → contactar

## MVP capabilities

### Public discovery

A visitor without an account can:

- browse recent publications;
- search publications;
- filter publications;
- browse categories;
- open publication details.

### Account

A registered user can:

- register;
- authenticate;
- manage their profile;
- create publications;
- edit their own publications;
- delete their own publications;
- change the status of their own publications.

### Publication

A publication contains common structured information:

- title;
- description;
- category;
- location;
- optional contact information;
- images;
- publication status;
- timestamps;
- optional expiration.

### Moderation

Users can report publications.

Administrators can:

- review users;
- review publications;
- manage categories;
- review reports;
- hide/remove problematic publications;
- block users when necessary.

## Initial categories

1. Compra y venta
2. Arriendos y propiedades
3. Vehículos
4. Empleos
5. Servicios
6. Eventos
7. Mascotas
8. Perdidos y encontrados
9. Promociones
10. Avisos comunitarios
11. Noticias / información local
12. Otros

## Explicitly out of scope

- Internal chat
- Payments
- Followers
- Likes
- Stories
- Push notifications
- AI recommendations
- Complex ranking
- Microservices
- Kubernetes
- Elasticsearch/OpenSearch
- Advanced reputation
- Complex verification

## Product principle

Posteate is not just a chronological feed.

A publication should remain discoverable through search while it is still valid and visible.

The product's value comes from structured, local and persistent information.
