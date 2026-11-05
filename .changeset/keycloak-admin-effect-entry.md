---
"keycloak-api": minor
---

Add a `keycloak-api/effect` entry that exposes every Admin API operation as an `Effect`, by tag in `AdminApiService` and by path in `adminEffectByPath`, with the server's `baseUrl` and a fixed or refreshed token in a `makeApiLayer` layer and HTTP errors typed as `ApiError` with their status.
