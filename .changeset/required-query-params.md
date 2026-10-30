---
"cloudflare-api-js": patch
"litellm-api": patch
"netlify-api": patch
"v0-api": patch
"vercel-api-js": patch
"zoom-api-js": patch
---

An operation with a required query parameter now requires `queryParams` and the required fields in it, so leaving one out fails to compile instead of getting a 400 from the API. They used to be typed `Partial`, so `client.request("GET /deployments")` in `v0-api` compiled without the `chatId` and `versionId` the spec requires. Operations whose query parameters are all optional are unchanged.
