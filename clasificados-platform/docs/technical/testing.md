# Testing Strategy

Testing is required.

## Backend

Target:

- unit tests;
- API/integration tests.

## Frontend

Use unit/component tests where they provide value.

## E2E

Use Playwright.

Prioritize critical user journeys.

Examples:

```text
Browse → Search → Filter → Open publication

Register → Login → Create publication → Publish

Login → Edit own publication

Login → Close own publication

Report publication → Admin review
```

## Rule

A feature is not considered complete if its important behavior is untested when a practical automated test can cover it.
