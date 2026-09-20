# Backend Architecture

## Stack

- Python
- Django
- Django REST Framework
- uv
- Django ORM
- PostgreSQL
- Pyright

## Domain applications

Initial domain boundaries:

- users
- publications
- categories
- locations
- reports

Create an application only when the domain actually exists in the implementation.

## Layers

### Views

HTTP and REST concerns.

### Services

Business operations and mutations.

### Selectors

Read/query operations.

### Models

Persistence and domain-level model rules.

## Example

```text
POST /publications/
       ↓
PublicationView
       ↓
create_publication()
       ↓
Publication model
       ↓
PostgreSQL
```

## Rules

Avoid putting all business logic in views.

Avoid repository abstractions unless a concrete need appears.

Avoid microservices and distributed architecture for the MVP.

## Type Checking

Pyright is used for static type checking.

Python code should use type hints where they improve
clarity, maintainability, and correctness.

Type checking should be run as part of the development
and validation workflow.