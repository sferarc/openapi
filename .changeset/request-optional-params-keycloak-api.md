---
"keycloak-api": patch
---

Let `request()` on `KeycloakAdminApi` and `KeycloakAccountApi` omit its params argument when the operation requires none of its fields. Before, `admin.request("GET /admin/realms")` failed to compile and callers had to pass `{}`.
