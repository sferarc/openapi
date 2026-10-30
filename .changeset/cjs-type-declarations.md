---
"cloudflare-api-js": patch
"keycloak-api": patch
"litellm-api": patch
"netlify-api": patch
"nuki-api-js": patch
"vercel-api-js": patch
"zoom-api-js": patch
---

Give `require` its own CommonJS type declarations. Every entry pointed both `import` and `require` at one ESM declaration file, so a CommonJS project using `moduleResolution: node16` or `nodenext` got ESM types for the CommonJS build.
