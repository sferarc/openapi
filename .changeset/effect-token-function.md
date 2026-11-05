---
"@sferadev/openapi-utils": minor
"netlify-api": minor
"nuki-api-js": minor
"v0-api": minor
"vercel-api-js": minor
"zoom-api-js": minor
---

The Effect `makeApiLayer` takes `token` as a function, sync or async, asked for the current token before every call, so a refreshed token needs no new layer. What the function throws fails the effect like a failed request.
