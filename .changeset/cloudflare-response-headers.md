---
"cloudflare-api-js": minor
---

Add an `onResponse` call option that gets the status and headers of each response before its body is read, and export its `ResponseInfo` type. A call resolves to the parsed body only, so the `ETag` a spend policy returns for `If-Match` and the metadata headers of an R2 object could not be read before. An error thrown inside `onResponse` rejects the call as `onResponse threw on <METHOD> <path>` with the thrown value as its `cause`.
