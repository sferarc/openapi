---
"litellm-api": patch
---

Resolve a line-delimited JSON response (`application/x-ndjson`) to an array with one parsed value per line. Before this, the fetcher parsed the whole body as one JSON document, so `exportDatasetLensDatasetsDatasetIdExportGet` rejected with a JSON syntax error as soon as the export had two rows.
