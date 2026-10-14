---
"cloudflare-api-js": patch
---

Expose operations without a tag under `client.api.default` and the Effect `ApiService.default`, and merge tags that differ only in case or separators into one namespace instead of dropping all but the last.
