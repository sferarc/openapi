---
"litellm-api": patch
---

Return `undefined` from `client.api` for `Object.prototype` names such as `constructor` or `toString`, instead of a namespace or an operation wrapper that calls the inherited method.
