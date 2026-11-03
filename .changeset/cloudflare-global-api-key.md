---
"cloudflare-api-js": minor
---

`CloudflareApi` accepts the legacy Global API Key: pass `apiKey` and `email` instead of `token` and every call sends them as `X-Auth-Key` and `X-Auth-Email`, which operations such as the Cloudforce One requests require.
