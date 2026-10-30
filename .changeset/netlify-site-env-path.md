---
"netlify-api": patch
---

Fix `getSiteEnvVars`, which requested `/api/v1/api/v1/sites/{site_id}/env` and got a 404: the Netlify spec repeats the `/api/v1` base path in this one operation's path. It now calls `/api/v1/sites/{site_id}/env`, and its `request()` key is `GET /sites/{site_id}/env`.
