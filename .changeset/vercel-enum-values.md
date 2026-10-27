---
"vercel-api-js": patch
---

Keep enum values that do not start with a letter, such as `10.x`, `!contains`, `*` and `0`, in the generated types and zod schemas. They were dropped before, so valid values failed to typecheck, and an enum with only such values was typed `unknown`.
