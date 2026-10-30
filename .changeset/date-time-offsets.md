---
"litellm-api": patch
"netlify-api": patch
"nuki-api-js": patch
"v0-api": patch
"vercel-api-js": patch
"zoom-api-js": patch
---

Accept any RFC 3339 offset in the Zod schemas of `date-time` fields. They used `z.iso.datetime()`, which only accepts a `Z` suffix, so a valid value such as `2026-10-30T12:00:00+00:00` or `2026-10-30T14:00:00+02:00` failed to parse; they now use `z.iso.datetime({ offset: true })`. The TypeScript types are unchanged.
