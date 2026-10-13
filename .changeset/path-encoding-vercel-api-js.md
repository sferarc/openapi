---
"vercel-api-js": minor
---

Percent-encode path parameters in generated operations, so a value containing `/`, `?`, `#` or `..` can no longer change which endpoint is called. Required path parameters now accept falsy values such as `0`, and multipart bodies send number and boolean fields as strings instead of dropping them. Regenerated from the current upstream spec, which adds `createVercelCiTaskAnalysis`, `createVercelCiTaskConfigurationPullRequest`, `deleteProjectAvatar`, `getVercelCiRepositorySettings`, `getVercelCiTaskAnalysis`, `listAiGatewayRouters`, `listVercelCiTaskAnalysisTasks`, `updateVercelCiRepositorySettings` and `writeSessionCommandStdin`.
