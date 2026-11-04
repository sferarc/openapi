# Operations

Generated from the Netlify's API documentation 2.63.1 OpenAPI spec; do not edit. 188 operations. Call an operation as `client.api.<tag>.<operation>(params)`, or by its request as `client.request("<METHOD> <path>", params)`.

## site

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.site.listSites` | `GET /sites` | List sites |
| `client.api.site.createSite` | `POST /sites` | Create a site |
| `client.api.site.getSite` | `GET /sites/{site_id}` | Get a site |
| `client.api.site.updateSite` | `PATCH /sites/{site_id}` | Update a site |
| `client.api.site.deleteSite` | `DELETE /sites/{site_id}` | Delete a site |
| `client.api.site.unlinkSiteRepo` | `PUT /sites/{site_id}/unlink_repo` | Unlink a site's repository |
| `client.api.site.enableSite` | `PUT /sites/{site_id}/enable` | Enable a site |
| `client.api.site.disableSite` | `PUT /sites/{site_id}/disable` | Disable a site |
| `client.api.site.createSiteInTeam` | `POST /{account_slug}/sites` | Create a site in a team |
| `client.api.site.listSitesForAccount` | `GET /{account_slug}/sites` | List a team's sites |

## snicertificate

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.snicertificate.provisionSiteTLSCertificate` | `POST /sites/{site_id}/ssl` | Provision or update a site's TLS certificate |
| `client.api.snicertificate.showSiteTLSCertificate` | `GET /sites/{site_id}/ssl` | Get a site's TLS certificate |
| `client.api.snicertificate.getAllCertificates` | `GET /sites/{site_id}/ssl/certificates` | List TLS certificates for a site's domain |

## environmentvariables

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.environmentvariables.getEnvVars` | `GET /accounts/{account_id}/env` | List environment variables for a team or site |
| `client.api.environmentvariables.createEnvVars` | `POST /accounts/{account_id}/env` | Create environment variables |
| `client.api.environmentvariables.getSiteEnvVars` | `GET /sites/{site_id}/env` | List environment variables for a site |
| `client.api.environmentvariables.getEnvVar` | `GET /accounts/{account_id}/env/{key}` | Get an environment variable |
| `client.api.environmentvariables.updateEnvVar` | `PUT /accounts/{account_id}/env/{key}` | Update an environment variable |
| `client.api.environmentvariables.setEnvVarValue` | `PATCH /accounts/{account_id}/env/{key}` | Set a value on an environment variable |
| `client.api.environmentvariables.deleteEnvVar` | `DELETE /accounts/{account_id}/env/{key}` | Delete an environment variable |
| `client.api.environmentvariables.deleteEnvVarValue` | `DELETE /accounts/{account_id}/env/{key}/value/{id}` | Delete an environment variable value |

## function

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.function.searchSiteFunctions` | `GET /sites/{site_id}/functions` | Search a site's functions |
| `client.api.function.uploadDeployFunction` | `PUT /deploys/{deploy_id}/functions/{name}` | Upload a deploy function |

## form

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.form.listSiteForms` | `GET /sites/{site_id}/forms` | List a site's forms |
| `client.api.form.deleteSiteForm` | `DELETE /sites/{site_id}/forms/{form_id}` | Delete a form |

## submission

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.submission.listSiteSubmissions` | `GET /sites/{site_id}/submissions` | List a site's form submissions |
| `client.api.submission.listFormSubmissions` | `GET /forms/{form_id}/submissions` | List a form's submissions |
| `client.api.submission.listFormSubmission` | `GET /submissions/{submission_id}` | Get a form submission |
| `client.api.submission.deleteSubmission` | `DELETE /submissions/{submission_id}` | Delete a form submission |

## file

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.file.listSiteFiles` | `GET /sites/{site_id}/files` | List a site's files |
| `client.api.file.getSiteFileByPathName` | `GET /sites/{site_id}/files/{file_path}` | Get a site file by path |
| `client.api.file.uploadDeployFile` | `PUT /deploys/{deploy_id}/files/{path}` | Upload a deploy file |

## asset

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.asset.listSiteAssets` | `GET /sites/{site_id}/assets` | List a site's assets |
| `client.api.asset.createSiteAsset` | `POST /sites/{site_id}/assets` | Create a site asset |
| `client.api.asset.getSiteAssetInfo` | `GET /sites/{site_id}/assets/{asset_id}` | Get a site asset |
| `client.api.asset.updateSiteAsset` | `PUT /sites/{site_id}/assets/{asset_id}` | Update a site asset's state |
| `client.api.asset.deleteSiteAsset` | `DELETE /sites/{site_id}/assets/{asset_id}` | Delete a site asset |

## assetpublicsignature

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.assetpublicsignature.getSiteAssetPublicSignature` | `GET /sites/{site_id}/assets/{asset_id}/public_signature` | Get a site asset's URL |

## purge

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.purge.purgeCache` | `POST /purge` | Purge cached content |

## snippet

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.snippet.listSiteSnippets` | `GET /sites/{site_id}/snippets` | List a site's snippets |
| `client.api.snippet.createSiteSnippet` | `POST /sites/{site_id}/snippets` | Create a snippet |
| `client.api.snippet.getSiteSnippet` | `GET /sites/{site_id}/snippets/{snippet_id}` | Get a snippet |
| `client.api.snippet.updateSiteSnippet` | `PUT /sites/{site_id}/snippets/{snippet_id}` | Update a snippet |
| `client.api.snippet.deleteSiteSnippet` | `DELETE /sites/{site_id}/snippets/{snippet_id}` | Delete a snippet |

## metadata

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.metadata.getSiteMetadata` | `GET /sites/{site_id}/metadata` | Get a site's metadata |
| `client.api.metadata.updateSiteMetadata` | `PUT /sites/{site_id}/metadata` | Update a site's metadata |

## buildhook

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.buildhook.listSiteBuildHooks` | `GET /sites/{site_id}/build_hooks` | List a site's build hooks |
| `client.api.buildhook.createSiteBuildHook` | `POST /sites/{site_id}/build_hooks` | Create a build hook |
| `client.api.buildhook.getSiteBuildHook` | `GET /sites/{site_id}/build_hooks/{id}` | Get a build hook |
| `client.api.buildhook.updateSiteBuildHook` | `PUT /sites/{site_id}/build_hooks/{id}` | Update a build hook |
| `client.api.buildhook.deleteSiteBuildHook` | `DELETE /sites/{site_id}/build_hooks/{id}` | Delete a build hook |

## deploy

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.deploy.listSiteDeploys` | `GET /sites/{site_id}/deploys` | List a site's deploys |
| `client.api.deploy.createSiteDeploy` | `POST /sites/{site_id}/deploys` | Create a deploy |
| `client.api.deploy.getSiteDeploy` | `GET /sites/{site_id}/deploys/{deploy_id}` | Get a site's deploy |
| `client.api.deploy.updateSiteDeploy` | `PUT /sites/{site_id}/deploys/{deploy_id}` | Update a deploy |
| `client.api.deploy.deleteSiteDeploy` | `DELETE /sites/{site_id}/deploys/{deploy_id}` | Delete a site's deploy |
| `client.api.deploy.cancelSiteDeploy` | `POST /deploys/{deploy_id}/cancel` | Cancel a deploy |
| `client.api.deploy.restoreSiteDeploy` | `POST /sites/{site_id}/deploys/{deploy_id}/restore` | Restore a previous deploy |
| `client.api.deploy.rollbackSiteDeploy` | `PUT /sites/{site_id}/rollback` | Roll back a site's production deploy |
| `client.api.deploy.getDeploy` | `GET /deploys/{deploy_id}` | Get a deploy |
| `client.api.deploy.deleteDeploy` | `DELETE /deploys/{deploy_id}` | Delete a deploy |
| `client.api.deploy.updateDeployValidations` | `PATCH /deploys/{deploy_id}/validations_report` | Update a deploy's validations report |
| `client.api.deploy.lockDeploy` | `POST /deploys/{deploy_id}/lock` | Lock a deploy |
| `client.api.deploy.unlockDeploy` | `POST /deploys/{deploy_id}/unlock` | Unlock a deploy |
| `client.api.deploy.uploadDeployServer` | `PUT /deploys/{deploy_id}/server/{code_sha}` | Upload a deploy's Netlify Server bundle |

## build

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.build.listSiteBuilds` | `GET /sites/{site_id}/builds` | List a site's builds |
| `client.api.build.createSiteBuild` | `POST /sites/{site_id}/builds` | Start a build |
| `client.api.build.getSiteBuild` | `GET /builds/{build_id}` | Get a build |
| `client.api.build.notifyBuildStart` | `POST /builds/{build_id}/start` | Mark a build as started |
| `client.api.build.getAccountBuildStatus` | `GET /{account_id}/builds/status` | Get a team's build status |

## deployedbranch

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.deployedbranch.listSiteDeployedBranches` | `GET /sites/{site_id}/deployed-branches` | List a site's deployed branches |

## buildlogmsg

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.buildlogmsg.updateSiteBuildLog` | `POST /builds/{build_id}/log` | Add a message to a build log |

## dnszone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dnszone.getDNSForSite` | `GET /sites/{site_id}/dns` | Get a site's DNS configuration |
| `client.api.dnszone.configureDNSForSite` | `PUT /sites/{site_id}/dns` | Configure a site's DNS |
| `client.api.dnszone.createDnsZone` | `POST /dns_zones` | Create a DNS zone |
| `client.api.dnszone.getDnsZones` | `GET /dns_zones` | List DNS zones |
| `client.api.dnszone.getDnsZone` | `GET /dns_zones/{zone_id}` | Get a DNS zone |
| `client.api.dnszone.deleteDnsZone` | `DELETE /dns_zones/{zone_id}` | Delete a DNS zone |
| `client.api.dnszone.transferDnsZone` | `PUT /dns_zones/{zone_id}/transfer` | Transfer a DNS zone to another team |
| `client.api.dnszone.getDnsRecords` | `GET /dns_zones/{zone_id}/dns_records` | List a DNS zone's records |
| `client.api.dnszone.createDnsRecord` | `POST /dns_zones/{zone_id}/dns_records` | Create a DNS record |
| `client.api.dnszone.getIndividualDnsRecord` | `GET /dns_zones/{zone_id}/dns_records/{dns_record_id}` | Get a DNS record |
| `client.api.dnszone.deleteDnsRecord` | `DELETE /dns_zones/{zone_id}/dns_records/{dns_record_id}` | Delete a DNS record |

## edgefunction

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.edgefunction.uploadDeployEdgeFunction` | `PUT /deploys/{deploy_id}/edge_functions/{code_sha}` | Upload a deploy's edge functions bundle |

## xInternal

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.xInternal.getLatestPluginRuns` | `GET /sites/{site_id}/plugin_runs/latest` | List a site's latest build plugin runs |
| `client.api.xInternal.createPluginRun` | `POST /deploys/{deploy_id}/plugin_runs` | Create a build plugin run |
| `client.api.xInternal.updatePlugin` | `PUT /sites/{site_id}/plugins/{_package}` | Update a site's build plugin |

## hook

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.hook.listHooksBySiteId` | `GET /hooks` | List a site's outgoing hooks |
| `client.api.hook.createHookBySiteId` | `POST /hooks` | Create an outgoing hook |
| `client.api.hook.getHook` | `GET /hooks/{hook_id}` | Get an outgoing hook |
| `client.api.hook.updateHook` | `PUT /hooks/{hook_id}` | Update an outgoing hook |
| `client.api.hook.deleteHook` | `DELETE /hooks/{hook_id}` | Delete an outgoing hook |
| `client.api.hook.enableHook` | `POST /hooks/{hook_id}/enable` | Re-enable an outgoing hook |

## hooktype

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.hooktype.listHookTypes` | `GET /hooks/types` | List outgoing hook types |

## ticket

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ticket.createTicket` | `POST /oauth/tickets` | Create an OAuth ticket |
| `client.api.ticket.showTicket` | `GET /oauth/tickets/{ticket_id}` | Get an OAuth ticket |

## accesstoken

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accesstoken.exchangeTicket` | `POST /oauth/tickets/{ticket_id}/exchange` | Exchange an OAuth ticket for an access token |

## deploykey

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.deploykey.listDeployKeys` | `GET /deploy_keys` | List deploy keys |
| `client.api.deploykey.createDeployKey` | `POST /deploy_keys` | Create a deploy key |
| `client.api.deploykey.getDeployKey` | `GET /deploy_keys/{key_id}` | Get a deploy key |
| `client.api.deploykey.deleteDeployKey` | `DELETE /deploy_keys/{key_id}` | Delete a deploy key |

## member

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.member.listMembersForAccount` | `GET /{account_slug}/members` | List a team's members |
| `client.api.member.addMemberToAccount` | `POST /{account_slug}/members` | Add a member to a team |
| `client.api.member.getAccountMember` | `GET /{account_slug}/members/{member_id}` | Get a team member |
| `client.api.member.updateAccountMember` | `PUT /{account_slug}/members/{member_id}` | Update a team member |
| `client.api.member.removeAccountMember` | `DELETE /{account_slug}/members/{member_id}` | Remove a team member |

## paymentmethod

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.paymentmethod.listPaymentMethodsForUser` | `GET /billing/payment_methods` | List payment methods |

## accounttype

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accounttype.listAccountTypesForUser` | `GET /accounts/types` | List plans available for new teams |

## accountmembership

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountmembership.listAccountsForUser` | `GET /accounts` | List the current user's teams |
| `client.api.accountmembership.createAccount` | `POST /accounts` | Create a team |
| `client.api.accountmembership.getAccount` | `GET /accounts/{account_id}` | Get a team |
| `client.api.accountmembership.updateAccount` | `PUT /accounts/{account_id}` | Update a team |
| `client.api.accountmembership.cancelAccount` | `DELETE /accounts/{account_id}` | Cancel a team |

## auditlog

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.auditlog.listAccountAuditEvents` | `GET /accounts/{account_id}/audit` | List a team's audit log events |

## agentrunner

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.agentrunner.listAgentRunners` | `GET /agent_runners` | List a site's agent runs |
| `client.api.agentrunner.createAgentRunner` | `POST /agent_runners` | Start an agent run |
| `client.api.agentrunner.createSiteAgentRunner` | `POST /sites/{site_id}/agent_runners` | Start an agent run on a site |
| `client.api.agentrunner.createAgentRunnerUploadUrl` | `POST /agent_runners/upload_url` | Create an upload URL for agent run files |
| `client.api.agentrunner.getAgentRunner` | `GET /agent_runners/{agent_runner_id}` | Get an agent run |
| `client.api.agentrunner.updateAgentRunner` | `PATCH /agent_runners/{agent_runner_id}` | Update an agent run |
| `client.api.agentrunner.stopAgentRunner` | `POST /agent_runners/{agent_runner_id}/stop` | Stop an agent run |
| `client.api.agentrunner.getAgentRunnerDiff` | `GET /agent_runners/{agent_runner_id}/diff` | Get an agent run's diff |
| `client.api.agentrunner.archiveAgentRunner` | `POST /agent_runners/{agent_runner_id}/archive` | Archive an agent run |
| `client.api.agentrunner.agentRunnerPullRequest` | `POST /agent_runners/{agent_runner_id}/pull_request` | Open a pull request from an agent run |
| `client.api.agentrunner.agentRunnerCommitToBranch` | `POST /agent_runners/{agent_runner_id}/commit` | Commit an agent run's changes to a branch |

## hiddenagentrunner

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.hiddenagentrunner.deleteAgentRunner` | `DELETE /agent_runners/{agent_runner_id}` | Stop an agent run (alias) |
| `client.api.hiddenagentrunner.deleteAgentRunnerSession` | `DELETE /agent_runners/{agent_runner_id}/sessions/{agent_runner_session_id}` | Stop an agent run session (alias) |

## agentrunnersession

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.agentrunnersession.listAgentRunnerSessions` | `GET /agent_runners/{agent_runner_id}/sessions` | List an agent run's sessions |
| `client.api.agentrunnersession.createAgentRunnerSession` | `POST /agent_runners/{agent_runner_id}/sessions` | Start a follow-up agent run session |
| `client.api.agentrunnersession.getAgentRunnerSession` | `GET /agent_runners/{agent_runner_id}/sessions/{agent_runner_session_id}` | Get an agent run session |
| `client.api.agentrunnersession.updateAgentRunnerSession` | `PATCH /agent_runners/{agent_runner_id}/sessions/{agent_runner_session_id}` | Update an agent run session |
| `client.api.agentrunnersession.stopAgentRunnerSession` | `POST /agent_runners/{agent_runner_id}/sessions/{agent_runner_session_id}/stop` | Stop an agent run session |
| `client.api.agentrunnersession.answerAgentRunnerSession` | `POST /agent_runners/{agent_runner_id}/sessions/{agent_runner_session_id}/answers` | Answer an agent run session's pending interaction |

## serviceinstance

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.serviceinstance.listServiceInstancesForSite` | `GET /sites/{site_id}/service-instances` | List a site's add-on instances |
| `client.api.serviceinstance.createServiceInstance` | `POST /sites/{site_id}/services/{addon}/instances` | Create an add-on instance |
| `client.api.serviceinstance.showServiceInstance` | `GET /sites/{site_id}/services/{addon}/instances/{instance_id}` | Get an add-on instance |
| `client.api.serviceinstance.updateServiceInstance` | `PUT /sites/{site_id}/services/{addon}/instances/{instance_id}` | Update an add-on instance |
| `client.api.serviceinstance.deleteServiceInstance` | `DELETE /sites/{site_id}/services/{addon}/instances/{instance_id}` | Delete an add-on instance |

## identityuser

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.identityuser.getIdentityUser` | `GET /sites/{site_id}/identity/{identity_id}/users/{user_id}` | Get an Identity user |
| `client.api.identityuser.lookupIdentityUser` | `POST /sites/{site_id}/identity/{identity_id}/users/lookup` | Look up an Identity user by email |

## service

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.service.getServices` | `GET /services/` | List add-on services |
| `client.api.service.showService` | `GET /services/{addonName}` | Get an add-on service |
| `client.api.service.showServiceManifest` | `GET /services/{addonName}/manifest` | Get an add-on service's manifest |

## user

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.user.getCurrentUser` | `GET /user` | Get the current user |

## splittest

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.splittest.createSplitTest` | `POST /sites/{site_id}/traffic_splits` | Create a split test |
| `client.api.splittest.getSplitTests` | `GET /sites/{site_id}/traffic_splits` | List a site's split tests |
| `client.api.splittest.updateSplitTest` | `PUT /sites/{site_id}/traffic_splits/{split_test_id}` | Update a split test |
| `client.api.splittest.getSplitTest` | `GET /sites/{site_id}/traffic_splits/{split_test_id}` | Get a split test |
| `client.api.splittest.enableSplitTest` | `POST /sites/{site_id}/traffic_splits/{split_test_id}/publish` | Publish a split test |
| `client.api.splittest.disableSplitTest` | `POST /sites/{site_id}/traffic_splits/{split_test_id}/unpublish` | Unpublish a split test |

## devserver

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.devserver.listSiteDevServers` | `GET /sites/{site_id}/dev_servers` | List a site's dev servers |
| `client.api.devserver.createSiteDevServer` | `POST /sites/{site_id}/dev_servers` | Start a dev server |
| `client.api.devserver.deleteSiteDevServers` | `DELETE /sites/{site_id}/dev_servers` | Stop a branch's dev servers |
| `client.api.devserver.getSiteDevServer` | `GET /sites/{site_id}/dev_servers/{dev_server_id}` | Get a dev server |
| `client.api.devserver.markDevServerActivity` | `POST /sites/{site_id}/dev_servers/{dev_server_id}/activity` | Record dev server activity |
| `client.api.devserver.updateDevServerState` | `POST /sites/{site_id}/dev_servers/{dev_server_id}/state` | Update a dev server's state |

## devserverhook

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.devserverhook.listSiteDevServerHooks` | `GET /sites/{site_id}/dev_server_hooks` | List a site's dev server hooks |
| `client.api.devserverhook.createSiteDevServerHook` | `POST /sites/{site_id}/dev_server_hooks` | Create a dev server hook |
| `client.api.devserverhook.getSiteDevServerHook` | `GET /sites/{site_id}/dev_server_hooks/{id}` | Get a dev server hook |
| `client.api.devserverhook.updateSiteDevServerHook` | `PUT /sites/{site_id}/dev_server_hooks/{id}` | Update a dev server hook |
| `client.api.devserverhook.deleteSiteDevServerHook` | `DELETE /sites/{site_id}/dev_server_hooks/{id}` | Delete a dev server hook |

## agentrunnerhook

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.agentrunnerhook.listSiteAgentRunnerHooks` | `GET /sites/{site_id}/agent_runner_hooks` | List a site's agent runner hooks |
| `client.api.agentrunnerhook.createSiteAgentRunnerHook` | `POST /sites/{site_id}/agent_runner_hooks` | Create an agent runner hook |
| `client.api.agentrunnerhook.getSiteAgentRunnerHook` | `GET /sites/{site_id}/agent_runner_hooks/{id}` | Get an agent runner hook |
| `client.api.agentrunnerhook.updateSiteAgentRunnerHook` | `PUT /sites/{site_id}/agent_runner_hooks/{id}` | Update an agent runner hook |
| `client.api.agentrunnerhook.deleteSiteAgentRunnerHook` | `DELETE /sites/{site_id}/agent_runner_hooks/{id}` | Delete an agent runner hook |

## aigateway

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aigateway.getAIGatewayProviders` | `GET /ai-gateway/providers` | List AI Gateway providers and models |
| `client.api.aigateway.getAIGatewayToken` | `GET /sites/{site_id}/ai-gateway/token` | Get a site's AI Gateway token |
| `client.api.aigateway.getAccountAIGatewayToken` | `GET /accounts/{account_id}/ai-gateway/token` | Get a team's AI Gateway token |

## database

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.database.createSiteDatabase` | `POST /sites/{site_id}/database` | Create a site database |
| `client.api.database.getSiteDatabase` | `GET /sites/{site_id}/database` | Get a site database |
| `client.api.database.deleteSiteDatabase` | `DELETE /sites/{site_id}/database` | Delete a site database |
| `client.api.database.createSiteDatabaseBranch` | `POST /sites/{site_id}/database/branch` | Create a database branch |
| `client.api.database.listSiteDatabaseBranches` | `GET /sites/{site_id}/database/branches` | List database branches |
| `client.api.database.getSiteDatabaseBranch` | `GET /sites/{site_id}/database/branch/{branch_id}` | Get a database branch |
| `client.api.database.deleteSiteDatabaseBranch` | `DELETE /sites/{site_id}/database/branch/{branch_id}` | Delete a database branch |
| `client.api.database.resetSiteDatabaseBranch` | `POST /sites/{site_id}/database/branch/{branch_id}/reset` | Reset a database branch |
| `client.api.database.setSiteDatabaseBranchComputeSettings` | `PUT /sites/{site_id}/database/branch/{branch_id}/compute/settings` | Set a database branch's compute settings |
| `client.api.database.setSiteDatabaseComputeSettings` | `PUT /sites/{site_id}/database/compute/settings` | Set database compute settings |
| `client.api.database.getSiteDatabaseComputeSettings` | `GET /sites/{site_id}/database/compute/settings` | Get database compute settings |
| `client.api.database.clearSiteDatabaseComputeSettings` | `DELETE /sites/{site_id}/database/compute/settings` | Reset database compute settings to defaults |
| `client.api.database.listSiteDatabaseMigrations` | `GET /sites/{site_id}/database/migrations` | List database migrations |
| `client.api.database.getSiteDatabaseMigration` | `GET /sites/{site_id}/database/migrations/{name}` | Get a database migration |
| `client.api.database.runSiteDatabaseMigrations` | `POST /sites/{site_id}/database/migrations/{deploy_id}` | Run database migrations for a deploy |
| `client.api.database.createSiteDatabaseSnapshot` | `POST /sites/{site_id}/database/snapshot` | Create a database snapshot |
| `client.api.database.listSiteDatabaseSnapshots` | `GET /sites/{site_id}/database/snapshots` | List database snapshots |
| `client.api.database.deleteSiteDatabaseSnapshot` | `DELETE /sites/{site_id}/database/snapshot/{snapshot_id}` | Delete a database snapshot |
| `client.api.database.restoreSiteDatabaseSnapshot` | `POST /sites/{site_id}/database/snapshot/{snapshot_id}/restore` | Restore a database snapshot |
