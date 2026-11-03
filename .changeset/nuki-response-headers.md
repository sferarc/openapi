---
"nuki-api-js": minor
---

Add an `onResponse` call option that gets the status and headers of each response before its body is read, and export its `ResponseInfo` type, as the other clients have. A call resolved to the parsed body only, so a caller could not read any response header, and an Effect call had no `onResponse` to pass. An error thrown inside `onResponse` rejects the call as `onResponse threw on <METHOD> <path>` with the thrown value as its `cause`.
