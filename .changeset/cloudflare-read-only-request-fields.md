---
"cloudflare-api-js": patch
---

Stop requiring the fields Cloudflare sets itself in request bodies. The spec marks them both `readOnly` and required, so a call did not type-check without them: a new ruleset or ruleset rule needed its `id`, `version` and `last_updated`, an email security allow policy its `id`, `created_at` and `last_modified`, a new or updated Worker its `id`, `created_on`, `updated_on` and `references`, and the same held for Worker previews, Worker domains, the latest Worker version patch, IP access rule updates, managed transforms and the roles of an account member update. Those fields are now optional in request bodies, through new `*Writable` types, and response types are unchanged.
