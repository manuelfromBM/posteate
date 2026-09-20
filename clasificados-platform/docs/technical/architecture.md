# Technical Architecture

## Repository

Simple monorepo.

```text
posteate/
├── frontend/
├── backend/
├── docs/
├── .claude/
└── CLAUDE.md
```

Turborepo is intentionally not used.

## Frontend

```text
Next.js
TypeScript
App Router
CSS Modules
```

Feature-oriented organization:

```text
frontend/src/
├── app/
├── features/
└── lib/
```

## Backend

```text
Python
Django
Django REST Framework
uv
Django ORM
```

Domain application architecture:

```text
View
 ↓
Service / Selector
 ↓
Model
 ↓
PostgreSQL
```

## Database

PostgreSQL hosted on Neon.

## Communication

Frontend communicates with backend through REST.

## Infrastructure

Currently TBD:

- frontend hosting;
- backend hosting;
- object storage;
- CI/CD;
- production deployment.

Do not introduce infrastructure until it is required.
