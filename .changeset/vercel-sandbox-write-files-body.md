---
"vercel-api-js": minor
---

Add the tarball `body` to `writeSessionFiles` (`POST /v2/sandboxes/sessions/{sessionId}/fs/write`), sent with `Content-Type: application/gzip`. Vercel's spec describes the gzipped tarball upload only in the operation's description and declares no request body, so the operation had no `body` parameter and sent the request without one. The body is required and typed as `Blob | ArrayBuffer | Uint8Array | ReadableStream | string`.
