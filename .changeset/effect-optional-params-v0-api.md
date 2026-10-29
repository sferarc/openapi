---
"v0-api": patch
---

Let `ApiService` and `effectByPath` operations that require no params be called without an argument, as `client.api` operations can. They required one, so `ApiService.<tag>.<operation>()` failed to compile and needed `({})`.
