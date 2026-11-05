---
"cloudflare-api-js": minor
"keycloak-api": minor
"litellm-api": minor
"netlify-api": minor
"nuki-api-js": minor
"v0-api": minor
"vercel-api-js": minor
"zoom-api-js": minor
---

An HTTP error response now rejects with an exported `ApiResponseError`, which extends `Error` and keeps `status` and `payload` as before, adds `method` and `path`, and has a message such as `GET /v9/projects returned 403: Not authorized`, so a logged failure names the call and its status. `instanceof Error` is now true for these rejections.
