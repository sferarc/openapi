---
"cloudflare-api-js": patch
"litellm-api": patch
"netlify-api": patch
"vercel-api-js": patch
---

A header parameter passed to an operation, such as `headers: { "litellm-changed-by": userId }`, now wins over the same header in `config.headers` or in the headers of an Effect `makeApiLayer`. The config headers used to be spread last, so a layer that set a default `litellm-changed-by` or `X-Nf-Retry-Count` replaced the value given for that one call. A header parameter left `undefined` still falls back to the config value.
