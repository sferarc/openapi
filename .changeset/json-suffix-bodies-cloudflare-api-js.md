---
"cloudflare-api-js": minor
---

Add a `body` parameter to the operations that only take an `application/scim+json` request body, sent as JSON with that `Content-Type`. Before this, `scimUsersCreate`, `scimUsersPatch`, `scimUsersPut`, `scimGroupsCreate`, `scimGroupsPatch` and `scimGroupsPut` could not send the user or group they create or change.
