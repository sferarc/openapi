---
"cloudflare-api-js": patch
---

Send `client.auth.refreshToken` to Cloudflare's OAuth token endpoint, `https://dash.cloudflare.com/oauth2/token`, as a form-encoded body. It posted JSON to `https://api.cloudflare.com/client/v4/oauth/token`, which does not exist and answers 404, so every refresh failed. The `authToken` option is now optional and ignored, since the token endpoint authenticates the client by its ID and secret.
