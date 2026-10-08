# Decisions

Dated records of choices a later change could undo by accident. Each says what was decided, why, and what would reopen it. Newest first. A record dated by the commit that documents it, where the original date is not in this repository's history, says so.

- [[2026-10-08-bundle-openapi-utils]]: clients bundle `@sferadev/openapi-utils` instead of depending on it (#1)
- [[2026-10-08-standalone-repository]]: the clients leave the earlier monorepo, with release and scheduled spec updates off until the owner enables them (8ff9fa1)
- [[2026-10-08-effect-3-kept-back]]: `effect` stays on major 3 because the published clients declare it as a peer
