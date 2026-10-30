---
"keycloak-api": patch
---

Type the `type` path parameter of the workflow `activate` and `deactivate` operations (`POST /admin/realms/{realm}/workflows/{id}/activate/{type}/{resourceId}` and `.../deactivate/...`) as `"USERS" | "CLIENTS"`. Keycloak binds that segment to its `ResourceType` enum by name, but the spec types it as an object, so the client accepted only an object, which went out as `[object Object]`, and a resource type name such as `"USERS"` failed to compile.
