---
"vercel-api-js": minor
---

Resolve a line-delimited JSON response (`application/jsonl`, `application/x-ndjson`, `application/stream+json`) to an array with one parsed value per line. Before this, the fetcher parsed the whole body as one JSON document, so `listBillingCharges`, `listContractCommitments`, `getRuntimeLogs`, `getSessionCommandLogs`, `runSessionCommand` with `wait: true` and the streaming form of `getDeploymentEvents` rejected with a JSON syntax error as soon as the response had two lines.

The first four only declare a line-delimited response, so their response types stay `unknown`. `runSessionCommand` and `getDeploymentEvents` also declare an `application/json` response, and their 200 types are now a union of that body and the array of lines: `RunSessionCommandStatus200` is `RunSessionCommandStatus200Json | RunSessionCommandStatus200XNdjson`, where the second is the array of status and log lines `wait: true` returns, and `GetDeploymentEventsStatus200` is `GetDeploymentEventsStatus200Json | GetDeploymentEventsStatus200StreamJson`. `RunSessionCommandStatus200` used to be the `{ command }` body alone, so code that reads `.command` from the result has to narrow it first, for example with `Array.isArray`.

The client is regenerated for this, which also brings the 2.1.1 parameter types into the generated operations and adds the current spec's `team-data-cache-user-disabled-updated` user event type and the plan item quantity intent in the `buyCredits` response.
