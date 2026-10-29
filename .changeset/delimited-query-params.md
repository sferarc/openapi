---
"cloudflare-api-js": patch
---

Send an array query parameter that the spec marks `explode: false` as one comma-separated value (`?type=full,partial`) instead of repeating the key, so filters such as `type` on `zonesGet`, `ids` on `getZonesZoneIdentifierZarazConfigHistory` and `fields` on `d1GetDatabase` reach the API as documented. `id` on `GET /organizations` keeps repeated keys, as its description asks.
