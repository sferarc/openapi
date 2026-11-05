---
"keycloak-api": minor
---

Add Account API Effect bindings to `keycloak-api/effect`: `AccountApiService` by tag, `accountEffectByPath` by path, and `makeAccountLayer(realm)`, which rebases the server layer's `baseUrl` onto `/realms/<encoded realm>` so admin and account effects share one `makeApiLayer` in a program.
