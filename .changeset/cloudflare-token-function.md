---
"cloudflare-api-js": minor
---

Take a function as `token` in `CloudflareApi`, called before every request, so an OAuth access token refreshed through `auth.refreshToken` reaches an existing client. A fixed token and the Global API Key work as before.
