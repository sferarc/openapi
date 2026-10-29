---
"keycloak-api": patch
---

Send `Accept: application/json, */*;q=0.8` by default instead of `Accept: application/json`. Keycloak answers 406 Not Acceptable when no `@Produces` of an endpoint matches the `Accept` header, so the operations that only produce something else failed on every call: the client certificate `download` and `generate-and-download` (`application/octet-stream`) and the realm localization text `GET /admin/realms/{realm}/localization/{locale}/{key}` (`text/plain`). JSON endpoints still get JSON, and a caller's `accept` header still replaces the default.
