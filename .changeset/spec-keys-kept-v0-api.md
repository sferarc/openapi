---
"v0-api": major
---

Breaking: JSON request bodies are typed from the spec and sent as JSON with `Content-Type: application/json`. The generator used to rename every key in the spec to camelCase, which turned `application/json` into `applicationJson` and `$ref` into `ref`: 22 operations, `chatsCreate` among them, typed their body as raw bytes or a string and sent it with `Content-Type: applicationJson`, so a body passed as an object was never serialized. Types now use the API's own property names, such as `experimental_content`, and schemas behind a `$ref` are typed instead of loose.
