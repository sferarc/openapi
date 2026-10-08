---
"cloudflare-api-js": major
"keycloak-api": major
"litellm-api": major
"netlify-api": major
"nuki-api-js": major
"v0-api": major
"vercel-api-js": major
"zoom-api-js": major
---

Breaking: a failed HTTP response now rejects with `{ status, payload }`, where `status` is the HTTP status code and `payload` is the parsed error body (or a description string when the body is not JSON). It used to reject with `{ name: "unknown", message }`, losing both. Code that reads `error.message` from a rejected call should read `error.status` and `error.payload` instead. Requests that never get a response still reject with `{ name: "unknown", message }`. In the Effect bindings, HTTP errors now fail with `ApiError` carrying the status instead of `NetworkError`.
