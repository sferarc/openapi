---
"v0-api": patch
---

Send an object query parameter as `deepObject` keys (`metadata[env]=prod`) instead of `metadata=[object Object]`, so the `metadata` filter on `chatsFind` reaches the API.
