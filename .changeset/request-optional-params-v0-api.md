---
"v0-api": patch
---

Let `request()` omit its params argument when the operation requires none of its fields, as `client.api` already does. Before, `client.request("GET /path")` failed to compile and callers had to pass `{}`.
