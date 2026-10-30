---
"cloudflare-api-js": minor
---

Upload Workers as `multipart/form-data` in `workerScriptUploadWorkerModule` and `namespaceWorkerScriptUploadWorkerModule`. Both sent their body as raw `application/javascript`, which Cloudflare accepts only for service-worker syntax, so an ES module Worker and its `metadata` (bindings, `main_module`, compatibility date) could not be uploaded. The `body` is now `{ metadata, files }`, with each module as a `File` named after it, such as `new File([source], "worker.js", { type: "application/javascript+module" })`.
