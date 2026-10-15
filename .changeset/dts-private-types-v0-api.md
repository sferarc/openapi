---
"v0-api": patch
---

Export the `FetchImpl` and `FetcherConfig` types from the package root. The bundled declarations referenced them from a private chunk, so a consumer emitting declarations for code that inferred one of the client's types failed with "cannot be named without a reference to ... This is likely not portable".
