---
"vercel-api-js": major
---

Breaking: JSON request bodies are typed from the spec and sent as JSON with `Content-Type: application/json`. The generator used to rename every key in the spec to camelCase, which turned `application/json` into `applicationJson` and `$ref` into `ref`: 181 operations typed their body as raw bytes or a string and sent it with `Content-Type: applicationJson`, so a body passed as an object was never serialized. Types now use the API's own property names, such as `deployment_id` instead of `deploymentId`, and schemas behind a `$ref` are typed instead of loose. Code that set the camelCased names has to use the API's names, which are the ones the API reads. The regeneration also adds `listFlagLabelCounts`, `listFlagLabels`, `lookupFlagLabels` and `updateApiKeyQuota` from the latest spec.
