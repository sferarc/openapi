---
"netlify-api": patch
---

Send a `ReadableStream` upload body with `duplex: "half"`. Without it, Node's `fetch` rejected the request with "duplex option is required when sending a body" before sending anything, so `uploadDeployFile` and the other octet-stream uploads failed whenever they were given a stream.
