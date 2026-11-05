---
"keycloak-api": patch
---

keycloak-api-mcp shares one client credentials token request between parallel tool calls, and reuses a token whose `expires_in` is 30 seconds or less instead of minting one per call.
