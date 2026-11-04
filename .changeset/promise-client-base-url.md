---
"cloudflare-api-js": minor
"nuki-api-js": minor
"v0-api": minor
"vercel-api-js": minor
"zoom-api-js": minor
---

Take an optional `baseUrl` in the client constructor, so a proxy or a Zoom for Government account no longer needs `config: { baseUrl }` on every call. A call's own `config.baseUrl` still wins.
