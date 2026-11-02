---
"zoom-api-js": minor
---

Add an `onResponse` call option that gets the status and headers of each response before its body is read, and export its `ResponseInfo` type. Zoom's rate limits page says a `429` for a reached daily limit tells the caller in the response headers when it may call again, which a caller could not read before. An error thrown inside `onResponse` rejects the call as `onResponse threw on <METHOD> <path>` with the thrown value as its `cause`.
