---
"cloudflare-api-js": patch
"keycloak-api": patch
"vercel-api-js": patch
---

Send a `ReadableStream` upload body with `duplex: "half"`. Without it, Node's `fetch` rejected the request with "duplex option is required when sending a body" before sending anything, so raw body operations such as `uploadArtifact` in `vercel-api-js` and `dlpDatasetsUploadVersion` in `cloudflare-api-js` failed whenever they were given a stream.
