---
"netlify-api": minor
---

Take a function as `token` in `NetlifyApi`, called before every request, so an OAuth access token refreshed through `auth.refreshToken` reaches an existing client. A fixed token works as before; `auth.refreshToken` never calls the function and sends `authToken` only when given.
