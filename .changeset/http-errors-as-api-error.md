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

Report HTTP error responses with their status. A failed response used to be caught by the fetcher's own network-error handler, so callers got `{ name: "unknown", message }` with the status and body lost, and the Effect bindings reported a `NetworkError`. Requests now reject with `{ status, payload }`, where `payload` is the parsed error body, and the Effect bindings fail with an `ApiError` carrying that status, as `clickhouse-cloud` already does. Requests that never get a response still reject as before.
