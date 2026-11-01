---
"keycloak-api": patch
---

`KeycloakAccountApi` now percent-encodes its `realm` in `/realms/<realm>`, as `KeycloakAdminApi` already does for the `{realm}` path parameter. Keycloak accepts `%` and spaces in a realm name, so a realm such as `50% off` used to send `/realms/50% off/account/`, whose `%` is not a valid escape.
