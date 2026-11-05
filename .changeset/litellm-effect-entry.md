---
"litellm-api": minor
---

Add a `litellm-api/effect` entry that exposes every operation as an `Effect`, with the proxy's `baseUrl` and token in a `makeApiLayer` layer and HTTP errors typed as `ApiError` with their status.
