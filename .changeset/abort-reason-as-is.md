---
"cloudflare-api-js": patch
"keycloak-api": patch
"litellm-api": patch
"netlify-api": patch
"nuki-api-js": patch
"v0-api": patch
"vercel-api-js": patch
"zoom-api-js": patch
---

Reject a call cancelled through `signal` with what the signal was aborted with. A call given `AbortSignal.timeout()` now rejects with its `TimeoutError`, and one aborted with `controller.abort(reason)` with `reason`, where both were wrapped in an `Error` reading `GET /path failed: ...`; only an `AbortError` passed through before.
