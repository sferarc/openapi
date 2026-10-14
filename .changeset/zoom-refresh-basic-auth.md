---
"zoom-api-js": patch
---

`auth.refreshToken` now authenticates the client with `Authorization: Basic` as Zoom's token endpoint requires, instead of sending the client ID and secret in the body, and a failed refresh names the HTTP status in its error.
