---
"v0-api": patch
"vercel-api-js": patch
---

Type the arrays the spec leaves without an item schema as `unknown[]` instead of `string[]`, and let their zod schemas accept any item. A Vercel feature flag variant whose `value` is a JSON array of numbers or objects failed `createFlagBodySchema` and the flag response schemas, and the `gitSources` and `deploymentSources` of a user event, the billing `add` and `edit` adjustments and the AST nodes of v0's `experimental_content` were typed as strings they are not.
