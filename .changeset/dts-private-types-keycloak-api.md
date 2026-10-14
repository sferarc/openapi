---
"keycloak-api": patch
---

Export the `FetcherConfig` type from `keycloak-api/admin/components` and `keycloak-api/account/components`. The declarations of both entries referenced it from a private chunk, so a consumer emitting declarations for code that inferred an operation's parameters could not name it.
