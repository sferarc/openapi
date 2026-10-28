---
"vercel-api-js": patch
---

Resolve a line-delimited JSON response (`application/jsonl`, `application/x-ndjson`, `application/stream+json`) to an array with one parsed value per line. Before this, the fetcher parsed the whole body as one JSON document, so `listBillingCharges`, `listContractCommitments`, `getRuntimeLogs`, `runSessionCommand` and `getSessionCommandLogs` rejected with a JSON syntax error as soon as the response had two lines.
