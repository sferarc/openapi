# Plans

The repository has no roadmap file and no open issues (checked 2026-10-08). Known open work, from the sources cited:

1. First release from this repository, which waits on the owner setting `RELEASE_ENABLED` ([[development/release]]). It ships the openapi-utils bundling fix and the first `clickhouse-cloud` version.
2. Inline the `@sferadev/openapi-utils/effect` types into each client's `effect` declarations, or publish the package, so consumers can resolve them (#1, [[decisions/2026-10-08-bundle-openapi-utils]]). In flight in #4, not merged as of 2026-10-08.
3. The move to effect 4, as its own major release ([[decisions/2026-10-08-effect-3-kept-back]]).

Add a note here for planning detail that does not fit a line, and link it from this list.
