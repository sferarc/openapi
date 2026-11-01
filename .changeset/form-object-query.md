---
"keycloak-api": patch
"litellm-api": patch
"netlify-api": patch
"nuki-api-js": patch
"vercel-api-js": patch
"zoom-api-js": patch
---

Send an object query parameter as one key per property (`start=2021-04-01&end=2021-04-30`), OpenAPI's default form style, leaving out nullish entries, instead of `range=[object Object]`, so a spec update that adds one works without a fetcher change.
