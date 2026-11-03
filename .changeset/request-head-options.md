---
"vercel-api-js": minor
"litellm-api": minor
"cloudflare-api-js": patch
"netlify-api": patch
"nuki-api-js": patch
"v0-api": patch
"zoom-api-js": patch
---

`request()` and the Effect `effectByPath` binding reach HEAD and OPTIONS operations, which only `client.api` did before: `client.request("HEAD /v8/artifacts/{hash}", ...)` in `vercel-api-js` and `client.request("OPTIONS /mcp")` in `litellm-api` compiled to an error and threw `Unknown endpoint` at runtime. `ApiOperationByMethod` accepts `"HEAD"` and `"OPTIONS"` in every client.
