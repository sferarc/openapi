---
"nuki-api-js": patch
---

Show the API's own error message in `ApiError.message` from the `effect` entry. It read only a top-level `message` on the rejection, which HTTP errors never have, so every failure read `API Error: <status>`. It now falls back to the error body's `message`, `error` or `error.message`, or to the body itself when it is text. `status` and `error` are unchanged.
