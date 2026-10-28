# Decisions

Dated records of choices a later change could undo by accident. Each says what was decided, why, and what would reopen it. Newest first. A record dated by the commit that documents it, where the original date is not in this repository's history, says so.

- [[2026-10-27-keep-spec-keys]]: `vercel-api-js` and `v0-api` generate from the spec's keys as published, without `camelCaseProperties`
- [[2026-10-08-effect-4-major]]: the Effect bindings move to Effect 4, with a major release of the published Effect clients (#6)
- [[2026-10-08-bundle-openapi-utils]]: clients bundle `@sferadev/openapi-utils` instead of depending on it (#1)
- [[2026-10-08-standalone-repository]]: the clients leave the earlier monorepo, with release and scheduled spec updates off until the owner enables them (8ff9fa1)
