---
"cloudflare-api-js": patch
"keycloak-api": patch
"litellm-api": patch
"netlify-api": patch
"v0-api": patch
"vercel-api-js": patch
---

Drop trailing slashes from a configured base URL (or Netlify `basePath`) so a value such as `http://localhost:4000/` no longer sends requests to `//path`.
