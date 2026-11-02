---
"v0-api": minor
---

Add an `onResponse` call option that gets the status and headers of each response before its body is read, and export its `ResponseInfo` type. Every operation in the v0 spec can answer `429 Too Many Requests`, and a caller could not read the headers of that response before. An error thrown inside `onResponse` rejects the call as `onResponse threw on <METHOD> <path>` with the thrown value as its `cause`.
