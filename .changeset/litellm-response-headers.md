---
"litellm-api": minor
---

Add an `onResponse` call option that gets the status and headers of each response before its body is read, and export its `ResponseInfo` type. LiteLLM returns the deployment that answered in `x-litellm-model-id`, which `GET /model/info` takes as `litellm_model_id`, and the cache key in `x-litellm-cache-key`, which `POST /cache/delete` takes; a caller could not read either before. An error thrown inside `onResponse` rejects the call as `onResponse threw on <METHOD> <path>` with the thrown value as its `cause`.
