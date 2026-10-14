---
"netlify-api": minor
---

Add a `body` parameter to the operations that take a non-JSON request body. `uploadDeployFile`, `uploadDeployFunction`, `uploadDeployServer` and `uploadDeployEdgeFunction` accept a `Blob`, `ArrayBuffer`, `Uint8Array`, `ReadableStream` or string sent as `application/octet-stream`, and `createSiteBuild` accepts a `zip` file sent as multipart form data.
