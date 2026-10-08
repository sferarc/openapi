---
"clickhouse-cloud": patch
"netlify-api": patch
"nuki-api-js": patch
"v0-api": patch
"vercel-api-js": patch
"zoom-api-js": patch
---

Inline the Effect helper types into `effect.d.mts` instead of importing them from `@sferadev/openapi-utils/effect`, which is not published, so TypeScript resolves `ApiConfig`, `ApiError`, `makeApiLayer` and the `ApiService` shape for consumers instead of failing with a missing module.
