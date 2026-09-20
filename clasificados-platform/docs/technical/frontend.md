# Frontend Architecture

## Stack

- Next.js
- TypeScript
- App Router
- CSS Modules

## Current structure

```text
src/
├── app/
├── features/
│   ├── categorias/
│   └── publicaciones/
└── lib/
```

## Responsibilities

### app/

Routing, pages, layouts and composition.

### features/

Feature/domain-specific UI, hooks, types and logic.

Example:

```text
features/publicaciones/
├── components/
├── hooks/
└── types.ts
```

### lib/

Cross-feature infrastructure/utilities.

Current API entry point:

```text
lib/api.ts
```

## Data fetching

Use native `fetch` initially.

Do not add a data-fetching/state library without a concrete requirement.

## Styling

Use CSS Modules for feature/component-specific styles.

Global styles belong in the existing global stylesheet.

## TypeScript

Avoid `any`.

Prefer explicit domain types and narrow interfaces.

Do not duplicate API contracts unnecessarily.
