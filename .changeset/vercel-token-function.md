---
"vercel-api-js": minor
---

Take a function as `token` in `VercelApi`, called before every request, so a rotated access token reaches an existing client. A fixed token works as before. The public `token` field now has the `VercelToken` type, a string, `null` or such a function.
