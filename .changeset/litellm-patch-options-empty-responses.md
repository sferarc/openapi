---
"litellm-api": patch
---

Type the `200` of PATCH and OPTIONS operations whose spec schema is empty as `{ [key: string]: unknown }`, like GET, POST, PUT and DELETE ones, instead of `unknown`. It covers 21 PATCH operations such as `PATCH /guardrails/{guardrail_id}` and the `/update/*` settings, and 7 OPTIONS ones such as `OPTIONS /mcp`.
