---
"cloudflare-api-js": patch
"keycloak-api": patch
"litellm-api": patch
"netlify-api": patch
"nuki-api-js": patch
"v0-api": patch
"vercel-api-js": patch
"zoom-api-js": patch
---

Map the subpath entries, such as `/types`, `/schemas`, `/components` and `/effect`, in `typesVersions`. TypeScript's `moduleResolution: node` (`node10`), the TypeScript 5 default for `module: commonjs`, ignores `exports`, so importing a subpath failed with "Cannot find module" there.
