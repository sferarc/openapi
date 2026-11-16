---
"vercel-api-js": patch
---

Allowed certain fields (like UpdateIntegrationDeploymentActionBody, ImportResourceBody, UpdateResourceBody) to have null as a possible element in string[], instead of just string | number | boolean.
