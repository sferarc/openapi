---
"cloudflare-api-js": patch
"vercel-api-js": patch
---

Send a request body with a JSON suffix media type as is when it is already text or bytes, so a container registry manifest pushed by digest keeps the exact bytes its digest hashes. `replaceByTeamSlugByProjectSlugByRepositoryNameManifestsByReference` in vercel-api-js and the SCIM user and group operations in cloudflare-api-js take a string, `Blob`, `ArrayBuffer`, `Uint8Array` or `ReadableStream` besides the object, which they still encode as JSON.
