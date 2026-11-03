---
"cloudflare-api-js": minor
---

[BREAKING] Updated the query parameter handling for d1ListDatabases to use Partial<D1ListDatabasesQuery> directly instead of generating a joined string for ids.
