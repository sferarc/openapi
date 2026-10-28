---
"cloudflare-api-js": minor
---

Add a `body` parameter to the operations that only take an `application/x-www-form-urlencoded` request body, sent as form fields. Before this, `postAccountsAccountIdBrandProtectionLogos` could not send its fields.
