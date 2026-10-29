---
"cloudflare-api-js": patch
---

Changed many API response types (including GetHeartbeatStatus200, SqlApiQuery status codes, ArtifactsReposBlobGetStatus200, etc.) from 'unknown' to more specific types like 'string' or 'Blob'.
