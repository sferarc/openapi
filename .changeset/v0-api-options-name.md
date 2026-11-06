---
"v0-api": patch
---

Export the `V0Api` constructor options as `V0ApiOptions`, so a project that also uses `vercel-api-js` no longer sees two unrelated `VercelApiOptions` types. `VercelApiOptions` stays as a deprecated alias.
