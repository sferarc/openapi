---
"vercel-api-js": minor
---

Generate the spec's HEAD operations, which the client used to drop: `artifacts.artifactExists` checks whether a Remote Cache artifact exists, and `vcr.headByTeamSlugByProjectSlugByRepositoryNameBlobsByDigest` and `vcr.headByTeamSlugByProjectSlugByRepositoryNameManifestsByReference` check a registry blob or manifest before a push, and `marketplace.headInstallationsByIntegrationConfigurationIdResourcesByResourceIdExperimentationGlobalConfig` checks an experimentation global config. Each resolves to `void`, since a HEAD response has no body, although the spec copies the GET body onto the experimentation check. The regeneration also picks up new `defaultFor` values of the drain source and the `privateNpmUsage` permission from the live spec.
