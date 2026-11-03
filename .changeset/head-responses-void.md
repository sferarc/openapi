---
"litellm-api": patch
---

Type the MCP route HEAD operations' responses as `void`, which is what the fetcher resolves a HEAD response to: their `200` was `unknown` and their `422` the GET's `HTTPValidationError` body.
