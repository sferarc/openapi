---
"cloudflare-api-js": patch
---

Send an object query parameter as one key per property (`start=2021-04-01&end=2021-04-30`), the spec's default form style, instead of `start_end_params=[object Object]`, so the date range on `passiveDnsByIpGetPassiveDnsByIp` reaches the API.
