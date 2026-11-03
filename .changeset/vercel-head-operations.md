---
"vercel-api-js": minor
---

Generate the spec's HEAD operations, which the client used to drop: `artifacts.artifactExists` checks whether a Remote Cache artifact exists, and `vcr.headByTeamSlugByProjectSlugByRepositoryNameBlobsByDigest` and `vcr.headByTeamSlugByProjectSlugByRepositoryNameManifestsByReference` check a registry blob or manifest before a push. The regeneration also picks up new `defaultFor` values of the drain source from the live spec.
