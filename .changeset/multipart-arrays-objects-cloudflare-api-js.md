---
"cloudflare-api-js": patch
---

Send array and object fields of a multipart body instead of dropping them: an array is sent as one part per item and an object as a JSON part, and a bigint field as a string. Before this, `workerScriptPutContent` and `workerVersionsUploadVersion` sent neither `files` nor `metadata`.
