---
"cloudflare-api-js": minor
---

Add a `body` parameter to `postAccountsAccountIdBrandProtectionLogos`, which had none. Its spec declares an `application/x-www-form-urlencoded` body with a binary `image` field, which form fields cannot carry, so the `image` `Blob` is sent as `multipart/form-data` instead. Whether Cloudflare accepts the multipart upload is unknown: no upload was tried against the API.
