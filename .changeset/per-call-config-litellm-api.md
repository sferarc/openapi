---
"litellm-api": patch
---

Keep the `config` passed to `request()` and `client.api` operations, such as extra `headers`, instead of replacing it with the client's own.
