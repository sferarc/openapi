---
"vercel-api-js": minor
---

Add an `onResponse` call option that gets the status and headers of each response before its body is read, and export its `ResponseInfo` type. A call resolves to the parsed body only, so headers such as the `Location` of a container registry upload could not be read before.
