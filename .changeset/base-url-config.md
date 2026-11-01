---
"netlify-api": patch
"nuki-api-js": patch
"zoom-api-js": patch
---

The fetcher now reads `baseUrl` from its config, as the Vercel, v0 and Cloudflare clients already do, so `makeApiLayer({ baseUrl })` and a call's `config: { baseUrl }` take effect instead of being dropped for the hard-coded host. A Zoom for Government account can point the client at `https://api.zoomgov.com/v2`. A trailing slash on the base URL no longer produces `//path`.
