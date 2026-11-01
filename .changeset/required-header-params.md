---
"cloudflare-api-js": patch
"vercel-api-js": patch
---

An operation with a required header parameter now requires `headers` and the required fields in it, so leaving one out fails to compile instead of getting an error from the API. They used to be typed `Partial`, so `spendPoliciesDelete` and `spendPoliciesUpdate` in `cloudflare-api-js` compiled without the `If-Match` header the spec requires, and `uploadArtifact` in `vercel-api-js` without `Content-Length`. The other Cloudflare operations affected are the Logpull log file calls (`R2-Access-Key-Id`, `R2-Secret-Access-Key`), the zone Precursor config calls (`Cloudflare-Version`), `r2PatchBucket` (`cf-r2-storage-class`) and the Stream Tus upload (`Tus-Resumable`, `Upload-Length`). Operations whose header parameters are all optional are unchanged.
