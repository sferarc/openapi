# Plans

GitHub Issues in `sferarc/openapi` are the source of truth for open work, its progress and its priority (label `product:openapi`). This note keeps the vision, the phases and what shipped, and links each phase to its tracking issue. Add new work as an issue, not as a line here.

## Vision

Every client in `packages/` is regenerated from its live spec on a schedule and published to npm from this repository without a person in the loop, and calling a generated operation sends what the spec describes ([[architecture/pipeline]], [[development/release]]).

## Phases

### Release from this repository (shipped)

- The owner set `RELEASE_ENABLED` on 2026-10-28.
- Every publish run failed with a 404 from npm for every client until 2026-10-31.
- The rerun of release run 41231843444 on 2026-10-31 was the first to publish, and npm has served the versions on `main` since (`gh run list --workflow release.yml`, `npm view`, checked 2026-11-01). Run 41231208403 before it only opened version PR #217.
- That first publish was a major for every published client: the Effect clients for Effect 4 ([[decisions/2026-10-08-effect-4-major]]), and every client for the HTTP error shape change (#9).
- [[development/release]] records the first working publish (#231).

### Scheduled regeneration (shipped)

- On since the owner set `SPEC_UPDATES_ENABLED` on 2026-10-26.
- #64 repointed the dead `litellm-api` and `zoom-api-js` spec URLs.
- Each matrix job has `timeout-minutes: 45`.
- kubb 5.13.1 (#72) brought the `cloudflare-api-js` generate under a minute, and `cleanOperationIds` renames a later colliding operation ID.
- The workflow mints a `sferarc-hq` App token instead of the dead `GIT_TOKEN` (#86), and since 2026-10-28 the scheduled runs succeed and their spec PRs auto-merge (#101 was the first).
- Issue #75, about the dead `GIT_TOKEN`, describes a problem #86 removed.
- Details in [[architecture/pipeline]].

### HTTP error status (shipped)

- The older clients' fetchers used to report an HTTP error status as `NetworkError` rather than `ApiError` (#6).
- #8 fixed that, and each Effect client's `src/effect.test.ts` asserts `ApiError` with the status (checked 2026-10-13).

### Object query parameters (partly shipped)

- `v0-api` sends an object query parameter as `deepObject` keys (#119), matching the only such parameter in its live spec.
- `cloudflare-api-js` sends one as a key per property (`.changeset/cloudflare-form-object-query.md`), matching the only such parameter in its live spec.
- The other fetchers still call `String()` on one, which no generated operation reaches today: #234.

### Client follow-ups after the first release

Tracking issue: #236.

- #231 Record in the release note that npm publishing works since 2026-10-31
- #232 Let a caller read line-delimited JSON responses as a stream
- #233 Expose response headers so the Vercel registry uploads can return Location
- #234 Serialize object query parameters by style in the remaining fetchers
- #235 Confirm the Cloudflare OAuth refresh works with a real client (waits on the owner)
