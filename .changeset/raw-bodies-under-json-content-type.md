---
"cloudflare-api-js": patch
"keycloak-api": patch
"netlify-api": patch
"vercel-api-js": patch
---

Send a raw request body as it is when its Content-Type is `application/json`. The fetcher JSON-encoded every body under that type, so `r2PutObject` with `headers: { "Content-Type": "application/json" }` sent a `Blob` or bytes as `{}` or `{"0":123,...}` and a string such as `'{"a":1}'` as the quoted `"{\"a\":1}"`. Bytes, a `Blob`, a stream or a form are now never encoded, and a string is sent as is when the operation or the caller sets the Content-Type; under the default Content-Type of a JSON operation it is still encoded as a JSON string. A JSON Content-Type with parameters, such as `application/json; charset=utf-8`, now encodes an object body instead of sending `[object Object]`.
