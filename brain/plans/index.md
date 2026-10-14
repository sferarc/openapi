# Plans

The repository has no roadmap file. Its one open issue, #15, concerns `hq-stack.yml`, which is rendered from sferarc/hq and not edited here ([[development/ci]]) (checked 2026-10-14). Known open work, from the sources cited:

1. First release from this repository, which waits on the owner setting `RELEASE_ENABLED` ([[development/release]]). It ships the openapi-utils bundling fix (#1), the inlined Effect types (#4), the first `clickhouse-cloud` version (#2), and the path encoding, raw body, untagged operation and `request()` fixes (#17, #23 to #26).
2. That first release is a major for every published client: the five Effect clients for Effect 4 ([[decisions/2026-10-08-effect-4-major]]), and all eight for the HTTP error shape change (#9, `.changeset/http-errors-as-api-error.md`). The full list of pending changesets is in [[development/release]].

The older clients' fetchers used to report an HTTP error status as `NetworkError` rather than `ApiError` (#6). #8 fixed that, and each Effect client's `src/effect.test.ts` asserts `ApiError` with the status (checked 2026-10-13).

Add a note here for planning detail that does not fit a line, and link it from this list.
