---
"v0-api": minor
---

Take a function as `token` in `V0Api`, called before every request, so a replaced API key, or one read from a secret store, reaches an existing client. A fixed key works as before. The public `token` field now has the `V0Token` type, so code that reads it as a string needs a narrowing.
