---
"vercel-api-js": minor
---

Send a body with the container registry uploads, whose spec describes it only in prose: the chunk upload (`PATCH /v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/uploads/{uuid}`) takes the bytes as `application/octet-stream`, the upload completion (`PUT` on the same path) an optional last chunk, and the manifest push (`PUT .../manifests/{reference}`) the manifest as `application/vnd.oci.image.manifest.v1+json`. Before, the generated operations had no `body` and sent none.
