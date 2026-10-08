---
"netlify-api": major
"nuki-api-js": major
"v0-api": major
"vercel-api-js": major
"zoom-api-js": major
---

Move the `effect` entrypoint to Effect 4. The peer dependency is now `effect@^4.0.0`, and `ApiConfig` is a `Context.Service` key instead of a `Context.Tag`, so projects still on Effect 3 should stay on the previous major. The rest of the client is unchanged.
