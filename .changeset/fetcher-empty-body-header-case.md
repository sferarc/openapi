---
"clickhouse-cloud": patch
"cloudflare-api-js": patch
"keycloak-api": patch
"litellm-api": patch
"netlify-api": patch
"nuki-api-js": patch
"v0-api": patch
"vercel-api-js": patch
"zoom-api-js": patch
---

Resolve a 204 or an empty successful body to `undefined` instead of rejecting with a network error, and let a header such as `authorization` or `content-type` replace the default regardless of case instead of being sent alongside it
