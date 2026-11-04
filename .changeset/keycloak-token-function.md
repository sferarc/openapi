---
"keycloak-api": minor
---

Take a function as `token` in `KeycloakAdminApi` and `KeycloakAccountApi`, called before every request, so a short-lived Keycloak access token can be refreshed without building a new client. A fixed token works as before.
