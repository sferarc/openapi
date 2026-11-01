---
"cloudflare-api-js": minor
---

Add a `jsonLines: "stream"` call option that resolves a line-delimited JSON response (`application/x-ndjson` and similar) to an async iterable of its parsed lines as they arrive, and export `isJsonLineStream` to narrow the result. Before this, the body was always read whole, so the lines of a long response such as `getCollectionExportEndpoint` arrived only once it ended, and a stream the server keeps open never resolved. Without the option a response still resolves to an array of lines.
