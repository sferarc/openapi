---
"cloudflare-api-js": patch
---

Percent-encode path parameters in generated operations, so a value containing `/`, `?`, `#` or `..` can no longer change which endpoint is called. Required path parameters now accept falsy values such as `0`.
