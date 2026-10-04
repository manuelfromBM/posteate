# Security Baseline

## Secrets

Never commit:

- `.env`
- `.env.*`
- API keys
- database credentials
- tokens
- private keys

Use example environment files for documentation.

## Authentication

Authentication architecture is currently TBD.

Do not implement a final strategy without explicit approval.

## Authorization

Users must only be able to modify resources they are authorized to modify.

Admin-only operations must be protected at the backend level.

Never rely solely on frontend UI restrictions for authorization.

## Input validation

Validate API input through Django REST Framework serializers and appropriate domain validation.

## Files

Uploaded images must be validated before storage.

Exact storage/security policy is TBD.
