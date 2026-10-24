# Plans

The repository has no roadmap file and no open issues (checked 2026-10-24; #52 closed on 2026-10-21 and #15 on 2026-10-22). The first release publishes the eight existing clients ([[development/release]]). Known open work, from the sources cited:

1. First release from this repository, which waits on each package's npm trusted publisher and then on the owner setting `RELEASE_ENABLED`; the checklist and what the toggle triggers are in [[development/release]]. It ships the openapi-utils bundling fix (#1), the inlined Effect types (#4), the path encoding, raw body, untagged operation and `request()` fixes (#17, #23 to #26), the fetcher's empty body and header case fixes (#28), Zoom's basic auth token refresh (#30), the API's message in `ApiError` (#33), the failure cause and response body kept on fetcher errors (#37), the exported fetcher types in the `keycloak-api` and `v0-api` declarations (#42) and aborting the request when an Effect operation is interrupted (#46), plus the spec updates merged in #56 to #61 and the spec source switch in #64, which is a major for `litellm-api`.
2. That first release is a major for every published client: the five Effect clients for Effect 4 ([[decisions/2026-10-08-effect-4-major]]), and all eight for the HTTP error shape change (#9, `.changeset/http-errors-as-api-error.md`). The full list of pending changesets is in [[development/release]].
3. Scheduled client regeneration, off because `SPEC_UPDATES_ENABLED` is unset. #64 repointed the dead `litellm-api` and `zoom-api-js` spec URLs (merged 2026-10-21); each matrix job now has `timeout-minutes: 45`, which `cloudflare-api-js` may still exceed (its generate ran past 27 minutes without finishing). Details in [[architecture/pipeline]].

The older clients' fetchers used to report an HTTP error status as `NetworkError` rather than `ApiError` (#6). #8 fixed that, and each Effect client's `src/effect.test.ts` asserts `ApiError` with the status (checked 2026-10-13).

Add a note here for planning detail that does not fit a line, and link it from this list.
