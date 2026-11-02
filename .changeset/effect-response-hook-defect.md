---
"vercel-api-js": patch
---

An `onResponse` that throws now makes an Effect call die with the `onResponse threw on <METHOD> <path>` error as a defect, the thrown value as its `cause`, instead of failing with `NetworkError`, so a bug in the caller's own callback no longer reads as a network failure.
