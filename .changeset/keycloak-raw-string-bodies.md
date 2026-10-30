---
"keycloak-api": patch
---

Send the bodies of three admin operations the way Keycloak reads them. Keycloak parses these bodies from the raw request text, but the spec typed them as a JSON string, so the client sent a quoted string. The authz `policy` and `permission` creates (`POST /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/policy` and `.../permission`) now take a `PolicyRepresentation` object, sent as JSON; a string body made Keycloak fail to deserialize the representation. `client-description-converter` now sends its body unquoted as `text/plain`, typed as `Blob | ArrayBuffer | Uint8Array | ReadableStream | string`; Keycloak answered `Unsupported format` to the quoted string, which starts with neither the `{` of an OIDC client description nor the `<` of a SAML entity descriptor.
