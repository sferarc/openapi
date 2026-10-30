---
"cloudflare-api-js": major
"keycloak-api": major
"netlify-api": major
"nuki-api-js": major
"zoom-api-js": major
---

Breaking: `format: int64` fields and parameters are typed `number` instead of `bigint`, and their zod schemas are `z.int()` instead of `z.coerce.bigint()`. The API sends these values as JSON numbers, so a response never held a `bigint` despite its type, and a `bigint` passed in a JSON body, as the types asked for, such as the `ttl` of Netlify's `createDnsRecord`, made `JSON.stringify` throw `Do not know how to serialize a BigInt`. Code that passed a `bigint`, such as a Zoom `meetingId: 123n`, now passes a number.
