# Posteate — Claude Code Project Instructions

## 1. Project

Posteate is a local information and publication platform, initially focused on Melipilla, Chile.

The product centralizes information that is normally fragmented across Facebook, Instagram, WhatsApp groups, forums and other channels.

Core product flow:

> publicar → encontrar → descubrir → contactar

Posteate is **not intended to be a traditional social network**. Its primary value is making local information structured, searchable, discoverable and persistent.

The current product name "Posteate" is provisional.

## 2. Current MVP

The MVP must support:

- Public browsing without an account.
- Search and filtering of publications.
- Browsing by category.
- Viewing publication details.
- User registration and authentication.
- Creating publications.
- Editing and deleting own publications.
- Changing the status of own publications.
- Publication images.
- Optional contact information.
- Reporting publications.
- Basic administration/moderation.
- Recent publications on the home page.

The MVP intentionally does NOT include:

- Internal chat/messaging.
- Payments.
- Followers.
- Likes.
- Stories.
- Push notifications.
- AI recommendation systems.
- Complex algorithmic feeds.
- Microservices.
- Kubernetes.
- Elasticsearch/OpenSearch.
- Advanced reputation systems.
- Complex verification systems.

Do not implement future features unless explicitly requested.

## 3. Product principles

1. Information should remain discoverable after publication; the product is not only a chronological feed.
2. Relevance of local information should matter more than the author's follower count.
3. Users must be able to discover information before registering.
4. Publications are structured domain objects, not generic social posts.
5. Keep the MVP simple and validate real user behavior before introducing complex infrastructure.
6. Do not hard-code Posteate permanently to Melipilla in the domain model. Melipilla is the initial community, not necessarily the permanent platform scope.

## 4. Repository architecture

This repository is a simple monorepo.

Do NOT introduce Turborepo or another monorepo orchestration framework unless explicitly approved.

Expected high-level structure:

- `frontend/` — Next.js application.
- `backend/` — Django REST Framework application.
- `docs/` — project and technical documentation.
- `.claude/` — Claude Code project configuration.

Do not create speculative directories or packages simply because they may be useful later.

## 5. Frontend

Technology:

- Next.js
- TypeScript
- App Router
- CSS Modules
- Native `fetch` initially for API communication
- No global state library unless a concrete requirement appears.
- Playwright for E2E testing.

Current frontend organization is feature-oriented:

```text
frontend/src/
├── app/
├── features/
│   ├── categorias/
│   └── publicaciones/
└── lib/
```

Feature conventions:

```text
features/<feature>/
├── components/
├── hooks/
└── types.ts
```

Hooks must live inside the feature's `hooks/` directory.

`app/` is primarily responsible for routing, pages, layouts and composition.

Feature-specific business/UI logic should remain inside `features/`.

API communication should be centralized through the API layer rather than arbitrary HTTP calls scattered through components.

Do not introduce TanStack Query, Zustand, Redux or another state/data-fetching library without an explicit requirement and approval.

## 6. Backend

Technology:

- Python
- Django
- Django REST Framework
- uv
- Django ORM
- PostgreSQL
- Pyright

Backend application architecture:

```text
HTTP
 ↓
View
 ↓
Service / Selector
 ↓
Model
 ↓
PostgreSQL
```

Responsibilities:

### Views
Handle HTTP/REST concerns:
- request parsing
- authentication/permission integration
- serializer usage
- HTTP responses
- routing

Views should not become the primary location for business logic.

### Services
Contain business operations and state-changing domain logic.

Examples:

- create publication
- update publication
- close publication
- report publication

### Selectors
Contain read/query logic.

Examples:

- get publication
- list publications
- search publications
- get user's publications

### Models
Represent persistent domain entities and database-level/domain rules appropriate for the model.

Do not introduce repositories, CQRS, event sourcing, microservices or other architectural patterns without a concrete requirement and explicit approval.

## 7. Domain model — MVP

Initial domain entities:

```text
User
Publication
Category
Location
PublicationImage
Report
```

Relationships:

```text
User
 ├── creates → Publication
 └── creates → Report

Publication
 ├── belongs to → Category
 ├── belongs to → Location
 ├── has many → PublicationImage
 └── receives → Report
```

### Publication

Initial common fields conceptually include:

- author
- title
- description
- category
- location
- status
- optional contact information
- created_at
- expires_at

Do NOT create category-specific fields for every possible use case in the MVP.

Examples of intentionally deferred fields include bedrooms, vehicle model, salary, pet breed, etc.

### Publication status

Initial states:

- `ACTIVE`
- `CLOSED`
- `EXPIRED`
- `REMOVED`

`CLOSED` means the author finished the publication normally.

`EXPIRED` means its validity period ended.

`REMOVED` means the platform removed it through moderation.

### Category

Initial categories are product data, not hard-coded frontend/backend constants:

- Compra y venta
- Arriendos y propiedades
- Vehículos
- Empleos
- Servicios
- Eventos
- Mascotas
- Perdidos y encontrados
- Promociones
- Avisos comunitarios
- Noticias / información local
- Otros

### Location

The MVP uses commune + sector.

The model must remain capable of supporting other communes later.

Do not scatter `"Melipilla"` as a hard-coded domain assumption throughout the codebase.

### Publication images

Images are stored in object storage, not directly inside PostgreSQL.

The concrete storage provider is currently TBD.

### Reports

Initial report reasons:

- `SPAM`
- `FRAUD`
- `INAPPROPRIATE`
- `WRONG_CATEGORY`
- `OUTDATED`
- `OTHER`

Initial report states:

- `PENDING`
- `REVIEWING`
- `RESOLVED`
- `DISMISSED`

## 8. Authentication

Authentication architecture is currently **TBD**.

Do not implement or select a final authentication architecture unless explicitly instructed.

A custom Django User model should be established early if authentication work begins.

## 9. Search

Search is a core product capability.

The MVP should prefer PostgreSQL-based search capabilities.

Do NOT introduce Elasticsearch, OpenSearch, external search engines or AI search without demonstrated need and explicit approval.

Search should eventually support:

- text
- category
- location
- active/relevant status

The product distinguishes between:

- chronological discovery/feed
- persistent search/discovery

A publication should remain searchable after it is no longer among the newest items, provided its status and visibility allow it.

## 10. Testing

Testing is required.

Target strategy:

- Frontend unit/component tests where useful.
- Backend unit tests.
- Backend API/integration tests.
- End-to-end tests with Playwright.

Do not add testing libraries without approval, except when an already-approved project setup requires them.

E2E tests should prioritize real user flows, such as:

```text
Browse → Search → Filter → Open publication
Register → Login → Create publication → Publish
Login → Edit own publication
Login → Close own publication
Report publication → Admin review
```

## 11. Development workflow

For non-trivial work:

1. Inspect the existing code and relevant documentation.
2. Identify affected areas.
3. Create a concise implementation plan.
4. State important assumptions or unresolved decisions.
5. Implement the smallest appropriate change.
6. Run relevant tests/checks.
7. Review the resulting diff.
8. Report what changed and what was verified.

Do not start large implementation work from assumptions when the repository or requirements can answer the question.

For ambiguous architectural/product decisions, ask before making a permanent decision.

## 12. Autonomy and approvals

Claude is semi-autonomous.

Claude MAY autonomously:

- read project files
- inspect the repository
- create/edit source files
- create tests
- run existing project scripts
- run lint/typecheck/build/test commands
- diagnose and fix implementation errors
- review code
- create Git commits when explicitly useful

Claude MUST ask for approval before:

- installing packages/libraries
- upgrading or changing major dependencies
- deleting files
- destructive database operations
- destructive migrations
- changing authentication architecture
- changing the database architecture
- introducing a major architectural pattern
- adding infrastructure/services
- modifying CI/CD
- modifying deployment configuration
- changing secrets or environment configuration
- adding external SaaS providers
- performing network/deployment operations with real-world impact
- pushing to any Git remote

Claude MUST NOT:

- run `git push`
- expose secrets
- commit `.env` files or secrets
- bypass project permission rules
- use destructive commands to "fix" a problem without approval
- rewrite large portions of the project when a smaller change is sufficient.

Git commits are allowed, but pushes are not.

## 13. Dependencies

Do not install a dependency simply because it is a popular best practice.

Before proposing a new dependency, explain:

1. Why it is needed.
2. Why the existing stack is insufficient.
3. What alternatives were considered.
4. The maintenance/complexity impact.

Then ask for approval before installing it.

## 14. Environment and secrets

Never read, print, expose, commit or modify real secrets unless explicitly authorized.

Treat the following as sensitive:

- `.env`
- `.env.*`
- API keys
- database credentials
- tokens
- OAuth secrets
- private keys
- deployment credentials

Use `.env.example` files for documentation.

## 15. Code quality

Prefer:

- simple code
- explicit types
- small focused functions
- cohesive modules
- meaningful names
- predictable data flow
- domain-oriented organization
- reusable abstractions only when repetition or domain need justifies them.

Avoid:

- unnecessary abstractions
- premature optimization
- speculative architecture
- duplicated business rules
- giant components
- giant views
- magic constants
- hidden side effects.

## 16. API contracts

The backend is the source of truth for REST API behavior.

Do not invent API response shapes in the frontend when the backend contract is available.

If an API contract changes, update the relevant documentation/types/tests as part of the same task.

OpenAPI-based TypeScript type generation may be evaluated later, but is not currently part of the stack.

## 17. Documentation

Keep technical documentation under `docs/`.

Update documentation when a meaningful architectural or product decision changes.

Do not put every implementation detail into `CLAUDE.md`.

`CLAUDE.md` contains persistent project rules and essential context.

Detailed specifications belong in `docs/`.

## 18. Decision policy

When a decision is marked `TBD`:

- do not silently decide it permanently;
- identify the options;
- recommend one when useful;
- ask for approval if the decision has architectural, security, infrastructure or product consequences.

When requirements conflict, prioritize:

1. Explicit user instruction.
2. Current product specification.
3. Current technical architecture.
4. Existing code conventions.
5. General best practices.

Do not replace an explicit project decision with a generic "best practice" without discussion.

## 19. Definition of done

A task is not considered complete merely because code was written.

Before declaring completion:

- relevant tests pass;
- relevant lint/type checks pass;
- the implementation matches the requested scope;
- no unnecessary dependencies were added;
- no secrets were introduced;
- no unrelated files were changed;
- the final diff is reviewed;
- unresolved risks or TODOs are reported.

## 20. Important current TBD decisions

The following remain intentionally undecided:

- Authentication implementation.
- Object storage provider.
- Deployment provider.
- Backend hosting provider.
- CI/CD.
- Exact testing libraries beyond Playwright for E2E.
- API type-generation strategy.
- Production infrastructure.
- Advanced search strategy.
- Exact publication expiration policy.
- Anonymous publication policy.
- Maximum image count.

Do not silently convert these TBD items into permanent architecture.
