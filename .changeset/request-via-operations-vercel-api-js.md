---
"vercel-api-js": patch
---

`request()` now calls the generated operation instead of the raw fetcher, so path parameters are substituted, validated and percent-encoded the same way as through `api`. An unknown endpoint throws.
