---
"cloudflare-api-js": patch
---

Keep the slashes in file path parameters, which the previous release percent-encoded as `%2F`, and leave existing `%XX` escapes in them untouched so values already passed through `encodeURI` are not encoded twice.
