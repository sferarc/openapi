---
"vercel-api-js": minor
---

[BREAKING] The POST /v1/drives/{name} and POST /v2/sandboxes/drives/{name} endpoints are now correctly mapped to getOrCreateDriveV1 and getOrCreateDrive, restoring the 'get or create' semantics by name.
