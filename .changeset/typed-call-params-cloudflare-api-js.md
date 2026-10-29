---
"cloudflare-api-js": patch
---

Type the params of `request()` and `client.api` operations from the operation. They were typed as `{}`, so a missing path parameter, a wrong body or an unknown key compiled and failed only at runtime. Header parameters are kept under `headers`.
