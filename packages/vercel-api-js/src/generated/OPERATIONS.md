# Operations

Generated from the Vercel API 0.0.1 OpenAPI spec; do not edit. 487 operations. Call an operation as `client.api.<tag>.<operation>(params)`, or by its request as `client.request("<METHOD> <path>", params)`.

## accessGroups

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessGroups.readAccessGroup` | `GET /v1/access-groups/{idOrName}` | Reads an access group |
| `client.api.accessGroups.updateAccessGroup` | `POST /v1/access-groups/{idOrName}` | Update an access group |
| `client.api.accessGroups.deleteAccessGroup` | `DELETE /v1/access-groups/{idOrName}` | Deletes an access group |
| `client.api.accessGroups.listAccessGroupMembers` | `GET /v1/access-groups/{idOrName}/members` | List members of an access group |
| `client.api.accessGroups.listAccessGroups` | `GET /v1/access-groups` | List access groups for a team, project or member |
| `client.api.accessGroups.createAccessGroup` | `POST /v1/access-groups` | Creates an access group |
| `client.api.accessGroups.listAccessGroupProjects` | `GET /v1/access-groups/{idOrName}/projects` | List projects of an access group |
| `client.api.accessGroups.createAccessGroupProject` | `POST /v1/access-groups/{accessGroupIdOrName}/projects` | Create an access group project |
| `client.api.accessGroups.readAccessGroupProject` | `GET /v1/access-groups/{accessGroupIdOrName}/projects/{projectId}` | Reads an access group project |
| `client.api.accessGroups.updateAccessGroupProject` | `PATCH /v1/access-groups/{accessGroupIdOrName}/projects/{projectId}` | Update an access group project |
| `client.api.accessGroups.deleteAccessGroupProject` | `DELETE /v1/access-groups/{accessGroupIdOrName}/projects/{projectId}` | Delete an access group project |

## aiGateway

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aiGateway.createAiGatewayByokCredential` | `POST /ai-gateway/byok-credentials` | Create a BYOK credential |
| `client.api.aiGateway.listAiGatewayByokCredentials` | `GET /ai-gateway/byok-credentials/list` | List BYOK credentials |
| `client.api.aiGateway.getAiGatewayByokCredential` | `GET /ai-gateway/byok-credentials/{credentialId}` | Get a BYOK credential |
| `client.api.aiGateway.updateAiGatewayByokCredential` | `PATCH /ai-gateway/byok-credentials/{credentialId}` | Update a BYOK credential |
| `client.api.aiGateway.deleteAiGatewayByokCredential` | `DELETE /ai-gateway/byok-credentials/{credentialId}` | Delete a BYOK credential |
| `client.api.aiGateway.createAiGatewayVirtualModelConfig` | `POST /ai-gateway/virtual-model-configs` | Create virtual model config |
| `client.api.aiGateway.getAiGatewayVirtualModelConfig` | `GET /ai-gateway/virtual-model-configs` | Get virtual model config |
| `client.api.aiGateway.updateAiGatewayVirtualModelConfig` | `PATCH /ai-gateway/virtual-model-configs` | Update virtual model config |
| `client.api.aiGateway.deleteAiGatewayVirtualModelConfig` | `DELETE /ai-gateway/virtual-model-configs` | Delete virtual model config |
| `client.api.aiGateway.listAiGatewayVirtualModelConfigs` | `GET /ai-gateway/virtual-model-configs/list` | List virtual model configs |
| `client.api.aiGateway.getAiGatewayVirtualModelConfigBySlug` | `GET /ai-gateway/virtual-model-configs/{vmcSlug}` | Get virtual model config |
| `client.api.aiGateway.updateAiGatewayVirtualModelConfigBySlug` | `PATCH /ai-gateway/virtual-model-configs/{vmcSlug}` | Update virtual model config |
| `client.api.aiGateway.deleteAiGatewayVirtualModelConfigBySlug` | `DELETE /ai-gateway/virtual-model-configs/{vmcSlug}` | Delete virtual model config |
| `client.api.aiGateway.listAiGatewayRouters` | `GET /v1/ai-gateway/routers` | List AI Gateway routers |
| `client.api.aiGateway.createAiGatewayRule` | `POST /ai-gateway/rules` | Create rule |
| `client.api.aiGateway.listAiGatewayRules` | `GET /ai-gateway/rules` | List rules |
| `client.api.aiGateway.updateAiGatewayRule` | `PATCH /ai-gateway/rules` | Update rule |
| `client.api.aiGateway.deleteAiGatewayRule` | `DELETE /ai-gateway/rules` | Delete rule |
| `client.api.aiGateway.listAiGatewayBudgets` | `GET /ai-gateway/budgets/list` | List AI Gateway budgets |
| `client.api.aiGateway.upsertAiGatewayBudget` | `PUT /ai-gateway/budgets` | Upsert AI Gateway budget |
| `client.api.aiGateway.archiveAiGatewayBudget` | `DELETE /ai-gateway/budgets` | Archive AI Gateway budget |
| `client.api.aiGateway.listAiGatewayBudgetDefaults` | `GET /ai-gateway/budgets/defaults/list` | List AI Gateway budget defaults |
| `client.api.aiGateway.upsertAiGatewayBudgetDefault` | `PUT /ai-gateway/budgets/defaults` | Upsert AI Gateway budget default |
| `client.api.aiGateway.archiveAiGatewayBudgetDefault` | `DELETE /ai-gateway/budgets/defaults` | Archive AI Gateway budget default |
| `client.api.aiGateway.updateApiKeyQuota` | `PATCH /api-keys/{apiKeyID}/quota` | Update an AI Gateway API key budget |

## artifacts

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.artifacts.recordEvents` | `POST /v8/artifacts/events` | Record an artifacts cache usage event |
| `client.api.artifacts.status` | `GET /v8/artifacts/status` | Get status of Remote Caching for this principal |
| `client.api.artifacts.uploadArtifact` | `PUT /v8/artifacts/{hash}` | Upload a cache artifact |
| `client.api.artifacts.downloadArtifact` | `GET /v8/artifacts/{hash}` | Download a cache artifact |
| `client.api.artifacts.artifactExists` | `HEAD /v8/artifacts/{hash}` | Check if a cache artifact exists |
| `client.api.artifacts.artifactQuery` | `POST /v8/artifacts` | Query information about an artifact |
| `client.api.artifacts.deleteAllArtifacts` | `DELETE /v8/artifacts` | Delete all cache artifacts |

## billing

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.billing.listBillingCharges` | `GET /v1/billing/charges` | List FOCUS billing charges |
| `client.api.billing.listContractCommitments` | `GET /v1/billing/contract-commitments` | List FOCUS contract commitments |
| `client.api.billing.buyCredits` | `POST /v1/billing/buy` | Purchase credits |

## bulkRedirects

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.bulkRedirects.stageRedirects` | `PUT /v1/bulk-redirects` | Stages new redirects for a project. |
| `client.api.bulkRedirects.getRedirects` | `GET /v1/bulk-redirects` | Gets project-level redirects. |
| `client.api.bulkRedirects.deleteRedirects` | `DELETE /v1/bulk-redirects` | Delete project-level redirects. |
| `client.api.bulkRedirects.editRedirect` | `PATCH /v1/bulk-redirects` | Edit a project-level redirect. |
| `client.api.bulkRedirects.restoreRedirects` | `POST /v1/bulk-redirects/restore` | Restore staged project-level redirects to their production version. |
| `client.api.bulkRedirects.getVersions` | `GET /v1/bulk-redirects/versions` | Get the version history for a project's redirects. |
| `client.api.bulkRedirects.updateVersion` | `POST /v1/bulk-redirects/versions` | Promote a staging version to production or restore a previous production version. |

## checksV2

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.checksV2.listProjectChecks` | `GET /v2/projects/{projectIdOrName}/checks` | List all checks for a project |
| `client.api.checksV2.createProjectCheck` | `POST /v2/projects/{projectIdOrName}/checks` | Create a check |
| `client.api.checksV2.getProjectCheck` | `GET /v2/projects/{projectIdOrName}/checks/{checkId}` | Get a check |
| `client.api.checksV2.updateProjectCheck` | `PATCH /v2/projects/{projectIdOrName}/checks/{checkId}` | Update a check |
| `client.api.checksV2.deleteProjectCheck` | `DELETE /v2/projects/{projectIdOrName}/checks/{checkId}` | Delete a check |
| `client.api.checksV2.listCheckRuns` | `GET /v2/projects/{projectIdOrName}/checks/{checkId}/runs` | List runs for a check |
| `client.api.checksV2.listDeploymentCheckRuns` | `GET /v2/deployments/{deploymentId}/check-runs` | List check runs for a deployment |
| `client.api.checksV2.createDeploymentCheckRun` | `POST /v2/deployments/{deploymentId}/check-runs` | Create a check run |
| `client.api.checksV2.getDeploymentCheckRun` | `GET /v2/deployments/{deploymentId}/check-runs/{checkRunId}` | Get a check run |
| `client.api.checksV2.updateDeploymentCheckRun` | `PATCH /v2/deployments/{deploymentId}/check-runs/{checkRunId}` | Update a check run |

## checks

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.checks.createCheck` | `POST /v1/deployments/{deploymentId}/checks` | Creates a new Check |
| `client.api.checks.getAllChecks` | `GET /v1/deployments/{deploymentId}/checks` | Retrieve a list of all checks |
| `client.api.checks.getCheck` | `GET /v1/deployments/{deploymentId}/checks/{checkId}` | Get a single check |
| `client.api.checks.updateCheck` | `PATCH /v1/deployments/{deploymentId}/checks/{checkId}` | Update a check |
| `client.api.checks.rerequestCheck` | `POST /v1/deployments/{deploymentId}/checks/{checkId}/rerequest` | Rerequest a check |

## networking

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.networking.listNetworks` | `GET /v1/connect/networks` | List Secure Compute networks |
| `client.api.networking.createNetwork` | `POST /v1/connect/networks` | Create a Secure Compute network |
| `client.api.networking.deleteNetwork` | `DELETE /v1/connect/networks/{networkId}` | Delete a Secure Compute network |
| `client.api.networking.updateNetwork` | `PATCH /v1/connect/networks/{networkId}` | Update a Secure Compute network |
| `client.api.networking.readNetwork` | `GET /v1/connect/networks/{networkId}` | Read a Secure Compute network |
| `client.api.networking.createPrivateLinkEndpoint` | `POST /v1/networking/privatelink/endpoints` | Create a PrivateLink endpoint |
| `client.api.networking.listPrivateLinkEndpoints` | `GET /v1/networking/privatelink/endpoints` | List PrivateLink endpoints |
| `client.api.networking.readPrivateLinkEndpoint` | `GET /v1/networking/privatelink/endpoints/{endpointId}` | Read a PrivateLink endpoint |
| `client.api.networking.deletePrivateLinkEndpoint` | `DELETE /v1/networking/privatelink/endpoints/{endpointId}` | Delete a PrivateLink endpoint |
| `client.api.networking.updatePrivateLinkEndpoint` | `PATCH /v1/networking/privatelink/endpoints/{endpointId}` | Update a PrivateLink endpoint |
| `client.api.networking.updateStaticIps` | `PATCH /v1/projects/{idOrName}/shared-connect-links` | Configures Static IPs for a project |

## connect

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.connect.listConnectors` | `GET /v2/connect/connectors` | List connectors |
| `client.api.connect.getConnector` | `GET /v1/connect/connectors/{connector}` | Get a connector |
| `client.api.connect.deleteConnector` | `DELETE /v1/connect/connectors/{connector}` | Delete a connector |
| `client.api.connect.createConnector` | `POST /v1/connect/connectors` | Create a connector |
| `client.api.connect.updateConnector` | `PATCH /v2/connect/connectors/{connector}` | Update a connector |
| `client.api.connect.replaceConnectorTriggerDestinations` | `PATCH /v1/connect/connectors/{connector}/trigger-destinations` | Update connector trigger destinations |
| `client.api.connect.ejectManagedConnector` | `POST /v1/connect/connectors/{connector}/managed/eject` | Eject a managed connector |
| `client.api.connect.listConnectorProjectConnections` | `GET /v2/connect/connectors/{connector}/projects` | List projects for a connector |
| `client.api.connect.getConnectorProjectConnection` | `GET /v1/connect/connectors/{connector}/projects/{projectId}` | Get a connector project connection |
| `client.api.connect.upsertConnectorProjectConnection` | `POST /v1/connect/connectors/{connector}/projects/{projectId}` | Create or update a connector project connection |
| `client.api.connect.deleteConnectorProjectConnection` | `DELETE /v1/connect/connectors/{connector}/projects/{projectId}` | Disconnect a connector from a project |
| `client.api.connect.disconnectConnectorProjectEnvironment` | `DELETE /v1/connect/connectors/{connector}/projects/{projectId}/environments/{environment}` | Disconnect a connector from a project environment |
| `client.api.connect.listProjectConnectorConnections` | `GET /v2/connect/projects/{projectId}/connectors` | List connectors for a project |
| `client.api.connect.getConnectorToken` | `POST /v1/connect/token/{connector}` | Get a Connect token |
| `client.api.connect.createConnectorAuthorizationRequest` | `POST /v1/connect/authorize/{connector}` | Create a Connect authorization request |

## daemons

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.daemons.getProjectBoxes` | `GET /v1/projects/{idOrName}/daemons` | Get project daemons |
| `client.api.daemons.putProjectDaemonInstances` | `PUT /v1/projects/{idOrName}/daemons/{daemonName}/instances` | Override a project daemon's instance counts |
| `client.api.daemons.restartProjectDaemonInstance` | `POST /v1/projects/{idOrName}/daemons/{daemonName}/instances/{instanceId}/restart` | Force restart a project daemon instance |

## deployments

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.deployments.getDeploymentEvents` | `GET /v3/deployments/{idOrUrl}/events` | Get deployment events |
| `client.api.deployments.updateIntegrationDeploymentAction` | `PATCH /v1/deployments/{deploymentId}/integrations/{integrationConfigurationId}/resources/{resourceId}/actions/{action}` | Update deployment integration action |
| `client.api.deployments.getDeployment` | `GET /v13/deployments/{idOrUrl}` | Get a deployment by ID or URL |
| `client.api.deployments.createDeployment` | `POST /v13/deployments` | Create a new deployment |
| `client.api.deployments.cancelDeployment` | `PATCH /v12/deployments/{id}/cancel` | Cancel a deployment |
| `client.api.deployments.uploadFile` | `POST /v2/files` | Upload Deployment Files |
| `client.api.deployments.listDeploymentFiles` | `GET /v6/deployments/{id}/files` | List Deployment Files |
| `client.api.deployments.getDeploymentFileContents` | `GET /v8/deployments/{id}/files/{fileId}` | Get Deployment File Contents |
| `client.api.deployments.getDeployments` | `GET /v7/deployments` | List deployments |
| `client.api.deployments.deleteDeployment` | `DELETE /v13/deployments/{id}` | Delete a Deployment |

## integrations

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.integrations.updateIntegrationDeploymentAction` | `PATCH /v1/deployments/{deploymentId}/integrations/{integrationConfigurationId}/resources/{resourceId}/actions/{action}` | Update deployment integration action |
| `client.api.integrations.gitNamespaces` | `GET /v1/integrations/git-namespaces` | List git namespaces by provider |
| `client.api.integrations.searchRepo` | `GET /v1/integrations/search-repo` | List git repositories linked to namespace by provider |
| `client.api.integrations.getBillingPlans` | `GET /v1/integrations/integration/{integrationIdOrSlug}/products/{productIdOrSlug}/plans` | List integration billing plans |
| `client.api.integrations.connectIntegrationResourceToProject` | `POST /v1/integrations/installations/{integrationConfigurationId}/resources/{resourceId}/connections` | Connect integration resource to project |
| `client.api.integrations.getConfigurations` | `GET /v1/integrations/configurations` | Get configurations for the authenticated user or team |
| `client.api.integrations.getConfiguration` | `GET /v1/integrations/configuration/{id}` | Retrieve an integration configuration |
| `client.api.integrations.deleteConfiguration` | `DELETE /v1/integrations/configuration/{id}` | Delete an integration configuration |
| `client.api.integrations.getConfigurationProducts` | `GET /v1/integrations/configuration/{id}/products` | List products for integration configuration |
| `client.api.integrations.createIntegrationStoreDirect` | `POST /v1/storage/stores/integration/direct` | Create integration store (free and paid plans) |

## dns

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dns.getRecords` | `GET /v5/domains/{domain}/records` | List existing DNS records |
| `client.api.dns.createRecord` | `POST /v2/domains/{domain}/records` | Create a DNS record |
| `client.api.dns.updateRecord` | `PATCH /v1/domains/records/{recordId}` | Update an existing DNS record |
| `client.api.dns.removeRecord` | `DELETE /v2/domains/{domain}/records/{recordId}` | Delete a DNS record |

## default

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.default.replaceDomainsByDomainRecords` | `PUT /domains/{domain}/records` |  |
| `client.api.default.getDomainsRecordsByRecordId` | `GET /domains/records/{recordId}` |  |
| `client.api.default.createApiKeys` | `POST /api-keys` |  |
| `client.api.default.createObservabilityQuery` | `POST /v2/observability/query` |  |
| `client.api.default.getObservabilitySchema` | `GET /v2/observability/schema` |  |
| `client.api.default.getObservabilitySchemaByMetricId` | `GET /v2/observability/schema/{metricId}` |  |
| `client.api.default.createSpeedInsightsToggle` | `POST /speed-insights/toggle` |  |
| `client.api.default.createWebInsightsToggle` | `POST /web/insights/toggle` |  |

## domainsRegistrar

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.domainsRegistrar.searchDomains` | `POST /v1/registrar/domains/search` | Get Domain Availability and Pricing |
| `client.api.domainsRegistrar.getSupportedTlds` | `GET /v1/registrar/tlds/supported` | Get supported TLDs |
| `client.api.domainsRegistrar.getTld` | `GET /v1/registrar/tlds/{tld}` | Get TLD |
| `client.api.domainsRegistrar.getTldPrice` | `GET /v1/registrar/tlds/{tld}/price` | Get TLD price data |
| `client.api.domainsRegistrar.getDomainAvailability` | `GET /v1/registrar/domains/{domain}/availability` | Get availability for a domain |
| `client.api.domainsRegistrar.getDomainPrice` | `GET /v1/registrar/domains/{domain}/price` | Get price data for a domain |
| `client.api.domainsRegistrar.getBulkPrice` | `POST /v1/registrar/domains/price` | Get price data for multiple domains |
| `client.api.domainsRegistrar.getBulkAvailability` | `POST /v1/registrar/domains/availability` | Get availability for multiple domains |
| `client.api.domainsRegistrar.getContactInfoSchema` | `GET /v1/registrar/domains/{domain}/contact-info/schema` | Get contact info schema |
| `client.api.domainsRegistrar.getDomainAuthCode` | `GET /v1/registrar/domains/{domain}/auth-code` | Get the auth code for a domain |
| `client.api.domainsRegistrar.buySingleDomain` | `POST /v1/registrar/domains/{domain}/buy` | Buy a domain |
| `client.api.domainsRegistrar.buyDomains` | `POST /v1/registrar/domains/buy` | Buy multiple domains |
| `client.api.domainsRegistrar.transferInDomain` | `POST /v1/registrar/domains/{domain}/transfer` | Transfer-in a domain |
| `client.api.domainsRegistrar.getDomainTransferIn` | `GET /v1/registrar/domains/{domain}/transfer` | Get a domain's transfer status |
| `client.api.domainsRegistrar.renewDomain` | `POST /v1/registrar/domains/{domain}/renew` | Renew a domain |
| `client.api.domainsRegistrar.updateDomainAutoRenew` | `PATCH /v1/registrar/domains/{domain}/auto-renew` | Update auto-renew for a domain |
| `client.api.domainsRegistrar.updateDomainNameservers` | `PATCH /v1/registrar/domains/{domain}/nameservers` | Update nameservers for a domain |
| `client.api.domainsRegistrar.getDomainContactVerification` | `GET /v1/registrar/domains/{domain}/contact-verification` | Get contact verification status for a domain |
| `client.api.domainsRegistrar.getOrder` | `GET /v1/registrar/orders/{orderId}` | Get a domain order |

## domains

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.domains.getDomainConfig` | `GET /v6/domains/{domain}/config` | Get a Domain's configuration |
| `client.api.domains.getDomainVerificationRecord` | `GET /v9/domains/{domain}/verification` | Get Domain Verification Record |
| `client.api.domains.claimDomainOwnership` | `POST /v9/domains/{domain}/claim` | Claim Domain Ownership |
| `client.api.domains.getDomainProjectDomains` | `GET /v1/domains/{domain}/project-domains` | List Project Domains by Apex Domain |
| `client.api.domains.getDomain` | `GET /v5/domains/{domain}` | Get Information for a Single Domain |
| `client.api.domains.getDomains` | `GET /v5/domains` | List all the domains |
| `client.api.domains.createOrTransferDomain` | `POST /v7/domains` | Add an existing domain to the Vercel platform |
| `client.api.domains.patchDomain` | `PATCH /v3/domains/{domain}` | Update or move apex domain |
| `client.api.domains.deleteDomain` | `DELETE /v6/domains/{domain}` | Remove a domain by name |

## logdrains

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.logdrains.getConfigurableLogDrain` | `GET /v1/log-drains/{id}` | Retrieves a Configurable Log Drain (deprecated) |
| `client.api.logdrains.deleteConfigurableLogDrain` | `DELETE /v1/log-drains/{id}` | Deletes a Configurable Log Drain (deprecated) |
| `client.api.logdrains.getAllLogDrains` | `GET /v1/log-drains` | Retrieves a list of all the Log Drains (deprecated) |
| `client.api.logdrains.createConfigurableLogDrain` | `POST /v1/log-drains` | Creates a Configurable Log Drain (deprecated) |
| `client.api.logdrains.getIntegrationLogDrains` | `GET /v2/integrations/log-drains` | Retrieves a list of Integration log drains (deprecated) |
| `client.api.logdrains.createLogDrain` | `POST /v2/integrations/log-drains` | Creates a new Integration Log Drain (deprecated) |
| `client.api.logdrains.deleteIntegrationLogDrain` | `DELETE /v1/integrations/log-drains/{id}` | Deletes the Integration log drain with the provided `id` (deprecated) |

## drains

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.drains.createDrain` | `POST /v1/drains` | Create a new Drain |
| `client.api.drains.getDrains` | `GET /v1/drains` | Retrieve a list of all Drains |
| `client.api.drains.deleteDrain` | `DELETE /v1/drains/{id}` | Delete a drain |
| `client.api.drains.getDrain` | `GET /v1/drains/{id}` | Find a Drain by id |
| `client.api.drains.updateDrain` | `PATCH /v1/drains/{id}` | Update an existing Drain |
| `client.api.drains.testDrain` | `POST /v1/drains/test` | Validate Drain delivery configuration |

## drives

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.drives.listDrivesV1` | `GET /v1/drives` | List drives |
| `client.api.drives.getDriveV1` | `GET /v1/drives/{nameOrId}` | Get a drive |
| `client.api.drives.getOrCreateDriveV1` | `POST /v1/drives/{name}` | Get or create a drive |
| `client.api.drives.deleteDriveV1` | `DELETE /v1/drives/{name}` | Delete a drive |
| `client.api.drives.forkDriveV1` | `POST /v1/drives/{name}/fork` | Fork a drive |

## edgeCache

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.edgeCache.invalidateByTags` | `POST /v1/edge-cache/invalidate-by-tags` | Invalidate by tag |
| `client.api.edgeCache.dangerouslyDeleteByTags` | `POST /v1/edge-cache/dangerously-delete-by-tags` | Dangerously delete by tag |
| `client.api.edgeCache.invalidateBySrcImages` | `POST /v1/edge-cache/invalidate-by-src-images` | Invalidate by source image |
| `client.api.edgeCache.dangerouslyDeleteBySrcImages` | `POST /v1/edge-cache/dangerously-delete-by-src-images` | Dangerously delete by source image |

## globalConfig

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.globalConfig.getEdgeConfigs` | `GET /v1/global-config` | Get Global Configs |
| `client.api.globalConfig.createEdgeConfig` | `POST /v1/global-config` | Create a Global Config |
| `client.api.globalConfig.getEdgeConfig` | `GET /v1/global-config/{edgeConfigId}` | Get a Global Config |
| `client.api.globalConfig.updateEdgeConfig` | `PUT /v1/global-config/{edgeConfigId}` | Update a Global Config |
| `client.api.globalConfig.deleteEdgeConfig` | `DELETE /v1/global-config/{edgeConfigId}` | Delete a Global Config |
| `client.api.globalConfig.getEdgeConfigItems` | `GET /v1/global-config/{edgeConfigId}/items` | Get Global Config items |
| `client.api.globalConfig.patchEdgeConfigItems` | `PATCH /v1/global-config/{edgeConfigId}/items` | Update Global Config items in batch |
| `client.api.globalConfig.getEdgeConfigSchema` | `GET /v1/global-config/{edgeConfigId}/schema` | Get Global Config schema |
| `client.api.globalConfig.patchEdgeConfigSchema` | `POST /v1/global-config/{edgeConfigId}/schema` | Update Global Config schema |
| `client.api.globalConfig.deleteEdgeConfigSchema` | `DELETE /v1/global-config/{edgeConfigId}/schema` | Delete a Global Config's schema |
| `client.api.globalConfig.getEdgeConfigItem` | `GET /v1/global-config/{edgeConfigId}/item/{edgeConfigItemKey}` | Get a Global Config item |
| `client.api.globalConfig.getEdgeConfigTokens` | `GET /v1/global-config/{edgeConfigId}/tokens` | Get all tokens of a Global Config |
| `client.api.globalConfig.deleteEdgeConfigTokens` | `DELETE /v1/global-config/{edgeConfigId}/tokens` | Delete one or more Global Config tokens |
| `client.api.globalConfig.getEdgeConfigToken` | `GET /v1/global-config/{edgeConfigId}/token/{token}` | Get Global Config token meta data |
| `client.api.globalConfig.createEdgeConfigToken` | `POST /v1/global-config/{edgeConfigId}/token` | Create a Global Config token |
| `client.api.globalConfig.getEdgeConfigBackup` | `GET /v1/global-config/{edgeConfigId}/backups/{edgeConfigBackupVersionId}` | Get Global Config backup |
| `client.api.globalConfig.restoreEdgeConfigBackup` | `POST /v1/global-config/{edgeConfigId}/backups/{edgeConfigBackupVersionId}/restore` | Restore Global Config backup |
| `client.api.globalConfig.getEdgeConfigBackups` | `GET /v1/global-config/{edgeConfigId}/backups` | Get Global Config backups |

## environment

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.environment.createSharedEnvVariable` | `POST /v1/env` | Create one or more shared environment variables |
| `client.api.environment.listSharedEnvVariable` | `GET /v1/env` | Lists all Shared Environment Variables for a team |
| `client.api.environment.updateSharedEnvVariable` | `PATCH /v1/env` | Updates one or more shared environment variables |
| `client.api.environment.deleteSharedEnvVariable` | `DELETE /v1/env` | Delete one or more Env Var |
| `client.api.environment.getSharedEnvVar` | `GET /v1/env/{id}` | Retrieve the decrypted value of a Shared Environment Variable by id. |
| `client.api.environment.unlinkSharedEnvVariable` | `PATCH /v1/env/{id}/unlink/{projectId}` | Disconnects a shared environment variable for a given project |
| `client.api.environment.createCustomEnvironment` | `POST /v9/projects/{idOrName}/custom-environments` | Create a custom environment for the current project. |
| `client.api.environment.getProjectsByIdOrNameCustomEnvironments` | `GET /v9/projects/{idOrName}/custom-environments` | Retrieve custom environments |
| `client.api.environment.getCustomEnvironment` | `GET /v9/projects/{idOrName}/custom-environments/{environmentSlugOrId}` | Retrieve a custom environment |
| `client.api.environment.updateCustomEnvironment` | `PATCH /v9/projects/{idOrName}/custom-environments/{environmentSlugOrId}` | Update a custom environment |
| `client.api.environment.removeCustomEnvironment` | `DELETE /v9/projects/{idOrName}/custom-environments/{environmentSlugOrId}` | Remove a custom environment |

## user

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.user.listUserEvents` | `GET /v3/events` | List User Events |
| `client.api.user.listEventTypes` | `GET /v1/events/types` | List Event Types |
| `client.api.user.getAuthUser` | `GET /v2/user` | Get the User |
| `client.api.user.requestDelete` | `DELETE /v1/user` | Delete User Account |

## featureFlags

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.featureFlags.listFlagsV2` | `GET /v2/projects/{projectIdOrName}/feature-flags/flags` | List flags |
| `client.api.featureFlags.listFlags` | `GET /v1/projects/{projectIdOrName}/feature-flags/flags` | List flags |
| `client.api.featureFlags.createFlag` | `PUT /v1/projects/{projectIdOrName}/feature-flags/flags` | Create a flag |
| `client.api.featureFlags.getFlag` | `GET /v1/projects/{projectIdOrName}/feature-flags/flags/{flagIdOrSlug}` | Get a flag |
| `client.api.featureFlags.updateFlag` | `PATCH /v1/projects/{projectIdOrName}/feature-flags/flags/{flagIdOrSlug}` | Update a flag |
| `client.api.featureFlags.deleteFlag` | `DELETE /v1/projects/{projectIdOrName}/feature-flags/flags/{flagIdOrSlug}` | Delete a flag |
| `client.api.featureFlags.listFlagVersions` | `GET /v1/projects/{projectIdOrName}/feature-flags/flags/{flagIdOrSlug}/versions` | List flag versions |
| `client.api.featureFlags.getFlagSettings` | `GET /v1/projects/{projectIdOrName}/feature-flags/settings` | Get project flag settings |
| `client.api.featureFlags.updateFlagSettings` | `PATCH /v1/projects/{projectIdOrName}/feature-flags/settings` | Update project flag settings |
| `client.api.featureFlags.listFlagLabels` | `GET /v1/projects/{projectIdOrName}/feature-flags/labels` | List attribute labels |
| `client.api.featureFlags.listFlagLabelCounts` | `GET /v1/projects/{projectIdOrName}/feature-flags/labels/counts` | List attribute label counts |
| `client.api.featureFlags.lookupFlagLabels` | `POST /v1/projects/{projectIdOrName}/feature-flags/labels/lookup` | Look up attribute labels |
| `client.api.featureFlags.listTeamFlagSettings` | `GET /v1/teams/{teamId}/feature-flags/settings` | List team project flag settings |
| `client.api.featureFlags.listTeamFlagsV2` | `GET /v2/teams/{teamId}/feature-flags/flags` | List all flags for a team |
| `client.api.featureFlags.listTeamFlags` | `GET /v1/teams/{teamId}/feature-flags/flags` | List all flags for a team |
| `client.api.featureFlags.createFlagSegment` | `PUT /v1/projects/{projectIdOrName}/feature-flags/segments` | Create a segment |
| `client.api.featureFlags.listFlagSegments` | `GET /v1/projects/{projectIdOrName}/feature-flags/segments` | List segments |
| `client.api.featureFlags.getFlagSegment` | `GET /v1/projects/{projectIdOrName}/feature-flags/segments/{segmentIdOrSlug}` | Get a segment |
| `client.api.featureFlags.deleteFlagSegment` | `DELETE /v1/projects/{projectIdOrName}/feature-flags/segments/{segmentIdOrSlug}` | Delete a segment |
| `client.api.featureFlags.updateFlagSegment` | `PATCH /v1/projects/{projectIdOrName}/feature-flags/segments/{segmentIdOrSlug}` | Update a segment |
| `client.api.featureFlags.getDeploymentFeatureFlags` | `GET /v1/deployments/{deploymentId}/feature-flags` | Retrieve the feature flags of a deployment |
| `client.api.featureFlags.getSdkKeys` | `GET /v1/projects/{projectIdOrName}/feature-flags/sdk-keys` | Get all SDK keys |
| `client.api.featureFlags.createSdkKey` | `PUT /v1/projects/{projectIdOrName}/feature-flags/sdk-keys` | Create an SDK key |
| `client.api.featureFlags.deleteSdkKey` | `DELETE /v1/projects/{projectIdOrName}/feature-flags/sdk-keys/{hashKey}` | Delete an SDK key |
| `client.api.featureFlags.getFlagsProjectConnections` | `GET /v1/projects/{projectIdOrName}/feature-flags/connections` | List flags project connections |
| `client.api.featureFlags.createFlagsProjectConnection` | `PUT /v1/projects/{projectIdOrName}/feature-flags/connections` | Connect a project to the flags of this project |
| `client.api.featureFlags.deleteFlagsProjectConnection` | `DELETE /v1/projects/{projectIdOrName}/feature-flags/connections/{consumerProjectId}` | Disconnect a project from the flags of this project |

## marketplace

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.marketplace.updateInstallation` | `PATCH /v1/installations/{integrationConfigurationId}` | Update Installation |
| `client.api.marketplace.getAccountInfo` | `GET /v1/installations/{integrationConfigurationId}/account` | Get Account Information |
| `client.api.marketplace.getMember` | `GET /v1/installations/{integrationConfigurationId}/member/{memberId}` | Get Member Information |
| `client.api.marketplace.rotateInstallationCredential` | `POST /v1/installations/{integrationConfigurationId}/credentials/rotate` | Rotate Installation Credential |
| `client.api.marketplace.revokeInstallationCredential` | `POST /v1/installations/{integrationConfigurationId}/credentials/revoke` | Revoke Installation Credential |
| `client.api.marketplace.createEvent` | `POST /v1/installations/{integrationConfigurationId}/events` | Create Event |
| `client.api.marketplace.getIntegrationResources` | `GET /v1/installations/{integrationConfigurationId}/resources` | Get Integration Resources |
| `client.api.marketplace.getIntegrationResource` | `GET /v1/installations/{integrationConfigurationId}/resources/{resourceId}` | Get Integration Resource |
| `client.api.marketplace.deleteIntegrationResource` | `DELETE /v1/installations/{integrationConfigurationId}/resources/{resourceId}` | Delete Integration Resource |
| `client.api.marketplace.importResource` | `PUT /v1/installations/{integrationConfigurationId}/resources/{resourceId}` | Import Resource |
| `client.api.marketplace.updateResource` | `PATCH /v1/installations/{integrationConfigurationId}/resources/{resourceId}` | Update Resource |
| `client.api.marketplace.submitBillingData` | `POST /v1/installations/{integrationConfigurationId}/billing` | Submit Billing Data |
| `client.api.marketplace.submitInvoice` | `POST /v1/installations/{integrationConfigurationId}/billing/invoices` | Submit Invoice |
| `client.api.marketplace.finalizeInstallation` | `POST /v1/installations/{integrationConfigurationId}/billing/finalize` | Finalize Installation |
| `client.api.marketplace.getInvoice` | `GET /v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}` | Get Invoice |
| `client.api.marketplace.updateInvoice` | `POST /v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}/actions` | Invoice Actions |
| `client.api.marketplace.submitPrepaymentBalances` | `POST /v1/installations/{integrationConfigurationId}/billing/balance` | Submit Prepayment Balances |
| `client.api.marketplace.updateResourceSecrets` | `PUT /v1/installations/{integrationConfigurationId}/products/{integrationProductIdOrSlug}/resources/{resourceId}/secrets` | Deprecated: true. Update Resource Secrets (Deprecated) |
| `client.api.marketplace.updateResourceSecretsById` | `PUT /v1/installations/{integrationConfigurationId}/resources/{resourceId}/secrets` | Update Resource Secrets |
| `client.api.marketplace.exchangeSsoToken` | `POST /v1/integrations/sso/token` | SSO Token Exchange |
| `client.api.marketplace.createInstallationsByIntegrationConfigurationIdResourcesByResourceIdExperimentationItems` | `POST /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items` | Create one or multiple experimentation items |
| `client.api.marketplace.updateInstallationsByIntegrationConfigurationIdResourcesByResourceIdExperimentationItemsByItemId` | `PATCH /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items/{itemId}` | Patch an existing experimentation item |
| `client.api.marketplace.deleteInstallationsByIntegrationConfigurationIdResourcesByResourceIdExperimentationItemsByItemId` | `DELETE /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items/{itemId}` | Delete an existing experimentation item |
| `client.api.marketplace.headInstallationsByIntegrationConfigurationIdResourcesByResourceIdExperimentationGlobalConfig` | `HEAD /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/global-config` | Get the data of a user-provided Global Config |
| `client.api.marketplace.getInstallationsByIntegrationConfigurationIdResourcesByResourceIdExperimentationGlobalConfig` | `GET /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/global-config` | Get the data of a user-provided Global Config |
| `client.api.marketplace.replaceInstallationsByIntegrationConfigurationIdResourcesByResourceIdExperimentationGlobalConfig` | `PUT /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/global-config` | Push data into a user-provided Global Config |

## authentication

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.authentication.exchangeSsoToken` | `POST /v1/integrations/sso/token` | SSO Token Exchange |
| `client.api.authentication.listAuthTokens` | `GET /v6/user/tokens` | List Auth Tokens |
| `client.api.authentication.createAuthToken` | `POST /v3/user/tokens` | Create an Auth Token |
| `client.api.authentication.getAuthToken` | `GET /v5/user/tokens/{tokenId}` | Get Auth Token Metadata |
| `client.api.authentication.deleteAuthToken` | `DELETE /v3/user/tokens/{tokenId}` | Delete an authentication token |

## kms

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.kms.signKmsMessage` | `POST /v1/kms/issuers/{issuerId}/sign/message` | Sign a message |
| `client.api.kms.signKmsToken` | `POST /v1/kms/issuers/{issuerId}/sign/token` | Sign a token |
| `client.api.kms.listKmsIssuers` | `GET /v1/kms/issuers` | List issuers |
| `client.api.kms.createKmsIssuer` | `POST /v1/kms/issuers` | Create an issuer |
| `client.api.kms.createKmsSigningKey` | `POST /v1/kms/issuers/{issuerId}/keys` | Create a signing key |
| `client.api.kms.activateKmsSigningKey` | `POST /v1/kms/issuers/{issuerId}/keys/{keyId}/activate` | Activate a signing key |
| `client.api.kms.revokeKmsSigningKey` | `POST /v1/kms/issuers/{issuerId}/keys/{keyId}/revoke` | Revoke a signing key |
| `client.api.kms.getKmsIssuer` | `GET /v1/kms/issuers/{issuerId}` | Get an issuer |
| `client.api.kms.updateKmsIssuer` | `PATCH /v1/kms/issuers/{issuerId}` | Update an issuer |
| `client.api.kms.deleteKmsIssuer` | `DELETE /v1/kms/issuers/{issuerId}` | Delete an issuer |
| `client.api.kms.createKmsIssuerPolicy` | `POST /v1/kms/issuers/{issuerId}/policies` | Create an issuer policy |
| `client.api.kms.updateKmsIssuerPolicy` | `PATCH /v1/kms/issuers/{issuerId}/policies/{kind}/{policyKey}` | Update an issuer policy |
| `client.api.kms.deleteKmsIssuerPolicy` | `DELETE /v1/kms/issuers/{issuerId}/policies/{kind}/{policyKey}` | Delete an issuer policy |

## logs

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.logs.getRuntimeLogs` | `GET /v1/projects/{projectId}/deployments/{deploymentId}/runtime-logs` | Get logs for a deployment |

## microfrontends

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.microfrontends.getMicrofrontendsGroups` | `GET /v1/microfrontends/groups` | List microfrontends groups |
| `client.api.microfrontends.getMicrofrontendsInGroup` | `GET /v1/microfrontends/groups/{groupId}/projects` | List projects in a microfrontends group |
| `client.api.microfrontends.getMicrofrontendsConfig` | `GET /v1/microfrontends/{deploymentId}/config` | Get microfrontends config for a deployment |
| `client.api.microfrontends.getMicrofrontendsConfigForProject` | `GET /v1/microfrontends/projects/{projectIdOrName}/production-mfe-config` | Get microfrontends config for a project |
| `client.api.microfrontends.createMicrofrontendsGroupWithApplications` | `POST /v1/microfrontends/group` | Create a microfrontends group with applications |

## observability

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.observability.getObservabilityConfigurationProjects` | `GET /v1/observability/manage/configuration/projects` | Lists disabled Observability Plus projects |
| `client.api.observability.updateObservabilityConfigurationProject` | `PUT /v1/observability/manage/configuration/projects/{projectIdOrName}` | Updates a disabled Observability Plus project setting |

## organizations

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.organizations.createOrganization` | `POST /v1/organizations` | Create an Organization |
| `client.api.organizations.listOrganizations` | `GET /v1/organizations` | List Organizations |
| `client.api.organizations.getOrganization` | `GET /v1/organizations/{organizationId}` | Get an Organization |
| `client.api.organizations.updateOrganization` | `PATCH /v1/organizations/{organizationId}` | Update an Organization |
| `client.api.organizations.listOrganizationTeams` | `GET /v1/organizations/{organizationId}/teams` | List Organization Teams |
| `client.api.organizations.addOrganizationTeam` | `POST /v1/organizations/{organizationId}/teams` | Create or Add Team to Organization |
| `client.api.organizations.removeOrganizationTeam` | `DELETE /v1/organizations/{organizationId}/teams/{targetTeamId}` | Delete Team from Organization |

## projectmembers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.projectmembers.getProjectMembers` | `GET /v1/projects/{idOrName}/members` | List project members |
| `client.api.projectmembers.addProjectMember` | `POST /v1/projects/{idOrName}/members` | Adds a new member to a project. |
| `client.api.projectmembers.removeProjectMember` | `DELETE /v1/projects/{idOrName}/members/{uid}` | Remove a Project Member |

## projectRoutes

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.projectRoutes.getRoutes` | `GET /v1/projects/{projectId}/routes` | Get project routing rules |
| `client.api.projectRoutes.stageRoutes` | `PUT /v1/projects/{projectId}/routes` | Stage routing rules |
| `client.api.projectRoutes.addRoute` | `POST /v1/projects/{projectId}/routes` | Add a routing rule |
| `client.api.projectRoutes.deleteRoutes` | `DELETE /v1/projects/{projectId}/routes` | Delete routing rules |
| `client.api.projectRoutes.editRoute` | `PATCH /v1/projects/{projectId}/routes/{routeId}` | Edit a routing rule |
| `client.api.projectRoutes.generateRoute` | `POST /v1/projects/{projectId}/routes/generate` | Generate a routing rule from natural language |
| `client.api.projectRoutes.getRouteVersions` | `GET /v1/projects/{projectId}/routes/versions` | Get routing rule version history |
| `client.api.projectRoutes.updateRouteVersions` | `POST /v1/projects/{projectId}/routes/versions` | Promote, restore, or discard a routing rule version |

## projects

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.projects.getProjects` | `GET /v10/projects` | Retrieve a list of projects |
| `client.api.projects.getProjectTrace` | `GET /v1/projects/traces` | Get a project trace by request ID |
| `client.api.projects.createProject` | `POST /v11/projects` | Create a new project |
| `client.api.projects.getProjectToken` | `POST /v1/projects/{idOrName}/token` | Generate a project OIDC token |
| `client.api.projects.createTraceSession` | `POST /v1/projects/traces/session` | Create a trace session token for a deployment |
| `client.api.projects.getProject` | `GET /v9/projects/{idOrName}` | Find a project by id or name |
| `client.api.projects.updateProject` | `PATCH /v9/projects/{idOrName}` | Update an existing project |
| `client.api.projects.deleteProject` | `DELETE /v9/projects/{idOrName}` | Delete a Project |
| `client.api.projects.uploadProjectAvatar` | `POST /v1/projects/{idOrName}/avatar` | Upload a project avatar |
| `client.api.projects.deleteProjectAvatar` | `DELETE /v1/projects/{idOrName}/avatar` | Delete a project avatar |
| `client.api.projects.getProjectDomains` | `GET /v9/projects/{idOrName}/domains` | Retrieve project domains by project by id or name |
| `client.api.projects.getProjectDomain` | `GET /v9/projects/{idOrName}/domains/{domain}` | Get a project domain |
| `client.api.projects.updateProjectDomain` | `PATCH /v9/projects/{idOrName}/domains/{domain}` | Update a project domain |
| `client.api.projects.removeProjectDomain` | `DELETE /v9/projects/{idOrName}/domains/{domain}` | Remove a domain from a project |
| `client.api.projects.addProjectDomain` | `POST /v10/projects/{idOrName}/domains` | Add a domain to a project |
| `client.api.projects.moveProjectDomain` | `POST /v1/projects/{idOrName}/domains/{domain}/move` | Move a project domain |
| `client.api.projects.verifyProjectDomain` | `POST /v9/projects/{idOrName}/domains/{domain}/verify` | Verify project domain |
| `client.api.projects.filterProjectEnvs` | `GET /v10/projects/{idOrName}/env` | Retrieve the environment variables of a project by id or name |
| `client.api.projects.createProjectEnv` | `POST /v10/projects/{idOrName}/env` | Create one or more environment variables |
| `client.api.projects.getProjectEnv` | `GET /v1/projects/{idOrName}/env/{id}` | Retrieve the decrypted value of an environment variable of a project by id |
| `client.api.projects.removeProjectEnv` | `DELETE /v9/projects/{idOrName}/env/{id}` | Remove an environment variable |
| `client.api.projects.editProjectEnv` | `PATCH /v9/projects/{idOrName}/env/{id}` | Edit an environment variable |
| `client.api.projects.batchRemoveProjectEnv` | `DELETE /v1/projects/{idOrName}/env` | Batch remove environment variables |
| `client.api.projects.createProjectTransferRequest` | `POST /projects/{idOrName}/transfer-request` | Create project transfer request |
| `client.api.projects.acceptProjectTransferRequest` | `PUT /projects/transfer-request/{code}` | Accept project transfer request |
| `client.api.projects.updateProjectProtectionBypass` | `PATCH /v1/projects/{idOrName}/protection-bypass` | Update Protection Bypass for Automation |
| `client.api.projects.requestRollback` | `POST /v1/projects/{projectId}/rollback/{deploymentId}` | Point production traffic to a previous production deployment by ID |
| `client.api.projects.updateProjectsByProjectIdRollbackByDeploymentIdUpdateDescription` | `PATCH /v1/projects/{projectId}/rollback/{deploymentId}/update-description` | Updates the description for a rollback |
| `client.api.projects.updateMicrofrontends` | `PATCH /v1/projects/{projectId}/microfrontends` | Update the microfrontends settings |
| `client.api.projects.requestPromote` | `POST /v10/projects/{projectId}/promote/{deploymentId}` | Point production traffic to a given deployment |
| `client.api.projects.listPromoteAliases` | `GET /v1/projects/{projectId}/promote/aliases` | Gets a list of aliases with status for the current promote |
| `client.api.projects.pauseProject` | `POST /v1/projects/{projectId}/pause` | Pause a project |
| `client.api.projects.unpauseProject` | `POST /v1/projects/{projectId}/unpause` | Unpause a project |

## staticIps

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.staticIps.updateStaticIps` | `PATCH /v1/projects/{idOrName}/shared-connect-links` | Configures Static IPs for a project |

## rollingRelease

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.rollingRelease.getRollingReleaseBillingStatus` | `GET /v1/projects/{idOrName}/rolling-release/billing` | Get rolling release billing status |
| `client.api.rollingRelease.getRollingReleaseConfig` | `GET /v1/projects/{idOrName}/rolling-release/config` | Get rolling release configuration |
| `client.api.rollingRelease.deleteRollingReleaseConfig` | `DELETE /v1/projects/{idOrName}/rolling-release/config` | Delete rolling release configuration |
| `client.api.rollingRelease.updateRollingReleaseConfig` | `PATCH /v1/projects/{idOrName}/rolling-release/config` | Update the rolling release settings for the project |
| `client.api.rollingRelease.getRollingRelease` | `GET /v1/projects/{idOrName}/rolling-release` | Get the active rolling release information for a project |
| `client.api.rollingRelease.approveRollingReleaseStage` | `POST /v1/projects/{idOrName}/rolling-release/approve-stage` | Update the active rolling release to the next stage for a project |
| `client.api.rollingRelease.startRollingRelease` | `POST /v1/projects/{idOrName}/rolling-release/start` | Start a rolling release for the project |
| `client.api.rollingRelease.completeRollingRelease` | `POST /v1/projects/{idOrName}/rolling-release/complete` | Complete the rolling release for the project |

## sandboxes

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.sandboxes.listNamedSandboxes` | `GET /v2/sandboxes` | List sandboxes |
| `client.api.sandboxes.createSandboxesV2` | `POST /v2/sandboxes` | Create a named sandbox |
| `client.api.sandboxes.listDrives` | `GET /v2/sandboxes/drives` | Deprecated: Use GET /v1/drives. Requires the read:drive app scope instead of read:sandbox, and drive:list instead of vercelRun:read. List drives |
| `client.api.sandboxes.getDrive` | `GET /v2/sandboxes/drives/{nameOrId}` | Deprecated: Use GET /v1/drives/:nameOrId. Requires the read:drive app scope instead of read:sandbox, and drive:read instead of vercelRun:read. Get a drive |
| `client.api.sandboxes.getOrCreateDrive` | `POST /v2/sandboxes/drives/{name}` | Deprecated: Use POST /v1/drives/:name. Requires the read-write:drive app scope instead of read-write:sandbox, and drive:create instead of vercelRun:create. Emits drive-created activity events instead of sandbox-drive-created. Get or create a drive |
| `client.api.sandboxes.deleteDrive` | `DELETE /v2/sandboxes/drives/{name}` | Deprecated: Use DELETE /v1/drives/:name. Requires the read-write:drive app scope instead of read-write:sandbox, and drive:delete instead of vercelRun:delete. Emits drive-deleted activity events instead of sandbox-drive-deleted. Delete a drive |
| `client.api.sandboxes.forkDrive` | `POST /v2/sandboxes/drives/{name}/fork` | Deprecated: Use POST /v1/drives/:name/fork. Requires the read-write:drive app scope instead of read-write:sandbox, and drive:read and drive:create instead of vercelRun:read and vercelRun:create. Emits drive-created activity events instead of sandbox-drive-created. Fork a drive |
| `client.api.sandboxes.listSessionSnapshots` | `GET /v2/sandboxes/snapshots` | List snapshots |
| `client.api.sandboxes.getSessionSnapshot` | `GET /v2/sandboxes/snapshots/{snapshotId}` | Get a snapshot |
| `client.api.sandboxes.deleteSessionSnapshot` | `DELETE /v2/sandboxes/snapshots/{snapshotId}` | Delete a snapshot |
| `client.api.sandboxes.listSessions` | `GET /v2/sandboxes/sessions` | List sessions |
| `client.api.sandboxes.getSession` | `GET /v2/sandboxes/sessions/{sessionId}` | Get a session |
| `client.api.sandboxes.getNamedSandbox` | `GET /v2/sandboxes/{name}` | Get a named sandbox |
| `client.api.sandboxes.updateSandbox` | `PATCH /v2/sandboxes/{name}` | Update a sandbox |
| `client.api.sandboxes.deleteSandbox` | `DELETE /v2/sandboxes/{name}` | Delete a sandbox |
| `client.api.sandboxes.listSessionCommands` | `GET /v2/sandboxes/sessions/{sessionId}/cmd` | List commands |
| `client.api.sandboxes.runSessionCommand` | `POST /v2/sandboxes/sessions/{sessionId}/cmd` | Execute a command |
| `client.api.sandboxes.getSessionCommand` | `GET /v2/sandboxes/sessions/{sessionId}/cmd/{cmdId}` | Get a command |
| `client.api.sandboxes.killSessionCommand` | `POST /v2/sandboxes/sessions/{sessionId}/cmd/{cmdId}/kill` | Kill a command |
| `client.api.sandboxes.writeSessionCommandStdin` | `POST /v2/sandboxes/sessions/{sessionId}/cmd/{cmdId}/stdin` | Write to command stdin |
| `client.api.sandboxes.getSessionCommandLogs` | `GET /v2/sandboxes/sessions/{sessionId}/cmd/{cmdId}/logs` | Stream command logs |
| `client.api.sandboxes.stopSession` | `POST /v2/sandboxes/sessions/{sessionId}/stop` | Stop a session |
| `client.api.sandboxes.extendSessionTimeout` | `POST /v2/sandboxes/sessions/{sessionId}/extend-timeout` | Extend session timeout |
| `client.api.sandboxes.updateSessionNetworkPolicy` | `POST /v2/sandboxes/sessions/{sessionId}/network-policy` | Update network policy |
| `client.api.sandboxes.readSessionFile` | `POST /v2/sandboxes/sessions/{sessionId}/fs/read` | Read a file |
| `client.api.sandboxes.createSessionDirectory` | `POST /v2/sandboxes/sessions/{sessionId}/fs/mkdir` | Create a directory |
| `client.api.sandboxes.writeSessionFiles` | `POST /v2/sandboxes/sessions/{sessionId}/fs/write` | Write files |
| `client.api.sandboxes.createSandboxesSessionsBySessionIdSnapshotV2` | `POST /v2/sandboxes/sessions/{sessionId}/snapshot` | Create a snapshot |
| `client.api.sandboxes.createSandboxesByNameForkV2` | `POST /v2/sandboxes/{name}/fork` | Fork a named sandbox |
| `client.api.sandboxes.createSandboxesV3` | `POST /v3/sandboxes` | Create a named sandbox |
| `client.api.sandboxes.createSandboxesSessionsBySessionIdSnapshotV3` | `POST /v3/sandboxes/sessions/{sessionId}/snapshot` | Create a snapshot |
| `client.api.sandboxes.createSandboxesByNameForkV3` | `POST /v3/sandboxes/{name}/fork` | Fork a named sandbox |
| `client.api.sandboxes.createSandboxesV4` | `POST /v4/sandboxes` | Create a named sandbox |

## security

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.security.updateAttackChallengeMode` | `POST /v1/security/attack-mode` | Update Attack Challenge mode |
| `client.api.security.getSecurityFirewallConfig` | `GET /v1/security/firewall/config` | Returns activated WAF config |
| `client.api.security.putFirewallConfig` | `PUT /v1/security/firewall/config` | Put Firewall Configuration |
| `client.api.security.updateFirewallConfig` | `PATCH /v1/security/firewall/config` | Update Firewall Configuration |
| `client.api.security.getFirewallConfig` | `GET /v1/security/firewall/config/{configVersion}` | Read Firewall Configuration |
| `client.api.security.deleteSecurityFirewallConfigByConfigVersion` | `DELETE /v1/security/firewall/config/{configVersion}` | Returns activated WAF config |
| `client.api.security.createSecurityFirewallConfigByConfigVersionActivate` | `POST /v1/security/firewall/config/{configVersion}/activate` | Returns activated WAF config |
| `client.api.security.getActiveAttackStatus` | `GET /v1/security/firewall/attack-status` | Read active attack data |
| `client.api.security.getBypassIp` | `GET /v1/security/firewall/bypass` | Read System Bypass |
| `client.api.security.addBypassIp` | `POST /v1/security/firewall/bypass` | Create System Bypass Rule |
| `client.api.security.removeBypassIp` | `DELETE /v1/security/firewall/bypass` | Remove System Bypass Rule |
| `client.api.security.getConditionalBypass` | `GET /v1/security/firewall/bypass/rules` | Get conditional firewall bypasses |
| `client.api.security.createConditionalBypass` | `POST /v1/security/firewall/bypass/rules` | Create conditional firewall bypass |
| `client.api.security.updateConditionalBypass` | `PUT /v1/security/firewall/bypass/rules` | Update conditional firewall bypass |
| `client.api.security.deleteConditionalBypass` | `DELETE /v1/security/firewall/bypass/rules` | Delete conditional firewall bypass |
| `client.api.security.getSecurityFirewallEvents` | `GET /v1/security/firewall/events` | Read Firewall Actions by Project |
| `client.api.security.getSecurityFirewallEventsSummary` | `GET /v1/security/firewall/events/summary` | Read Firewall Actions Summary by Project |
| `client.api.security.generateFirewallRule` | `POST /v1/security/firewall/config/generate-rule` | Generate a firewall rule from natural language |

## storage

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.storage.getStorageStoresById` | `GET /storage/stores/{id}` | Get a store |
| `client.api.storage.createStorageStoresBlob` | `POST /storage/stores/blob` | Create a Blob store |
| `client.api.storage.deleteStorageStoresBlobById` | `DELETE /storage/stores/blob/{id}` | Delete a Blob store |

## teams

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.teams.getTeamMembers` | `GET /v3/teams/{teamId}/members` | List team members |
| `client.api.teams.inviteUserToTeam` | `POST /v2/teams/{teamId}/members` | Invite a user |
| `client.api.teams.requestAccessToTeam` | `POST /v1/teams/{teamId}/request` | Request access to a team |
| `client.api.teams.getTeamAccessRequest` | `GET /v1/teams/{teamId}/request/{userId}` | Get access request status |
| `client.api.teams.joinTeam` | `POST /v1/teams/{teamId}/members/teams/join` | Join a team |
| `client.api.teams.updateTeamMember` | `PATCH /v1/teams/{teamId}/members/{uid}` | Update a Team Member |
| `client.api.teams.removeTeamMember` | `DELETE /v1/teams/{teamId}/members/{uid}` | Remove a Team Member |
| `client.api.teams.getTeam` | `GET /v2/teams/{teamId}` | Get a Team |
| `client.api.teams.patchTeam` | `PATCH /v2/teams/{teamId}` | Update a Team |
| `client.api.teams.getTeams` | `GET /v2/teams` | List all teams |
| `client.api.teams.createTeam` | `POST /v1/teams` | Create a Team |
| `client.api.teams.postTeamDsyncRoles` | `POST /v1/teams/{teamId}/dsync-roles` | Update Team Directory Sync Role Mappings |
| `client.api.teams.deleteTeam` | `DELETE /v1/teams/{teamId}` | Delete a Team |
| `client.api.teams.deleteTeamInviteCode` | `DELETE /v1/teams/{teamId}/invites/{inviteId}` | Delete a Team invite code |
| `client.api.teams.updateMicrofrontendsGroup` | `PATCH /v1/teams/{teamId}/microfrontends/{groupId}` | Update a microfrontends group |
| `client.api.teams.deleteMicrofrontendsGroup` | `DELETE /v1/teams/{teamId}/microfrontends/{groupId}` | Delete a microfrontends group |

## vcr

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.vcr.createRepository` | `POST /v1/vcr/repository` | Create a repository |
| `client.api.vcr.listRepositories` | `GET /v1/vcr/repository` | List repositories |
| `client.api.vcr.getRepository` | `GET /v1/vcr/repository/{idOrName}` | Get a repository |
| `client.api.vcr.deleteRepository` | `DELETE /v1/vcr/repository/{idOrName}` | Delete a repository |
| `client.api.vcr.listRepositoryImages` | `GET /v1/vcr/repository/{idOrName}/images` | List repository images |
| `client.api.vcr.addRepositoryPermission` | `POST /v1/vcr/repository/{idOrName}/permissions` | Add a repository permission |
| `client.api.vcr.removeRepositoryPermission` | `DELETE /v1/vcr/repository/{idOrName}/permissions` | Remove a repository permission |
| `client.api.vcr.listRepositoryPermissions` | `GET /v1/vcr/repository/{idOrName}/permissions` | List repository permissions |
| `client.api.vcr.clearRepositoryPermissions` | `DELETE /v1/vcr/repository/{idOrName}/permissions/all` | Clear all repository permissions |
| `client.api.vcr.listRepositoryTags` | `GET /v1/vcr/repository/{idOrName}/tags` | List repository tags |
| `client.api.vcr.getRepositoryTag` | `GET /v1/vcr/repository/{idOrName}/tags/{tag}` | Get a repository tag |
| `client.api.vcr.getRepositoryImage` | `GET /v1/vcr/repository/{idOrName}/images/{imageIdOrDigest}` | Get a repository image |
| `client.api.vcr.deleteRepositoryImage` | `DELETE /v1/vcr/repository/{idOrName}/images/{imageId}` | Delete a repository image |
| `client.api.vcr.getRoot` | `GET /v2/` | Check registry API version support |
| `client.api.vcr.headByTeamSlugByProjectSlugByRepositoryNameBlobsByDigest` | `HEAD /v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/{digest}` | Check if a blob exists |
| `client.api.vcr.getByTeamSlugByProjectSlugByRepositoryNameBlobsByDigest` | `GET /v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/{digest}` | Download a blob |
| `client.api.vcr.deleteByTeamSlugByProjectSlugByRepositoryNameBlobsByDigest` | `DELETE /v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/{digest}` | Delete a blob |
| `client.api.vcr.getByTeamSlugByProjectSlugByRepositoryNameBlobsUploadsByUuid` | `GET /v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/uploads/{uuid}` | Get blob upload status |
| `client.api.vcr.deleteByTeamSlugByProjectSlugByRepositoryNameBlobsUploadsByUuid` | `DELETE /v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/uploads/{uuid}` | Cancel a blob upload |
| `client.api.vcr.updateByTeamSlugByProjectSlugByRepositoryNameBlobsUploadsByUuid` | `PATCH /v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/uploads/{uuid}` | Upload a blob chunk |
| `client.api.vcr.replaceByTeamSlugByProjectSlugByRepositoryNameBlobsUploadsByUuid` | `PUT /v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/uploads/{uuid}` | Complete a blob upload |
| `client.api.vcr.createByTeamSlugByProjectSlugByRepositoryNameBlobsUploads` | `POST /v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/uploads/` | Start a blob upload |
| `client.api.vcr.replaceByTeamSlugByProjectSlugByRepositoryNameManifestsByReference` | `PUT /v2/{teamSlug}/{projectSlug}/{repositoryName}/manifests/{reference}` | Push an image manifest |
| `client.api.vcr.headByTeamSlugByProjectSlugByRepositoryNameManifestsByReference` | `HEAD /v2/{teamSlug}/{projectSlug}/{repositoryName}/manifests/{reference}` | Check if a manifest exists |
| `client.api.vcr.getByTeamSlugByProjectSlugByRepositoryNameManifestsByReference` | `GET /v2/{teamSlug}/{projectSlug}/{repositoryName}/manifests/{reference}` | Pull an image manifest |
| `client.api.vcr.deleteByTeamSlugByProjectSlugByRepositoryNameManifestsByReference` | `DELETE /v2/{teamSlug}/{projectSlug}/{repositoryName}/manifests/{reference}` | Delete an image manifest |
| `client.api.vcr.getByTeamSlugByProjectSlugByRepositoryNameTagsList` | `GET /v2/{teamSlug}/{projectSlug}/{repositoryName}/tags/list` | List image tags |

## vercelCi

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.vercelCi.getVercelCiRepositorySettings` | `GET /v1/vercel-ci/repository-settings` | Get Vercel CI settings for a connected repository |
| `client.api.vercelCi.updateVercelCiRepositorySettings` | `PATCH /v1/vercel-ci/repository-settings` | Enable or disable Vercel CI for a connected repository |
| `client.api.vercelCi.listVercelCiInvocations` | `GET /v2/vercel-ci/invocations` | List invocations for a team, optionally filtered by repository and invocation metadata |
| `client.api.vercelCi.listVercelCiBranches` | `GET /v2/vercel-ci/branches` | List Vercel CI branch suggestions for a team |
| `client.api.vercelCi.createVercelCiTaskAnalysis` | `POST /v1/vercel-ci/task-analyses` | Start an asynchronous Vercel CI task analysis |
| `client.api.vercelCi.getVercelCiTaskAnalysis` | `GET /v1/vercel-ci/task-analyses/{analysisId}` | Get the current status of a Vercel CI task analysis |
| `client.api.vercelCi.createVercelCiTaskConfigurationPullRequest` | `POST /v1/vercel-ci/task-analyses/{analysisId}/pull-request` | Create a GitHub pull request that adds Vercel CI tags for the completed analysis |
| `client.api.vercelCi.listVercelCiTaskAnalysisTasks` | `GET /v1/vercel-ci/task-analyses/{analysisId}/tasks` | List discovered tasks for a completed Vercel CI task analysis |
| `client.api.vercelCi.listVercelCiInvocationAttempts` | `GET /v1/vercel-ci/invocations/{invocationId}/attempts` | List all attempts for an invocation |
| `client.api.vercelCi.getVercelCiInvocationTree` | `GET /v1/vercel-ci/invocations/{invocationId}/tree` | Get an invocation with its jobs and tasks |
| `client.api.vercelCi.getVercelCiInvocation` | `GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}` | Get a specific invocation attempt |
| `client.api.vercelCi.retryVercelCiInvocation` | `POST /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/retry` | Retry a terminal Vercel CI invocation attempt |
| `client.api.vercelCi.listVercelCiJobDefinitions` | `GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/job-definitions` | List job definitions for an invocation attempt |
| `client.api.vercelCi.getVercelCiJobDefinition` | `GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/job-definitions/{jobDefinitionId}` | Get a specific job definition |
| `client.api.vercelCi.listVercelCiJobRuns` | `GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/job-definitions/{jobDefinitionId}/runs` | List all runs for a job definition |
| `client.api.vercelCi.getVercelCiJobRun` | `GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/job-definitions/{jobDefinitionId}/runs/{runAttempt}` | Get a specific job run attempt |
| `client.api.vercelCi.listVercelCiTaskDefinitions` | `GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/job-definitions/{jobDefinitionId}/runs/{runAttempt}/task-definitions` | List all task definitions for a job run |
| `client.api.vercelCi.listVercelCiTaskRuns` | `GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/job-definitions/{jobDefinitionId}/runs/{runAttempt}/task-runs` | List task runs for a job run |
| `client.api.vercelCi.getVercelCiInvocationLogs` | `GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/logs` | Get log lines for an invocation attempt |
| `client.api.vercelCi.getVercelCiTaskLogs` | `GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/task-logs` | Get log lines for the tasks of an invocation attempt |
| `client.api.vercelCi.searchVercelCiLogs` | `GET /v1/vercel-ci/log-search` | Search the task logs of several invocation attempts |
| `client.api.vercelCi.getVercelCiJobRunLogs` | `GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/job-definitions/{jobDefinitionId}/runs/{runAttempt}/logs` | Get log lines for a specific job run attempt |
| `client.api.vercelCi.getVercelCiTaskRunLogs` | `GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/job-definitions/{jobDefinitionId}/runs/{runAttempt}/task-definitions/{taskDefinitionId}/runs/{taskRunAttempt}/logs` | Get log lines for a specific task run attempt |

## webAnalytics

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.webAnalytics.aggregatePageviews` | `GET /v1/query/web-analytics/visits/aggregate` | Aggregates page views |
| `client.api.webAnalytics.aggregateEvents` | `GET /v1/query/web-analytics/events/aggregate` | Aggregates custom events |
| `client.api.webAnalytics.countPageviews` | `GET /v1/query/web-analytics/visits/count` | Counts page views |
| `client.api.webAnalytics.countEvents` | `GET /v1/query/web-analytics/events/count` | Counts custom events |

## webhooks

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.webhooks.createWebhook` | `POST /v1/webhooks` | Creates a webhook |
| `client.api.webhooks.getWebhooks` | `GET /v1/webhooks` | Get a list of webhooks |
| `client.api.webhooks.getWebhook` | `GET /v1/webhooks/{id}` | Get a webhook |
| `client.api.webhooks.deleteWebhook` | `DELETE /v1/webhooks/{id}` | Deletes a webhook |

## aliases

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aliases.listDeploymentAliases` | `GET /v2/deployments/{id}/aliases` | List Deployment Aliases |
| `client.api.aliases.assignAlias` | `POST /v2/deployments/{id}/aliases` | Assign an Alias |
| `client.api.aliases.listAliases` | `GET /v4/aliases` | List aliases |
| `client.api.aliases.getAlias` | `GET /v4/aliases/{idOrAlias}` | Get an Alias |
| `client.api.aliases.deleteAlias` | `DELETE /v2/aliases/{aliasId}` | Delete an Alias |
| `client.api.aliases.patchUrlProtectionBypass` | `PATCH /aliases/{id}/protection-bypass` | Update the protection bypass for a URL |

## certs

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.certs.getCertById` | `GET /v8/certs/{id}` | Get cert by id |
| `client.api.certs.removeCert` | `DELETE /v8/certs/{id}` | Remove cert |
| `client.api.certs.getCerts` | `GET /v8/certs` | Get certs |
| `client.api.certs.issueCert` | `POST /v8/certs` | Issue a new cert |
| `client.api.certs.uploadCert` | `PUT /v8/certs` | Upload a cert |
