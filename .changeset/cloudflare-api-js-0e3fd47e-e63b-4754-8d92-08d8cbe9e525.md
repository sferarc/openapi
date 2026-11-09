---
"cloudflare-api-js": patch
---

TLS root CA certificate fields now clarify returned certificates are normalized PEM encoding and may differ byte-for-byte from upload, affecting all certificate-related types.
