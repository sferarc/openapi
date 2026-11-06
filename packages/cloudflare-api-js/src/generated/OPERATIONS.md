# Operations

Generated from the Cloudflare API 4.0.0 OpenAPI spec; do not edit. 3774 operations. Call an operation as `client.api.<tag>.<operation>(params)`, or by its request as `client.request("<METHOD> <path>", params)`.

## health

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.health.getHeartbeat` | `GET /_heartbeat` | Heartbeat response |

## accounts

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accounts.accountsListAccounts` | `GET /accounts` | List Accounts |
| `client.api.accounts.accountCreation` | `POST /accounts` | Create an Account |
| `client.api.accounts.accountDeletion` | `DELETE /accounts/{accountId}` | Delete a specific account |
| `client.api.accounts.accountsAccountDetails` | `GET /accounts/{accountId}` | Account Details |
| `client.api.accounts.accountsUpdateAccount` | `PUT /accounts/{accountId}` | Update Account |
| `client.api.accounts.accountsMoveAccounts` | `POST /accounts/{accountId}/move` | Move account to organization |
| `client.api.accounts.accountsListAccountOrganizations` | `GET /accounts/{accountId}/organizations` | List account organizations |
| `client.api.accounts.accountsGetAccountProfile` | `GET /accounts/{accountId}/profile` | Get account profile |
| `client.api.accounts.accountsModifyAccountProfile` | `PUT /accounts/{accountId}/profile` | Update account profile |

## analyticsSql

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.analyticsSql.sqlApiQueryGet` | `GET /analytics/sql` | Query analytics datasets |
| `client.api.analyticsSql.sqlApiQueryPost` | `POST /analytics/sql` | Query analytics datasets |
| `client.api.analyticsSql.sqlApiIntrospection` | `GET /analytics/sql/introspection` | List available analytics datasets |
| `client.api.analyticsSql.sqlApiQueryGetAccountScoped` | `GET /accounts/{accountId}/analytics/sql` | Query analytics datasets |
| `client.api.analyticsSql.sqlApiQueryPostAccountScoped` | `POST /accounts/{accountId}/analytics/sql` | Query analytics datasets |
| `client.api.analyticsSql.sqlApiIntrospectionAccountScoped` | `GET /accounts/{accountId}/analytics/sql/introspection` | List available analytics datasets |

## accountBilling

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountBilling.billingValidateAddress` | `POST /billing/address-validation` | Validate Billing Address |
| `client.api.accountBilling.accountBillingGetBadDebt` | `GET /accounts/{accountId}/billing/bad-debt` | Get Account Bad Debt |
| `client.api.accountBilling.accountBillingGetCredits` | `GET /accounts/{accountId}/billing/credits` | Get Account Credits |
| `client.api.accountBilling.accountBillingCreatePaymentIntent` | `POST /accounts/{accountId}/billing/profile/payment-method` | Create Payment Intent for Billing Profile |
| `client.api.accountBilling.accountBillingGetUnpaidInvoices` | `GET /accounts/{accountId}/billing/unpaid-invoice` | Get Unpaid Invoices |
| `client.api.accountBilling.accountBillingCreateSetupIntent` | `POST /accounts/{accountId}/client-secret` | Create Setup Intent |
| `client.api.accountBilling.accountBillingTogglePdfInvoices` | `PATCH /accounts/{accountId}/invoices` | Toggle PDF Invoices |
| `client.api.accountBilling.accountBillingPayInvoice` | `POST /accounts/{accountId}/pay-invoice` | Pay Invoice |
| `client.api.accountBilling.accountBillingGetReceiptPdf` | `GET /accounts/{accountId}/receipts/{receiptId}/pdf` | Get Receipt PDF |

## originCa

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.originCa.originCaListCertificates` | `GET /certificates` | List Certificates |
| `client.api.originCa.originCaCreateCertificate` | `POST /certificates` | Create Certificate |
| `client.api.originCa.originCaRevokeCertificate` | `DELETE /certificates/{certificateId}` | Revoke Certificate |
| `client.api.originCa.originCaGetCertificate` | `GET /certificates/{certificateId}` | Get Certificate |

## cwsCategories

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cwsCategories.cwsListCategoryApis` | `GET /cws/categories/apis` | List category APIs |
| `client.api.cwsCategories.cwsListCategoryApplications` | `GET /cws/categories/applications` | List category applications |
| `client.api.cwsCategories.cwsListCategoryOperations` | `GET /cws/categories/operations` | List category operations |
| `client.api.cwsCategories.cwsListCategoryApplicationVersions` | `GET /cws/categories/applications/{applicationKey}/versions` | List application versions |
| `client.api.cwsCategories.cwsGetLatestCategoryApplicationVersion` | `GET /cws/categories/applications/{applicationKey}/versions/latest` | Get the latest application version |
| `client.api.cwsCategories.cwsGetCategoryApplicationVersion` | `GET /cws/categories/applications/{applicationKey}/versions/{versionTag}` | Get an application version |

## cwsFilterSchema

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cwsFilterSchema.cwsGetFilterSchema` | `GET /cws/filter-schema` | Get filter fields |

## brandProtection

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.brandProtection.postInternalSubmit` | `POST /internal/submit` | Internal route for testing URL submissions |
| `client.api.brandProtection.getLive` | `GET /live` | Run liveness checks |
| `client.api.brandProtection.getReady` | `GET /ready` | Run readiness checks |
| `client.api.brandProtection.getAccountsAccountIdBrandProtectionAlerts` | `GET /accounts/{accountId}/brand-protection/alerts` | Read all alerts on submitted domains |
| `client.api.brandProtection.patchAccountsAccountIdBrandProtectionAlerts` | `PATCH /accounts/{accountId}/brand-protection/alerts` | Update alerts on submitted domains by ID |
| `client.api.brandProtection.patchAccountsAccountIdBrandProtectionAlertsClear` | `PATCH /accounts/{accountId}/brand-protection/alerts/clear` | Update verification statuses of tracked URLs to awaiting by ID |
| `client.api.brandProtection.patchAccountsAccountIdBrandProtectionAlertsRefute` | `PATCH /accounts/{accountId}/brand-protection/alerts/refute` | Update verification statuses of tracked URLs to disproven by ID |
| `client.api.brandProtection.patchAccountsAccountIdBrandProtectionAlertsVerify` | `PATCH /accounts/{accountId}/brand-protection/alerts/verify` | Update verification statuses of tracked URLs to confirmed by ID |
| `client.api.brandProtection.deleteAccountsAccountIdBrandProtectionBrands` | `DELETE /accounts/{accountId}/brand-protection/brands` | Delete brands by ID |
| `client.api.brandProtection.getAccountsAccountIdBrandProtectionBrands` | `GET /accounts/{accountId}/brand-protection/brands` | Read all brands |
| `client.api.brandProtection.postAccountsAccountIdBrandProtectionBrands` | `POST /accounts/{accountId}/brand-protection/brands` | Create new brands |
| `client.api.brandProtection.deleteAccountsAccountIdBrandProtectionBrandsPatterns` | `DELETE /accounts/{accountId}/brand-protection/brands/patterns` | Delete patterns for brands by ID |
| `client.api.brandProtection.getAccountsAccountIdBrandProtectionBrandsPatterns` | `GET /accounts/{accountId}/brand-protection/brands/patterns` | Read patterns for brands by ID |
| `client.api.brandProtection.postAccountsAccountIdBrandProtectionBrandsPatterns` | `POST /accounts/{accountId}/brand-protection/brands/patterns` | Create new patterns for brands by ID |
| `client.api.brandProtection.patchAccountsAccountIdBrandProtectionClear` | `PATCH /accounts/{accountId}/brand-protection/clear` | Update verification statuses of submitted URLs to awaiting by ID |
| `client.api.brandProtection.getAccountsAccountIdBrandProtectionDomainInfo` | `GET /accounts/{accountId}/brand-protection/domain-info` | Read submitted domains by ID |
| `client.api.brandProtection.getAccountsAccountIdBrandProtectionRecentSubmissions` | `GET /accounts/{accountId}/brand-protection/recent-submissions` | Read recent URL submissions |
| `client.api.brandProtection.patchAccountsAccountIdBrandProtectionRefute` | `PATCH /accounts/{accountId}/brand-protection/refute` | Update verification statuses of submitted URLs to disproven by ID |
| `client.api.brandProtection.getAccountsAccountIdBrandProtectionSubmissionInfo` | `GET /accounts/{accountId}/brand-protection/submission-info` | Read URL submissions by ID |
| `client.api.brandProtection.postAccountsAccountIdBrandProtectionSubmit` | `POST /accounts/{accountId}/brand-protection/submit` | Create new URL submissions |
| `client.api.brandProtection.getAccountsAccountIdBrandProtectionTrackedDomains` | `GET /accounts/{accountId}/brand-protection/tracked-domains` | Read submitted domains by pattern |
| `client.api.brandProtection.getAccountsAccountIdBrandProtectionUrlInfo` | `GET /accounts/{accountId}/brand-protection/url-info` | Read submitted URLs by ID |
| `client.api.brandProtection.patchAccountsAccountIdBrandProtectionVerify` | `PATCH /accounts/{accountId}/brand-protection/verify` | Update verification statuses of submitted URLs to confirmed by ID |
| `client.api.brandProtection.getDomainMatchList` | `GET /accounts/{accountId}/cloudforce-one/v2/brand-protection/domain/matches` | List domain matches |
| `client.api.brandProtection.postBulkDismissMatches` | `POST /accounts/{accountId}/cloudforce-one/v2/brand-protection/domain/matches/bulk-dismiss` | Bulk dismiss or undismiss matches |
| `client.api.brandProtection.getGetDomainQueries` | `GET /accounts/{accountId}/cloudforce-one/v2/brand-protection/domain/queries` | List domain queries |
| `client.api.brandProtection.postInsertDomainQuery` | `POST /accounts/{accountId}/cloudforce-one/v2/brand-protection/domain/queries` | Create domain query |
| `client.api.brandProtection.deleteDeleteDomainQuery` | `DELETE /accounts/{accountId}/cloudforce-one/v2/brand-protection/domain/queries/{queryId}` | Delete domain query |
| `client.api.brandProtection.patchUpdateDomainQuery` | `PATCH /accounts/{accountId}/cloudforce-one/v2/brand-protection/domain/queries/{queryId}` | Update domain query |
| `client.api.brandProtection.postDomainTrial` | `POST /accounts/{accountId}/cloudforce-one/v2/brand-protection/domain/trial` | Analyze domains for brand impersonation |
| `client.api.brandProtection.postLetterGenerate` | `POST /accounts/{accountId}/cloudforce-one/v2/brand-protection/letter/generate` | Generate takedown letter |
| `client.api.brandProtection.getLetterTemplateList` | `GET /accounts/{accountId}/cloudforce-one/v2/brand-protection/letter/templates` | List letter templates |
| `client.api.brandProtection.postLetterTemplateCreate` | `POST /accounts/{accountId}/cloudforce-one/v2/brand-protection/letter/templates` | Create letter template |
| `client.api.brandProtection.getLetterTemplateExamples` | `GET /accounts/{accountId}/cloudforce-one/v2/brand-protection/letter/templates/examples` | List example letter templates |
| `client.api.brandProtection.deleteLetterTemplateDelete` | `DELETE /accounts/{accountId}/cloudforce-one/v2/brand-protection/letter/templates/{templateId}` | Delete letter template |
| `client.api.brandProtection.getLetterTemplateGet` | `GET /accounts/{accountId}/cloudforce-one/v2/brand-protection/letter/templates/{templateId}` | Get letter template |
| `client.api.brandProtection.putLetterTemplateUpdate` | `PUT /accounts/{accountId}/cloudforce-one/v2/brand-protection/letter/templates/{templateId}` | Update letter template |
| `client.api.brandProtection.getLogoMatchList` | `GET /accounts/{accountId}/cloudforce-one/v2/brand-protection/logo/matches` | List logo matches |
| `client.api.brandProtection.getGetLogoQueries` | `GET /accounts/{accountId}/cloudforce-one/v2/brand-protection/logo/queries` | List logo queries |
| `client.api.brandProtection.postInsertLogoQuery` | `POST /accounts/{accountId}/cloudforce-one/v2/brand-protection/logo/queries` | Create logo query |
| `client.api.brandProtection.deleteDeleteLogoQuery` | `DELETE /accounts/{accountId}/cloudforce-one/v2/brand-protection/logo/queries/{queryId}` | Delete logo query |
| `client.api.brandProtection.postSearchLogoSimilarity` | `POST /accounts/{accountId}/cloudforce-one/v2/brand-protection/logo/search` | Search scanned images |
| `client.api.brandProtection.postDismissMatch` | `POST /accounts/{accountId}/cloudforce-one/v2/brand-protection/queries/{queryId}/matches/{domainId}/dismiss` | Dismiss a domain match |
| `client.api.brandProtection.postUndismissMatch` | `POST /accounts/{accountId}/cloudforce-one/v2/brand-protection/queries/{queryId}/matches/{domainId}/undismiss` | Undismiss a domain match |
| `client.api.brandProtection.getTakedownNoticeList` | `GET /accounts/{accountId}/cloudforce-one/v2/brand-protection/takedown-notices` | List takedown notices |
| `client.api.brandProtection.postTakedownNoticeCreate` | `POST /accounts/{accountId}/cloudforce-one/v2/brand-protection/takedown-notices` | Create takedown notice |
| `client.api.brandProtection.postTakedownNoticeLookup` | `POST /accounts/{accountId}/cloudforce-one/v2/brand-protection/takedown-notices/lookup` | Lookup takedown notices by domains |
| `client.api.brandProtection.deleteTakedownNoticeDelete` | `DELETE /accounts/{accountId}/cloudforce-one/v2/brand-protection/takedown-notices/{noticeId}` | Delete takedown notice |
| `client.api.brandProtection.getTakedownNoticeGet` | `GET /accounts/{accountId}/cloudforce-one/v2/brand-protection/takedown-notices/{noticeId}` | Get takedown notice |
| `client.api.brandProtection.putTakedownNoticeUpdate` | `PUT /accounts/{accountId}/cloudforce-one/v2/brand-protection/takedown-notices/{noticeId}` | Update takedown notice |
| `client.api.brandProtection.getTakedownLetterList` | `GET /accounts/{accountId}/cloudforce-one/v2/brand-protection/takedown-notices/{noticeId}/letters` | List takedown letters |
| `client.api.brandProtection.postTakedownLetterCreate` | `POST /accounts/{accountId}/cloudforce-one/v2/brand-protection/takedown-notices/{noticeId}/letters` | Create takedown letter |
| `client.api.brandProtection.deleteTakedownLetterDelete` | `DELETE /accounts/{accountId}/cloudforce-one/v2/brand-protection/takedown-notices/{noticeId}/letters/{letterId}` | Delete takedown letter |
| `client.api.brandProtection.getTakedownLetterGet` | `GET /accounts/{accountId}/cloudforce-one/v2/brand-protection/takedown-notices/{noticeId}/letters/{letterId}` | Get takedown letter |
| `client.api.brandProtection.getTakedownLetterPdfGet` | `GET /accounts/{accountId}/cloudforce-one/v2/brand-protection/takedown-notices/{noticeId}/letters/{letterId}/pdf` | Download takedown letter PDF |
| `client.api.brandProtection.getTotalQueries` | `GET /accounts/{accountId}/cloudforce-one/v2/brand-protection/total-queries` | Get total query count |
| `client.api.brandProtection.getBrandProtectionUrlInfo` | `GET /accounts/{accountId}/cloudforce-one/v2/brand-protection/url/info` | Get URL scan information |
| `client.api.brandProtection.postBrandProtectionUrlSubmit` | `POST /accounts/{accountId}/cloudforce-one/v2/brand-protection/url/submit` | Submit a URL for scanning |

## cloudflareIps

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cloudflareIps.cloudflareIpsCloudflareIpDetails` | `GET /ips` | Cloudflare/JD Cloud IP Details |

## usersAccountMemberships

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.usersAccountMemberships.userSAccountMembershipsListMemberships` | `GET /memberships` | List Memberships |
| `client.api.usersAccountMemberships.userSAccountMembershipsDeleteMembership` | `DELETE /memberships/{membershipId}` | Delete Membership |
| `client.api.usersAccountMemberships.userSAccountMembershipsMembershipDetails` | `GET /memberships/{membershipId}` | Membership Details |
| `client.api.usersAccountMemberships.userSAccountMembershipsUpdateMembership` | `PUT /memberships/{membershipId}` | Update Membership |
| `client.api.usersAccountMemberships.userMembershipsGet` | `GET /user/memberships/{membershipId}` | Get User Membership |

## oauthClients

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.oauthClients.oauthScopesList` | `GET /oauth/scopes` | List OAuth Scopes |
| `client.api.oauthClients.oauthClientsList` | `GET /accounts/{accountId}/oauth_clients` | List OAuth Clients |
| `client.api.oauthClients.oauthClientsCreate` | `POST /accounts/{accountId}/oauth_clients` | Create OAuth Client |
| `client.api.oauthClients.oauthClientsDelete` | `DELETE /accounts/{accountId}/oauth_clients/{oauthClientId}` | Delete OAuth Client |
| `client.api.oauthClients.oauthClientsGet` | `GET /accounts/{accountId}/oauth_clients/{oauthClientId}` | OAuth Client Details |
| `client.api.oauthClients.oauthClientsUpdate` | `PATCH /accounts/{accountId}/oauth_clients/{oauthClientId}` | Update OAuth Client |
| `client.api.oauthClients.oauthClientsDeleteRotatedSecret` | `DELETE /accounts/{accountId}/oauth_clients/{oauthClientId}/rotate_secret` | Delete Rotated OAuth Client Secret |
| `client.api.oauthClients.oauthClientsRotateSecret` | `POST /accounts/{accountId}/oauth_clients/{oauthClientId}/rotate_secret` | Rotate OAuth Client Secret |

## organizations

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.organizations.organizationListOrganizations` | `GET /organizations` | List organizations the user has access to |
| `client.api.organizations.organizationsCreateUserOrganization` | `POST /organizations` | Create organization |
| `client.api.organizations.getOrgAnalytics` | `GET /accounts/{accountId}/realtime/kit/{appId}/analytics/daywise` | Fetch day-wise session and recording analytics data for an App |
| `client.api.organizations.organizationsDelete` | `DELETE /organizations/{organizationId}` | Delete organization |
| `client.api.organizations.organizationsRetrieve` | `GET /organizations/{organizationId}` | Get organization |
| `client.api.organizations.organizationsModify` | `PUT /organizations/{organizationId}` | Update organization |
| `client.api.organizations.organizationsGetAccounts` | `GET /organizations/{organizationId}/accounts` | List organization accounts |
| `client.api.organizations.organizationsHandleOrganizationInvite` | `PUT /organizations/{organizationId}/invites/{memberCode}` | Handle organization invite |
| `client.api.organizations.organizationsGetProfile` | `GET /organizations/{organizationId}/profile` | Get organization profile |
| `client.api.organizations.organizationsModifyProfile` | `PUT /organizations/{organizationId}/profile` | Modify organization profile. |

## pagesAssets

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.pagesAssets.pagesAssetsCheckMissing` | `POST /pages/assets/check-missing` | Check missing assets |
| `client.api.pagesAssets.pagesAssetsUpload` | `POST /pages/assets/upload` | Upload asset |
| `client.api.pagesAssets.pagesAssetsUpsertHashes` | `POST /pages/assets/upsert-hashes` | Upsert asset hashes |

## workersK2Other

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workersK2Other.postK2Produce` | `POST /produce` | Produce records |
| `client.api.workersK2Other.getK2Subscriptions` | `GET /subscriptions` | List subscriptions |
| `client.api.workersK2Other.postK2Subscriptions` | `POST /subscriptions` | Create subscription |
| `client.api.workersK2Other.getV4AccountsByAccountIdK2Streams` | `GET /accounts/{accountId}/k2/streams` | List K2 streams |
| `client.api.workersK2Other.postV4AccountsByAccountIdK2Streams` | `POST /accounts/{accountId}/k2/streams` | Create K2 stream |
| `client.api.workersK2Other.deleteV4AccountsByAccountIdK2StreamsByStreamId` | `DELETE /accounts/{accountId}/k2/streams/{streamId}` | Delete K2 stream |
| `client.api.workersK2Other.getV4AccountsByAccountIdK2StreamsByStreamId` | `GET /accounts/{accountId}/k2/streams/{streamId}` | Get K2 stream |
| `client.api.workersK2Other.patchV4AccountsByAccountIdK2StreamsByStreamId` | `PATCH /accounts/{accountId}/k2/streams/{streamId}` | Update K2 stream |
| `client.api.workersK2Other.getV4AccountsByAccountIdK2StreamsByStreamIdSubscriptions` | `GET /accounts/{accountId}/k2/streams/{streamId}/subscriptions` | List subscriptions with consumer lag |
| `client.api.workersK2Other.deleteK2SubscriptionsBySubscriptionId` | `DELETE /subscriptions/{subscriptionId}` | Delete subscription |
| `client.api.workersK2Other.getK2SubscriptionsBySubscriptionId` | `GET /subscriptions/{subscriptionId}` | Get subscription |
| `client.api.workersK2Other.postK2SubscriptionsBySubscriptionIdBatchesByBatchIdAck` | `POST /subscriptions/{subscriptionId}/batches/{batchId}/ack` | Acknowledge batch |
| `client.api.workersK2Other.postK2SubscriptionsBySubscriptionIdBatchesByBatchIdExtend` | `POST /subscriptions/{subscriptionId}/batches/{batchId}/extend` | Extend batch lease |
| `client.api.workersK2Other.postK2SubscriptionsBySubscriptionIdBatchesByBatchIdNack` | `POST /subscriptions/{subscriptionId}/batches/{batchId}/nack` | Release batch |
| `client.api.workersK2Other.postK2SubscriptionsBySubscriptionIdConsume` | `POST /subscriptions/{subscriptionId}/consume` | Consume records |

## radarAgentReadiness

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarAgentReadiness.radarGetAgentReadinessSummary` | `GET /radar/agent_readiness/summary/{dimension}` | Get agent readiness summary |

## radarAiBots

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarAiBots.radarGetAiBotsSummaryByUserAgent` | `GET /radar/ai/bots/summary/user_agent` | Get AI user agents summary |
| `client.api.radarAiBots.radarGetAiBotsSummary` | `GET /radar/ai/bots/summary/{dimension}` | Get AI bots HTTP requests distribution by dimension |
| `client.api.radarAiBots.radarGetAiBotsTimeseries` | `GET /radar/ai/bots/timeseries` | Get AI bots HTTP requests time series |
| `client.api.radarAiBots.radarGetAiBotsTimeseriesGroupByUserAgent` | `GET /radar/ai/bots/timeseries_groups/user_agent` | Get AI user agents time series |
| `client.api.radarAiBots.radarGetAiBotsTimeseriesGroup` | `GET /radar/ai/bots/timeseries_groups/{dimension}` | Get time series distribution of AI bots HTTP requests by dimension. |

## radarAiInference

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarAiInference.radarGetAiInferenceSummaryByModel` | `GET /radar/ai/inference/summary/model` | Get Workers AI models summary |
| `client.api.radarAiInference.radarGetAiInferenceSummaryByTask` | `GET /radar/ai/inference/summary/task` | Get Workers AI tasks summary |
| `client.api.radarAiInference.radarGetAiInferenceSummary` | `GET /radar/ai/inference/summary/{dimension}` | Get Workers AI inference distribution by dimension |
| `client.api.radarAiInference.radarGetAiInferenceTimeseriesGroupByModel` | `GET /radar/ai/inference/timeseries_groups/model` | Get Workers AI models time series |
| `client.api.radarAiInference.radarGetAiInferenceTimeseriesGroupByTask` | `GET /radar/ai/inference/timeseries_groups/task` | Get Workers AI tasks time series |
| `client.api.radarAiInference.radarGetAiInferenceTimeseriesGroup` | `GET /radar/ai/inference/timeseries_groups/{dimension}` | Get time series distribution of Workers AI inference by dimension. |

## radarMarkdownForAgents

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarMarkdownForAgents.radarGetAiMarkdownForAgentsSummary` | `GET /radar/ai/markdown_for_agents/summary` | Get AI markdown for agents reduction ratio summary |
| `client.api.radarMarkdownForAgents.radarGetAiMarkdownForAgentsTimeseries` | `GET /radar/ai/markdown_for_agents/timeseries` | Get AI markdown for agents reduction ratio time series |

## radarAnnotations

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarAnnotations.radarGetAnnotations` | `GET /radar/annotations` | Get latest annotations |
| `client.api.radarAnnotations.radarGetAnnotationsOutages` | `GET /radar/annotations/outages` | Get latest Internet outages and anomalies |
| `client.api.radarAnnotations.radarGetAnnotationsOutagesTop` | `GET /radar/annotations/outages/locations` | Get the number of outages by location |
| `client.api.radarAnnotations.radarGetAnnotationById` | `GET /radar/annotations/{id}` | Get annotation by ID |

## radarAs112

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarAs112.radarGetDnsAs112TimeseriesByDnssec` | `GET /radar/as112/summary/dnssec` | Get AS112 DNS queries by DNSSEC summary |
| `client.api.radarAs112.radarGetDnsAs112TimeseriesByEdns` | `GET /radar/as112/summary/edns` | Get AS112 DNS queries by EDNS summary |
| `client.api.radarAs112.radarGetDnsAs112TimeseriesByIpVersion` | `GET /radar/as112/summary/ip_version` | Get AS112 DNS queries by IP version summary |
| `client.api.radarAs112.radarGetDnsAs112TimeseriesByProtocol` | `GET /radar/as112/summary/protocol` | Get AS112 DNS queries by DNS protocol summary |
| `client.api.radarAs112.radarGetDnsAs112TimeseriesByQueryType` | `GET /radar/as112/summary/query_type` | Get AS112 DNS queries by type summary |
| `client.api.radarAs112.radarGetDnsAs112TimeseriesByResponseCodes` | `GET /radar/as112/summary/response_codes` | Get AS112 DNS queries by response code summary |
| `client.api.radarAs112.radarGetDnsAs112Summary` | `GET /radar/as112/summary/{dimension}` | Get AS112 summary by dimension |
| `client.api.radarAs112.radarGetDnsAs112Timeseries` | `GET /radar/as112/timeseries` | Get AS112 DNS queries time series |
| `client.api.radarAs112.radarGetDnsAs112TimeseriesGroupByDnssec` | `GET /radar/as112/timeseries_groups/dnssec` | Get AS112 DNS queries by DNSSEC support time series |
| `client.api.radarAs112.radarGetDnsAs112TimeseriesGroupByEdns` | `GET /radar/as112/timeseries_groups/edns` | Get AS112 DNS queries by EDNS support summary |
| `client.api.radarAs112.radarGetDnsAs112TimeseriesGroupByIpVersion` | `GET /radar/as112/timeseries_groups/ip_version` | Get AS112 DNS queries by IP version time series |
| `client.api.radarAs112.radarGetDnsAs112TimeseriesGroupByProtocol` | `GET /radar/as112/timeseries_groups/protocol` | Get AS112 DNS queries by DNS protocol time series |
| `client.api.radarAs112.radarGetDnsAs112TimeseriesGroupByQueryType` | `GET /radar/as112/timeseries_groups/query_type` | Get AS112 DNS queries by type time series |
| `client.api.radarAs112.radarGetDnsAs112TimeseriesGroupByResponseCodes` | `GET /radar/as112/timeseries_groups/response_codes` | Get AS112 DNS queries by response code time series |
| `client.api.radarAs112.radarGetDnsAs112TimeseriesGroup` | `GET /radar/as112/timeseries_groups/{dimension}` | Get AS112 time series grouped by dimension |
| `client.api.radarAs112.radarGetDnsAs112TopLocations` | `GET /radar/as112/top/locations` | Get top locations by AS112 DNS queries |
| `client.api.radarAs112.radarGetDnsAs112TopLocationsByDnssec` | `GET /radar/as112/top/locations/dnssec/{dnssec}` | Get top locations by AS112 DNS queries with DNSSEC support |
| `client.api.radarAs112.radarGetDnsAs112TopLocationsByEdns` | `GET /radar/as112/top/locations/edns/{edns}` | Get top locations by AS112 DNS queries with EDNS support |
| `client.api.radarAs112.radarGetDnsAs112TopLocationsByIpVersion` | `GET /radar/as112/top/locations/ip_version/{ipVersion}` | Get top locations by AS112 DNS queries for an IP version |

## radarLayer3Attacks

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3SummaryByBitrate` | `GET /radar/attacks/layer3/summary/bitrate` | Get layer 3 attacks by bitrate summary |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3SummaryByDuration` | `GET /radar/attacks/layer3/summary/duration` | Get layer 3 attacks by duration summary |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3SummaryByIndustry` | `GET /radar/attacks/layer3/summary/industry` | Get layer 3 attacks by targeted industry summary |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3SummaryByIpVersion` | `GET /radar/attacks/layer3/summary/ip_version` | Get layer 3 attacks by IP version summary |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3SummaryByProtocol` | `GET /radar/attacks/layer3/summary/protocol` | Get layer 3 attacks by protocol summary |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3SummaryByVector` | `GET /radar/attacks/layer3/summary/vector` | Get layer 3 attacks by vector summary |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3SummaryByVertical` | `GET /radar/attacks/layer3/summary/vertical` | Get layer 3 attacks by targeted vertical summary |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3Summary` | `GET /radar/attacks/layer3/summary/{dimension}` | Get layer 3 attacks summary by dimension |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3TimeseriesByBytes` | `GET /radar/attacks/layer3/timeseries` | Get layer 3 attacks by bytes time series |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3TimeseriesGroupByBitrate` | `GET /radar/attacks/layer3/timeseries_groups/bitrate` | Get layer 3 attacks by bitrate time series |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3TimeseriesGroupByDuration` | `GET /radar/attacks/layer3/timeseries_groups/duration` | Get layer 3 attacks by duration time series |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3TimeseriesGroupByIndustry` | `GET /radar/attacks/layer3/timeseries_groups/industry` | Get layer 3 attacks by target industries time series |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3TimeseriesGroupByIpVersion` | `GET /radar/attacks/layer3/timeseries_groups/ip_version` | Get layer 3 attacks by IP version time series |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3TimeseriesGroupByProtocol` | `GET /radar/attacks/layer3/timeseries_groups/protocol` | Get layer 3 attacks by protocol time series |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3TimeseriesGroupByVector` | `GET /radar/attacks/layer3/timeseries_groups/vector` | Get layer 3 attacks by vector time series |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3TimeseriesGroupByVertical` | `GET /radar/attacks/layer3/timeseries_groups/vertical` | Get layer 3 attacks by vertical time series |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3TimeseriesGroup` | `GET /radar/attacks/layer3/timeseries_groups/{dimension}` | Get layer 3 attacks time series grouped by dimension |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3TopAttacks` | `GET /radar/attacks/layer3/top/attacks` | Get top layer 3 attack pairs (origin and target locations) |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3TopIndustries` | `GET /radar/attacks/layer3/top/industry` | Get top industries targeted by layer 3 attacks |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3TopOriginLocations` | `GET /radar/attacks/layer3/top/locations/origin` | Get top origin locations of layer 3 attacks |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3TopTargetLocations` | `GET /radar/attacks/layer3/top/locations/target` | Get top target locations of layer 3 attacks |
| `client.api.radarLayer3Attacks.radarGetAttacksLayer3TopVerticals` | `GET /radar/attacks/layer3/top/vertical` | Get top verticals targeted by layer 3 attacks |

## radarLayer7Attacks

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7SummaryByHttpMethod` | `GET /radar/attacks/layer7/summary/http_method` | Get layer 7 attacks by HTTP method summary |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7SummaryByHttpVersion` | `GET /radar/attacks/layer7/summary/http_version` | Get layer 7 attacks by HTTP version summary |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7SummaryByIndustry` | `GET /radar/attacks/layer7/summary/industry` | Get layer 7 attacks by targeted industry summary |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7SummaryByIpVersion` | `GET /radar/attacks/layer7/summary/ip_version` | Get layer 7 attacks by IP version summary |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7SummaryByManagedRules` | `GET /radar/attacks/layer7/summary/managed_rules` | Get layer 7 attacks by managed rules summary |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7SummaryByMitigationProduct` | `GET /radar/attacks/layer7/summary/mitigation_product` | Get layer 7 attacks by mitigation product summary |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7SummaryByVertical` | `GET /radar/attacks/layer7/summary/vertical` | Get layer 7 attacks by targeted vertical summary |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7Summary` | `GET /radar/attacks/layer7/summary/{dimension}` | Get layer 7 attacks summary by dimension |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7Timeseries` | `GET /radar/attacks/layer7/timeseries` | Get layer 7 attacks time series |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7TimeseriesGroupByHttpMethod` | `GET /radar/attacks/layer7/timeseries_groups/http_method` | Get layer 7 attacks by HTTP method time series |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7TimeseriesGroupByHttpVersion` | `GET /radar/attacks/layer7/timeseries_groups/http_version` | Get layer 7 attacks by HTTP version time series |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7TimeseriesGroupByIndustry` | `GET /radar/attacks/layer7/timeseries_groups/industry` | Get layer 7 attacks by target industries time series |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7TimeseriesGroupByIpVersion` | `GET /radar/attacks/layer7/timeseries_groups/ip_version` | Get layer 7 attacks by IP version time series |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7TimeseriesGroupByManagedRules` | `GET /radar/attacks/layer7/timeseries_groups/managed_rules` | Get layer 7 attacks by managed rules time series |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7TimeseriesGroupByMitigationProduct` | `GET /radar/attacks/layer7/timeseries_groups/mitigation_product` | Get layer 7 attacks by mitigation product time series |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7TimeseriesGroupByVertical` | `GET /radar/attacks/layer7/timeseries_groups/vertical` | Get layer 7 attacks by vertical time series |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7TimeseriesGroup` | `GET /radar/attacks/layer7/timeseries_groups/{dimension}` | Get layer 7 attacks time series grouped by dimension |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7TopOriginAs` | `GET /radar/attacks/layer7/top/ases/origin` | Get top origin ASes of layer 7 attacks |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7TopAttacks` | `GET /radar/attacks/layer7/top/attacks` | Get top layer 7 attack pairs (origin and target locations) |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7TopIndustries` | `GET /radar/attacks/layer7/top/industry` | Get top industries targeted by layer 7 attacks |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7TopOriginLocation` | `GET /radar/attacks/layer7/top/locations/origin` | Get top origin locations of layer 7 attacks |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7TopTargetLocation` | `GET /radar/attacks/layer7/top/locations/target` | Get top target locations of layer 7 attacks |
| `client.api.radarLayer7Attacks.radarGetAttacksLayer7TopVerticals` | `GET /radar/attacks/layer7/top/vertical` | Get top verticals targeted by layer 7 attacks |

## radarBgp

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarBgp.radarGetBgpHijacksEvents` | `GET /radar/bgp/hijacks/events` | Get BGP hijack events |
| `client.api.radarBgp.radarGetBgpIpsTimeseries` | `GET /radar/bgp/ips/timeseries` | Get announced IP address space time series |
| `client.api.radarBgp.radarGetBgpIpsTopAses` | `GET /radar/bgp/ips/top/ases` | Get top ASes by announced IP space |
| `client.api.radarBgp.radarGetBgpRouteLeakEvents` | `GET /radar/bgp/leaks/events` | Get BGP route leak events |
| `client.api.radarBgp.radarGetBgpRoutesAsns` | `GET /radar/bgp/routes/ases` | List ASes from global routing tables |
| `client.api.radarBgp.radarGetBgpPfx2AsMoas` | `GET /radar/bgp/routes/moas` | Get Multi-Origin AS (MOAS) prefixes |
| `client.api.radarBgp.radarGetBgpRoutesPaths` | `GET /radar/bgp/routes/paths/{asn}` | Get tier-1 path segments for an AS |
| `client.api.radarBgp.radarGetBgpPfx2As` | `GET /radar/bgp/routes/pfx2as` | Get prefix-to-ASN mapping |
| `client.api.radarBgp.radarGetBgpRoutesRealtime` | `GET /radar/bgp/routes/realtime` | Get real-time BGP routes for a prefix |
| `client.api.radarBgp.radarGetBgpRoutesStats` | `GET /radar/bgp/routes/stats` | Get BGP routing table stats |
| `client.api.radarBgp.radarGetBgpRoutesUpstreamsTimeseries` | `GET /radar/bgp/routes/upstreams/{asn}/timeseries` | Get upstream composition time series for an AS |
| `client.api.radarBgp.radarGetBgpRpkiAspaChanges` | `GET /radar/bgp/rpki/aspa/changes` | Get ASPA changes over time |
| `client.api.radarBgp.radarGetBgpRpkiAspaSnapshot` | `GET /radar/bgp/rpki/aspa/snapshot` | Get ASPA objects snapshot |
| `client.api.radarBgp.radarGetBgpRpkiAspaTimeseries` | `GET /radar/bgp/rpki/aspa/timeseries` | Get ASPA count time series |
| `client.api.radarBgp.radarGetBgpRpkiRoasTimeseries` | `GET /radar/bgp/rpki/roas/timeseries` | Get RPKI ROA deployment time series |
| `client.api.radarBgp.radarGetBgpTimeseries` | `GET /radar/bgp/timeseries` | Get BGP time series |
| `client.api.radarBgp.radarGetBgpTopAses` | `GET /radar/bgp/top/ases` | Get top ASes by BGP updates |
| `client.api.radarBgp.radarGetBgpTopAsnsByPrefixes` | `GET /radar/bgp/top/ases/prefixes` | Get top ASes by prefix count |
| `client.api.radarBgp.radarGetBgpTopPrefixes` | `GET /radar/bgp/top/prefixes` | Get top prefixes by BGP updates |

## radarBots

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarBots.radarGetBots` | `GET /radar/bots` | List bots |
| `client.api.radarBots.radarGetBotsSummary` | `GET /radar/bots/summary/{dimension}` | Get bots HTTP requests distribution by dimension |
| `client.api.radarBots.radarGetBotsTimeseries` | `GET /radar/bots/timeseries` | Get bots HTTP requests time series |
| `client.api.radarBots.radarGetBotsTimeseriesGroup` | `GET /radar/bots/timeseries_groups/{dimension}` | Get time series distribution of bots HTTP requests by dimension. |
| `client.api.radarBots.radarGetBotDetails` | `GET /radar/bots/{botSlug}` | Get bot details |

## radarWebCrawlers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarWebCrawlers.radarGetCrawlersSummary` | `GET /radar/bots/crawlers/summary/{dimension}` | Get crawler HTTP request distribution by dimension |
| `client.api.radarWebCrawlers.radarGetCrawlersTimeseriesGroup` | `GET /radar/bots/crawlers/timeseries_groups/{dimension}` | Get time series of crawler HTTP request distribution by dimension |

## radarCertificateTransparency

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarCertificateTransparency.radarGetCertificateAuthorities` | `GET /radar/ct/authorities` | List certificate authorities |
| `client.api.radarCertificateTransparency.radarGetCertificateLogs` | `GET /radar/ct/logs` | List certificate logs |
| `client.api.radarCertificateTransparency.radarGetCtSummary` | `GET /radar/ct/summary/{dimension}` | Get certificate distribution by dimension |
| `client.api.radarCertificateTransparency.radarGetCtTimeseries` | `GET /radar/ct/timeseries` | Get certificates time series |
| `client.api.radarCertificateTransparency.radarGetCtTimeseriesGroup` | `GET /radar/ct/timeseries_groups/{dimension}` | Get time series of certificate distribution by dimension |
| `client.api.radarCertificateTransparency.radarGetCertificateAuthorityDetails` | `GET /radar/ct/authorities/{caSlug}` | Get certificate authority details |
| `client.api.radarCertificateTransparency.radarGetCertificateLogDetails` | `GET /radar/ct/logs/{logSlug}` | Get certificate log details |

## radarDatasets

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarDatasets.radarGetReportsDatasets` | `GET /radar/datasets` | List datasets |
| `client.api.radarDatasets.radarPostReportsDatasetDownloadUrl` | `POST /radar/datasets/download` | Get dataset download URL |
| `client.api.radarDatasets.radarGetReportsDatasetDownload` | `GET /radar/datasets/{alias}` | Get dataset CSV stream |

## radarDns

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarDns.radarGetDnsSummaryByCacheHitStatus` | `GET /radar/dns/summary/cache_hit` | Get DNS queries by cache status summary |
| `client.api.radarDns.radarGetDnsSummaryByDnssec` | `GET /radar/dns/summary/dnssec` | Get DNS queries by DNSSEC support summary |
| `client.api.radarDns.radarGetDnsSummaryByDnssecAwareness` | `GET /radar/dns/summary/dnssec_aware` | Get DNS queries by DNSSEC awareness summary |
| `client.api.radarDns.radarGetDnsSummaryByDnssecE2EVersion` | `GET /radar/dns/summary/dnssec_e2e` | Get DNS queries by DNSSEC end-to-end summary |
| `client.api.radarDns.radarGetDnsSummaryByIpVersion` | `GET /radar/dns/summary/ip_version` | Get DNS queries by IP version summary |
| `client.api.radarDns.radarGetDnsSummaryByMatchingAnswerStatus` | `GET /radar/dns/summary/matching_answer` | Get DNS queries by matching answer summary |
| `client.api.radarDns.radarGetDnsSummaryByProtocol` | `GET /radar/dns/summary/protocol` | Get DNS queries by protocol summary |
| `client.api.radarDns.radarGetDnsSummaryByQueryType` | `GET /radar/dns/summary/query_type` | Get DNS queries by type summary |
| `client.api.radarDns.radarGetDnsSummaryByResponseCode` | `GET /radar/dns/summary/response_code` | Get DNS queries by response code summary |
| `client.api.radarDns.radarGetDnsSummaryByResponseTtl` | `GET /radar/dns/summary/response_ttl` | Get DNS queries by response TTL summary |
| `client.api.radarDns.radarGetDnsSummary` | `GET /radar/dns/summary/{dimension}` | Get DNS summary by dimension |
| `client.api.radarDns.radarGetDnsTimeseries` | `GET /radar/dns/timeseries` | Get DNS queries time series |
| `client.api.radarDns.radarGetDnsTimeseriesGroupByCacheHitStatus` | `GET /radar/dns/timeseries_groups/cache_hit` | Get DNS queries by cache status time series |
| `client.api.radarDns.radarGetDnsTimeseriesGroupByDnssec` | `GET /radar/dns/timeseries_groups/dnssec` | Get DNS queries by DNSSEC support time series |
| `client.api.radarDns.radarGetDnsTimeseriesGroupByDnssecAwareness` | `GET /radar/dns/timeseries_groups/dnssec_aware` | Get DNS queries by DNSSEC awareness time series |
| `client.api.radarDns.radarGetDnsTimeseriesGroupByDnssecE2EVersion` | `GET /radar/dns/timeseries_groups/dnssec_e2e` | Get DNS queries by DNSSEC end-to-end time series |
| `client.api.radarDns.radarGetDnsTimeseriesGroupByIpVersion` | `GET /radar/dns/timeseries_groups/ip_version` | Get DNS queries by IP version time series |
| `client.api.radarDns.radarGetDnsTimeseriesGroupByMatchingAnswerStatus` | `GET /radar/dns/timeseries_groups/matching_answer` | Get DNS queries by matching answer time series |
| `client.api.radarDns.radarGetDnsTimeseriesGroupByProtocol` | `GET /radar/dns/timeseries_groups/protocol` | Get DNS queries by protocol time series |
| `client.api.radarDns.radarGetDnsTimeseriesGroupByQueryType` | `GET /radar/dns/timeseries_groups/query_type` | Get DNS queries by type time series |
| `client.api.radarDns.radarGetDnsTimeseriesGroupByResponseCode` | `GET /radar/dns/timeseries_groups/response_code` | Get DNS queries by response code time series |
| `client.api.radarDns.radarGetDnsTimeseriesGroupByResponseTtl` | `GET /radar/dns/timeseries_groups/response_ttl` | Get DNS queries by response TTL time series |
| `client.api.radarDns.radarGetDnsTimeseriesGroup` | `GET /radar/dns/timeseries_groups/{dimension}` | Get DNS time series grouped by dimension |
| `client.api.radarDns.radarGetDnsTopAses` | `GET /radar/dns/top/ases` | Get top ASes by DNS queries |
| `client.api.radarDns.radarGetDnsTopLocations` | `GET /radar/dns/top/locations` | Get top locations by DNS queries |

## radarEmailRouting

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarEmailRouting.radarGetEmailRoutingSummaryByArc` | `GET /radar/email/routing/summary/arc` | Get email ARC validation summary |
| `client.api.radarEmailRouting.radarGetEmailRoutingSummaryByDkim` | `GET /radar/email/routing/summary/dkim` | Get email DKIM validation summary |
| `client.api.radarEmailRouting.radarGetEmailRoutingSummaryByDmarc` | `GET /radar/email/routing/summary/dmarc` | Get email DMARC validation summary |
| `client.api.radarEmailRouting.radarGetEmailRoutingSummaryByEncrypted` | `GET /radar/email/routing/summary/encrypted` | Get email encryption status summary |
| `client.api.radarEmailRouting.radarGetEmailRoutingSummaryByIpVersion` | `GET /radar/email/routing/summary/ip_version` | Get email IP version summary |
| `client.api.radarEmailRouting.radarGetEmailRoutingSummaryBySpf` | `GET /radar/email/routing/summary/spf` | Get email SPF validation summary |
| `client.api.radarEmailRouting.radarGetEmailRoutingSummary` | `GET /radar/email/routing/summary/{dimension}` | Get email routing summary by dimension |
| `client.api.radarEmailRouting.radarGetEmailRoutingTimeseriesGroupByArc` | `GET /radar/email/routing/timeseries_groups/arc` | Get email ARC validation time series |
| `client.api.radarEmailRouting.radarGetEmailRoutingTimeseriesGroupByDkim` | `GET /radar/email/routing/timeseries_groups/dkim` | Get email DKIM validation time series |
| `client.api.radarEmailRouting.radarGetEmailRoutingTimeseriesGroupByDmarc` | `GET /radar/email/routing/timeseries_groups/dmarc` | Get email DMARC validation time series |
| `client.api.radarEmailRouting.radarGetEmailRoutingTimeseriesGroupByEncrypted` | `GET /radar/email/routing/timeseries_groups/encrypted` | Get email encryption status time series |
| `client.api.radarEmailRouting.radarGetEmailRoutingTimeseriesGroupByIpVersion` | `GET /radar/email/routing/timeseries_groups/ip_version` | Get email IP version time series |
| `client.api.radarEmailRouting.radarGetEmailRoutingTimeseriesGroupBySpf` | `GET /radar/email/routing/timeseries_groups/spf` | Get email SPF validation time series |
| `client.api.radarEmailRouting.radarGetEmailRoutingTimeseriesGroup` | `GET /radar/email/routing/timeseries_groups/{dimension}` | Get email routing time series grouped by dimension |

## radarEmailSecurity

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarEmailSecurity.radarGetEmailSecuritySummaryByArc` | `GET /radar/email/security/summary/arc` | Get email ARC validation summary |
| `client.api.radarEmailSecurity.radarGetEmailSecuritySummaryByDkim` | `GET /radar/email/security/summary/dkim` | Get email DKIM validation summary |
| `client.api.radarEmailSecurity.radarGetEmailSecuritySummaryByDmarc` | `GET /radar/email/security/summary/dmarc` | Get email DMARC validation summary |
| `client.api.radarEmailSecurity.radarGetEmailSecuritySummaryByMalicious` | `GET /radar/email/security/summary/malicious` | Get email malicious classification summary |
| `client.api.radarEmailSecurity.radarGetEmailSecuritySummaryBySpam` | `GET /radar/email/security/summary/spam` | Get email spam classification summary |
| `client.api.radarEmailSecurity.radarGetEmailSecuritySummaryBySpf` | `GET /radar/email/security/summary/spf` | Get email SPF validation summary |
| `client.api.radarEmailSecurity.radarGetEmailSecuritySummaryBySpoof` | `GET /radar/email/security/summary/spoof` | Get email spoof classification summary |
| `client.api.radarEmailSecurity.radarGetEmailSecuritySummaryByThreatCategory` | `GET /radar/email/security/summary/threat_category` | Get email threat category summary |
| `client.api.radarEmailSecurity.radarGetEmailSecuritySummaryByTlsVersion` | `GET /radar/email/security/summary/tls_version` | Get email TLS version summary |
| `client.api.radarEmailSecurity.radarGetEmailSecuritySummary` | `GET /radar/email/security/summary/{dimension}` | Get email security summary by dimension |
| `client.api.radarEmailSecurity.radarGetEmailSecurityTimeseriesGroupByArc` | `GET /radar/email/security/timeseries_groups/arc` | Get email ARC validation time series |
| `client.api.radarEmailSecurity.radarGetEmailSecurityTimeseriesGroupByDkim` | `GET /radar/email/security/timeseries_groups/dkim` | Get email DKIM validation time series |
| `client.api.radarEmailSecurity.radarGetEmailSecurityTimeseriesGroupByDmarc` | `GET /radar/email/security/timeseries_groups/dmarc` | Get email DMARC validation time series |
| `client.api.radarEmailSecurity.radarGetEmailSecurityTimeseriesGroupByMalicious` | `GET /radar/email/security/timeseries_groups/malicious` | Get email malicious classification time series |
| `client.api.radarEmailSecurity.radarGetEmailSecurityTimeseriesGroupBySpam` | `GET /radar/email/security/timeseries_groups/spam` | Get email spam classification time series |
| `client.api.radarEmailSecurity.radarGetEmailSecurityTimeseriesGroupBySpf` | `GET /radar/email/security/timeseries_groups/spf` | Get email SPF validation time series |
| `client.api.radarEmailSecurity.radarGetEmailSecurityTimeseriesGroupBySpoof` | `GET /radar/email/security/timeseries_groups/spoof` | Get email spoof classification time series |
| `client.api.radarEmailSecurity.radarGetEmailSecurityTimeseriesGroupByThreatCategory` | `GET /radar/email/security/timeseries_groups/threat_category` | Get email threat category time series |
| `client.api.radarEmailSecurity.radarGetEmailSecurityTimeseriesGroupByTlsVersion` | `GET /radar/email/security/timeseries_groups/tls_version` | Get email TLS version time series |
| `client.api.radarEmailSecurity.radarGetEmailSecurityTimeseriesGroup` | `GET /radar/email/security/timeseries_groups/{dimension}` | Get email security time series grouped by dimension |
| `client.api.radarEmailSecurity.radarGetEmailSecurityTopTldsByMessages` | `GET /radar/email/security/top/tlds` | Get top TLDs by email message volume |
| `client.api.radarEmailSecurity.radarGetEmailSecurityTopTldsByMalicious` | `GET /radar/email/security/top/tlds/malicious/{malicious}` | Get top TLDs by email malicious classification |
| `client.api.radarEmailSecurity.radarGetEmailSecurityTopTldsBySpam` | `GET /radar/email/security/top/tlds/spam/{spam}` | Get top TLDs by email spam classification |
| `client.api.radarEmailSecurity.radarGetEmailSecurityTopTldsBySpoof` | `GET /radar/email/security/top/tlds/spoof/{spoof}` | Get top TLDs by email spoof classification |

## radarAutonomousSystems

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarAutonomousSystems.radarGetEntitiesAsnList` | `GET /radar/entities/asns` | List autonomous systems |
| `client.api.radarAutonomousSystems.radarGetAsBotnetThreatFeed` | `GET /radar/entities/asns/botnet_threat_feed` | Get AS rankings by botnet threat feed activity |
| `client.api.radarAutonomousSystems.radarGetEntitiesAsnByIp` | `GET /radar/entities/asns/ip` | Get AS details by IP address |
| `client.api.radarAutonomousSystems.radarGetEntitiesAsnById` | `GET /radar/entities/asns/{asn}` | Get AS details by ASN |
| `client.api.radarAutonomousSystems.radarGetAsnsAsSet` | `GET /radar/entities/asns/{asn}/as_set` | Get IRR AS-SETs that an AS is a member of |
| `client.api.radarAutonomousSystems.radarGetAsnsRel` | `GET /radar/entities/asns/{asn}/rel` | Get AS-level relationships by ASN |

## radarIp

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarIp.radarGetEntitiesIp` | `GET /radar/entities/ip` | Get IP address details |

## radarLocations

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarLocations.radarGetEntitiesLocations` | `GET /radar/entities/locations` | List locations |
| `client.api.radarLocations.radarGetEntitiesLocationByAlpha2` | `GET /radar/entities/locations/{location}` | Get location details |

## radarGeolocations

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarGeolocations.radarGetGeolocations` | `GET /radar/geolocations` | List Geolocations |
| `client.api.radarGeolocations.radarGetGeolocationDetails` | `GET /radar/geolocations/{geoId}` | Get Geolocation details |

## radarHttp

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarHttp.radarGetHttpSummaryByBotClass` | `GET /radar/http/summary/bot_class` | Get HTTP requests by bot class summary |
| `client.api.radarHttp.radarGetHttpSummaryByDeviceType` | `GET /radar/http/summary/device_type` | Get HTTP requests by device type summary |
| `client.api.radarHttp.radarGetHttpSummaryByHttpProtocol` | `GET /radar/http/summary/http_protocol` | Get HTTP requests by HTTP/HTTPS summary |
| `client.api.radarHttp.radarGetHttpSummaryByHttpVersion` | `GET /radar/http/summary/http_version` | Get HTTP requests by HTTP version summary |
| `client.api.radarHttp.radarGetHttpSummaryByIpVersion` | `GET /radar/http/summary/ip_version` | Get HTTP requests by IP version summary |
| `client.api.radarHttp.radarGetHttpSummaryByOperatingSystem` | `GET /radar/http/summary/os` | Get HTTP requests by OS summary |
| `client.api.radarHttp.radarGetHttpSummaryByPostQuantum` | `GET /radar/http/summary/post_quantum` | Get HTTP requests by post-quantum support summary |
| `client.api.radarHttp.radarGetHttpSummaryByTlsVersion` | `GET /radar/http/summary/tls_version` | Get HTTP requests by TLS version summary |
| `client.api.radarHttp.radarGetHttpSummary` | `GET /radar/http/summary/{dimension}` | Get HTTP requests summary by dimension |
| `client.api.radarHttp.radarGetHttpTimeseries` | `GET /radar/http/timeseries` | Get HTTP requests time series |
| `client.api.radarHttp.radarGetHttpTimeseriesGroupByBotClass` | `GET /radar/http/timeseries_groups/bot_class` | Get HTTP requests by bot class time series |
| `client.api.radarHttp.radarGetHttpTimeseriesGroupByBrowsers` | `GET /radar/http/timeseries_groups/browser` | Get HTTP requests by user agent time series |
| `client.api.radarHttp.radarGetHttpTimeseriesGroupByBrowserFamilies` | `GET /radar/http/timeseries_groups/browser_family` | Get HTTP requests by user agent family time series |
| `client.api.radarHttp.radarGetHttpTimeseriesGroupByDeviceType` | `GET /radar/http/timeseries_groups/device_type` | Get HTTP requests by device type time series |
| `client.api.radarHttp.radarGetHttpTimeseriesGroupByHttpProtocol` | `GET /radar/http/timeseries_groups/http_protocol` | Get HTTP requests by HTTP/HTTPS time series |
| `client.api.radarHttp.radarGetHttpTimeseriesGroupByHttpVersion` | `GET /radar/http/timeseries_groups/http_version` | Get HTTP requests by HTTP version time series |
| `client.api.radarHttp.radarGetHttpTimeseriesGroupByIpVersion` | `GET /radar/http/timeseries_groups/ip_version` | Get HTTP requests by IP version time series |
| `client.api.radarHttp.radarGetHttpTimeseriesGroupByOperatingSystem` | `GET /radar/http/timeseries_groups/os` | Get HTTP requests by OS time series |
| `client.api.radarHttp.radarGetHttpTimeseriesGroupByPostQuantum` | `GET /radar/http/timeseries_groups/post_quantum` | Get HTTP requests by post-quantum support time series |
| `client.api.radarHttp.radarGetHttpTimeseriesGroupByTlsVersion` | `GET /radar/http/timeseries_groups/tls_version` | Get HTTP requests by TLS version time series |
| `client.api.radarHttp.radarGetHttpTimeseriesGroup` | `GET /radar/http/timeseries_groups/{dimension}` | Get HTTP requests time series grouped by dimension |
| `client.api.radarHttp.radarGetHttpTopAsesByHttpRequests` | `GET /radar/http/top/ases` | Get top ASes by HTTP requests |
| `client.api.radarHttp.radarGetHttpTopAsesByOperatingSystem` | `GET /radar/http/top/ases/os/{os}` | Get top ASes by HTTP requests for an OS |
| `client.api.radarHttp.radarGetHttpTopBrowsers` | `GET /radar/http/top/browser` | Get top user agents by HTTP requests |
| `client.api.radarHttp.radarGetHttpTopBrowserFamilies` | `GET /radar/http/top/browser_family` | Get top user agent families by HTTP requests |
| `client.api.radarHttp.radarGetHttpTopLocationsByHttpRequests` | `GET /radar/http/top/locations` | Get top locations by HTTP requests |
| `client.api.radarHttp.radarGetHttpTopLocationsByOperatingSystem` | `GET /radar/http/top/locations/os/{os}` | Get top locations by HTTP requests for an OS |
| `client.api.radarHttp.radarGetHttpTopAsesByBotClass` | `GET /radar/http/top/ases/bot_class/{botClass}` | Get top ASes by HTTP requests for a bot class |
| `client.api.radarHttp.radarGetHttpTopAsesByBrowserFamily` | `GET /radar/http/top/ases/browser_family/{browserFamily}` | Get top ASes by HTTP requests for a browser family |
| `client.api.radarHttp.radarGetHttpTopAsesByDeviceType` | `GET /radar/http/top/ases/device_type/{deviceType}` | Get top ASes by HTTP requests for a device type |
| `client.api.radarHttp.radarGetHttpTopAsesByHttpProtocol` | `GET /radar/http/top/ases/http_protocol/{httpProtocol}` | Get top ASes by HTTP requests for an HTTP protocol |
| `client.api.radarHttp.radarGetHttpTopAsesByHttpVersion` | `GET /radar/http/top/ases/http_version/{httpVersion}` | Get top ASes by HTTP requests for an HTTP version |
| `client.api.radarHttp.radarGetHttpTopAsesByIpVersion` | `GET /radar/http/top/ases/ip_version/{ipVersion}` | Get top ASes by HTTP requests for an IP version |
| `client.api.radarHttp.radarGetHttpTopAsesByTlsVersion` | `GET /radar/http/top/ases/tls_version/{tlsVersion}` | Get top ASes by HTTP requests for a TLS version |
| `client.api.radarHttp.radarGetHttpTopLocationsByBotClass` | `GET /radar/http/top/locations/bot_class/{botClass}` | Get top locations by HTTP requests for a bot class |
| `client.api.radarHttp.radarGetHttpTopLocationsByBrowserFamily` | `GET /radar/http/top/locations/browser_family/{browserFamily}` | Get top locations by HTTP requests for a browser family |
| `client.api.radarHttp.radarGetHttpTopLocationsByDeviceType` | `GET /radar/http/top/locations/device_type/{deviceType}` | Get top locations by HTTP requests for a device type |
| `client.api.radarHttp.radarGetHttpTopLocationsByHttpProtocol` | `GET /radar/http/top/locations/http_protocol/{httpProtocol}` | Get top locations by HTTP requests for an HTTP protocol |
| `client.api.radarHttp.radarGetHttpTopLocationsByHttpVersion` | `GET /radar/http/top/locations/http_version/{httpVersion}` | Get top locations by HTTP requests for an HTTP version |
| `client.api.radarHttp.radarGetHttpTopLocationsByIpVersion` | `GET /radar/http/top/locations/ip_version/{ipVersion}` | Get top locations by HTTP requests for an IP version |
| `client.api.radarHttp.radarGetHttpTopLocationsByTlsVersion` | `GET /radar/http/top/locations/tls_version/{tlsVersion}` | Get top locations by HTTP requests for a TLS version |

## radarLeakedCredentialChecks

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarLeakedCredentialChecks.radarGetLeakedCredentialChecksSummaryByBotClass` | `GET /radar/leaked_credential_checks/summary/bot_class` | Get HTTP authentication requests by bot class summary |
| `client.api.radarLeakedCredentialChecks.radarGetLeakedCredentialChecksSummaryByCompromised` | `GET /radar/leaked_credential_checks/summary/compromised` | Get HTTP authentication requests by compromised credential status summary |
| `client.api.radarLeakedCredentialChecks.radarGetLeakedCredentialChecksSummary` | `GET /radar/leaked_credential_checks/summary/{dimension}` | Get HTTP authentication requests distribution by dimension |
| `client.api.radarLeakedCredentialChecks.radarGetLeakedCredentialChecksTimeseriesGroupByBotClass` | `GET /radar/leaked_credential_checks/timeseries_groups/bot_class` | Get HTTP authentication requests by bot class time series |
| `client.api.radarLeakedCredentialChecks.radarGetLeakedCredentialChecksTimeseriesGroupByCompromised` | `GET /radar/leaked_credential_checks/timeseries_groups/compromised` | Get HTTP authentication requests by compromised credential status time series |
| `client.api.radarLeakedCredentialChecks.radarGetLeakedCredentialChecksTimeseriesGroup` | `GET /radar/leaked_credential_checks/timeseries_groups/{dimension}` | Get time series distribution of HTTP authentication requests by dimension. |

## radarNetflows

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarNetflows.radarGetNetflowsSummaryDeprecated` | `GET /radar/netflows/summary` | Get network traffic summary |
| `client.api.radarNetflows.radarGetNetflowsSummary` | `GET /radar/netflows/summary/{dimension}` | Get network traffic distribution by dimension |
| `client.api.radarNetflows.radarGetNetflowsTimeseries` | `GET /radar/netflows/timeseries` | Get network traffic time series |
| `client.api.radarNetflows.radarGetNetflowsTimeseriesGroup` | `GET /radar/netflows/timeseries_groups/{dimension}` | Get time series distribution of network traffic by dimension |
| `client.api.radarNetflows.radarGetNetflowsTopAses` | `GET /radar/netflows/top/ases` | Get top ASes by network traffic |
| `client.api.radarNetflows.radarGetNetflowsTopLocations` | `GET /radar/netflows/top/locations` | Get top locations by network traffic |

## radarOrigins

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarOrigins.radarGetOrigins` | `GET /radar/origins` | List Origins |
| `client.api.radarOrigins.radarGetOriginsSummary` | `GET /radar/origins/summary/{dimension}` | Get origin metrics distribution by dimension |
| `client.api.radarOrigins.radarGetOriginsTimeseries` | `GET /radar/origins/timeseries` | Get origin metrics time series |
| `client.api.radarOrigins.radarGetOriginsTimeseriesGroup` | `GET /radar/origins/timeseries_groups/{dimension}` | Get origin metrics time series grouped by dimension |
| `client.api.radarOrigins.radarGetOriginDetails` | `GET /radar/origins/{slug}` | Get Origin details |

## radarPostQuantum

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarPostQuantum.radarGetOriginPostQuantumSummary` | `GET /radar/post_quantum/origin/summary/{dimension}` | Get Origin Post-Quantum Data Summary |
| `client.api.radarPostQuantum.radarGetOriginPostQuantumTimeseriesGroups` | `GET /radar/post_quantum/origin/timeseries_groups/{dimension}` | Get Origin Post-Quantum Data Over Time |
| `client.api.radarPostQuantum.radarGetPostQuantumTlsSupport` | `GET /radar/post_quantum/tls/support` | Check Post-Quantum TLS support |

## radarQuality

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarQuality.radarGetQualityIndexSummary` | `GET /radar/quality/iqi/summary` | Get Internet Quality Index (IQI) summary |
| `client.api.radarQuality.radarGetQualityIndexTimeseriesGroup` | `GET /radar/quality/iqi/timeseries_groups` | Get Internet Quality Index (IQI) time series |
| `client.api.radarQuality.radarGetQualitySpeedHistogram` | `GET /radar/quality/speed/histogram` | Get speed tests histogram |
| `client.api.radarQuality.radarGetQualitySpeedSummary` | `GET /radar/quality/speed/summary` | Get speed tests summary |
| `client.api.radarQuality.radarGetQualitySpeedTopAses` | `GET /radar/quality/speed/top/ases` | Get top ASes by speed test results |
| `client.api.radarQuality.radarGetQualitySpeedTopLocations` | `GET /radar/quality/speed/top/locations` | Get top locations by speed test results |

## radarDomainsRanking

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarDomainsRanking.radarGetRankingDomainDetails` | `GET /radar/ranking/domain/{domain}` | Get domain rank details |
| `client.api.radarDomainsRanking.radarGetRankingDomainTimeseries` | `GET /radar/ranking/timeseries_groups` | Get domains rank time series |
| `client.api.radarDomainsRanking.radarGetRankingTopDomains` | `GET /radar/ranking/top` | Get top or trending domains |

## radarInternetServicesRanking

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarInternetServicesRanking.radarGetRankingInternetServicesCategories` | `GET /radar/ranking/internet_services/categories` | List Internet services categories |
| `client.api.radarInternetServicesRanking.radarGetRankingInternetServicesTimeseries` | `GET /radar/ranking/internet_services/timeseries_groups` | Get Internet services rank time series |
| `client.api.radarInternetServicesRanking.radarGetRankingTopInternetServices` | `GET /radar/ranking/internet_services/top` | Get top Internet services |

## radarRobotsTxt

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarRobotsTxt.radarGetRobotsTxtTopDomainCategoriesByFilesParsed` | `GET /radar/robots_txt/top/domain_categories` | Get top domain categories by robots.txt files parsed |
| `client.api.radarRobotsTxt.radarGetRobotsTxtTopUserAgentsByDirective` | `GET /radar/robots_txt/top/user_agents/directive` | Get top user agents on robots.txt files |

## radarSearch

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarSearch.radarGetSearchGlobal` | `GET /radar/search/global` | Search for locations, ASes, reports, and more |

## radarTcpResetsAndTimeouts

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarTcpResetsAndTimeouts.radarGetTcpResetsTimeoutsSummary` | `GET /radar/tcp_resets_timeouts/summary` | Get TCP resets and timeouts summary |
| `client.api.radarTcpResetsAndTimeouts.radarGetTcpResetsTimeoutsTimeseriesGroup` | `GET /radar/tcp_resets_timeouts/timeseries_groups` | Get TCP resets and timeouts time series |

## radarTopLevelDomains

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarTopLevelDomains.radarGetTlds` | `GET /radar/tlds` | List TLDs |
| `client.api.radarTopLevelDomains.radarGetTldsPerformanceSummary` | `GET /radar/tlds/performance/summary/{dimension}` | Get TLD Performance Summary |
| `client.api.radarTopLevelDomains.radarGetTldsPerformanceTimeseriesGroups` | `GET /radar/tlds/performance/timeseries_groups/{dimension}` | Get TLD Performance Over Time |
| `client.api.radarTopLevelDomains.radarGetTldDetails` | `GET /radar/tlds/{tld}` | Get TLD details |

## radarTrafficAnomalies

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarTrafficAnomalies.radarGetTrafficAnomalies` | `GET /radar/traffic_anomalies` | Get latest Internet traffic anomalies |
| `client.api.radarTrafficAnomalies.radarGetTrafficAnomaliesTop` | `GET /radar/traffic_anomalies/locations` | Get top locations by total traffic anomalies |
| `client.api.radarTrafficAnomalies.radarGetTrafficAnomalyByUuid` | `GET /radar/traffic_anomalies/{uuid}` | Get traffic anomaly by UUID |

## radarVerifiedBots

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.radarVerifiedBots.radarGetVerifiedBotsTopByHttpRequests` | `GET /radar/verified_bots/top/bots` | Get top verified bots by HTTP requests |
| `client.api.radarVerifiedBots.radarGetVerifiedBotsTopCategoriesByHttpRequests` | `GET /radar/verified_bots/top/categories` | Get top verified bot categories by HTTP requests |

## logoMatch

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.logoMatch.getSignedUrl` | `GET /signed-url` | Internal route for testing signed URLs |
| `client.api.logoMatch.getAccountsAccountIdBrandProtectionLogoMatches` | `GET /accounts/{accountId}/brand-protection/logo-matches` | Read matches for logo queries by ID |
| `client.api.logoMatch.getAccountsAccountIdBrandProtectionLogoMatchesDownload` | `GET /accounts/{accountId}/brand-protection/logo-matches/download` | Download matches for logo queries by ID |
| `client.api.logoMatch.getAccountsAccountIdBrandProtectionLogos` | `GET /accounts/{accountId}/brand-protection/logos` | Read all saved logo queries |
| `client.api.logoMatch.postAccountsAccountIdBrandProtectionLogos` | `POST /accounts/{accountId}/brand-protection/logos` | Create new saved logo queries from image files |
| `client.api.logoMatch.deleteAccountsAccountIdBrandProtectionLogosLogoId` | `DELETE /accounts/{accountId}/brand-protection/logos/{logoId}` | Delete saved logo queries by ID |
| `client.api.logoMatch.getAccountsAccountIdBrandProtectionLogosLogoId` | `GET /accounts/{accountId}/brand-protection/logos/{logoId}` | Read saved logo queries by ID |
| `client.api.logoMatch.postAccountsAccountIdBrandProtectionScanLogo` | `POST /accounts/{accountId}/brand-protection/scan-logo` | Create new logo queries from image files |
| `client.api.logoMatch.postAccountsAccountIdBrandProtectionScanPage` | `POST /accounts/{accountId}/brand-protection/scan-page` | Create new logo queries from URLs |

## user

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.user.userUserDetails` | `GET /user` | User Details |
| `client.api.user.userEditUser` | `PATCH /user` | Edit User |
| `client.api.user.userListUserTenants` | `GET /user/tenants` | List user tenants |

## userAnalyticsDeprecated

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.userAnalyticsDeprecated.userAnalyticsGetDashboard` | `GET /user/analytics/dashboard` | Get user analytics dashboard |

## argoSmartRouting

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.argoSmartRouting.argoSmartRoutingGetCountZonesEnabledForUser` | `GET /user/argo/count_zones_enabled` | Get count of zones with Argo Smart Routing enabled for user |
| `client.api.argoSmartRouting.argoSmartRoutingGetCountZonesEnabledForAccount` | `GET /accounts/{accountId}/argo/count_zones_enabled` | Get count of zones with Argo Smart Routing enabled for account |
| `client.api.argoSmartRouting.argoSmartRoutingGetArgoSmartRoutingSetting` | `GET /zones/{zoneId}/argo/smart_routing` | Get Argo Smart Routing setting |
| `client.api.argoSmartRouting.argoSmartRoutingPatchArgoSmartRoutingSetting` | `PATCH /zones/{zoneId}/argo/smart_routing` | Patch Argo Smart Routing setting |

## auditLogs

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.auditLogs.auditLogsGetUserAuditLogs` | `GET /user/audit_logs` | Get user audit logs |
| `client.api.auditLogs.auditLogsGetAccountAuditLogs` | `GET /accounts/{accountId}/audit_logs` | Get account audit logs |
| `client.api.auditLogs.auditLogsV2GetAccountAuditLogs` | `GET /accounts/{accountId}/logs/audit` | Get account audit logs (Version 2) |
| `client.api.auditLogs.auditLogsV2ListAccountProductCategories` | `GET /accounts/{accountId}/logs/audit/product_categories` | List account audit log product categories (Version 2) |
| `client.api.auditLogs.auditLogsV2GetAccountAuditLogHistory` | `GET /accounts/{accountId}/logs/audit/{id}/history` | Get resource change history from an account audit log entry (Version 2) |
| `client.api.auditLogs.auditLogsV2GetOrganizationAuditLogs` | `GET /organizations/{organizationId}/logs/audit` | Get organization audit logs (Version 2) |
| `client.api.auditLogs.auditLogsV2GetOrganizationAuditLogHistory` | `GET /organizations/{organizationId}/logs/audit/{id}/history` | Get resource change history from an organization audit log entry (Version 2) |

## userBillingHistory

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.userBillingHistory.userBillingHistoryDeprecatedBillingHistoryDetails` | `GET /user/billing/history` | Billing History Details |

## userBillingProfile

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.userBillingProfile.userBillingProfileDeprecatedBillingProfileDetails` | `GET /user/billing/profile` | Billing Profile Details |

## communicationPreferences

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.communicationPreferences.userCommunicationPreferencesGet` | `GET /user/communication_preferences` | Get communication preferences |
| `client.api.communicationPreferences.userCommunicationPreferencesUpdate` | `PUT /user/communication_preferences` | Update communication preferences |

## ipAccessRulesForAUser

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ipAccessRulesForAUser.ipAccessRulesForAUserListIpAccessRules` | `GET /user/firewall/access_rules/rules` | List IP Access rules |
| `client.api.ipAccessRulesForAUser.ipAccessRulesForAUserCreateAnIpAccessRule` | `POST /user/firewall/access_rules/rules` | Create an IP Access rule |
| `client.api.ipAccessRulesForAUser.ipAccessRulesForAUserDeleteAnIpAccessRule` | `DELETE /user/firewall/access_rules/rules/{ruleId}` | Delete an IP Access rule |
| `client.api.ipAccessRulesForAUser.ipAccessRulesForAUserGetAnIpAccessRule` | `GET /user/firewall/access_rules/rules/{ruleId}` | Get an IP Access rule |
| `client.api.ipAccessRulesForAUser.ipAccessRulesForAUserUpdateAnIpAccessRule` | `PATCH /user/firewall/access_rules/rules/{ruleId}` | Update an IP Access rule |

## usersInvites

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.usersInvites.userSInvitesListInvitations` | `GET /user/invites` | List Invitations |
| `client.api.usersInvites.userSInvitesInvitationDetails` | `GET /user/invites/{inviteId}` | Invitation Details |
| `client.api.usersInvites.userSInvitesRespondToInvitation` | `PATCH /user/invites/{inviteId}` | Respond to Invitation |

## loadBalancerMonitors

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.loadBalancerMonitors.loadBalancerMonitorsListMonitors` | `GET /user/load_balancers/monitors` | List Monitors |
| `client.api.loadBalancerMonitors.loadBalancerMonitorsCreateMonitor` | `POST /user/load_balancers/monitors` | Create Monitor |
| `client.api.loadBalancerMonitors.loadBalancerMonitorsDeleteMonitor` | `DELETE /user/load_balancers/monitors/{monitorId}` | Delete Monitor |
| `client.api.loadBalancerMonitors.loadBalancerMonitorsMonitorDetails` | `GET /user/load_balancers/monitors/{monitorId}` | Monitor Details |
| `client.api.loadBalancerMonitors.loadBalancerMonitorsPatchMonitor` | `PATCH /user/load_balancers/monitors/{monitorId}` | Patch Monitor |
| `client.api.loadBalancerMonitors.loadBalancerMonitorsUpdateMonitor` | `PUT /user/load_balancers/monitors/{monitorId}` | Update Monitor |
| `client.api.loadBalancerMonitors.loadBalancerMonitorsPreviewMonitor` | `POST /user/load_balancers/monitors/{monitorId}/preview` | Preview Monitor |
| `client.api.loadBalancerMonitors.loadBalancerMonitorsListMonitorReferences` | `GET /user/load_balancers/monitors/{monitorId}/references` | List Monitor References |
| `client.api.loadBalancerMonitors.loadBalancerMonitorsPreviewResult` | `GET /user/load_balancers/preview/{previewId}` | Preview Result |

## loadBalancerPools

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.loadBalancerPools.loadBalancerPoolsListPools` | `GET /user/load_balancers/pools` | List Pools |
| `client.api.loadBalancerPools.loadBalancerPoolsPatchPools` | `PATCH /user/load_balancers/pools` | Patch Pools |
| `client.api.loadBalancerPools.loadBalancerPoolsCreatePool` | `POST /user/load_balancers/pools` | Create Pool |
| `client.api.loadBalancerPools.loadBalancerPoolsDeletePool` | `DELETE /user/load_balancers/pools/{poolId}` | Delete Pool |
| `client.api.loadBalancerPools.loadBalancerPoolsPoolDetails` | `GET /user/load_balancers/pools/{poolId}` | Pool Details |
| `client.api.loadBalancerPools.loadBalancerPoolsPatchPool` | `PATCH /user/load_balancers/pools/{poolId}` | Patch Pool |
| `client.api.loadBalancerPools.loadBalancerPoolsUpdatePool` | `PUT /user/load_balancers/pools/{poolId}` | Update Pool |
| `client.api.loadBalancerPools.loadBalancerPoolsPoolHealthDetails` | `GET /user/load_balancers/pools/{poolId}/health` | Pool Health Details |
| `client.api.loadBalancerPools.loadBalancerPoolsPreviewPool` | `POST /user/load_balancers/pools/{poolId}/preview` | Preview Pool |
| `client.api.loadBalancerPools.loadBalancerPoolsListPoolReferences` | `GET /user/load_balancers/pools/{poolId}/references` | List Pool References |

## loadBalancerRegions

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.loadBalancerRegions.userLoadBalancerRegionsListRegions` | `GET /user/load_balancers/regions` | List Regions |
| `client.api.loadBalancerRegions.loadBalancerRegionsListRegions` | `GET /accounts/{accountId}/load_balancers/regions` | List Regions |
| `client.api.loadBalancerRegions.loadBalancerRegionsGetRegion` | `GET /accounts/{accountId}/load_balancers/regions/{regionId}` | Get Region |

## loadBalancerHealthcheckEvents

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.loadBalancerHealthcheckEvents.loadBalancerHealthcheckEventsListHealthcheckEvents` | `GET /user/load_balancing_analytics/events` | List Healthcheck Events |

## usersOrganizations

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.usersOrganizations.userSOrganizationsListOrganizations` | `GET /user/organizations` | List Organizations |
| `client.api.usersOrganizations.userSOrganizationsLeaveOrganization` | `DELETE /user/organizations/{organizationId}` | Leave Organization |
| `client.api.usersOrganizations.userSOrganizationsOrganizationDetails` | `GET /user/organizations/{organizationId}` | Organization Details |

## spectrumAnalytics

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.spectrumAnalytics.spectrumAnalyticsGetZonesReport` | `GET /user/spectrum_analytics/zones/report` | Get zones bandwidth report |
| `client.api.spectrumAnalytics.spectrumAggregateAnalyticsGetCurrentAggregatedAnalytics` | `GET /zones/{zoneId}/spectrum/analytics/aggregate/current` | Get current aggregated analytics |
| `client.api.spectrumAnalytics.spectrumAnalyticsByTimeGetAnalyticsByTime` | `GET /zones/{zoneId}/spectrum/analytics/events/bytime` | Get analytics by time |
| `client.api.spectrumAnalytics.spectrumAnalyticsSummaryGetAnalyticsSummary` | `GET /zones/{zoneId}/spectrum/analytics/events/summary` | Get analytics summary |

## userSubscription

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.userSubscription.userSubscriptionGetUserSubscriptions` | `GET /user/subscriptions` | Get User Subscriptions |
| `client.api.userSubscription.userSubscriptionCreateUserSubscription` | `POST /user/subscriptions` | Create User Subscription |
| `client.api.userSubscription.userSubscriptionDeleteUserSubscription` | `DELETE /user/subscriptions/{identifier}` | Delete User Subscription |
| `client.api.userSubscription.userSubscriptionUpdateUserSubscription` | `PUT /user/subscriptions/{identifier}` | Update User Subscription |

## userApiTokens

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.userApiTokens.userApiTokensListTokens` | `GET /user/tokens` | List Tokens |
| `client.api.userApiTokens.userApiTokensCreateToken` | `POST /user/tokens` | Create Token |
| `client.api.userApiTokens.permissionGroupsListPermissionGroups` | `GET /user/tokens/permission_groups` | List Token Permission Groups |
| `client.api.userApiTokens.userApiTokensVerifyToken` | `GET /user/tokens/verify` | Verify Token |
| `client.api.userApiTokens.userApiTokensDeleteToken` | `DELETE /user/tokens/{tokenId}` | Delete Token |
| `client.api.userApiTokens.userApiTokensTokenDetails` | `GET /user/tokens/{tokenId}` | Token Details |
| `client.api.userApiTokens.userApiTokensUpdateToken` | `PUT /user/tokens/{tokenId}` | Update Token |
| `client.api.userApiTokens.userApiTokensRollToken` | `PUT /user/tokens/{tokenId}/value` | Roll Token |

## api

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.api.postVerify` | `POST /v1/verify` | Request domain connect validation |
| `client.api.api.getProviderTemplate` | `GET /v2/domainTemplates/providers/{provider}/services/{service}` | Serve a provider template |
| `client.api.api.getProviderConfiguration` | `GET /v2/provconf/{provider}/{service}/{account}` | Serve a provider configuration |
| `client.api.api.getDomainSettings` | `GET /v2/{domain}/settings` | Provide settings if domain is served by Cloudflare |

## zone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zone.zonesGet` | `GET /zones` | List Zones |
| `client.api.zone.zonesPost` | `POST /zones` | Create Zone |
| `client.api.zone.zones0Delete` | `DELETE /zones/{zoneId}` | Delete Zone |
| `client.api.zone.zones0Get` | `GET /zones/{zoneId}` | Zone Details |
| `client.api.zone.zones0Patch` | `PATCH /zones/{zoneId}` | Edit Zone |
| `client.api.zone.putZonesZoneIdActivationCheck` | `PUT /zones/{zoneId}/activation_check` | Rerun the Activation Check |
| `client.api.zone.zoneEnvironmentInvalidate` | `POST /zones/{zoneId}/environments/{environmentId}/invalidate_cache` | Invalidate Cached Content by Environment |
| `client.api.zone.zoneEnvironmentPurge` | `POST /zones/{zoneId}/environments/{environmentId}/purge_cache` | Purge Cached Content by Environment |
| `client.api.zone.zoneInvalidate` | `POST /zones/{zoneId}/invalidate_cache` | Invalidate Cached Content |
| `client.api.zone.zonePurge` | `POST /zones/{zoneId}/purge_cache` | Purge Cached Content |

## tsengAbuseComplaintProcessorOther

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.tsengAbuseComplaintProcessorOther.listAbuseReports` | `GET /accounts/{accountId}/abuse-reports` | List abuse reports against the account |
| `client.api.tsengAbuseComplaintProcessorOther.listSubmittedAbuseReports` | `GET /accounts/{accountId}/abuse-reports/submitted` | List submitted abuse reports |
| `client.api.tsengAbuseComplaintProcessorOther.getSubmittedAbuseReport` | `GET /accounts/{accountId}/abuse-reports/submitted/{reportId}` | Get a submitted abuse report |
| `client.api.tsengAbuseComplaintProcessorOther.listSubmittedAbuseReportEmails` | `GET /accounts/{accountId}/abuse-reports/submitted/{reportId}/emails` | List emails sent to an abuse report submitter |
| `client.api.tsengAbuseComplaintProcessorOther.checkAppealEligibility` | `GET /accounts/{accountId}/abuse-reports/{reportId}/appeals/eligibility` | Check whether a report can be appealed |
| `client.api.tsengAbuseComplaintProcessorOther.listEmails` | `GET /accounts/{accountId}/abuse-reports/{reportId}/emails` | List abuse report emails |
| `client.api.tsengAbuseComplaintProcessorOther.listMitigations` | `GET /accounts/{accountId}/abuse-reports/{reportId}/mitigations` | List abuse report mitigations |
| `client.api.tsengAbuseComplaintProcessorOther.requestReview` | `POST /accounts/{accountId}/abuse-reports/{reportId}/mitigations/appeal` | Request review on mitigations |
| `client.api.tsengAbuseComplaintProcessorOther.getAbuseReport` | `GET /accounts/{accountId}/abuse-reports/{reportParam}` | Get an abuse report against the account |
| `client.api.tsengAbuseComplaintProcessorOther.submitAbuseReport` | `POST /accounts/{accountId}/abuse-reports/{reportParam}` | Submit an abuse report |

## mcpPortalAnalytics

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.mcpPortalAnalytics.mcpPortalsApiPortalToolCallTimeseries` | `GET /accounts/{accountId}/access/ai-controls/mcp/analytics/portals/{portalId}/tool-calls/timeseries` | Per-portal MCP tool-call timeseries |
| `client.api.mcpPortalAnalytics.mcpPortalsApiServerToolCallTimeseries` | `GET /accounts/{accountId}/access/ai-controls/mcp/analytics/servers/{serverId}/tool-calls/timeseries` | Per-server MCP tool-call timeseries |
| `client.api.mcpPortalAnalytics.mcpPortalsApiAccountToolCallTimeseries` | `GET /accounts/{accountId}/access/ai-controls/mcp/analytics/tool-calls/timeseries` | Account-global MCP tool-call timeseries |

## mcpPortal

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.mcpPortal.mcpPortalsApiListPortals` | `GET /accounts/{accountId}/access/ai-controls/mcp/portals` | List MCP Portals |
| `client.api.mcpPortal.mcpPortalsApiCreatePortals` | `POST /accounts/{accountId}/access/ai-controls/mcp/portals` | Create a new MCP Portal |
| `client.api.mcpPortal.mcpPortalsApiDeletePortals` | `DELETE /accounts/{accountId}/access/ai-controls/mcp/portals/{id}` | Delete an MCP Portal |
| `client.api.mcpPortal.mcpPortalsApiFetchGateways` | `GET /accounts/{accountId}/access/ai-controls/mcp/portals/{id}` | Read details of an MCP Portal |
| `client.api.mcpPortal.mcpPortalsApiUpdatePortals` | `PUT /accounts/{accountId}/access/ai-controls/mcp/portals/{id}` | Update an MCP Portal |
| `client.api.mcpPortal.mcpPortalsApiEffectiveRedirectUri` | `GET /accounts/{accountId}/access/ai-controls/mcp/portals/{portalId}/servers/{serverId}/effective-redirect-uri` | Resolve an MCP server OAuth redirect URI |

## mcpPortalServers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.mcpPortalServers.mcpPortalsApiListServers` | `GET /accounts/{accountId}/access/ai-controls/mcp/servers` | List MCP Servers |
| `client.api.mcpPortalServers.mcpPortalsApiCreateServers` | `POST /accounts/{accountId}/access/ai-controls/mcp/servers` | Create a new MCP Server |
| `client.api.mcpPortalServers.mcpPortalsApiDeleteServers` | `DELETE /accounts/{accountId}/access/ai-controls/mcp/servers/{id}` | Delete an MCP Server |
| `client.api.mcpPortalServers.mcpPortalsApiFetchServers` | `GET /accounts/{accountId}/access/ai-controls/mcp/servers/{id}` | Read the details of an MCP Server |
| `client.api.mcpPortalServers.mcpPortalsApiUpdateServers` | `PUT /accounts/{accountId}/access/ai-controls/mcp/servers/{id}` | Update an MCP Server |
| `client.api.mcpPortalServers.mcpPortalsApiSyncServer` | `POST /accounts/{accountId}/access/ai-controls/mcp/servers/{id}/sync` | Sync MCP Server Capabilities |

## accessApplications

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessApplications.accessApplicationsListAccessApplications` | `GET /accounts/{accountId}/access/apps` | List Access applications |
| `client.api.accessApplications.accessApplicationsAddAnApplication` | `POST /accounts/{accountId}/access/apps` | Add an Access application |
| `client.api.accessApplications.accessApplicationsDeleteAnAccessApplication` | `DELETE /accounts/{accountId}/access/apps/{appId}` | Delete an Access application |
| `client.api.accessApplications.accessApplicationsGetAnAccessApplication` | `GET /accounts/{accountId}/access/apps/{appId}` | Get an Access application |
| `client.api.accessApplications.accessApplicationsUpdateAnAccessApplication` | `PUT /accounts/{accountId}/access/apps/{appId}` | Update an Access application |
| `client.api.accessApplications.accessApplicationsRevokeServiceTokens` | `POST /accounts/{accountId}/access/apps/{appId}/revoke_tokens` | Revoke application tokens |
| `client.api.accessApplications.accessApplicationsPatchUpdateAccessApplicationSettings` | `PATCH /accounts/{accountId}/access/apps/{appId}/settings` | Update Access application settings |
| `client.api.accessApplications.accessApplicationsPutUpdateAccessApplicationSettings` | `PUT /accounts/{accountId}/access/apps/{appId}/settings` | Update Access application settings |
| `client.api.accessApplications.accessApplicationsTestAccessPolicies` | `GET /accounts/{accountId}/access/apps/{appId}/user_policy_checks` | Test Access policies |

## accessShortLivedCertificateCas

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessShortLivedCertificateCas.accessShortLivedCertificateCAsListShortLivedCertificateCAs` | `GET /accounts/{accountId}/access/apps/ca` | List short-lived certificate CAs |
| `client.api.accessShortLivedCertificateCas.accessShortLivedCertificateCAsDeleteAShortLivedCertificateCa` | `DELETE /accounts/{accountId}/access/apps/{appId}/ca` | Delete a short-lived certificate CA |
| `client.api.accessShortLivedCertificateCas.accessShortLivedCertificateCAsGetAShortLivedCertificateCa` | `GET /accounts/{accountId}/access/apps/{appId}/ca` | Get a short-lived certificate CA |
| `client.api.accessShortLivedCertificateCas.accessShortLivedCertificateCAsCreateAShortLivedCertificateCa` | `POST /accounts/{accountId}/access/apps/{appId}/ca` | Create a short-lived certificate CA |

## accessApplicationScopedPolicies

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessApplicationScopedPolicies.accessPoliciesListAccessAppPolicies` | `GET /accounts/{accountId}/access/apps/{appId}/policies` | List Access application policies |
| `client.api.accessApplicationScopedPolicies.accessPoliciesCreateAnAccessPolicy` | `POST /accounts/{accountId}/access/apps/{appId}/policies` | Create an Access application policy |
| `client.api.accessApplicationScopedPolicies.accessPoliciesDeleteAnAccessPolicy` | `DELETE /accounts/{accountId}/access/apps/{appId}/policies/{policyId}` | Delete an Access application policy |
| `client.api.accessApplicationScopedPolicies.accessPoliciesGetAnAccessPolicy` | `GET /accounts/{accountId}/access/apps/{appId}/policies/{policyId}` | Get an Access application policy |
| `client.api.accessApplicationScopedPolicies.accessPoliciesUpdateAnAccessPolicy` | `PUT /accounts/{accountId}/access/apps/{appId}/policies/{policyId}` | Update an Access application policy |
| `client.api.accessApplicationScopedPolicies.accessPoliciesConvertReusable` | `PUT /accounts/{accountId}/access/apps/{appId}/policies/{policyId}/make_reusable` | Convert an Access application policy to a reusable policy |

## accessAuthenticatorDeviceAaguids

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessAuthenticatorDeviceAaguids.accessAuthenticatorDeviceAaguidsList` | `GET /accounts/{accountId}/access/authenticator_device_aaguids` | List authenticator device AAGUIDs |

## accessBookmarkApplicationsDeprecated

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessBookmarkApplicationsDeprecated.accessBookmarkApplicationsDeprecatedListBookmarkApplications` | `GET /accounts/{accountId}/access/bookmarks` | List Bookmark applications |
| `client.api.accessBookmarkApplicationsDeprecated.accessBookmarkApplicationsDeprecatedDeleteABookmarkApplication` | `DELETE /accounts/{accountId}/access/bookmarks/{bookmarkId}` | Delete a Bookmark application |
| `client.api.accessBookmarkApplicationsDeprecated.accessBookmarkApplicationsDeprecatedGetABookmarkApplication` | `GET /accounts/{accountId}/access/bookmarks/{bookmarkId}` | Get a Bookmark application |
| `client.api.accessBookmarkApplicationsDeprecated.accessBookmarkApplicationsDeprecatedCreateABookmarkApplication` | `POST /accounts/{accountId}/access/bookmarks/{bookmarkId}` | Create a Bookmark application |
| `client.api.accessBookmarkApplicationsDeprecated.accessBookmarkApplicationsDeprecatedUpdateABookmarkApplication` | `PUT /accounts/{accountId}/access/bookmarks/{bookmarkId}` | Update a Bookmark application |

## accessMtlsAuthentication

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessMtlsAuthentication.accessMtlsAuthenticationListMtlsCertificates` | `GET /accounts/{accountId}/access/certificates` | List mTLS certificates |
| `client.api.accessMtlsAuthentication.accessMtlsAuthenticationAddAnMtlsCertificate` | `POST /accounts/{accountId}/access/certificates` | Add an mTLS certificate |
| `client.api.accessMtlsAuthentication.accessMtlsAuthenticationListMtlsCertificatesHostnameSettings` | `GET /accounts/{accountId}/access/certificates/settings` | List all mTLS hostname settings |
| `client.api.accessMtlsAuthentication.accessMtlsAuthenticationUpdateAnMtlsCertificateSettings` | `PUT /accounts/{accountId}/access/certificates/settings` | Update an mTLS certificate's hostname settings |
| `client.api.accessMtlsAuthentication.accessMtlsAuthenticationDeleteAnMtlsCertificate` | `DELETE /accounts/{accountId}/access/certificates/{certificateId}` | Delete an mTLS certificate |
| `client.api.accessMtlsAuthentication.accessMtlsAuthenticationGetAnMtlsCertificate` | `GET /accounts/{accountId}/access/certificates/{certificateId}` | Get an mTLS certificate |
| `client.api.accessMtlsAuthentication.accessMtlsAuthenticationUpdateAnMtlsCertificate` | `PUT /accounts/{accountId}/access/certificates/{certificateId}` | Update an mTLS certificate |

## accessCustomPages

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessCustomPages.accessCustomPagesListCustomPages` | `GET /accounts/{accountId}/access/custom_pages` | List custom pages |
| `client.api.accessCustomPages.accessCustomPagesCreateACustomPage` | `POST /accounts/{accountId}/access/custom_pages` | Create a custom page |
| `client.api.accessCustomPages.accessCustomPagesValidateACustomPageTemplate` | `POST /accounts/{accountId}/access/custom_pages/validate` | Validate a custom page template |
| `client.api.accessCustomPages.accessCustomPagesDeleteACustomPage` | `DELETE /accounts/{accountId}/access/custom_pages/{customPageId}` | Delete a custom page |
| `client.api.accessCustomPages.accessCustomPagesGetACustomPage` | `GET /accounts/{accountId}/access/custom_pages/{customPageId}` | Get a custom page |
| `client.api.accessCustomPages.accessCustomPagesUpdateACustomPage` | `PUT /accounts/{accountId}/access/custom_pages/{customPageId}` | Update a custom page |

## gatewayCa

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.gatewayCa.accessGatewayCaListSSHCa` | `GET /accounts/{accountId}/access/gateway_ca` | List SSH Certificate Authorities (CA) |
| `client.api.gatewayCa.accessGatewayCaAddAnSSHCa` | `POST /accounts/{accountId}/access/gateway_ca` | Add a new SSH Certificate Authority (CA) |
| `client.api.gatewayCa.accessGatewayCaDeleteAnSSHCa` | `DELETE /accounts/{accountId}/access/gateway_ca/{certificateId}` | Delete an SSH Certificate Authority (CA) |

## accessGroups

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessGroups.accessGroupsListAccessGroups` | `GET /accounts/{accountId}/access/groups` | List Access groups |
| `client.api.accessGroups.accessGroupsCreateAnAccessGroup` | `POST /accounts/{accountId}/access/groups` | Create an Access group |
| `client.api.accessGroups.accessGroupsDeleteAnAccessGroup` | `DELETE /accounts/{accountId}/access/groups/{groupId}` | Delete an Access group |
| `client.api.accessGroups.accessGroupsGetAnAccessGroup` | `GET /accounts/{accountId}/access/groups/{groupId}` | Get an Access group |
| `client.api.accessGroups.accessGroupsUpdateAnAccessGroup` | `PUT /accounts/{accountId}/access/groups/{groupId}` | Update an Access group |

## accessIdentityProviders

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessIdentityProviders.accessIdentityProvidersListAccessIdentityProviders` | `GET /accounts/{accountId}/access/identity_providers` | List Access identity providers |
| `client.api.accessIdentityProviders.accessIdentityProvidersAddAnAccessIdentityProvider` | `POST /accounts/{accountId}/access/identity_providers` | Add an Access identity provider |
| `client.api.accessIdentityProviders.accessIdentityProvidersDeleteAnAccessIdentityProvider` | `DELETE /accounts/{accountId}/access/identity_providers/{identityProviderId}` | Delete an Access identity provider |
| `client.api.accessIdentityProviders.accessIdentityProvidersGetAnAccessIdentityProvider` | `GET /accounts/{accountId}/access/identity_providers/{identityProviderId}` | Get an Access identity provider |
| `client.api.accessIdentityProviders.accessIdentityProvidersUpdateAnAccessIdentityProvider` | `PUT /accounts/{accountId}/access/identity_providers/{identityProviderId}` | Update an Access identity provider |
| `client.api.accessIdentityProviders.accessIdentityProvidersCreateSamlCertificateForIdentityProvider` | `POST /accounts/{accountId}/access/identity_providers/{identityProviderId}/saml_certificate` | Create SAML encryption certificate for Identity Provider |
| `client.api.accessIdentityProviders.accessIdentityProvidersListScimGroupResources` | `GET /accounts/{accountId}/access/identity_providers/{identityProviderId}/scim/groups` | List SCIM Group resources |
| `client.api.accessIdentityProviders.accessIdentityProvidersDeleteScimGroupResource` | `DELETE /accounts/{accountId}/access/identity_providers/{identityProviderId}/scim/groups/{groupId}` | Delete a SCIM Group resource |
| `client.api.accessIdentityProviders.accessIdentityProvidersGetScimGroupResource` | `GET /accounts/{accountId}/access/identity_providers/{identityProviderId}/scim/groups/{groupId}` | Get a SCIM Group resource |
| `client.api.accessIdentityProviders.accessIdentityProvidersListScimUserResources` | `GET /accounts/{accountId}/access/identity_providers/{identityProviderId}/scim/users` | List SCIM User resources |
| `client.api.accessIdentityProviders.accessIdentityProvidersDeleteScimUserResource` | `DELETE /accounts/{accountId}/access/identity_providers/{identityProviderId}/scim/users/{userId}` | Delete a SCIM User resource |
| `client.api.accessIdentityProviders.accessIdentityProvidersGetScimUserResource` | `GET /accounts/{accountId}/access/identity_providers/{identityProviderId}/scim/users/{userId}` | Get a SCIM User resource |

## accessIdpFederationGrants

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessIdpFederationGrants.accessIdpFederationGrantsList` | `GET /accounts/{accountId}/access/idp_federation_grants` | List IdP federation grants |
| `client.api.accessIdpFederationGrants.accessIdpFederationGrantsCreate` | `POST /accounts/{accountId}/access/idp_federation_grants` | Create an IdP federation grant |
| `client.api.accessIdpFederationGrants.accessIdpFederationGrantsDelete` | `DELETE /accounts/{accountId}/access/idp_federation_grants/{grantId}` | Delete an IdP federation grant |
| `client.api.accessIdpFederationGrants.accessIdpFederationGrantsGet` | `GET /accounts/{accountId}/access/idp_federation_grants/{grantId}` | Get an IdP federation grant |

## accessKeyConfiguration

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessKeyConfiguration.accessKeyConfigurationGetTheAccessKeyConfiguration` | `GET /accounts/{accountId}/access/keys` | Get the Access key configuration |
| `client.api.accessKeyConfiguration.accessKeyConfigurationUpdateTheAccessKeyConfiguration` | `PUT /accounts/{accountId}/access/keys` | Update the Access key configuration |
| `client.api.accessKeyConfiguration.accessKeyConfigurationRotateAccessKeys` | `POST /accounts/{accountId}/access/keys/rotate` | Rotate Access keys |

## accessAuthenticationLogs

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessAuthenticationLogs.accessAuthenticationLogsGetAccessAuthenticationLogs` | `GET /accounts/{accountId}/access/logs/access_requests` | Get Access authentication logs |

## accessJitRequestLogs

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessJitRequestLogs.accessJitRequestLogsList` | `GET /accounts/{accountId}/access/logs/jit_requests` | List Access JIT request logs |
| `client.api.accessJitRequestLogs.accessJitRequestLogsGet` | `GET /accounts/{accountId}/access/logs/jit_requests/{knockRequestId}` | Get an Access JIT request log |

## accessScimUpdateLogs

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessScimUpdateLogs.accessScimUpdateLogsListAccessScimUpdateLogs` | `GET /accounts/{accountId}/access/logs/scim/updates` | List Access SCIM update logs |

## zeroTrustOrganization

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustOrganization.zeroTrustOrganizationGetYourZeroTrustOrganization` | `GET /accounts/{accountId}/access/organizations` | Get your Zero Trust organization |
| `client.api.zeroTrustOrganization.zeroTrustOrganizationPatchYourZeroTrustOrganization` | `PATCH /accounts/{accountId}/access/organizations` | Partially update your Zero Trust organization |
| `client.api.zeroTrustOrganization.zeroTrustOrganizationCreateYourZeroTrustOrganization` | `POST /accounts/{accountId}/access/organizations` | Create your Zero Trust organization |
| `client.api.zeroTrustOrganization.zeroTrustOrganizationUpdateYourZeroTrustOrganization` | `PUT /accounts/{accountId}/access/organizations` | Update your Zero Trust organization |
| `client.api.zeroTrustOrganization.zeroTrustOrganizationGetYourZeroTrustOrganizationDohSettings` | `GET /accounts/{accountId}/access/organizations/doh` | Get your Zero Trust organization DoH settings |
| `client.api.zeroTrustOrganization.zeroTrustOrganizationUpdateYourZeroTrustOrganizationDohSettings` | `PUT /accounts/{accountId}/access/organizations/doh` | Update your Zero Trust organization DoH settings |
| `client.api.zeroTrustOrganization.zeroTrustOrganizationRevokeAllAccessTokensForAUser` | `POST /accounts/{accountId}/access/organizations/revoke_user` | Revoke all Access tokens for a user |
| `client.api.zeroTrustOrganization.zeroTrustOrganizationDeleteTrustSettings` | `DELETE /accounts/{accountId}/access/organizations/trust_settings` | Delete Zero Trust organization trust settings |
| `client.api.zeroTrustOrganization.zeroTrustOrganizationGetTrustSettings` | `GET /accounts/{accountId}/access/organizations/trust_settings` | Get Zero Trust organization trust settings |
| `client.api.zeroTrustOrganization.zeroTrustOrganizationUpdateTrustSettings` | `PATCH /accounts/{accountId}/access/organizations/trust_settings` | Update Zero Trust organization trust settings |
| `client.api.zeroTrustOrganization.zeroTrustOrganizationReplaceTrustSettings` | `PUT /accounts/{accountId}/access/organizations/trust_settings` | Replace Zero Trust organization trust settings |

## accessReusablePolicies

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessReusablePolicies.accessPoliciesListAccessReusablePolicies` | `GET /accounts/{accountId}/access/policies` | List Access reusable policies |
| `client.api.accessReusablePolicies.accessPoliciesCreateAnAccessReusablePolicy` | `POST /accounts/{accountId}/access/policies` | Create an Access reusable policy |
| `client.api.accessReusablePolicies.accessPoliciesDeleteAnAccessReusablePolicy` | `DELETE /accounts/{accountId}/access/policies/{policyId}` | Delete an Access reusable policy |
| `client.api.accessReusablePolicies.accessPoliciesGetAnAccessReusablePolicy` | `GET /accounts/{accountId}/access/policies/{policyId}` | Get an Access reusable policy |
| `client.api.accessReusablePolicies.accessPoliciesUpdateAnAccessReusablePolicy` | `PUT /accounts/{accountId}/access/policies/{policyId}` | Update an Access reusable policy |

## accessPolicyTester

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessPolicyTester.accessPolicyTests` | `POST /accounts/{accountId}/access/policy-tests` | Start Access policy test |
| `client.api.accessPolicyTester.accessPolicyTestsGetAnUpdate` | `GET /accounts/{accountId}/access/policy-tests/{policyTestId}` | Get the current status of a given Access policy test |
| `client.api.accessPolicyTester.accessPolicyTestsGetAUserPage` | `GET /accounts/{accountId}/access/policy-tests/{policyTestId}/users` | Get an Access policy test users page |

## accessSamlEncryptionCertificates

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessSamlEncryptionCertificates.accessSamlCertificatesListCertificateSets` | `GET /accounts/{accountId}/access/saml_certificates` | List SAML certificate sets |
| `client.api.accessSamlEncryptionCertificates.accessSamlCertificatesGetCertificateSet` | `GET /accounts/{accountId}/access/saml_certificates/{samlCertSetId}` | Get SAML certificate set |
| `client.api.accessSamlEncryptionCertificates.accessSamlCertificatesGetPem` | `GET /accounts/{accountId}/access/saml_certificates/{samlCertSetId}/pem` | Download current certificate in PEM format |
| `client.api.accessSamlEncryptionCertificates.accessSamlCertificatesRotateCertificate` | `POST /accounts/{accountId}/access/saml_certificates/{samlCertSetId}/rotate` | Rotate SAML certificate |

## zeroTrustSeats

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustSeats.zeroTrustSeatsUpdateAUserSeat` | `PATCH /accounts/{accountId}/access/seats` | Update a user seat |

## accessServiceTokens

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessServiceTokens.accessServiceTokensListServiceTokens` | `GET /accounts/{accountId}/access/service_tokens` | List service tokens |
| `client.api.accessServiceTokens.accessServiceTokensCreateAServiceToken` | `POST /accounts/{accountId}/access/service_tokens` | Create a service token |
| `client.api.accessServiceTokens.accessServiceTokensDeleteAServiceToken` | `DELETE /accounts/{accountId}/access/service_tokens/{serviceTokenId}` | Delete a service token |
| `client.api.accessServiceTokens.accessServiceTokensGetAServiceToken` | `GET /accounts/{accountId}/access/service_tokens/{serviceTokenId}` | Get a service token |
| `client.api.accessServiceTokens.accessServiceTokensUpdateAServiceToken` | `PUT /accounts/{accountId}/access/service_tokens/{serviceTokenId}` | Update a service token |
| `client.api.accessServiceTokens.accessServiceTokensRefreshAServiceToken` | `POST /accounts/{accountId}/access/service_tokens/{serviceTokenId}/refresh` | Refresh a service token |
| `client.api.accessServiceTokens.accessServiceTokensRotateAServiceToken` | `POST /accounts/{accountId}/access/service_tokens/{serviceTokenId}/rotate` | Rotate a service token |

## accessTags

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessTags.accessTagsListTags` | `GET /accounts/{accountId}/access/tags` | List tags |
| `client.api.accessTags.accessTagsCreateTag` | `POST /accounts/{accountId}/access/tags` | Create a tag |
| `client.api.accessTags.accessTagsDeleteATag` | `DELETE /accounts/{accountId}/access/tags/{tagName}` | Delete a tag |
| `client.api.accessTags.accessTagsGetATag` | `GET /accounts/{accountId}/access/tags/{tagName}` | Get a tag |
| `client.api.accessTags.accessTagsUpdateATag` | `PUT /accounts/{accountId}/access/tags/{tagName}` | Update a tag |

## accessUserPopulations

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessUserPopulations.accessUserPopulationsListUserPopulations` | `GET /accounts/{accountId}/access/user_populations` | List user populations |
| `client.api.accessUserPopulations.accessUserPopulationsCreateUserPopulation` | `POST /accounts/{accountId}/access/user_populations` | Create a user population |
| `client.api.accessUserPopulations.accessUserPopulationsDeleteUserPopulation` | `DELETE /accounts/{accountId}/access/user_populations/{userPopulationId}` | Delete a user population |
| `client.api.accessUserPopulations.accessUserPopulationsGetUserPopulation` | `GET /accounts/{accountId}/access/user_populations/{userPopulationId}` | Get a user population |
| `client.api.accessUserPopulations.accessUserPopulationsUpdateUserPopulation` | `PUT /accounts/{accountId}/access/user_populations/{userPopulationId}` | Update a user population |

## accessUserPopulationUsers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessUserPopulationUsers.accessUserPopulationsListUsers` | `GET /accounts/{accountId}/access/user_populations/{userPopulationId}/users` | List users in a user population |
| `client.api.accessUserPopulationUsers.accessUserPopulationsCreateUser` | `POST /accounts/{accountId}/access/user_populations/{userPopulationId}/users` | Create a user population user |
| `client.api.accessUserPopulationUsers.accessUserPopulationsDeleteUser` | `DELETE /accounts/{accountId}/access/user_populations/{userPopulationId}/users/{userId}` | Delete a user population user |
| `client.api.accessUserPopulationUsers.accessUserPopulationsGetUser` | `GET /accounts/{accountId}/access/user_populations/{userPopulationId}/users/{userId}` | Get a user population user |
| `client.api.accessUserPopulationUsers.accessUserPopulationsUpdateUser` | `PATCH /accounts/{accountId}/access/user_populations/{userPopulationId}/users/{userId}` | Update a user population user |
| `client.api.accessUserPopulationUsers.accessUserPopulationsReplaceUser` | `PUT /accounts/{accountId}/access/user_populations/{userPopulationId}/users/{userId}` | Replace a user population user |

## zeroTrustUsers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustUsers.zeroTrustUsersGetUsers` | `GET /accounts/{accountId}/access/users` | Get users |
| `client.api.zeroTrustUsers.zeroTrustUsersCreateUser` | `POST /accounts/{accountId}/access/users` | Create a user |
| `client.api.zeroTrustUsers.zeroTrustUsersDeleteUser` | `DELETE /accounts/{accountId}/access/users/{userId}` | Delete a user |
| `client.api.zeroTrustUsers.zeroTrustUsersGetUser` | `GET /accounts/{accountId}/access/users/{userId}` | Get a user |
| `client.api.zeroTrustUsers.zeroTrustUsersUpdateUser` | `PUT /accounts/{accountId}/access/users/{userId}` | Update a user |
| `client.api.zeroTrustUsers.zeroTrustUsersGetActiveSessions` | `GET /accounts/{accountId}/access/users/{userId}/active_sessions` | Get active sessions |
| `client.api.zeroTrustUsers.zeroTrustUsersGetActiveSession` | `GET /accounts/{accountId}/access/users/{userId}/active_sessions/{nonce}` | Get single active session |
| `client.api.zeroTrustUsers.zeroTrustUsersGetFailedLogins` | `GET /accounts/{accountId}/access/users/{userId}/failed_logins` | Get failed logins |
| `client.api.zeroTrustUsers.zeroTrustUsersGetLastSeenIdentity` | `GET /accounts/{accountId}/access/users/{userId}/last_seen_identity` | Get last seen identity |
| `client.api.zeroTrustUsers.zeroTrustUsersDeleteMfaAuthenticator` | `DELETE /accounts/{accountId}/access/users/{userId}/mfa_authenticators/{authenticatorId}` | Delete a user's authenticator |
| `client.api.zeroTrustUsers.zeroTrustUsersDeletePasskey` | `DELETE /accounts/{accountId}/access/users/{userId}/passkeys/{authenticatorId}` | Delete a user's passkey |

## ipAddressManagementAddressMaps

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ipAddressManagementAddressMaps.ipAddressManagementAddressMapsListAddressMaps` | `GET /accounts/{accountId}/addressing/address_maps` | List Address Maps |
| `client.api.ipAddressManagementAddressMaps.ipAddressManagementAddressMapsCreateAddressMap` | `POST /accounts/{accountId}/addressing/address_maps` | Create Address Map |
| `client.api.ipAddressManagementAddressMaps.ipAddressManagementAddressMapsDeleteAddressMap` | `DELETE /accounts/{accountId}/addressing/address_maps/{addressMapId}` | Delete Address Map |
| `client.api.ipAddressManagementAddressMaps.ipAddressManagementAddressMapsAddressMapDetails` | `GET /accounts/{accountId}/addressing/address_maps/{addressMapId}` | Address Map Details |
| `client.api.ipAddressManagementAddressMaps.ipAddressManagementAddressMapsUpdateAddressMap` | `PATCH /accounts/{accountId}/addressing/address_maps/{addressMapId}` | Update Address Map |
| `client.api.ipAddressManagementAddressMaps.ipAddressManagementAddressMapsRemoveAnAccountMembershipFromAnAddressMap` | `DELETE /accounts/{accountId}/addressing/address_maps/{addressMapId}/accounts/{memberAccountId}` | Remove an account membership from an Address Map |
| `client.api.ipAddressManagementAddressMaps.ipAddressManagementAddressMapsAddAnAccountMembershipToAnAddressMap` | `PUT /accounts/{accountId}/addressing/address_maps/{addressMapId}/accounts/{memberAccountId}` | Add an account membership to an Address Map |
| `client.api.ipAddressManagementAddressMaps.ipAddressManagementAddressMapsRemoveMultipleIpsFromAnAddressMap` | `DELETE /accounts/{accountId}/addressing/address_maps/{addressMapId}/ips` | Remove Multiple IPs from an Address Map |
| `client.api.ipAddressManagementAddressMaps.ipAddressManagementAddressMapsAddMultipleIpsToAnAddressMap` | `POST /accounts/{accountId}/addressing/address_maps/{addressMapId}/ips` | Add Multiple IPs to an Address Map |
| `client.api.ipAddressManagementAddressMaps.ipAddressManagementAddressMapsRemoveAnIpFromAnAddressMap` | `DELETE /accounts/{accountId}/addressing/address_maps/{addressMapId}/ips/{ipAddress}` | Remove an IP from an Address Map |
| `client.api.ipAddressManagementAddressMaps.ipAddressManagementAddressMapsAddAnIpToAnAddressMap` | `PUT /accounts/{accountId}/addressing/address_maps/{addressMapId}/ips/{ipAddress}` | Add an IP to an Address Map |
| `client.api.ipAddressManagementAddressMaps.ipAddressManagementAddressMapsRemoveMultipleZonesFromAnAddressMap` | `DELETE /accounts/{accountId}/addressing/address_maps/{addressMapId}/zones` | Remove Multiple Zones from an Address Map |
| `client.api.ipAddressManagementAddressMaps.ipAddressManagementAddressMapsAddMultipleZonesToAnAddressMap` | `POST /accounts/{accountId}/addressing/address_maps/{addressMapId}/zones` | Add Multiple Zones to an Address Map |
| `client.api.ipAddressManagementAddressMaps.ipAddressManagementAddressMapsRemoveAZoneMembershipFromAnAddressMap` | `DELETE /accounts/{accountId}/addressing/address_maps/{addressMapId}/zones/{memberZoneId}` | Remove a zone membership from an Address Map |
| `client.api.ipAddressManagementAddressMaps.ipAddressManagementAddressMapsAddAZoneMembershipToAnAddressMap` | `PUT /accounts/{accountId}/addressing/address_maps/{addressMapId}/zones/{memberZoneId}` | Add a zone membership to an Address Map |

## ipAddressManagementLeases

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ipAddressManagementLeases.ipAddressManagementListLeases` | `GET /accounts/{accountId}/addressing/leases` | List Leases |

## ipAddressManagementPrefixes

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ipAddressManagementPrefixes.ipAddressManagementPrefixesListLoaDocuments` | `GET /accounts/{accountId}/addressing/loa_documents` | List LOA Documents |
| `client.api.ipAddressManagementPrefixes.ipAddressManagementPrefixesUploadLoaDocument` | `POST /accounts/{accountId}/addressing/loa_documents` | Upload LOA Document |
| `client.api.ipAddressManagementPrefixes.ipAddressManagementPrefixesDownloadLoaDocument` | `GET /accounts/{accountId}/addressing/loa_documents/{loaDocumentId}/download` | Download LOA Document |
| `client.api.ipAddressManagementPrefixes.ipAddressManagementPrefixesListPrefixes` | `GET /accounts/{accountId}/addressing/prefixes` | List Prefixes |
| `client.api.ipAddressManagementPrefixes.ipAddressManagementPrefixesAddPrefix` | `POST /accounts/{accountId}/addressing/prefixes` | Add Prefix |
| `client.api.ipAddressManagementPrefixes.ipAddressManagementPrefixesDeletePrefix` | `DELETE /accounts/{accountId}/addressing/prefixes/{prefixId}` | Delete Prefix |
| `client.api.ipAddressManagementPrefixes.ipAddressManagementPrefixesPrefixDetails` | `GET /accounts/{accountId}/addressing/prefixes/{prefixId}` | Prefix Details |
| `client.api.ipAddressManagementPrefixes.ipAddressManagementPrefixesUpdatePrefixDescription` | `PATCH /accounts/{accountId}/addressing/prefixes/{prefixId}` | Update Prefix Description |
| `client.api.ipAddressManagementPrefixes.ipAddressManagementPrefixesValidatePrefix` | `POST /accounts/{accountId}/addressing/prefixes/{prefixId}/validate` | Validate Prefix |

## ipAddressManagementBgpPrefixes

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ipAddressManagementBgpPrefixes.ipAddressManagementPrefixesListBgpPrefixes` | `GET /accounts/{accountId}/addressing/prefixes/{prefixId}/bgp/prefixes` | List BGP Prefixes |
| `client.api.ipAddressManagementBgpPrefixes.ipAddressManagementPrefixesCreateBgpPrefix` | `POST /accounts/{accountId}/addressing/prefixes/{prefixId}/bgp/prefixes` | Create BGP Prefix |
| `client.api.ipAddressManagementBgpPrefixes.ipAddressManagementPrefixesDeleteBgpPrefix` | `DELETE /accounts/{accountId}/addressing/prefixes/{prefixId}/bgp/prefixes/{bgpPrefixId}` | Delete BGP Prefix |
| `client.api.ipAddressManagementBgpPrefixes.ipAddressManagementPrefixesFetchBgpPrefix` | `GET /accounts/{accountId}/addressing/prefixes/{prefixId}/bgp/prefixes/{bgpPrefixId}` | Fetch BGP Prefix |
| `client.api.ipAddressManagementBgpPrefixes.ipAddressManagementPrefixesUpdateBgpPrefix` | `PATCH /accounts/{accountId}/addressing/prefixes/{prefixId}/bgp/prefixes/{bgpPrefixId}` | Update BGP Prefix |

## ipAddressManagementDynamicAdvertisement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ipAddressManagementDynamicAdvertisement.ipAddressManagementDynamicAdvertisementGetAdvertisementStatus` | `GET /accounts/{accountId}/addressing/prefixes/{prefixId}/bgp/status` | Get Advertisement Status |
| `client.api.ipAddressManagementDynamicAdvertisement.ipAddressManagementDynamicAdvertisementUpdatePrefixDynamicAdvertisementStatus` | `PATCH /accounts/{accountId}/addressing/prefixes/{prefixId}/bgp/status` | Update Prefix Dynamic Advertisement Status |

## ipAddressManagementServiceBindings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ipAddressManagementServiceBindings.ipAddressManagementServiceBindingsListServiceBindings` | `GET /accounts/{accountId}/addressing/prefixes/{prefixId}/bindings` | List Service Bindings |
| `client.api.ipAddressManagementServiceBindings.ipAddressManagementServiceBindingsCreateServiceBinding` | `POST /accounts/{accountId}/addressing/prefixes/{prefixId}/bindings` | Create Service Binding |
| `client.api.ipAddressManagementServiceBindings.ipAddressManagementServiceBindingsDeleteServiceBinding` | `DELETE /accounts/{accountId}/addressing/prefixes/{prefixId}/bindings/{bindingId}` | Delete Service Binding |
| `client.api.ipAddressManagementServiceBindings.ipAddressManagementServiceBindingsGetServiceBinding` | `GET /accounts/{accountId}/addressing/prefixes/{prefixId}/bindings/{bindingId}` | Get Service Binding |
| `client.api.ipAddressManagementServiceBindings.ipAddressManagementServiceBindingsListServices` | `GET /accounts/{accountId}/addressing/services` | List Services |

## ipAddressManagementPrefixDelegation

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ipAddressManagementPrefixDelegation.ipAddressManagementPrefixDelegationListPrefixDelegations` | `GET /accounts/{accountId}/addressing/prefixes/{prefixId}/delegations` | List Prefix Delegations |
| `client.api.ipAddressManagementPrefixDelegation.ipAddressManagementPrefixDelegationCreatePrefixDelegation` | `POST /accounts/{accountId}/addressing/prefixes/{prefixId}/delegations` | Create Prefix Delegation |
| `client.api.ipAddressManagementPrefixDelegation.ipAddressManagementPrefixDelegationDeletePrefixDelegation` | `DELETE /accounts/{accountId}/addressing/prefixes/{prefixId}/delegations/{delegationId}` | Delete Prefix Delegation |

## dlsRegionalServices

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dlsRegionalServices.dlsAccountRegionalHostnamesListRegions` | `GET /accounts/{accountId}/addressing/regional_hostnames/regions` | List Regions |
| `client.api.dlsRegionalServices.dlsZoneRegionalHostnamesList` | `GET /zones/{zoneId}/addressing/regional_hostnames` | List Regional Hostnames |
| `client.api.dlsRegionalServices.dlsZoneRegionalHostnamesCreate` | `POST /zones/{zoneId}/addressing/regional_hostnames` | Create Regional Hostname |
| `client.api.dlsRegionalServices.dlsZoneRegionalHostnamesDelete` | `DELETE /zones/{zoneId}/addressing/regional_hostnames/{hostname}` | Delete Regional Hostname |
| `client.api.dlsRegionalServices.dlsZoneRegionalHostnamesFetch` | `GET /zones/{zoneId}/addressing/regional_hostnames/{hostname}` | Fetch Regional Hostname |
| `client.api.dlsRegionalServices.dlsZoneRegionalHostnamesPatch` | `PATCH /zones/{zoneId}/addressing/regional_hostnames/{hostname}` | Update Regional Hostname |

## namespaces

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.namespaces.agentMemoryNamespaceList` | `GET /accounts/{accountId}/agent-memory/namespaces` | List namespaces |
| `client.api.namespaces.agentMemoryNamespaceCreate` | `POST /accounts/{accountId}/agent-memory/namespaces` | Create a namespace |
| `client.api.namespaces.agentMemoryNamespaceDelete` | `DELETE /accounts/{accountId}/agent-memory/namespaces/{namespaceName}` | Delete a namespace |
| `client.api.namespaces.agentMemoryNamespaceGet` | `GET /accounts/{accountId}/agent-memory/namespaces/{namespaceName}` | Get a namespace |

## memory

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.memory.agentMemoryProfileList` | `GET /accounts/{accountId}/agent-memory/namespaces/{namespaceName}/profiles` | List profiles |
| `client.api.memory.agentMemoryProfileDelete` | `DELETE /accounts/{accountId}/agent-memory/namespaces/{namespaceName}/profiles/{profileName}` | Delete a profile |
| `client.api.memory.agentMemoryIngest` | `POST /accounts/{accountId}/agent-memory/namespaces/{namespaceName}/profiles/{profileName}/ingest` | Ingest messages |
| `client.api.memory.agentMemoryMemoryList` | `GET /accounts/{accountId}/agent-memory/namespaces/{namespaceName}/profiles/{profileName}/memories` | List memories |
| `client.api.memory.agentMemoryMemoryDelete` | `DELETE /accounts/{accountId}/agent-memory/namespaces/{namespaceName}/profiles/{profileName}/memories/{memoryId}` | Delete a memory |
| `client.api.memory.agentMemoryMemoryGet` | `GET /accounts/{accountId}/agent-memory/namespaces/{namespaceName}/profiles/{profileName}/memories/{memoryId}` | Get a memory |
| `client.api.memory.agentMemoryRecall` | `POST /accounts/{accountId}/agent-memory/namespaces/{namespaceName}/profiles/{profileName}/recall` | Recall memories |
| `client.api.memory.agentMemoryRemember` | `POST /accounts/{accountId}/agent-memory/namespaces/{namespaceName}/profiles/{profileName}/remember` | Remember a memory |
| `client.api.memory.agentMemorySessionDelete` | `DELETE /accounts/{accountId}/agent-memory/namespaces/{namespaceName}/profiles/{profileName}/sessions/{sessionId}` | Delete a session |
| `client.api.memory.agentMemorySummary` | `POST /accounts/{accountId}/agent-memory/namespaces/{namespaceName}/profiles/{profileName}/summary` | Get a profile summary |

## aiGateway

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aiGateway.aigBillingGetCreditBalance` | `GET /accounts/{accountId}/ai-gateway/billing/credit-balance` | Get credit balance |
| `client.api.aiGateway.aigBillingGetInvoiceHistory` | `GET /accounts/{accountId}/ai-gateway/billing/invoice-history` | Get invoice history |
| `client.api.aiGateway.aigBillingGetInvoicePreview` | `GET /accounts/{accountId}/ai-gateway/billing/invoice-preview` | Get invoice preview |
| `client.api.aiGateway.aigBillingDeleteSpendingLimit` | `DELETE /accounts/{accountId}/ai-gateway/billing/spending-limit` | Delete spending limit (deprecated) |
| `client.api.aiGateway.aigBillingGetSpendingLimit` | `GET /accounts/{accountId}/ai-gateway/billing/spending-limit` | Get spending limit (deprecated) |
| `client.api.aiGateway.aigBillingSetSpendingLimit` | `POST /accounts/{accountId}/ai-gateway/billing/spending-limit` | Set spending limit (deprecated) |
| `client.api.aiGateway.aigBillingCreateTopup` | `POST /accounts/{accountId}/ai-gateway/billing/topup` | Create a top-up |
| `client.api.aiGateway.aigBillingDeleteTopupConfig` | `DELETE /accounts/{accountId}/ai-gateway/billing/topup/config` | Delete auto top-up configuration |
| `client.api.aiGateway.aigBillingGetTopupConfig` | `GET /accounts/{accountId}/ai-gateway/billing/topup/config` | Get auto top-up configuration |
| `client.api.aiGateway.aigBillingSetTopupConfig` | `POST /accounts/{accountId}/ai-gateway/billing/topup/config` | Set auto top-up configuration |
| `client.api.aiGateway.aigBillingTopupEligibility` | `POST /accounts/{accountId}/ai-gateway/billing/topup/eligibility` | Get top-up eligibility |
| `client.api.aiGateway.aigBillingGetTopupLimits` | `GET /accounts/{accountId}/ai-gateway/billing/topup/limits` | Get account top-up limits |
| `client.api.aiGateway.aigBillingCheckTopupStatus` | `POST /accounts/{accountId}/ai-gateway/billing/topup/status` | Check top-up status |
| `client.api.aiGateway.aigBillingGetUsageHistory` | `GET /accounts/{accountId}/ai-gateway/billing/usage-history` | Get usage history |
| `client.api.aiGateway.workersAiAiGatewayWebSearch` | `POST /accounts/{accountId}/ai/websearch` | Search the web through AI Gateway |

## aiGatewayCustomProviders

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aiGatewayCustomProviders.aigConfigListAccountProvider` | `GET /accounts/{accountId}/ai-gateway/custom-providers` | List custom providers |
| `client.api.aiGatewayCustomProviders.aigConfigCreateAccountProvider` | `POST /accounts/{accountId}/ai-gateway/custom-providers` | Create a custom provider |
| `client.api.aiGatewayCustomProviders.aigConfigDeleteAccountProvider` | `DELETE /accounts/{accountId}/ai-gateway/custom-providers/{id}` | Delete a custom provider |
| `client.api.aiGatewayCustomProviders.aigConfigFetchAccountProvider` | `GET /accounts/{accountId}/ai-gateway/custom-providers/{id}` | Get a custom provider |
| `client.api.aiGatewayCustomProviders.aigConfigUpdateAccountProvider` | `PATCH /accounts/{accountId}/ai-gateway/custom-providers/{id}` | Update a custom provider |

## aiGatewayCustomProviderCosts

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aiGatewayCustomProviderCosts.aigConfigListAccountProviderCost` | `GET /accounts/{accountId}/ai-gateway/custom-providers/costs` | List custom provider pricing rules |
| `client.api.aiGatewayCustomProviderCosts.aigConfigCreateAccountProviderCost` | `POST /accounts/{accountId}/ai-gateway/custom-providers/costs` | Create a custom provider pricing rule |
| `client.api.aiGatewayCustomProviderCosts.aigConfigDeleteAccountProviderCost` | `DELETE /accounts/{accountId}/ai-gateway/custom-providers/costs/{id}` | Delete a custom provider pricing rule |
| `client.api.aiGatewayCustomProviderCosts.aigConfigFetchAccountProviderCost` | `GET /accounts/{accountId}/ai-gateway/custom-providers/costs/{id}` | Get a custom provider pricing rule |
| `client.api.aiGatewayCustomProviderCosts.aigConfigUpdateAccountProviderCost` | `PATCH /accounts/{accountId}/ai-gateway/custom-providers/costs/{id}` | Update a custom provider pricing rule |

## aiGatewayEvaluations

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aiGatewayEvaluations.aigConfigListEvaluators` | `GET /accounts/{accountId}/ai-gateway/evaluation-types` | List evaluator types (deprecated) |
| `client.api.aiGatewayEvaluations.aigConfigListEvaluations` | `GET /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/evaluations` | List evaluations (deprecated) |
| `client.api.aiGatewayEvaluations.aigConfigCreateEvaluations` | `POST /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/evaluations` | Create an evaluation (deprecated) |
| `client.api.aiGatewayEvaluations.aigConfigDeleteEvaluations` | `DELETE /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/evaluations/{id}` | Delete an evaluation (deprecated) |
| `client.api.aiGatewayEvaluations.aigConfigFetchEvaluations` | `GET /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/evaluations/{id}` | Get an evaluation (deprecated) |

## aiGatewayGateways

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aiGatewayGateways.aigConfigListGateway` | `GET /accounts/{accountId}/ai-gateway/gateways` | List gateways |
| `client.api.aiGatewayGateways.aigConfigCreateGateway` | `POST /accounts/{accountId}/ai-gateway/gateways` | Create a gateway |
| `client.api.aiGatewayGateways.aigConfigGetGatewayUrl` | `GET /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/url/{provider}` | Get Gateway URL |
| `client.api.aiGatewayGateways.aigConfigDeleteGateway` | `DELETE /accounts/{accountId}/ai-gateway/gateways/{id}` | Delete a gateway |
| `client.api.aiGatewayGateways.aigConfigFetchGateway` | `GET /accounts/{accountId}/ai-gateway/gateways/{id}` | Get a gateway |
| `client.api.aiGatewayGateways.aigConfigUpdateGateway` | `PUT /accounts/{accountId}/ai-gateway/gateways/{id}` | Update a gateway |

## aiGatewayCustomDomains

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aiGatewayCustomDomains.aigConfigListCustomDomain` | `GET /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/custom-domains` | List custom domains |
| `client.api.aiGatewayCustomDomains.aigConfigCreateCustomDomain` | `POST /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/custom-domains` | Create a custom domain for a gateway |
| `client.api.aiGatewayCustomDomains.aigConfigDeleteCustomDomain` | `DELETE /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/custom-domains/{hostname}` | Delete a custom domain |
| `client.api.aiGatewayCustomDomains.aigConfigFetchCustomDomain` | `GET /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/custom-domains/{hostname}` | Get a custom domain |

## aiGatewayDatasets

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aiGatewayDatasets.aigConfigListDataset` | `GET /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/datasets` | List datasets (deprecated) |
| `client.api.aiGatewayDatasets.aigConfigCreateDataset` | `POST /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/datasets` | Create a dataset (deprecated) |
| `client.api.aiGatewayDatasets.aigConfigDeleteDataset` | `DELETE /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/datasets/{id}` | Delete a dataset (deprecated) |
| `client.api.aiGatewayDatasets.aigConfigFetchDataset` | `GET /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/datasets/{id}` | Get a dataset (deprecated) |
| `client.api.aiGatewayDatasets.aigConfigUpdateDataset` | `PUT /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/datasets/{id}` | Update a dataset (deprecated) |

## aiGatewayLogs

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aiGatewayLogs.aigConfigDeleteGatewayLogs` | `DELETE /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/logs` | Delete Gateway Logs |
| `client.api.aiGatewayLogs.aigConfigListGatewayLogs` | `GET /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/logs` | List Gateway Logs |
| `client.api.aiGatewayLogs.aigConfigGetGatewayLogDetail` | `GET /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/logs/{id}` | Get Gateway Log Detail |
| `client.api.aiGatewayLogs.aigConfigPatchGatewayLog` | `PATCH /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/logs/{id}` | Patch Gateway Log |
| `client.api.aiGatewayLogs.aigConfigGetGatewayLogRequest` | `GET /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/logs/{id}/request` | Get Gateway Log Request |
| `client.api.aiGatewayLogs.aigConfigGetGatewayLogResponse` | `GET /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/logs/{id}/response` | Get Gateway Log Response |

## aiGatewayProviderConfigs

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aiGatewayProviderConfigs.aigConfigListProviders` | `GET /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/provider_configs` | List provider keys |
| `client.api.aiGatewayProviderConfigs.aigConfigCreateProviders` | `POST /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/provider_configs` | Store a provider key |
| `client.api.aiGatewayProviderConfigs.aigConfigDeleteProviders` | `DELETE /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/provider_configs/{id}` | Delete a provider key |
| `client.api.aiGatewayProviderConfigs.aigConfigFetchProviders` | `GET /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/provider_configs/{id}` | Get a provider key |
| `client.api.aiGatewayProviderConfigs.aigConfigUpdateProviders` | `PUT /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/provider_configs/{id}` | Rotate a provider key |

## aiGatewayDynamicRoutes

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aiGatewayDynamicRoutes.aigConfigListGatewayDynamicRoutes` | `GET /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/routes` | List dynamic routes |
| `client.api.aiGatewayDynamicRoutes.aigConfigPostGatewayDynamicRoute` | `POST /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/routes` | Create a dynamic route |
| `client.api.aiGatewayDynamicRoutes.aigConfigDeleteGatewayDynamicRoute` | `DELETE /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/routes/{id}` | Delete a dynamic route |
| `client.api.aiGatewayDynamicRoutes.aigConfigGetGatewayDynamicRoute` | `GET /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/routes/{id}` | Get a dynamic route |
| `client.api.aiGatewayDynamicRoutes.aigConfigUpdateGatewayDynamicRoute` | `PATCH /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/routes/{id}` | Rename a dynamic route |
| `client.api.aiGatewayDynamicRoutes.aigConfigListGatewayDynamicRouteDeployments` | `GET /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/routes/{id}/deployments` | List dynamic route deployments |
| `client.api.aiGatewayDynamicRoutes.aigConfigPostGatewayDynamicRouteDeployment` | `POST /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/routes/{id}/deployments` | Deploy a dynamic route version |
| `client.api.aiGatewayDynamicRoutes.aigConfigListGatewayDynamicRouteVersions` | `GET /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/routes/{id}/versions` | List dynamic route versions |
| `client.api.aiGatewayDynamicRoutes.aigConfigPostGatewayDynamicRouteVersion` | `POST /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/routes/{id}/versions` | Create a dynamic route version |
| `client.api.aiGatewayDynamicRoutes.aigConfigGetGatewayDynamicRouteVersion` | `GET /accounts/{accountId}/ai-gateway/gateways/{gatewayId}/routes/{id}/versions/{versionId}` | Get a dynamic route version |

## account

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.account.aigConfigGetLoggingState` | `GET /accounts/{accountId}/ai-gateway/logging-state` | Get AI Gateway logging state |
| `client.api.account.aigConfigPatchLoggingState` | `PATCH /accounts/{accountId}/ai-gateway/logging-state` | Migrate AI Gateway logging to Workers Observability |
| `client.api.account.getAccountLimits` | `GET /accounts/{accountId}/builds/account/limits` | Get build-minute availability |
| `client.api.account.getUsage` | `GET /accounts/{accountId}/containers/usage` | Get live account usage |

## aiSearchInstances

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aiSearchInstances.aiSearchListInstances` | `GET /accounts/{accountId}/ai-search/instances` | List AI Search instances. |
| `client.api.aiSearchInstances.aiSearchCreateInstance` | `POST /accounts/{accountId}/ai-search/instances` | Create an AI Search instance. |
| `client.api.aiSearchInstances.aiSearchDeleteInstance` | `DELETE /accounts/{accountId}/ai-search/instances/{id}` | Delete an AI Search instance. |
| `client.api.aiSearchInstances.aiSearchFetchInstance` | `GET /accounts/{accountId}/ai-search/instances/{id}` | Get an AI Search instance. |
| `client.api.aiSearchInstances.aiSearchUpdateInstance` | `PUT /accounts/{accountId}/ai-search/instances/{id}` | Update an AI Search instance. |
| `client.api.aiSearchInstances.aiSearchInstanceChatCompletion` | `POST /accounts/{accountId}/ai-search/instances/{id}/chat/completions` | Chat Completions |
| `client.api.aiSearchInstances.aiSearchInstanceSearch` | `POST /accounts/{accountId}/ai-search/instances/{id}/search` | Search |
| `client.api.aiSearchInstances.aiSearchStats` | `GET /accounts/{accountId}/ai-search/instances/{id}/stats` | Get instance statistics. |
| `client.api.aiSearchInstances.aiSearchNamespaceListInstances` | `GET /accounts/{accountId}/ai-search/namespaces/{namespace}/instances` | List AI Search instances. |
| `client.api.aiSearchInstances.aiSearchNamespaceCreateInstance` | `POST /accounts/{accountId}/ai-search/namespaces/{namespace}/instances` | Create an AI Search instance. |
| `client.api.aiSearchInstances.aiSearchNamespaceDeleteInstance` | `DELETE /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}` | Delete an AI Search instance. |
| `client.api.aiSearchInstances.aiSearchNamespaceFetchInstance` | `GET /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}` | Get an AI Search instance. |
| `client.api.aiSearchInstances.aiSearchNamespaceUpdateInstance` | `PUT /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}` | Update an AI Search instance. |
| `client.api.aiSearchInstances.aiSearchNamespaceInstanceChatCompletion` | `POST /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}/chat/completions` | Chat Completions |
| `client.api.aiSearchInstances.aiSearchNamespacePurgeInstanceCache` | `POST /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}/purge_cache` | Purge search cache. |
| `client.api.aiSearchInstances.aiSearchNamespaceInstanceSearch` | `POST /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}/search` | Search |
| `client.api.aiSearchInstances.aiSearchNamespaceStats` | `GET /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}/stats` | Get instance statistics. |

## aiSearchInstancesJobs

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aiSearchInstancesJobs.aiSearchInstanceListJobs` | `GET /accounts/{accountId}/ai-search/instances/{id}/jobs` | List Jobs |
| `client.api.aiSearchInstancesJobs.aiSearchInstanceCreateJob` | `POST /accounts/{accountId}/ai-search/instances/{id}/jobs` | Create new job |
| `client.api.aiSearchInstancesJobs.aiSearchInstanceGetJob` | `GET /accounts/{accountId}/ai-search/instances/{id}/jobs/{jobId}` | Get a Job Details |
| `client.api.aiSearchInstancesJobs.aiSearchInstanceChangeJobStatus` | `PATCH /accounts/{accountId}/ai-search/instances/{id}/jobs/{jobId}` | Cancel an indexing job. |
| `client.api.aiSearchInstancesJobs.aiSearchInstanceListJobLogs` | `GET /accounts/{accountId}/ai-search/instances/{id}/jobs/{jobId}/logs` | List Job Logs |
| `client.api.aiSearchInstancesJobs.aiSearchNamespaceInstanceListJobs` | `GET /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}/jobs` | List Jobs |
| `client.api.aiSearchInstancesJobs.aiSearchNamespaceInstanceCreateJob` | `POST /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}/jobs` | Create new job |
| `client.api.aiSearchInstancesJobs.aiSearchNamespaceInstanceGetJob` | `GET /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}/jobs/{jobId}` | Get a Job Details |
| `client.api.aiSearchInstancesJobs.aiSearchNamespaceInstanceChangeJobStatus` | `PATCH /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}/jobs/{jobId}` | Cancel an indexing job. |
| `client.api.aiSearchInstancesJobs.aiSearchNamespaceInstanceListJobLogs` | `GET /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}/jobs/{jobId}/logs` | List Job Logs |

## aiSearchNamespaces

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aiSearchNamespaces.aiSearchListNamespaces` | `GET /accounts/{accountId}/ai-search/namespaces` | List namespaces |
| `client.api.aiSearchNamespaces.aiSearchCreateNamespace` | `POST /accounts/{accountId}/ai-search/namespaces` | Create a namespace |
| `client.api.aiSearchNamespaces.aiSearchMoveInstance` | `PATCH /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}` | Move an instance to a different namespace. |
| `client.api.aiSearchNamespaces.aiSearchDeleteNamespace` | `DELETE /accounts/{accountId}/ai-search/namespaces/{name}` | Delete a namespace |
| `client.api.aiSearchNamespaces.aiSearchFetchNamespace` | `GET /accounts/{accountId}/ai-search/namespaces/{name}` | Get a namespace |
| `client.api.aiSearchNamespaces.aiSearchUpdateNamespace` | `PUT /accounts/{accountId}/ai-search/namespaces/{name}` | Update a namespace |

## aiSearchInstancesItems

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aiSearchInstancesItems.aiSearchNamespaceInstanceListItems` | `GET /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}/items` | Items List. |
| `client.api.aiSearchInstancesItems.aiSearchNamespaceInstanceUploadItem` | `POST /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}/items` | Upload Item. |
| `client.api.aiSearchInstancesItems.aiSearchNamespaceInstanceCreateOrUpdateItem` | `PUT /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}/items` | Create or Update Item. |
| `client.api.aiSearchInstancesItems.aiSearchNamespaceInstanceDeleteItem` | `DELETE /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}/items/{itemId}` | Delete Item. |
| `client.api.aiSearchInstancesItems.aiSearchNamespaceInstanceGetItem` | `GET /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}/items/{itemId}` | Get Item. |
| `client.api.aiSearchInstancesItems.aiSearchNamespaceInstanceSyncItem` | `PATCH /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}/items/{itemId}` | Sync Item. |
| `client.api.aiSearchInstancesItems.aiSearchNamespaceInstanceListItemChunks` | `GET /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}/items/{itemId}/chunks` | List Item Chunks. |
| `client.api.aiSearchInstancesItems.aiSearchNamespaceInstanceGetItemContent` | `GET /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}/items/{itemId}/download` | Download Item Content. |
| `client.api.aiSearchInstancesItems.aiSearchNamespaceInstanceLogsItem` | `GET /accounts/{accountId}/ai-search/namespaces/{namespace}/instances/{id}/items/{itemId}/logs` | Item Logs. |

## aiSearchAccountSearch

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aiSearchAccountSearch.aiSearchNamespaceMultiInstanceChatCompletion` | `POST /accounts/{accountId}/ai-search/namespaces/{name}/chat/completions` | Multi-Instance Chat Completions |
| `client.api.aiSearchAccountSearch.aiSearchNamespaceMultiInstanceSearch` | `POST /accounts/{accountId}/ai-search/namespaces/{name}/search` | Multi-Instance Search |

## aiSearchTokens

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aiSearchTokens.aiSearchListTokens` | `GET /accounts/{accountId}/ai-search/tokens` | List tokens |
| `client.api.aiSearchTokens.aiSearchCreateTokens` | `POST /accounts/{accountId}/ai-search/tokens` | Create a token |
| `client.api.aiSearchTokens.aiSearchDeleteTokens` | `DELETE /accounts/{accountId}/ai-search/tokens/{id}` | Delete a token |
| `client.api.aiSearchTokens.aiSearchFetchTokens` | `GET /accounts/{accountId}/ai-search/tokens/{id}` | Get a token |
| `client.api.aiSearchTokens.aiSearchUpdateTokens` | `PUT /accounts/{accountId}/ai-search/tokens/{id}` | Update a token |

## workersAi

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workersAi.workersAiSearchAuthor` | `GET /accounts/{accountId}/ai/authors/search` | Author Search |
| `client.api.workersAi.workersAiGetModelSchema` | `GET /accounts/{accountId}/ai/models/schema` | Get an AI model's input and output schemas |
| `client.api.workersAi.workersAiSearchModel` | `GET /accounts/{accountId}/ai/models/search` | Model Search |
| `client.api.workersAi.workersAiPostRunGeneric` | `POST /accounts/{accountId}/ai/run` | Run an AI model with request options |
| `client.api.workersAi.workersAiPostRunModel` | `POST /accounts/{accountId}/ai/run/{modelName}` | Run a Workers AI model |
| `client.api.workersAi.workersAiSearchTask` | `GET /accounts/{accountId}/ai/tasks/search` | Task Search |
| `client.api.workersAi.workersAiPostToMarkdown` | `POST /accounts/{accountId}/ai/tomarkdown` | Convert uploaded files to Markdown |
| `client.api.workersAi.workersAiGetToMarkdownSupported` | `GET /accounts/{accountId}/ai/tomarkdown/supported` | List supported Markdown conversion formats |

## workersAiFinetune

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workersAiFinetune.workersAiListFinetunes` | `GET /accounts/{accountId}/ai/finetunes` | List Finetunes |
| `client.api.workersAiFinetune.workersAiCreateFinetune` | `POST /accounts/{accountId}/ai/finetunes` | Create a new Finetune |
| `client.api.workersAiFinetune.workersAiListPublicFinetunes` | `GET /accounts/{accountId}/ai/finetunes/public` | List Public Finetunes |
| `client.api.workersAiFinetune.workersAiDeleteFinetune` | `DELETE /accounts/{accountId}/ai/finetunes/{finetuneId}` | Delete a Finetune |
| `client.api.workersAiFinetune.workersAiUploadFinetuneAsset` | `POST /accounts/{accountId}/ai/finetunes/{finetuneId}/finetune-assets` | Upload a Finetune Asset |

## finetuneAsset

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.finetuneAsset.workersAiDownloadFinetuneAsset` | `GET /accounts/{accountId}/ai/finetunes/{finetuneId}/finetune-assets/{fileName}` | Download a Finetune Asset |

## notificationAlertTypes

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.notificationAlertTypes.notificationAlertTypesGetAlertTypes` | `GET /accounts/{accountId}/alerting/v3/available_alerts` | Get Alert Types |

## notificationMechanismEligibility

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.notificationMechanismEligibility.notificationMechanismEligibilityGetDeliveryMechanismEligibility` | `GET /accounts/{accountId}/alerting/v3/destinations/eligible` | Get delivery mechanism eligibility |

## notificationDestinationsWithPagerduty

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.notificationDestinationsWithPagerduty.notificationDestinationsWithPagerDutyDeletePagerDutyServices` | `DELETE /accounts/{accountId}/alerting/v3/destinations/pagerduty` | Delete PagerDuty Services |
| `client.api.notificationDestinationsWithPagerduty.notificationDestinationsWithPagerDutyListPagerDutyServices` | `GET /accounts/{accountId}/alerting/v3/destinations/pagerduty` | List PagerDuty services |
| `client.api.notificationDestinationsWithPagerduty.notificationDestinationsWithPagerDutyConnectPagerDuty` | `POST /accounts/{accountId}/alerting/v3/destinations/pagerduty/connect` | Create PagerDuty integration token |
| `client.api.notificationDestinationsWithPagerduty.notificationDestinationsWithPagerDutyConnectPagerDutyToken` | `GET /accounts/{accountId}/alerting/v3/destinations/pagerduty/connect/{tokenId}` | Connect PagerDuty |

## notificationWebhooks

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.notificationWebhooks.notificationWebhooksListWebhooks` | `GET /accounts/{accountId}/alerting/v3/destinations/webhooks` | List webhooks |
| `client.api.notificationWebhooks.notificationWebhooksCreateAWebhook` | `POST /accounts/{accountId}/alerting/v3/destinations/webhooks` | Create a webhook |
| `client.api.notificationWebhooks.notificationWebhooksDeleteAWebhook` | `DELETE /accounts/{accountId}/alerting/v3/destinations/webhooks/{webhookId}` | Delete a webhook |
| `client.api.notificationWebhooks.notificationWebhooksGetAWebhook` | `GET /accounts/{accountId}/alerting/v3/destinations/webhooks/{webhookId}` | Get a webhook |
| `client.api.notificationWebhooks.notificationWebhooksUpdateAWebhook` | `PUT /accounts/{accountId}/alerting/v3/destinations/webhooks/{webhookId}` | Update a webhook |

## notificationHistory

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.notificationHistory.notificationHistoryListHistory` | `GET /accounts/{accountId}/alerting/v3/history` | List History |

## notificationPolicies

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.notificationPolicies.notificationPoliciesListNotificationPolicies` | `GET /accounts/{accountId}/alerting/v3/policies` | List Notification policies |
| `client.api.notificationPolicies.notificationPoliciesCreateANotificationPolicy` | `POST /accounts/{accountId}/alerting/v3/policies` | Create a Notification policy |
| `client.api.notificationPolicies.notificationPoliciesDeleteANotificationPolicy` | `DELETE /accounts/{accountId}/alerting/v3/policies/{policyId}` | Delete a Notification policy |
| `client.api.notificationPolicies.notificationPoliciesGetANotificationPolicy` | `GET /accounts/{accountId}/alerting/v3/policies/{policyId}` | Get a Notification policy |
| `client.api.notificationPolicies.notificationPoliciesUpdateANotificationPolicy` | `PUT /accounts/{accountId}/alerting/v3/policies/{policyId}` | Update a Notification policy |
| `client.api.notificationPolicies.notificationPoliciesShowEmailUnsubscribeDetails` | `GET /accounts/{accountId}/alerting/v3/policies/{policyId}/email/unsubscribe` | Show email unsubscribe details |
| `client.api.notificationPolicies.notificationPoliciesUnsubscribeEmailFromNotificationPolicy` | `POST /accounts/{accountId}/alerting/v3/policies/{policyId}/email/unsubscribe` | Unsubscribe email from a Notification policy |
| `client.api.notificationPolicies.notificationPoliciesTestANotificationPolicy` | `POST /accounts/{accountId}/alerting/v3/policies/{policyId}/test` | Test a Notification policy |

## notificationSilences

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.notificationSilences.notificationSilencesListSilences` | `GET /accounts/{accountId}/alerting/v3/silences` | List Silences |
| `client.api.notificationSilences.notificationSilencesCreateSilences` | `POST /accounts/{accountId}/alerting/v3/silences` | Create Silences |
| `client.api.notificationSilences.notificationSilencesUpdateSilences` | `PUT /accounts/{accountId}/alerting/v3/silences` | Update Silences |
| `client.api.notificationSilences.notificationSilencesDeleteSilences` | `DELETE /accounts/{accountId}/alerting/v3/silences/{silenceId}` | Delete Silence |
| `client.api.notificationSilences.notificationSilencesGetSilence` | `GET /accounts/{accountId}/alerting/v3/silences/{silenceId}` | Get Silence |

## dataSecurity

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dataSecurity.dataSecurityContentFindingsTopN` | `POST /accounts/{accountId}/analytics/query/data-security/content-findings/top-n` | Top integrations by content findings |
| `client.api.dataSecurity.dataSecurityFindingsSummary` | `POST /accounts/{accountId}/analytics/query/data-security/findings/summary` | Data security findings summary |
| `client.api.dataSecurity.dataSecurityFindingsTimeseries` | `POST /accounts/{accountId}/analytics/query/data-security/findings/timeseries` | Data security findings timeseries |

## artAnalytics

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.artAnalytics.artAnalyticsQuerySummary` | `POST /accounts/{accountId}/analytics/query/{dataset}/summary` | Query analytics summary |
| `client.api.artAnalytics.artAnalyticsQueryTimeseries` | `POST /accounts/{accountId}/analytics/query/{dataset}/timeseries` | Query analytics timeseries |
| `client.api.artAnalytics.artAnalyticsQueryTopN` | `POST /accounts/{accountId}/analytics/query/{dataset}/top-n` | Query analytics top-N |

## analyticsEngine

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.analyticsEngine.analyticsEngineSqlQueryGet` | `GET /accounts/{accountId}/analytics_engine/sql` | Execute an Analytics Engine SQL query via query parameter |
| `client.api.analyticsEngine.analyticsEngineSqlQueryPost` | `POST /accounts/{accountId}/analytics_engine/sql` | Execute an Analytics Engine SQL query via request body |

## artifacts

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.artifacts.artifactsNamespacesList` | `GET /accounts/{accountId}/artifacts/namespaces` | List namespaces |
| `client.api.artifacts.artifactsNamespacesCreate` | `POST /accounts/{accountId}/artifacts/namespaces` | Create a namespace |
| `client.api.artifacts.artifactsNamespacesDelete` | `DELETE /accounts/{accountId}/artifacts/namespaces/{namespace}` | Delete a namespace |
| `client.api.artifacts.artifactsNamespacesGet` | `GET /accounts/{accountId}/artifacts/namespaces/{namespace}` | Get a namespace |
| `client.api.artifacts.artifactsReposList` | `GET /accounts/{accountId}/artifacts/namespaces/{namespace}/repos` | List repositories |
| `client.api.artifacts.artifactsReposCreate` | `POST /accounts/{accountId}/artifacts/namespaces/{namespace}/repos` | Create a repository |
| `client.api.artifacts.artifactsReposDelete` | `DELETE /accounts/{accountId}/artifacts/namespaces/{namespace}/repos/{name}` | Delete a repository |
| `client.api.artifacts.artifactsReposGet` | `GET /accounts/{accountId}/artifacts/namespaces/{namespace}/repos/{name}` | Get a repository |
| `client.api.artifacts.artifactsReposBlobGet` | `GET /accounts/{accountId}/artifacts/namespaces/{namespace}/repos/{name}/blob/{hash}` | Read a Git blob |
| `client.api.artifacts.artifactsReposCommitGet` | `GET /accounts/{accountId}/artifacts/namespaces/{namespace}/repos/{name}/commit/{hash}` | Read a Git commit |
| `client.api.artifacts.artifactsReposFileGet` | `GET /accounts/{accountId}/artifacts/namespaces/{namespace}/repos/{name}/file` | Read a file |
| `client.api.artifacts.artifactsReposFork` | `POST /accounts/{accountId}/artifacts/namespaces/{namespace}/repos/{name}/fork` | Fork a repository |
| `client.api.artifacts.artifactsReposImport` | `POST /accounts/{accountId}/artifacts/namespaces/{namespace}/repos/{name}/import` | Import a repository |
| `client.api.artifacts.artifactsReposLogGet` | `GET /accounts/{accountId}/artifacts/namespaces/{namespace}/repos/{name}/log` | Read commit history |
| `client.api.artifacts.artifactsReposRawGet` | `GET /accounts/{accountId}/artifacts/namespaces/{namespace}/repos/{name}/raw/{ref}/{path}` | Read a raw file with content type |
| `client.api.artifacts.artifactsRepoTokensList` | `GET /accounts/{accountId}/artifacts/namespaces/{namespace}/repos/{name}/tokens` | List repository tokens |
| `client.api.artifacts.artifactsReposTreeGet` | `GET /accounts/{accountId}/artifacts/namespaces/{namespace}/repos/{name}/tree/{hash}` | Read a Git tree |
| `client.api.artifacts.artifactsTokensCreate` | `POST /accounts/{accountId}/artifacts/namespaces/{namespace}/tokens` | Create a repository token |
| `client.api.artifacts.artifactsTokensRevoke` | `DELETE /accounts/{accountId}/artifacts/namespaces/{namespace}/tokens/{id}` | Revoke a token |

## autoragRagSearch

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.autoragRagSearch.autoragConfigAiSearch` | `POST /accounts/{accountId}/autorag/rags/{id}/ai-search` | AI Search |
| `client.api.autoragRagSearch.autoragConfigSearch` | `POST /accounts/{accountId}/autorag/rags/{id}/search` | Search |

## autoragRag

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.autoragRag.autoragConfigFiles` | `GET /accounts/{accountId}/autorag/rags/{id}/files` | Files |
| `client.api.autoragRag.autoragConfigSync` | `PATCH /accounts/{accountId}/autorag/rags/{id}/sync` | Sync |

## autoragJobs

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.autoragJobs.autoragConfigListJobs` | `GET /accounts/{accountId}/autorag/rags/{id}/jobs` | List Jobs |
| `client.api.autoragJobs.autoragConfigGetJob` | `GET /accounts/{accountId}/autorag/rags/{id}/jobs/{jobId}` | Get a Job Details |
| `client.api.autoragJobs.autoragConfigListJobLogs` | `GET /accounts/{accountId}/autorag/rags/{id}/jobs/{jobId}/logs` | List Job Logs |

## basinCatalogManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.basinCatalogManagement.basinListCatalogs` | `GET /accounts/{accountId}/basin-catalog` | List Basin Catalogs |
| `client.api.basinCatalogManagement.basinGetCatalogDetails` | `GET /accounts/{accountId}/basin-catalog/{bucketName}` | Get Basin Catalog details |
| `client.api.basinCatalogManagement.basinDeleteCatalog` | `POST /accounts/{accountId}/basin-catalog/{bucketName}/delete` | Delete Basin Catalog metadata |
| `client.api.basinCatalogManagement.basinDisableCatalog` | `POST /accounts/{accountId}/basin-catalog/{bucketName}/disable` | Disable Basin Catalog |
| `client.api.basinCatalogManagement.basinEnableCatalog` | `POST /accounts/{accountId}/basin-catalog/{bucketName}/enable` | Enable R2 bucket as a catalog |

## credentialManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.credentialManagement.basinStoreCredentials` | `POST /accounts/{accountId}/basin-catalog/{bucketName}/credential` | Store catalog credentials |
| `client.api.credentialManagement.basinGetCredentialStatus` | `GET /accounts/{accountId}/basin-catalog/{bucketName}/credential/status` | Get Basin Catalog credential status |
| `client.api.credentialManagement.storeCredentials` | `POST /accounts/{accountId}/r2-catalog/{bucketName}/credential` | Store catalog credentials |
| `client.api.credentialManagement.getCredentialStatus` | `GET /accounts/{accountId}/r2-catalog/{bucketName}/credential/status` | Get catalog credential status |

## maintenanceConfiguration

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.maintenanceConfiguration.basinGetMaintenanceConfig` | `GET /accounts/{accountId}/basin-catalog/{bucketName}/maintenance-configs` | Get catalog maintenance configuration |
| `client.api.maintenanceConfiguration.basinUpdateMaintenanceConfig` | `POST /accounts/{accountId}/basin-catalog/{bucketName}/maintenance-configs` | Update catalog maintenance configuration |
| `client.api.maintenanceConfiguration.getMaintenanceConfig` | `GET /accounts/{accountId}/r2-catalog/{bucketName}/maintenance-configs` | Get catalog maintenance configuration |
| `client.api.maintenanceConfiguration.updateMaintenanceConfig` | `POST /accounts/{accountId}/r2-catalog/{bucketName}/maintenance-configs` | Update catalog maintenance configuration |

## namespaceManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.namespaceManagement.basinListNamespaces` | `GET /accounts/{accountId}/basin-catalog/{bucketName}/namespaces` | List namespaces in catalog |
| `client.api.namespaceManagement.listNamespaces` | `GET /accounts/{accountId}/r2-catalog/{bucketName}/namespaces` | List namespaces in catalog |

## tableManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.tableManagement.basinListTables` | `GET /accounts/{accountId}/basin-catalog/{bucketName}/namespaces/{namespace}/tables` | List tables in namespace |
| `client.api.tableManagement.basinGetTable` | `GET /accounts/{accountId}/basin-catalog/{bucketName}/namespaces/{namespace}/tables/{tableName}` | Get table details |
| `client.api.tableManagement.listTables` | `GET /accounts/{accountId}/r2-catalog/{bucketName}/namespaces/{namespace}/tables` | List tables in namespace |
| `client.api.tableManagement.getTable` | `GET /accounts/{accountId}/r2-catalog/{bucketName}/namespaces/{namespace}/tables/{tableName}` | Get table details |

## tableMaintenanceConfiguration

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.tableMaintenanceConfiguration.basinGetTableMaintenanceConfig` | `GET /accounts/{accountId}/basin-catalog/{bucketName}/namespaces/{namespace}/tables/{tableName}/maintenance-configs` | Get table maintenance configuration |
| `client.api.tableMaintenanceConfiguration.basinUpdateTableMaintenanceConfig` | `POST /accounts/{accountId}/basin-catalog/{bucketName}/namespaces/{namespace}/tables/{tableName}/maintenance-configs` | Update table maintenance configuration |
| `client.api.tableMaintenanceConfiguration.basinQueueTableMaintenance` | `POST /accounts/{accountId}/basin-catalog/{bucketName}/namespaces/{namespace}/tables/{tableName}/maintenance-configs/{configurationType}/queue` | Queue table maintenance |
| `client.api.tableMaintenanceConfiguration.basinListTableMaintenanceRuns` | `GET /accounts/{accountId}/basin-catalog/{bucketName}/namespaces/{namespace}/tables/{tableName}/maintenance-runs` | List table maintenance runs |
| `client.api.tableMaintenanceConfiguration.getTableMaintenanceConfig` | `GET /accounts/{accountId}/r2-catalog/{bucketName}/namespaces/{namespace}/tables/{tableName}/maintenance-configs` | Get table maintenance configuration |
| `client.api.tableMaintenanceConfiguration.updateTableMaintenanceConfig` | `POST /accounts/{accountId}/r2-catalog/{bucketName}/namespaces/{namespace}/tables/{tableName}/maintenance-configs` | Update table maintenance configuration |
| `client.api.tableMaintenanceConfiguration.queueTableMaintenance` | `POST /accounts/{accountId}/r2-catalog/{bucketName}/namespaces/{namespace}/tables/{tableName}/maintenance-configs/{configurationType}/queue` | Queue table maintenance |
| `client.api.tableMaintenanceConfiguration.listTableMaintenanceRuns` | `GET /accounts/{accountId}/r2-catalog/{bucketName}/namespaces/{namespace}/tables/{tableName}/maintenance-runs` | List table maintenance runs |

## billableUsage

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.billableUsage.billableUsageGetV1AccountUsage` | `GET /accounts/{accountId}/billable-usage` | Get Account Billable Usage (Version 1, Alpha) |
| `client.api.billableUsage.billableUsageGetV1AccountUsageInfo` | `GET /accounts/{accountId}/billable-usage/info` | Get Account Billable Usage Info (Version 1, Alpha) |

## billableUsageV2

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.billableUsageV2.billableUsageV2GetAccountUsage` | `GET /accounts/{accountId}/billable/usage` | Get Account Usage (Version 2, Alpha, Restricted) |
| `client.api.billableUsageV2.billableUsageV2QueryAccountUsage` | `POST /accounts/{accountId}/billable/usage` | Query Account Usage (Version 2, Alpha, Restricted) |
| `client.api.billableUsageV2.billableUsageV2GetAccountBillableMetrics` | `GET /accounts/{accountId}/billable/usage/billable-metrics` | List Account Billable Metrics (Version 2, Alpha, Restricted) |
| `client.api.billableUsageV2.billableUsageV2GetOrganizationUsage` | `GET /organizations/{organizationId}/billable/usage` | Get Organization Usage (Version 2, Alpha, Restricted) |

## accountBillingHistory

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountBillingHistory.accountBillingHistoryGetBillingHistory` | `GET /accounts/{accountId}/billing/history` | Get Account Billing History |

## accountBillingProfile

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountBillingProfile.accountBillingProfileDeleteBillingProfile` | `DELETE /accounts/{accountId}/billing/profile` | Delete Billing Profile |
| `client.api.accountBillingProfile.accountBillingProfileGetBillingProfile` | `GET /accounts/{accountId}/billing/profile` | Get Billing Profile |
| `client.api.accountBillingProfile.accountBillingProfileUpdateBillingEmail` | `PATCH /accounts/{accountId}/billing/profile` | Update Billing Email |
| `client.api.accountBillingProfile.accountBillingProfileCreateBillingProfile` | `POST /accounts/{accountId}/billing/profile` | Create Billing Profile |
| `client.api.accountBillingProfile.accountBillingProfileUpdateBillingProfile` | `PUT /accounts/{accountId}/billing/profile` | Update Billing Profile |

## spendPolicies

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.spendPolicies.spendPoliciesList` | `GET /accounts/{accountId}/billing/spend-policies` | List Spend Policies |
| `client.api.spendPolicies.spendPoliciesCreate` | `POST /accounts/{accountId}/billing/spend-policies` | Create Spend Policy |
| `client.api.spendPolicies.spendPoliciesActivity` | `GET /accounts/{accountId}/billing/spend-policies/activity` | List Spend Policy Activity |
| `client.api.spendPolicies.spendPoliciesDelete` | `DELETE /accounts/{accountId}/billing/spend-policies/{policyId}` | Delete Spend Policy |
| `client.api.spendPolicies.spendPoliciesGet` | `GET /accounts/{accountId}/billing/spend-policies/{policyId}` | Get Spend Policy |
| `client.api.spendPolicies.spendPoliciesUpdate` | `PUT /accounts/{accountId}/billing/spend-policies/{policyId}` | Update Spend Policy |
| `client.api.spendPolicies.spendPoliciesListAudit` | `GET /accounts/{accountId}/billing/spend-policies/{policyId}/audit` | List Spend Policy Audit Entries |

## usageAnalytics

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.usageAnalytics.usageAnalyticsGetAccountBillingUsage` | `GET /accounts/{accountId}/billing/usage` | Get account billing usage |
| `client.api.usageAnalytics.usageAnalyticsGetAccountMediaUsage` | `GET /accounts/{accountId}/media/usage` | Get account Media usage |
| `client.api.usageAnalytics.usageAnalyticsGetAccountStreamUsage` | `GET /accounts/{accountId}/stream/usage` | Get account Stream usage |
| `client.api.usageAnalytics.usageAnalyticsGetZoneMediaUsage` | `GET /zones/{zoneId}/media/usage` | Get zone Media usage |
| `client.api.usageAnalytics.usageAnalyticsGetZoneStreamUsage` | `GET /zones/{zoneId}/stream/usage` | Get zone Stream usage |

## botnetThreatFeed

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.botnetThreatFeed.botnetThreatFeedGetDayReport` | `GET /accounts/{accountId}/botnet_feed/asn/{asnId}/day_report` | Get daily report |
| `client.api.botnetThreatFeed.botnetThreatFeedGetFullReport` | `GET /accounts/{accountId}/botnet_feed/asn/{asnId}/full_report` | Get full report |
| `client.api.botnetThreatFeed.botnetThreatFeedListAsn` | `GET /accounts/{accountId}/botnet_feed/configs/asn` | Get list of ASNs |
| `client.api.botnetThreatFeed.botnetThreatFeedDeleteAsn` | `DELETE /accounts/{accountId}/botnet_feed/configs/asn/{asnId}` | Delete an ASN |

## domainSearch

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.domainSearch.getAccountsAccountIdBrandProtectionMatches` | `GET /accounts/{accountId}/brand-protection/matches` | Read matches for string queries by ID |
| `client.api.domainSearch.getAccountsAccountIdBrandProtectionMatchesDownload` | `GET /accounts/{accountId}/brand-protection/matches/download` | Download matches for string queries by ID |
| `client.api.domainSearch.deleteAccountsAccountIdBrandProtectionQueries` | `DELETE /accounts/{accountId}/brand-protection/queries` | Delete saved string queries by ID |
| `client.api.domainSearch.getAccountsAccountIdBrandProtectionQueries` | `GET /accounts/{accountId}/brand-protection/queries` | Read string queries by ID |
| `client.api.domainSearch.patchAccountsAccountIdBrandProtectionQueries` | `PATCH /accounts/{accountId}/brand-protection/queries` | Update saved string queries by ID |
| `client.api.domainSearch.postAccountsAccountIdBrandProtectionQueries` | `POST /accounts/{accountId}/brand-protection/queries` | Create new saved string queries |
| `client.api.domainSearch.postAccountsAccountIdBrandProtectionQueriesBulk` | `POST /accounts/{accountId}/brand-protection/queries/bulk` | Create new saved string queries in bulk |
| `client.api.domainSearch.postAccountsAccountIdBrandProtectionQueriesQueryIdMatchesDomainIdDismiss` | `POST /accounts/{accountId}/brand-protection/queries/{queryId}/matches/{domainId}/dismiss` | Dismiss a match for a saved string query |
| `client.api.domainSearch.postAccountsAccountIdBrandProtectionQueriesQueryIdMatchesDomainIdUndismiss` | `POST /accounts/{accountId}/brand-protection/queries/{queryId}/matches/{domainId}/undismiss` | Undismiss a match for a saved string query |
| `client.api.domainSearch.postAccountsAccountIdBrandProtectionSearch` | `POST /accounts/{accountId}/brand-protection/search` | Create new string queries |
| `client.api.domainSearch.getAccountsAccountIdBrandProtectionTotalQueries` | `GET /accounts/{accountId}/brand-protection/total-queries` | Read the total number of saved string queries |

## browserExtensionConfig

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.browserExtensionConfig.accountsBrowserExtensionConfigDelete` | `DELETE /accounts/{accountId}/browser-extension/config` | Delete browser extension configuration |
| `client.api.browserExtensionConfig.accountsBrowserExtensionConfigGet` | `GET /accounts/{accountId}/browser-extension/config` | Get browser extension configuration |
| `client.api.browserExtensionConfig.accountsBrowserExtensionConfigPost` | `POST /accounts/{accountId}/browser-extension/config` | Create browser extension configuration |
| `client.api.browserExtensionConfig.accountsBrowserExtensionConfigPut` | `PUT /accounts/{accountId}/browser-extension/config` | Update browser extension configuration |
| `client.api.browserExtensionConfig.accountsBrowserExtensionConfigExtensionEventsSearch` | `POST /accounts/{accountId}/browser-extension/config/logs/extension-events/search` | Search browser extension event logs |
| `client.api.browserExtensionConfig.accountsBrowserExtensionConfigExtensionEventsTimeseries` | `POST /accounts/{accountId}/browser-extension/config/logs/extension-events/timeseries` | Query browser extension event timeseries |

## browserExtensionInventories

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.browserExtensionInventories.accountsBrowserExtensionInventoriesList` | `GET /accounts/{accountId}/browser-extension/config/inventories` | List browser extension inventories |
| `client.api.browserExtensionInventories.accountsBrowserExtensionInventoriesGet` | `GET /accounts/{accountId}/browser-extension/config/inventories/{registrationId}` | Get a single browser extension inventory |

## brapi

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.brapi.brapiPostAccessibilityTree` | `POST /accounts/{accountId}/browser-rendering/accessibilityTree` | Get accessibility tree page |
| `client.api.brapi.brapiPostContent` | `POST /accounts/{accountId}/browser-rendering/content` | Get HTML content. |
| `client.api.brapi.brapiPostCrawl` | `POST /accounts/{accountId}/browser-rendering/crawl` | Crawl websites. |
| `client.api.brapi.brapiDeleteCancelCrawl` | `DELETE /accounts/{accountId}/browser-rendering/crawl/{jobId}` | Cancel a crawl job. |
| `client.api.brapi.brapiGetCrawlResult` | `GET /accounts/{accountId}/browser-rendering/crawl/{jobId}` | Get crawl result. |
| `client.api.brapi.brapiPostDevtoolsAcquire` | `POST /accounts/{accountId}/browser-rendering/devtools/browser` | Get a browser session ID. |
| `client.api.brapi.brapiDeleteDevtoolsBrowserDelete` | `DELETE /accounts/{accountId}/browser-rendering/devtools/browser/{sessionId}` | Close browser session. |
| `client.api.brapi.brapiGetDevtoolsJson` | `GET /accounts/{accountId}/browser-rendering/devtools/browser/{sessionId}/json` | List targets. |
| `client.api.brapi.brapiGetDevtoolsJsonActivate` | `GET /accounts/{accountId}/browser-rendering/devtools/browser/{sessionId}/json/activate/{targetId}` | Activate a browser target. |
| `client.api.brapi.brapiGetDevtoolsJsonClose` | `GET /accounts/{accountId}/browser-rendering/devtools/browser/{sessionId}/json/close/{targetId}` | Close a browser target. |
| `client.api.brapi.brapiGetDevtoolsJsonList` | `GET /accounts/{accountId}/browser-rendering/devtools/browser/{sessionId}/json/list` | List targets. |
| `client.api.brapi.brapiGetDevtoolsJsonTarget` | `GET /accounts/{accountId}/browser-rendering/devtools/browser/{sessionId}/json/list/{targetId}` | Get a target by ID. |
| `client.api.brapi.brapiPutDevtoolsJsonNew` | `PUT /accounts/{accountId}/browser-rendering/devtools/browser/{sessionId}/json/new` | Open a new browser tab. |
| `client.api.brapi.brapiGetDevtoolsJsonProtocol` | `GET /accounts/{accountId}/browser-rendering/devtools/browser/{sessionId}/json/protocol` | Get Chrome DevTools Protocol schema. |
| `client.api.brapi.brapiGetDevtoolsJsonVersion` | `GET /accounts/{accountId}/browser-rendering/devtools/browser/{sessionId}/json/version` | Get browser version metadata. |
| `client.api.brapi.brapiPostDevtoolsLiveView` | `POST /accounts/{accountId}/browser-rendering/devtools/browser/{sessionId}/live_view` | Mint live view URLs for a browser session |
| `client.api.brapi.brapiGetDevtoolsSessionList` | `GET /accounts/{accountId}/browser-rendering/devtools/session` | List sessions. |
| `client.api.brapi.brapiGetDevtoolsSessionDetails` | `GET /accounts/{accountId}/browser-rendering/devtools/session/{sessionId}` | Get session details. |
| `client.api.brapi.brapiPostJson` | `POST /accounts/{accountId}/browser-rendering/json` | Get json. |
| `client.api.brapi.brapiPostLinks` | `POST /accounts/{accountId}/browser-rendering/links` | Get Links. |
| `client.api.brapi.brapiPostMarkdown` | `POST /accounts/{accountId}/browser-rendering/markdown` | Get markdown. |
| `client.api.brapi.brapiPostPdf` | `POST /accounts/{accountId}/browser-rendering/pdf` | Get PDF. |
| `client.api.brapi.brapiGetRecording` | `GET /accounts/{accountId}/browser-rendering/recording/{sessionId}` | Get recording data. |
| `client.api.brapi.brapiGetRecordingNetwork` | `GET /accounts/{accountId}/browser-rendering/recording/{sessionId}/network` | Get network recording data. |
| `client.api.brapi.brapiPostScrape` | `POST /accounts/{accountId}/browser-rendering/scrape` | Scrape elements. |
| `client.api.brapi.brapiPostScreenshot` | `POST /accounts/{accountId}/browser-rendering/screenshot` | Get screenshot. |
| `client.api.brapi.brapiPostSnapshot` | `POST /accounts/{accountId}/browser-rendering/snapshot` | Get HTML content and screenshot. |

## builds

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.builds.getBuildsByVersionIds` | `GET /accounts/{accountId}/builds/builds` | Get builds by Worker version |
| `client.api.builds.getLatestBuildsByScripts` | `GET /accounts/{accountId}/builds/builds/latest` | Get latest builds by script IDs |
| `client.api.builds.getBuildByUuid` | `GET /accounts/{accountId}/builds/builds/{buildUuid}` | Get a Workers build |
| `client.api.builds.cancelBuildByUuid` | `PUT /accounts/{accountId}/builds/builds/{buildUuid}/cancel` | Cancel a Workers build |
| `client.api.builds.getBuildLogs` | `GET /accounts/{accountId}/builds/builds/{buildUuid}/logs` | Get Workers build logs |

## repositoryConnections

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.repositoryConnections.upsertRepoConnection` | `PUT /accounts/{accountId}/builds/repos/connections` | Create or update a repository connection |
| `client.api.repositoryConnections.deleteRepoConnection` | `DELETE /accounts/{accountId}/builds/repos/connections/{repoConnectionUuid}` | Delete a repository connection |

## githubIntegration

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.githubIntegration.getWorkerConfigAutofill` | `GET /accounts/{accountId}/builds/repos/{providerType}/{providerAccountId}/{repoId}/config_autofill` | Get repository configuration autofill |

## buildTokens

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.buildTokens.listBuildTokens` | `GET /accounts/{accountId}/builds/tokens` | List build tokens |
| `client.api.buildTokens.createBuildToken` | `POST /accounts/{accountId}/builds/tokens` | Create build token |
| `client.api.buildTokens.deleteBuildToken` | `DELETE /accounts/{accountId}/builds/tokens/{buildTokenUuid}` | Delete a build token |

## triggers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.triggers.createTrigger` | `POST /accounts/{accountId}/builds/triggers` | Create a build trigger |
| `client.api.triggers.deleteTrigger` | `DELETE /accounts/{accountId}/builds/triggers/{triggerUuid}` | Delete a build trigger |
| `client.api.triggers.updateTrigger` | `PATCH /accounts/{accountId}/builds/triggers/{triggerUuid}` | Update a build trigger |
| `client.api.triggers.createManualBuild` | `POST /accounts/{accountId}/builds/triggers/{triggerUuid}/builds` | Start a Workers build |
| `client.api.triggers.purgeBuildCache` | `POST /accounts/{accountId}/builds/triggers/{triggerUuid}/purge_build_cache` | Purge a trigger's build cache |

## environmentVariables

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.environmentVariables.listEnvironmentVariables` | `GET /accounts/{accountId}/builds/triggers/{triggerUuid}/environment_variables` | List build variables |
| `client.api.environmentVariables.upsertEnvironmentVariables` | `PATCH /accounts/{accountId}/builds/triggers/{triggerUuid}/environment_variables` | Set build variables |
| `client.api.environmentVariables.deleteEnvironmentVariable` | `DELETE /accounts/{accountId}/builds/triggers/{triggerUuid}/environment_variables/{environmentVariableKey}` | Delete a build variable |

## workers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workers.createWorkerBuild` | `POST /accounts/{accountId}/builds/workers` | Create Worker build configuration |
| `client.api.workers.listBuildsByScript` | `GET /accounts/{accountId}/builds/workers/{externalScriptId}/builds` | List builds for a Worker |
| `client.api.workers.listTriggersByScript` | `GET /accounts/{accountId}/builds/workers/{externalScriptId}/triggers` | List triggers for a Worker |
| `client.api.workers.deleteWorkerBuild` | `DELETE /accounts/{accountId}/builds/workers/{scriptTag}` | Delete Worker build configuration |
| `client.api.workers.getWorkerBuild` | `GET /accounts/{accountId}/builds/workers/{scriptTag}` | Get Worker build configuration |
| `client.api.workers.updateWorkerBuild` | `PATCH /accounts/{accountId}/builds/workers/{scriptTag}` | Update Worker build configuration |
| `client.api.workers.migrateWorkerToPreviews` | `POST /accounts/{accountId}/builds/workers/{scriptTag}/migrate_to_previews` | Migrate worker to previews |
| `client.api.workers.listWorkerPreviews` | `GET /accounts/{accountId}/builds/workers/{scriptTag}/previews` | List previews |
| `client.api.workers.getWorkerPreview` | `GET /accounts/{accountId}/builds/workers/{scriptTag}/previews/{previewId}` | Get preview |
| `client.api.workers.updateWorkerPreview` | `PATCH /accounts/{accountId}/builds/workers/{scriptTag}/previews/{previewId}` | Update preview |
| `client.api.workers.listBuildsByPreview` | `GET /accounts/{accountId}/builds/workers/{scriptTag}/previews/{previewId}/builds` | List builds by preview |
| `client.api.workers.createPreviewBuild` | `POST /accounts/{accountId}/builds/workers/{scriptTag}/previews/{previewId}/builds` | Create preview build |
| `client.api.workers.listWorkers` | `GET /accounts/{accountId}/workers/workers` | List Workers |
| `client.api.workers.createWorker` | `POST /accounts/{accountId}/workers/workers` | Create Worker |
| `client.api.workers.deleteWorker` | `DELETE /accounts/{accountId}/workers/workers/{workerId}` | Delete Worker |
| `client.api.workers.getWorker` | `GET /accounts/{accountId}/workers/workers/{workerId}` | Get Worker |
| `client.api.workers.editWorker` | `PATCH /accounts/{accountId}/workers/workers/{workerId}` | Edit Worker |
| `client.api.workers.updateWorker` | `PUT /accounts/{accountId}/workers/workers/{workerId}` | Update Worker |

## deployHooks

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.deployHooks.listDeployHooks` | `GET /accounts/{accountId}/builds/workers/{scriptName}/deploy_hooks` | List deploy hooks |
| `client.api.deployHooks.createDeployHook` | `POST /accounts/{accountId}/builds/workers/{scriptName}/deploy_hooks` | Create a deploy hook |
| `client.api.deployHooks.deleteDeployHook` | `DELETE /accounts/{accountId}/builds/workers/{scriptName}/deploy_hooks/{deployHookUuid}` | Delete a deploy hook |
| `client.api.deployHooks.getDeployHook` | `GET /accounts/{accountId}/builds/workers/{scriptName}/deploy_hooks/{deployHookUuid}` | Get a deploy hook |
| `client.api.deployHooks.updateDeployHook` | `PUT /accounts/{accountId}/builds/workers/{scriptName}/deploy_hooks/{deployHookUuid}` | Update a deploy hook |
| `client.api.deployHooks.triggerDeployHook` | `POST /workers/builds/deploy_hooks/{deployHookUuid}` | Trigger deploy hook |

## accountSubscriptions

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountSubscriptions.accountSubscriptionsBulkCreateSubscription` | `POST /accounts/{accountId}/bulk/subscriptions` | Create Subscriptions |
| `client.api.accountSubscriptions.accountSubscriptionsListSubscriptions` | `GET /accounts/{accountId}/subscriptions` | List Subscriptions |
| `client.api.accountSubscriptions.accountSubscriptionsCreateSubscription` | `POST /accounts/{accountId}/subscriptions` | Create Subscription |
| `client.api.accountSubscriptions.accountSubscriptionsCancelDelayedDowngrade` | `POST /accounts/{accountId}/subscriptions/cancel-downgrade` | Cancel Delayed Downgrade |
| `client.api.accountSubscriptions.accountSubscriptionsDeleteSubscription` | `DELETE /accounts/{accountId}/subscriptions/{subscriptionIdentifier}` | Delete Subscription |
| `client.api.accountSubscriptions.accountSubscriptionsGetSubscription` | `GET /accounts/{accountId}/subscriptions/{subscriptionIdentifier}` | Get Subscription |
| `client.api.accountSubscriptions.accountSubscriptionsUpdateSubscription` | `PUT /accounts/{accountId}/subscriptions/{subscriptionIdentifier}` | Update Subscription |
| `client.api.accountSubscriptions.accountSubscriptionsActionAppendSubscription` | `POST /accounts/{accountId}/subscriptions/{subscriptionIdentifier}/action/append` | Append Subscription Action |
| `client.api.accountSubscriptions.accountSubscriptionsGetCancelReason` | `GET /accounts/{accountId}/subscriptions/{subscriptionIdentifier}/cancel-reason` | Get Cancel Reason |
| `client.api.accountSubscriptions.accountSubscriptionsCreateCancelReason` | `POST /accounts/{accountId}/subscriptions/{subscriptionIdentifier}/cancel-reason` | Create Cancel Reason |

## realtimeSfuApps

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.realtimeSfuApps.callsAppsList` | `GET /accounts/{accountId}/calls/apps` | List apps |
| `client.api.realtimeSfuApps.callsAppsCreateANewApp` | `POST /accounts/{accountId}/calls/apps` | Create an SFU app |
| `client.api.realtimeSfuApps.callsAppsDeleteApp` | `DELETE /accounts/{accountId}/calls/apps/{appId}` | Delete an SFU app |
| `client.api.realtimeSfuApps.callsAppsRetrieveAppDetails` | `GET /accounts/{accountId}/calls/apps/{appId}` | Retrieve SFU app details |
| `client.api.realtimeSfuApps.callsAppsUpdateAppDetails` | `PUT /accounts/{accountId}/calls/apps/{appId}` | Update SFU app details |

## realtimeTurnKeys

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.realtimeTurnKeys.callsTurnKeyList` | `GET /accounts/{accountId}/calls/turn_keys` | List TURN keys |
| `client.api.realtimeTurnKeys.callsTurnKeyCreate` | `POST /accounts/{accountId}/calls/turn_keys` | Create a TURN key |
| `client.api.realtimeTurnKeys.callsDeleteTurnKey` | `DELETE /accounts/{accountId}/calls/turn_keys/{keyId}` | Delete TURN key |
| `client.api.realtimeTurnKeys.callsRetrieveTurnKeyDetails` | `GET /accounts/{accountId}/calls/turn_keys/{keyId}` | Retrieve TURN key details |
| `client.api.realtimeTurnKeys.callsUpdateTurnKey` | `PUT /accounts/{accountId}/calls/turn_keys/{keyId}` | Update TURN key details |

## cloudflareTunnel

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cloudflareTunnel.cloudflareTunnelListCloudflareTunnels` | `GET /accounts/{accountId}/cfd_tunnel` | List Cloudflare Tunnels |
| `client.api.cloudflareTunnel.cloudflareTunnelCreateACloudflareTunnel` | `POST /accounts/{accountId}/cfd_tunnel` | Create a Cloudflare Tunnel |
| `client.api.cloudflareTunnel.cloudflareTunnelDeleteACloudflareTunnel` | `DELETE /accounts/{accountId}/cfd_tunnel/{tunnelId}` | Delete a Cloudflare Tunnel |
| `client.api.cloudflareTunnel.cloudflareTunnelGetACloudflareTunnel` | `GET /accounts/{accountId}/cfd_tunnel/{tunnelId}` | Get a Cloudflare Tunnel |
| `client.api.cloudflareTunnel.cloudflareTunnelUpdateACloudflareTunnel` | `PATCH /accounts/{accountId}/cfd_tunnel/{tunnelId}` | Update a Cloudflare Tunnel |
| `client.api.cloudflareTunnel.cloudflareTunnelCleanUpCloudflareTunnelConnections` | `DELETE /accounts/{accountId}/cfd_tunnel/{tunnelId}/connections` | Clean up Cloudflare Tunnel connections |
| `client.api.cloudflareTunnel.cloudflareTunnelListCloudflareTunnelConnections` | `GET /accounts/{accountId}/cfd_tunnel/{tunnelId}/connections` | List Cloudflare Tunnel connections |
| `client.api.cloudflareTunnel.cloudflareTunnelGetCloudflareTunnelConnector` | `GET /accounts/{accountId}/cfd_tunnel/{tunnelId}/connectors/{connectorId}` | Get Cloudflare Tunnel connector |
| `client.api.cloudflareTunnel.cloudflareTunnelGetACloudflareTunnelManagementToken` | `POST /accounts/{accountId}/cfd_tunnel/{tunnelId}/management` | Get a Cloudflare Tunnel management token |
| `client.api.cloudflareTunnel.cloudflareTunnelGetACloudflareTunnelToken` | `GET /accounts/{accountId}/cfd_tunnel/{tunnelId}/token` | Get a Cloudflare Tunnel token |
| `client.api.cloudflareTunnel.cloudflareTunnelListAllTunnels` | `GET /accounts/{accountId}/tunnels` | List All Tunnels |
| `client.api.cloudflareTunnel.cloudflareTunnelListWarpConnectorTunnels` | `GET /accounts/{accountId}/warp_connector` | List Mesh nodes |
| `client.api.cloudflareTunnel.cloudflareTunnelCreateAWarpConnectorTunnel` | `POST /accounts/{accountId}/warp_connector` | Create a Mesh node |
| `client.api.cloudflareTunnel.cloudflareTunnelDeleteAWarpConnectorTunnel` | `DELETE /accounts/{accountId}/warp_connector/{tunnelId}` | Delete a Mesh node |
| `client.api.cloudflareTunnel.cloudflareTunnelGetAWarpConnectorTunnel` | `GET /accounts/{accountId}/warp_connector/{tunnelId}` | Get a Mesh node |
| `client.api.cloudflareTunnel.cloudflareTunnelUpdateAWarpConnectorTunnel` | `PATCH /accounts/{accountId}/warp_connector/{tunnelId}` | Update a Mesh node |
| `client.api.cloudflareTunnel.cloudflareTunnelListWarpConnectorTunnelConnections` | `GET /accounts/{accountId}/warp_connector/{tunnelId}/connections` | List Mesh node connections |
| `client.api.cloudflareTunnel.cloudflareTunnelGetWarpConnectorTunnelConnector` | `GET /accounts/{accountId}/warp_connector/{tunnelId}/connectors/{connectorId}` | Get a Mesh node connector |
| `client.api.cloudflareTunnel.cloudflareTunnelManualFailoverWarpConnectorTunnel` | `PUT /accounts/{accountId}/warp_connector/{tunnelId}/failover` | Trigger a manual failover for a Mesh node |
| `client.api.cloudflareTunnel.cloudflareTunnelGetAWarpConnectorTunnelToken` | `GET /accounts/{accountId}/warp_connector/{tunnelId}/token` | Get a Mesh node token |

## cloudflareTunnelConfiguration

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cloudflareTunnelConfiguration.cloudflareTunnelConfigurationGetConfiguration` | `GET /accounts/{accountId}/cfd_tunnel/{tunnelId}/configurations` | Get Tunnel configuration |
| `client.api.cloudflareTunnelConfiguration.cloudflareTunnelConfigurationPutConfiguration` | `PUT /accounts/{accountId}/cfd_tunnel/{tunnelId}/configurations` | Update Tunnel configuration |
| `client.api.cloudflareTunnelConfiguration.cloudflareTunnelConfigurationGetWarpConnectorConfiguration` | `GET /accounts/{accountId}/warp_connector/{tunnelId}/configurations` | Get Mesh node HA configuration |
| `client.api.cloudflareTunnelConfiguration.cloudflareTunnelConfigurationUpdateWarpConnectorConfiguration` | `PUT /accounts/{accountId}/warp_connector/{tunnelId}/configurations` | Update Mesh node HA configuration |

## turnstile

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.turnstile.accountsTurnstileWidgetsList` | `GET /accounts/{accountId}/challenges/widgets` | List Turnstile Widgets |
| `client.api.turnstile.accountsTurnstileWidgetCreate` | `POST /accounts/{accountId}/challenges/widgets` | Create a Turnstile Widget |
| `client.api.turnstile.accountsTurnstileWidgetDelete` | `DELETE /accounts/{accountId}/challenges/widgets/{sitekey}` | Delete a Turnstile Widget |
| `client.api.turnstile.accountsTurnstileWidgetGet` | `GET /accounts/{accountId}/challenges/widgets/{sitekey}` | Turnstile Widget Details |
| `client.api.turnstile.accountsTurnstileWidgetUpdate` | `PUT /accounts/{accountId}/challenges/widgets/{sitekey}` | Update a Turnstile Widget |
| `client.api.turnstile.accountsTurnstileWidgetRotateSecret` | `POST /accounts/{accountId}/challenges/widgets/{sitekey}/rotate_secret` | Rotate Secret for a Turnstile Widget |

## scans

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.scans.getGetBanners` | `GET /accounts/{accountId}/cloudforce-one/banner/{configId}` | Get the Latest Banner Grab Result |
| `client.api.scans.getConfigFetch` | `GET /accounts/{accountId}/cloudforce-one/scans/config` | List Scan Configs |
| `client.api.scans.postConfigCreate` | `POST /accounts/{accountId}/cloudforce-one/scans/config` | Create a new Scan Config |
| `client.api.scans.deleteDeleteScans` | `DELETE /accounts/{accountId}/cloudforce-one/scans/config/{configId}` | Delete a Scan Config |
| `client.api.scans.postConfigUpdate` | `PATCH /accounts/{accountId}/cloudforce-one/scans/config/{configId}` | Update an existing Scan Config |
| `client.api.scans.getGetOpenPorts` | `GET /accounts/{accountId}/cloudforce-one/scans/results/{configId}` | Get the Latest Scan Result |
| `client.api.scans.listScans` | `GET /accounts/{accountId}/vuln_scanner/scans` | List scans |
| `client.api.scans.createScan` | `POST /accounts/{accountId}/vuln_scanner/scans` | Create scan |
| `client.api.scans.deleteScan` | `DELETE /accounts/{accountId}/vuln_scanner/scans/{scanId}` | Delete scan |
| `client.api.scans.getScan` | `GET /accounts/{accountId}/vuln_scanner/scans/{scanId}` | Get scan |

## bindb

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.bindb.postBinDBPost` | `POST /accounts/{accountId}/cloudforce-one/binary` | Posts a file to Binary Storage |
| `client.api.bindb.getBinDBGetBinary` | `GET /accounts/{accountId}/cloudforce-one/binary/{hash}` | Retrieves a file from Binary Storage |

## event

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.event.getEventListGet` | `GET /accounts/{accountId}/cloudforce-one/events` | List events |
| `client.api.event.postEventList` | `POST /accounts/{accountId}/cloudforce-one/events` | Search events |
| `client.api.event.getEventAggregate` | `GET /accounts/{accountId}/cloudforce-one/events/aggregate` | Aggregate events |
| `client.api.event.getEventRelationships` | `GET /accounts/{accountId}/cloudforce-one/events/by-id/{eventId}/relationships` | List related events |
| `client.api.event.postEventCreate` | `POST /accounts/{accountId}/cloudforce-one/events/create` | Create an event |
| `client.api.event.postEventCreateBulk` | `POST /accounts/{accountId}/cloudforce-one/events/create/bulk` | Create events in bulk |
| `client.api.event.postDOSEventCreateBulkWithRelationships` | `POST /accounts/{accountId}/cloudforce-one/events/create/bulk/relationships` | Create events with relationships in bulk (legacy) |
| `client.api.event.postEventCopyToNewDS` | `POST /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/copy` | Copy events to another dataset |
| `client.api.event.getEventRead` | `GET /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/events/{eventId}` | Get an event |
| `client.api.event.postEventMoveToNewDS` | `POST /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/move` | Move events to another dataset |
| `client.api.event.deleteEventDelete` | `DELETE /accounts/{accountId}/cloudforce-one/events/datasets/{datasetId}/events` | Delete events |
| `client.api.event.getEventRawReadDS` | `GET /accounts/{accountId}/cloudforce-one/events/datasets/{datasetId}/events/{eventId}/raw` | Get raw data for an event |
| `client.api.event.deleteEventTagDelete` | `DELETE /accounts/{accountId}/cloudforce-one/events/event_tag/{eventId}` | Remove tags from an event (legacy) |
| `client.api.event.postEventTagCreate` | `POST /accounts/{accountId}/cloudforce-one/events/event_tag/{eventId}/create` | Add tags to an event (legacy) |
| `client.api.event.postEventGraphQL` | `POST /accounts/{accountId}/cloudforce-one/events/graphql` | Run a GraphQL aggregation over events |
| `client.api.event.getEventQueryList` | `GET /accounts/{accountId}/cloudforce-one/events/queries` | List saved event queries |
| `client.api.event.postEventQueryCreate` | `POST /accounts/{accountId}/cloudforce-one/events/queries/create` | Create a saved event query |
| `client.api.event.deleteEventQueryDelete` | `DELETE /accounts/{accountId}/cloudforce-one/events/queries/{queryId}` | Delete a saved event query |
| `client.api.event.getEventQueryRead` | `GET /accounts/{accountId}/cloudforce-one/events/queries/{queryId}` | Get a saved event query |
| `client.api.event.patchEventQueryUpdate` | `PATCH /accounts/{accountId}/cloudforce-one/events/queries/{queryId}` | Update a saved event query |
| `client.api.event.postEventQueryUpdate` | `POST /accounts/{accountId}/cloudforce-one/events/queries/{queryId}` | Update a saved event query |
| `client.api.event.getLegacyEventRawReadDS` | `GET /accounts/{accountId}/cloudforce-one/events/raw/{datasetId}/{eventId}` | Get raw data for an event (legacy) |
| `client.api.event.deleteEventReferenceDelete` | `DELETE /accounts/{accountId}/cloudforce-one/events/relate/{eventId}` | Remove event references (legacy) |
| `client.api.event.postEventReferenceCreate` | `POST /accounts/{accountId}/cloudforce-one/events/relate/{eventId}/create` | Add event references (legacy) |
| `client.api.event.postCreateEventRelationship` | `POST /accounts/{accountId}/cloudforce-one/events/relationships/create` | Create event relationships |
| `client.api.event.patchEventUpdateBulk` | `PATCH /accounts/{accountId}/cloudforce-one/events/update/bulk` | Update events in bulk |
| `client.api.event.deleteLegacyEventDelete` | `DELETE /accounts/{accountId}/cloudforce-one/events/{datasetId}/delete` | Delete events (legacy) |
| `client.api.event.getEventReadDeprecated` | `GET /accounts/{accountId}/cloudforce-one/events/{eventId}` | Get an event (legacy) |
| `client.api.event.patchEventUpdate` | `PATCH /accounts/{accountId}/cloudforce-one/events/{eventId}` | Update an event |
| `client.api.event.postEventUpdate` | `POST /accounts/{accountId}/cloudforce-one/events/{eventId}` | Update an event |
| `client.api.event.getEventRawRead` | `GET /accounts/{accountId}/cloudforce-one/events/{eventId}/raw/{rawId}` | Get raw event data by raw ID (legacy) |
| `client.api.event.patchEventRawUpdate` | `PATCH /accounts/{accountId}/cloudforce-one/events/{eventId}/raw/{rawId}` | Update raw event data by raw ID (legacy) |
| `client.api.event.postEventRawUpdate` | `POST /accounts/{accountId}/cloudforce-one/events/{eventId}/raw/{rawId}` | Update raw event data by raw ID (legacy) |
| `client.api.event.getLegacyEventRelationships` | `GET /accounts/{accountId}/cloudforce-one/events/{eventId}/relationships` | List related events (legacy) |
| `client.api.event.postEventGraphQLV2` | `POST /accounts/{accountId}/cloudforce-one/v2/events/graphql` | Run a GraphQL aggregation over events (legacy) |

## attacker

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.attacker.getAttackerList` | `GET /accounts/{accountId}/cloudforce-one/events/attackers` | List attackers |

## category

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.category.getCategoryList` | `GET /accounts/{accountId}/cloudforce-one/events/categories` | List event categories used in datasets |
| `client.api.category.getCategoryListComplete` | `GET /accounts/{accountId}/cloudforce-one/events/categories/catalog` | List all event categories |
| `client.api.category.postCategoryCreate` | `POST /accounts/{accountId}/cloudforce-one/events/categories/create` | Create an event category |
| `client.api.category.deleteLegacyCategoryDelete` | `DELETE /accounts/{accountId}/cloudforce-one/events/categories/{categoryId}` | Delete an event category (legacy) |
| `client.api.category.getLegacyCategoryRead` | `GET /accounts/{accountId}/cloudforce-one/events/categories/{categoryId}` | Get an event category (legacy) |
| `client.api.category.patchLegacyCategoryUpdate` | `PATCH /accounts/{accountId}/cloudforce-one/events/categories/{categoryId}` | Update an event category (legacy) |
| `client.api.category.postLegacyCategoryUpdate` | `POST /accounts/{accountId}/cloudforce-one/events/categories/{categoryId}` | Update an event category (legacy) |
| `client.api.category.deleteCategoryDelete` | `DELETE /accounts/{accountId}/cloudforce-one/events/event-categories/by-id/{categoryId}` | Delete an event category |
| `client.api.category.getCategoryRead` | `GET /accounts/{accountId}/cloudforce-one/events/event-categories/by-id/{categoryId}` | Get an event category |
| `client.api.category.patchCategoryUpdate` | `PATCH /accounts/{accountId}/cloudforce-one/events/event-categories/by-id/{categoryId}` | Update an event category |
| `client.api.category.postCategoryUpdate` | `POST /accounts/{accountId}/cloudforce-one/events/event-categories/by-id/{categoryId}` | Update an event category |
| `client.api.category.getResourceLibraryCategories` | `GET /accounts/{accountId}/resource-library/categories` | List application categories |
| `client.api.category.getResourceLibraryCategoryById` | `GET /accounts/{accountId}/resource-library/categories/{id}` | Get application category |

## country

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.country.getCountryRead` | `GET /accounts/{accountId}/cloudforce-one/events/countries` | List countries |

## dataset

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dataset.getDatasetList` | `GET /accounts/{accountId}/cloudforce-one/events/dataset` | List datasets |
| `client.api.dataset.postDatasetCreate` | `POST /accounts/{accountId}/cloudforce-one/events/dataset/create` | Create a dataset |
| `client.api.dataset.deleteDatasetDelete` | `DELETE /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}` | Delete a dataset |
| `client.api.dataset.getDatasetRead` | `GET /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}` | Get a dataset |
| `client.api.dataset.patchDatasetUpdate` | `PATCH /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}` | Update a dataset |
| `client.api.dataset.postDatasetUpdate` | `POST /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}` | Update a dataset |
| `client.api.dataset.deleteDatasetPreferencesDelete` | `DELETE /accounts/{accountId}/cloudforce-one/events/datasets/preferences` | Remove default datasets |
| `client.api.dataset.getDatasetPreferencesRead` | `GET /accounts/{accountId}/cloudforce-one/events/datasets/preferences` | Get default datasets |
| `client.api.dataset.putDatasetPreferencesUpdate` | `PUT /accounts/{accountId}/cloudforce-one/events/datasets/preferences` | Set default datasets |

## groups

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.groups.getGroupList` | `GET /accounts/{accountId}/cloudforce-one/events/dataset/-/groups` | List account groups |
| `client.api.groups.postGroupCreate` | `POST /accounts/{accountId}/cloudforce-one/events/dataset/-/groups` | Create an account group |
| `client.api.groups.deleteGroupDelete` | `DELETE /accounts/{accountId}/cloudforce-one/events/dataset/-/groups/{groupId}` | Delete an account group |
| `client.api.groups.getGroupRead` | `GET /accounts/{accountId}/cloudforce-one/events/dataset/-/groups/{groupId}` | Get an account group |
| `client.api.groups.putGroupUpdate` | `PUT /accounts/{accountId}/cloudforce-one/events/dataset/-/groups/{groupId}` | Update an account group |
| `client.api.groups.getGroupMemberList` | `GET /accounts/{accountId}/cloudforce-one/events/dataset/-/groups/{groupId}/members` | List group members |
| `client.api.groups.postGroupMemberCreate` | `POST /accounts/{accountId}/cloudforce-one/events/dataset/-/groups/{groupId}/members` | Add an account to a group |
| `client.api.groups.deleteGroupMemberDelete` | `DELETE /accounts/{accountId}/cloudforce-one/events/dataset/-/groups/{groupId}/members/{memberId}` | Remove an account from a group |

## indicators

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.indicators.postIndicatorTypeCreate` | `POST /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/indicatorTypes/create` | Create an indicator type |

## indicator

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.indicator.deleteIndicatorDeleteBulk` | `DELETE /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/indicators` | Delete indicators in bulk |
| `client.api.indicator.getIndicatorListLegacy` | `GET /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/indicators` | List indicators in a dataset (legacy) |
| `client.api.indicator.postIndicatorCreateBulk` | `POST /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/indicators/bulk` | Create indicators in bulk |
| `client.api.indicator.postIndicatorCreate` | `POST /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/indicators/create` | Create an indicator |
| `client.api.indicator.getIndicatorTagsList` | `GET /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/indicators/tags` | List tags on a dataset's indicators |
| `client.api.indicator.deleteIndicatorDelete` | `DELETE /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/indicators/{indicatorId}` | Delete an indicator |
| `client.api.indicator.getIndicatorRead` | `GET /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/indicators/{indicatorId}` | Get an indicator |
| `client.api.indicator.patchIndicatorUpdate` | `PATCH /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/indicators/{indicatorId}` | Update an indicator |
| `client.api.indicator.getIndicatorRelationshipsList` | `GET /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/indicators/{indicatorId}/relationships` | List indicator relationships |
| `client.api.indicator.postIndicatorRelationshipCreate` | `POST /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/indicators/{indicatorId}/relationships` | Create an indicator relationship |
| `client.api.indicator.deleteIndicatorRelationshipDelete` | `DELETE /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/indicators/{indicatorId}/relationships/{relUuid}` | Delete an indicator relationship |
| `client.api.indicator.patchIndicatorRelationshipUpdate` | `PATCH /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/indicators/{indicatorId}/relationships/{relUuid}` | Update an indicator relationship |
| `client.api.indicator.getIndicatorList` | `GET /accounts/{accountId}/cloudforce-one/events/indicators` | List indicators |
| `client.api.indicator.getIndicatorAggregate` | `GET /accounts/{accountId}/cloudforce-one/events/indicators/aggregate` | Aggregate indicators by column(s) |

## permissions

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.permissions.getPermissionList` | `GET /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/permissions` | List dataset permissions |
| `client.api.permissions.postPermissionCreate` | `POST /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/permissions` | Grant access to a dataset |
| `client.api.permissions.deletePermissionDelete` | `DELETE /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/permissions/{grantId}` | Revoke access to a dataset |
| `client.api.permissions.putPermissionUpdate` | `PUT /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/permissions/{grantId}` | Change a dataset permission |

## tag

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.tag.getDatasetTagIndicatorsList` | `GET /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/tags/{tagUuid}/indicators` | List indicators related to a tag within a dataset (deprecated) |
| `client.api.tag.getTagList` | `GET /accounts/{accountId}/cloudforce-one/events/tags` | List tags |
| `client.api.tag.getTaggedActorList` | `GET /accounts/{accountId}/cloudforce-one/events/tags/categories/actors` | List threat actors |
| `client.api.tag.postTagCreate` | `POST /accounts/{accountId}/cloudforce-one/events/tags/create` | Create a tag |
| `client.api.tag.deleteTagDelete` | `DELETE /accounts/{accountId}/cloudforce-one/events/tags/{tagUuid}` | Delete a tag |
| `client.api.tag.getTagDetail` | `GET /accounts/{accountId}/cloudforce-one/events/tags/{tagUuid}` | Get a tag |
| `client.api.tag.patchTagUpdate` | `PATCH /accounts/{accountId}/cloudforce-one/events/tags/{tagUuid}` | Update a tag |
| `client.api.tag.getTagIndicatorsList` | `GET /accounts/{accountId}/cloudforce-one/events/tags/{tagUuid}/indicators` | List a tag's indicators |
| `client.api.tag.getTagRelationshipsList` | `GET /accounts/{accountId}/cloudforce-one/events/tags/{tagUuid}/relationships` | List tag relationships |
| `client.api.tag.postTagRelationshipCreate` | `POST /accounts/{accountId}/cloudforce-one/events/tags/{tagUuid}/relationships` | Create a tag relationship |
| `client.api.tag.deleteTagRelationshipDelete` | `DELETE /accounts/{accountId}/cloudforce-one/events/tags/{tagUuid}/relationships/{relUuid}` | Delete a tag relationship |
| `client.api.tag.patchTagRelationshipUpdate` | `PATCH /accounts/{accountId}/cloudforce-one/events/tags/{tagUuid}/relationships/{relUuid}` | Update a tag relationship |

## targetIndustry

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.targetIndustry.getTargetIndustryListByDataset` | `GET /accounts/{accountId}/cloudforce-one/events/dataset/{datasetId}/targetIndustries` | List target industries in a dataset (legacy) |
| `client.api.targetIndustry.getTargetIndustryList` | `GET /accounts/{accountId}/cloudforce-one/events/targetIndustries` | List target industries used in datasets |
| `client.api.targetIndustry.getTargetIndustryListComplete` | `GET /accounts/{accountId}/cloudforce-one/events/targetIndustries/catalog` | List all target industries |

## datasets

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.datasets.postDatasetPopulate` | `POST /accounts/{accountId}/cloudforce-one/events/datasets/populate` | Rebuild dataset lookup lists |

## events

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.events.getEventGraph` | `GET /accounts/{accountId}/cloudforce-one/events/graph` | Query graph neighborhood from R2 Data Catalog |

## r2Catalog

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.r2Catalog.getEventGraph` | `GET /accounts/{accountId}/cloudforce-one/events/graph` | Query graph neighborhood from R2 Data Catalog |

## indicatorTypes

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.indicatorTypes.getIndicatorTypesList` | `GET /accounts/{accountId}/cloudforce-one/events/indicator-types` | List indicator types |
| `client.api.indicatorTypes.getLegacyIndicatorTypesList` | `GET /accounts/{accountId}/cloudforce-one/events/indicatorTypes` | List indicator types (legacy) |

## tagcategory

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.tagcategory.deleteTagCategoryDelete` | `DELETE /accounts/{accountId}/cloudforce-one/events/tag-categories/{categoryUuid}` | Delete a tag category |
| `client.api.tagcategory.getTagCategoryDetail` | `GET /accounts/{accountId}/cloudforce-one/events/tag-categories/{categoryUuid}` | Get a tag category |
| `client.api.tagcategory.patchTagCategoryUpdate` | `PATCH /accounts/{accountId}/cloudforce-one/events/tag-categories/{categoryUuid}` | Update a tag category |
| `client.api.tagcategory.getTagCategoryList` | `GET /accounts/{accountId}/cloudforce-one/events/tags/categories` | List tag categories |
| `client.api.tagcategory.postTagCategoryCreate` | `POST /accounts/{accountId}/cloudforce-one/events/tags/categories/create` | Create a tag category |
| `client.api.tagcategory.deleteLegacyTagCategoryDelete` | `DELETE /accounts/{accountId}/cloudforce-one/events/tags/categories/{categoryUuid}` | Delete a tag category (legacy) |
| `client.api.tagcategory.getLegacyTagCategoryDetail` | `GET /accounts/{accountId}/cloudforce-one/events/tags/categories/{categoryUuid}` | Get a tag category (legacy) |
| `client.api.tagcategory.patchLegacyTagCategoryUpdate` | `PATCH /accounts/{accountId}/cloudforce-one/events/tags/categories/{categoryUuid}` | Update a tag category (legacy) |

## requestForInformationRfi

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.requestForInformationRfi.cloudforceOneRequestList` | `POST /accounts/{accountId}/cloudforce-one/requests` | List Requests |
| `client.api.requestForInformationRfi.cloudforceOneRequestConstants` | `GET /accounts/{accountId}/cloudforce-one/requests/constants` | Get Request Priority, Status, and TLP constants |
| `client.api.requestForInformationRfi.cloudforceOneRequestNew` | `POST /accounts/{accountId}/cloudforce-one/requests/new` | Create a New Request. |
| `client.api.requestForInformationRfi.cloudforceOneRequestQuota` | `GET /accounts/{accountId}/cloudforce-one/requests/quota` | Get Request Quota |
| `client.api.requestForInformationRfi.cloudforceOneRequestTypes` | `GET /accounts/{accountId}/cloudforce-one/requests/types` | Get Request Types |
| `client.api.requestForInformationRfi.cloudforceOneRequestDelete` | `DELETE /accounts/{accountId}/cloudforce-one/requests/{requestId}` | Delete a Request |
| `client.api.requestForInformationRfi.cloudforceOneRequestGet` | `GET /accounts/{accountId}/cloudforce-one/requests/{requestId}` | Get a Request |
| `client.api.requestForInformationRfi.cloudforceOneRequestUpdate` | `PUT /accounts/{accountId}/cloudforce-one/requests/{requestId}` | Update a Request |
| `client.api.requestForInformationRfi.cloudforceOneRequestAssetList` | `POST /accounts/{accountId}/cloudforce-one/requests/{requestId}/asset` | List Request Assets |
| `client.api.requestForInformationRfi.cloudforceOneRequestAssetNew` | `POST /accounts/{accountId}/cloudforce-one/requests/{requestId}/asset/new` | Create a New Request Asset |
| `client.api.requestForInformationRfi.cloudforceOneRequestAssetDelete` | `DELETE /accounts/{accountId}/cloudforce-one/requests/{requestId}/asset/{assetId}` | Delete a Request Asset |
| `client.api.requestForInformationRfi.cloudforceOneRequestAssetGet` | `GET /accounts/{accountId}/cloudforce-one/requests/{requestId}/asset/{assetId}` | Get a Request Asset |
| `client.api.requestForInformationRfi.cloudforceOneRequestAssetUpdate` | `PUT /accounts/{accountId}/cloudforce-one/requests/{requestId}/asset/{assetId}` | Update a Request Asset |
| `client.api.requestForInformationRfi.cloudforceOneRequestMessageList` | `POST /accounts/{accountId}/cloudforce-one/requests/{requestId}/message` | List Request Messages |
| `client.api.requestForInformationRfi.cloudforceOneRequestMessageNew` | `POST /accounts/{accountId}/cloudforce-one/requests/{requestId}/message/new` | Create a New Request Message |
| `client.api.requestForInformationRfi.cloudforceOneRequestMessageDelete` | `DELETE /accounts/{accountId}/cloudforce-one/requests/{requestId}/message/{messageId}` | Delete a Request Message |
| `client.api.requestForInformationRfi.cloudforceOneRequestMessageUpdate` | `PUT /accounts/{accountId}/cloudforce-one/requests/{requestId}/message/{messageId}` | Update a Request Message |

## priorityIntelligenceRequirementsPir

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.priorityIntelligenceRequirementsPir.cloudforceOnePriorityList` | `POST /accounts/{accountId}/cloudforce-one/requests/priority` | List Priority Intelligence Requirements |
| `client.api.priorityIntelligenceRequirementsPir.cloudforceOnePriorityNew` | `POST /accounts/{accountId}/cloudforce-one/requests/priority/new` | Create a New Priority Intelligence Requirement |
| `client.api.priorityIntelligenceRequirementsPir.cloudforceOnePriorityQuota` | `GET /accounts/{accountId}/cloudforce-one/requests/priority/quota` | Get Priority Intelligence Requirement Quota |
| `client.api.priorityIntelligenceRequirementsPir.cloudforceOnePriorityDelete` | `DELETE /accounts/{accountId}/cloudforce-one/requests/priority/{priorityId}` | Delete a Priority Intelligence Requirement |
| `client.api.priorityIntelligenceRequirementsPir.cloudforceOnePriorityGet` | `GET /accounts/{accountId}/cloudforce-one/requests/priority/{priorityId}` | Get a Priority Intelligence Requirement |
| `client.api.priorityIntelligenceRequirementsPir.cloudforceOnePriorityUpdate` | `PUT /accounts/{accountId}/cloudforce-one/requests/priority/{priorityId}` | Update a Priority Intelligence Requirement |

## rules

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.rules.cloudforceOneDeleteAllRules` | `DELETE /accounts/{accountId}/cloudforce-one/rules` | Delete all rules |
| `client.api.rules.cloudforceOneListRules` | `GET /accounts/{accountId}/cloudforce-one/rules` | List rules |
| `client.api.rules.cloudforceOneCreateRule` | `POST /accounts/{accountId}/cloudforce-one/rules` | Create a rule |
| `client.api.rules.cloudforceOneRemoveAccountExemptions` | `DELETE /accounts/{accountId}/cloudforce-one/rules/exemptions` | Remove patterns from exemption rules |
| `client.api.rules.cloudforceOneGetExemptions` | `GET /accounts/{accountId}/cloudforce-one/rules/exemptions` | Get exemption rules for an account |
| `client.api.rules.cloudforceOneAddAccountExemptions` | `POST /accounts/{accountId}/cloudforce-one/rules/exemptions` | Add patterns to exemption rules |
| `client.api.rules.cloudforceOneUpdateAccountExemptions` | `PUT /accounts/{accountId}/cloudforce-one/rules/exemptions` | Update exemption rule patterns |
| `client.api.rules.cloudforceOneGetManagedRules` | `GET /accounts/{accountId}/cloudforce-one/rules/managed` | Get managed rules |
| `client.api.rules.cloudforceOneSearchRules` | `GET /accounts/{accountId}/cloudforce-one/rules/search` | Search rules |
| `client.api.rules.cloudforceOneGetRuleStats` | `GET /accounts/{accountId}/cloudforce-one/rules/stats` | Get dashboard stats |
| `client.api.rules.cloudforceOneListEmailRules` | `GET /accounts/{accountId}/cloudforce-one/rules/structured` | List email rules |
| `client.api.rules.cloudforceOneCreateEmailRule` | `POST /accounts/{accountId}/cloudforce-one/rules/structured` | Create an email rule |
| `client.api.rules.cloudforceOneUpdatePendingEmailRuleApproval` | `PUT /accounts/{accountId}/cloudforce-one/rules/structured/approvals/{id}` | Update a pending structured email rule approval |
| `client.api.rules.cloudforceOneResubmitEmailRuleApproval` | `POST /accounts/{accountId}/cloudforce-one/rules/structured/approvals/{id}/resubmit` | Revise and resubmit a rejected structured email rule approval |
| `client.api.rules.cloudforceOneGetEmailRuleSchema` | `GET /accounts/{accountId}/cloudforce-one/rules/structured/schema` | Get email rule schema |
| `client.api.rules.cloudforceOneValidateEmailRule` | `POST /accounts/{accountId}/cloudforce-one/rules/structured/validate` | Validate an email rule |
| `client.api.rules.cloudforceOneDeleteEmailRule` | `DELETE /accounts/{accountId}/cloudforce-one/rules/structured/{id}` | Delete an email rule |
| `client.api.rules.cloudforceOneGetEmailRule` | `GET /accounts/{accountId}/cloudforce-one/rules/structured/{id}` | Get an email rule |
| `client.api.rules.cloudforceOneUpdateEmailRule` | `PUT /accounts/{accountId}/cloudforce-one/rules/structured/{id}` | Update an email rule |
| `client.api.rules.cloudforceOneTestEmailRule` | `POST /accounts/{accountId}/cloudforce-one/rules/structured/{id}/test` | Test an email rule |
| `client.api.rules.cloudforceOneGetRuleTree` | `GET /accounts/{accountId}/cloudforce-one/rules/tree` | Get folder tree structure |
| `client.api.rules.cloudforceOneValidateRule` | `POST /accounts/{accountId}/cloudforce-one/rules/validate` | Validate rule with context |
| `client.api.rules.cloudforceOneDeleteRule` | `DELETE /accounts/{accountId}/cloudforce-one/rules/{id}` | Delete a rule |
| `client.api.rules.cloudforceOneGetRule` | `GET /accounts/{accountId}/cloudforce-one/rules/{id}` | Get a rule |
| `client.api.rules.cloudforceOneUpdateRule` | `PUT /accounts/{accountId}/cloudforce-one/rules/{id}` | Update a rule |

## approvals

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.approvals.cloudforceOneListRuleApprovals` | `GET /accounts/{accountId}/cloudforce-one/rules/approvals` | List rule approvals |
| `client.api.approvals.cloudforceOneGetRuleApproval` | `GET /accounts/{accountId}/cloudforce-one/rules/approvals/{id}` | Get rule approval details |
| `client.api.approvals.cloudforceOneCancelRuleApproval` | `POST /accounts/{accountId}/cloudforce-one/rules/approvals/{id}/cancel` | Cancel a pending approval |
| `client.api.approvals.cloudforceOneResubmitRuleApproval` | `POST /accounts/{accountId}/cloudforce-one/rules/approvals/{id}/resubmit` | Revise and resubmit a rejected approval |

## collections

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.collections.getCollectionList` | `GET /accounts/{accountId}/cloudforce-one/v2/collections` | List collections |
| `client.api.collections.postCollectionCreate` | `POST /accounts/{accountId}/cloudforce-one/v2/collections` | Create a new collection |
| `client.api.collections.deleteCollectionDelete` | `DELETE /accounts/{accountId}/cloudforce-one/v2/collections/{collectionId}` | Delete collection |
| `client.api.collections.getCollectionGet` | `GET /accounts/{accountId}/cloudforce-one/v2/collections/{collectionId}` | Get collection |
| `client.api.collections.patchCollectionUpdate` | `PATCH /accounts/{accountId}/cloudforce-one/v2/collections/{collectionId}` | Update collection |
| `client.api.collections.postColumnAdd` | `POST /accounts/{accountId}/cloudforce-one/v2/collections/{collectionId}/columns` | Add column to collection |
| `client.api.collections.deleteColumnDelete` | `DELETE /accounts/{accountId}/cloudforce-one/v2/collections/{collectionId}/columns/{columnId}` | Delete column |
| `client.api.collections.patchColumnUpdate` | `PATCH /accounts/{accountId}/cloudforce-one/v2/collections/{collectionId}/columns/{columnId}` | Update column |
| `client.api.collections.getCollectionExportEndpoint` | `GET /accounts/{accountId}/cloudforce-one/v2/collections/{collectionId}/export` | Export collection to CSV, JSONL, or Markdown |
| `client.api.collections.getItemQuery` | `GET /accounts/{accountId}/cloudforce-one/v2/collections/{collectionId}/items` | Query collection items |
| `client.api.collections.deleteItemDelete` | `DELETE /accounts/{accountId}/cloudforce-one/v2/collections/{collectionId}/items/{itemId}` | Delete collection item |
| `client.api.collections.getItemGet` | `GET /accounts/{accountId}/cloudforce-one/v2/collections/{collectionId}/items/{itemId}` | Get collection item |
| `client.api.collections.patchItemUpdate` | `PATCH /accounts/{accountId}/cloudforce-one/v2/collections/{collectionId}/items/{itemId}` | Update collection item |

## collectionsItems

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.collectionsItems.postItemCreate` | `POST /accounts/{accountId}/cloudforce-one/v2/collections/{collectionId}/items` | Create item(s) |
| `client.api.collectionsItems.postItemSearch` | `POST /accounts/{accountId}/cloudforce-one/v2/collections/{collectionId}/search` | Search items (advanced filtering) |

## publicCredentialMonitor

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.publicCredentialMonitor.getDomainList` | `GET /accounts/{accountId}/cloudforce-one/v2/credential-monitor/domains` | List monitored domains |
| `client.api.publicCredentialMonitor.postDomainCreate` | `POST /accounts/{accountId}/cloudforce-one/v2/credential-monitor/domains` | Create monitored domain |
| `client.api.publicCredentialMonitor.deleteDomainDelete` | `DELETE /accounts/{accountId}/cloudforce-one/v2/credential-monitor/domains/{id}` | Delete monitored domain |
| `client.api.publicCredentialMonitor.getMatchList` | `GET /accounts/{accountId}/cloudforce-one/v2/credential-monitor/matches` | List credential matches |

## priorityIntelligenceRequirements

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.priorityIntelligenceRequirements.getPirList` | `GET /accounts/{accountId}/cloudforce-one/v2/priority-intelligence` | List priority intelligence requirements for an account |
| `client.api.priorityIntelligenceRequirements.postPirCreate` | `POST /accounts/{accountId}/cloudforce-one/v2/priority-intelligence` | Create a priority intelligence requirement |
| `client.api.priorityIntelligenceRequirements.getPirConstants` | `GET /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/constants` | Get PIR constants (methods, dimensions, and TLP values) |
| `client.api.priorityIntelligenceRequirements.postPirFilterGenerate` | `POST /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/filters/generate` | Generate event filters from a PIR |
| `client.api.priorityIntelligenceRequirements.getPirInterestList` | `GET /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/interests` | List account interests for PIR Option 2 |
| `client.api.priorityIntelligenceRequirements.postPirInterestCreate` | `POST /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/interests` | Create an account interest for PIR Option 2 |
| `client.api.priorityIntelligenceRequirements.postPirInterestBacktestCreate` | `POST /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/interests/backtests` | Backtest account-interest change detection |
| `client.api.priorityIntelligenceRequirements.getPirInterestBacktestGet` | `GET /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/interests/backtests/{backtestId}` | Get a persisted account-interest backtest |
| `client.api.priorityIntelligenceRequirements.postPirInterestEvaluationCreate` | `POST /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/interests/evaluations` | Evaluate recent event-dated changes for account interests |
| `client.api.priorityIntelligenceRequirements.getPirInterestEvaluationGet` | `GET /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/interests/evaluations/{evaluationId}` | Get a persisted account-interest evaluation |
| `client.api.priorityIntelligenceRequirements.deletePirInterestDelete` | `DELETE /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/interests/{interestId}` | Delete an account interest for PIR Option 2 |
| `client.api.priorityIntelligenceRequirements.patchPirInterestUpdate` | `PATCH /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/interests/{interestId}` | Update an account interest for PIR Option 2 |
| `client.api.priorityIntelligenceRequirements.getPirAllMatchAggregates` | `GET /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/matches/aggregate` | Count matched events across the account's priority intelligence requirements |
| `client.api.priorityIntelligenceRequirements.deletePirProfileDelete` | `DELETE /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/profile` | Delete the organization profile |
| `client.api.priorityIntelligenceRequirements.getPirProfileGet` | `GET /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/profile` | Get the organization profile |
| `client.api.priorityIntelligenceRequirements.putPirProfilePut` | `PUT /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/profile` | Create or replace the organization profile |
| `client.api.priorityIntelligenceRequirements.postPirQuota` | `POST /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/quota` | Get PIR quota for an account |
| `client.api.priorityIntelligenceRequirements.deletePirDelete` | `DELETE /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/{priorityId}` | Delete a priority intelligence requirement |
| `client.api.priorityIntelligenceRequirements.getPirGet` | `GET /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/{priorityId}` | Get a priority intelligence requirement by ID |
| `client.api.priorityIntelligenceRequirements.putPirUpdate` | `PUT /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/{priorityId}` | Update a priority intelligence requirement |
| `client.api.priorityIntelligenceRequirements.getPirMatchesList` | `GET /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/{priorityId}/matches` | List a priority intelligence requirement's matched events |
| `client.api.priorityIntelligenceRequirements.patchPirMatchesTriage` | `PATCH /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/{priorityId}/matches` | Triage a priority intelligence requirement's matched events |
| `client.api.priorityIntelligenceRequirements.getPirMatchAggregates` | `GET /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/{priorityId}/matches/aggregate` | Count a priority intelligence requirement's matched events |
| `client.api.priorityIntelligenceRequirements.getPirMatchSeries` | `GET /accounts/{accountId}/cloudforce-one/v2/priority-intelligence/{priorityId}/matches/series` | Count a priority intelligence requirement's matched events per day |

## requestsDashboard

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.requestsDashboard.getLegalResponseAccessCheck` | `GET /accounts/{accountId}/cloudforce-one/v2/requests/legal-response/access-check` | Check if current user is allowlisted for Legal Response |
| `client.api.requestsDashboard.getRequestConstants` | `GET /accounts/{accountId}/cloudforce-one/v2/requests/{projectType}/constants` | Get request constants |
| `client.api.requestsDashboard.getDashboardMetadataFieldList` | `GET /accounts/{accountId}/cloudforce-one/v2/requests/{projectType}/metadata` | List metadata fields for an RFI type |
| `client.api.requestsDashboard.getRequestQuota` | `GET /accounts/{accountId}/cloudforce-one/v2/requests/{projectType}/quota` | Get request token quota |
| `client.api.requestsDashboard.getDashboardRequestTypesList` | `GET /accounts/{accountId}/cloudforce-one/v2/requests/{projectType}/types` | List visible request types for a project (dashboard) |

## rfi

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.rfi.getRequestList` | `GET /accounts/{accountId}/cloudforce-one/v2/requests/{projectType}` | List RFIs |
| `client.api.rfi.postRequestCreate` | `POST /accounts/{accountId}/cloudforce-one/v2/requests/{projectType}` | Creates a new RFI |
| `client.api.rfi.getRequestRead` | `GET /accounts/{accountId}/cloudforce-one/v2/requests/{projectType}/{requestId}` | Get an RFI by ID |
| `client.api.rfi.putRequestUpdate` | `PUT /accounts/{accountId}/cloudforce-one/v2/requests/{projectType}/{requestId}` | Update an RFI |

## dashboardUsers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dashboardUsers.getUserGetSelf` | `GET /accounts/{accountId}/cloudforce-one/v2/requests/{projectType}/user/me` | Get current user profile |

## dashboardAssets

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dashboardAssets.getDashboardAssetList` | `GET /accounts/{accountId}/cloudforce-one/v2/requests/{projectType}/{requestId}/assets/list` | List assets in request (Customer) |
| `client.api.dashboardAssets.postDashboardAssetUpload` | `POST /accounts/{accountId}/cloudforce-one/v2/requests/{projectType}/{requestId}/assets/upload` | Upload asset to request (Customer) |
| `client.api.dashboardAssets.getDashboardAssetDownload` | `GET /accounts/{accountId}/cloudforce-one/v2/requests/{projectType}/{requestId}/assets/{assetId}/download` | Download asset (Customer) |

## rfiMessages

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.rfiMessages.getMessageList` | `GET /accounts/{accountId}/cloudforce-one/v2/requests/{projectType}/{requestId}/messages` | List messages for an RFI request |
| `client.api.rfiMessages.postMessageCreate` | `POST /accounts/{accountId}/cloudforce-one/v2/requests/{projectType}/{requestId}/messages/new` | Create a customer follow-on message on an RFI request |
| `client.api.rfiMessages.getMessageRead` | `GET /accounts/{accountId}/cloudforce-one/v2/requests/{projectType}/{requestId}/messages/{messageId}` | Read a single message for an RFI request |
| `client.api.rfiMessages.putMessageUpdate` | `PUT /accounts/{accountId}/cloudforce-one/v2/requests/{projectType}/{requestId}/messages/{messageId}` | Update/publish a message for an RFI request |

## threatIntelligence

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.threatIntelligence.searchThreatIntelligence` | `POST /accounts/{accountId}/cloudforce-one/v2/search` | Search threat intelligence |

## threatSignals

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.threatSignals.rssArticleList` | `GET /accounts/{accountId}/cloudforce-one/v2/threat-signals/articles` | List Threat Signals articles |
| `client.api.threatSignals.rssArticleBulkMarkRead` | `PATCH /accounts/{accountId}/cloudforce-one/v2/threat-signals/articles` | Bulk update Threat Signals article read status |
| `client.api.threatSignals.rssArticleRelevanceAggregate` | `GET /accounts/{accountId}/cloudforce-one/v2/threat-signals/articles/relevance/aggregate` | Count Threat Signals articles by relevance band |
| `client.api.threatSignals.rssArticleSeverityAggregate` | `GET /accounts/{accountId}/cloudforce-one/v2/threat-signals/articles/severity/aggregate` | Count Threat Signals articles by severity band |
| `client.api.threatSignals.rssArticleGet` | `GET /accounts/{accountId}/cloudforce-one/v2/threat-signals/articles/{articleId}` | Get Threat Signals article |
| `client.api.threatSignals.rssArticleMarkRead` | `PATCH /accounts/{accountId}/cloudforce-one/v2/threat-signals/articles/{articleId}` | Update Threat Signals article read status |
| `client.api.threatSignals.rssArticleContentGet` | `GET /accounts/{accountId}/cloudforce-one/v2/threat-signals/articles/{articleId}/content` | Get Threat Signals article content |
| `client.api.threatSignals.rssArticleReprocess` | `POST /accounts/{accountId}/cloudforce-one/v2/threat-signals/articles/{articleId}/reprocess` | Reprocess a Threat Signals article |
| `client.api.threatSignals.rssArticleCustomSkillsList` | `GET /accounts/{accountId}/cloudforce-one/v2/threat-signals/articles/{articleId}/skills` | List Threat Signals article custom skills |
| `client.api.threatSignals.rssArticleSkillOutputGet` | `GET /accounts/{accountId}/cloudforce-one/v2/threat-signals/articles/{articleId}/skills/{skillId}/output` | Get Threat Signals article skill output |
| `client.api.threatSignals.rssArticleSkillRun` | `POST /accounts/{accountId}/cloudforce-one/v2/threat-signals/articles/{articleId}/skills/{skillId}/run` | Run and persist skill output for a Threat Signals article |
| `client.api.threatSignals.rssArticleTagGenerate` | `POST /accounts/{accountId}/cloudforce-one/v2/threat-signals/articles/{articleId}/tag` | Generate Threat Signals article AI tags |
| `client.api.threatSignals.rssArticleTagAdd` | `POST /accounts/{accountId}/cloudforce-one/v2/threat-signals/articles/{articleId}/tags` | Add tag to Threat Signals article |
| `client.api.threatSignals.rssArticleTagRemove` | `DELETE /accounts/{accountId}/cloudforce-one/v2/threat-signals/articles/{articleId}/tags/{tagId}` | Remove tag from Threat Signals article |
| `client.api.threatSignals.rssFeedCategoryList` | `GET /accounts/{accountId}/cloudforce-one/v2/threat-signals/categories` | List Threat Signals feed categories |
| `client.api.threatSignals.rssFeedList` | `GET /accounts/{accountId}/cloudforce-one/v2/threat-signals/feeds` | List Threat Signals feeds |
| `client.api.threatSignals.rssFeedCreate` | `POST /accounts/{accountId}/cloudforce-one/v2/threat-signals/feeds` | Create Threat Signals feed |
| `client.api.threatSignals.rssFeedPoll` | `POST /accounts/{accountId}/cloudforce-one/v2/threat-signals/feeds/poll` | Trigger Threat Signals feed poll |
| `client.api.threatSignals.rssFeedDelete` | `DELETE /accounts/{accountId}/cloudforce-one/v2/threat-signals/feeds/{feedId}` | Delete Threat Signals feed |
| `client.api.threatSignals.rssFeedUpdate` | `PATCH /accounts/{accountId}/cloudforce-one/v2/threat-signals/feeds/{feedId}` | Update Threat Signals feed |
| `client.api.threatSignals.rssFeedRawGet` | `GET /accounts/{accountId}/cloudforce-one/v2/threat-signals/feeds/{feedId}/raw` | Get Threat Signals feed XML |
| `client.api.threatSignals.rssFeedSkillsGet` | `GET /accounts/{accountId}/cloudforce-one/v2/threat-signals/feeds/{feedId}/skills` | Get Threat Signals feed skills |
| `client.api.threatSignals.rssFeedSkillsSet` | `PUT /accounts/{accountId}/cloudforce-one/v2/threat-signals/feeds/{feedId}/skills` | Set Threat Signals feed skills |
| `client.api.threatSignals.rssArticleIndicatorList` | `GET /accounts/{accountId}/cloudforce-one/v2/threat-signals/indicators` | List Threat Signals article indicators |
| `client.api.threatSignals.searchThreatSignals` | `GET /accounts/{accountId}/cloudforce-one/v2/threat-signals/search` | Search Threat Signals articles using AI Search |
| `client.api.threatSignals.rssSkillList` | `GET /accounts/{accountId}/cloudforce-one/v2/threat-signals/skills` | List Threat Signals skills |
| `client.api.threatSignals.rssSkillCreate` | `POST /accounts/{accountId}/cloudforce-one/v2/threat-signals/skills` | Create Threat Signals skill |
| `client.api.threatSignals.rssSkillDelete` | `DELETE /accounts/{accountId}/cloudforce-one/v2/threat-signals/skills/{skillId}` | Delete Threat Signals skill |
| `client.api.threatSignals.rssSkillGet` | `GET /accounts/{accountId}/cloudforce-one/v2/threat-signals/skills/{skillId}` | Get Threat Signals skill |
| `client.api.threatSignals.rssSkillUpdate` | `PATCH /accounts/{accountId}/cloudforce-one/v2/threat-signals/skills/{skillId}` | Update Threat Signals skill |
| `client.api.threatSignals.rssSkillTagCategoriesGet` | `GET /accounts/{accountId}/cloudforce-one/v2/threat-signals/skills/{skillId}/tag-categories` | Get Threat Signals skill tag categories |
| `client.api.threatSignals.rssSkillTagCategoriesReplace` | `PUT /accounts/{accountId}/cloudforce-one/v2/threat-signals/skills/{skillId}/tag-categories` | Replace Threat Signals skill tag categories |

## cnis

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cnis.listCnis` | `GET /accounts/{accountId}/cni/cnis` | List existing CNI objects |
| `client.api.cnis.createCni` | `POST /accounts/{accountId}/cni/cnis` | Create a new CNI object |
| `client.api.cnis.deleteCni` | `DELETE /accounts/{accountId}/cni/cnis/{cni}` | Delete a specified CNI object |
| `client.api.cnis.getCni` | `GET /accounts/{accountId}/cni/cnis/{cni}` | Get information about a CNI object |
| `client.api.cnis.updateCni` | `PUT /accounts/{accountId}/cni/cnis/{cni}` | Modify stored information about a CNI object |

## interconnects

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.interconnects.listInterconnects` | `GET /accounts/{accountId}/cni/interconnects` | List existing interconnects |
| `client.api.interconnects.createInterconnect` | `POST /accounts/{accountId}/cni/interconnects` | Create a new interconnect |
| `client.api.interconnects.deleteInterconnect` | `DELETE /accounts/{accountId}/cni/interconnects/{icon}` | Delete an interconnect object |
| `client.api.interconnects.getInterconnect` | `GET /accounts/{accountId}/cni/interconnects/{icon}` | Get information about an interconnect object |
| `client.api.interconnects.getInterconnectLoa` | `GET /accounts/{accountId}/cni/interconnects/{icon}/loa` | Generate the Letter of Authorization (LOA) for a given interconnect |
| `client.api.interconnects.getInterconnectLoaDefaultName` | `GET /accounts/{accountId}/cni/interconnects/{icon}/loa/default` | Get the default customer name for LOA generation |
| `client.api.interconnects.getInterconnectStatus` | `GET /accounts/{accountId}/cni/interconnects/{icon}/status` | Get the current status of an interconnect object |

## settings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.settings.getSettings` | `GET /accounts/{accountId}/cni/settings` | Get the current settings for the active account |
| `client.api.settings.updateSettings` | `PUT /accounts/{accountId}/cni/settings` | Update the current settings for the active account |

## slots

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.slots.listSlots` | `GET /accounts/{accountId}/cni/slots` | Retrieve a list of all slots matching the specified parameters |
| `client.api.slots.getSlot` | `GET /accounts/{accountId}/cni/slots/{slot}` | Get information about the specified slot |

## connectivityServices

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.connectivityServices.connectivityServicesList` | `GET /accounts/{accountId}/connectivity/directory/services` | List Workers VPC connectivity services |
| `client.api.connectivityServices.connectivityServicesPost` | `POST /accounts/{accountId}/connectivity/directory/services` | Create Workers VPC connectivity service |
| `client.api.connectivityServices.connectivityServicesDelete` | `DELETE /accounts/{accountId}/connectivity/directory/services/{serviceId}` | Delete Workers VPC connectivity service |
| `client.api.connectivityServices.connectivityServicesGet` | `GET /accounts/{accountId}/connectivity/directory/services/{serviceId}` | Get Workers VPC connectivity service |
| `client.api.connectivityServices.connectivityServicesPut` | `PUT /accounts/{accountId}/connectivity/directory/services/{serviceId}` | Update Workers VPC connectivity service |

## applications

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.applications.listApplications` | `GET /accounts/{accountId}/containers/applications` | List Applications associated with your account |
| `client.api.applications.createApplication` | `POST /accounts/{accountId}/containers/applications` | Create a new application |
| `client.api.applications.deleteApplication` | `DELETE /accounts/{accountId}/containers/applications/{applicationId}` | Delete a single application by id |
| `client.api.applications.getApplication` | `GET /accounts/{accountId}/containers/applications/{applicationId}` | Get a single application by id |
| `client.api.applications.modifyApplication` | `PATCH /accounts/{accountId}/containers/applications/{applicationId}` | Modify an application |
| `client.api.applications.listApplicationVersions` | `GET /accounts/{accountId}/containers/applications/{applicationId}/versions` | List all application versions |
| `client.api.applications.listApplicationsV2` | `GET /accounts/{accountId}/one/applications` | List applications |
| `client.api.applications.getApplicationV2` | `GET /accounts/{accountId}/one/applications/{applicationId}` | Get application details |
| `client.api.applications.getApplicationAuthMethodsV2` | `GET /accounts/{accountId}/one/applications/{applicationId}/auth-methods` | Get auth methods |
| `client.api.applications.getApplicationSetupFlowsV2` | `GET /accounts/{accountId}/one/applications/{applicationId}/setup-flows` | Get application setup flows |
| `client.api.applications.getResourceLibraryApplications` | `GET /accounts/{accountId}/resource-library/applications` | List applications |
| `client.api.applications.createResourceLibraryApplication` | `POST /accounts/{accountId}/resource-library/applications` | Create application |
| `client.api.applications.lookupResourceLibraryApplications` | `POST /accounts/{accountId}/resource-library/applications/lookup` | Look up applications in a rule sentence |
| `client.api.applications.deleteResourceLibraryApplication` | `DELETE /accounts/{accountId}/resource-library/applications/{id}` | Delete application |
| `client.api.applications.getResourceLibraryApplicationById` | `GET /accounts/{accountId}/resource-library/applications/{id}` | Get application |
| `client.api.applications.updateResourceLibraryApplication` | `PATCH /accounts/{accountId}/resource-library/applications/{id}` | Update application |

## containerInstances

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.containerInstances.listContainerInstances` | `GET /accounts/{accountId}/containers/applications/{applicationId}/instances` | List container instances (deprecated) |
| `client.api.containerInstances.listContainerInstancesV2` | `GET /accounts/{accountId}/containers/applications/{applicationId}/instances-v2` | List container instances |
| `client.api.containerInstances.getContainerInstance` | `GET /accounts/{accountId}/containers/applications/{applicationId}/instances/{instanceId}` | Get a container instance |

## rollouts

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.rollouts.createApplicationRollout` | `POST /accounts/{accountId}/containers/applications/{applicationId}/rollouts` | Create a new rollout for an application |

## containerImages

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.containerImages.prepareContainerImage` | `POST /accounts/{accountId}/containers/image-preparations` | Prepare a container image |

## imageRegistries

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.imageRegistries.listImageRegistries` | `GET /accounts/{accountId}/containers/registries` | Get the list of configured registries in the account |
| `client.api.imageRegistries.createImageRegistry` | `POST /accounts/{accountId}/containers/registries` | Configure a private external image registry |
| `client.api.imageRegistries.deleteImageRegistry` | `DELETE /accounts/{accountId}/containers/registries/{domain}` | Delete a registry from the account |
| `client.api.imageRegistries.generateImageRegistryCredentials` | `POST /accounts/{accountId}/containers/registries/{domain}/credentials` | Generate a JWT to interact with the specified image registry. |

## customCsrsForAnAccount

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.customCsrsForAnAccount.customCsrsForAnAccountListCustomCsrs` | `GET /accounts/{accountId}/custom_csrs` | List Custom CSRs |
| `client.api.customCsrsForAnAccount.customCsrsForAnAccountCreateCustomCsr` | `POST /accounts/{accountId}/custom_csrs` | Create Custom CSR |
| `client.api.customCsrsForAnAccount.customCsrsForAnAccountDeleteCustomCsr` | `DELETE /accounts/{accountId}/custom_csrs/{customCsrId}` | Delete Custom CSR |
| `client.api.customCsrsForAnAccount.customCsrsForAnAccountCustomCsrDetails` | `GET /accounts/{accountId}/custom_csrs/{customCsrId}` | Custom CSR Details |

## accountLevelCustomNameservers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountLevelCustomNameservers.accountLevelCustomNameserversListAccountCustomNameservers` | `GET /accounts/{accountId}/custom_ns` | List Account Custom Nameservers |
| `client.api.accountLevelCustomNameservers.accountLevelCustomNameserversAddAccountCustomNameserver` | `POST /accounts/{accountId}/custom_ns` | Add Account Custom Nameserver |
| `client.api.accountLevelCustomNameservers.accountLevelCustomNameserversDeleteAccountCustomNameserver` | `DELETE /accounts/{accountId}/custom_ns/{customNsId}` | Delete Account Custom Nameserver |

## customPagesForAnAccount

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.customPagesForAnAccount.customPagesForAnAccountListCustomPages` | `GET /accounts/{accountId}/custom_pages` | List custom pages |
| `client.api.customPagesForAnAccount.customPagesForAnAccountCreatePreviewToken` | `POST /accounts/{accountId}/custom_pages/preview_tokens` | Create a preview token |
| `client.api.customPagesForAnAccount.customPagesForAnAccountGetACustomPage` | `GET /accounts/{accountId}/custom_pages/{identifier}` | Get a custom page |
| `client.api.customPagesForAnAccount.customPagesForAnAccountUpdateACustomPage` | `PUT /accounts/{accountId}/custom_pages/{identifier}` | Update a custom page |

## customAssetsForAnAccount

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.customAssetsForAnAccount.customAssetsForAnAccountListCustomAssets` | `GET /accounts/{accountId}/custom_pages/assets` | List custom assets |
| `client.api.customAssetsForAnAccount.customAssetsForAnAccountCreateACustomAsset` | `POST /accounts/{accountId}/custom_pages/assets` | Create a custom asset |
| `client.api.customAssetsForAnAccount.customAssetsForAnAccountDeleteACustomAsset` | `DELETE /accounts/{accountId}/custom_pages/assets/{assetName}` | Delete a custom asset |
| `client.api.customAssetsForAnAccount.customAssetsForAnAccountGetACustomAsset` | `GET /accounts/{accountId}/custom_pages/assets/{assetName}` | Get a custom asset |
| `client.api.customAssetsForAnAccount.customAssetsForAnAccountUpdateACustomAsset` | `PUT /accounts/{accountId}/custom_pages/assets/{assetName}` | Update a custom asset |

## cwsBasicAuthCredentials

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cwsBasicAuthCredentials.cwsListBasicAuthCredentials` | `GET /accounts/{accountId}/cws/basic-auth-credentials` | List basic-auth credentials for an account |
| `client.api.cwsBasicAuthCredentials.cwsCreateBasicAuthCredential` | `POST /accounts/{accountId}/cws/basic-auth-credentials` | Create a basic-auth credential |
| `client.api.cwsBasicAuthCredentials.cwsDeleteBasicAuthCredential` | `DELETE /accounts/{accountId}/cws/basic-auth-credentials/{credentialId}` | Delete a basic-auth credential |
| `client.api.cwsBasicAuthCredentials.cwsGetBasicAuthCredential` | `GET /accounts/{accountId}/cws/basic-auth-credentials/{credentialId}` | Get a basic-auth credential by ID |
| `client.api.cwsBasicAuthCredentials.cwsListBasicAuthSecrets` | `GET /accounts/{accountId}/cws/basic-auth-credentials/{credentialId}/secrets` | List secrets for a basic-auth credential |
| `client.api.cwsBasicAuthCredentials.cwsCreateBasicAuthSecret` | `POST /accounts/{accountId}/cws/basic-auth-credentials/{credentialId}/secrets` | Add a secret to a basic-auth credential |
| `client.api.cwsBasicAuthCredentials.cwsDeleteBasicAuthSecret` | `DELETE /accounts/{accountId}/cws/basic-auth-credentials/{credentialId}/secrets/{secretId}` | Delete a basic-auth secret |
| `client.api.cwsBasicAuthCredentials.cwsGetBasicAuthSecret` | `GET /accounts/{accountId}/cws/basic-auth-credentials/{credentialId}/secrets/{secretId}` | Get a basic-auth secret by ID |

## cwsDeployments

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cwsDeployments.cwsListDeployments` | `GET /accounts/{accountId}/cws/deployments` | List deployments |
| `client.api.cwsDeployments.cwsCreateDeployment` | `POST /accounts/{accountId}/cws/deployments` | Create a new deployment |
| `client.api.cwsDeployments.cwsDeleteDeployment` | `DELETE /accounts/{accountId}/cws/deployments/{deploymentId}` | Delete a deployment |
| `client.api.cwsDeployments.cwsGetDeployment` | `GET /accounts/{accountId}/cws/deployments/{deploymentId}` | Get a deployment by ID |
| `client.api.cwsDeployments.cwsUpdateDeployment` | `PUT /accounts/{accountId}/cws/deployments/{deploymentId}` | Update a deployment |

## cwsDomainAcls

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cwsDomainAcls.cwsListDomainAcls` | `GET /accounts/{accountId}/cws/domain-acls` | List domain ACLs |
| `client.api.cwsDomainAcls.cwsCreateDomainAcl` | `POST /accounts/{accountId}/cws/domain-acls` | Create a new domain ACL |
| `client.api.cwsDomainAcls.cwsDeleteDomainAcl` | `DELETE /accounts/{accountId}/cws/domain-acls/{domainAclId}` | Delete a domain ACL |
| `client.api.cwsDomainAcls.cwsGetDomainAcl` | `GET /accounts/{accountId}/cws/domain-acls/{domainAclId}` | Get a domain ACL by ID |
| `client.api.cwsDomainAcls.cwsUpdateDomainAcl` | `PUT /accounts/{accountId}/cws/domain-acls/{domainAclId}` | Update a domain ACL and replace its entries |

## cwsPolicies

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cwsPolicies.cwsListPolicies` | `GET /accounts/{accountId}/cws/policies` | List policies |
| `client.api.cwsPolicies.cwsCreatePolicy` | `POST /accounts/{accountId}/cws/policies` | Create a new policy |
| `client.api.cwsPolicies.cwsDeletePolicy` | `DELETE /accounts/{accountId}/cws/policies/{policyId}` | Delete a policy |
| `client.api.cwsPolicies.cwsGetPolicy` | `GET /accounts/{accountId}/cws/policies/{policyId}` | Get a policy by ID |
| `client.api.cwsPolicies.cwsUpdatePolicy` | `PUT /accounts/{accountId}/cws/policies/{policyId}` | Update a policy |

## cwsPolicySets

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cwsPolicySets.cwsListPolicySets` | `GET /accounts/{accountId}/cws/policy-sets` | List policy sets |
| `client.api.cwsPolicySets.cwsCreatePolicySet` | `POST /accounts/{accountId}/cws/policy-sets` | Create a new policy set |
| `client.api.cwsPolicySets.cwsDeletePolicySet` | `DELETE /accounts/{accountId}/cws/policy-sets/{policySetId}` | Delete a policy set |
| `client.api.cwsPolicySets.cwsGetPolicySet` | `GET /accounts/{accountId}/cws/policy-sets/{policySetId}` | Get a policy set by ID |
| `client.api.cwsPolicySets.cwsUpdatePolicySet` | `PUT /accounts/{accountId}/cws/policy-sets/{policySetId}` | Update a policy set |

## cwsRegoMetadata

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cwsRegoMetadata.cwsListRegoMetadata` | `GET /accounts/{accountId}/cws/rego-metadata` | List Rego metadata documents |
| `client.api.cwsRegoMetadata.cwsCreateRegoMetadata` | `POST /accounts/{accountId}/cws/rego-metadata` | Create a new rego metadata document |
| `client.api.cwsRegoMetadata.cwsDeleteRegoMetadata` | `DELETE /accounts/{accountId}/cws/rego-metadata/{regoMetadataId}` | Delete a rego metadata document |
| `client.api.cwsRegoMetadata.cwsGetRegoMetadata` | `GET /accounts/{accountId}/cws/rego-metadata/{regoMetadataId}` | Get a rego metadata document by ID |
| `client.api.cwsRegoMetadata.cwsUpdateRegoMetadata` | `PUT /accounts/{accountId}/cws/rego-metadata/{regoMetadataId}` | Update a rego metadata document |

## cwsRegoModules

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cwsRegoModules.cwsListRegoModules` | `GET /accounts/{accountId}/cws/rego-modules` | List Rego modules |
| `client.api.cwsRegoModules.cwsCreateRegoModule` | `POST /accounts/{accountId}/cws/rego-modules` | Create a new Rego module |
| `client.api.cwsRegoModules.cwsDeleteRegoModule` | `DELETE /accounts/{accountId}/cws/rego-modules/{regoModuleId}` | Delete a Rego module |
| `client.api.cwsRegoModules.cwsGetRegoModule` | `GET /accounts/{accountId}/cws/rego-modules/{regoModuleId}` | Get a Rego module by ID |
| `client.api.cwsRegoModules.cwsUpdateRegoModule` | `PUT /accounts/{accountId}/cws/rego-modules/{regoModuleId}` | Update a Rego module |

## cwsTenantStructures

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cwsTenantStructures.cwsListTenantStructures` | `GET /accounts/{accountId}/cws/tenant-structures` | List tenant structures for an account |
| `client.api.cwsTenantStructures.cwsCreateTenantStructure` | `POST /accounts/{accountId}/cws/tenant-structures` | Create a tenant structure |
| `client.api.cwsTenantStructures.cwsDeleteTenantStructure` | `DELETE /accounts/{accountId}/cws/tenant-structures/{structureId}` | Delete a tenant structure |
| `client.api.cwsTenantStructures.cwsGetTenantStructure` | `GET /accounts/{accountId}/cws/tenant-structures/{structureId}` | Get a tenant structure by ID |
| `client.api.cwsTenantStructures.cwsUpdateTenantStructure` | `PUT /accounts/{accountId}/cws/tenant-structures/{structureId}` | Update a tenant structure |
| `client.api.cwsTenantStructures.cwsListTenantNodes` | `GET /accounts/{accountId}/cws/tenant-structures/{structureId}/nodes` | List nodes for a tenant structure |
| `client.api.cwsTenantStructures.cwsCreateTenantNode` | `POST /accounts/{accountId}/cws/tenant-structures/{structureId}/nodes` | Add a node to a tenant structure |
| `client.api.cwsTenantStructures.cwsBatchTenantNodes` | `POST /accounts/{accountId}/cws/tenant-structures/{structureId}/nodes/batch` | Apply a batch of tenant node mutations |
| `client.api.cwsTenantStructures.cwsDeleteTenantNode` | `DELETE /accounts/{accountId}/cws/tenant-structures/{structureId}/nodes/{nodeId}` | Delete a tenant node |
| `client.api.cwsTenantStructures.cwsGetTenantNode` | `GET /accounts/{accountId}/cws/tenant-structures/{structureId}/nodes/{nodeId}` | Get a tenant node by ID |
| `client.api.cwsTenantStructures.cwsUpdateTenantNode` | `PUT /accounts/{accountId}/cws/tenant-structures/{structureId}/nodes/{nodeId}` | Update a tenant node |

## cwsWorkloads

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cwsWorkloads.cwsListWorkloads` | `GET /accounts/{accountId}/cws/workloads` | List workloads |
| `client.api.cwsWorkloads.cwsCreateWorkload` | `POST /accounts/{accountId}/cws/workloads` | Create a new workload |
| `client.api.cwsWorkloads.cwsDeleteWorkload` | `DELETE /accounts/{accountId}/cws/workloads/{workloadId}` | Delete a workload |
| `client.api.cwsWorkloads.cwsGetWorkload` | `GET /accounts/{accountId}/cws/workloads/{workloadId}` | Get a workload by ID |
| `client.api.cwsWorkloads.cwsUpdateWorkload` | `PUT /accounts/{accountId}/cws/workloads/{workloadId}` | Update a workload |

## d1

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.d1.d1ListDatabases` | `GET /accounts/{accountId}/d1/database` | List D1 Databases |
| `client.api.d1.d1CreateDatabase` | `POST /accounts/{accountId}/d1/database` | Create D1 Database |
| `client.api.d1.d1DeleteDatabase` | `DELETE /accounts/{accountId}/d1/database/{databaseId}` | Delete D1 Database |
| `client.api.d1.d1GetDatabase` | `GET /accounts/{accountId}/d1/database/{databaseId}` | Get D1 Database |
| `client.api.d1.d1UpdatePartialDatabase` | `PATCH /accounts/{accountId}/d1/database/{databaseId}` | Update D1 Database partially |
| `client.api.d1.d1UpdateDatabase` | `PUT /accounts/{accountId}/d1/database/{databaseId}` | Update D1 Database |
| `client.api.d1.d1ExportDatabase` | `POST /accounts/{accountId}/d1/database/{databaseId}/export` | Export D1 Database as SQL |
| `client.api.d1.d1ImportDatabase` | `POST /accounts/{accountId}/d1/database/{databaseId}/import` | Import SQL into your D1 Database |
| `client.api.d1.d1QueryDatabase` | `POST /accounts/{accountId}/d1/database/{databaseId}/query` | Query D1 Database |
| `client.api.d1.d1RawDatabaseQuery` | `POST /accounts/{accountId}/d1/database/{databaseId}/raw` | Raw D1 Database query |
| `client.api.d1.d1TimeTravelGetBookmark` | `GET /accounts/{accountId}/d1/database/{databaseId}/time_travel/bookmark` | Get D1 database bookmark |
| `client.api.d1.d1TimeTravelRestore` | `POST /accounts/{accountId}/d1/database/{databaseId}/time_travel/restore` | Restore D1 Database to a bookmark or point in time |
| `client.api.d1.d1UndeleteDatabase` | `POST /accounts/{accountId}/d1/database/{databaseId}/undelete` | Undelete D1 Database |

## assetSchemas

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.assetSchemas.listAssetSchemas` | `GET /accounts/{accountId}/data-security/posture/asset_schemas` | List asset schemas |
| `client.api.assetSchemas.getAssetSchema` | `GET /accounts/{accountId}/data-security/posture/asset_schemas/{assetClass}` | Get asset schema by asset class |

## content

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.content.listContentAssets` | `GET /accounts/{accountId}/data-security/posture/content` | List DLP content findings |

## exports

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.exports.createContentExport` | `POST /accounts/{accountId}/data-security/posture/content/export` | Create a content export |
| `client.api.exports.listExportJobs` | `GET /accounts/{accountId}/data-security/posture/exports` | List all export jobs |
| `client.api.exports.getExportJob` | `GET /accounts/{accountId}/data-security/posture/exports/{id}` | Get a single export job |
| `client.api.exports.createFindingExportCSV` | `POST /accounts/{accountId}/data-security/posture/findings/export` | Create new findings export request |
| `client.api.exports.createFindingInstancesExportCSV` | `POST /accounts/{accountId}/data-security/posture/findings/{storageNamespaceId}/instances/export` | Create a finding instances export |
| `client.api.exports.createRemediationJobsExportCSV` | `POST /accounts/{accountId}/data-security/posture/remediations/jobs/export` | Create a remediation jobs export |

## findingTypes

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.findingTypes.listFindingTypes` | `GET /accounts/{accountId}/data-security/posture/finding_types` | List all finding types |
| `client.api.findingTypes.createFindingType` | `POST /accounts/{accountId}/data-security/posture/finding_types` | Create a custom finding type |
| `client.api.findingTypes.validateFindingType` | `POST /accounts/{accountId}/data-security/posture/finding_types/validate` | Validate a custom finding type |
| `client.api.findingTypes.deleteFindingType` | `DELETE /accounts/{accountId}/data-security/posture/finding_types/{findingTypeId}` | Delete a custom finding type |
| `client.api.findingTypes.getFindingType` | `GET /accounts/{accountId}/data-security/posture/finding_types/{findingTypeId}` | Get finding by ID |
| `client.api.findingTypes.updateFindingType` | `PUT /accounts/{accountId}/data-security/posture/finding_types/{findingTypeId}` | Update a custom finding type |
| `client.api.findingTypes.getRemediationTypesForFindingType` | `GET /accounts/{accountId}/data-security/posture/finding_types/{findingTypeId}/remediation_types` | List remediation types for a finding type |

## findings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.findings.listFindings` | `GET /accounts/{accountId}/data-security/posture/findings` | List posture findings |
| `client.api.findings.ignoreFinding` | `POST /accounts/{accountId}/data-security/posture/findings/ignore` | Mark a finding as ignored |
| `client.api.findings.unIgnoreFinding` | `POST /accounts/{accountId}/data-security/posture/findings/unignore` | Remove ignore marker from a finding |
| `client.api.findings.getFinding` | `GET /accounts/{accountId}/data-security/posture/findings/{findingId}` | Get a posture finding |
| `client.api.findings.listFindingInstances` | `GET /accounts/{accountId}/data-security/posture/findings/{findingId}/instances` | List instances of a finding |
| `client.api.findings.archiveFindingInstance` | `POST /accounts/{accountId}/data-security/posture/findings/{findingId}/instances/archive` | Archive a finding |
| `client.api.findings.unarchiveFindingInstance` | `POST /accounts/{accountId}/data-security/posture/findings/{findingId}/instances/unarchive` | Remove the archive marking from a finding instance |
| `client.api.findings.getFindingInstance` | `GET /accounts/{accountId}/data-security/posture/findings/{findingId}/instances/{instanceId}` | Get a finding instance using an instance ID |
| `client.api.findings.resetFindingSeverity` | `POST /accounts/{accountId}/data-security/posture/findings/{findingId}/reset_finding_severity` | Reset severity for a finding back to the default |
| `client.api.findings.changeFindingSeverity` | `POST /accounts/{accountId}/data-security/posture/findings/{findingId}/tune_finding_severity` | Update the severity for a finding |

## policies

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.policies.listPolicies` | `GET /accounts/{accountId}/data-security/posture/policies` | List policy configurations |
| `client.api.policies.createPolicy` | `POST /accounts/{accountId}/data-security/posture/policies` | Create a new policy configuration |
| `client.api.policies.deletePolicy` | `DELETE /accounts/{accountId}/data-security/posture/policies/{policyId}` | Delete a policy configuration |
| `client.api.policies.getPolicyByID` | `GET /accounts/{accountId}/data-security/posture/policies/{policyId}` | Get a policy configuration by ID |
| `client.api.policies.updatePolicy` | `PUT /accounts/{accountId}/data-security/posture/policies/{policyId}` | Update a policy configuration |
| `client.api.policies.listPolicyLogEntries` | `GET /accounts/{accountId}/data-security/posture/policy_logs` | List policy invocation logs |

## remediations

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.remediations.listRemediationJobs` | `GET /accounts/{accountId}/data-security/posture/remediations/jobs` | List remediation jobs |
| `client.api.remediations.createRemediationJobs` | `POST /accounts/{accountId}/data-security/posture/remediations/jobs` | Creates remediation jobs |

## webhooks

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.webhooks.listWebhooks` | `GET /accounts/{accountId}/data-security/posture/webhooks` | List webhook configurations |
| `client.api.webhooks.createWebhook` | `POST /accounts/{accountId}/data-security/posture/webhooks` | Create a new webhook configuration |
| `client.api.webhooks.evaluateNewWebhook` | `POST /accounts/{accountId}/data-security/posture/webhooks/evaluate` | Test a webhook configuration before creating it |
| `client.api.webhooks.createWebhookJobs` | `POST /accounts/{accountId}/data-security/posture/webhooks/jobs` | Create webhook jobs |
| `client.api.webhooks.deleteWebhook` | `DELETE /accounts/{accountId}/data-security/posture/webhooks/{webhookId}` | Delete a webhook configuration |
| `client.api.webhooks.getWebhookConfigByID` | `GET /accounts/{accountId}/data-security/posture/webhooks/{webhookId}` | Get webhook configuration by ID |
| `client.api.webhooks.updateWebhook` | `PUT /accounts/{accountId}/data-security/posture/webhooks/{webhookId}` | Update an existing webhook configuration |
| `client.api.webhooks.evaluateExistingWebhook` | `POST /accounts/{accountId}/data-security/posture/webhooks/{webhookId}/evaluate` | Test an existing webhook configuration |
| `client.api.webhooks.getAllWebhooks` | `GET /accounts/{accountId}/realtime/kit/{appId}/webhooks` | Fetch all webhooks details |
| `client.api.webhooks.addWebhook` | `POST /accounts/{accountId}/realtime/kit/{appId}/webhooks` | Add a webhook |
| `client.api.webhooks.getAllWebhookEvents` | `GET /accounts/{accountId}/realtime/kit/{appId}/webhooks/all` | Fetch all supported webhook events |
| `client.api.webhooks.deleteAccountsAccountIdRealtimeKitAppIdWebhooksWebhookId` | `DELETE /accounts/{accountId}/realtime/kit/{appId}/webhooks/{webhookId}` | Delete a webhook |
| `client.api.webhooks.getWebhook` | `GET /accounts/{accountId}/realtime/kit/{appId}/webhooks/{webhookId}` | Fetch details of a webhook |
| `client.api.webhooks.editWebhook` | `PATCH /accounts/{accountId}/realtime/kit/{appId}/webhooks/{webhookId}` | Edit a webhook |
| `client.api.webhooks.replaceWebhook` | `PUT /accounts/{accountId}/realtime/kit/{appId}/webhooks/{webhookId}` | Replace a webhook |

## devices

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.devices.devicesListDevices` | `GET /accounts/{accountId}/devices` | List devices (deprecated) |
| `client.api.devices.devicesListDeviceSettingsPolicies` | `GET /accounts/{accountId}/devices/policies` | List device settings profiles |
| `client.api.devices.devicesGetDefaultDeviceSettingsPolicy` | `GET /accounts/{accountId}/devices/policy` | Get the default device settings profile |
| `client.api.devices.devicesUpdateDefaultDeviceSettingsPolicy` | `PATCH /accounts/{accountId}/devices/policy` | Update the default device settings profile |
| `client.api.devices.devicesCreateDeviceSettingsPolicy` | `POST /accounts/{accountId}/devices/policy` | Create a device settings profile |
| `client.api.devices.devicesDeleteSplitTunnelExcludeList` | `DELETE /accounts/{accountId}/devices/policy/exclude` | Reset Split Tunnel exclude list |
| `client.api.devices.devicesGetSplitTunnelExcludeList` | `GET /accounts/{accountId}/devices/policy/exclude` | Get the Split Tunnel exclude list |
| `client.api.devices.devicesSetSplitTunnelExcludeList` | `PUT /accounts/{accountId}/devices/policy/exclude` | Set the Split Tunnel exclude list |
| `client.api.devices.devicesDeleteLocalDomainFallbackList` | `DELETE /accounts/{accountId}/devices/policy/fallback_domains` | Reset Local Domain Fallback |
| `client.api.devices.devicesGetLocalDomainFallbackList` | `GET /accounts/{accountId}/devices/policy/fallback_domains` | Get your Local Domain Fallback list |
| `client.api.devices.devicesSetLocalDomainFallbackList` | `PUT /accounts/{accountId}/devices/policy/fallback_domains` | Set your Local Domain Fallback list |
| `client.api.devices.devicesGetSplitTunnelIncludeList` | `GET /accounts/{accountId}/devices/policy/include` | Get the Split Tunnel include list |
| `client.api.devices.devicesSetSplitTunnelIncludeList` | `PUT /accounts/{accountId}/devices/policy/include` | Set the Split Tunnel include list |
| `client.api.devices.devicesDeleteDeviceSettingsPolicy` | `DELETE /accounts/{accountId}/devices/policy/{policyId}` | Delete a device settings profile |
| `client.api.devices.devicesGetDeviceSettingsPolicyById` | `GET /accounts/{accountId}/devices/policy/{policyId}` | Get device settings profile by ID |
| `client.api.devices.devicesUpdateDeviceSettingsPolicy` | `PATCH /accounts/{accountId}/devices/policy/{policyId}` | Update a device settings profile |
| `client.api.devices.devicesDeleteSplitTunnelExcludeListForADeviceSettingsPolicy` | `DELETE /accounts/{accountId}/devices/policy/{policyId}/exclude` | Reset Split Tunnel exclude list |
| `client.api.devices.devicesGetSplitTunnelExcludeListForADeviceSettingsPolicy` | `GET /accounts/{accountId}/devices/policy/{policyId}/exclude` | Get the Split Tunnel exclude list for a device settings profile |
| `client.api.devices.devicesSetSplitTunnelExcludeListForADeviceSettingsPolicy` | `PUT /accounts/{accountId}/devices/policy/{policyId}/exclude` | Set the Split Tunnel exclude list for a device settings profile |
| `client.api.devices.devicesDeleteLocalDomainFallbackListForADeviceSettingsPolicy` | `DELETE /accounts/{accountId}/devices/policy/{policyId}/fallback_domains` | Reset Local Domain Fallback |
| `client.api.devices.devicesGetLocalDomainFallbackListForADeviceSettingsPolicy` | `GET /accounts/{accountId}/devices/policy/{policyId}/fallback_domains` | Get the Local Domain Fallback list for a device settings profile |
| `client.api.devices.devicesSetLocalDomainFallbackListForADeviceSettingsPolicy` | `PUT /accounts/{accountId}/devices/policy/{policyId}/fallback_domains` | Set the Local Domain Fallback list for a device settings profile |
| `client.api.devices.devicesGetSplitTunnelIncludeListForADeviceSettingsPolicy` | `GET /accounts/{accountId}/devices/policy/{policyId}/include` | Get the Split Tunnel include list for a device settings profile |
| `client.api.devices.devicesSetSplitTunnelIncludeListForADeviceSettingsPolicy` | `PUT /accounts/{accountId}/devices/policy/{policyId}/include` | Set the Split Tunnel include list for a device settings profile |
| `client.api.devices.devicesRevokeDevices` | `POST /accounts/{accountId}/devices/revoke` | Revoke devices (deprecated) |
| `client.api.devices.devicesUnrevokeDevices` | `POST /accounts/{accountId}/devices/unrevoke` | Unrevoke devices (deprecated) |
| `client.api.devices.devicesDeviceDetails` | `GET /accounts/{accountId}/devices/{deviceId}` | Get device (deprecated) |
| `client.api.devices.devicesListAdminOverrideCodeForDevice` | `GET /accounts/{accountId}/devices/{deviceId}/override_codes` | Get override codes (deprecated) |
| `client.api.devices.devicesGetPolicyCertificates` | `GET /zones/{zoneId}/devices/policy/certificates` | Get device certificate provisioning status |
| `client.api.devices.devicesUpdatePolicyCertificates` | `PATCH /zones/{zoneId}/devices/policy/certificates` | Update device certificate provisioning status |

## clientVersions

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.clientVersions.listClientVersions` | `GET /accounts/{accountId}/devices/client-versions` | List client versions |
| `client.api.clientVersions.listClientTargetEnvironments` | `GET /accounts/{accountId}/devices/client-versions/target-environments` | List available target environments |

## deploymentGroups

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.deploymentGroups.listDeploymentGroups` | `GET /accounts/{accountId}/devices/deployment-groups` | List deployment groups |
| `client.api.deploymentGroups.createDeploymentGroup` | `POST /accounts/{accountId}/devices/deployment-groups` | Create deployment group |
| `client.api.deploymentGroups.deleteDeploymentGroup` | `DELETE /accounts/{accountId}/devices/deployment-groups/{groupId}` | Delete deployment group |
| `client.api.deploymentGroups.getDeploymentGroup` | `GET /accounts/{accountId}/devices/deployment-groups/{groupId}` | Get deployment group |
| `client.api.deploymentGroups.updateDeploymentGroup` | `PATCH /accounts/{accountId}/devices/deployment-groups/{groupId}` | Update deployment group |

## ipProfiles

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ipProfiles.listIpProfiles` | `GET /accounts/{accountId}/devices/ip-profiles` | List IP profiles |
| `client.api.ipProfiles.createIpProfile` | `POST /accounts/{accountId}/devices/ip-profiles` | Create IP profile |
| `client.api.ipProfiles.deleteIpProfile` | `DELETE /accounts/{accountId}/devices/ip-profiles/{profileId}` | Delete IP profile |
| `client.api.ipProfiles.getIpProfile` | `GET /accounts/{accountId}/devices/ip-profiles/{profileId}` | Get IP profile |
| `client.api.ipProfiles.updateIpProfile` | `PATCH /accounts/{accountId}/devices/ip-profiles/{profileId}` | Update IP profile |

## deviceManagedNetworks

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.deviceManagedNetworks.deviceManagedNetworksListDeviceManagedNetworks` | `GET /accounts/{accountId}/devices/networks` | List your device managed networks |
| `client.api.deviceManagedNetworks.deviceManagedNetworksCreateDeviceManagedNetwork` | `POST /accounts/{accountId}/devices/networks` | Create a device managed network |
| `client.api.deviceManagedNetworks.deviceManagedNetworksDeleteDeviceManagedNetwork` | `DELETE /accounts/{accountId}/devices/networks/{networkId}` | Delete a device managed network |
| `client.api.deviceManagedNetworks.deviceManagedNetworksDeviceManagedNetworkDetails` | `GET /accounts/{accountId}/devices/networks/{networkId}` | Get device managed network details |
| `client.api.deviceManagedNetworks.deviceManagedNetworksUpdateDeviceManagedNetwork` | `PUT /accounts/{accountId}/devices/networks/{networkId}` | Update a device managed network |

## overrideCodes

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.overrideCodes.createOverrideCode` | `POST /accounts/{accountId}/devices/override_codes` | Generate an uninstall protection override code |

## physicalDevices

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.physicalDevices.listDevices` | `GET /accounts/{accountId}/devices/physical-devices` | List devices |
| `client.api.physicalDevices.deleteDevice` | `DELETE /accounts/{accountId}/devices/physical-devices/{deviceId}` | Delete device |
| `client.api.physicalDevices.getDevice` | `GET /accounts/{accountId}/devices/physical-devices/{deviceId}` | Get device |
| `client.api.physicalDevices.patchDevice` | `PATCH /accounts/{accountId}/devices/physical-devices/{deviceId}` | Update device |
| `client.api.physicalDevices.revokeDevice` | `POST /accounts/{accountId}/devices/physical-devices/{deviceId}/revoke` | Revoke device registrations |
| `client.api.physicalDevices.deleteRegistrations` | `DELETE /accounts/{accountId}/devices/registrations` | Delete registrations |

## devicePostureRules

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.devicePostureRules.devicePostureRulesListDevicePostureRules` | `GET /accounts/{accountId}/devices/posture` | List posture rules |
| `client.api.devicePostureRules.devicePostureRulesCreateDevicePostureRule` | `POST /accounts/{accountId}/devices/posture` | Create posture rule |
| `client.api.devicePostureRules.devicePostureRulesDeleteDevicePostureRule` | `DELETE /accounts/{accountId}/devices/posture/{ruleId}` | Delete posture rule |
| `client.api.devicePostureRules.devicePostureRulesDevicePostureRulesDetails` | `GET /accounts/{accountId}/devices/posture/{ruleId}` | Get posture rule |
| `client.api.devicePostureRules.devicePostureRulesUpdateDevicePostureRule` | `PUT /accounts/{accountId}/devices/posture/{ruleId}` | Update posture rule |

## devicePostureIntegrations

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.devicePostureIntegrations.devicePostureIntegrationsListDevicePostureIntegrations` | `GET /accounts/{accountId}/devices/posture/integration` | List posture integrations |
| `client.api.devicePostureIntegrations.devicePostureIntegrationsCreateDevicePostureIntegration` | `POST /accounts/{accountId}/devices/posture/integration` | Create posture integration |
| `client.api.devicePostureIntegrations.devicePostureIntegrationsDeleteDevicePostureIntegration` | `DELETE /accounts/{accountId}/devices/posture/integration/{integrationId}` | Delete posture integration |
| `client.api.devicePostureIntegrations.devicePostureIntegrationsDevicePostureIntegrationDetails` | `GET /accounts/{accountId}/devices/posture/integration/{integrationId}` | Get posture integration |
| `client.api.devicePostureIntegrations.devicePostureIntegrationsUpdateDevicePostureIntegration` | `PATCH /accounts/{accountId}/devices/posture/integration/{integrationId}` | Update posture integration |

## registrations

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.registrations.listRegistrations` | `GET /accounts/{accountId}/devices/registrations` | List registrations |
| `client.api.registrations.revokeRegistrations` | `POST /accounts/{accountId}/devices/registrations/revoke` | Revoke registrations |
| `client.api.registrations.unrevokeRegistrations` | `POST /accounts/{accountId}/devices/registrations/unrevoke` | Unrevoke registrations |
| `client.api.registrations.deleteRegistration` | `DELETE /accounts/{accountId}/devices/registrations/{registrationId}` | Delete registration |
| `client.api.registrations.getRegistration` | `GET /accounts/{accountId}/devices/registrations/{registrationId}` | Get registration |

## warpTeamsDeviceApiOther

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.warpTeamsDeviceApiOther.getRegistrationOverrideCodes` | `GET /accounts/{accountId}/devices/registrations/{registrationId}/override_codes` | Get override codes |

## devicesResilience

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.devicesResilience.devicesResilienceRetrieveGlobalWarpOverride` | `GET /accounts/{accountId}/devices/resilience/disconnect` | Get Global Disconnect |
| `client.api.devicesResilience.devicesResilienceSetGlobalWarpOverride` | `POST /accounts/{accountId}/devices/resilience/disconnect` | Set Global Disconnect |

## zeroTrustAccounts

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustAccounts.zeroTrustAccountsDeleteDeviceSettingsForZeroTrustAccount` | `DELETE /accounts/{accountId}/devices/settings` | Reset device settings |
| `client.api.zeroTrustAccounts.zeroTrustAccountsGetDeviceSettingsForZeroTrustAccount` | `GET /accounts/{accountId}/devices/settings` | Get device settings |
| `client.api.zeroTrustAccounts.zeroTrustAccountsPatchDeviceSettingsForTheZeroTrustAccount` | `PATCH /accounts/{accountId}/devices/settings` | Update device settings |
| `client.api.zeroTrustAccounts.zeroTrustAccountsUpdateDeviceSettingsForTheZeroTrustAccount` | `PUT /accounts/{accountId}/devices/settings` | Update device settings (deprecated) |
| `client.api.zeroTrustAccounts.zeroTrustAccountsGetZeroTrustAccountInformation` | `GET /accounts/{accountId}/gateway` | Get Zero Trust account information |
| `client.api.zeroTrustAccounts.zeroTrustAccountsCreateZeroTrustAccount` | `POST /accounts/{accountId}/gateway` | Create Zero Trust account |
| `client.api.zeroTrustAccounts.zeroTrustAccountsGetZeroTrustAccountConfiguration` | `GET /accounts/{accountId}/gateway/configuration` | Get Zero Trust account configuration |
| `client.api.zeroTrustAccounts.zeroTrustAccountsPatchZeroTrustAccountConfiguration` | `PATCH /accounts/{accountId}/gateway/configuration` | Patch Zero Trust account configuration |
| `client.api.zeroTrustAccounts.zeroTrustAccountsUpdateZeroTrustAccountConfiguration` | `PUT /accounts/{accountId}/gateway/configuration` | Update Zero Trust account configuration |
| `client.api.zeroTrustAccounts.zeroTrustAccountsGetZeroTrustCertificateConfiguration` | `GET /accounts/{accountId}/gateway/configuration/custom_certificate` | Get Zero Trust certificate configuration |
| `client.api.zeroTrustAccounts.zeroTrustAccountsGetEgressCidrPairs` | `GET /accounts/{accountId}/gateway/egress_cidr_pairs` | Get gateway egress CIDRs pairs assigned to this account |
| `client.api.zeroTrustAccounts.zeroTrustAccountsGetLoggingSettingsForTheZeroTrustAccount` | `GET /accounts/{accountId}/gateway/logging` | Get logging settings for the Zero Trust account |
| `client.api.zeroTrustAccounts.zeroTrustAccountsUpdateLoggingSettingsForTheZeroTrustAccount` | `PUT /accounts/{accountId}/gateway/logging` | Update Zero Trust account logging settings |

## dexSyntheticApplicationMonitoring

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dexSyntheticApplicationMonitoring.dexEndpointsListColos` | `GET /accounts/{accountId}/dex/colos` | List Cloudflare colos |
| `client.api.dexSyntheticApplicationMonitoring.deviceDexTestDetails` | `GET /accounts/{accountId}/dex/devices/dex_tests` | List Device DEX tests |
| `client.api.dexSyntheticApplicationMonitoring.deviceDexTestCreateDeviceDexTest` | `POST /accounts/{accountId}/dex/devices/dex_tests` | Create Device DEX test |
| `client.api.dexSyntheticApplicationMonitoring.deviceDexTestDeleteDeviceDexTest` | `DELETE /accounts/{accountId}/dex/devices/dex_tests/{dexTestId}` | Delete Device DEX test |
| `client.api.dexSyntheticApplicationMonitoring.deviceDexTestGetDeviceDexTest` | `GET /accounts/{accountId}/dex/devices/dex_tests/{dexTestId}` | Get Device DEX test |
| `client.api.dexSyntheticApplicationMonitoring.deviceDexTestUpdateDeviceDexTest` | `PUT /accounts/{accountId}/dex/devices/dex_tests/{dexTestId}` | Update Device DEX test |
| `client.api.dexSyntheticApplicationMonitoring.devicesLiveStatus` | `GET /accounts/{accountId}/dex/devices/{deviceId}/fleet-status/live` | Get the latest status of a device. |
| `client.api.dexSyntheticApplicationMonitoring.dexDeviceStatusOverTime` | `GET /accounts/{accountId}/dex/devices/{deviceId}/fleet-status/over-time` | Get the status over time for a device |
| `client.api.dexSyntheticApplicationMonitoring.dexEndpointsListDeviceIsps` | `GET /accounts/{accountId}/dex/devices/{deviceId}/isps` | List device ISPs |
| `client.api.dexSyntheticApplicationMonitoring.dexFleetStatusDevices` | `GET /accounts/{accountId}/dex/fleet-status/devices` | List details of devices using WARP. |
| `client.api.dexSyntheticApplicationMonitoring.dexFleetStatusLive` | `GET /accounts/{accountId}/dex/fleet-status/live` | Get live aggregate device details by dimension |
| `client.api.dexSyntheticApplicationMonitoring.dexFleetStatusOverTime` | `GET /accounts/{accountId}/dex/fleet-status/over-time` | Get over time aggregate details for devices by dimension |
| `client.api.dexSyntheticApplicationMonitoring.dexEndpointsHttpTestDetails` | `GET /accounts/{accountId}/dex/http-tests/{testId}` | Get details and aggregate metrics for an http test |
| `client.api.dexSyntheticApplicationMonitoring.dexEndpointsHttpTestPercentiles` | `GET /accounts/{accountId}/dex/http-tests/{testId}/percentiles` | Get percentiles for an http test |
| `client.api.dexSyntheticApplicationMonitoring.dexEndpointsListTestsOverview` | `GET /accounts/{accountId}/dex/tests/overview` | List DEX test analytics |
| `client.api.dexSyntheticApplicationMonitoring.dexEndpointsTestsUniqueDevices` | `GET /accounts/{accountId}/dex/tests/unique-devices` | Get count of devices targeted |
| `client.api.dexSyntheticApplicationMonitoring.dexEndpointsTracerouteTestResultNetworkPath` | `GET /accounts/{accountId}/dex/traceroute-test-results/{testResultId}/network-path` | Get details for a specific traceroute test run |
| `client.api.dexSyntheticApplicationMonitoring.dexEndpointsTracerouteTestDetails` | `GET /accounts/{accountId}/dex/traceroute-tests/{testId}` | Get details and aggregate metrics for a traceroute test |
| `client.api.dexSyntheticApplicationMonitoring.dexEndpointsTracerouteTestNetworkPath` | `GET /accounts/{accountId}/dex/traceroute-tests/{testId}/network-path` | Get network path breakdown for a traceroute test |
| `client.api.dexSyntheticApplicationMonitoring.dexEndpointsTracerouteTestPercentiles` | `GET /accounts/{accountId}/dex/traceroute-tests/{testId}/percentiles` | Get percentiles for a traceroute test |

## dexRemoteCommands

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dexRemoteCommands.getCommands` | `GET /accounts/{accountId}/dex/commands` | List account commands |
| `client.api.dexRemoteCommands.postCommands` | `POST /accounts/{accountId}/dex/commands` | Create account commands |
| `client.api.dexRemoteCommands.getCommandsEligibleDevices` | `GET /accounts/{accountId}/dex/commands/devices` | List devices eligible for remote captures |
| `client.api.dexRemoteCommands.getCommandsQuota` | `GET /accounts/{accountId}/dex/commands/quota` | Returns account commands usage, quota, and reset time |
| `client.api.dexRemoteCommands.getCommandsCommandIdDownloadsFilename` | `GET /accounts/{accountId}/dex/commands/{commandId}/downloads/{filename}` | Download command output file |

## dexRules

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dexRules.listDexRules` | `GET /accounts/{accountId}/dex/rules` | List DEX Rules |
| `client.api.dexRules.createDexRule` | `POST /accounts/{accountId}/dex/rules` | Create a DEX Rule |
| `client.api.dexRules.deleteDexRule` | `DELETE /accounts/{accountId}/dex/rules/{ruleId}` | Delete a DEX Rule |
| `client.api.dexRules.getDexRule` | `GET /accounts/{accountId}/dex/rules/{ruleId}` | Get DEX Rule |
| `client.api.dexRules.updateDexRule` | `PATCH /accounts/{accountId}/dex/rules/{ruleId}` | Update a DEX Rule |

## warpChangeEvents

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.warpChangeEvents.listWarpChangeEvents` | `GET /accounts/{accountId}/dex/warp-change-events` | List WARP change events. |

## endpointHealthChecks

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.endpointHealthChecks.diagnosticsEndpointHealthcheckList` | `GET /accounts/{accountId}/diagnostics/endpoint-healthchecks` | List Endpoint Health Checks |
| `client.api.endpointHealthChecks.diagnosticsEndpointHealthcheckCreate` | `POST /accounts/{accountId}/diagnostics/endpoint-healthchecks` | Endpoint Health Check |
| `client.api.endpointHealthChecks.diagnosticsEndpointHealthcheckDelete` | `DELETE /accounts/{accountId}/diagnostics/endpoint-healthchecks/{id}` | Delete Endpoint Health Check |
| `client.api.endpointHealthChecks.diagnosticsEndpointHealthcheckGet` | `GET /accounts/{accountId}/diagnostics/endpoint-healthchecks/{id}` | Get Endpoint Health Check |
| `client.api.endpointHealthChecks.diagnosticsEndpointHealthcheckUpdate` | `PUT /accounts/{accountId}/diagnostics/endpoint-healthchecks/{id}` | Update Endpoint Health Check |

## diagnostics

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.diagnostics.diagnosticsTraceroute` | `POST /accounts/{accountId}/diagnostics/traceroute` | Traceroute |

## dlpCustomPromptTopics

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dlpCustomPromptTopics.dlpCustomPromptTopicsList` | `GET /accounts/{accountId}/dlp/custom_prompt_topics` | List custom prompt topics |
| `client.api.dlpCustomPromptTopics.dlpCustomPromptTopicsCreate` | `POST /accounts/{accountId}/dlp/custom_prompt_topics` | Create custom prompt topic |
| `client.api.dlpCustomPromptTopics.dlpCustomPromptTopicsDelete` | `DELETE /accounts/{accountId}/dlp/custom_prompt_topics/{entryId}` | Delete custom prompt topic |
| `client.api.dlpCustomPromptTopics.dlpCustomPromptTopicsGet` | `GET /accounts/{accountId}/dlp/custom_prompt_topics/{entryId}` | Get custom prompt topic |
| `client.api.dlpCustomPromptTopics.dlpCustomPromptTopicsUpdate` | `PUT /accounts/{accountId}/dlp/custom_prompt_topics/{entryId}` | Update custom prompt topic |

## dlpDataClasses

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dlpDataClasses.dlpDataClassesList` | `GET /accounts/{accountId}/dlp/data_classes` | Retrieve all data classes in an account |
| `client.api.dlpDataClasses.dlpDataClassesCreate` | `POST /accounts/{accountId}/dlp/data_classes` | Creates a new data class |
| `client.api.dlpDataClasses.dlpDataClassesDelete` | `DELETE /accounts/{accountId}/dlp/data_classes/{dataClassId}` | Delete a single data class |
| `client.api.dlpDataClasses.dlpDataClassesRead` | `GET /accounts/{accountId}/dlp/data_classes/{dataClassId}` | Retrieve a specific data class |
| `client.api.dlpDataClasses.dlpDataClassesUpdate` | `PUT /accounts/{accountId}/dlp/data_classes/{dataClassId}` | Update the attributes of a single data class |

## dlpDataTagCategories

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dlpDataTagCategories.dlpDataTagCategoriesList` | `GET /accounts/{accountId}/dlp/data_tag_categories` | Retrieve all data tag categories in an account |
| `client.api.dlpDataTagCategories.dlpDataTagCategoriesCreate` | `POST /accounts/{accountId}/dlp/data_tag_categories` | Creates a new data tag category. |
| `client.api.dlpDataTagCategories.dlpDataTagCategoriesDelete` | `DELETE /accounts/{accountId}/dlp/data_tag_categories/{categoryId}` | Delete a single data tag category. |
| `client.api.dlpDataTagCategories.dlpDataTagCategoriesRead` | `GET /accounts/{accountId}/dlp/data_tag_categories/{categoryId}` | Retrieve a specific data tag category. |
| `client.api.dlpDataTagCategories.dlpDataTagCategoriesUpdate` | `PUT /accounts/{accountId}/dlp/data_tag_categories/{categoryId}` | Update the attributes of a single data tag category. |

## dlpDataTags

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dlpDataTags.dlpDataTagsList` | `GET /accounts/{accountId}/dlp/data_tag_categories/{categoryId}/data_tags` | Retrieve all data tags in a data tag category |
| `client.api.dlpDataTags.dlpDataTagsCreate` | `POST /accounts/{accountId}/dlp/data_tag_categories/{categoryId}/data_tags` | Creates a new data tag. |
| `client.api.dlpDataTags.dlpDataTagsDelete` | `DELETE /accounts/{accountId}/dlp/data_tag_categories/{categoryId}/data_tags/{tagId}` | Delete a single data tag. |
| `client.api.dlpDataTags.dlpDataTagsRead` | `GET /accounts/{accountId}/dlp/data_tag_categories/{categoryId}/data_tags/{tagId}` | Retrieve a specific data tag. |
| `client.api.dlpDataTags.dlpDataTagsUpdate` | `PUT /accounts/{accountId}/dlp/data_tag_categories/{categoryId}/data_tags/{tagId}` | Update the attributes of a single data tag. |

## dlpDataTagCategoryTemplates

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dlpDataTagCategoryTemplates.dlpDataTagCategoryTemplatesList` | `GET /accounts/{accountId}/dlp/data_tag_category_templates` | Retrieve all data tag category templates in an account |
| `client.api.dlpDataTagCategoryTemplates.dlpDataTagCategoryTemplateRead` | `GET /accounts/{accountId}/dlp/data_tag_category_templates/{templateId}` | Retrieve a specific data tag category template. |

## dlpDatasets

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dlpDatasets.dlpDatasetsReadAll` | `GET /accounts/{accountId}/dlp/datasets` | Fetch all datasets |
| `client.api.dlpDatasets.dlpDatasetsCreate` | `POST /accounts/{accountId}/dlp/datasets` | Create a new dataset |
| `client.api.dlpDatasets.dlpDatasetsDelete` | `DELETE /accounts/{accountId}/dlp/datasets/{datasetId}` | Delete a dataset |
| `client.api.dlpDatasets.dlpDatasetsRead` | `GET /accounts/{accountId}/dlp/datasets/{datasetId}` | Fetch a specific dataset |
| `client.api.dlpDatasets.dlpDatasetsUpdate` | `PUT /accounts/{accountId}/dlp/datasets/{datasetId}` | Update details about a dataset |
| `client.api.dlpDatasets.dlpDatasetsCreateVersion` | `POST /accounts/{accountId}/dlp/datasets/{datasetId}/upload` | Prepare to upload a new version of a dataset |
| `client.api.dlpDatasets.dlpDatasetsUploadVersion` | `POST /accounts/{accountId}/dlp/datasets/{datasetId}/upload/{version}` | Upload a new version of a dataset |
| `client.api.dlpDatasets.dlpDatasetsDefineColumns` | `POST /accounts/{accountId}/dlp/datasets/{datasetId}/versions/{version}` | Sets the column information for a multi-column upload |
| `client.api.dlpDatasets.dlpDatasetsUploadDatasetColumn` | `POST /accounts/{accountId}/dlp/datasets/{datasetId}/versions/{version}/entries/{entryId}` | Upload a new version of a multi-column dataset |

## dlpDocumentFingerprints

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dlpDocumentFingerprints.dlpDocumentFingerprintsReadAll` | `GET /accounts/{accountId}/dlp/document_fingerprints` | Retrieve data about all document fingerprints. |
| `client.api.dlpDocumentFingerprints.dlpDocumentFingerprintsCreate` | `POST /accounts/{accountId}/dlp/document_fingerprints` | Creates a new document fingerprint. |
| `client.api.dlpDocumentFingerprints.dlpDocumentFingerprintsDelete` | `DELETE /accounts/{accountId}/dlp/document_fingerprints/{documentFingerprintId}` | Delete a single document fingerprint. |
| `client.api.dlpDocumentFingerprints.dlpDocumentFingerprintsRead` | `GET /accounts/{accountId}/dlp/document_fingerprints/{documentFingerprintId}` | Retrieve data about a specific document fingerprint. |
| `client.api.dlpDocumentFingerprints.dlpDocumentFingerprintsUpdate` | `POST /accounts/{accountId}/dlp/document_fingerprints/{documentFingerprintId}` | Update the attributes of a single document fingerprint. |
| `client.api.dlpDocumentFingerprints.dlpDocumentFingerprintsUpload` | `PUT /accounts/{accountId}/dlp/document_fingerprints/{documentFingerprintId}` | Uploads a new version for a document fingerprint. |

## dlpEmail

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dlpEmail.dlpEmailScannerGetAccountMapping` | `GET /accounts/{accountId}/dlp/email/account_mapping` | Get mapping |
| `client.api.dlpEmail.dlpEmailScannerCreateAccountMapping` | `POST /accounts/{accountId}/dlp/email/account_mapping` | Create mapping |
| `client.api.dlpEmail.dlpEmailScannerListAllRules` | `GET /accounts/{accountId}/dlp/email/rules` | List all email scanner rules |
| `client.api.dlpEmail.dlpEmailScannerUpdateRulePriorities` | `PATCH /accounts/{accountId}/dlp/email/rules` | Update email scanner rule priorities |
| `client.api.dlpEmail.dlpEmailScannerCreateRule` | `POST /accounts/{accountId}/dlp/email/rules` | Create email scanner rule |
| `client.api.dlpEmail.dlpEmailScannerDeleteRule` | `DELETE /accounts/{accountId}/dlp/email/rules/{ruleId}` | Delete email scanner rule |
| `client.api.dlpEmail.dlpEmailScannerGetRule` | `GET /accounts/{accountId}/dlp/email/rules/{ruleId}` | Get an email scanner rule |
| `client.api.dlpEmail.dlpEmailScannerUpdateRule` | `PUT /accounts/{accountId}/dlp/email/rules/{ruleId}` | Update email scanner rule |

## dlpEntries

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dlpEntries.dlpEntriesListAllEntries` | `GET /accounts/{accountId}/dlp/entries` | List all entries |
| `client.api.dlpEntries.dlpEntriesCreateEntry` | `POST /accounts/{accountId}/dlp/entries` | Create custom entry |
| `client.api.dlpEntries.dlpEntriesUpdateCustomEntry` | `PUT /accounts/{accountId}/dlp/entries/custom/{entryId}` | Update custom entry |
| `client.api.dlpEntries.dlpEntriesUpdatePredefinedEntry` | `PUT /accounts/{accountId}/dlp/entries/predefined/{entryId}` | Update predefined entry |
| `client.api.dlpEntries.dlpEntriesDeleteEntry` | `DELETE /accounts/{accountId}/dlp/entries/{entryId}` | Delete custom entry |
| `client.api.dlpEntries.dlpEntriesGetDlpEntry` | `GET /accounts/{accountId}/dlp/entries/{entryId}` | Get DLP Entry |
| `client.api.dlpEntries.dlpEntriesUpdateEntry` | `PUT /accounts/{accountId}/dlp/entries/{entryId}` | Update entry |

## dlpIntegrationEntries

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dlpIntegrationEntries.dlpEntriesCreateIntegrationEntry` | `POST /accounts/{accountId}/dlp/entries/integration` | Create integration entry |
| `client.api.dlpIntegrationEntries.dlpEntriesDeleteIntegrationEntry` | `DELETE /accounts/{accountId}/dlp/entries/integration/{entryId}` | Delete integration entry |
| `client.api.dlpIntegrationEntries.dlpEntriesUpdateIntegrationEntry` | `PUT /accounts/{accountId}/dlp/entries/integration/{entryId}` | Update integration entry |

## dlpPredefinedEntries

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dlpPredefinedEntries.dlpEntriesCreatePredefinedEntry` | `POST /accounts/{accountId}/dlp/entries/predefined` | Create predefined entry |
| `client.api.dlpPredefinedEntries.dlpEntriesDeletePredefinedEntry` | `DELETE /accounts/{accountId}/dlp/entries/predefined/{entryId}` | Delete predefined entry |

## dlpSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dlpSettings.dlpLimitsGet` | `GET /accounts/{accountId}/dlp/limits` | Fetch limits associated with DLP for account |
| `client.api.dlpSettings.dlpPatternValidate` | `POST /accounts/{accountId}/dlp/patterns/validate` | Validate a DLP regex pattern |
| `client.api.dlpSettings.dlpPayloadLogGet` | `GET /accounts/{accountId}/dlp/payload_log` | Get payload log settings |
| `client.api.dlpSettings.dlpPayloadLogPut` | `PUT /accounts/{accountId}/dlp/payload_log` | Set payload log settings |
| `client.api.dlpSettings.dlpSettingsDelete` | `DELETE /accounts/{accountId}/dlp/settings` | Delete (reset) DLP account-level settings to initial values. |
| `client.api.dlpSettings.dlpSettingsGet` | `GET /accounts/{accountId}/dlp/settings` | Get DLP account-level settings. |
| `client.api.dlpSettings.dlpSettingsEdit` | `PATCH /accounts/{accountId}/dlp/settings` | Partially update DLP account-level settings. |
| `client.api.dlpSettings.dlpSettingsUpdate` | `PUT /accounts/{accountId}/dlp/settings` | Update DLP account-level settings (full replacement). |

## dlpProfiles

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dlpProfiles.dlpProfilesListAllProfiles` | `GET /accounts/{accountId}/dlp/profiles` | List all profiles |
| `client.api.dlpProfiles.dlpProfilesListAllCustomProfiles` | `GET /accounts/{accountId}/dlp/profiles/custom` | List all custom profiles |
| `client.api.dlpProfiles.dlpProfilesCreateCustomProfiles` | `POST /accounts/{accountId}/dlp/profiles/custom` | Create custom profile |
| `client.api.dlpProfiles.dlpProfilesDeleteCustomProfile` | `DELETE /accounts/{accountId}/dlp/profiles/custom/{profileId}` | Delete custom profile |
| `client.api.dlpProfiles.dlpProfilesGetCustomProfile` | `GET /accounts/{accountId}/dlp/profiles/custom/{profileId}` | Get custom profile |
| `client.api.dlpProfiles.dlpProfilesUpdateCustomProfile` | `PUT /accounts/{accountId}/dlp/profiles/custom/{profileId}` | Update custom profile |
| `client.api.dlpProfiles.dlpProfilesDeleteIntegrationProfile` | `DELETE /accounts/{accountId}/dlp/profiles/integration/{profileId}` | Delete integration profile |
| `client.api.dlpProfiles.dlpProfilesListIntegrationProfileReferences` | `GET /accounts/{accountId}/dlp/profiles/integration/{profileId}/references` | List integration profile references |
| `client.api.dlpProfiles.dlpProfilesCreatePredefinedProfile` | `POST /accounts/{accountId}/dlp/profiles/predefined` | Create predefined profile |
| `client.api.dlpProfiles.dlpProfilesDeletePredefinedProfile` | `DELETE /accounts/{accountId}/dlp/profiles/predefined/{profileId}` | Delete predefined profile |
| `client.api.dlpProfiles.dlpProfilesGetPredefinedProfile` | `GET /accounts/{accountId}/dlp/profiles/predefined/{profileId}` | Get predefined profile |
| `client.api.dlpProfiles.dlpProfilesUpdatePredefinedProfile` | `PUT /accounts/{accountId}/dlp/profiles/predefined/{profileId}` | Update predefined profile |
| `client.api.dlpProfiles.dlpProfilesGetPredefinedProfileConfig` | `GET /accounts/{accountId}/dlp/profiles/predefined/{profileId}/config` | Get predefined profile config |
| `client.api.dlpProfiles.dlpProfilesCreatePredefinedProfileConfig` | `POST /accounts/{accountId}/dlp/profiles/predefined/{profileId}/config` | Create predefined profile |
| `client.api.dlpProfiles.dlpProfilesUpdatePredefinedProfileConfig` | `PUT /accounts/{accountId}/dlp/profiles/predefined/{profileId}/config` | Update predefined profile config |
| `client.api.dlpProfiles.dlpProfilesGetDlpProfile` | `GET /accounts/{accountId}/dlp/profiles/{profileId}` | Get DLP Profile |

## dlpSensitivityGroups

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dlpSensitivityGroups.dlpSensitivityGroupsList` | `GET /accounts/{accountId}/dlp/sensitivity_groups` | Retrieve all sensitivity groups in an account |
| `client.api.dlpSensitivityGroups.dlpSensitivityGroupsCreate` | `POST /accounts/{accountId}/dlp/sensitivity_groups` | Creates a new sensitivity group. |
| `client.api.dlpSensitivityGroups.dlpSensitivityGroupsDelete` | `DELETE /accounts/{accountId}/dlp/sensitivity_groups/{sensitivityGroupId}` | Delete a single sensitivity group. |
| `client.api.dlpSensitivityGroups.dlpSensitivityGroupsRead` | `GET /accounts/{accountId}/dlp/sensitivity_groups/{sensitivityGroupId}` | Retrieve a specific sensitivity group. |
| `client.api.dlpSensitivityGroups.dlpSensitivityGroupsUpdate` | `PUT /accounts/{accountId}/dlp/sensitivity_groups/{sensitivityGroupId}` | Update the attributes of a single sensitivity group. |
| `client.api.dlpSensitivityGroups.dlpSensitivityGroupsGetLevelOrder` | `GET /accounts/{accountId}/dlp/sensitivity_groups/{sensitivityGroupId}/level_order` | Retrieve the ordered list of level IDs for a sensitivity group. |
| `client.api.dlpSensitivityGroups.dlpSensitivityGroupsPutLevelOrder` | `PUT /accounts/{accountId}/dlp/sensitivity_groups/{sensitivityGroupId}/level_order` | Set the ordering of levels within a sensitivity group. |

## dlpSensitivityGroupTemplates

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dlpSensitivityGroupTemplates.dlpSensitivityGroupTemplatesList` | `GET /accounts/{accountId}/dlp/sensitivity_groups/templates` | Retrieve all sensitivity group templates in an account |
| `client.api.dlpSensitivityGroupTemplates.dlpSensitivityGroupTemplateRead` | `GET /accounts/{accountId}/dlp/sensitivity_groups/templates/{templateId}` | Retrieve a specific sensitivity group template. |

## dlpSensitivityLevels

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dlpSensitivityLevels.dlpSensitivityLevelsList` | `GET /accounts/{accountId}/dlp/sensitivity_groups/{sensitivityGroupId}/levels` | Retrieve all sensitivity levels in a sensitivity group |
| `client.api.dlpSensitivityLevels.dlpSensitivityLevelsCreate` | `POST /accounts/{accountId}/dlp/sensitivity_groups/{sensitivityGroupId}/levels` | Creates a new sensitivity level. |
| `client.api.dlpSensitivityLevels.dlpSensitivityLevelsDelete` | `DELETE /accounts/{accountId}/dlp/sensitivity_groups/{sensitivityGroupId}/levels/{sensitivityLevelId}` | Delete a single sensitivity level. |
| `client.api.dlpSensitivityLevels.dlpSensitivityLevelsRead` | `GET /accounts/{accountId}/dlp/sensitivity_groups/{sensitivityGroupId}/levels/{sensitivityLevelId}` | Retrieve a specific sensitivity level. |
| `client.api.dlpSensitivityLevels.dlpSensitivityLevelsUpdate` | `PUT /accounts/{accountId}/dlp/sensitivity_groups/{sensitivityGroupId}/levels/{sensitivityLevelId}` | Update the attributes of a single sensitivity level. |

## dlpValidators

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dlpValidators.dlpValidatorsListValidators` | `GET /accounts/{accountId}/dlp/validators` | List validators |
| `client.api.dlpValidators.dlpValidatorsListProximityWordsValidators` | `GET /accounts/{accountId}/dlp/validators/proximity_words` | List proximity word validators |
| `client.api.dlpValidators.dlpValidatorsCreateProximityWordsValidator` | `POST /accounts/{accountId}/dlp/validators/proximity_words` | Create a proximity word validator |
| `client.api.dlpValidators.dlpValidatorsDeleteProximityWordsValidator` | `DELETE /accounts/{accountId}/dlp/validators/proximity_words/{validatorId}` | Delete a proximity word validator |
| `client.api.dlpValidators.dlpValidatorsGetProximityWordsValidator` | `GET /accounts/{accountId}/dlp/validators/proximity_words/{validatorId}` | Get a proximity word validator |
| `client.api.dlpValidators.dlpValidatorsUpdateProximityWordsValidator` | `PUT /accounts/{accountId}/dlp/validators/proximity_words/{validatorId}` | Update a proximity word validator |
| `client.api.dlpValidators.dlpValidatorsListWorkerValidators` | `GET /accounts/{accountId}/dlp/validators/worker` | List worker validators |
| `client.api.dlpValidators.dlpValidatorsCreateWorkerValidator` | `POST /accounts/{accountId}/dlp/validators/worker` | Create a worker validator |
| `client.api.dlpValidators.dlpValidatorsDeleteWorkerValidator` | `DELETE /accounts/{accountId}/dlp/validators/worker/{validatorId}` | Delete a worker validator |
| `client.api.dlpValidators.dlpValidatorsGetWorkerValidator` | `GET /accounts/{accountId}/dlp/validators/worker/{validatorId}` | Get a worker validator |
| `client.api.dlpValidators.dlpValidatorsUpdateWorkerValidator` | `PUT /accounts/{accountId}/dlp/validators/worker/{validatorId}` | Update a worker validator |
| `client.api.dlpValidators.dlpValidatorsGetWorkerValidatorStatus` | `GET /accounts/{accountId}/dlp/validators/worker/{validatorId}/status` | Get a worker validator status |
| `client.api.dlpValidators.dlpValidatorsGetValidator` | `GET /accounts/{accountId}/dlp/validators/{validatorId}` | Get a validator |

## prefixBindings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.prefixBindings.publicListPrefixBindings` | `GET /accounts/{accountId}/dls/regional_services/prefix_bindings` | List DLS prefix bindings for an account |
| `client.api.prefixBindings.publicCreatePrefixBinding` | `POST /accounts/{accountId}/dls/regional_services/prefix_bindings` | Create a DLS prefix binding |
| `client.api.prefixBindings.publicDeletePrefixBinding` | `DELETE /accounts/{accountId}/dls/regional_services/prefix_bindings/{bindingId}` | Delete a DLS prefix binding |
| `client.api.prefixBindings.publicGetPrefixBinding` | `GET /accounts/{accountId}/dls/regional_services/prefix_bindings/{bindingId}` | Get a DLS prefix binding |
| `client.api.prefixBindings.publicPatchPrefixBinding` | `PATCH /accounts/{accountId}/dls/regional_services/prefix_bindings/{bindingId}` | Update a DLS prefix binding |

## regions

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.regions.publicListRegions` | `GET /accounts/{accountId}/dls/regions` | List DLS regions for an account |
| `client.api.regions.publicGetRegion` | `GET /accounts/{accountId}/dls/regions/{regionId}` | Get a DLS region |

## dnsFirewall

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dnsFirewall.dnsFirewallListDnsFirewallClusters` | `GET /accounts/{accountId}/dns_firewall` | List DNS Firewall Clusters |
| `client.api.dnsFirewall.dnsFirewallCreateDnsFirewallCluster` | `POST /accounts/{accountId}/dns_firewall` | Create DNS Firewall Cluster |
| `client.api.dnsFirewall.dnsFirewallDeleteDnsFirewallCluster` | `DELETE /accounts/{accountId}/dns_firewall/{dnsFirewallId}` | Delete DNS Firewall Cluster |
| `client.api.dnsFirewall.dnsFirewallDnsFirewallClusterDetails` | `GET /accounts/{accountId}/dns_firewall/{dnsFirewallId}` | DNS Firewall Cluster Details |
| `client.api.dnsFirewall.dnsFirewallUpdateDnsFirewallCluster` | `PATCH /accounts/{accountId}/dns_firewall/{dnsFirewallId}` | Update DNS Firewall Cluster |
| `client.api.dnsFirewall.dnsFirewallShowDnsFirewallClusterReverseDns` | `GET /accounts/{accountId}/dns_firewall/{dnsFirewallId}/reverse_dns` | Show DNS Firewall Cluster Reverse DNS |
| `client.api.dnsFirewall.dnsFirewallUpdateDnsFirewallClusterReverseDns` | `PATCH /accounts/{accountId}/dns_firewall/{dnsFirewallId}/reverse_dns` | Update DNS Firewall Cluster Reverse DNS |

## dnsFirewallAnalytics

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dnsFirewallAnalytics.dnsFirewallAnalyticsTable` | `GET /accounts/{accountId}/dns_firewall/{dnsFirewallId}/dns_analytics/report` | Table |
| `client.api.dnsFirewallAnalytics.dnsFirewallAnalyticsByTime` | `GET /accounts/{accountId}/dns_firewall/{dnsFirewallId}/dns_analytics/report/bytime` | By Time |

## dnsRecordsForAnAccount

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dnsRecordsForAnAccount.dnsRecordsForAnAccountGetUsage` | `GET /accounts/{accountId}/dns_records/usage` | Get DNS Record Usage for Account |

## dnsSettingsForAnAccount

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dnsSettingsForAnAccount.dnsSettingsForAnAccountListDnsSettings` | `GET /accounts/{accountId}/dns_settings` | Show DNS Settings |
| `client.api.dnsSettingsForAnAccount.dnsSettingsForAnAccountUpdateDnsSettings` | `PATCH /accounts/{accountId}/dns_settings` | Update DNS Settings |

## customNameserverSetsForAnAccount

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.customNameserverSetsForAnAccount.dnsSettingsForAnAccountListCustomNameserverSets` | `GET /accounts/{accountId}/dns_settings/nameserver_sets` | List Custom Nameserver Sets |
| `client.api.customNameserverSetsForAnAccount.dnsSettingsForAnAccountCreateCustomNameserverSet` | `POST /accounts/{accountId}/dns_settings/nameserver_sets` | Create Custom Nameserver Set |
| `client.api.customNameserverSetsForAnAccount.dnsSettingsForAnAccountDeleteCustomNameserverSet` | `DELETE /accounts/{accountId}/dns_settings/nameserver_sets/{nameserverSetId}` | Delete Custom Nameserver Set |
| `client.api.customNameserverSetsForAnAccount.dnsSettingsForAnAccountGetCustomNameserverSet` | `GET /accounts/{accountId}/dns_settings/nameserver_sets/{nameserverSetId}` | Get Custom Nameserver Set |
| `client.api.customNameserverSetsForAnAccount.dnsSettingsForAnAccountUpdateCustomNameserverSet` | `PATCH /accounts/{accountId}/dns_settings/nameserver_sets/{nameserverSetId}` | Update Custom Nameserver Set |

## dnsInternalViewsForAnAccount

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dnsInternalViewsForAnAccount.dnsViewsForAnAccountListInternalDnsViews` | `GET /accounts/{accountId}/dns_settings/views` | List Internal DNS Views |
| `client.api.dnsInternalViewsForAnAccount.dnsViewsForAnAccountCreateInternalDnsViews` | `POST /accounts/{accountId}/dns_settings/views` | Create Internal DNS View |
| `client.api.dnsInternalViewsForAnAccount.dnsViewsForAnAccountDeleteInternalDnsView` | `DELETE /accounts/{accountId}/dns_settings/views/{viewId}` | Delete Internal DNS View |
| `client.api.dnsInternalViewsForAnAccount.dnsViewsForAnAccountGetInternalDnsView` | `GET /accounts/{accountId}/dns_settings/views/{viewId}` | DNS Internal View Details |
| `client.api.dnsInternalViewsForAnAccount.dnsViewsForAnAccountUpdateInternalDnsView` | `PATCH /accounts/{accountId}/dns_settings/views/{viewId}` | Update Internal DNS View |

## emailSecurityAnalytics

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.emailSecurityAnalytics.emailSecurityGetMonthlyReport` | `GET /accounts/{accountId}/email-security/analytics/monthly_report` | Get monthly report |

## emailSecurity

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.emailSecurity.emailSecurityInvestigate` | `GET /accounts/{accountId}/email-security/investigate` | Search email messages |
| `client.api.emailSecurity.emailSecurityGetBulkJobs` | `GET /accounts/{accountId}/email-security/investigate/bulk` | List bulk action jobs |
| `client.api.emailSecurity.emailSecurityCreateBulkJob` | `POST /accounts/{accountId}/email-security/investigate/bulk` | Create a bulk action job |
| `client.api.emailSecurity.emailSecurityDeleteBulkJob` | `DELETE /accounts/{accountId}/email-security/investigate/bulk/{jobId}` | Delete a bulk action job |
| `client.api.emailSecurity.emailSecurityGetBulkJob` | `GET /accounts/{accountId}/email-security/investigate/bulk/{jobId}` | Get bulk action job details |
| `client.api.emailSecurity.emailSecurityCancelBulkJob` | `POST /accounts/{accountId}/email-security/investigate/bulk/{jobId}/cancel` | Cancel a bulk action job |
| `client.api.emailSecurity.emailSecurityGetBulkJobMessages` | `GET /accounts/{accountId}/email-security/investigate/bulk/{jobId}/messages` | List messages for a bulk action job |
| `client.api.emailSecurity.emailSecurityPostBulkMove` | `POST /accounts/{accountId}/email-security/investigate/move` | Move messages |
| `client.api.emailSecurity.emailSecurityPostPreview` | `POST /accounts/{accountId}/email-security/investigate/preview` | Generate preview for a non-detection message |
| `client.api.emailSecurity.emailSecurityPostRelease` | `POST /accounts/{accountId}/email-security/investigate/release` | Release messages from quarantine |
| `client.api.emailSecurity.emailSecurityGetMessage` | `GET /accounts/{accountId}/email-security/investigate/{investigateId}` | Get message details |
| `client.api.emailSecurity.emailSecurityGetMessageActionLog` | `GET /accounts/{accountId}/email-security/investigate/{investigateId}/action_log` | List post-delivery actions for a message |
| `client.api.emailSecurity.emailSecurityGetMessageDetections` | `GET /accounts/{accountId}/email-security/investigate/{investigateId}/detections` | Get message detection details |
| `client.api.emailSecurity.emailSecurityPostMessageMove` | `POST /accounts/{accountId}/email-security/investigate/{investigateId}/move` | Move a message |
| `client.api.emailSecurity.emailSecurityGetMessagePreview` | `GET /accounts/{accountId}/email-security/investigate/{investigateId}/preview` | Get preview for a detection |
| `client.api.emailSecurity.emailSecurityGetMessageRaw` | `GET /accounts/{accountId}/email-security/investigate/{investigateId}/raw` | Get raw email content |
| `client.api.emailSecurity.emailSecurityPostReclassify` | `POST /accounts/{accountId}/email-security/investigate/{investigateId}/reclassify` | Change email classification |
| `client.api.emailSecurity.emailSecurityGetMessageTrace` | `GET /accounts/{accountId}/email-security/investigate/{investigateId}/trace` | Get email trace |
| `client.api.emailSecurity.emailSecurityGetPhishguardReports` | `GET /accounts/{accountId}/email-security/phishguard/reports` | List PhishGuard reports |
| `client.api.emailSecurity.emailSecuritySubmissions` | `GET /accounts/{accountId}/email-security/submissions` | List reclassify submissions |
| `client.api.emailSecurity.emailSecurityCreateSubmissions` | `POST /accounts/{accountId}/email-security/submissions` | Create new submissions |

## emailSecuritySettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.emailSecuritySettings.emailSecurityListAllowPolicies` | `GET /accounts/{accountId}/email-security/settings/allow_policies` | List email allow policies |
| `client.api.emailSecuritySettings.emailSecurityCreateAllowPolicy` | `POST /accounts/{accountId}/email-security/settings/allow_policies` | Create email allow policy |
| `client.api.emailSecuritySettings.emailSecurityBatchAllowPolicies` | `POST /accounts/{accountId}/email-security/settings/allow_policies/batch` | Batch allow policy operations |
| `client.api.emailSecuritySettings.emailSecurityDeleteAllowPolicy` | `DELETE /accounts/{accountId}/email-security/settings/allow_policies/{policyId}` | Delete an email allow policy |
| `client.api.emailSecuritySettings.emailSecurityGetAllowPolicy` | `GET /accounts/{accountId}/email-security/settings/allow_policies/{policyId}` | Get an email allow policy |
| `client.api.emailSecuritySettings.emailSecurityUpdateAllowPolicy` | `PATCH /accounts/{accountId}/email-security/settings/allow_policies/{policyId}` | Update an email allow policy |
| `client.api.emailSecuritySettings.emailSecurityReplaceAllowPolicy` | `PUT /accounts/{accountId}/email-security/settings/allow_policies/{policyId}` | Replace an email allow policy |
| `client.api.emailSecuritySettings.emailSecurityListBlockedSenders` | `GET /accounts/{accountId}/email-security/settings/block_senders` | List blocked email senders |
| `client.api.emailSecuritySettings.emailSecurityCreateBlockedSender` | `POST /accounts/{accountId}/email-security/settings/block_senders` | Create blocked email sender |
| `client.api.emailSecuritySettings.emailSecurityBatchBlockedSenders` | `POST /accounts/{accountId}/email-security/settings/block_senders/batch` | Batch blocked sender operations |
| `client.api.emailSecuritySettings.emailSecurityDeleteBlockedSender` | `DELETE /accounts/{accountId}/email-security/settings/block_senders/{patternId}` | Delete a blocked email sender |
| `client.api.emailSecuritySettings.emailSecurityGetBlockedSender` | `GET /accounts/{accountId}/email-security/settings/block_senders/{patternId}` | Get a blocked email sender |
| `client.api.emailSecuritySettings.emailSecurityUpdateBlockedSender` | `PATCH /accounts/{accountId}/email-security/settings/block_senders/{patternId}` | Update a blocked email sender |
| `client.api.emailSecuritySettings.emailSecurityReplaceBlockedSender` | `PUT /accounts/{accountId}/email-security/settings/block_senders/{patternId}` | Replace a blocked email sender |
| `client.api.emailSecuritySettings.emailSecurityListContentPolicies` | `GET /accounts/{accountId}/email-security/settings/content_policies` | List content policies |
| `client.api.emailSecuritySettings.emailSecurityCreateContentPolicy` | `POST /accounts/{accountId}/email-security/settings/content_policies` | Create a content policy |
| `client.api.emailSecuritySettings.emailSecurityBatchContentPolicies` | `POST /accounts/{accountId}/email-security/settings/content_policies/batch` | Batch content policy operations |
| `client.api.emailSecuritySettings.emailSecurityDeleteContentPolicy` | `DELETE /accounts/{accountId}/email-security/settings/content_policies/{policyId}` | Delete a content policy |
| `client.api.emailSecuritySettings.emailSecurityGetContentPolicy` | `GET /accounts/{accountId}/email-security/settings/content_policies/{policyId}` | Get a content policy |
| `client.api.emailSecuritySettings.emailSecurityUpdateContentPolicy` | `PATCH /accounts/{accountId}/email-security/settings/content_policies/{policyId}` | Update a content policy |
| `client.api.emailSecuritySettings.emailSecurityDeleteDomains` | `DELETE /accounts/{accountId}/email-security/settings/domains` | Unprotect multiple email domains |
| `client.api.emailSecuritySettings.emailSecurityListDomains` | `GET /accounts/{accountId}/email-security/settings/domains` | List protected email domains |
| `client.api.emailSecuritySettings.emailSecurityCreateDomains` | `POST /accounts/{accountId}/email-security/settings/domains` | Add a new email domain |
| `client.api.emailSecuritySettings.emailSecurityBatchDomains` | `POST /accounts/{accountId}/email-security/settings/domains/batch` | Batch domain operations |
| `client.api.emailSecuritySettings.emailSecurityDeleteDomain` | `DELETE /accounts/{accountId}/email-security/settings/domains/{domainId}` | Unprotect an email domain |
| `client.api.emailSecuritySettings.emailSecurityGetDomain` | `GET /accounts/{accountId}/email-security/settings/domains/{domainId}` | Get an email domain |
| `client.api.emailSecuritySettings.emailSecurityUpdateDomain` | `PATCH /accounts/{accountId}/email-security/settings/domains/{domainId}` | Update an email domain |
| `client.api.emailSecuritySettings.emailSecurityReplaceDomain` | `PUT /accounts/{accountId}/email-security/settings/domains/{domainId}` | Replace an email domain |
| `client.api.emailSecuritySettings.emailSecurityGetDomainVerification` | `GET /accounts/{accountId}/email-security/settings/domains/{domainId}/verification` | Get domain verification details |
| `client.api.emailSecuritySettings.emailSecurityListImpersonationRegistry` | `GET /accounts/{accountId}/email-security/settings/impersonation_registry` | List impersonation registry entries |
| `client.api.emailSecuritySettings.emailSecurityCreateImpersonationRegistry` | `POST /accounts/{accountId}/email-security/settings/impersonation_registry` | Create impersonation registry entry |
| `client.api.emailSecuritySettings.emailSecurityDeleteImpersonationRegistry` | `DELETE /accounts/{accountId}/email-security/settings/impersonation_registry/{impersonationRegistryId}` | Delete an impersonation registry entry |
| `client.api.emailSecuritySettings.emailSecurityGetImpersonationRegistry` | `GET /accounts/{accountId}/email-security/settings/impersonation_registry/{impersonationRegistryId}` | Get an impersonation registry entry |
| `client.api.emailSecuritySettings.emailSecurityUpdateImpersonationRegistry` | `PATCH /accounts/{accountId}/email-security/settings/impersonation_registry/{impersonationRegistryId}` | Update an impersonation registry entry |
| `client.api.emailSecuritySettings.emailSecurityListSendingDomainRestrictions` | `GET /accounts/{accountId}/email-security/settings/sending_domain_restrictions` | List sending domain restrictions |
| `client.api.emailSecuritySettings.emailSecurityCreateSendingDomainRestriction` | `POST /accounts/{accountId}/email-security/settings/sending_domain_restrictions` | Create a sending domain restriction |
| `client.api.emailSecuritySettings.emailSecurityBatchSendingDomainRestrictions` | `POST /accounts/{accountId}/email-security/settings/sending_domain_restrictions/batch` | Batch sending domain restriction operations |
| `client.api.emailSecuritySettings.emailSecurityDeleteSendingDomainRestriction` | `DELETE /accounts/{accountId}/email-security/settings/sending_domain_restrictions/{sendingDomainRestrictionId}` | Delete a sending domain restriction |
| `client.api.emailSecuritySettings.emailSecurityGetSendingDomainRestriction` | `GET /accounts/{accountId}/email-security/settings/sending_domain_restrictions/{sendingDomainRestrictionId}` | Get a sending domain restriction |
| `client.api.emailSecuritySettings.emailSecurityUpdateSendingDomainRestriction` | `PATCH /accounts/{accountId}/email-security/settings/sending_domain_restrictions/{sendingDomainRestrictionId}` | Update a sending domain restriction |
| `client.api.emailSecuritySettings.emailSecurityListTrustedDomains` | `GET /accounts/{accountId}/email-security/settings/trusted_domains` | List trusted email domains |
| `client.api.emailSecuritySettings.emailSecurityCreateTrustedDomain` | `POST /accounts/{accountId}/email-security/settings/trusted_domains` | Create trusted email domain |
| `client.api.emailSecuritySettings.emailSecurityBatchTrustedDomains` | `POST /accounts/{accountId}/email-security/settings/trusted_domains/batch` | Batch trusted domain operations |
| `client.api.emailSecuritySettings.emailSecurityDeleteTrustedDomain` | `DELETE /accounts/{accountId}/email-security/settings/trusted_domains/{trustedDomainId}` | Delete a trusted email domain |
| `client.api.emailSecuritySettings.emailSecurityGetTrustedDomain` | `GET /accounts/{accountId}/email-security/settings/trusted_domains/{trustedDomainId}` | Get a trusted email domain |
| `client.api.emailSecuritySettings.emailSecurityUpdateTrustedDomain` | `PATCH /accounts/{accountId}/email-security/settings/trusted_domains/{trustedDomainId}` | Update a trusted email domain |
| `client.api.emailSecuritySettings.emailSecurityReplaceTrustedDomain` | `PUT /accounts/{accountId}/email-security/settings/trusted_domains/{trustedDomainId}` | Replace a trusted email domain |
| `client.api.emailSecuritySettings.emailSecurityListUrlIgnorePatterns` | `GET /accounts/{accountId}/email-security/settings/url_ignore_patterns` | List URL ignore patterns |
| `client.api.emailSecuritySettings.emailSecurityCreateUrlIgnorePattern` | `POST /accounts/{accountId}/email-security/settings/url_ignore_patterns` | Create a URL ignore pattern |
| `client.api.emailSecuritySettings.emailSecurityBatchUrlIgnorePatterns` | `POST /accounts/{accountId}/email-security/settings/url_ignore_patterns/batch` | Batch URL ignore pattern operations |
| `client.api.emailSecuritySettings.emailSecurityDeleteUrlIgnorePattern` | `DELETE /accounts/{accountId}/email-security/settings/url_ignore_patterns/{patternId}` | Delete a URL ignore pattern |
| `client.api.emailSecuritySettings.emailSecurityGetUrlIgnorePattern` | `GET /accounts/{accountId}/email-security/settings/url_ignore_patterns/{patternId}` | Get a URL ignore pattern |
| `client.api.emailSecuritySettings.emailSecurityUpdateUrlIgnorePattern` | `PATCH /accounts/{accountId}/email-security/settings/url_ignore_patterns/{patternId}` | Update a URL ignore pattern |

## emailForPlatforms

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.emailForPlatforms.emailDomainsChanges` | `GET /accounts/{accountId}/email/domain-changes` | List Email Domain changes |
| `client.api.emailForPlatforms.emailDomainsList` | `GET /accounts/{accountId}/email/domains` | List Email Domains |
| `client.api.emailForPlatforms.emailDomainsCreate` | `POST /accounts/{accountId}/email/domains` | Create an Email Domain |
| `client.api.emailForPlatforms.emailDomainsDelete` | `DELETE /accounts/{accountId}/email/domains/{emailDomainId}` | Delete an Email Domain |
| `client.api.emailForPlatforms.emailDomainsGet` | `GET /accounts/{accountId}/email/domains/{emailDomainId}` | Get an Email Domain |
| `client.api.emailForPlatforms.emailDomainsVerify` | `POST /accounts/{accountId}/email/domains/{emailDomainId}/verify` | Verify an Email Domain |

## emailRoutingDestinationAddresses

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.emailRoutingDestinationAddresses.emailRoutingDestinationAddressesListDestinationAddresses` | `GET /accounts/{accountId}/email/routing/addresses` | List destination addresses |
| `client.api.emailRoutingDestinationAddresses.emailRoutingDestinationAddressesCreateADestinationAddress` | `POST /accounts/{accountId}/email/routing/addresses` | Create a destination address |
| `client.api.emailRoutingDestinationAddresses.emailRoutingDestinationAddressesDeleteDestinationAddress` | `DELETE /accounts/{accountId}/email/routing/addresses/{destinationAddressIdentifier}` | Delete destination address |
| `client.api.emailRoutingDestinationAddresses.emailRoutingDestinationAddressesGetADestinationAddress` | `GET /accounts/{accountId}/email/routing/addresses/{destinationAddressIdentifier}` | Get a destination address |
| `client.api.emailRoutingDestinationAddresses.emailRoutingDestinationAddressesUpdateDestinationAddress` | `PATCH /accounts/{accountId}/email/routing/addresses/{destinationAddressIdentifier}` | Update destination address |

## emailRoutingRoutingRules

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.emailRoutingRoutingRules.emailRoutingRoutingRulesListAccountRoutingRules` | `GET /accounts/{accountId}/email/routing/rules` | List account routing rules |
| `client.api.emailRoutingRoutingRules.emailRoutingRoutingRulesPlanAccountRoutingRules` | `POST /accounts/{accountId}/email/routing/rules/plan` | Plan account routing rule changes |
| `client.api.emailRoutingRoutingRules.emailRoutingRoutingRulesListRoutingRules` | `GET /zones/{zoneId}/email/routing/rules` | List routing rules |
| `client.api.emailRoutingRoutingRules.emailRoutingRoutingRulesCreateRoutingRule` | `POST /zones/{zoneId}/email/routing/rules` | Create routing rule |
| `client.api.emailRoutingRoutingRules.emailRoutingRoutingRulesGetCatchAllRule` | `GET /zones/{zoneId}/email/routing/rules/catch_all` | Get catch-all rule |
| `client.api.emailRoutingRoutingRules.emailRoutingRoutingRulesUpdateCatchAllRule` | `PUT /zones/{zoneId}/email/routing/rules/catch_all` | Update catch-all rule |
| `client.api.emailRoutingRoutingRules.emailRoutingRoutingRulesDeleteRoutingRule` | `DELETE /zones/{zoneId}/email/routing/rules/{ruleIdentifier}` | Delete routing rule |
| `client.api.emailRoutingRoutingRules.emailRoutingRoutingRulesGetRoutingRule` | `GET /zones/{zoneId}/email/routing/rules/{ruleIdentifier}` | Get routing rule |
| `client.api.emailRoutingRoutingRules.emailRoutingRoutingRulesUpdateRoutingRule` | `PUT /zones/{zoneId}/email/routing/rules/{ruleIdentifier}` | Update routing rule |

## emailRoutingSuppressions

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.emailRoutingSuppressions.getPublicListSuppressionRouting` | `GET /accounts/{accountId}/email/routing/suppression` | List account email suppressions |
| `client.api.emailRoutingSuppressions.postPublicNewSuppressionRouting` | `POST /accounts/{accountId}/email/routing/suppression` | Create account email suppression |
| `client.api.emailRoutingSuppressions.deletePublicDeleteSuppressionRouting` | `DELETE /accounts/{accountId}/email/routing/suppression/{suppressionId}` | Delete account email suppression |
| `client.api.emailRoutingSuppressions.getPublicGetSuppressionRouting` | `GET /accounts/{accountId}/email/routing/suppression/{suppressionId}` | Get account email suppression |
| `client.api.emailRoutingSuppressions.getPublicListSuppressionZoneRouting` | `GET /zones/{zoneId}/email/routing/suppression` | List zone email suppressions |
| `client.api.emailRoutingSuppressions.postPublicNewSuppressionZoneRouting` | `POST /zones/{zoneId}/email/routing/suppression` | Create zone email suppression |
| `client.api.emailRoutingSuppressions.deletePublicDeleteSuppressionZoneRouting` | `DELETE /zones/{zoneId}/email/routing/suppression/{suppressionId}` | Delete zone email suppression |
| `client.api.emailRoutingSuppressions.getPublicGetSuppressionZoneRouting` | `GET /zones/{zoneId}/email/routing/suppression/{suppressionId}` | Get zone email suppression |

## emailSending

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.emailSending.emailSendingGetSendingLimits` | `GET /accounts/{accountId}/email/sending/limits` | Get sending limits |
| `client.api.emailSending.emailSendingGetEmailMessage` | `GET /accounts/{accountId}/email/sending/messages/{messageId}` | Fetch an email message |
| `client.api.emailSending.emailSendingGetReputation` | `GET /accounts/{accountId}/email/sending/reputation` | Get account reputation |
| `client.api.emailSending.emailSendingAccountSendBuilder` | `POST /accounts/{accountId}/email/sending/send` | Send an email |
| `client.api.emailSending.emailSendingAccountSendRawMessage` | `POST /accounts/{accountId}/email/sending/send_raw` | Send a raw MIME email |

## emailSendingSuppressions

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.emailSendingSuppressions.getPublicListSuppressionSending` | `GET /accounts/{accountId}/email/sending/suppression` | List account email suppressions |
| `client.api.emailSendingSuppressions.postPublicNewSuppressionSending` | `POST /accounts/{accountId}/email/sending/suppression` | Create account email suppression |
| `client.api.emailSendingSuppressions.deletePublicDeleteSuppressionSending` | `DELETE /accounts/{accountId}/email/sending/suppression/{suppressionId}` | Delete account email suppression |
| `client.api.emailSendingSuppressions.getPublicGetSuppressionSending` | `GET /accounts/{accountId}/email/sending/suppression/{suppressionId}` | Get account email suppression |
| `client.api.emailSendingSuppressions.getPublicListSendingSuppressions` | `GET /accounts/{accountId}/email/sending/suppressions` | List account Email Sending suppressions |
| `client.api.emailSendingSuppressions.postPublicCreateSendingSuppression` | `POST /accounts/{accountId}/email/sending/suppressions` | Create account Email Sending suppression |
| `client.api.emailSendingSuppressions.postPublicBulkCreateSendingSuppressions` | `POST /accounts/{accountId}/email/sending/suppressions/bulk` | Bulk import account Email Sending suppressions |
| `client.api.emailSendingSuppressions.deletePublicDeleteSendingSuppression` | `DELETE /accounts/{accountId}/email/sending/suppressions/{suppressionId}` | Delete account Email Sending suppression |
| `client.api.emailSendingSuppressions.getPublicGetSendingSuppression` | `GET /accounts/{accountId}/email/sending/suppressions/{suppressionId}` | Get account Email Sending suppression |
| `client.api.emailSendingSuppressions.patchPublicUpdateSendingSuppression` | `PATCH /accounts/{accountId}/email/sending/suppressions/{suppressionId}` | Update account Email Sending suppression |
| `client.api.emailSendingSuppressions.getPublicListSuppressionZoneSending` | `GET /zones/{zoneId}/email/sending/suppression` | List zone email suppressions |
| `client.api.emailSendingSuppressions.postPublicNewSuppressionZoneSending` | `POST /zones/{zoneId}/email/sending/suppression` | Create zone email suppression |
| `client.api.emailSendingSuppressions.deletePublicDeleteSuppressionZoneSending` | `DELETE /zones/{zoneId}/email/sending/suppression/{suppressionId}` | Delete zone email suppression |
| `client.api.emailSendingSuppressions.getPublicGetSuppressionZoneSending` | `GET /zones/{zoneId}/email/sending/suppression/{suppressionId}` | Get zone email suppression |

## accountEntitlements

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountEntitlements.entitlementsGetAccountEntitlements` | `GET /accounts/{accountId}/entitlements` | Get Account Entitlements |

## r2Bucket

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.r2Bucket.r2GetEventNotificationConfigs` | `GET /accounts/{accountId}/event_notifications/r2/{bucketName}/configuration` | List Event Notification Rules |
| `client.api.r2Bucket.r2EventNotificationDeleteConfig` | `DELETE /accounts/{accountId}/event_notifications/r2/{bucketName}/configuration/queues/{queueId}` | Delete Event Notification Rules |
| `client.api.r2Bucket.r2GetEventNotificationConfig` | `GET /accounts/{accountId}/event_notifications/r2/{bucketName}/configuration/queues/{queueId}` | Get Event Notification Rules for a Queue |
| `client.api.r2Bucket.r2PutEventNotificationConfig` | `PUT /accounts/{accountId}/event_notifications/r2/{bucketName}/configuration/queues/{queueId}` | Create Event Notification Rules |
| `client.api.r2Bucket.r2ListBuckets` | `GET /accounts/{accountId}/r2/buckets` | List Buckets |
| `client.api.r2Bucket.r2CreateBucket` | `POST /accounts/{accountId}/r2/buckets` | Create Bucket |
| `client.api.r2Bucket.r2DeleteBucket` | `DELETE /accounts/{accountId}/r2/buckets/{bucketName}` | Delete Bucket |
| `client.api.r2Bucket.r2GetBucket` | `GET /accounts/{accountId}/r2/buckets/{bucketName}` | Get Bucket |
| `client.api.r2Bucket.r2PatchBucket` | `PATCH /accounts/{accountId}/r2/buckets/{bucketName}` | Patch Bucket |
| `client.api.r2Bucket.r2CreateBucketByName` | `PUT /accounts/{accountId}/r2/buckets/{bucketName}` | Create Bucket (by name) |
| `client.api.r2Bucket.r2DeleteBucketCorsPolicy` | `DELETE /accounts/{accountId}/r2/buckets/{bucketName}/cors` | Delete Bucket CORS Policy |
| `client.api.r2Bucket.r2GetBucketCorsPolicy` | `GET /accounts/{accountId}/r2/buckets/{bucketName}/cors` | Get Bucket CORS Policy |
| `client.api.r2Bucket.r2PutBucketCorsPolicy` | `PUT /accounts/{accountId}/r2/buckets/{bucketName}/cors` | Set Bucket CORS Policy |
| `client.api.r2Bucket.r2ListCustomDomains` | `GET /accounts/{accountId}/r2/buckets/{bucketName}/domains/custom` | List Custom Domains of Bucket |
| `client.api.r2Bucket.r2AddCustomDomain` | `POST /accounts/{accountId}/r2/buckets/{bucketName}/domains/custom` | Attach Custom Domain To Bucket |
| `client.api.r2Bucket.r2DeleteCustomDomain` | `DELETE /accounts/{accountId}/r2/buckets/{bucketName}/domains/custom/{domain}` | Remove Custom Domain From Bucket |
| `client.api.r2Bucket.r2GetCustomDomainSettings` | `GET /accounts/{accountId}/r2/buckets/{bucketName}/domains/custom/{domain}` | Get Custom Domain Settings |
| `client.api.r2Bucket.r2EditCustomDomainSettings` | `PUT /accounts/{accountId}/r2/buckets/{bucketName}/domains/custom/{domain}` | Configure Custom Domain Settings |
| `client.api.r2Bucket.r2GetBucketPublicPolicy` | `GET /accounts/{accountId}/r2/buckets/{bucketName}/domains/managed` | Get r2.dev Domain of Bucket |
| `client.api.r2Bucket.r2PutBucketPublicPolicy` | `PUT /accounts/{accountId}/r2/buckets/{bucketName}/domains/managed` | Update r2.dev Domain of Bucket |
| `client.api.r2Bucket.r2ListBucketJobs` | `GET /accounts/{accountId}/r2/buckets/{bucketName}/jobs` | List Bucket Jobs |
| `client.api.r2Bucket.r2CreateBucketJob` | `POST /accounts/{accountId}/r2/buckets/{bucketName}/jobs` | Create Bucket Job |
| `client.api.r2Bucket.r2GetBucketJob` | `GET /accounts/{accountId}/r2/buckets/{bucketName}/jobs/{jobId}` | Get Bucket Job |
| `client.api.r2Bucket.r2GetBucketLifecycleConfiguration` | `GET /accounts/{accountId}/r2/buckets/{bucketName}/lifecycle` | Get Object Lifecycle Rules |
| `client.api.r2Bucket.r2PutBucketLifecycleConfiguration` | `PUT /accounts/{accountId}/r2/buckets/{bucketName}/lifecycle` | Set Object Lifecycle Rules |
| `client.api.r2Bucket.r2GetBucketLocalUploadsConfiguration` | `GET /accounts/{accountId}/r2/buckets/{bucketName}/local-uploads` | Get Local Uploads Configuration |
| `client.api.r2Bucket.r2PutBucketLocalUploadsConfiguration` | `PUT /accounts/{accountId}/r2/buckets/{bucketName}/local-uploads` | Set Local Uploads Configuration |
| `client.api.r2Bucket.r2DeleteBucketLockConfiguration` | `DELETE /accounts/{accountId}/r2/buckets/{bucketName}/lock` | Delete Bucket Lock Rules |
| `client.api.r2Bucket.r2GetBucketLockConfiguration` | `GET /accounts/{accountId}/r2/buckets/{bucketName}/lock` | Get Bucket Lock Rules |
| `client.api.r2Bucket.r2PutBucketLockConfiguration` | `PUT /accounts/{accountId}/r2/buckets/{bucketName}/lock` | Set Bucket Lock Rules |
| `client.api.r2Bucket.r2DeleteBucketSippyConfig` | `DELETE /accounts/{accountId}/r2/buckets/{bucketName}/sippy` | Disable Sippy |
| `client.api.r2Bucket.r2GetBucketSippyConfig` | `GET /accounts/{accountId}/r2/buckets/{bucketName}/sippy` | Get Sippy Configuration |
| `client.api.r2Bucket.r2PutBucketSippyConfig` | `PUT /accounts/{accountId}/r2/buckets/{bucketName}/sippy` | Enable Sippy |
| `client.api.r2Bucket.r2CreateTempAccessCredentials` | `POST /accounts/{accountId}/r2/temp-access-credentials` | Create Temporary Access Credentials |

## queue

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.queue.subscriptionsList` | `GET /accounts/{accountId}/event_subscriptions/subscriptions` | List Event Subscriptions |
| `client.api.queue.subscriptionsCreate` | `POST /accounts/{accountId}/event_subscriptions/subscriptions` | Create Event Subscription |
| `client.api.queue.subscriptionsDelete` | `DELETE /accounts/{accountId}/event_subscriptions/subscriptions/{subscriptionId}` | Delete Event Subscription |
| `client.api.queue.subscriptionsGet` | `GET /accounts/{accountId}/event_subscriptions/subscriptions/{subscriptionId}` | Get Event Subscription |
| `client.api.queue.subscriptionsPatch` | `PATCH /accounts/{accountId}/event_subscriptions/subscriptions/{subscriptionId}` | Update Event Subscription |
| `client.api.queue.queuesList` | `GET /accounts/{accountId}/queues` | List Queues |
| `client.api.queue.queuesCreate` | `POST /accounts/{accountId}/queues` | Create Queue |
| `client.api.queue.queuesDelete` | `DELETE /accounts/{accountId}/queues/{queueId}` | Delete Queue |
| `client.api.queue.queuesGet` | `GET /accounts/{accountId}/queues/{queueId}` | Get Queue |
| `client.api.queue.queuesUpdatePartial` | `PATCH /accounts/{accountId}/queues/{queueId}` | Update Queue |
| `client.api.queue.queuesUpdate` | `PUT /accounts/{accountId}/queues/{queueId}` | Update Queue |
| `client.api.queue.queuesListConsumers` | `GET /accounts/{accountId}/queues/{queueId}/consumers` | List Queue Consumers |
| `client.api.queue.queuesCreateConsumer` | `POST /accounts/{accountId}/queues/{queueId}/consumers` | Create a Queue Consumer |
| `client.api.queue.queuesDeleteConsumer` | `DELETE /accounts/{accountId}/queues/{queueId}/consumers/{consumerId}` | Delete Queue Consumer |
| `client.api.queue.queuesGetConsumer` | `GET /accounts/{accountId}/queues/{queueId}/consumers/{consumerId}` | Get Queue Consumer |
| `client.api.queue.queuesUpdateConsumer` | `PUT /accounts/{accountId}/queues/{queueId}/consumers/{consumerId}` | Update Queue Consumer |
| `client.api.queue.queuesPushMessage` | `POST /accounts/{accountId}/queues/{queueId}/messages` | Push Message |
| `client.api.queue.queuesAckMessages` | `POST /accounts/{accountId}/queues/{queueId}/messages/ack` | Acknowledge + Retry Queue Messages |
| `client.api.queue.queuesPushMessages` | `POST /accounts/{accountId}/queues/{queueId}/messages/batch` | Push Message Batch |
| `client.api.queue.queuesExtendMessages` | `POST /accounts/{accountId}/queues/{queueId}/messages/extend` | Extend Message Leases |
| `client.api.queue.queuesPeekMessages` | `POST /accounts/{accountId}/queues/{queueId}/messages/peek` | Peek Queue Messages |
| `client.api.queue.queuesPreviewMessages` | `POST /accounts/{accountId}/queues/{queueId}/messages/preview` | Preview Queue Messages |
| `client.api.queue.queuesAckPreviewMessages` | `POST /accounts/{accountId}/queues/{queueId}/messages/preview/ack` | Delete Previewed Queue Messages |
| `client.api.queue.queuesPullMessages` | `POST /accounts/{accountId}/queues/{queueId}/messages/pull` | Pull Queue Messages |
| `client.api.queue.queuesPurgeMessages` | `POST /accounts/{accountId}/queues/{queueId}/messages/purge` | Purge Peeked Queue Messages |
| `client.api.queue.queuesGetMetrics` | `GET /accounts/{accountId}/queues/{queueId}/metrics` | Get Queue Metrics |
| `client.api.queue.queuesPurgeGet` | `GET /accounts/{accountId}/queues/{queueId}/purge` | Get Queue Purge Status |
| `client.api.queue.queuesPurge` | `POST /accounts/{accountId}/queues/{queueId}/purge` | Purge Queue |

## fieldExtractors

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.fieldExtractors.deleteFieldExtractor` | `DELETE /accounts/{accountId}/field_extractors/{extractor}` | Delete Field Extractor |
| `client.api.fieldExtractors.getFieldExtractor` | `GET /accounts/{accountId}/field_extractors/{extractor}` | Get Field Extractor |
| `client.api.fieldExtractors.updateFieldExtractor` | `PUT /accounts/{accountId}/field_extractors/{extractor}` | Update Field Extractor |

## ipAccessRulesForAnAccount

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ipAccessRulesForAnAccount.ipAccessRulesForAnAccountListIpAccessRules` | `GET /accounts/{accountId}/firewall/access_rules/rules` | List IP Access rules |
| `client.api.ipAccessRulesForAnAccount.ipAccessRulesForAnAccountCreateAnIpAccessRule` | `POST /accounts/{accountId}/firewall/access_rules/rules` | Create an IP Access rule |
| `client.api.ipAccessRulesForAnAccount.ipAccessRulesForAnAccountDeleteAnIpAccessRule` | `DELETE /accounts/{accountId}/firewall/access_rules/rules/{ruleId}` | Delete an IP Access rule |
| `client.api.ipAccessRulesForAnAccount.ipAccessRulesForAnAccountGetAnIpAccessRule` | `GET /accounts/{accountId}/firewall/access_rules/rules/{ruleId}` | Get an IP Access rule |
| `client.api.ipAccessRulesForAnAccount.ipAccessRulesForAnAccountUpdateAnIpAccessRule` | `PATCH /accounts/{accountId}/firewall/access_rules/rules/{ruleId}` | Update an IP Access rule |

## payloadLoggingKeysForAnAccount

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.payloadLoggingKeysForAnAccount.payloadLoggingKeysForAnAccountDeleteThePayloadLoggingKey` | `DELETE /accounts/{accountId}/firewall/payload_logging/key` | Delete the payload logging key |
| `client.api.payloadLoggingKeysForAnAccount.payloadLoggingKeysForAnAccountGetThePayloadLoggingKey` | `GET /accounts/{accountId}/firewall/payload_logging/key` | Get the payload logging key |
| `client.api.payloadLoggingKeysForAnAccount.payloadLoggingKeysForAnAccountSetThePayloadLoggingKey` | `PUT /accounts/{accountId}/firewall/payload_logging/key` | Set the payload logging key |

## apps

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.apps.flagshipListApps` | `GET /accounts/{accountId}/flagship/apps` | List apps |
| `client.api.apps.flagshipCreateApp` | `POST /accounts/{accountId}/flagship/apps` | Create app |
| `client.api.apps.flagshipDeleteApp` | `DELETE /accounts/{accountId}/flagship/apps/{appId}` | Delete app |
| `client.api.apps.flagshipGetApp` | `GET /accounts/{accountId}/flagship/apps/{appId}` | Get app |
| `client.api.apps.flagshipUpdateApp` | `PUT /accounts/{accountId}/flagship/apps/{appId}` | Update app |
| `client.api.apps.getApps` | `GET /accounts/{accountId}/realtime/kit/apps` | Fetch all apps |
| `client.api.apps.createApp` | `POST /accounts/{accountId}/realtime/kit/apps` | Create App |
| `client.api.apps.getApp` | `GET /accounts/{accountId}/realtime/kit/apps/{appId}` | Fetch app details |
| `client.api.apps.updateApp` | `PATCH /accounts/{accountId}/realtime/kit/apps/{appId}` | Update an app |

## definitions

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.definitions.flagshipGetDefinitions` | `GET /accounts/{accountId}/flagship/apps/{appId}/definitions` | Get flag definitions |

## evaluation

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.evaluation.flagshipEvaluateFlag` | `GET /accounts/{accountId}/flagship/apps/{appId}/evaluate` | Evaluate flag from query context |
| `client.api.evaluation.flagshipEvaluateFlagPost` | `POST /accounts/{accountId}/flagship/apps/{appId}/evaluate` | Evaluate flag with JSON context |

## flags

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.flags.flagshipListFlags` | `GET /accounts/{accountId}/flagship/apps/{appId}/flags` | List flags |
| `client.api.flags.flagshipCreateFlag` | `POST /accounts/{accountId}/flagship/apps/{appId}/flags` | Create flag |
| `client.api.flags.flagshipDeleteFlag` | `DELETE /accounts/{accountId}/flagship/apps/{appId}/flags/{flagKey}` | Delete flag |
| `client.api.flags.flagshipGetFlag` | `GET /accounts/{accountId}/flagship/apps/{appId}/flags/{flagKey}` | Get flag |
| `client.api.flags.flagshipPatchFlag` | `PATCH /accounts/{accountId}/flagship/apps/{appId}/flags/{flagKey}` | Partially update flag |
| `client.api.flags.flagshipUpdateFlag` | `PUT /accounts/{accountId}/flagship/apps/{appId}/flags/{flagKey}` | Update flag |

## changelog

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.changelog.flagshipGetFlagChangelog` | `GET /accounts/{accountId}/flagship/apps/{appId}/flags/{flagKey}/changelog` | List flag changelog entries |

## zeroTrustGatewayApplicationAndApplicationTypeMappings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustGatewayApplicationAndApplicationTypeMappings.zeroTrustGatewayApplicationAndApplicationTypeMappingsListApplicationAndApplicationTypeMappings` | `GET /accounts/{accountId}/gateway/app_types` | List application and application type mappings |

## zeroTrustApplicationsReviewStatus

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustApplicationsReviewStatus.zeroTrustApplicationsReviewStatusList` | `GET /accounts/{accountId}/gateway/apps/review_status` | List applications review statuses |
| `client.api.zeroTrustApplicationsReviewStatus.zeroTrustApplicationsReviewStatusUpdate` | `PUT /accounts/{accountId}/gateway/apps/review_status` | Update applications review statuses |

## zeroTrustSshSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustSshSettings.zeroTrustGetAuditSshSettings` | `GET /accounts/{accountId}/gateway/audit_ssh_settings` | Get Zero Trust SSH settings |
| `client.api.zeroTrustSshSettings.zeroTrustUpdateAuditSshSettings` | `PUT /accounts/{accountId}/gateway/audit_ssh_settings` | Update Zero Trust SSH settings |
| `client.api.zeroTrustSshSettings.zeroTrustRotateSshAccountSeed` | `POST /accounts/{accountId}/gateway/audit_ssh_settings/rotate_seed` | Rotate Zero Trust SSH account seed |

## zeroTrustGatewayCategories

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustGatewayCategories.zeroTrustGatewayCategoriesListCategories` | `GET /accounts/{accountId}/gateway/categories` | List categories |

## zeroTrustCertificates

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustCertificates.zeroTrustCertificatesListZeroTrustCertificates` | `GET /accounts/{accountId}/gateway/certificates` | List Zero Trust certificates |
| `client.api.zeroTrustCertificates.zeroTrustCertificatesCreateZeroTrustCertificate` | `POST /accounts/{accountId}/gateway/certificates` | Create Zero Trust certificate |
| `client.api.zeroTrustCertificates.zeroTrustCertificatesDeleteZeroTrustCertificate` | `DELETE /accounts/{accountId}/gateway/certificates/{certificateId}` | Delete Zero Trust certificate |
| `client.api.zeroTrustCertificates.zeroTrustCertificatesZeroTrustCertificateDetails` | `GET /accounts/{accountId}/gateway/certificates/{certificateId}` | Get Zero Trust certificate details |
| `client.api.zeroTrustCertificates.zeroTrustCertificatesActivateZeroTrustCertificate` | `POST /accounts/{accountId}/gateway/certificates/{certificateId}/activate` | Activate a Zero Trust certificate |
| `client.api.zeroTrustCertificates.zeroTrustCertificatesDeactivateZeroTrustCertificate` | `POST /accounts/{accountId}/gateway/certificates/{certificateId}/deactivate` | Deactivate a Zero Trust certificate |

## zeroTrustGatewayDnsDestinationIpv4AddressPairs

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustGatewayDnsDestinationIpv4AddressPairs.zeroTrustDnsDestinationIpsListDnsDestinationIps` | `GET /accounts/{accountId}/gateway/dns_destination_ips` | List Zero Trust Gateway DNS destination IPv4 address pairs |

## zeroTrustLists

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustLists.zeroTrustListsListZeroTrustLists` | `GET /accounts/{accountId}/gateway/lists` | List Zero Trust lists |
| `client.api.zeroTrustLists.zeroTrustListsCreateZeroTrustList` | `POST /accounts/{accountId}/gateway/lists` | Create Zero Trust list |
| `client.api.zeroTrustLists.zeroTrustListsCreateZeroTrustListFromCsv` | `POST /accounts/{accountId}/gateway/lists/upload` | Create Zero Trust list from CSV |
| `client.api.zeroTrustLists.zeroTrustListsDeleteZeroTrustList` | `DELETE /accounts/{accountId}/gateway/lists/{listId}` | Delete Zero Trust list |
| `client.api.zeroTrustLists.zeroTrustListsZeroTrustListDetails` | `GET /accounts/{accountId}/gateway/lists/{listId}` | Get Zero Trust list details |
| `client.api.zeroTrustLists.zeroTrustListsPatchZeroTrustList` | `PATCH /accounts/{accountId}/gateway/lists/{listId}` | Patch Zero Trust list. |
| `client.api.zeroTrustLists.zeroTrustListsUpdateZeroTrustList` | `PUT /accounts/{accountId}/gateway/lists/{listId}` | Update Zero Trust list |
| `client.api.zeroTrustLists.zeroTrustListsZeroTrustListItems` | `GET /accounts/{accountId}/gateway/lists/{listId}/items` | Get Zero Trust list items |

## zeroTrustGatewayLocations

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustGatewayLocations.zeroTrustGatewayLocationsListZeroTrustGatewayLocations` | `GET /accounts/{accountId}/gateway/locations` | List Zero Trust Gateway locations |
| `client.api.zeroTrustGatewayLocations.zeroTrustGatewayLocationsCreateZeroTrustGatewayLocation` | `POST /accounts/{accountId}/gateway/locations` | Create a Zero Trust Gateway location |
| `client.api.zeroTrustGatewayLocations.zeroTrustGatewayLocationsDeleteZeroTrustGatewayLocation` | `DELETE /accounts/{accountId}/gateway/locations/{locationId}` | Delete a Zero Trust Gateway location |
| `client.api.zeroTrustGatewayLocations.zeroTrustGatewayLocationsZeroTrustGatewayLocationDetails` | `GET /accounts/{accountId}/gateway/locations/{locationId}` | Get Zero Trust Gateway location details |
| `client.api.zeroTrustGatewayLocations.zeroTrustGatewayLocationsUpdateZeroTrustGatewayLocation` | `PUT /accounts/{accountId}/gateway/locations/{locationId}` | Update a Zero Trust Gateway location |

## zeroTrustGatewayOperations

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustGatewayOperations.zeroTrustGatewayOperationsListZeroTrustGatewayOperations` | `GET /accounts/{accountId}/gateway/operations` | List Zero Trust Gateway operations |
| `client.api.zeroTrustGatewayOperations.zeroTrustGatewayOperationsZeroTrustGatewayOperationDetails` | `GET /accounts/{accountId}/gateway/operations/{operationId}` | Zero Trust Gateway operation details |

## zeroTrustGatewayPacFiles

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustGatewayPacFiles.zeroTrustGatewayPacfilesList` | `GET /accounts/{accountId}/gateway/pacfiles` | List PAC files |
| `client.api.zeroTrustGatewayPacFiles.zeroTrustGatewayPacfilesCreatePacfile` | `POST /accounts/{accountId}/gateway/pacfiles` | Create a PAC file |
| `client.api.zeroTrustGatewayPacFiles.zeroTrustGatewayPacfilesDelete` | `DELETE /accounts/{accountId}/gateway/pacfiles/{pacfileId}` | Delete a PAC file |
| `client.api.zeroTrustGatewayPacFiles.zeroTrustGatewayPacfilesDetails` | `GET /accounts/{accountId}/gateway/pacfiles/{pacfileId}` | Get a PAC file |
| `client.api.zeroTrustGatewayPacFiles.zeroTrustGatewayPacfilesUpdate` | `PUT /accounts/{accountId}/gateway/pacfiles/{pacfileId}` | Update a Zero Trust Gateway PAC file |

## zeroTrustGatewayProxyEndpoints

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustGatewayProxyEndpoints.zeroTrustGatewayProxyEndpointsListProxyEndpoints` | `GET /accounts/{accountId}/gateway/proxy_endpoints` | List proxy endpoints |
| `client.api.zeroTrustGatewayProxyEndpoints.zeroTrustGatewayProxyEndpointsCreateProxyEndpoint` | `POST /accounts/{accountId}/gateway/proxy_endpoints` | Create a proxy endpoint |
| `client.api.zeroTrustGatewayProxyEndpoints.zeroTrustGatewayProxyEndpointsDeleteProxyEndpoint` | `DELETE /accounts/{accountId}/gateway/proxy_endpoints/{proxyEndpointId}` | Delete a proxy endpoint |
| `client.api.zeroTrustGatewayProxyEndpoints.zeroTrustGatewayProxyEndpointsProxyEndpointDetails` | `GET /accounts/{accountId}/gateway/proxy_endpoints/{proxyEndpointId}` | Get a proxy endpoint |
| `client.api.zeroTrustGatewayProxyEndpoints.zeroTrustGatewayProxyEndpointsUpdateProxyEndpoint` | `PATCH /accounts/{accountId}/gateway/proxy_endpoints/{proxyEndpointId}` | Update a proxy endpoint |

## zeroTrustGatewayRules

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustGatewayRules.zeroTrustGatewayRulesListZeroTrustGatewayRules` | `GET /accounts/{accountId}/gateway/rules` | List Zero Trust Gateway rules |
| `client.api.zeroTrustGatewayRules.zeroTrustGatewayRulesPatchMultipleZeroTrustGatewayRules` | `PATCH /accounts/{accountId}/gateway/rules` | Patch multiple Zero Trust Gateway rules |
| `client.api.zeroTrustGatewayRules.zeroTrustGatewayRulesCreateZeroTrustGatewayRule` | `POST /accounts/{accountId}/gateway/rules` | Create a Zero Trust Gateway rule |
| `client.api.zeroTrustGatewayRules.zeroTrustGatewayRulesListZeroTrustGatewayRulesTenant` | `GET /accounts/{accountId}/gateway/rules/tenant` | List Zero Trust Gateway rules inherited from the parent account |
| `client.api.zeroTrustGatewayRules.zeroTrustGatewayRulesDeleteZeroTrustGatewayRule` | `DELETE /accounts/{accountId}/gateway/rules/{ruleId}` | Delete a Zero Trust Gateway rule |
| `client.api.zeroTrustGatewayRules.zeroTrustGatewayRulesZeroTrustGatewayRuleDetails` | `GET /accounts/{accountId}/gateway/rules/{ruleId}` | Get Zero Trust Gateway rule details. |
| `client.api.zeroTrustGatewayRules.zeroTrustGatewayRulesPatchZeroTrustGatewayRule` | `PATCH /accounts/{accountId}/gateway/rules/{ruleId}` | Patch a Zero Trust Gateway rule |
| `client.api.zeroTrustGatewayRules.zeroTrustGatewayRulesUpdateZeroTrustGatewayRule` | `PUT /accounts/{accountId}/gateway/rules/{ruleId}` | Update a Zero Trust Gateway rule |
| `client.api.zeroTrustGatewayRules.zeroTrustGatewayRulesResetExpirationZeroTrustGatewayRule` | `POST /accounts/{accountId}/gateway/rules/{ruleId}/reset_expiration` | Reset the expiration of a Zero Trust Gateway Rule |

## hyperdrive

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.hyperdrive.listHyperdrive` | `GET /accounts/{accountId}/hyperdrive/configs` | List Hyperdrives |
| `client.api.hyperdrive.createHyperdrive` | `POST /accounts/{accountId}/hyperdrive/configs` | Create Hyperdrive |
| `client.api.hyperdrive.deleteHyperdrive` | `DELETE /accounts/{accountId}/hyperdrive/configs/{hyperdriveId}` | Delete Hyperdrive |
| `client.api.hyperdrive.getHyperdrive` | `GET /accounts/{accountId}/hyperdrive/configs/{hyperdriveId}` | Get Hyperdrive |
| `client.api.hyperdrive.patchHyperdrive` | `PATCH /accounts/{accountId}/hyperdrive/configs/{hyperdriveId}` | Update Hyperdrive |
| `client.api.hyperdrive.updateHyperdrive` | `PUT /accounts/{accountId}/hyperdrive/configs/{hyperdriveId}` | Replace Hyperdrive |
| `client.api.hyperdrive.restartHyperdrive` | `POST /accounts/{accountId}/hyperdrive/configs/{hyperdriveId}/restart` | Restart Hyperdrive |
| `client.api.hyperdrive.createHyperdriveDatabaseSignature` | `POST /accounts/{accountId}/hyperdrive/integrationsOperations/planetScale/createDatabaseSignature` | Create Database Signature |

## accountPermissionGroups

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountPermissionGroups.accountPermissionGroupList` | `GET /accounts/{accountId}/iam/permission_groups` | List Account Permission Groups |
| `client.api.accountPermissionGroups.accountPermissionGroupDetails` | `GET /accounts/{accountId}/iam/permission_groups/{permissionGroupId}` | Permission Group Details |

## accountResourceGroups

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountResourceGroups.accountResourceGroupList` | `GET /accounts/{accountId}/iam/resource_groups` | List Resource Groups |
| `client.api.accountResourceGroups.accountResourceGroupCreate` | `POST /accounts/{accountId}/iam/resource_groups` | Create Resource Group |
| `client.api.accountResourceGroups.accountResourceGroupDelete` | `DELETE /accounts/{accountId}/iam/resource_groups/{resourceGroupId}` | Remove Resource Group |
| `client.api.accountResourceGroups.accountResourceGroupDetails` | `GET /accounts/{accountId}/iam/resource_groups/{resourceGroupId}` | Resource Group Details |
| `client.api.accountResourceGroups.accountResourceGroupUpdate` | `PUT /accounts/{accountId}/iam/resource_groups/{resourceGroupId}` | Update Resource Group |

## accountUserGroups

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountUserGroups.accountUserGroupList` | `GET /accounts/{accountId}/iam/user_groups` | List User Groups |
| `client.api.accountUserGroups.accountUserGroupCreate` | `POST /accounts/{accountId}/iam/user_groups` | Create User Group |
| `client.api.accountUserGroups.accountUserGroupDelete` | `DELETE /accounts/{accountId}/iam/user_groups/{userGroupId}` | Remove User Group |
| `client.api.accountUserGroups.accountUserGroupDetails` | `GET /accounts/{accountId}/iam/user_groups/{userGroupId}` | User Group Details |
| `client.api.accountUserGroups.accountUserGroupUpdate` | `PUT /accounts/{accountId}/iam/user_groups/{userGroupId}` | Update User Group |

## accountUserGroupMembers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountUserGroupMembers.accountUserGroupMemberList` | `GET /accounts/{accountId}/iam/user_groups/{userGroupId}/members` | List User Group Members |
| `client.api.accountUserGroupMembers.accountUserGroupMemberCreate` | `POST /accounts/{accountId}/iam/user_groups/{userGroupId}/members` | Add User Group Members |
| `client.api.accountUserGroupMembers.accountUserGroupMembersUpdate` | `PUT /accounts/{accountId}/iam/user_groups/{userGroupId}/members` | Update User Group Members |
| `client.api.accountUserGroupMembers.accountUserGroupMemberDelete` | `DELETE /accounts/{accountId}/iam/user_groups/{userGroupId}/members/{memberId}` | Remove User Group Member |
| `client.api.accountUserGroupMembers.accountUserGroupMemberGet` | `GET /accounts/{accountId}/iam/user_groups/{userGroupId}/members/{memberId}` | Get User Group Member |

## cloudflareImages

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cloudflareImages.cloudflareImagesListImages` | `GET /accounts/{accountId}/images/v1` | List images |
| `client.api.cloudflareImages.cloudflareImagesUploadAnImageViaUrl` | `POST /accounts/{accountId}/images/v1` | Upload an image |
| `client.api.cloudflareImages.cloudflareImagesCreateAuthenticatedDirectUploadUrlV1` | `POST /accounts/{accountId}/images/v1/direct_upload` | Create authenticated direct upload URL V1 |
| `client.api.cloudflareImages.cloudflareImagesImagesUsageStatistics` | `GET /accounts/{accountId}/images/v1/stats` | Images usage statistics |
| `client.api.cloudflareImages.cloudflareImagesDeleteImage` | `DELETE /accounts/{accountId}/images/v1/{imageId}` | Delete image |
| `client.api.cloudflareImages.cloudflareImagesImageDetails` | `GET /accounts/{accountId}/images/v1/{imageId}` | Image details |
| `client.api.cloudflareImages.cloudflareImagesUpdateImage` | `PATCH /accounts/{accountId}/images/v1/{imageId}` | Update image |
| `client.api.cloudflareImages.cloudflareImagesBaseImage` | `GET /accounts/{accountId}/images/v1/{imageId}/blob` | Download image |
| `client.api.cloudflareImages.cloudflareImagesListImagesV2` | `GET /accounts/{accountId}/images/v2` | List images V2 |
| `client.api.cloudflareImages.cloudflareImagesCreateAuthenticatedDirectUploadUrlV2` | `POST /accounts/{accountId}/images/v2/direct_upload` | Create authenticated direct upload URL V2 |
| `client.api.cloudflareImages.cloudflareImagesListMetadataKeys` | `GET /accounts/{accountId}/images/v2/metadata/keys` | List image metadata keys |

## cloudflareImagesKeys

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cloudflareImagesKeys.cloudflareImagesKeysListSigningKeys` | `GET /accounts/{accountId}/images/v1/keys` | List Signing Keys |
| `client.api.cloudflareImagesKeys.cloudflareImagesKeysDeleteSigningKey` | `DELETE /accounts/{accountId}/images/v1/keys/{signingKeyName}` | Delete Signing Key |
| `client.api.cloudflareImagesKeys.cloudflareImagesKeysAddSigningKey` | `PUT /accounts/{accountId}/images/v1/keys/{signingKeyName}` | Create a new Signing Key |

## cloudflareImagesVariants

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cloudflareImagesVariants.cloudflareImagesVariantsListVariants` | `GET /accounts/{accountId}/images/v1/variants` | List variants |
| `client.api.cloudflareImagesVariants.cloudflareImagesVariantsCreateAVariant` | `POST /accounts/{accountId}/images/v1/variants` | Create a variant |
| `client.api.cloudflareImagesVariants.cloudflareImagesVariantsDeleteAVariant` | `DELETE /accounts/{accountId}/images/v1/variants/{variantId}` | Delete a variant |
| `client.api.cloudflareImagesVariants.cloudflareImagesVariantsVariantDetails` | `GET /accounts/{accountId}/images/v1/variants/{variantId}` | Variant details |
| `client.api.cloudflareImagesVariants.cloudflareImagesVariantsUpdateAVariant` | `PATCH /accounts/{accountId}/images/v1/variants/{variantId}` | Update a variant |
| `client.api.cloudflareImagesVariants.cloudflareImagesVariantsVariantDetailsFlat` | `GET /accounts/{accountId}/images/v1/variants/{variantId}/flat` | Variant details (flat) |

## cloudflareImagesSourcingKit

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cloudflareImagesSourcingKit.cloudflareImagesSourcingkitListMigrations` | `GET /accounts/{accountId}/images/v2/sourcingkit/migrations` | List sourcing kit migrations |
| `client.api.cloudflareImagesSourcingKit.cloudflareImagesSourcingkitCreateMigration` | `POST /accounts/{accountId}/images/v2/sourcingkit/migrations` | Create a sourcing kit migration |
| `client.api.cloudflareImagesSourcingKit.cloudflareImagesSourcingkitDeleteMigration` | `DELETE /accounts/{accountId}/images/v2/sourcingkit/migrations/{migrationId}` | Delete a sourcing kit migration |
| `client.api.cloudflareImagesSourcingKit.cloudflareImagesSourcingkitGetMigration` | `GET /accounts/{accountId}/images/v2/sourcingkit/migrations/{migrationId}` | Get sourcing kit migration |
| `client.api.cloudflareImagesSourcingKit.cloudflareImagesSourcingkitGetMigrationProgress` | `GET /accounts/{accountId}/images/v2/sourcingkit/migrations/{migrationId}/lifecycle` | Get migration progress |
| `client.api.cloudflareImagesSourcingKit.cloudflareImagesSourcingkitAbortMigration` | `PATCH /accounts/{accountId}/images/v2/sourcingkit/migrations/{migrationId}/lifecycle/abort` | Abort a migration |
| `client.api.cloudflareImagesSourcingKit.cloudflareImagesSourcingkitStartMigration` | `PATCH /accounts/{accountId}/images/v2/sourcingkit/migrations/{migrationId}/lifecycle/start` | Start a migration |
| `client.api.cloudflareImagesSourcingKit.cloudflareImagesSourcingkitListMigrationLogs` | `GET /accounts/{accountId}/images/v2/sourcingkit/migrations/{migrationId}/logs` | List migration logs |
| `client.api.cloudflareImagesSourcingKit.cloudflareImagesSourcingkitListSources` | `GET /accounts/{accountId}/images/v2/sourcingkit/sources` | List sourcing kit sources |
| `client.api.cloudflareImagesSourcingKit.cloudflareImagesSourcingkitCreateSource` | `POST /accounts/{accountId}/images/v2/sourcingkit/sources` | Create a sourcing kit source |
| `client.api.cloudflareImagesSourcingKit.cloudflareImagesSourcingkitPrecheckSourceConnectivity` | `POST /accounts/{accountId}/images/v2/sourcingkit/sources/connectivity-precheck` | Precheck source connectivity |
| `client.api.cloudflareImagesSourcingKit.cloudflareImagesSourcingkitDeleteSource` | `DELETE /accounts/{accountId}/images/v2/sourcingkit/sources/{sourceId}` | Delete a sourcing kit source |
| `client.api.cloudflareImagesSourcingKit.cloudflareImagesSourcingkitGetSource` | `GET /accounts/{accountId}/images/v2/sourcingkit/sources/{sourceId}` | Get sourcing kit source |
| `client.api.cloudflareImagesSourcingKit.cloudflareImagesSourcingkitUpdateSource` | `PATCH /accounts/{accountId}/images/v2/sourcingkit/sources/{sourceId}` | Update a sourcing kit source |
| `client.api.cloudflareImagesSourcingKit.cloudflareImagesSourcingkitGetSourceConnectivity` | `GET /accounts/{accountId}/images/v2/sourcingkit/sources/{sourceId}/connectivity` | Get source connectivity status |

## infrastructureAccessTargets

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.infrastructureAccessTargets.infraTargetsList` | `GET /accounts/{accountId}/infrastructure/targets` | List all targets |
| `client.api.infrastructureAccessTargets.infraTargetsPost` | `POST /accounts/{accountId}/infrastructure/targets` | Create new target |
| `client.api.infrastructureAccessTargets.infraTargetsDeleteBatch` | `DELETE /accounts/{accountId}/infrastructure/targets/batch` | Delete targets (Deprecated) |
| `client.api.infrastructureAccessTargets.infraTargetsPutBatch` | `PUT /accounts/{accountId}/infrastructure/targets/batch` | Create new targets |
| `client.api.infrastructureAccessTargets.infraTargetsDeleteBatchPost` | `POST /accounts/{accountId}/infrastructure/targets/batch_delete` | Delete targets |
| `client.api.infrastructureAccessTargets.infraTargetsPostBatchTags` | `POST /accounts/{accountId}/infrastructure/targets/batch_tags` | Replace tags on existing targets |
| `client.api.infrastructureAccessTargets.infraTargetsDelete` | `DELETE /accounts/{accountId}/infrastructure/targets/{targetId}` | Delete target |
| `client.api.infrastructureAccessTargets.infraTargetsGet` | `GET /accounts/{accountId}/infrastructure/targets/{targetId}` | Get target |
| `client.api.infrastructureAccessTargets.infraTargetsPut` | `PUT /accounts/{accountId}/infrastructure/targets/{targetId}` | Update target |

## asnIntelligence

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.asnIntelligence.asnIntelligenceGetAsnOverview` | `GET /accounts/{accountId}/intel/asn/{asn}` | Get ASN Overview. |
| `client.api.asnIntelligence.asnIntelligenceGetAsnSubnets` | `GET /accounts/{accountId}/intel/asn/{asn}/subnets` | Get ASN Subnets |

## securityCenterInsights

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.securityCenterInsights.getSecurityCenterIssueTypes` | `GET /accounts/{accountId}/intel/attack-surface-report/issue-types` | Retrieves Security Center Issues Types |
| `client.api.securityCenterInsights.getSecurityCenterIssues` | `GET /accounts/{accountId}/intel/attack-surface-report/issues` | Retrieves Security Center Issues |
| `client.api.securityCenterInsights.getSecurityCenterIssueCountsByClass` | `GET /accounts/{accountId}/intel/attack-surface-report/issues/class` | Retrieves Security Center Issue Counts by Class |
| `client.api.securityCenterInsights.getSecurityCenterIssueCountsBySeverity` | `GET /accounts/{accountId}/intel/attack-surface-report/issues/severity` | Retrieves Security Center Issue Counts by Severity |
| `client.api.securityCenterInsights.getSecurityCenterIssueCountsByType` | `GET /accounts/{accountId}/intel/attack-surface-report/issues/type` | Retrieves Security Center Issue Counts by Type |
| `client.api.securityCenterInsights.archiveSecurityCenterInsightDeprecated` | `PUT /accounts/{accountId}/intel/attack-surface-report/issues/{issueId}/dismiss` | Archives Security Center Insight |
| `client.api.securityCenterInsights.getSecurityCenterInsights` | `GET /accounts/{accountId}/security-center/insights` | Retrieves Security Center Insights |
| `client.api.securityCenterInsights.getSecurityCenterInsightCountsByClass` | `GET /accounts/{accountId}/security-center/insights/class` | Retrieves Security Center Insight Counts by Class |
| `client.api.securityCenterInsights.getSecurityCenterPartnerInsightCount` | `GET /accounts/{accountId}/security-center/insights/partner-count` | Retrieves a Partner Security Center Insight Count |
| `client.api.securityCenterInsights.getSecurityCenterInsightCountsBySeverity` | `GET /accounts/{accountId}/security-center/insights/severity` | Retrieves Security Center Insight Counts by Severity |
| `client.api.securityCenterInsights.getSecurityCenterInsightCountsByType` | `GET /accounts/{accountId}/security-center/insights/type` | Retrieves Security Center Insight Counts by Type |
| `client.api.securityCenterInsights.updateSecurityCenterInsightClassification` | `PATCH /accounts/{accountId}/security-center/insights/{issueId}/classification` | Updates Security Center Insight Classification |
| `client.api.securityCenterInsights.getSecurityCenterInsightContext` | `GET /accounts/{accountId}/security-center/insights/{issueId}/context` | Retrieves Security Center Insight Context |
| `client.api.securityCenterInsights.archiveSecurityCenterInsight` | `PUT /accounts/{accountId}/security-center/insights/{issueId}/dismiss` | Archives Security Center Insight |
| `client.api.securityCenterInsights.getSecurityCenterAccountState` | `GET /accounts/{accountId}/security-center/state` | Retrieves Account State |
| `client.api.securityCenterInsights.updateSecurityCenterAccountState` | `PUT /accounts/{accountId}/security-center/state` | Updates Account State |
| `client.api.securityCenterInsights.getZoneSecurityCenterInsights` | `GET /zones/{zoneId}/security-center/insights` | Retrieves Zone Security Center Insights |
| `client.api.securityCenterInsights.getZoneSecurityCenterInsightCountsByClass` | `GET /zones/{zoneId}/security-center/insights/class` | Retrieves Zone Security Center Insight Counts by Class |
| `client.api.securityCenterInsights.getZoneSecurityCenterPartnerInsightCount` | `GET /zones/{zoneId}/security-center/insights/partner-count` | Retrieves a Partner Zone Security Center Insight Count |
| `client.api.securityCenterInsights.getZoneSecurityCenterInsightCountsBySeverity` | `GET /zones/{zoneId}/security-center/insights/severity` | Retrieves Zone Security Center Insight Counts by Severity |
| `client.api.securityCenterInsights.getZoneSecurityCenterInsightCountsByType` | `GET /zones/{zoneId}/security-center/insights/type` | Retrieves Zone Security Center Insight Counts by Type |
| `client.api.securityCenterInsights.updateZoneSecurityCenterInsightClassification` | `PATCH /zones/{zoneId}/security-center/insights/{issueId}/classification` | Updates Zone Security Center Insight Classification |
| `client.api.securityCenterInsights.archiveZoneSecurityCenterInsight` | `PUT /zones/{zoneId}/security-center/insights/{issueId}/dismiss` | Archives Zone Security Center Insight |

## passiveDnsByIp

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.passiveDnsByIp.passiveDnsByIpGetPassiveDnsByIp` | `GET /accounts/{accountId}/intel/dns` | Get Passive DNS by IP |

## domainIntelligence

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.domainIntelligence.domainIntelligenceGetDomainDetails` | `GET /accounts/{accountId}/intel/domain` | Get Domain Details |
| `client.api.domainIntelligence.domainIntelligenceGetMultipleDomainDetails` | `GET /accounts/{accountId}/intel/domain/bulk` | Get Multiple Domain Details |

## domainHistory

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.domainHistory.domainHistoryGetDomainHistory` | `GET /accounts/{accountId}/intel/domain-history` | Get Domain History |

## customIndicatorFeeds

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.customIndicatorFeeds.customIndicatorFeedsGetIndicatorFeeds` | `GET /accounts/{accountId}/intel/indicator-feeds` | Get indicator feeds owned by this account |
| `client.api.customIndicatorFeeds.customIndicatorFeedsCreateIndicatorFeeds` | `POST /accounts/{accountId}/intel/indicator-feeds` | Create new indicator feed |
| `client.api.customIndicatorFeeds.customIndicatorFeedsAddPermission` | `PUT /accounts/{accountId}/intel/indicator-feeds/permissions/add` | Grant permission to indicator feed |
| `client.api.customIndicatorFeeds.customIndicatorFeedsCreateProvider` | `PUT /accounts/{accountId}/intel/indicator-feeds/permissions/createProvider` | Create indicator feed provider |
| `client.api.customIndicatorFeeds.customIndicatorFeedsRemovePermission` | `PUT /accounts/{accountId}/intel/indicator-feeds/permissions/remove` | Revoke permission to indicator feed |
| `client.api.customIndicatorFeeds.customIndicatorFeedsViewPermissions` | `GET /accounts/{accountId}/intel/indicator-feeds/permissions/view` | List indicator feed permissions |
| `client.api.customIndicatorFeeds.customIndicatorFeedsGetIndicatorFeedMetadata` | `GET /accounts/{accountId}/intel/indicator-feeds/{feedId}` | Get indicator feed metadata |
| `client.api.customIndicatorFeeds.customIndicatorFeedsUpdateIndicatorFeedMetadata` | `PUT /accounts/{accountId}/intel/indicator-feeds/{feedId}` | Update indicator feed metadata |
| `client.api.customIndicatorFeeds.customIndicatorFeedsGetIndicatorFeedData` | `GET /accounts/{accountId}/intel/indicator-feeds/{feedId}/data` | Get indicator feed data |
| `client.api.customIndicatorFeeds.customIndicatorFeedsDownloadIndicatorFeedData` | `GET /accounts/{accountId}/intel/indicator-feeds/{feedId}/download` | Download indicator feed data |
| `client.api.customIndicatorFeeds.customIndicatorFeedsUpdateIndicatorFeedData` | `PUT /accounts/{accountId}/intel/indicator-feeds/{feedId}/snapshot` | Update indicator feed data |
| `client.api.customIndicatorFeeds.customIndicatorFeedsGetUploadStatus` | `GET /accounts/{accountId}/intel/indicator-feeds/{feedId}/uploads/{uploadId}` | Get indicator feed upload status |

## ipIntelligence

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ipIntelligence.ipIntelligenceGetIpOverview` | `GET /accounts/{accountId}/intel/ip` | Get IP Overview |

## ipList

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ipList.ipListGetIpLists` | `GET /accounts/{accountId}/intel/ip-lists` | Get Available IP Lists |

## miscategorization

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.miscategorization.miscategorizationCreateMiscategorization` | `POST /accounts/{accountId}/intel/miscategorization` | Create Miscategorization |

## sinkholeConfig

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.sinkholeConfig.sinkholeConfigListSinkholes` | `GET /accounts/{accountId}/intel/sinkholes` | List sinkholes owned by this account |
| `client.api.sinkholeConfig.sinkholeConfigCreateSinkhole` | `POST /accounts/{accountId}/intel/sinkholes` | Create a new sinkhole for your account |
| `client.api.sinkholeConfig.sinkholeConfigDeleteSinkhole` | `DELETE /accounts/{accountId}/intel/sinkholes/{sinkholeId}` | Delete a sinkhole |
| `client.api.sinkholeConfig.sinkholeConfigGetSinkhole` | `GET /accounts/{accountId}/intel/sinkholes/{sinkholeId}` | Get a sinkhole |
| `client.api.sinkholeConfig.sinkholeConfigUpdateSinkhole` | `PUT /accounts/{accountId}/intel/sinkholes/{sinkholeId}` | Update a sinkhole |
| `client.api.sinkholeConfig.sinkholeConfigListSinkholeIngresses` | `GET /accounts/{accountId}/intel/sinkholes/{sinkholeId}/ingresses` | List ingresses for a sinkhole |
| `client.api.sinkholeConfig.sinkholeConfigCreateIngress` | `POST /zones/{zoneId}/intel/sinkholes/{sinkholeId}/ingresses` | Create an ingress rule |
| `client.api.sinkholeConfig.sinkholeConfigDeleteIngress` | `DELETE /zones/{zoneId}/intel/sinkholes/{sinkholeId}/ingresses/{ingressId}` | Delete an ingress rule |
| `client.api.sinkholeConfig.sinkholeConfigGetIngress` | `GET /zones/{zoneId}/intel/sinkholes/{sinkholeId}/ingresses/{ingressId}` | Get an ingress rule |
| `client.api.sinkholeConfig.sinkholeConfigUpdateIngress` | `PUT /zones/{zoneId}/intel/sinkholes/{sinkholeId}/ingresses/{ingressId}` | Update an ingress rule |

## urlIntelligence

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.urlIntelligence.urlIntelligenceGetUrlIntelligence` | `GET /accounts/{accountId}/intel/url` | Get URL Intelligence |

## whoisRecord

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.whoisRecord.whoisRecordGetWhoisRecord` | `GET /accounts/{accountId}/intel/whois` | Get WHOIS Record |

## accountLoadBalancers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountLoadBalancers.accountLoadBalancersListAccountLoadBalancers` | `GET /accounts/{accountId}/load_balancers` | List Account Load Balancers |
| `client.api.accountLoadBalancers.accountLoadBalancersCreateAccountLoadBalancer` | `POST /accounts/{accountId}/load_balancers` | Create Account Load Balancer |
| `client.api.accountLoadBalancers.accountLoadBalancersListLoadBalancerUsage` | `GET /accounts/{accountId}/load_balancers/usage` | List Load Balancer Usage |
| `client.api.accountLoadBalancers.accountLoadBalancersDeleteAccountLoadBalancer` | `DELETE /accounts/{accountId}/load_balancers/{loadBalancerId}` | Delete Account Load Balancer |
| `client.api.accountLoadBalancers.accountLoadBalancersAccountLoadBalancerDetails` | `GET /accounts/{accountId}/load_balancers/{loadBalancerId}` | Account Load Balancer Details |
| `client.api.accountLoadBalancers.accountLoadBalancersPatchAccountLoadBalancer` | `PATCH /accounts/{accountId}/load_balancers/{loadBalancerId}` | Patch Account Load Balancer |
| `client.api.accountLoadBalancers.accountLoadBalancersUpdateAccountLoadBalancer` | `PUT /accounts/{accountId}/load_balancers/{loadBalancerId}` | Update Account Load Balancer |

## accountLoadBalancerMonitorGroups

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountLoadBalancerMonitorGroups.accountLoadBalancerMonitorGroupsListMonitorGroups` | `GET /accounts/{accountId}/load_balancers/monitor_groups` | List Monitor Groups |
| `client.api.accountLoadBalancerMonitorGroups.accountLoadBalancerMonitorGroupsCreateMonitorGroup` | `POST /accounts/{accountId}/load_balancers/monitor_groups` | Create Monitor Group |
| `client.api.accountLoadBalancerMonitorGroups.accountLoadBalancerMonitorGroupsDeleteMonitorGroup` | `DELETE /accounts/{accountId}/load_balancers/monitor_groups/{monitorGroupId}` | Delete Monitor Group |
| `client.api.accountLoadBalancerMonitorGroups.accountLoadBalancerMonitorGroupsMonitorGroupDetails` | `GET /accounts/{accountId}/load_balancers/monitor_groups/{monitorGroupId}` | Monitor Group Details |
| `client.api.accountLoadBalancerMonitorGroups.accountLoadBalancerMonitorGroupsPatchMonitorGroup` | `PATCH /accounts/{accountId}/load_balancers/monitor_groups/{monitorGroupId}` | Patch Monitor Group |
| `client.api.accountLoadBalancerMonitorGroups.accountLoadBalancerMonitorGroupsUpdateMonitorGroup` | `PUT /accounts/{accountId}/load_balancers/monitor_groups/{monitorGroupId}` | Update Monitor Group |
| `client.api.accountLoadBalancerMonitorGroups.accountLoadBalancerMonitorGroupsListMonitorGroupReferences` | `GET /accounts/{accountId}/load_balancers/monitor_groups/{monitorGroupId}/references` | List Monitor Group References |

## accountLoadBalancerMonitors

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountLoadBalancerMonitors.accountLoadBalancerMonitorsListMonitors` | `GET /accounts/{accountId}/load_balancers/monitors` | List Monitors |
| `client.api.accountLoadBalancerMonitors.accountLoadBalancerMonitorsCreateMonitor` | `POST /accounts/{accountId}/load_balancers/monitors` | Create Monitor |
| `client.api.accountLoadBalancerMonitors.accountLoadBalancerMonitorsDeleteMonitor` | `DELETE /accounts/{accountId}/load_balancers/monitors/{monitorId}` | Delete Monitor |
| `client.api.accountLoadBalancerMonitors.accountLoadBalancerMonitorsMonitorDetails` | `GET /accounts/{accountId}/load_balancers/monitors/{monitorId}` | Monitor Details |
| `client.api.accountLoadBalancerMonitors.accountLoadBalancerMonitorsPatchMonitor` | `PATCH /accounts/{accountId}/load_balancers/monitors/{monitorId}` | Patch Monitor |
| `client.api.accountLoadBalancerMonitors.accountLoadBalancerMonitorsUpdateMonitor` | `PUT /accounts/{accountId}/load_balancers/monitors/{monitorId}` | Update Monitor |
| `client.api.accountLoadBalancerMonitors.accountLoadBalancerMonitorsPreviewMonitor` | `POST /accounts/{accountId}/load_balancers/monitors/{monitorId}/preview` | Preview Monitor |
| `client.api.accountLoadBalancerMonitors.accountLoadBalancerMonitorsListMonitorReferences` | `GET /accounts/{accountId}/load_balancers/monitors/{monitorId}/references` | List Monitor References |
| `client.api.accountLoadBalancerMonitors.accountLoadBalancerMonitorsPreviewResult` | `GET /accounts/{accountId}/load_balancers/preview/{previewId}` | Preview Result |

## accountLoadBalancerPools

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountLoadBalancerPools.accountLoadBalancerPoolsListPools` | `GET /accounts/{accountId}/load_balancers/pools` | List Pools |
| `client.api.accountLoadBalancerPools.accountLoadBalancerPoolsPatchPools` | `PATCH /accounts/{accountId}/load_balancers/pools` | Patch Pools |
| `client.api.accountLoadBalancerPools.accountLoadBalancerPoolsCreatePool` | `POST /accounts/{accountId}/load_balancers/pools` | Create Pool |
| `client.api.accountLoadBalancerPools.accountLoadBalancerPoolsDeletePool` | `DELETE /accounts/{accountId}/load_balancers/pools/{poolId}` | Delete Pool |
| `client.api.accountLoadBalancerPools.accountLoadBalancerPoolsPoolDetails` | `GET /accounts/{accountId}/load_balancers/pools/{poolId}` | Pool Details |
| `client.api.accountLoadBalancerPools.accountLoadBalancerPoolsPatchPool` | `PATCH /accounts/{accountId}/load_balancers/pools/{poolId}` | Patch Pool |
| `client.api.accountLoadBalancerPools.accountLoadBalancerPoolsUpdatePool` | `PUT /accounts/{accountId}/load_balancers/pools/{poolId}` | Update Pool |
| `client.api.accountLoadBalancerPools.accountLoadBalancerPoolsPoolHealthDetails` | `GET /accounts/{accountId}/load_balancers/pools/{poolId}/health` | Pool Health Details |
| `client.api.accountLoadBalancerPools.accountLoadBalancerPoolsPreviewPool` | `POST /accounts/{accountId}/load_balancers/pools/{poolId}/preview` | Preview Pool |
| `client.api.accountLoadBalancerPools.accountLoadBalancerPoolsListPoolReferences` | `GET /accounts/{accountId}/load_balancers/pools/{poolId}/references` | List Pool References |

## accountLoadBalancerSearch

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountLoadBalancerSearch.accountLoadBalancerSearchSearchResources` | `GET /accounts/{accountId}/load_balancers/search` | Search Resources |

## logpushJobsForAnAccount

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.logpushJobsForAnAccount.getAccountsAccountIdLogpushDatasetsDatasetIdFields` | `GET /accounts/{accountId}/logpush/datasets/{datasetId}/fields` | List fields |
| `client.api.logpushJobsForAnAccount.getAccountsAccountIdLogpushDatasetsDatasetIdJobs` | `GET /accounts/{accountId}/logpush/datasets/{datasetId}/jobs` | List Logpush jobs for a dataset |
| `client.api.logpushJobsForAnAccount.getAccountsAccountIdLogpushJobs` | `GET /accounts/{accountId}/logpush/jobs` | List Logpush jobs |
| `client.api.logpushJobsForAnAccount.postAccountsAccountIdLogpushJobs` | `POST /accounts/{accountId}/logpush/jobs` | Create Logpush job |
| `client.api.logpushJobsForAnAccount.deleteAccountsAccountIdLogpushJobsJobId` | `DELETE /accounts/{accountId}/logpush/jobs/{jobId}` | Delete Logpush job |
| `client.api.logpushJobsForAnAccount.getAccountsAccountIdLogpushJobsJobId` | `GET /accounts/{accountId}/logpush/jobs/{jobId}` | Get Logpush job details |
| `client.api.logpushJobsForAnAccount.putAccountsAccountIdLogpushJobsJobId` | `PUT /accounts/{accountId}/logpush/jobs/{jobId}` | Update Logpush job |
| `client.api.logpushJobsForAnAccount.postAccountsAccountIdLogpushOwnership` | `POST /accounts/{accountId}/logpush/ownership` | Get ownership challenge |
| `client.api.logpushJobsForAnAccount.postAccountsAccountIdLogpushOwnershipValidate` | `POST /accounts/{accountId}/logpush/ownership/validate` | Validate ownership challenge |
| `client.api.logpushJobsForAnAccount.deleteAccountsAccountIdLogpushValidateDestination` | `POST /accounts/{accountId}/logpush/validate/destination` | Validate destination |
| `client.api.logpushJobsForAnAccount.deleteAccountsAccountIdLogpushValidateDestinationExists` | `POST /accounts/{accountId}/logpush/validate/destination/exists` | Check destination exists |
| `client.api.logpushJobsForAnAccount.postAccountsAccountIdLogpushValidateOrigin` | `POST /accounts/{accountId}/logpush/validate/origin` | Validate origin |

## logpushTransformers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.logpushTransformers.getAccountsAccountIdLogpushTransformers` | `GET /accounts/{accountId}/logpush/transformers` | List transformers |
| `client.api.logpushTransformers.postAccountsAccountIdLogpushTransformers` | `POST /accounts/{accountId}/logpush/transformers` | Create transformer |
| `client.api.logpushTransformers.postAccountsAccountIdLogpushTransformersPreview` | `POST /accounts/{accountId}/logpush/transformers/preview` | Preview transformer |
| `client.api.logpushTransformers.deleteAccountsAccountIdLogpushTransformersTransformerId` | `DELETE /accounts/{accountId}/logpush/transformers/{transformerId}` | Delete transformer |
| `client.api.logpushTransformers.getAccountsAccountIdLogpushTransformersTransformerId` | `GET /accounts/{accountId}/logpush/transformers/{transformerId}` | Get transformer |
| `client.api.logpushTransformers.putAccountsAccountIdLogpushTransformersTransformerId` | `PUT /accounts/{accountId}/logpush/transformers/{transformerId}` | Update transformer |
| `client.api.logpushTransformers.getAccountsAccountIdLogpushTransformersTransformerIdContent` | `GET /accounts/{accountId}/logpush/transformers/{transformerId}/content` | Get transformer content |
| `client.api.logpushTransformers.getAccountsAccountIdLogpushTransformersTransformerIdVersions` | `GET /accounts/{accountId}/logpush/transformers/{transformerId}/versions` | List transformer versions |

## logcontrolCmbConfigForAnAccount

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.logcontrolCmbConfigForAnAccount.deleteAccountsAccountIdLogsControlCmbConfig` | `DELETE /accounts/{accountId}/logs/control/cmb/config` | Delete CMB config |
| `client.api.logcontrolCmbConfigForAnAccount.getAccountsAccountIdLogsControlCmbConfig` | `GET /accounts/{accountId}/logs/control/cmb/config` | Get CMB config |
| `client.api.logcontrolCmbConfigForAnAccount.postAccountsAccountIdLogsControlCmbConfig` | `POST /accounts/{accountId}/logs/control/cmb/config` | Update CMB config |

## logExplorerDatasets

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.logExplorerDatasets.accountsLogsExplorerDatasetsList` | `GET /accounts/{accountId}/logs/explorer/datasets` | List account datasets |
| `client.api.logExplorerDatasets.accountsLogsExplorerDatasetsCreate` | `POST /accounts/{accountId}/logs/explorer/datasets` | Create an account dataset |
| `client.api.logExplorerDatasets.accountsLogsExplorerDatasetsAvailableList` | `GET /accounts/{accountId}/logs/explorer/datasets/available` | List available account datasets |
| `client.api.logExplorerDatasets.accountsLogsExplorerDatasetsDelete` | `DELETE /accounts/{accountId}/logs/explorer/datasets/{datasetId}` | Delete an account dataset |
| `client.api.logExplorerDatasets.accountsLogsExplorerDatasetsGet` | `GET /accounts/{accountId}/logs/explorer/datasets/{datasetId}` | Get an account dataset |
| `client.api.logExplorerDatasets.accountsLogsExplorerDatasetsUpdate` | `PUT /accounts/{accountId}/logs/explorer/datasets/{datasetId}` | Update an account dataset |
| `client.api.logExplorerDatasets.zonesLogsExplorerDatasetsList` | `GET /zones/{zoneId}/logs/explorer/datasets` | List zone datasets |
| `client.api.logExplorerDatasets.zonesLogsExplorerDatasetsCreate` | `POST /zones/{zoneId}/logs/explorer/datasets` | Create a zone dataset |
| `client.api.logExplorerDatasets.zonesLogsExplorerDatasetsAvailableList` | `GET /zones/{zoneId}/logs/explorer/datasets/available` | List available zone datasets |
| `client.api.logExplorerDatasets.zonesLogsExplorerDatasetsDelete` | `DELETE /zones/{zoneId}/logs/explorer/datasets/{datasetId}` | Delete a zone dataset |
| `client.api.logExplorerDatasets.zonesLogsExplorerDatasetsGet` | `GET /zones/{zoneId}/logs/explorer/datasets/{datasetId}` | Get a zone dataset |
| `client.api.logExplorerDatasets.zonesLogsExplorerDatasetsUpdate` | `PUT /zones/{zoneId}/logs/explorer/datasets/{datasetId}` | Update a zone dataset |

## logExplorerQueries

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.logExplorerQueries.accountsLogsExplorerQueryGet` | `GET /accounts/{accountId}/logs/explorer/query/sql` | Run a log query |
| `client.api.logExplorerQueries.accountsLogsExplorerQueryPost` | `POST /accounts/{accountId}/logs/explorer/query/sql` | Run a log query |
| `client.api.logExplorerQueries.zonesLogsExplorerQueryGet` | `GET /zones/{zoneId}/logs/explorer/query/sql` | Run a log query |
| `client.api.logExplorerQueries.zonesLogsExplorerQueryPost` | `POST /zones/{zoneId}/logs/explorer/query/sql` | Run a log query |

## logpull

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.logpull.logpullListLogFiles` | `GET /accounts/{accountId}/logs/list` | List log files |
| `client.api.logpull.logpullRetrieveLogs` | `GET /accounts/{accountId}/logs/retrieve` | Retrieve logs |

## dosFlowtrackdApiOther

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dosFlowtrackdApiOther.deleteDnsProtectionRulesForAccount` | `DELETE /accounts/{accountId}/magic/advanced_dns_protection/configs/dns_protection/rules` | Delete all DNS Protection rules. |
| `client.api.dosFlowtrackdApiOther.listDnsProtectionRulesForAccount` | `GET /accounts/{accountId}/magic/advanced_dns_protection/configs/dns_protection/rules` | List all DNS Protection rules. |
| `client.api.dosFlowtrackdApiOther.createDnsProtectionRule` | `POST /accounts/{accountId}/magic/advanced_dns_protection/configs/dns_protection/rules` | Create DNS Protection rule. |
| `client.api.dosFlowtrackdApiOther.deleteDnsProtectionRule` | `DELETE /accounts/{accountId}/magic/advanced_dns_protection/configs/dns_protection/rules/{ruleId}` | Delete DNS Protection rule. |
| `client.api.dosFlowtrackdApiOther.getDnsProtectionRule` | `GET /accounts/{accountId}/magic/advanced_dns_protection/configs/dns_protection/rules/{ruleId}` | Get DNS Protection rule. |
| `client.api.dosFlowtrackdApiOther.updateDnsProtectionRule` | `PATCH /accounts/{accountId}/magic/advanced_dns_protection/configs/dns_protection/rules/{ruleId}` | Update DNS Protection rule. |
| `client.api.dosFlowtrackdApiOther.deleteAllowlistPrefixesForAccount` | `DELETE /accounts/{accountId}/magic/advanced_tcp_protection/configs/allowlist` | Delete all allowlist prefixes. |
| `client.api.dosFlowtrackdApiOther.listAllowlistPrefixesForAccount` | `GET /accounts/{accountId}/magic/advanced_tcp_protection/configs/allowlist` | List all allowlist prefixes. |
| `client.api.dosFlowtrackdApiOther.createAllowlistedPrefix` | `POST /accounts/{accountId}/magic/advanced_tcp_protection/configs/allowlist` | Create allowlist prefix. |
| `client.api.dosFlowtrackdApiOther.deleteAllowlistPrefix` | `DELETE /accounts/{accountId}/magic/advanced_tcp_protection/configs/allowlist/{prefixId}` | Delete allowlist prefix. |
| `client.api.dosFlowtrackdApiOther.getAllowlistPrefix` | `GET /accounts/{accountId}/magic/advanced_tcp_protection/configs/allowlist/{prefixId}` | Get allowlist prefix. |
| `client.api.dosFlowtrackdApiOther.updateAllowlistPrefix` | `PATCH /accounts/{accountId}/magic/advanced_tcp_protection/configs/allowlist/{prefixId}` | Update allowlist prefix. |
| `client.api.dosFlowtrackdApiOther.deletePrefixesForAccount` | `DELETE /accounts/{accountId}/magic/advanced_tcp_protection/configs/prefixes` | Delete all prefixes. |
| `client.api.dosFlowtrackdApiOther.listPrefixesForAccount` | `GET /accounts/{accountId}/magic/advanced_tcp_protection/configs/prefixes` | List all prefixes. |
| `client.api.dosFlowtrackdApiOther.createPrefix` | `POST /accounts/{accountId}/magic/advanced_tcp_protection/configs/prefixes` | Create prefix. |
| `client.api.dosFlowtrackdApiOther.bulkCreatePrefixes` | `POST /accounts/{accountId}/magic/advanced_tcp_protection/configs/prefixes/bulk` | Create multiple prefixes. |
| `client.api.dosFlowtrackdApiOther.deletePrefix` | `DELETE /accounts/{accountId}/magic/advanced_tcp_protection/configs/prefixes/{prefixId}` | Delete prefix. |
| `client.api.dosFlowtrackdApiOther.getPrefix` | `GET /accounts/{accountId}/magic/advanced_tcp_protection/configs/prefixes/{prefixId}` | Get prefix. |
| `client.api.dosFlowtrackdApiOther.updatePrefix` | `PATCH /accounts/{accountId}/magic/advanced_tcp_protection/configs/prefixes/{prefixId}` | Update prefix. |
| `client.api.dosFlowtrackdApiOther.deleteSynProtectionFiltersForAccount` | `DELETE /accounts/{accountId}/magic/advanced_tcp_protection/configs/syn_protection/filters` | Delete all SYN Protection filters. |
| `client.api.dosFlowtrackdApiOther.listSynProtectionFiltersForAccount` | `GET /accounts/{accountId}/magic/advanced_tcp_protection/configs/syn_protection/filters` | List all SYN Protection filters. |
| `client.api.dosFlowtrackdApiOther.createSynProtectionFilter` | `POST /accounts/{accountId}/magic/advanced_tcp_protection/configs/syn_protection/filters` | Create a SYN Protection filter. |
| `client.api.dosFlowtrackdApiOther.deleteSynProtectionFilter` | `DELETE /accounts/{accountId}/magic/advanced_tcp_protection/configs/syn_protection/filters/{filterId}` | Delete SYN Protection filter. |
| `client.api.dosFlowtrackdApiOther.getSynProtectionFilter` | `GET /accounts/{accountId}/magic/advanced_tcp_protection/configs/syn_protection/filters/{filterId}` | Get SYN Protection filter. |
| `client.api.dosFlowtrackdApiOther.updateSynProtectionFilter` | `PATCH /accounts/{accountId}/magic/advanced_tcp_protection/configs/syn_protection/filters/{filterId}` | Update SYN Protection filter. |
| `client.api.dosFlowtrackdApiOther.deleteSynProtectionRulesForAccount` | `DELETE /accounts/{accountId}/magic/advanced_tcp_protection/configs/syn_protection/rules` | Delete all SYN Protection rules. |
| `client.api.dosFlowtrackdApiOther.listSynProtectionRulesForAccount` | `GET /accounts/{accountId}/magic/advanced_tcp_protection/configs/syn_protection/rules` | List all SYN Protection rules. |
| `client.api.dosFlowtrackdApiOther.createSynProtectionRule` | `POST /accounts/{accountId}/magic/advanced_tcp_protection/configs/syn_protection/rules` | Create SYN Protection rule. |
| `client.api.dosFlowtrackdApiOther.deleteSynProtectionRule` | `DELETE /accounts/{accountId}/magic/advanced_tcp_protection/configs/syn_protection/rules/{ruleId}` | Delete SYN Protection rule. |
| `client.api.dosFlowtrackdApiOther.getSynProtectionRule` | `GET /accounts/{accountId}/magic/advanced_tcp_protection/configs/syn_protection/rules/{ruleId}` | Get SYN Protection rule. |
| `client.api.dosFlowtrackdApiOther.updateSynProtectionRule` | `PATCH /accounts/{accountId}/magic/advanced_tcp_protection/configs/syn_protection/rules/{ruleId}` | Update SYN Protection rule. |
| `client.api.dosFlowtrackdApiOther.deleteTcpFlowProtectionFiltersForAccount` | `DELETE /accounts/{accountId}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters` | Delete all TCP Flow Protection filters. |
| `client.api.dosFlowtrackdApiOther.listTcpFlowProtectionFiltersForAccount` | `GET /accounts/{accountId}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters` | List all TCP Flow Protection filters. |
| `client.api.dosFlowtrackdApiOther.createTcpFlowProtectionFilter` | `POST /accounts/{accountId}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters` | Create a TCP Flow Protection filter. |
| `client.api.dosFlowtrackdApiOther.deleteTcpFlowProtectionFilter` | `DELETE /accounts/{accountId}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/{filterId}` | Delete TCP Flow Protection filter. |
| `client.api.dosFlowtrackdApiOther.getTcpFlowProtectionFilter` | `GET /accounts/{accountId}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/{filterId}` | Get TCP Flow Protection filter. |
| `client.api.dosFlowtrackdApiOther.updateTcpFlowProtectionFilter` | `PATCH /accounts/{accountId}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/{filterId}` | Update TCP Flow Protection filter. |
| `client.api.dosFlowtrackdApiOther.deleteTcpFlowProtectionRulesForAccount` | `DELETE /accounts/{accountId}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules` | Delete all TCP Flow Protection rules. |
| `client.api.dosFlowtrackdApiOther.listTcpFlowProtectionRulesForAccount` | `GET /accounts/{accountId}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules` | List all TCP Flow Protection rules. |
| `client.api.dosFlowtrackdApiOther.createTcpFlowProtectionRule` | `POST /accounts/{accountId}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules` | Create TCP Flow Protection rule. |
| `client.api.dosFlowtrackdApiOther.deleteTcpFlowProtectionRule` | `DELETE /accounts/{accountId}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules/{ruleId}` | Delete TCP Flow Protection rule. |
| `client.api.dosFlowtrackdApiOther.getTcpFlowProtectionRule` | `GET /accounts/{accountId}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules/{ruleId}` | Get TCP Flow Protection rule. |
| `client.api.dosFlowtrackdApiOther.updateTcpFlowProtectionRule` | `PATCH /accounts/{accountId}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules/{ruleId}` | Update TCP Flow Protection rule. |
| `client.api.dosFlowtrackdApiOther.getProtectionStatus` | `GET /accounts/{accountId}/magic/advanced_tcp_protection/configs/tcp_protection_status` | Get protection status. |
| `client.api.dosFlowtrackdApiOther.updateProtectionStatus` | `PATCH /accounts/{accountId}/magic/advanced_tcp_protection/configs/tcp_protection_status` | Update protection status. |

## magicAccountApps

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicAccountApps.magicAccountAppsListApps` | `GET /accounts/{accountId}/magic/apps` | List Apps |
| `client.api.magicAccountApps.magicAccountAppsAddApp` | `POST /accounts/{accountId}/magic/apps` | Create a new App |
| `client.api.magicAccountApps.magicAccountAppsDeleteApp` | `DELETE /accounts/{accountId}/magic/apps/{accountAppId}` | Delete Account App |
| `client.api.magicAccountApps.magicAccountAppsPatchApp` | `PATCH /accounts/{accountId}/magic/apps/{accountAppId}` | Update an App |
| `client.api.magicAccountApps.magicAccountAppsUpdateApp` | `PUT /accounts/{accountId}/magic/apps/{accountAppId}` | Update an App |

## magicBgpFilterProfiles

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicBgpFilterProfiles.magicBgpListFilterProfiles` | `GET /accounts/{accountId}/magic/bgp/filter_profiles` | List BGP Filter Profiles |
| `client.api.magicBgpFilterProfiles.magicBgpCreateFilterProfile` | `POST /accounts/{accountId}/magic/bgp/filter_profiles` | Create BGP Filter Profile |
| `client.api.magicBgpFilterProfiles.magicBgpDeleteFilterProfile` | `DELETE /accounts/{accountId}/magic/bgp/filter_profiles/{profileId}` | Delete BGP Filter Profile |
| `client.api.magicBgpFilterProfiles.magicBgpGetFilterProfile` | `GET /accounts/{accountId}/magic/bgp/filter_profiles/{profileId}` | Get BGP Filter Profile |
| `client.api.magicBgpFilterProfiles.magicBgpUpdateFilterProfile` | `PUT /accounts/{accountId}/magic/bgp/filter_profiles/{profileId}` | Update BGP Filter Profile |

## magicBgpSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicBgpSettings.magicBgpGetSettings` | `GET /accounts/{accountId}/magic/bgp/settings` | Get BGP Settings |
| `client.api.magicBgpSettings.magicBgpUpdateSettings` | `PUT /accounts/{accountId}/magic/bgp/settings` | Update BGP Settings |

## magicCf1Sites

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicCf1Sites.magicCf1SitesListCf1Sites` | `GET /accounts/{accountId}/magic/cf1_sites` | List CF1 Sites |
| `client.api.magicCf1Sites.magicCf1SitesCreateCf1Sites` | `POST /accounts/{accountId}/magic/cf1_sites` | Create CF1 Sites |
| `client.api.magicCf1Sites.magicCf1SitesDeleteCf1Site` | `DELETE /accounts/{accountId}/magic/cf1_sites/{cf1SiteId}` | Delete CF1 Site |
| `client.api.magicCf1Sites.magicCf1SitesGetCf1Site` | `GET /accounts/{accountId}/magic/cf1_sites/{cf1SiteId}` | Get CF1 Site |
| `client.api.magicCf1Sites.magicCf1SitesUpdateCf1Site` | `PATCH /accounts/{accountId}/magic/cf1_sites/{cf1SiteId}` | Update CF1 Site |

## magicCf1SiteRamps

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicCf1SiteRamps.magicCf1SitesListCf1SiteRamps` | `GET /accounts/{accountId}/magic/cf1_sites/{cf1SiteId}/ramps` | List CF1 Site Ramps |
| `client.api.magicCf1SiteRamps.magicCf1SitesCreateCf1SiteRamps` | `POST /accounts/{accountId}/magic/cf1_sites/{cf1SiteId}/ramps` | Create CF1 Site Ramps |
| `client.api.magicCf1SiteRamps.magicCf1SitesDeleteCf1SiteRamp` | `DELETE /accounts/{accountId}/magic/cf1_sites/{cf1SiteId}/ramps/{rampId}` | Delete CF1 Site Ramp |
| `client.api.magicCf1SiteRamps.magicCf1SitesGetCf1SiteRamp` | `GET /accounts/{accountId}/magic/cf1_sites/{cf1SiteId}/ramps/{rampId}` | Get CF1 Site Ramp |

## magicInterconnects

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicInterconnects.magicInterconnectsListInterconnects` | `GET /accounts/{accountId}/magic/cf_interconnects` | List interconnects |
| `client.api.magicInterconnects.magicInterconnectsUpdateMultipleInterconnects` | `PUT /accounts/{accountId}/magic/cf_interconnects` | Update multiple interconnects |
| `client.api.magicInterconnects.magicInterconnectsListInterconnectDetails` | `GET /accounts/{accountId}/magic/cf_interconnects/{cfInterconnectId}` | List interconnect Details |
| `client.api.magicInterconnects.magicInterconnectsUpdateInterconnect` | `PUT /accounts/{accountId}/magic/cf_interconnects/{cfInterconnectId}` | Update interconnect |

## magicConnectors

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicConnectors.mconnConnectorsList` | `GET /accounts/{accountId}/magic/connectors` | List Connectors |
| `client.api.magicConnectors.mconnConnectorsCreate` | `POST /accounts/{accountId}/magic/connectors` | Create Connector |
| `client.api.magicConnectors.mconnConnectorsDelete` | `DELETE /accounts/{accountId}/magic/connectors/{connectorId}` | Delete Connector |
| `client.api.magicConnectors.mconnConnectorsGet` | `GET /accounts/{accountId}/magic/connectors/{connectorId}` | Get Connector |
| `client.api.magicConnectors.mconnConnectorsEdit` | `PATCH /accounts/{accountId}/magic/connectors/{connectorId}` | Edit Connector |
| `client.api.magicConnectors.mconnConnectorsUpdate` | `PUT /accounts/{accountId}/magic/connectors/{connectorId}` | Update Connector |
| `client.api.magicConnectors.mconnConnectorInterruptsList` | `GET /accounts/{accountId}/magic/connectors/{connectorId}/interrupts` | List Interrupts |
| `client.api.magicConnectors.mconnConnectorInterruptsCreate` | `POST /accounts/{accountId}/magic/connectors/{connectorId}/interrupts` | Create Interrupt |
| `client.api.magicConnectors.mconnConnectorTelemetryEventsList` | `GET /accounts/{accountId}/magic/connectors/{connectorId}/telemetry/events` | List Events |
| `client.api.magicConnectors.mconnConnectorTelemetryEventsLatestGet` | `GET /accounts/{accountId}/magic/connectors/{connectorId}/telemetry/events/latest` | Get latest Events |
| `client.api.magicConnectors.mconnConnectorTelemetryEventsGet` | `GET /accounts/{accountId}/magic/connectors/{connectorId}/telemetry/events/{eventT}.{eventN}` | Get Event |
| `client.api.magicConnectors.mconnConnectorTelemetrySnapshotsList` | `GET /accounts/{accountId}/magic/connectors/{connectorId}/telemetry/snapshots` | List Snapshots |
| `client.api.magicConnectors.mconnConnectorTelemetrySnapshotsLatestGet` | `GET /accounts/{accountId}/magic/connectors/{connectorId}/telemetry/snapshots/latest` | Get latest Snapshots |
| `client.api.magicConnectors.mconnConnectorTelemetrySnapshotsGet` | `GET /accounts/{accountId}/magic/connectors/{connectorId}/telemetry/snapshots/{snapshotT}` | Get Snapshot |

## magicGreTunnels

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicGreTunnels.magicGreTunnelsListGreTunnels` | `GET /accounts/{accountId}/magic/gre_tunnels` | List GRE tunnels |
| `client.api.magicGreTunnels.magicGreTunnelsCreateGreTunnels` | `POST /accounts/{accountId}/magic/gre_tunnels` | Create a GRE tunnel |
| `client.api.magicGreTunnels.magicGreTunnelsUpdateMultipleGreTunnels` | `PUT /accounts/{accountId}/magic/gre_tunnels` | Update multiple GRE tunnels |
| `client.api.magicGreTunnels.magicGreTunnelsDeleteGreTunnel` | `DELETE /accounts/{accountId}/magic/gre_tunnels/{greTunnelId}` | Delete GRE Tunnel |
| `client.api.magicGreTunnels.magicGreTunnelsListGreTunnelDetails` | `GET /accounts/{accountId}/magic/gre_tunnels/{greTunnelId}` | List GRE Tunnel Details |
| `client.api.magicGreTunnels.magicGreTunnelsUpdateGreTunnel` | `PUT /accounts/{accountId}/magic/gre_tunnels/{greTunnelId}` | Update GRE Tunnel |

## magicIpsecTunnels

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicIpsecTunnels.magicIpsecTunnelsListIpsecTunnels` | `GET /accounts/{accountId}/magic/ipsec_tunnels` | List IPsec tunnels |
| `client.api.magicIpsecTunnels.magicIpsecTunnelsCreateIpsecTunnels` | `POST /accounts/{accountId}/magic/ipsec_tunnels` | Create an IPsec tunnel |
| `client.api.magicIpsecTunnels.magicIpsecTunnelsUpdateMultipleIpsecTunnels` | `PUT /accounts/{accountId}/magic/ipsec_tunnels` | Update multiple IPsec tunnels |
| `client.api.magicIpsecTunnels.magicIpsecTunnelsSetPreSharedKeysForIpsecTunnels` | `POST /accounts/{accountId}/magic/ipsec_tunnels/psk` | Set Pre-Shared Keys (PSK) for IPsec tunnels |
| `client.api.magicIpsecTunnels.magicIpsecTunnelsDeleteIpsecTunnel` | `DELETE /accounts/{accountId}/magic/ipsec_tunnels/{ipsecTunnelId}` | Delete IPsec Tunnel |
| `client.api.magicIpsecTunnels.magicIpsecTunnelsListIpsecTunnelDetails` | `GET /accounts/{accountId}/magic/ipsec_tunnels/{ipsecTunnelId}` | List IPsec tunnel details |
| `client.api.magicIpsecTunnels.magicIpsecTunnelsUpdateIpsecTunnel` | `PUT /accounts/{accountId}/magic/ipsec_tunnels/{ipsecTunnelId}` | Update IPsec Tunnel |
| `client.api.magicIpsecTunnels.magicIpsecTunnelsGeneratePreSharedKeyPskForIpsecTunnels` | `POST /accounts/{accountId}/magic/ipsec_tunnels/{ipsecTunnelId}/psk_generate` | Generate Pre-Shared Key (PSK) for IPsec tunnels |

## magicRedundancyGroups

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicRedundancyGroups.magicRedundancyGroupsListRedundancyGroups` | `GET /accounts/{accountId}/magic/redundancy_groups` | List Redundancy Groups |
| `client.api.magicRedundancyGroups.magicRedundancyGroupsCreateRedundancyGroup` | `POST /accounts/{accountId}/magic/redundancy_groups` | Create a Redundancy Group |
| `client.api.magicRedundancyGroups.magicRedundancyGroupsDeleteRedundancyGroup` | `DELETE /accounts/{accountId}/magic/redundancy_groups/{redundancyGroupId}` | Delete a Redundancy Group |
| `client.api.magicRedundancyGroups.magicRedundancyGroupsGetRedundancyGroup` | `GET /accounts/{accountId}/magic/redundancy_groups/{redundancyGroupId}` | Get Redundancy Group Details |
| `client.api.magicRedundancyGroups.magicRedundancyGroupsUpdateRedundancyGroup` | `PUT /accounts/{accountId}/magic/redundancy_groups/{redundancyGroupId}` | Update a Redundancy Group |

## magicStaticRoutes

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicStaticRoutes.magicStaticRoutesDeleteManyRoutes` | `DELETE /accounts/{accountId}/magic/routes` | Delete Many Routes |
| `client.api.magicStaticRoutes.magicStaticRoutesListRoutes` | `GET /accounts/{accountId}/magic/routes` | List Routes |
| `client.api.magicStaticRoutes.magicStaticRoutesCreateRoutes` | `POST /accounts/{accountId}/magic/routes` | Create a Route |
| `client.api.magicStaticRoutes.magicStaticRoutesUpdateManyRoutes` | `PUT /accounts/{accountId}/magic/routes` | Update Many Routes |
| `client.api.magicStaticRoutes.magicStaticRoutesDeleteRoute` | `DELETE /accounts/{accountId}/magic/routes/{routeId}` | Delete Route |
| `client.api.magicStaticRoutes.magicStaticRoutesRouteDetails` | `GET /accounts/{accountId}/magic/routes/{routeId}` | Route Details |
| `client.api.magicStaticRoutes.magicStaticRoutesUpdateRoute` | `PUT /accounts/{accountId}/magic/routes/{routeId}` | Update Route |

## magicSites

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicSites.magicSitesListSites` | `GET /accounts/{accountId}/magic/sites` | List Sites |
| `client.api.magicSites.magicSitesCreateSite` | `POST /accounts/{accountId}/magic/sites` | Create a new Site |
| `client.api.magicSites.magicSitesDeleteSite` | `DELETE /accounts/{accountId}/magic/sites/{siteId}` | Delete Site |
| `client.api.magicSites.magicSitesSiteDetails` | `GET /accounts/{accountId}/magic/sites/{siteId}` | Site Details |
| `client.api.magicSites.magicSitesPatchSite` | `PATCH /accounts/{accountId}/magic/sites/{siteId}` | Patch Site |
| `client.api.magicSites.magicSitesUpdateSite` | `PUT /accounts/{accountId}/magic/sites/{siteId}` | Update Site |

## magicSiteAcls

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicSiteAcls.magicSiteAclsListAcls` | `GET /accounts/{accountId}/magic/sites/{siteId}/acls` | List Site ACLs |
| `client.api.magicSiteAcls.magicSiteAclsCreateAcl` | `POST /accounts/{accountId}/magic/sites/{siteId}/acls` | Create a new Site ACL |
| `client.api.magicSiteAcls.magicSiteAclsDeleteAcl` | `DELETE /accounts/{accountId}/magic/sites/{siteId}/acls/{aclId}` | Delete Site ACL |
| `client.api.magicSiteAcls.magicSiteAclsAclDetails` | `GET /accounts/{accountId}/magic/sites/{siteId}/acls/{aclId}` | Site ACL Details |
| `client.api.magicSiteAcls.magicSiteAclsPatchAcl` | `PATCH /accounts/{accountId}/magic/sites/{siteId}/acls/{aclId}` | Patch Site ACL |
| `client.api.magicSiteAcls.magicSiteAclsUpdateAcl` | `PUT /accounts/{accountId}/magic/sites/{siteId}/acls/{aclId}` | Update Site ACL |

## magicSiteAppConfigs

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicSiteAppConfigs.magicSiteAppConfigsListAppConfigs` | `GET /accounts/{accountId}/magic/sites/{siteId}/app_configs` | List App Configs |
| `client.api.magicSiteAppConfigs.magicSiteAppConfigsAddAppConfig` | `POST /accounts/{accountId}/magic/sites/{siteId}/app_configs` | Create a new App Config |
| `client.api.magicSiteAppConfigs.magicSiteAppConfigsDeleteAppConfig` | `DELETE /accounts/{accountId}/magic/sites/{siteId}/app_configs/{appConfigId}` | Delete App Config |
| `client.api.magicSiteAppConfigs.magicSiteAppConfigsPatchAppConfig` | `PATCH /accounts/{accountId}/magic/sites/{siteId}/app_configs/{appConfigId}` | Update an App Config |
| `client.api.magicSiteAppConfigs.magicSiteAppConfigsUpdateAppConfig` | `PUT /accounts/{accountId}/magic/sites/{siteId}/app_configs/{appConfigId}` | Update an App Config |

## magicSiteLans

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicSiteLans.magicSiteLansListLans` | `GET /accounts/{accountId}/magic/sites/{siteId}/lans` | List Site LANs |
| `client.api.magicSiteLans.magicSiteLansCreateLan` | `POST /accounts/{accountId}/magic/sites/{siteId}/lans` | Create a new Site LAN |
| `client.api.magicSiteLans.magicSiteLansDeleteLan` | `DELETE /accounts/{accountId}/magic/sites/{siteId}/lans/{lanId}` | Delete Site LAN |
| `client.api.magicSiteLans.magicSiteLansLanDetails` | `GET /accounts/{accountId}/magic/sites/{siteId}/lans/{lanId}` | Site LAN Details |
| `client.api.magicSiteLans.magicSiteLansPatchLan` | `PATCH /accounts/{accountId}/magic/sites/{siteId}/lans/{lanId}` | Patch Site LAN |
| `client.api.magicSiteLans.magicSiteLansUpdateLan` | `PUT /accounts/{accountId}/magic/sites/{siteId}/lans/{lanId}` | Update Site LAN |

## magicSiteNetflowConfig

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicSiteNetflowConfig.magicSiteNetflowConfigDeleteNetflowConfig` | `DELETE /accounts/{accountId}/magic/sites/{siteId}/netflow_config` | Delete NetFlow Configuration |
| `client.api.magicSiteNetflowConfig.magicSiteNetflowConfigDetails` | `GET /accounts/{accountId}/magic/sites/{siteId}/netflow_config` | NetFlow Configuration Details |
| `client.api.magicSiteNetflowConfig.magicSiteNetflowConfigPatchNetflowConfig` | `PATCH /accounts/{accountId}/magic/sites/{siteId}/netflow_config` | Update NetFlow Configuration |
| `client.api.magicSiteNetflowConfig.magicSiteNetflowConfigCreateNetflowConfig` | `POST /accounts/{accountId}/magic/sites/{siteId}/netflow_config` | Create NetFlow Configuration |
| `client.api.magicSiteNetflowConfig.magicSiteNetflowConfigUpdateNetflowConfig` | `PUT /accounts/{accountId}/magic/sites/{siteId}/netflow_config` | Update NetFlow Configuration |

## magicSiteWans

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicSiteWans.magicSiteWansListWans` | `GET /accounts/{accountId}/magic/sites/{siteId}/wans` | List Site WANs |
| `client.api.magicSiteWans.magicSiteWansCreateWan` | `POST /accounts/{accountId}/magic/sites/{siteId}/wans` | Create a new Site WAN |
| `client.api.magicSiteWans.magicSiteWansDeleteWan` | `DELETE /accounts/{accountId}/magic/sites/{siteId}/wans/{wanId}` | Delete Site WAN |
| `client.api.magicSiteWans.magicSiteWansWanDetails` | `GET /accounts/{accountId}/magic/sites/{siteId}/wans/{wanId}` | Site WAN Details |
| `client.api.magicSiteWans.magicSiteWansPatchWan` | `PATCH /accounts/{accountId}/magic/sites/{siteId}/wans/{wanId}` | Patch Site WAN |
| `client.api.magicSiteWans.magicSiteWansUpdateWan` | `PUT /accounts/{accountId}/magic/sites/{siteId}/wans/{wanId}` | Update Site WAN |

## vulnerabilityDiscovery

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.vulnerabilityDiscovery.listAccountVulnerabilityDiscoveryRepositories` | `GET /accounts/{accountId}/managed-defense/vulnerability-discovery/repos` | List repositories |
| `client.api.vulnerabilityDiscovery.createAccountVulnerabilityDiscoveryRepository` | `POST /accounts/{accountId}/managed-defense/vulnerability-discovery/repos` | Create repository |
| `client.api.vulnerabilityDiscovery.getAccountVulnerabilityDiscoveryRepository` | `GET /accounts/{accountId}/managed-defense/vulnerability-discovery/repos/{repoId}` | Get repository |
| `client.api.vulnerabilityDiscovery.getAccountRepositoryVulnerabilityDiscoveryReport` | `GET /accounts/{accountId}/managed-defense/vulnerability-discovery/repos/{repoId}/scans/{scanId}/report` | Get reviewed vulnerability report |
| `client.api.vulnerabilityDiscovery.createAccountVulnerabilityDiscoveryRepositoryToken` | `POST /accounts/{accountId}/managed-defense/vulnerability-discovery/repos/{repoId}/token` | Create upload token |
| `client.api.vulnerabilityDiscovery.listAccountVulnerabilityDiscoveryScans` | `GET /accounts/{accountId}/managed-defense/vulnerability-discovery/scans` | List scans |
| `client.api.vulnerabilityDiscovery.createAccountVulnerabilityDiscoveryScan` | `POST /accounts/{accountId}/managed-defense/vulnerability-discovery/scans` | Create scan |
| `client.api.vulnerabilityDiscovery.getAccountVulnerabilityDiscoveryScan` | `GET /accounts/{accountId}/managed-defense/vulnerability-discovery/scans/{scanId}` | Get scan |
| `client.api.vulnerabilityDiscovery.getAccountVulnerabilityDiscoveryConsolidatedReport` | `GET /accounts/{accountId}/managed-defense/vulnerability-discovery/scans/{scanId}/report` | Get reviewed vulnerability report |

## accountMembers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountMembers.accountMembersListMembers` | `GET /accounts/{accountId}/members` | List Members |
| `client.api.accountMembers.accountMembersAddMember` | `POST /accounts/{accountId}/members` | Add Member |
| `client.api.accountMembers.accountMembersRemoveMember` | `DELETE /accounts/{accountId}/members/{memberId}` | Remove Member |
| `client.api.accountMembers.accountMembersMemberDetails` | `GET /accounts/{accountId}/members/{memberId}` | Member Details |
| `client.api.accountMembers.accountMembersUpdateMember` | `PUT /accounts/{accountId}/members/{memberId}` | Update Member |

## magicNetworkMonitoringConfiguration

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicNetworkMonitoringConfiguration.magicNetworkMonitoringConfigurationDeleteAccountConfiguration` | `DELETE /accounts/{accountId}/mnm/config` | Delete account configuration |
| `client.api.magicNetworkMonitoringConfiguration.magicNetworkMonitoringConfigurationListAccountConfiguration` | `GET /accounts/{accountId}/mnm/config` | List account configuration |
| `client.api.magicNetworkMonitoringConfiguration.magicNetworkMonitoringConfigurationUpdateAccountConfigurationFields` | `PATCH /accounts/{accountId}/mnm/config` | Update account configuration fields |
| `client.api.magicNetworkMonitoringConfiguration.magicNetworkMonitoringConfigurationCreateAccountConfiguration` | `POST /accounts/{accountId}/mnm/config` | Create account configuration |
| `client.api.magicNetworkMonitoringConfiguration.magicNetworkMonitoringConfigurationUpdateAnEntireAccountConfiguration` | `PUT /accounts/{accountId}/mnm/config` | Update an entire account configuration |
| `client.api.magicNetworkMonitoringConfiguration.magicNetworkMonitoringConfigurationListRulesAndAccountConfiguration` | `GET /accounts/{accountId}/mnm/config/full` | List rules and account configuration |

## magicNetworkMonitoringRules

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicNetworkMonitoringRules.magicNetworkMonitoringRulesListRules` | `GET /accounts/{accountId}/mnm/rules` | List rules |
| `client.api.magicNetworkMonitoringRules.magicNetworkMonitoringRulesCreateRules` | `POST /accounts/{accountId}/mnm/rules` | Create rules |
| `client.api.magicNetworkMonitoringRules.magicNetworkMonitoringRulesUpdateRules` | `PUT /accounts/{accountId}/mnm/rules` | Update rules |
| `client.api.magicNetworkMonitoringRules.magicNetworkMonitoringRulesCreateRulesBulk` | `POST /accounts/{accountId}/mnm/rules/bulk` | Create rules in bulk |
| `client.api.magicNetworkMonitoringRules.magicNetworkMonitoringRulesUpdateRulesBulk` | `PUT /accounts/{accountId}/mnm/rules/bulk` | Update rules in bulk |
| `client.api.magicNetworkMonitoringRules.magicNetworkMonitoringRulesDeleteRule` | `DELETE /accounts/{accountId}/mnm/rules/{ruleId}` | Delete rule |
| `client.api.magicNetworkMonitoringRules.magicNetworkMonitoringRulesGetRule` | `GET /accounts/{accountId}/mnm/rules/{ruleId}` | Get rule |
| `client.api.magicNetworkMonitoringRules.magicNetworkMonitoringRulesUpdateRule` | `PATCH /accounts/{accountId}/mnm/rules/{ruleId}` | Update rule |
| `client.api.magicNetworkMonitoringRules.magicNetworkMonitoringRulesUpdateAdvertisementForRule` | `PATCH /accounts/{accountId}/mnm/rules/{ruleId}/advertisement` | Update advertisement for rule |

## magicNetworkMonitoringVpcFlowLogs

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicNetworkMonitoringVpcFlowLogs.magicNetworkMonitoringVpcFlowsGenerateAuthenticationToken` | `POST /accounts/{accountId}/mnm/vpc-flows/token` | Generate authentication token for VPC flow logs export. |

## monetization

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.monetization.monetizationGetAccountEligibility` | `GET /accounts/{accountId}/monetization` | Get account monetization eligibility |
| `client.api.monetization.monetizationCheckAccountEligibility` | `POST /accounts/{accountId}/monetization` | Check account monetization eligibility |
| `client.api.monetization.monetizationGetZoneEligibility` | `GET /zones/{zoneId}/monetization` | Get zone monetization eligibility |
| `client.api.monetization.monetizationCheckZoneEligibility` | `POST /zones/{zoneId}/monetization` | Check zone monetization eligibility |
| `client.api.monetization.monetizationDeleteRuleset` | `DELETE /zones/{zoneId}/monetization/rules` | Delete all payment rules |
| `client.api.monetization.monetizationListRules` | `GET /zones/{zoneId}/monetization/rules` | List payment rules |
| `client.api.monetization.monetizationDeployRuleset` | `PUT /zones/{zoneId}/monetization/rules` | Deploy payment ruleset |
| `client.api.monetization.monetizationDeleteRule` | `DELETE /zones/{zoneId}/monetization/rules/{ruleId}` | Delete a payment rule |
| `client.api.monetization.monetizationGetRule` | `GET /zones/{zoneId}/monetization/rules/{ruleId}` | Get a payment rule |
| `client.api.monetization.monetizationPatchRule` | `PATCH /zones/{zoneId}/monetization/rules/{ruleId}` | Update a payment rule |

## moqRelays

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.moqRelays.moqRelaysList` | `GET /accounts/{accountId}/moq/relays` | List relays |
| `client.api.moqRelays.moqRelaysCreate` | `POST /accounts/{accountId}/moq/relays` | Create a relay |
| `client.api.moqRelays.moqRelaysDelete` | `DELETE /accounts/{accountId}/moq/relays/{relayId}` | Delete a relay |
| `client.api.moqRelays.moqRelaysGet` | `GET /accounts/{accountId}/moq/relays/{relayId}` | Get a relay |
| `client.api.moqRelays.moqRelaysUpdate` | `PUT /accounts/{accountId}/moq/relays/{relayId}` | Update a relay |
| `client.api.moqRelays.moqRelaysTokensList` | `GET /accounts/{accountId}/moq/relays/{relayId}/tokens` | List tokens |
| `client.api.moqRelays.moqRelaysTokensCreate` | `POST /accounts/{accountId}/moq/relays/{relayId}/tokens` | Create a token |
| `client.api.moqRelays.moqRelaysTokensDelete` | `DELETE /accounts/{accountId}/moq/relays/{relayId}/tokens/{jti}` | Revoke a token |

## mtlsCertificateManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.mtlsCertificateManagement.mTlsCertificateManagementListMTlsCertificates` | `GET /accounts/{accountId}/mtls_certificates` | List mTLS certificates |
| `client.api.mtlsCertificateManagement.mTlsCertificateManagementUploadMTlsCertificate` | `POST /accounts/{accountId}/mtls_certificates` | Upload mTLS certificate |
| `client.api.mtlsCertificateManagement.mTlsCertificateManagementDeleteMTlsCertificate` | `DELETE /accounts/{accountId}/mtls_certificates/{mtlsCertificateId}` | Delete mTLS certificate |
| `client.api.mtlsCertificateManagement.mTlsCertificateManagementGetMTlsCertificate` | `GET /accounts/{accountId}/mtls_certificates/{mtlsCertificateId}` | Get mTLS certificate |
| `client.api.mtlsCertificateManagement.mTlsCertificateManagementListMTlsCertificateAssociations` | `GET /accounts/{accountId}/mtls_certificates/{mtlsCertificateId}/associations` | List mTLS certificate associations |

## observability

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.observability.observabilityUsageLimitGet` | `GET /accounts/{accountId}/observability/usage/limit` | Get usage limit status |
| `client.api.observability.zoneObservabilityTracingRulesDelete` | `DELETE /zones/{zoneId}/observability/tracing/rules` | Delete zone trace rules |
| `client.api.observability.zoneObservabilityTracingRulesGet` | `GET /zones/{zoneId}/observability/tracing/rules` | View zone trace rules |
| `client.api.observability.zoneObservabilityTracingRulesUpdate` | `PUT /zones/{zoneId}/observability/tracing/rules` | Replace zone trace rules |
| `client.api.observability.zoneObservabilityTracingSettingsDelete` | `DELETE /zones/{zoneId}/observability/tracing/settings` | Reset zone tracing settings |
| `client.api.observability.zoneObservabilityTracingSettingsGet` | `GET /zones/{zoneId}/observability/tracing/settings` | View zone tracing settings |
| `client.api.observability.zoneObservabilityTracingSettingsUpdate` | `PATCH /zones/{zoneId}/observability/tracing/settings` | Update zone tracing settings |

## integrations

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.integrations.listIntegrationsV2` | `GET /accounts/{accountId}/one/integrations` | List integrations |
| `client.api.integrations.createIntegrationV2` | `POST /accounts/{accountId}/one/integrations` | Create integration |
| `client.api.integrations.deleteIntegrationV2` | `DELETE /accounts/{accountId}/one/integrations/{id}` | Delete integration |
| `client.api.integrations.getIntegrationV2` | `GET /accounts/{accountId}/one/integrations/{id}` | Get integration details |
| `client.api.integrations.updateIntegrationV2` | `PATCH /accounts/{accountId}/one/integrations/{id}` | Update integration |
| `client.api.integrations.pauseIntegrationV2` | `POST /accounts/{accountId}/one/integrations/{id}/pause` | Pause integration |
| `client.api.integrations.resumeIntegrationV2` | `POST /accounts/{accountId}/one/integrations/{id}/resume` | Resume integration |

## pagesProject

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.pagesProject.pagesProjectGetProjects` | `GET /accounts/{accountId}/pages/projects` | List Cloudflare Pages projects |
| `client.api.pagesProject.pagesProjectCreateProject` | `POST /accounts/{accountId}/pages/projects` | Create a Cloudflare Pages project |
| `client.api.pagesProject.pagesProjectDeleteProject` | `DELETE /accounts/{accountId}/pages/projects/{projectName}` | Delete a Cloudflare Pages project |
| `client.api.pagesProject.pagesProjectGetProject` | `GET /accounts/{accountId}/pages/projects/{projectName}` | Get a Cloudflare Pages project |
| `client.api.pagesProject.pagesProjectUpdateProject` | `PATCH /accounts/{accountId}/pages/projects/{projectName}` | Update a Cloudflare Pages project |
| `client.api.pagesProject.pagesProjectDisconnectProjectSource` | `DELETE /accounts/{accountId}/pages/projects/{projectName}/source` | Disconnect a Git repository |
| `client.api.pagesProject.pagesProjectConnectProjectSource` | `POST /accounts/{accountId}/pages/projects/{projectName}/source` | Connect a Git repository |
| `client.api.pagesProject.pagesProjectGetUploadToken` | `GET /accounts/{accountId}/pages/projects/{projectName}/upload-token` | Get upload token |

## pagesDeployment

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.pagesDeployment.pagesDeploymentGetDeployments` | `GET /accounts/{accountId}/pages/projects/{projectName}/deployments` | List Pages deployments |
| `client.api.pagesDeployment.pagesDeploymentCreateDeployment` | `POST /accounts/{accountId}/pages/projects/{projectName}/deployments` | Create a Pages deployment |
| `client.api.pagesDeployment.pagesDeploymentDeleteDeployment` | `DELETE /accounts/{accountId}/pages/projects/{projectName}/deployments/{deploymentId}` | Delete a Pages deployment |
| `client.api.pagesDeployment.pagesDeploymentGetDeploymentInfo` | `GET /accounts/{accountId}/pages/projects/{projectName}/deployments/{deploymentId}` | Get a Pages deployment |
| `client.api.pagesDeployment.pagesDeploymentGetDeploymentLogs` | `GET /accounts/{accountId}/pages/projects/{projectName}/deployments/{deploymentId}/history/logs` | Get Pages deployment logs |
| `client.api.pagesDeployment.pagesDeploymentRetryDeployment` | `POST /accounts/{accountId}/pages/projects/{projectName}/deployments/{deploymentId}/retry` | Retry a Pages deployment |
| `client.api.pagesDeployment.pagesDeploymentRollbackDeployment` | `POST /accounts/{accountId}/pages/projects/{projectName}/deployments/{deploymentId}/rollback` | Roll back a Pages deployment |
| `client.api.pagesDeployment.pagesDeploymentCreateTail` | `POST /accounts/{accountId}/pages/projects/{projectName}/deployments/{deploymentId}/tails` | Create deployment tail |
| `client.api.pagesDeployment.pagesDeploymentDeleteTail` | `DELETE /accounts/{accountId}/pages/projects/{projectName}/deployments/{deploymentId}/tails/{tailId}` | Delete deployment tail |

## pagesDomains

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.pagesDomains.pagesDomainsGetDomains` | `GET /accounts/{accountId}/pages/projects/{projectName}/domains` | List Pages custom domains |
| `client.api.pagesDomains.pagesDomainsAddDomain` | `POST /accounts/{accountId}/pages/projects/{projectName}/domains` | Add a Pages custom domain |
| `client.api.pagesDomains.pagesDomainsDeleteDomain` | `DELETE /accounts/{accountId}/pages/projects/{projectName}/domains/{domainName}` | Delete a Pages custom domain |
| `client.api.pagesDomains.pagesDomainsGetDomain` | `GET /accounts/{accountId}/pages/projects/{projectName}/domains/{domainName}` | Get a Pages custom domain |
| `client.api.pagesDomains.pagesDomainsPatchDomain` | `PATCH /accounts/{accountId}/pages/projects/{projectName}/domains/{domainName}` | Retry custom domain validation |

## pagesBuildCache

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.pagesBuildCache.pagesPurgeBuildCache` | `POST /accounts/{accountId}/pages/projects/{projectName}/purge_build_cache` | Purge the Pages build cache |

## ppcStripe

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ppcStripe.payPerCrawlCrawlerDeleteStripeConfig` | `DELETE /accounts/{accountId}/pay-per-crawl/crawler/stripe` | Deletes the stripe config for a crawler |
| `client.api.ppcStripe.payPerCrawlCrawlerGetStripeConfig` | `GET /accounts/{accountId}/pay-per-crawl/crawler/stripe` | Gets the stripe config for a crawler |
| `client.api.ppcStripe.payPerCrawlCrawlerCreateStripeConfig` | `POST /accounts/{accountId}/pay-per-crawl/crawler/stripe` | Creates the stripe config for a crawler |
| `client.api.ppcStripe.payPerCrawlPublisherDeleteStripeConfig` | `DELETE /accounts/{accountId}/pay-per-crawl/publisher/stripe` | Deletes the stripe config for a publisher |
| `client.api.ppcStripe.payPerCrawlPublisherGetStripeConfig` | `GET /accounts/{accountId}/pay-per-crawl/publisher/stripe` | Gets the stripe config for a publisher |
| `client.api.ppcStripe.payPerCrawlPublisherCreateStripeConfig` | `POST /accounts/{accountId}/pay-per-crawl/publisher/stripe` | Creates the stripe config for a publisher |

## ppcCrawlers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ppcCrawlers.payPerCrawlListCrawlers` | `GET /accounts/{accountId}/pay-per-crawl/crawlers` | List pay-per-crawl crawlers |

## ppcTerms

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ppcTerms.payPerCrawlGetTermsSignatureLink` | `GET /accounts/{accountId}/pay-per-crawl/signature_link` | Get signed pay-per-crawl terms link |
| `client.api.ppcTerms.payPerCrawlGetTerms` | `GET /accounts/{accountId}/pay-per-crawl/terms` | Get pay-per-crawl terms |
| `client.api.ppcTerms.payPerCrawlGetTermsSignature` | `GET /accounts/{accountId}/pay-per-crawl/terms/signature` | Get pay-per-crawl terms signature status |
| `client.api.ppcTerms.payPerCrawlSendTermsSignatureEvent` | `POST /accounts/{accountId}/pay-per-crawl/terms/signature` | Record pay-per-crawl terms activity |

## ppcConfig

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ppcConfig.payPerCrawlSetZonesCanBeEnabled` | `PATCH /accounts/{accountId}/pay-per-crawl/zones_can_be_enabled` | Set can_be_enabled setting on zones |
| `client.api.ppcConfig.payPerCrawlQueryZonesCanBeEnabled` | `POST /accounts/{accountId}/pay-per-crawl/zones_can_be_enabled/query` | Gets the can_be_enabled zone setting |
| `client.api.ppcConfig.payPerCrawlGetZoneCanBeEnabled` | `GET /zones/{zoneId}/pay-per-crawl/can_be_enabled` | Get pay-per-crawl zone eligibility |
| `client.api.ppcConfig.payPerCrawlGetConfig` | `GET /zones/{zoneId}/pay-per-crawl/configuration` | Get the pay-per-crawl config |
| `client.api.ppcConfig.payPerCrawlPatchConfig` | `PATCH /zones/{zoneId}/pay-per-crawl/configuration` | Changes pay-per-crawl config for a zone |
| `client.api.ppcConfig.payPerCrawlCreateConfig` | `POST /zones/{zoneId}/pay-per-crawl/configuration` | Creates pay-per-crawl config for a zone |

## ppuEnabledDomains

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ppuEnabledDomains.payPerUseListEnabledDomains` | `GET /accounts/{accountId}/pay-per-use/enabled-domains` | List enabled Pay Per Use domains |

## ppuConfiguration

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ppuConfiguration.payPerCrawlGetPPUOperatorConfiguration` | `GET /accounts/{accountId}/pay-per-use/operator/configuration` | Get pay-per-use operator configuration |
| `client.api.ppuConfiguration.payPerCrawlPatchPPUOperatorConfiguration` | `PATCH /accounts/{accountId}/pay-per-use/operator/configuration` | Update pay-per-use operator configuration |
| `client.api.ppuConfiguration.payPerCrawlPutPPUOperatorConfiguration` | `PUT /accounts/{accountId}/pay-per-use/operator/configuration` | Set pay-per-use operator configuration |
| `client.api.ppuConfiguration.payPerCrawlSetPPUZonesCanBeEnabled` | `PATCH /accounts/{accountId}/pay-per-use/zones_can_be_enabled` | Set pay-per-use zone eligibility |
| `client.api.ppuConfiguration.payPerCrawlGetPPUZoneCanBeEnabled` | `GET /zones/{zoneId}/pay-per-use/can_be_enabled` | Get pay-per-use zone eligibility |
| `client.api.ppuConfiguration.payPerCrawlGetPPUZoneConfiguration` | `GET /zones/{zoneId}/pay-per-use/configuration` | Get pay-per-use zone configuration |
| `client.api.ppuConfiguration.payPerCrawlPatchPPUZoneConfiguration` | `PATCH /zones/{zoneId}/pay-per-use/configuration` | Update pay-per-use zone configuration |

## ppuPricing

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ppuPricing.payPerCrawlListPPUProposals` | `GET /accounts/{accountId}/pay-per-use/proposals` | List pay-per-use price proposals |
| `client.api.ppuPricing.payPerCrawlPostPPUProposalDecision` | `POST /accounts/{accountId}/pay-per-use/proposals` | Decide a pay-per-use price proposal |
| `client.api.ppuPricing.payPerCrawlListPPUOperators` | `GET /zones/{zoneId}/pay-per-use/operators` | List pay-per-use operators |
| `client.api.ppuPricing.payPerCrawlDeletePPUPublisherPrice` | `DELETE /zones/{zoneId}/pay-per-use/operators/{operatorId}/price` | Opt out of a pay-per-use operator price |
| `client.api.ppuPricing.payPerCrawlPostPPUPublisherPriceAction` | `POST /zones/{zoneId}/pay-per-use/operators/{operatorId}/price` | Set a pay-per-use operator price |

## ppuUsageReports

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ppuUsageReports.payPerUseSubmitUsageReport` | `POST /accounts/{accountId}/pay-per-use/usage-reports` | Submit a participant usage report |

## ppuUsageStats

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ppuUsageStats.payPerCrawlGetPPUUsageStats` | `GET /accounts/{accountId}/pay-per-use/usage-stats` | Get pay-per-use usage statistics |
| `client.api.ppuUsageStats.payPerCrawlGetPPUZoneUsageStats` | `GET /zones/{zoneId}/pay-per-use/usage-stats` | Get pay-per-use usage statistics for a zone |

## accountPaymentMethods

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountPaymentMethods.accountBillingListPaymentMethods` | `GET /accounts/{accountId}/payment-methods` | List Payment Methods |
| `client.api.accountPaymentMethods.accountBillingCreatePaymentMethod` | `POST /accounts/{accountId}/payment-methods` | Create Payment Method |
| `client.api.accountPaymentMethods.accountBillingDeletePaymentMethod` | `DELETE /accounts/{accountId}/payment-methods/{paymentMethodId}` | Delete Payment Method |
| `client.api.accountPaymentMethods.accountBillingGetPaymentMethod` | `GET /accounts/{accountId}/payment-methods/{paymentMethodId}` | Get Payment Method |
| `client.api.accountPaymentMethods.accountBillingUpdatePaymentMethod` | `PUT /accounts/{accountId}/payment-methods/{paymentMethodId}` | Update Payment Method |
| `client.api.accountPaymentMethods.accountBillingSetDefaultPaymentMethod` | `POST /accounts/{accountId}/payment-methods/{paymentMethodId}/set-as-default` | Set Default Payment Method |

## magicPcapCollection

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.magicPcapCollection.magicPcapCollectionListPacketCaptureRequests` | `GET /accounts/{accountId}/pcaps` | List packet capture requests |
| `client.api.magicPcapCollection.magicPcapCollectionCreatePcapRequest` | `POST /accounts/{accountId}/pcaps` | Create PCAP request |
| `client.api.magicPcapCollection.magicPcapCollectionListPcaPsBucketOwnership` | `GET /accounts/{accountId}/pcaps/ownership` | List PCAPs Bucket Ownership |
| `client.api.magicPcapCollection.magicPcapCollectionAddBucketsForFullPacketCaptures` | `POST /accounts/{accountId}/pcaps/ownership` | Add buckets for full packet captures |
| `client.api.magicPcapCollection.magicPcapCollectionValidateBucketsForFullPacketCaptures` | `POST /accounts/{accountId}/pcaps/ownership/validate` | Validate buckets for full packet captures |
| `client.api.magicPcapCollection.magicPcapCollectionDeleteBucketsForFullPacketCaptures` | `DELETE /accounts/{accountId}/pcaps/ownership/{ownershipId}` | Delete buckets for full packet captures |
| `client.api.magicPcapCollection.magicPcapCollectionGetPcapRequest` | `GET /accounts/{accountId}/pcaps/{pcapId}` | Get PCAP request |
| `client.api.magicPcapCollection.magicPcapCollectionDownloadSimplePcap` | `GET /accounts/{accountId}/pcaps/{pcapId}/download` | Download Simple PCAP |
| `client.api.magicPcapCollection.magicPcapCollectionStopFullPcap` | `PUT /accounts/{accountId}/pcaps/{pcapId}/stop` | Stop full PCAP |

## workersPipelinesOther

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workersPipelinesOther.getV4AccountsByAccountIdPipelinesDeprecated` | `GET /accounts/{accountId}/pipelines` | [DEPRECATED] List Pipelines |
| `client.api.workersPipelinesOther.postV4AccountsByAccountIdPipelinesDeprecated` | `POST /accounts/{accountId}/pipelines` | [DEPRECATED] Create Pipeline |
| `client.api.workersPipelinesOther.getV4AccountsByAccountIdPipelinesV1Pipelines` | `GET /accounts/{accountId}/pipelines/v1/pipelines` | List Pipelines |
| `client.api.workersPipelinesOther.postV4AccountsByAccountIdPipelinesV1Pipelines` | `POST /accounts/{accountId}/pipelines/v1/pipelines` | Create Pipeline |
| `client.api.workersPipelinesOther.deleteV4AccountsByAccountIdPipelinesV1PipelinesByPipelineId` | `DELETE /accounts/{accountId}/pipelines/v1/pipelines/{pipelineId}` | Delete Pipeline |
| `client.api.workersPipelinesOther.getV4AccountsByAccountIdPipelinesV1PipelinesByPipelineId` | `GET /accounts/{accountId}/pipelines/v1/pipelines/{pipelineId}` | Get Pipeline Details |
| `client.api.workersPipelinesOther.getV4AccountsByAccountIdPipelinesV1Sinks` | `GET /accounts/{accountId}/pipelines/v1/sinks` | List Sinks |
| `client.api.workersPipelinesOther.postV4AccountsByAccountIdPipelinesV1Sinks` | `POST /accounts/{accountId}/pipelines/v1/sinks` | Create Sink |
| `client.api.workersPipelinesOther.deleteV4AccountsByAccountIdPipelinesV1SinksBySinkId` | `DELETE /accounts/{accountId}/pipelines/v1/sinks/{sinkId}` | Delete Sink |
| `client.api.workersPipelinesOther.getV4AccountsByAccountIdPipelinesV1SinksBySinkId` | `GET /accounts/{accountId}/pipelines/v1/sinks/{sinkId}` | Get Sink Details |
| `client.api.workersPipelinesOther.getV4AccountsByAccountIdPipelinesV1Streams` | `GET /accounts/{accountId}/pipelines/v1/streams` | List Streams |
| `client.api.workersPipelinesOther.postV4AccountsByAccountIdPipelinesV1Streams` | `POST /accounts/{accountId}/pipelines/v1/streams` | Create Stream |
| `client.api.workersPipelinesOther.deleteV4AccountsByAccountIdPipelinesV1StreamsByStreamId` | `DELETE /accounts/{accountId}/pipelines/v1/streams/{streamId}` | Delete Stream |
| `client.api.workersPipelinesOther.getV4AccountsByAccountIdPipelinesV1StreamsByStreamId` | `GET /accounts/{accountId}/pipelines/v1/streams/{streamId}` | Get Stream Details |
| `client.api.workersPipelinesOther.patchV4AccountsByAccountIdPipelinesV1StreamsByStreamId` | `PATCH /accounts/{accountId}/pipelines/v1/streams/{streamId}` | Update Stream |
| `client.api.workersPipelinesOther.postV4AccountsByAccountIdPipelinesV1ValidateSql` | `POST /accounts/{accountId}/pipelines/v1/validate_sql` | Validate SQL |
| `client.api.workersPipelinesOther.deleteV4AccountsByAccountIdPipelinesByPipelineNameDeprecated` | `DELETE /accounts/{accountId}/pipelines/{pipelineName}` | [DEPRECATED] Delete Pipeline |
| `client.api.workersPipelinesOther.getV4AccountsByAccountIdPipelinesByPipelineNameDeprecated` | `GET /accounts/{accountId}/pipelines/{pipelineName}` | [DEPRECATED] Get Pipeline |
| `client.api.workersPipelinesOther.putV4AccountsByAccountIdPipelinesByPipelineNameDeprecated` | `PUT /accounts/{accountId}/pipelines/{pipelineName}` | [DEPRECATED] Update Pipeline |

## r2CatalogManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.r2CatalogManagement.listCatalogs` | `GET /accounts/{accountId}/r2-catalog` | List R2 catalogs |
| `client.api.r2CatalogManagement.getCatalogDetails` | `GET /accounts/{accountId}/r2-catalog/{bucketName}` | Get R2 catalog details |
| `client.api.r2CatalogManagement.deleteCatalog` | `POST /accounts/{accountId}/r2-catalog/{bucketName}/delete` | Delete R2 catalog metadata |
| `client.api.r2CatalogManagement.disableCatalog` | `POST /accounts/{accountId}/r2-catalog/{bucketName}/disable` | Disable R2 catalog |
| `client.api.r2CatalogManagement.enableCatalog` | `POST /accounts/{accountId}/r2-catalog/{bucketName}/enable` | Enable R2 bucket as a catalog |

## r2Object

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.r2Object.r2DeleteObjects` | `DELETE /accounts/{accountId}/r2/buckets/{bucketName}/objects` | Delete Objects |
| `client.api.r2Object.r2ListObjects` | `GET /accounts/{accountId}/r2/buckets/{bucketName}/objects` | List Objects |
| `client.api.r2Object.r2DeleteObject` | `DELETE /accounts/{accountId}/r2/buckets/{bucketName}/objects/{objectKey}` | Delete Object |
| `client.api.r2Object.r2GetObject` | `GET /accounts/{accountId}/r2/buckets/{bucketName}/objects/{objectKey}` | Get Object |
| `client.api.r2Object.r2PutObject` | `PUT /accounts/{accountId}/r2/buckets/{bucketName}/objects/{objectKey}` | Upload Object |

## r2Account

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.r2Account.r2GetAccountLevelMetrics` | `GET /accounts/{accountId}/r2/metrics` | Get Account-Level Metrics |

## analytics

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.analytics.getOrgAnalytics` | `GET /accounts/{accountId}/realtime/kit/{appId}/analytics/daywise` | Fetch day-wise session and recording analytics data for an App |

## liveStreams

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.liveStreams.getLivestreamAnalyticsDaywise` | `GET /accounts/{accountId}/realtime/kit/{appId}/analytics/livestreams/daywise` | Fetch day-wise analytics data for your livestreams |
| `client.api.liveStreams.getLivestreamAnalyticsComplete` | `GET /accounts/{accountId}/realtime/kit/{appId}/analytics/livestreams/overall` | Fetch complete analytics data for your livestreams |
| `client.api.liveStreams.fetchAllLivestreams` | `GET /accounts/{accountId}/realtime/kit/{appId}/livestreams` | Fetch all livestreams |
| `client.api.liveStreams.getV2LivestreamsLivestreamSessionId` | `GET /accounts/{accountId}/realtime/kit/{appId}/livestreams/sessions/{livestreamSessionId}` | Fetch livestream session details using livestream session ID |
| `client.api.liveStreams.getV2LivestreamSessionLivestreamId` | `GET /accounts/{accountId}/realtime/kit/{appId}/livestreams/{livestreamId}` | Fetch livestream details using livestream ID |
| `client.api.liveStreams.getV2ActiveLivestreamSessionDetails` | `GET /accounts/{accountId}/realtime/kit/{appId}/livestreams/{livestreamId}/active-livestream-session` | Fetch active livestream session details |
| `client.api.liveStreams.getV2MeetingsMeetingIdActiveLivestream` | `GET /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}/active-livestream` | Fetch active livestreams for a meeting |
| `client.api.liveStreams.stopLivestreaming` | `POST /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}/active-livestream/stop` | Stop livestreaming a meeting |
| `client.api.liveStreams.livestreamSessionDetails` | `GET /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}/livestream` | Fetch livestream session details for a meeting |
| `client.api.liveStreams.startLivestreaming` | `POST /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}/livestreams` | Start livestreaming a meeting |
| `client.api.liveStreams.getV2LivestreamsessionSessionMeetingIdActiveLivestream` | `GET /accounts/{accountId}/realtime/kit/{appId}/sessions/{sessionId}/livestream-sessions` | Fetch livestream session details using a session ID |

## livestreamanalytics

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.livestreamanalytics.getLivestreamAnalyticsDaywise` | `GET /accounts/{accountId}/realtime/kit/{appId}/analytics/livestreams/daywise` | Fetch day-wise analytics data for your livestreams |
| `client.api.livestreamanalytics.getLivestreamAnalyticsComplete` | `GET /accounts/{accountId}/realtime/kit/{appId}/analytics/livestreams/overall` | Fetch complete analytics data for your livestreams |

## meetings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.meetings.getAllMeetings` | `GET /accounts/{accountId}/realtime/kit/{appId}/meetings` | Fetch all meetings for an App |
| `client.api.meetings.createMeeting` | `POST /accounts/{accountId}/realtime/kit/{appId}/meetings` | Create a meeting |
| `client.api.meetings.getMeeting` | `GET /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}` | Fetch a meeting for an App |
| `client.api.meetings.updateMeeting` | `PATCH /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}` | Update a meeting |
| `client.api.meetings.replaceMeeting` | `PUT /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}` | Replace a meeting |
| `client.api.meetings.getMeetingParticipants` | `GET /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}/participants` | Fetch all participants of a meeting |
| `client.api.meetings.addParticipant` | `POST /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}/participants` | Add a participant |
| `client.api.meetings.deleteMeetingParticipant` | `DELETE /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}/participants/{participantId}` | Delete a participant |
| `client.api.meetings.getMeetingParticipant` | `GET /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}/participants/{participantId}` | Fetch a participant's detail |
| `client.api.meetings.editParticipant` | `PATCH /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}/participants/{participantId}` | Edit a participant's detail |
| `client.api.meetings.replaceParticipant` | `PUT /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}/participants/{participantId}` | Replace a participant's detail |
| `client.api.meetings.revokeToken` | `DELETE /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}/participants/{participantId}/token` | Revoke participant's authentication token |
| `client.api.meetings.regenerateToken` | `POST /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}/participants/{participantId}/token` | Refresh participant's authentication token |

## activeSession

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.activeSession.getActiveSession` | `GET /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}/active-session` | Fetch details of an active session |
| `client.api.activeSession.kickPartcipants` | `POST /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}/active-session/kick` | Kick participants from an active session |
| `client.api.activeSession.kickAllParticipants` | `POST /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}/active-session/kick-all` | Kick all participants |
| `client.api.activeSession.muteParticipants` | `POST /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}/active-session/mute` | Mute participants of an active session |
| `client.api.activeSession.muteAllParticipants` | `POST /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}/active-session/mute-all` | Mute all participants |
| `client.api.activeSession.createPoll` | `POST /accounts/{accountId}/realtime/kit/{appId}/meetings/{meetingId}/active-session/poll` | Create a poll |

## presets

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.presets.getPresets` | `GET /accounts/{accountId}/realtime/kit/{appId}/presets` | Fetch all presets |
| `client.api.presets.postPresets` | `POST /accounts/{accountId}/realtime/kit/{appId}/presets` | Create a preset |
| `client.api.presets.deletePresetsPresetId` | `DELETE /accounts/{accountId}/realtime/kit/{appId}/presets/{presetId}` | Delete a preset |
| `client.api.presets.getPresetsPresetId` | `GET /accounts/{accountId}/realtime/kit/{appId}/presets/{presetId}` | Fetch details of a preset |
| `client.api.presets.patchPresetsPresetId` | `PATCH /accounts/{accountId}/realtime/kit/{appId}/presets/{presetId}` | Update a preset |
| `client.api.presets.putPresetsPresetId` | `PUT /accounts/{accountId}/realtime/kit/{appId}/presets/{presetId}` | Replace a preset |

## recordings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.recordings.getAllRecordings` | `GET /accounts/{accountId}/realtime/kit/{appId}/recordings` | Fetch all recordings for an App |
| `client.api.recordings.startRecording` | `POST /accounts/{accountId}/realtime/kit/{appId}/recordings` | Start recording a meeting |
| `client.api.recordings.getActiveRecording` | `GET /accounts/{accountId}/realtime/kit/{appId}/recordings/active-recording/{meetingId}` | Fetch active recording |
| `client.api.recordings.startTrackRecordingForAMeeting` | `POST /accounts/{accountId}/realtime/kit/{appId}/recordings/track` | Start recording participant audio tracks |
| `client.api.recordings.getOneRecording` | `GET /accounts/{accountId}/realtime/kit/{appId}/recordings/{recordingId}` | Fetch details of a recording |
| `client.api.recordings.pauseResumeStopRecording` | `PUT /accounts/{accountId}/realtime/kit/{appId}/recordings/{recordingId}` | Pause/Resume/Stop recording |

## sessions

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.sessions.getSessions` | `GET /accounts/{accountId}/realtime/kit/{appId}/sessions` | Fetch all sessions of an App |
| `client.api.sessions.getParticipantDataFromPeerId` | `GET /accounts/{accountId}/realtime/kit/{appId}/sessions/peer-report/{peerId}` | Fetch details of peer |
| `client.api.sessions.getSessionDetails` | `GET /accounts/{accountId}/realtime/kit/{appId}/sessions/{sessionId}` | Fetch details of a session |
| `client.api.sessions.getSessionChat` | `GET /accounts/{accountId}/realtime/kit/{appId}/sessions/{sessionId}/chat` | Fetch all chat messages of a session |
| `client.api.sessions.getSessionParticipants` | `GET /accounts/{accountId}/realtime/kit/{appId}/sessions/{sessionId}/participants` | Fetch participants list of a session |
| `client.api.sessions.getParticipantDetails` | `GET /accounts/{accountId}/realtime/kit/{appId}/sessions/{sessionId}/participants/{participantId}` | Fetch details of a participant |
| `client.api.sessions.getSessionSummary` | `GET /accounts/{accountId}/realtime/kit/{appId}/sessions/{sessionId}/summary` | Fetch summary of transcripts for a session |
| `client.api.sessions.postSessionsSessionIdSummary` | `POST /accounts/{accountId}/realtime/kit/{appId}/sessions/{sessionId}/summary` | Generate summary of Transcripts for the session |
| `client.api.sessions.getSessionTranscript` | `GET /accounts/{accountId}/realtime/kit/{appId}/sessions/{sessionId}/transcript` | Fetch the complete transcript for a session |

## domainDiscovery

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.domainDiscovery.sandboxRegistrarDomainDiscoveryCheck` | `POST /accounts/{accountId}/registrar-sandbox/domain-check` | Check domain availability |
| `client.api.domainDiscovery.sandboxRegistrarDomainDiscoverySearch` | `GET /accounts/{accountId}/registrar-sandbox/domain-search` | Search for available domains |
| `client.api.domainDiscovery.registrarDomainDiscoveryCheck` | `POST /accounts/{accountId}/registrar/domain-check` | Check domain availability |
| `client.api.domainDiscovery.registrarDomainDiscoverySearch` | `GET /accounts/{accountId}/registrar/domain-search` | Search for available domains |
| `client.api.domainDiscovery.registrarDomainDiscoveryTransferCheck` | `POST /accounts/{accountId}/registrar/domain-transfer-check` | Check domain transfer eligibility |

## extension

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.extension.sandboxRegistrarExtensionList` | `GET /accounts/{accountId}/registrar-sandbox/extensions` | List extensions |
| `client.api.extension.sandboxRegistrarExtensionGet` | `GET /accounts/{accountId}/registrar-sandbox/extensions/{extension}` | Get extension |
| `client.api.extension.registrarExtensionList` | `GET /accounts/{accountId}/registrar/extensions` | List extensions |
| `client.api.extension.registrarExtensionGet` | `GET /accounts/{accountId}/registrar/extensions/{extension}` | Get extension |

## registrarRegistration

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.registrarRegistration.sandboxRegistrarDomainRegistrationList` | `GET /accounts/{accountId}/registrar-sandbox/registrations` | List Registrations |
| `client.api.registrarRegistration.sandboxRegistrarDomainRegistrationCreate` | `POST /accounts/{accountId}/registrar-sandbox/registrations` | Create Registration |
| `client.api.registrarRegistration.sandboxRegistrarDomainRegistrationGet` | `GET /accounts/{accountId}/registrar-sandbox/registrations/{domainName}` | Get Registration |
| `client.api.registrarRegistration.sandboxRegistrarDomainRegistrationUpdate` | `PATCH /accounts/{accountId}/registrar-sandbox/registrations/{domainName}` | Update Registration |
| `client.api.registrarRegistration.sandboxRegistrarDomainRegistrationGetStatus` | `GET /accounts/{accountId}/registrar-sandbox/registrations/{domainName}/registration-status` | Get Registration Status |
| `client.api.registrarRegistration.sandboxRegistrarDomainRegistrationGetUpdateStatus` | `GET /accounts/{accountId}/registrar-sandbox/registrations/{domainName}/update-status` | Get Update Status |
| `client.api.registrarRegistration.registrarDomainRegistrationList` | `GET /accounts/{accountId}/registrar/registrations` | List Registrations |
| `client.api.registrarRegistration.registrarDomainRegistrationCreate` | `POST /accounts/{accountId}/registrar/registrations` | Create Registration |
| `client.api.registrarRegistration.registrarDomainRegistrationGet` | `GET /accounts/{accountId}/registrar/registrations/{domainName}` | Get Registration |
| `client.api.registrarRegistration.registrarDomainRegistrationUpdate` | `PATCH /accounts/{accountId}/registrar/registrations/{domainName}` | Update Registration |
| `client.api.registrarRegistration.registrarDomainRegistrationGetStatus` | `GET /accounts/{accountId}/registrar/registrations/{domainName}/registration-status` | Get Registration Status |
| `client.api.registrarRegistration.registrarDomainRegistrationGetUpdateStatus` | `GET /accounts/{accountId}/registrar/registrations/{domainName}/update-status` | Get Update Status |

## registrarTransfer

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.registrarTransfer.registrarDomainTransferInCreate` | `POST /accounts/{accountId}/registrar/registrations/{domainName}/transfer-in` | Initiate Transfer |
| `client.api.registrarTransfer.registrarDomainTransferGetStatus` | `GET /accounts/{accountId}/registrar/registrations/{domainName}/transfer-in-status` | Get Transfer Status |

## reportsOther

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.reportsOther.reportingIndustryGet` | `GET /accounts/{accountId}/reporting/industry` | Get an account industry |
| `client.api.reportsOther.reportingIndustryUpdate` | `PATCH /accounts/{accountId}/reporting/industry` | Update an account industry |
| `client.api.reportsOther.reportingPoliciesList` | `GET /accounts/{accountId}/reporting/policies` | List reporting policies |
| `client.api.reportsOther.reportingPoliciesGet` | `GET /accounts/{accountId}/reporting/policies/{policyId}` | Get a reporting policy |
| `client.api.reportsOther.reportingReportsList` | `GET /accounts/{accountId}/reporting/reports` | List generated reports |
| `client.api.reportsOther.reportingReportsGet` | `GET /accounts/{accountId}/reporting/reports/{reportId}` | Get a generated report |

## accountRequestTracer

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountRequestTracer.accountRequestTracerRequestTrace` | `POST /accounts/{accountId}/request-tracer/trace` | Request Trace |

## accountRoles

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountRoles.accountRolesListRoles` | `GET /accounts/{accountId}/roles` | List Roles |
| `client.api.accountRoles.accountRolesRoleDetails` | `GET /accounts/{accountId}/roles/{roleId}` | Role Details |

## lists

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.lists.listsGetLists` | `GET /accounts/{accountId}/rules/lists` | Get lists |
| `client.api.lists.listsCreateAList` | `POST /accounts/{accountId}/rules/lists` | Create a list |
| `client.api.lists.listsGetBulkOperationStatus` | `GET /accounts/{accountId}/rules/lists/bulk_operations/{operationId}` | Get bulk operation status |
| `client.api.lists.listsDeleteAList` | `DELETE /accounts/{accountId}/rules/lists/{listId}` | Delete a list |
| `client.api.lists.listsGetAList` | `GET /accounts/{accountId}/rules/lists/{listId}` | Get a list |
| `client.api.lists.listsUpdateAList` | `PUT /accounts/{accountId}/rules/lists/{listId}` | Update a list |
| `client.api.lists.listsDeleteListItems` | `DELETE /accounts/{accountId}/rules/lists/{listId}/items` | Delete list items |
| `client.api.lists.listsGetListItems` | `GET /accounts/{accountId}/rules/lists/{listId}/items` | Get list items |
| `client.api.lists.listsCreateListItems` | `POST /accounts/{accountId}/rules/lists/{listId}/items` | Create list items |
| `client.api.lists.listsUpdateAllListItems` | `PUT /accounts/{accountId}/rules/lists/{listId}/items` | Update all list items |
| `client.api.lists.listsGetAListItem` | `GET /accounts/{accountId}/rules/lists/{listId}/items/{itemId}` | Get a list item |

## accountRulesets

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountRulesets.listAccountRulesets` | `GET /accounts/{accountId}/rulesets` | List account rulesets |
| `client.api.accountRulesets.createAccountRuleset` | `POST /accounts/{accountId}/rulesets` | Create an account ruleset |
| `client.api.accountRulesets.getAccountEntrypointRuleset` | `GET /accounts/{accountId}/rulesets/phases/{rulesetPhase}/entrypoint` | Get an account entry point ruleset |
| `client.api.accountRulesets.updateAccountEntrypointRuleset` | `PUT /accounts/{accountId}/rulesets/phases/{rulesetPhase}/entrypoint` | Update an account entry point ruleset |
| `client.api.accountRulesets.listAccountEntrypointRulesetVersions` | `GET /accounts/{accountId}/rulesets/phases/{rulesetPhase}/entrypoint/versions` | List an account entry point ruleset's versions |
| `client.api.accountRulesets.getAccountEntrypointRulesetVersion` | `GET /accounts/{accountId}/rulesets/phases/{rulesetPhase}/entrypoint/versions/{rulesetVersion}` | Get an account entry point ruleset version |
| `client.api.accountRulesets.deleteAccountRuleset` | `DELETE /accounts/{accountId}/rulesets/{rulesetId}` | Delete an account ruleset |
| `client.api.accountRulesets.getAccountRuleset` | `GET /accounts/{accountId}/rulesets/{rulesetId}` | Get an account ruleset |
| `client.api.accountRulesets.updateAccountRuleset` | `PUT /accounts/{accountId}/rulesets/{rulesetId}` | Update an account ruleset |
| `client.api.accountRulesets.createAccountRulesetRule` | `POST /accounts/{accountId}/rulesets/{rulesetId}/rules` | Create an account ruleset rule |
| `client.api.accountRulesets.deleteAccountRulesetRule` | `DELETE /accounts/{accountId}/rulesets/{rulesetId}/rules/{ruleId}` | Delete an account ruleset rule |
| `client.api.accountRulesets.updateAccountRulesetRule` | `PATCH /accounts/{accountId}/rulesets/{rulesetId}/rules/{ruleId}` | Update an account ruleset rule |
| `client.api.accountRulesets.listAccountRulesetVersions` | `GET /accounts/{accountId}/rulesets/{rulesetId}/versions` | List an account ruleset's versions |
| `client.api.accountRulesets.deleteAccountRulesetVersion` | `DELETE /accounts/{accountId}/rulesets/{rulesetId}/versions/{rulesetVersion}` | Delete an account ruleset version |
| `client.api.accountRulesets.getAccountRulesetVersion` | `GET /accounts/{accountId}/rulesets/{rulesetId}/versions/{rulesetVersion}` | Get an account ruleset version |
| `client.api.accountRulesets.listAccountRulesetVersionRulesByTag` | `GET /accounts/{accountId}/rulesets/{rulesetId}/versions/{rulesetVersion}/by_tag/{ruleTag}` | List an account ruleset version's rules by tag |

## webAnalytics

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.webAnalytics.webAnalyticsCreateSite` | `POST /accounts/{accountId}/rum/site_info` | Create a Web Analytics site |
| `client.api.webAnalytics.webAnalyticsListSites` | `GET /accounts/{accountId}/rum/site_info/list` | List Web Analytics sites |
| `client.api.webAnalytics.webAnalyticsListSiteTags` | `GET /accounts/{accountId}/rum/site_info/site_tag/list` | List Web Analytics site tags |
| `client.api.webAnalytics.webAnalyticsValidateSiteHostname` | `GET /accounts/{accountId}/rum/site_info/validate/{hostname}` | Validate a Web Analytics site hostname |
| `client.api.webAnalytics.webAnalyticsListZoneTags` | `GET /accounts/{accountId}/rum/site_info/zone_tag/list` | List Web Analytics zone tags |
| `client.api.webAnalytics.webAnalyticsDeleteSite` | `DELETE /accounts/{accountId}/rum/site_info/{siteId}` | Delete a Web Analytics site |
| `client.api.webAnalytics.webAnalyticsGetSite` | `GET /accounts/{accountId}/rum/site_info/{siteId}` | Get a Web Analytics site |
| `client.api.webAnalytics.webAnalyticsUpdateSite` | `PUT /accounts/{accountId}/rum/site_info/{siteId}` | Update a Web Analytics site |
| `client.api.webAnalytics.webAnalyticsCreateRule` | `POST /accounts/{accountId}/rum/v2/{rulesetId}/rule` | Create a Web Analytics rule |
| `client.api.webAnalytics.webAnalyticsDeleteRule` | `DELETE /accounts/{accountId}/rum/v2/{rulesetId}/rule/{ruleId}` | Delete a Web Analytics rule |
| `client.api.webAnalytics.webAnalyticsUpdateRule` | `PUT /accounts/{accountId}/rum/v2/{rulesetId}/rule/{ruleId}` | Update a Web Analytics rule |
| `client.api.webAnalytics.webAnalyticsListRules` | `GET /accounts/{accountId}/rum/v2/{rulesetId}/rules` | List rules in Web Analytics ruleset |
| `client.api.webAnalytics.webAnalyticsModifyRules` | `POST /accounts/{accountId}/rum/v2/{rulesetId}/rules` | Update Web Analytics rules |
| `client.api.webAnalytics.webAnalyticsGetRumStatus` | `GET /zones/{zoneId}/settings/rum` | Get RUM status for a zone |
| `client.api.webAnalytics.webAnalyticsToggleRum` | `PATCH /zones/{zoneId}/settings/rum` | Toggle RUM on/off for a zone |

## scimGroups

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.scimGroups.scimGroupsList` | `GET /accounts/{accountId}/scim/v2/Groups` | List SCIM Groups |
| `client.api.scimGroups.scimGroupsCreate` | `POST /accounts/{accountId}/scim/v2/Groups` | Create SCIM Group |
| `client.api.scimGroups.scimGroupsDelete` | `DELETE /accounts/{accountId}/scim/v2/Groups/{groupId}` | Delete SCIM Group |
| `client.api.scimGroups.scimGroupsGet` | `GET /accounts/{accountId}/scim/v2/Groups/{groupId}` | Get SCIM Group |
| `client.api.scimGroups.scimGroupsPatch` | `PATCH /accounts/{accountId}/scim/v2/Groups/{groupId}` | Patch SCIM Group |
| `client.api.scimGroups.scimGroupsPut` | `PUT /accounts/{accountId}/scim/v2/Groups/{groupId}` | Replace SCIM Group |

## scimDiscovery

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.scimDiscovery.scimResourceTypesList` | `GET /accounts/{accountId}/scim/v2/ResourceTypes` | List SCIM Resource Types |
| `client.api.scimDiscovery.scimResourceTypesGet` | `GET /accounts/{accountId}/scim/v2/ResourceTypes/{resourceTypeId}` | Get SCIM Resource Type |
| `client.api.scimDiscovery.scimSchemasList` | `GET /accounts/{accountId}/scim/v2/Schemas` | List SCIM Schemas |
| `client.api.scimDiscovery.scimSchemasGet` | `GET /accounts/{accountId}/scim/v2/Schemas/{schemaId}` | Get SCIM Schema |
| `client.api.scimDiscovery.scimServiceProviderConfigGet` | `GET /accounts/{accountId}/scim/v2/ServiceProviderConfig` | Get SCIM Service Provider Config |

## scimUsers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.scimUsers.scimUsersList` | `GET /accounts/{accountId}/scim/v2/Users` | List SCIM Users |
| `client.api.scimUsers.scimUsersCreate` | `POST /accounts/{accountId}/scim/v2/Users` | Create SCIM User |
| `client.api.scimUsers.scimUsersDelete` | `DELETE /accounts/{accountId}/scim/v2/Users/{userId}` | Delete SCIM User |
| `client.api.scimUsers.scimUsersGet` | `GET /accounts/{accountId}/scim/v2/Users/{userId}` | Get SCIM User |
| `client.api.scimUsers.scimUsersPatch` | `PATCH /accounts/{accountId}/scim/v2/Users/{userId}` | Patch SCIM User |
| `client.api.scimUsers.scimUsersPut` | `PUT /accounts/{accountId}/scim/v2/Users/{userId}` | Replace SCIM User |

## secondaryDnsAcl

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.secondaryDnsAcl.secondaryDnsAclListAcLs` | `GET /accounts/{accountId}/secondary_dns/acls` | List ACLs |
| `client.api.secondaryDnsAcl.secondaryDnsAclCreateAcl` | `POST /accounts/{accountId}/secondary_dns/acls` | Create ACL |
| `client.api.secondaryDnsAcl.secondaryDnsAclDeleteAcl` | `DELETE /accounts/{accountId}/secondary_dns/acls/{aclId}` | Delete ACL |
| `client.api.secondaryDnsAcl.secondaryDnsAclAclDetails` | `GET /accounts/{accountId}/secondary_dns/acls/{aclId}` | ACL Details |
| `client.api.secondaryDnsAcl.secondaryDnsAclUpdateAcl` | `PUT /accounts/{accountId}/secondary_dns/acls/{aclId}` | Update ACL |

## secondaryDnsPeer

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.secondaryDnsPeer.secondaryDnsPeerListPeers` | `GET /accounts/{accountId}/secondary_dns/peers` | List Peers |
| `client.api.secondaryDnsPeer.secondaryDnsPeerCreatePeer` | `POST /accounts/{accountId}/secondary_dns/peers` | Create Peer |
| `client.api.secondaryDnsPeer.secondaryDnsPeerDeletePeer` | `DELETE /accounts/{accountId}/secondary_dns/peers/{peerId}` | Delete Peer |
| `client.api.secondaryDnsPeer.secondaryDnsPeerPeerDetails` | `GET /accounts/{accountId}/secondary_dns/peers/{peerId}` | Peer Details |
| `client.api.secondaryDnsPeer.secondaryDnsPeerUpdatePeer` | `PUT /accounts/{accountId}/secondary_dns/peers/{peerId}` | Update Peer |

## secondaryDnsTsig

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.secondaryDnsTsig.secondaryDnsTsigListTsiGs` | `GET /accounts/{accountId}/secondary_dns/tsigs` | List TSIGs |
| `client.api.secondaryDnsTsig.secondaryDnsTsigCreateTsig` | `POST /accounts/{accountId}/secondary_dns/tsigs` | Create TSIG |
| `client.api.secondaryDnsTsig.secondaryDnsTsigDeleteTsig` | `DELETE /accounts/{accountId}/secondary_dns/tsigs/{tsigId}` | Delete TSIG |
| `client.api.secondaryDnsTsig.secondaryDnsTsigTsigDetails` | `GET /accounts/{accountId}/secondary_dns/tsigs/{tsigId}` | TSIG Details |
| `client.api.secondaryDnsTsig.secondaryDnsTsigUpdateTsig` | `PUT /accounts/{accountId}/secondary_dns/tsigs/{tsigId}` | Update TSIG |

## secretsStore

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.secretsStore.secretsStoreQuota` | `GET /accounts/{accountId}/secrets_store/quota` | View secret usage |
| `client.api.secretsStore.secretsStoreList` | `GET /accounts/{accountId}/secrets_store/stores` | List account stores |
| `client.api.secretsStore.secretsStoreCreate` | `POST /accounts/{accountId}/secrets_store/stores` | Create a store |
| `client.api.secretsStore.secretsStoreDeleteById` | `DELETE /accounts/{accountId}/secrets_store/stores/{storeId}` | Delete a store |
| `client.api.secretsStore.secretsStoreGetStoreById` | `GET /accounts/{accountId}/secrets_store/stores/{storeId}` | Get a store by ID |
| `client.api.secretsStore.secretsStoreDeleteBulk` | `DELETE /accounts/{accountId}/secrets_store/stores/{storeId}/secrets` | Delete secrets |
| `client.api.secretsStore.secretsStoreSecretsList` | `GET /accounts/{accountId}/secrets_store/stores/{storeId}/secrets` | List store secrets |
| `client.api.secretsStore.secretsStoreSecretCreate` | `POST /accounts/{accountId}/secrets_store/stores/{storeId}/secrets` | Create a secret |
| `client.api.secretsStore.secretsStoreSecretDeleteById` | `DELETE /accounts/{accountId}/secrets_store/stores/{storeId}/secrets/{secretId}` | Delete a secret |
| `client.api.secretsStore.secretsStoreGetById` | `GET /accounts/{accountId}/secrets_store/stores/{storeId}/secrets/{secretId}` | Get a secret by ID |
| `client.api.secretsStore.secretsStorePatchById` | `PATCH /accounts/{accountId}/secrets_store/stores/{storeId}/secrets/{secretId}` | Patch a secret |
| `client.api.secretsStore.secretsStoreDuplicateById` | `POST /accounts/{accountId}/secrets_store/stores/{storeId}/secrets/{secretId}/duplicate` | Duplicate Secret |

## securityCenterAuditLog

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.securityCenterAuditLog.getSecurityCenterAccountAuditLog` | `GET /accounts/{accountId}/security-center/insights/audit-log` | Retrieves Account Audit Log |
| `client.api.securityCenterAuditLog.getSecurityCenterIssueAuditLog` | `GET /accounts/{accountId}/security-center/insights/{issueId}/audit-log` | Retrieves Issue Audit Log |
| `client.api.securityCenterAuditLog.getZoneSecurityCenterAuditLog` | `GET /zones/{zoneId}/security-center/insights/audit-log` | Retrieves Zone Audit Log |
| `client.api.securityCenterAuditLog.getZoneSecurityCenterIssueAuditLog` | `GET /zones/{zoneId}/security-center/insights/{issueId}/audit-log` | Retrieves Zone Issue Audit Log |

## securityCenterScans

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.securityCenterScans.getSecurityCenterAccountScans` | `GET /accounts/{accountId}/security-center/insights/scans` | Get Recent Account Scans |
| `client.api.securityCenterScans.startSecurityCenterAccountScan` | `POST /accounts/{accountId}/security-center/insights/scans` | Start On-Demand Account Scan |
| `client.api.securityCenterScans.getSecurityCenterZoneScans` | `GET /zones/{zoneId}/security-center/insights/scans` | Get Recent Zone Scans |
| `client.api.securityCenterScans.startSecurityCenterZoneScan` | `POST /zones/{zoneId}/security-center/insights/scans` | Start On-Demand Zone Scan |

## securityCenterPartners

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.securityCenterPartners.getSecurityCenterPartnerSettings` | `GET /accounts/{accountId}/security-center/partners/{partner}/settings` | Retrieves Partner Integration Settings |
| `client.api.securityCenterPartners.updateSecurityCenterPartnerSettings` | `POST /accounts/{accountId}/security-center/partners/{partner}/settings` | Updates Partner Integration Settings |
| `client.api.securityCenterPartners.getSecurityCenterPartnerShadowZones` | `GET /accounts/{accountId}/security-center/partners/{partner}/shadow-zones` | Lists Partner-Discovered Shadow Zones |
| `client.api.securityCenterPartners.getSecurityCenterPartnerShadowZoneHosts` | `GET /accounts/{accountId}/security-center/partners/{partner}/shadow-zones/{domain}/hosts` | Lists Hosts in a Partner-Discovered Shadow Zone |
| `client.api.securityCenterPartners.getZoneSecurityCenterPartnerShadowHosts` | `GET /zones/{zoneId}/security-center/partners/{partner}/shadow-hosts` | Lists Partner-Discovered Shadow Hosts for a Zone |

## accountSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountSettings.accountSettingsListTransformations` | `GET /accounts/{accountId}/settings/transformations` | List Image Resizing configurations for account |
| `client.api.accountSettings.accountSettingsGetUtBillingSetting` | `GET /accounts/{accountId}/settings/ut-billing` | Get Unique Transformations billing setting |
| `client.api.accountSettings.accountSettingsChangeUtBillingSetting` | `PATCH /accounts/{accountId}/settings/ut-billing` | Change Unique Transformations billing setting |

## resourceSharing

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.resourceSharing.sharesList` | `GET /accounts/{accountId}/shares` | List account shares |
| `client.api.resourceSharing.shareCreate` | `POST /accounts/{accountId}/shares` | Trigger a share creation |
| `client.api.resourceSharing.shareDelete` | `DELETE /accounts/{accountId}/shares/{shareId}` | Trigger a share deletion |
| `client.api.resourceSharing.sharesGetById` | `GET /accounts/{accountId}/shares/{shareId}` | Get account share by ID |
| `client.api.resourceSharing.shareUpdate` | `PUT /accounts/{accountId}/shares/{shareId}` | Trigger a share update |
| `client.api.resourceSharing.shareExcludedRecipientsList` | `GET /accounts/{accountId}/shares/{shareId}/excluded-recipients` | List share excluded recipients by share ID |
| `client.api.resourceSharing.shareExcludedRecipientCreate` | `POST /accounts/{accountId}/shares/{shareId}/excluded-recipients` | Trigger an account exclusion from a share |
| `client.api.resourceSharing.shareExcludedRecipientsUpdate` | `PUT /accounts/{accountId}/shares/{shareId}/excluded-recipients` | Trigger excluded-account reconciliation on a share |
| `client.api.resourceSharing.shareExcludedRecipientDelete` | `DELETE /accounts/{accountId}/shares/{shareId}/excluded-recipients/{excludedRecipientId}` | Trigger an account un-exclusion from a share |
| `client.api.resourceSharing.shareExcludedRecipientsGetById` | `GET /accounts/{accountId}/shares/{shareId}/excluded-recipients/{excludedRecipientId}` | Get share excluded recipient by ID |
| `client.api.resourceSharing.shareRecipientsList` | `GET /accounts/{accountId}/shares/{shareId}/recipients` | List share recipients by share ID |
| `client.api.resourceSharing.shareRecipientCreate` | `POST /accounts/{accountId}/shares/{shareId}/recipients` | Trigger a recipient addition to a share |
| `client.api.resourceSharing.shareRecipientsUpdate` | `PUT /accounts/{accountId}/shares/{shareId}/recipients` | Trigger recipient reconciliation on a share |
| `client.api.resourceSharing.shareRecipientDelete` | `DELETE /accounts/{accountId}/shares/{shareId}/recipients/{recipientId}` | Trigger a recipient removal from a share |
| `client.api.resourceSharing.shareRecipientsGetById` | `GET /accounts/{accountId}/shares/{shareId}/recipients/{recipientId}` | Get share recipient by ID |
| `client.api.resourceSharing.shareResourcesList` | `GET /accounts/{accountId}/shares/{shareId}/resources` | List share resources by share ID |
| `client.api.resourceSharing.shareResourceCreate` | `POST /accounts/{accountId}/shares/{shareId}/resources` | Trigger a resource addition to a share |
| `client.api.resourceSharing.shareResourceDelete` | `DELETE /accounts/{accountId}/shares/{shareId}/resources/{shareResourceId}` | Trigger a resource deletion from a share |
| `client.api.resourceSharing.shareResourcesGetById` | `GET /accounts/{accountId}/shares/{shareId}/resources/{shareResourceId}` | Get share resource by ID |
| `client.api.resourceSharing.shareResourceUpdate` | `PUT /accounts/{accountId}/shares/{shareId}/resources/{shareResourceId}` | Trigger a resource metadata update in a share |
| `client.api.resourceSharing.organizationSharesList` | `GET /organizations/{organizationId}/shares` | List organization shares |

## r2SuperSlurper

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.r2SuperSlurper.slurperListJobs` | `GET /accounts/{accountId}/slurper/jobs` | List jobs |
| `client.api.r2SuperSlurper.slurperCreateJob` | `POST /accounts/{accountId}/slurper/jobs` | Create a job |
| `client.api.r2SuperSlurper.slurperAbortAllJobs` | `PUT /accounts/{accountId}/slurper/jobs/abortAll` | Abort all jobs |
| `client.api.r2SuperSlurper.slurperDeleteJob` | `DELETE /accounts/{accountId}/slurper/jobs/{jobId}` | Delete a job |
| `client.api.r2SuperSlurper.slurperGetJob` | `GET /accounts/{accountId}/slurper/jobs/{jobId}` | Get job details |
| `client.api.r2SuperSlurper.slurperAbortJob` | `PUT /accounts/{accountId}/slurper/jobs/{jobId}/abort` | Abort a job |
| `client.api.r2SuperSlurper.slurperGetJobLogs` | `GET /accounts/{accountId}/slurper/jobs/{jobId}/logs` | Get job logs |
| `client.api.r2SuperSlurper.slurperPauseJob` | `PUT /accounts/{accountId}/slurper/jobs/{jobId}/pause` | Pause a job |
| `client.api.r2SuperSlurper.slurperGetJobProgress` | `GET /accounts/{accountId}/slurper/jobs/{jobId}/progress` | Get job progress |
| `client.api.r2SuperSlurper.slurperResumeJob` | `PUT /accounts/{accountId}/slurper/jobs/{jobId}/resume` | Resume a job |
| `client.api.r2SuperSlurper.slurperCheckSourceConnectivity` | `PUT /accounts/{accountId}/slurper/source/connectivity-precheck` | Check source connectivity |
| `client.api.r2SuperSlurper.slurperCheckTargetConnectivity` | `PUT /accounts/{accountId}/slurper/target/connectivity-precheck` | Check target connectivity |

## sso

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.sso.getAllSsoConnectors` | `GET /accounts/{accountId}/sso_connectors` | Get all SSO connectors |
| `client.api.sso.initNewSsoConnector` | `POST /accounts/{accountId}/sso_connectors` | Initialize new SSO connector |
| `client.api.sso.deleteSsoConnector` | `DELETE /accounts/{accountId}/sso_connectors/{ssoConnectorId}` | Delete SSO connector |
| `client.api.sso.getSsoConnector` | `GET /accounts/{accountId}/sso_connectors/{ssoConnectorId}` | Get single SSO connector |
| `client.api.sso.updateSsoConnectorState` | `PATCH /accounts/{accountId}/sso_connectors/{ssoConnectorId}` | Update SSO connector state |
| `client.api.sso.beginSsoConnectorVerification` | `POST /accounts/{accountId}/sso_connectors/{ssoConnectorId}/begin_verification` | Begin SSO connector verification |

## workersKvNamespace

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workersKvNamespace.workersKvNamespaceListNamespaces` | `GET /accounts/{accountId}/storage/kv/namespaces` | List namespaces |
| `client.api.workersKvNamespace.workersKvNamespaceCreateANamespace` | `POST /accounts/{accountId}/storage/kv/namespaces` | Create a namespace |
| `client.api.workersKvNamespace.workersKvNamespaceRemoveANamespace` | `DELETE /accounts/{accountId}/storage/kv/namespaces/{namespaceId}` | Delete a namespace |
| `client.api.workersKvNamespace.workersKvNamespaceGetANamespace` | `GET /accounts/{accountId}/storage/kv/namespaces/{namespaceId}` | Get a namespace |
| `client.api.workersKvNamespace.workersKvNamespaceRenameANamespace` | `PUT /accounts/{accountId}/storage/kv/namespaces/{namespaceId}` | Rename a namespace |
| `client.api.workersKvNamespace.workersKvNamespaceDeleteMultipleKeyValuePairsDeprecated` | `DELETE /accounts/{accountId}/storage/kv/namespaces/{namespaceId}/bulk` | Delete multiple key-value pairs |
| `client.api.workersKvNamespace.workersKvNamespaceWriteMultipleKeyValuePairs` | `PUT /accounts/{accountId}/storage/kv/namespaces/{namespaceId}/bulk` | Write multiple key-value pairs |
| `client.api.workersKvNamespace.workersKvNamespaceDeleteMultipleKeyValuePairs` | `POST /accounts/{accountId}/storage/kv/namespaces/{namespaceId}/bulk/delete` | Delete multiple key-value pairs |
| `client.api.workersKvNamespace.workersKvNamespaceGetMultipleKeyValuePairs` | `POST /accounts/{accountId}/storage/kv/namespaces/{namespaceId}/bulk/get` | Get multiple key-value pairs |
| `client.api.workersKvNamespace.workersKvNamespaceListANamespaceSKeys` | `GET /accounts/{accountId}/storage/kv/namespaces/{namespaceId}/keys` | List keys in a namespace |
| `client.api.workersKvNamespace.workersKvNamespaceReadTheMetadataForAKey` | `GET /accounts/{accountId}/storage/kv/namespaces/{namespaceId}/metadata/{keyName}` | Get a key's metadata |
| `client.api.workersKvNamespace.workersKvNamespaceDeleteKeyValuePair` | `DELETE /accounts/{accountId}/storage/kv/namespaces/{namespaceId}/values/{keyName}` | Delete a key-value pair |
| `client.api.workersKvNamespace.workersKvNamespaceReadKeyValuePair` | `GET /accounts/{accountId}/storage/kv/namespaces/{namespaceId}/values/{keyName}` | Get a key's value |
| `client.api.workersKvNamespace.workersKvNamespaceWriteKeyValuePairWithMetadata` | `PUT /accounts/{accountId}/storage/kv/namespaces/{namespaceId}/values/{keyName}` | Write a key-value pair with optional metadata |

## streamVideos

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.streamVideos.streamVideosListVideos` | `GET /accounts/{accountId}/stream` | List videos |
| `client.api.streamVideos.streamVideosInitiateVideoUploadsUsingTus` | `POST /accounts/{accountId}/stream` | Initiate video uploads using TUS |
| `client.api.streamVideos.streamVideosUploadVideosFromAUrl` | `POST /accounts/{accountId}/stream/copy` | Upload videos from a URL |
| `client.api.streamVideos.streamVideosUploadVideosViaDirectUploadUrLs` | `POST /accounts/{accountId}/stream/direct_upload` | Upload videos via direct upload URLs |
| `client.api.streamVideos.streamVideosStorageUsage` | `GET /accounts/{accountId}/stream/storage-usage` | Storage use |
| `client.api.streamVideos.streamVideosDeleteVideo` | `DELETE /accounts/{accountId}/stream/{identifier}` | Delete video |
| `client.api.streamVideos.streamVideosRetrieveVideoDetails` | `GET /accounts/{accountId}/stream/{identifier}` | Retrieve video details |
| `client.api.streamVideos.streamVideosUpdateVideoDetails` | `POST /accounts/{accountId}/stream/{identifier}` | Edit video details |
| `client.api.streamVideos.streamVideosRetreieveEmbedCodeHtml` | `GET /accounts/{accountId}/stream/{identifier}/embed` | Deprecated: Retrieve legacy embed code HTML |
| `client.api.streamVideos.streamVideosCreateSignedUrlTokensForVideos` | `POST /accounts/{accountId}/stream/{identifier}/token` | Create signed URL tokens for videos |

## streamVideoClipping

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.streamVideoClipping.streamVideoClippingClipVideosGivenAStartAndEndTime` | `POST /accounts/{accountId}/stream/clip` | Clip videos given a start and end time |

## streamSigningKeys

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.streamSigningKeys.streamSigningKeysListSigningKeys` | `GET /accounts/{accountId}/stream/keys` | List signing keys |
| `client.api.streamSigningKeys.streamSigningKeysCreateSigningKeys` | `POST /accounts/{accountId}/stream/keys` | Create signing keys |
| `client.api.streamSigningKeys.streamSigningKeysDeleteSigningKeys` | `DELETE /accounts/{accountId}/stream/keys/{identifier}` | Delete signing keys |

## streamLiveInputs

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.streamLiveInputs.streamLiveInputsListLiveInputs` | `GET /accounts/{accountId}/stream/live_inputs` | List live inputs |
| `client.api.streamLiveInputs.streamLiveInputsCreateALiveInput` | `POST /accounts/{accountId}/stream/live_inputs` | Create a live input |
| `client.api.streamLiveInputs.streamLiveInputsDeleteALiveInput` | `DELETE /accounts/{accountId}/stream/live_inputs/{liveInputIdentifier}` | Delete a live input |
| `client.api.streamLiveInputs.streamLiveInputsRetrieveALiveInput` | `GET /accounts/{accountId}/stream/live_inputs/{liveInputIdentifier}` | Retrieve a live input |
| `client.api.streamLiveInputs.streamLiveInputsUpdateALiveInput` | `PUT /accounts/{accountId}/stream/live_inputs/{liveInputIdentifier}` | Update a live input |
| `client.api.streamLiveInputs.streamLiveInputsDisableALiveInput` | `POST /accounts/{accountId}/stream/live_inputs/{liveInputIdentifier}/disable` | Disable a live input |
| `client.api.streamLiveInputs.streamLiveInputsEnableALiveInput` | `POST /accounts/{accountId}/stream/live_inputs/{liveInputIdentifier}/enable` | Enable a live input |
| `client.api.streamLiveInputs.streamLiveInputsListAllOutputsAssociatedWithASpecifiedLiveInput` | `GET /accounts/{accountId}/stream/live_inputs/{liveInputIdentifier}/outputs` | List all outputs associated with a specified live input |
| `client.api.streamLiveInputs.streamLiveInputsCreateANewOutputConnectedToALiveInput` | `POST /accounts/{accountId}/stream/live_inputs/{liveInputIdentifier}/outputs` | Create a new output, connected to a live input |
| `client.api.streamLiveInputs.streamLiveInputsDeleteAnOutput` | `DELETE /accounts/{accountId}/stream/live_inputs/{liveInputIdentifier}/outputs/{outputIdentifier}` | Delete an output |
| `client.api.streamLiveInputs.streamLiveInputsUpdateAnOutput` | `PUT /accounts/{accountId}/stream/live_inputs/{liveInputIdentifier}/outputs/{outputIdentifier}` | Update an output |
| `client.api.streamLiveInputs.streamLiveInputsRotateKeysForALiveInput` | `POST /accounts/{accountId}/stream/live_inputs/{liveInputIdentifier}/rotate_keys` | Rotate keys for a live input |

## streamWatermarkProfile

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.streamWatermarkProfile.streamWatermarkProfileListWatermarkProfiles` | `GET /accounts/{accountId}/stream/watermarks` | List watermark profiles |
| `client.api.streamWatermarkProfile.streamWatermarkProfileCreateWatermarkProfilesViaBasicUpload` | `POST /accounts/{accountId}/stream/watermarks` | Create watermark profiles via basic upload |
| `client.api.streamWatermarkProfile.streamWatermarkProfileDeleteWatermarkProfiles` | `DELETE /accounts/{accountId}/stream/watermarks/{identifier}` | Delete watermark profiles |
| `client.api.streamWatermarkProfile.streamWatermarkProfileWatermarkProfileDetails` | `GET /accounts/{accountId}/stream/watermarks/{identifier}` | Watermark profile details |

## streamWebhook

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.streamWebhook.streamWebhookDeleteWebhooks` | `DELETE /accounts/{accountId}/stream/webhook` | Delete webhooks |
| `client.api.streamWebhook.streamWebhookViewWebhooks` | `GET /accounts/{accountId}/stream/webhook` | View webhook |
| `client.api.streamWebhook.streamWebhookCreateWebhooks` | `PUT /accounts/{accountId}/stream/webhook` | Create VOD webhooks |

## streamAudioTracks

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.streamAudioTracks.listAudioTracks` | `GET /accounts/{accountId}/stream/{identifier}/audio` | List additional audio tracks on a video |
| `client.api.streamAudioTracks.addAudioTrack` | `POST /accounts/{accountId}/stream/{identifier}/audio/copy` | Add audio tracks to a video |
| `client.api.streamAudioTracks.deleteAudioTracks` | `DELETE /accounts/{accountId}/stream/{identifier}/audio/{audioIdentifier}` | Delete additional audio tracks on a video |
| `client.api.streamAudioTracks.editAudioTracks` | `PATCH /accounts/{accountId}/stream/{identifier}/audio/{audioIdentifier}` | Edit additional audio tracks on a video |

## streamSubtitlesCaptions

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.streamSubtitlesCaptions.streamSubtitlesCaptionsListCaptionsOrSubtitles` | `GET /accounts/{accountId}/stream/{identifier}/captions` | List captions or subtitles |
| `client.api.streamSubtitlesCaptions.streamSubtitlesCaptionsDeleteCaptionsOrSubtitles` | `DELETE /accounts/{accountId}/stream/{identifier}/captions/{language}` | Delete captions or subtitles |
| `client.api.streamSubtitlesCaptions.streamSubtitlesCaptionsGetCaptionOrSubtitleForLanguage` | `GET /accounts/{accountId}/stream/{identifier}/captions/{language}` | List captions or subtitles for a provided language |
| `client.api.streamSubtitlesCaptions.streamSubtitlesCaptionsUploadCaptionsOrSubtitles` | `PUT /accounts/{accountId}/stream/{identifier}/captions/{language}` | Upload captions or subtitles |
| `client.api.streamSubtitlesCaptions.streamSubtitlesCaptionsGenerateCaptionOrSubtitleForLanguage` | `POST /accounts/{accountId}/stream/{identifier}/captions/{language}/generate` | Generate captions or subtitles for a provided language via AI |
| `client.api.streamSubtitlesCaptions.streamSubtitlesCaptionsGetVttCaptionOrSubtitle` | `GET /accounts/{accountId}/stream/{identifier}/captions/{language}/vtt` | Return WebVTT captions for a provided language |

## streamMp4Downloads

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.streamMp4Downloads.streamMp4DownloadsDeleteDownloads` | `DELETE /accounts/{accountId}/stream/{identifier}/downloads` | Delete downloads |
| `client.api.streamMp4Downloads.streamMp4DownloadsListDownloads` | `GET /accounts/{accountId}/stream/{identifier}/downloads` | List downloads |
| `client.api.streamMp4Downloads.streamMp4DownloadsCreateDownloads` | `POST /accounts/{accountId}/stream/{identifier}/downloads` | Create downloads |
| `client.api.streamMp4Downloads.streamDownloadsDeleteTypeSpecificDownloads` | `DELETE /accounts/{accountId}/stream/{identifier}/downloads/{downloadType}` | Delete download |
| `client.api.streamMp4Downloads.streamDownloadsCreateTypeSpecificDownloads` | `POST /accounts/{accountId}/stream/{identifier}/downloads/{downloadType}` | Create download |

## resourceTagging

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.resourceTagging.tagsDelete` | `DELETE /accounts/{accountId}/tags` | Delete tags from an account-level resource |
| `client.api.resourceTagging.tagsGet` | `GET /accounts/{accountId}/tags` | Get tags for an account-level resource |
| `client.api.resourceTagging.tagsSet` | `PUT /accounts/{accountId}/tags` | Set tags for an account-level resource |
| `client.api.resourceTagging.tagsListKeys` | `GET /accounts/{accountId}/tags/keys` | List tag keys |
| `client.api.resourceTagging.tagsList` | `GET /accounts/{accountId}/tags/resources` | List tagged resources |
| `client.api.resourceTagging.tagsListKeySummary` | `GET /accounts/{accountId}/tags/summary` | List tag key summary |
| `client.api.resourceTagging.tagsListValues` | `GET /accounts/{accountId}/tags/values/{tagKey}` | List tag values |
| `client.api.resourceTagging.tagsZoneDelete` | `DELETE /zones/{zoneId}/tags` | Delete tags from a zone-level resource |
| `client.api.resourceTagging.tagsZoneGet` | `GET /zones/{zoneId}/tags` | Get tags for a zone-level resource |
| `client.api.resourceTagging.tagsZoneSet` | `PUT /zones/{zoneId}/tags` | Set tags for a zone-level resource |

## tunnelRouting

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.tunnelRouting.tunnelRouteListTunnelRoutes` | `GET /accounts/{accountId}/teamnet/routes` | List tunnel routes |
| `client.api.tunnelRouting.tunnelRouteCreateATunnelRoute` | `POST /accounts/{accountId}/teamnet/routes` | Create a tunnel route |
| `client.api.tunnelRouting.tunnelRouteGetTunnelRouteByIp` | `GET /accounts/{accountId}/teamnet/routes/ip/{ip}` | Get tunnel route by IP |
| `client.api.tunnelRouting.tunnelRouteDeleteATunnelRouteWithCidr` | `DELETE /accounts/{accountId}/teamnet/routes/network/{ipNetworkEncoded}` | Delete a tunnel route (CIDR Endpoint) |
| `client.api.tunnelRouting.tunnelRouteUpdateATunnelRouteWithCidr` | `PATCH /accounts/{accountId}/teamnet/routes/network/{ipNetworkEncoded}` | Update a tunnel route (CIDR Endpoint) |
| `client.api.tunnelRouting.tunnelRouteCreateATunnelRouteWithCidr` | `POST /accounts/{accountId}/teamnet/routes/network/{ipNetworkEncoded}` | Create a tunnel route (CIDR Endpoint) |
| `client.api.tunnelRouting.tunnelRouteDeleteATunnelRoute` | `DELETE /accounts/{accountId}/teamnet/routes/{routeId}` | Delete a tunnel route |
| `client.api.tunnelRouting.tunnelRouteGetTunnelRoute` | `GET /accounts/{accountId}/teamnet/routes/{routeId}` | Get tunnel route |
| `client.api.tunnelRouting.tunnelRouteUpdateATunnelRoute` | `PATCH /accounts/{accountId}/teamnet/routes/{routeId}` | Update a tunnel route |

## tunnelVirtualNetwork

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.tunnelVirtualNetwork.tunnelVirtualNetworkListVirtualNetworks` | `GET /accounts/{accountId}/teamnet/virtual_networks` | List virtual networks |
| `client.api.tunnelVirtualNetwork.tunnelVirtualNetworkCreateAVirtualNetwork` | `POST /accounts/{accountId}/teamnet/virtual_networks` | Create a virtual network |
| `client.api.tunnelVirtualNetwork.tunnelVirtualNetworkDelete` | `DELETE /accounts/{accountId}/teamnet/virtual_networks/{virtualNetworkId}` | Delete a virtual network |
| `client.api.tunnelVirtualNetwork.tunnelVirtualNetworkGet` | `GET /accounts/{accountId}/teamnet/virtual_networks/{virtualNetworkId}` | Get a virtual network |
| `client.api.tunnelVirtualNetwork.tunnelVirtualNetworkUpdate` | `PATCH /accounts/{accountId}/teamnet/virtual_networks/{virtualNetworkId}` | Update a virtual network |

## accountOwnedApiTokens

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountOwnedApiTokens.accountApiTokensListTokens` | `GET /accounts/{accountId}/tokens` | List Tokens |
| `client.api.accountOwnedApiTokens.accountApiTokensCreateToken` | `POST /accounts/{accountId}/tokens` | Create Token |
| `client.api.accountOwnedApiTokens.accountApiTokensListPermissionGroups` | `GET /accounts/{accountId}/tokens/permission_groups` | List Permission Groups |
| `client.api.accountOwnedApiTokens.accountApiTokensVerifyToken` | `GET /accounts/{accountId}/tokens/verify` | Verify Token |
| `client.api.accountOwnedApiTokens.accountApiTokensDeleteToken` | `DELETE /accounts/{accountId}/tokens/{tokenId}` | Delete Token |
| `client.api.accountOwnedApiTokens.accountApiTokensTokenDetails` | `GET /accounts/{accountId}/tokens/{tokenId}` | Token Details |
| `client.api.accountOwnedApiTokens.accountApiTokensUpdateToken` | `PUT /accounts/{accountId}/tokens/{tokenId}` | Update Token |
| `client.api.accountOwnedApiTokens.accountApiTokensRollToken` | `PUT /accounts/{accountId}/tokens/{tokenId}/value` | Roll Token |

## workflows

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workflows.worDeleteScriptTriggers` | `DELETE /accounts/{accountId}/triggers/{scriptName}` | Delete script triggers |
| `client.api.workflows.worGetScriptTriggers` | `GET /accounts/{accountId}/triggers/{scriptName}` | Get script triggers |
| `client.api.workflows.worAddScriptTriggers` | `PATCH /accounts/{accountId}/triggers/{scriptName}` | Add script triggers |
| `client.api.workflows.worReplaceScriptTriggers` | `PUT /accounts/{accountId}/triggers/{scriptName}` | Replace script triggers |
| `client.api.workflows.worListWorkflows` | `GET /accounts/{accountId}/workflows` | List all Workflows |
| `client.api.workflows.worListConcurrencyKeys` | `GET /accounts/{accountId}/workflows/concurrency` | List concurrency keys |
| `client.api.workflows.worCreateConcurrencyKey` | `POST /accounts/{accountId}/workflows/concurrency` | Create a concurrency key |
| `client.api.workflows.worDeleteConcurrencyKey` | `DELETE /accounts/{accountId}/workflows/concurrency/{keyId}` | Delete a concurrency key |
| `client.api.workflows.worGetConcurrencyKey` | `GET /accounts/{accountId}/workflows/concurrency/{keyId}` | Get concurrency key details |
| `client.api.workflows.worUpdateConcurrencyKey` | `PATCH /accounts/{accountId}/workflows/concurrency/{keyId}` | Update a concurrency key |
| `client.api.workflows.worGetWorkflowSettings` | `GET /accounts/{accountId}/workflows/settings` | Get account settings |
| `client.api.workflows.worUpdateWorkflowSettings` | `PATCH /accounts/{accountId}/workflows/settings` | Update account settings |
| `client.api.workflows.worDeleteWorkflow` | `DELETE /accounts/{accountId}/workflows/{workflowName}` | Deletes a Workflow |
| `client.api.workflows.worGetWorkflowDetails` | `GET /accounts/{accountId}/workflows/{workflowName}` | Get Workflow details |
| `client.api.workflows.worCreateOrModifyWorkflow` | `PUT /accounts/{accountId}/workflows/{workflowName}` | Create/modify Workflow |
| `client.api.workflows.worListWorkflowInstances` | `GET /accounts/{accountId}/workflows/{workflowName}/instances` | List of workflow instances |
| `client.api.workflows.worCreateNewWorkflowInstance` | `POST /accounts/{accountId}/workflows/{workflowName}/instances` | Create a new workflow instance |
| `client.api.workflows.worBatchCreateWorkflowInstance` | `POST /accounts/{accountId}/workflows/{workflowName}/instances/batch` | Batch create new Workflow instances |
| `client.api.workflows.worBatchDeleteWorkflowInstances` | `POST /accounts/{accountId}/workflows/{workflowName}/instances/batch/delete` | Batch delete instances of a workflow |
| `client.api.workflows.worBatchTerminateWorkflowInstances` | `POST /accounts/{accountId}/workflows/{workflowName}/instances/batch/terminate` | Batch terminate instances of a workflow |
| `client.api.workflows.worStatusTerminateWorkflowInstances` | `GET /accounts/{accountId}/workflows/{workflowName}/instances/terminate` | Get status of the job responsible for terminate all instances of a workflow |
| `client.api.workflows.worDeleteWorkflowInstance` | `DELETE /accounts/{accountId}/workflows/{workflowName}/instances/{instanceId}` | Delete a workflow instance |
| `client.api.workflows.worDescribeWorkflowInstance` | `GET /accounts/{accountId}/workflows/{workflowName}/instances/{instanceId}` | Get logs and status from instance |
| `client.api.workflows.worSendEventWorkflowInstance` | `POST /accounts/{accountId}/workflows/{workflowName}/instances/{instanceId}/events/{eventType}` | Send event to instance |
| `client.api.workflows.worChangeStatusWorkflowInstance` | `PATCH /accounts/{accountId}/workflows/{workflowName}/instances/{instanceId}/status` | Change status of instance |
| `client.api.workflows.worGetWorkflowInstanceStep` | `GET /accounts/{accountId}/workflows/{workflowName}/instances/{instanceId}/step` | Get full step output from instance |
| `client.api.workflows.worCreateWorkflowInstanceSubscriptionToken` | `GET /accounts/{accountId}/workflows/{workflowName}/instances/{instanceId}/subscribe/token` | Create a workflow instance event subscription token |
| `client.api.workflows.worListWorkflowVersions` | `GET /accounts/{accountId}/workflows/{workflowName}/versions` | List deployed Workflow versions |
| `client.api.workflows.worDescribeWorkflowVersions` | `GET /accounts/{accountId}/workflows/{workflowName}/versions/{versionId}` | Get Workflow version details |
| `client.api.workflows.worDescribeWorkflowVersionsDag` | `GET /accounts/{accountId}/workflows/{workflowName}/versions/{versionId}/dag` | Get Workflow version dag |
| `client.api.workflows.worDescribeWorkflowVersionsGraph` | `GET /accounts/{accountId}/workflows/{workflowName}/versions/{versionId}/graph` | Get Workflow version graph |

## urlScannerDeprecated

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.urlScannerDeprecated.urlscannerGetResponseText` | `GET /accounts/{accountId}/urlscanner/response/{responseId}` | Get raw response |
| `client.api.urlScannerDeprecated.urlscannerSearchScans` | `GET /accounts/{accountId}/urlscanner/scan` | Search URL scans |
| `client.api.urlScannerDeprecated.urlscannerCreateScan` | `POST /accounts/{accountId}/urlscanner/scan` | Create URL Scan |
| `client.api.urlScannerDeprecated.urlscannerGetScan` | `GET /accounts/{accountId}/urlscanner/scan/{scanId}` | Get URL scan |
| `client.api.urlScannerDeprecated.urlscannerGetScanHar` | `GET /accounts/{accountId}/urlscanner/scan/{scanId}/har` | Get URL scan's HAR |
| `client.api.urlScannerDeprecated.urlscannerGetScanScreenshot` | `GET /accounts/{accountId}/urlscanner/scan/{scanId}/screenshot` | Get screenshot |

## urlScanner

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.urlScanner.urlscannerCreateScanBulkV2` | `POST /accounts/{accountId}/urlscanner/v2/bulk` | Bulk create URL Scans |
| `client.api.urlScanner.urlscannerGetScanDomV2` | `GET /accounts/{accountId}/urlscanner/v2/dom/{scanId}` | Get URL scan's DOM |
| `client.api.urlScanner.urlscannerGetScanHarV2` | `GET /accounts/{accountId}/urlscanner/v2/har/{scanId}` | Get URL scan's HAR |
| `client.api.urlScanner.urlscannerGetResponseV2` | `GET /accounts/{accountId}/urlscanner/v2/responses/{responseId}` | Get raw response |
| `client.api.urlScanner.urlscannerGetScanV2` | `GET /accounts/{accountId}/urlscanner/v2/result/{scanId}` | Get URL scan |
| `client.api.urlScanner.urlscannerCreateScanV2` | `POST /accounts/{accountId}/urlscanner/v2/scan` | Create URL Scan |
| `client.api.urlScanner.urlscannerGetScanScreenshotV2` | `GET /accounts/{accountId}/urlscanner/v2/screenshots/{scanId}.png` | Get screenshot |
| `client.api.urlScanner.urlscannerSearchScansV2` | `GET /accounts/{accountId}/urlscanner/v2/search` | Search URL scans |

## vectorizeBetaDeprecated

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.vectorizeBetaDeprecated.vectorizeDeprecatedListVectorizeIndexes` | `GET /accounts/{accountId}/vectorize/indexes` | List Vectorize Indexes (Deprecated) |
| `client.api.vectorizeBetaDeprecated.vectorizeDeprecatedCreateVectorizeIndex` | `POST /accounts/{accountId}/vectorize/indexes` | Create Vectorize Index (Deprecated) |
| `client.api.vectorizeBetaDeprecated.vectorizeDeprecatedDeleteVectorizeIndex` | `DELETE /accounts/{accountId}/vectorize/indexes/{indexName}` | Delete Vectorize Index (Deprecated) |
| `client.api.vectorizeBetaDeprecated.vectorizeDeprecatedGetVectorizeIndex` | `GET /accounts/{accountId}/vectorize/indexes/{indexName}` | Get Vectorize Index (Deprecated) |
| `client.api.vectorizeBetaDeprecated.vectorizeDeprecatedUpdateVectorizeIndex` | `PUT /accounts/{accountId}/vectorize/indexes/{indexName}` | Update Vectorize Index (Deprecated) |
| `client.api.vectorizeBetaDeprecated.vectorizeDeprecatedDeleteVectorsById` | `POST /accounts/{accountId}/vectorize/indexes/{indexName}/delete-by-ids` | Delete Vectors By Identifier (Deprecated) |
| `client.api.vectorizeBetaDeprecated.vectorizeDeprecatedGetVectorsById` | `POST /accounts/{accountId}/vectorize/indexes/{indexName}/get-by-ids` | Get Vectors By Identifier (Deprecated) |
| `client.api.vectorizeBetaDeprecated.vectorizeDeprecatedInsertVector` | `POST /accounts/{accountId}/vectorize/indexes/{indexName}/insert` | Insert Vectors (Deprecated) |
| `client.api.vectorizeBetaDeprecated.vectorizeDeprecatedQueryVector` | `POST /accounts/{accountId}/vectorize/indexes/{indexName}/query` | Query Vectors (Deprecated) |
| `client.api.vectorizeBetaDeprecated.vectorizeDeprecatedUpsertVector` | `POST /accounts/{accountId}/vectorize/indexes/{indexName}/upsert` | Upsert Vectors (Deprecated) |

## vectorize

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.vectorize.vectorizeListVectorizeIndexes` | `GET /accounts/{accountId}/vectorize/v2/indexes` | List Vectorize Indexes |
| `client.api.vectorize.vectorizeCreateVectorizeIndex` | `POST /accounts/{accountId}/vectorize/v2/indexes` | Create Vectorize Index |
| `client.api.vectorize.vectorizeDeleteVectorizeIndex` | `DELETE /accounts/{accountId}/vectorize/v2/indexes/{indexName}` | Delete Vectorize Index |
| `client.api.vectorize.vectorizeGetVectorizeIndex` | `GET /accounts/{accountId}/vectorize/v2/indexes/{indexName}` | Get Vectorize Index |
| `client.api.vectorize.vectorizeDeleteVectorsById` | `POST /accounts/{accountId}/vectorize/v2/indexes/{indexName}/delete_by_ids` | Delete Vectors By Identifier |
| `client.api.vectorize.vectorizeGetVectorsById` | `POST /accounts/{accountId}/vectorize/v2/indexes/{indexName}/get_by_ids` | Get Vectors By Identifier |
| `client.api.vectorize.vectorizeIndexInfo` | `GET /accounts/{accountId}/vectorize/v2/indexes/{indexName}/info` | Get Vectorize Index Info |
| `client.api.vectorize.vectorizeInsertVector` | `POST /accounts/{accountId}/vectorize/v2/indexes/{indexName}/insert` | Insert Vectors |
| `client.api.vectorize.vectorizeListVectors` | `GET /accounts/{accountId}/vectorize/v2/indexes/{indexName}/list` | List Vectors |
| `client.api.vectorize.vectorizeCreateMetadataIndex` | `POST /accounts/{accountId}/vectorize/v2/indexes/{indexName}/metadata_index/create` | Create Metadata Index |
| `client.api.vectorize.vectorizeDeleteMetadataIndex` | `POST /accounts/{accountId}/vectorize/v2/indexes/{indexName}/metadata_index/delete` | Delete Metadata Index |
| `client.api.vectorize.vectorizeListMetadataIndexes` | `GET /accounts/{accountId}/vectorize/v2/indexes/{indexName}/metadata_index/list` | List Metadata Indexes |
| `client.api.vectorize.vectorizeQueryVector` | `POST /accounts/{accountId}/vectorize/v2/indexes/{indexName}/query` | Query Vectors |
| `client.api.vectorize.vectorizeUpsertVector` | `POST /accounts/{accountId}/vectorize/v2/indexes/{indexName}/upsert` | Upsert Vectors |

## credentialSets

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.credentialSets.listCredentialSets` | `GET /accounts/{accountId}/vuln_scanner/credential_sets` | List credential sets |
| `client.api.credentialSets.createCredentialSet` | `POST /accounts/{accountId}/vuln_scanner/credential_sets` | Create credential set |
| `client.api.credentialSets.deleteCredentialSet` | `DELETE /accounts/{accountId}/vuln_scanner/credential_sets/{credentialSetId}` | Delete credential set |
| `client.api.credentialSets.getCredentialSet` | `GET /accounts/{accountId}/vuln_scanner/credential_sets/{credentialSetId}` | Get credential set |
| `client.api.credentialSets.editCredentialSet` | `PATCH /accounts/{accountId}/vuln_scanner/credential_sets/{credentialSetId}` | Edit credential set |
| `client.api.credentialSets.updateCredentialSet` | `PUT /accounts/{accountId}/vuln_scanner/credential_sets/{credentialSetId}` | Update credential set |

## credentials

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.credentials.listCredentials` | `GET /accounts/{accountId}/vuln_scanner/credential_sets/{credentialSetId}/credentials` | List credentials |
| `client.api.credentials.createCredential` | `POST /accounts/{accountId}/vuln_scanner/credential_sets/{credentialSetId}/credentials` | Create credential |
| `client.api.credentials.deleteCredential` | `DELETE /accounts/{accountId}/vuln_scanner/credential_sets/{credentialSetId}/credentials/{credentialId}` | Delete credential |
| `client.api.credentials.getCredential` | `GET /accounts/{accountId}/vuln_scanner/credential_sets/{credentialSetId}/credentials/{credentialId}` | Get credential |
| `client.api.credentials.editCredential` | `PATCH /accounts/{accountId}/vuln_scanner/credential_sets/{credentialSetId}/credentials/{credentialId}` | Edit credential |
| `client.api.credentials.updateCredential` | `PUT /accounts/{accountId}/vuln_scanner/credential_sets/{credentialSetId}/credentials/{credentialId}` | Update credential |

## targetEnvironments

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.targetEnvironments.listTargetEnvironments` | `GET /accounts/{accountId}/vuln_scanner/target_environments` | List target environments |
| `client.api.targetEnvironments.createTargetEnvironment` | `POST /accounts/{accountId}/vuln_scanner/target_environments` | Create target environment |
| `client.api.targetEnvironments.deleteTargetEnvironment` | `DELETE /accounts/{accountId}/vuln_scanner/target_environments/{targetEnvironmentId}` | Delete target environment |
| `client.api.targetEnvironments.getTargetEnvironment` | `GET /accounts/{accountId}/vuln_scanner/target_environments/{targetEnvironmentId}` | Get target environment |
| `client.api.targetEnvironments.editTargetEnvironment` | `PATCH /accounts/{accountId}/vuln_scanner/target_environments/{targetEnvironmentId}` | Edit target environment |
| `client.api.targetEnvironments.updateTargetEnvironment` | `PUT /accounts/{accountId}/vuln_scanner/target_environments/{targetEnvironmentId}` | Update target environment |

## waitingRoom

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.waitingRoom.waitingRoomListWaitingRoomsAccount` | `GET /accounts/{accountId}/waiting_rooms` | List waiting rooms for account |
| `client.api.waitingRoom.waitingRoomListWaitingRooms` | `GET /zones/{zoneId}/waiting_rooms` | List waiting rooms for zone |
| `client.api.waitingRoom.waitingRoomCreateWaitingRoom` | `POST /zones/{zoneId}/waiting_rooms` | Create waiting room |
| `client.api.waitingRoom.waitingRoomCreateACustomWaitingRoomPagePreview` | `POST /zones/{zoneId}/waiting_rooms/preview` | Create a custom waiting room page preview |
| `client.api.waitingRoom.waitingRoomGetZoneSettings` | `GET /zones/{zoneId}/waiting_rooms/settings` | Get zone-level Waiting Room settings |
| `client.api.waitingRoom.waitingRoomPatchZoneSettings` | `PATCH /zones/{zoneId}/waiting_rooms/settings` | Patch zone-level Waiting Room settings |
| `client.api.waitingRoom.waitingRoomUpdateZoneSettings` | `PUT /zones/{zoneId}/waiting_rooms/settings` | Update zone-level Waiting Room settings |
| `client.api.waitingRoom.waitingRoomDeleteWaitingRoom` | `DELETE /zones/{zoneId}/waiting_rooms/{waitingRoomId}` | Delete waiting room |
| `client.api.waitingRoom.waitingRoomWaitingRoomDetails` | `GET /zones/{zoneId}/waiting_rooms/{waitingRoomId}` | Waiting room details |
| `client.api.waitingRoom.waitingRoomPatchWaitingRoom` | `PATCH /zones/{zoneId}/waiting_rooms/{waitingRoomId}` | Patch waiting room |
| `client.api.waitingRoom.waitingRoomUpdateWaitingRoom` | `PUT /zones/{zoneId}/waiting_rooms/{waitingRoomId}` | Update waiting room |
| `client.api.waitingRoom.waitingRoomListEvents` | `GET /zones/{zoneId}/waiting_rooms/{waitingRoomId}/events` | List events |
| `client.api.waitingRoom.waitingRoomCreateEvent` | `POST /zones/{zoneId}/waiting_rooms/{waitingRoomId}/events` | Create event |
| `client.api.waitingRoom.waitingRoomDeleteEvent` | `DELETE /zones/{zoneId}/waiting_rooms/{waitingRoomId}/events/{eventId}` | Delete event |
| `client.api.waitingRoom.waitingRoomEventDetails` | `GET /zones/{zoneId}/waiting_rooms/{waitingRoomId}/events/{eventId}` | Event details |
| `client.api.waitingRoom.waitingRoomPatchEvent` | `PATCH /zones/{zoneId}/waiting_rooms/{waitingRoomId}/events/{eventId}` | Patch event |
| `client.api.waitingRoom.waitingRoomUpdateEvent` | `PUT /zones/{zoneId}/waiting_rooms/{waitingRoomId}/events/{eventId}` | Update event |
| `client.api.waitingRoom.waitingRoomPreviewActiveEventDetails` | `GET /zones/{zoneId}/waiting_rooms/{waitingRoomId}/events/{eventId}/details` | Preview active event details |
| `client.api.waitingRoom.waitingRoomListWaitingRoomRules` | `GET /zones/{zoneId}/waiting_rooms/{waitingRoomId}/rules` | List Waiting Room Rules |
| `client.api.waitingRoom.waitingRoomCreateWaitingRoomRule` | `POST /zones/{zoneId}/waiting_rooms/{waitingRoomId}/rules` | Create Waiting Room Rule |
| `client.api.waitingRoom.waitingRoomReplaceWaitingRoomRules` | `PUT /zones/{zoneId}/waiting_rooms/{waitingRoomId}/rules` | Replace Waiting Room Rules |
| `client.api.waitingRoom.waitingRoomDeleteWaitingRoomRule` | `DELETE /zones/{zoneId}/waiting_rooms/{waitingRoomId}/rules/{ruleId}` | Delete Waiting Room Rule |
| `client.api.waitingRoom.waitingRoomPatchWaitingRoomRule` | `PATCH /zones/{zoneId}/waiting_rooms/{waitingRoomId}/rules/{ruleId}` | Patch Waiting Room Rule |
| `client.api.waitingRoom.waitingRoomGetWaitingRoomStatus` | `GET /zones/{zoneId}/waiting_rooms/{waitingRoomId}/status` | Get waiting room status |

## workersAccountSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workersAccountSettings.workerAccountSettingsFetchWorkerAccountSettings` | `GET /accounts/{accountId}/workers/account-settings` | Fetch Workers Account Settings |
| `client.api.workersAccountSettings.workerAccountSettingsCreateWorkerAccountSettings` | `PUT /accounts/{accountId}/workers/account-settings` | Configure Workers Account Settings |

## workerScript

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workerScript.workerAssetsUpload` | `POST /accounts/{accountId}/workers/assets/upload` | Upload Worker Assets |
| `client.api.workerScript.workerScriptListWorkers` | `GET /accounts/{accountId}/workers/scripts` | List Worker Scripts |
| `client.api.workerScript.workerScriptSearchWorkers` | `GET /accounts/{accountId}/workers/scripts-search` | Search Worker Scripts |
| `client.api.workerScript.workerScriptDeleteWorker` | `DELETE /accounts/{accountId}/workers/scripts/{scriptName}` | Delete Worker |
| `client.api.workerScript.workerScriptDownloadWorker` | `GET /accounts/{accountId}/workers/scripts/{scriptName}` | Download Worker Script |
| `client.api.workerScript.workerScriptUploadWorkerModule` | `PUT /accounts/{accountId}/workers/scripts/{scriptName}` | Upload Worker |
| `client.api.workerScript.workerScriptUpdateCreateAssetsUploadSession` | `POST /accounts/{accountId}/workers/scripts/{scriptName}/assets-upload-session` | Create Worker Assets Upload Session |
| `client.api.workerScript.workerScriptPutContent` | `PUT /accounts/{accountId}/workers/scripts/{scriptName}/content` | Replace Worker Script Content |
| `client.api.workerScript.workerScriptGetContent` | `GET /accounts/{accountId}/workers/scripts/{scriptName}/content/v2` | Get Worker Script Content |
| `client.api.workerScript.workerScriptSettingsGetSettings` | `GET /accounts/{accountId}/workers/scripts/{scriptName}/script-settings` | Get Worker Script Settings |
| `client.api.workerScript.workerScriptSettingsPatchSettings` | `PATCH /accounts/{accountId}/workers/scripts/{scriptName}/script-settings` | Patch Worker Script Settings |
| `client.api.workerScript.workerListScriptSecrets` | `GET /accounts/{accountId}/workers/scripts/{scriptName}/secrets` | List secrets bound to a Worker script |
| `client.api.workerScript.workerPutScriptSecret` | `PUT /accounts/{accountId}/workers/scripts/{scriptName}/secrets` | Add a secret to a Worker script |
| `client.api.workerScript.workerPatchScriptSecretsBulk` | `PATCH /accounts/{accountId}/workers/scripts/{scriptName}/secrets-bulk` | Patch multiple Worker script secrets |
| `client.api.workerScript.workerDeleteScriptSecret` | `DELETE /accounts/{accountId}/workers/scripts/{scriptName}/secrets/{secretName}` | Delete Worker script secret |
| `client.api.workerScript.workerGetScriptSecret` | `GET /accounts/{accountId}/workers/scripts/{scriptName}/secrets/{secretName}` | Get a secret binding |
| `client.api.workerScript.workerScriptGetSettings` | `GET /accounts/{accountId}/workers/scripts/{scriptName}/settings` | Get Worker Script and Version Settings |
| `client.api.workerScript.workerScriptPatchSettings` | `PATCH /accounts/{accountId}/workers/scripts/{scriptName}/settings` | Patch Worker Script and Version Settings |
| `client.api.workerScript.workerScriptDeleteSubdomain` | `DELETE /accounts/{accountId}/workers/scripts/{scriptName}/subdomain` | Delete Worker Script Subdomain |
| `client.api.workerScript.workerScriptGetSubdomain` | `GET /accounts/{accountId}/workers/scripts/{scriptName}/subdomain` | Get Worker Script Subdomain |
| `client.api.workerScript.workerScriptPostSubdomain` | `POST /accounts/{accountId}/workers/scripts/{scriptName}/subdomain` | Update Worker Script Subdomain |
| `client.api.workerScript.workerScriptFetchUsageModel` | `GET /accounts/{accountId}/workers/scripts/{scriptName}/usage-model` | Get Worker Script Usage Model |
| `client.api.workerScript.workerScriptUpdateUsageModel` | `PUT /accounts/{accountId}/workers/scripts/{scriptName}/usage-model` | Replace Worker Script Usage Model |

## workersForPlatforms

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workersForPlatforms.namespaceWorkerList` | `GET /accounts/{accountId}/workers/dispatch/namespaces` | List Workers for Platforms Dispatch Namespaces |
| `client.api.workersForPlatforms.namespaceWorkerCreate` | `POST /accounts/{accountId}/workers/dispatch/namespaces` | Create Workers for Platforms Dispatch Namespace |
| `client.api.workersForPlatforms.namespaceWorkerDeleteNamespace` | `DELETE /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}` | Delete Workers for Platforms Dispatch Namespace |
| `client.api.workersForPlatforms.namespaceWorkerGetNamespace` | `GET /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}` | Get Workers for Platforms Dispatch Namespace |
| `client.api.workersForPlatforms.namespaceWorkerPatchNamespace` | `PATCH /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}` | Patch Workers for Platforms Dispatch Namespace |
| `client.api.workersForPlatforms.namespaceWorkerPutNamespace` | `PUT /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}` | Update Workers for Platforms Dispatch Namespace |
| `client.api.workersForPlatforms.namespaceWorkerDeleteScripts` | `DELETE /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts` | Delete Workers for Platforms Scripts |
| `client.api.workersForPlatforms.namespaceWorkerListScripts` | `GET /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts` | List Workers for Platforms Scripts |
| `client.api.workersForPlatforms.namespaceWorkerScriptDeleteWorker` | `DELETE /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}` | Delete Workers for Platforms Script |
| `client.api.workersForPlatforms.namespaceWorkerScriptWorkerDetails` | `GET /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}` | Get Workers for Platforms Script details |
| `client.api.workersForPlatforms.namespaceWorkerScriptUploadWorkerModule` | `PUT /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}` | Upload Workers for Platforms Script |
| `client.api.workersForPlatforms.namespaceWorkerScriptUpdateCreateAssetsUploadSession` | `POST /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/assets-upload-session` | Create Workers for Platforms Assets Upload Session |
| `client.api.workersForPlatforms.namespaceWorkerGetScriptBindings` | `GET /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/bindings` | Get Workers for Platforms Script Bindings |
| `client.api.workersForPlatforms.namespaceWorkerGetScriptContent` | `GET /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/content` | Get Workers for Platforms Script Content |
| `client.api.workersForPlatforms.namespaceWorkerPutScriptContent` | `PUT /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/content` | Replace Workers for Platforms Script Content |
| `client.api.workersForPlatforms.namespaceWorkerListScriptSecrets` | `GET /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/secrets` | List Workers for Platforms Script Secrets |
| `client.api.workersForPlatforms.namespaceWorkerPutScriptSecrets` | `PUT /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/secrets` | Add a secret to a Workers for Platforms script |
| `client.api.workersForPlatforms.namespaceWorkerPatchScriptSecretsBulk` | `PATCH /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/secrets-bulk` | Patch multiple Workers for Platforms script secrets |
| `client.api.workersForPlatforms.namespaceWorkerDeleteScriptSecret` | `DELETE /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/secrets/{secretName}` | Delete Workers for Platforms script secret |
| `client.api.workersForPlatforms.namespaceWorkerGetScriptSecrets` | `GET /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/secrets/{secretName}` | Get Workers for Platforms Script Secret |
| `client.api.workersForPlatforms.namespaceWorkerGetScriptSettings` | `GET /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/settings` | Get Workers for Platforms Script Settings |
| `client.api.workersForPlatforms.namespaceWorkerPatchScriptSettings` | `PATCH /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/settings` | Patch Workers for Platforms Script Settings |
| `client.api.workersForPlatforms.namespaceWorkerGetScriptTags` | `GET /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/tags` | List Workers for Platforms Script Tags |
| `client.api.workersForPlatforms.namespaceWorkerPutScriptTags` | `PUT /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/tags` | Replace Workers for Platforms Script Tags |
| `client.api.workersForPlatforms.namespaceWorkerDeleteScriptTag` | `DELETE /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/tags/{tag}` | Delete Workers for Platforms Script Tag |
| `client.api.workersForPlatforms.namespaceWorkerPatchScriptTag` | `PATCH /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/tags/{tag}` | Update Workers for Platforms Script Tag |
| `client.api.workersForPlatforms.namespaceWorkerPutScriptTag` | `PUT /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/tags/{tag}` | Create Workers for Platforms Script Tag |

## domains

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.domains.workersDomainsList` | `GET /accounts/{accountId}/workers/domains` | List Worker Domains |
| `client.api.domains.workersDomainsUpdate` | `PUT /accounts/{accountId}/workers/domains` | Attach Worker Domain |
| `client.api.domains.workersDomainsDelete` | `DELETE /accounts/{accountId}/workers/domains/{domainId}` | Detach Worker Domain |
| `client.api.domains.workersDomainsGet` | `GET /accounts/{accountId}/workers/domains/{domainId}` | Get Worker Domain |

## durableObjectsNamespace

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.durableObjectsNamespace.durableObjectsNamespaceListNamespaces` | `GET /accounts/{accountId}/workers/durable_objects/namespaces` | List Durable Object Namespaces |
| `client.api.durableObjectsNamespace.durableObjectsNamespaceListObjects` | `GET /accounts/{accountId}/workers/durable_objects/namespaces/{id}/objects` | List Objects in a Durable Object namespace |
| `client.api.durableObjectsNamespace.durableObjectsNamespaceQuery` | `POST /accounts/{accountId}/workers/durable_objects/namespaces/{id}/query/v2` | Query a Durable Object |

## agents

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.agents.agentsTracesList` | `GET /accounts/{accountId}/workers/observability/agents/traces` | List Agent Traces |
| `client.api.agents.agentsTracesGet` | `GET /accounts/{accountId}/workers/observability/agents/traces/{traceId}` | Get an Agent Trace |
| `client.api.agents.agentsTracesEvents` | `GET /accounts/{accountId}/workers/observability/agents/traces/{traceId}/events` | List Agent Trace events |

## destinations

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.destinations.destinationList` | `GET /accounts/{accountId}/workers/observability/destinations` | Get Destinations |
| `client.api.destinations.destinationCreate` | `POST /accounts/{accountId}/workers/observability/destinations` | Create Destination |
| `client.api.destinations.destinationsDelete` | `DELETE /accounts/{accountId}/workers/observability/destinations/{slug}` | Delete Destination |
| `client.api.destinations.destinationUpdate` | `PATCH /accounts/{accountId}/workers/observability/destinations/{slug}` | Update Destination |

## issues

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.issues.issuesList` | `GET /accounts/{accountId}/workers/observability/issues` | List detected issues |
| `client.api.issues.issuesAutomationsList` | `GET /accounts/{accountId}/workers/observability/issues/automations` | List issue automations |
| `client.api.issues.issuesAutomationsCreate` | `POST /accounts/{accountId}/workers/observability/issues/automations` | Create an issue automation |
| `client.api.issues.issuesAutomationsDelete` | `DELETE /accounts/{accountId}/workers/observability/issues/automations/{automationId}` | Delete an issue automation |
| `client.api.issues.issuesAutomationsGet` | `GET /accounts/{accountId}/workers/observability/issues/automations/{automationId}` | Get an issue automation |
| `client.api.issues.issuesAutomationsUpdate` | `PUT /accounts/{accountId}/workers/observability/issues/automations/{automationId}` | Update an issue automation |
| `client.api.issues.issuesGroupsCreate` | `POST /accounts/{accountId}/workers/observability/issues/groups` | Create an issue group |
| `client.api.issues.issuesGroupsDelete` | `DELETE /accounts/{accountId}/workers/observability/issues/groups/{groupId}` | Dissolve an issue group |
| `client.api.issues.issuesGroupsMembersAdd` | `POST /accounts/{accountId}/workers/observability/issues/groups/{groupId}/members` | Add issue group members |
| `client.api.issues.issuesGroupsMembersRemove` | `DELETE /accounts/{accountId}/workers/observability/issues/groups/{groupId}/members/{issueId}` | Remove an issue group member |
| `client.api.issues.issuesSummary` | `GET /accounts/{accountId}/workers/observability/issues/summary` | Summarize detected issues |
| `client.api.issues.issuesGet` | `GET /accounts/{accountId}/workers/observability/issues/{issueId}` | Get an issue |
| `client.api.issues.issuesPatch` | `PATCH /accounts/{accountId}/workers/observability/issues/{issueId}` | Modify an issue |
| `client.api.issues.issuesNotificationRunsCreate` | `POST /accounts/{accountId}/workers/observability/issues/{issueId}/notification-runs` | Notify about an issue |
| `client.api.issues.issuesOccurrencesList` | `GET /accounts/{accountId}/workers/observability/issues/{issueId}/occurrences` | List issue occurrences |

## metricsExport

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.metricsExport.metricsExportList` | `GET /accounts/{accountId}/workers/observability/metricsexport` | List Metrics Exports |
| `client.api.metricsExport.metricsExportUpsert` | `POST /accounts/{accountId}/workers/observability/metricsexport` | Upsert Metrics Exports |

## savedQueries

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.savedQueries.queriesList` | `GET /accounts/{accountId}/workers/observability/queries` | List queries |
| `client.api.savedQueries.queriesPost` | `POST /accounts/{accountId}/workers/observability/queries` | Save query |
| `client.api.savedQueries.queriesDelete` | `DELETE /accounts/{accountId}/workers/observability/queries/{queryId}` | Delete query |
| `client.api.savedQueries.queriesGet` | `GET /accounts/{accountId}/workers/observability/queries/{queryId}` | Get query |
| `client.api.savedQueries.queriesPatch` | `PATCH /accounts/{accountId}/workers/observability/queries/{queryId}` | Update query |

## shared

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.shared.sharedQueryPost` | `POST /accounts/{accountId}/workers/observability/shared/query` | Create a sharable link to a query result |
| `client.api.shared.sharedQueryGet` | `GET /accounts/{accountId}/workers/observability/shared/query/{id}` | View a query that has been shared |

## query

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.query.sharedQueryPost` | `POST /accounts/{accountId}/workers/observability/shared/query` | Create a sharable link to a query result |
| `client.api.query.sharedQueryGet` | `GET /accounts/{accountId}/workers/observability/shared/query/{id}` | View a query that has been shared |

## keys

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.keys.telemetryKeysList` | `POST /accounts/{accountId}/workers/observability/telemetry/keys` | List keys |

## liveTail

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.liveTail.telemetryLiveTailPost` | `POST /accounts/{accountId}/workers/observability/telemetry/live-tail` | Prepare live tail |
| `client.api.liveTail.telemetryLiveTailHeartbeatGet` | `POST /accounts/{accountId}/workers/observability/telemetry/live-tail/heartbeat` | Live tail heartbeat |

## queryRun

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.queryRun.telemetryQuery` | `POST /accounts/{accountId}/workers/observability/telemetry/query` | Run a query |

## values

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.values.telemetryValuesList` | `POST /accounts/{accountId}/workers/observability/telemetry/values` | List values |

## usage

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.usage.usageGet` | `GET /accounts/{accountId}/workers/observability/usage` | Get event count |

## workersSmartPlacement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workersSmartPlacement.workerPlacementListRegions` | `GET /accounts/{accountId}/workers/placement/regions` | List Workers Smart Placement Regions |

## workerDeployments

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workerDeployments.workerDeploymentsListDeployments` | `GET /accounts/{accountId}/workers/scripts/{scriptName}/deployments` | List Worker Deployments |
| `client.api.workerDeployments.workerDeploymentsCreateDeployment` | `POST /accounts/{accountId}/workers/scripts/{scriptName}/deployments` | Create Worker Deployment |
| `client.api.workerDeployments.workerDeploymentsDeleteDeployment` | `DELETE /accounts/{accountId}/workers/scripts/{scriptName}/deployments/{deploymentId}` | Delete Worker Deployment |
| `client.api.workerDeployments.workerDeploymentsGetDeployment` | `GET /accounts/{accountId}/workers/scripts/{scriptName}/deployments/{deploymentId}` | Get Worker Deployment |

## workerCronTrigger

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workerCronTrigger.workerCronTriggerGetCronTriggers` | `GET /accounts/{accountId}/workers/scripts/{scriptName}/schedules` | Get Worker Script Schedules (Cron Triggers) |
| `client.api.workerCronTrigger.workerCronTriggerUpdateCronTriggers` | `PUT /accounts/{accountId}/workers/scripts/{scriptName}/schedules` | Update Worker Script Schedules (Cron Triggers) |

## workerTailLogs

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workerTailLogs.workerTailLogsListTails` | `GET /accounts/{accountId}/workers/scripts/{scriptName}/tails` | List Worker Tails |
| `client.api.workerTailLogs.workerTailLogsStartTail` | `POST /accounts/{accountId}/workers/scripts/{scriptName}/tails` | Start Worker Tail |
| `client.api.workerTailLogs.workerTailLogsDeleteTail` | `DELETE /accounts/{accountId}/workers/scripts/{scriptName}/tails/{id}` | Delete Worker Tail |

## workerVersions

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workerVersions.workerVersionsListVersions` | `GET /accounts/{accountId}/workers/scripts/{scriptName}/versions` | List Versions |
| `client.api.workerVersions.workerVersionsUploadVersion` | `POST /accounts/{accountId}/workers/scripts/{scriptName}/versions` | Upload Version |
| `client.api.workerVersions.workerVersionsGetVersionDetail` | `GET /accounts/{accountId}/workers/scripts/{scriptName}/versions/{versionId}` | Get Worker Script Version |

## workerEnvironment

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workerEnvironment.workerEnvironmentGetScriptContent` | `GET /accounts/{accountId}/workers/services/{serviceName}/environments/{environmentName}/content` | Get Worker Environment Script Content |
| `client.api.workerEnvironment.workerEnvironmentPutScriptContent` | `PUT /accounts/{accountId}/workers/services/{serviceName}/environments/{environmentName}/content` | Replace Worker Environment Script Content |
| `client.api.workerEnvironment.workerScriptEnvironmentGetSettings` | `GET /accounts/{accountId}/workers/services/{serviceName}/environments/{environmentName}/settings` | Get Worker Environment Settings |
| `client.api.workerEnvironment.workerScriptEnvironmentPatchSettings` | `PATCH /accounts/{accountId}/workers/services/{serviceName}/environments/{environmentName}/settings` | Patch Worker Environment Settings |

## workerSubdomain

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workerSubdomain.workerSubdomainDeleteSubdomain` | `DELETE /accounts/{accountId}/workers/subdomain` | Delete Workers Subdomain |
| `client.api.workerSubdomain.workerSubdomainGetSubdomain` | `GET /accounts/{accountId}/workers/subdomain` | Get a Workers Subdomain |
| `client.api.workerSubdomain.workerSubdomainCreateSubdomain` | `PUT /accounts/{accountId}/workers/subdomain` | Create a Workers Subdomain |

## previews

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.previews.workersPreviewsList` | `GET /accounts/{accountId}/workers/workers/{workerId}/previews` | List Previews |
| `client.api.previews.workersPreviewsCreate` | `POST /accounts/{accountId}/workers/workers/{workerId}/previews` | Create Preview |
| `client.api.previews.workersPreviewsDelete` | `DELETE /accounts/{accountId}/workers/workers/{workerId}/previews/{previewId}` | Delete Preview |
| `client.api.previews.workersPreviewsGet` | `GET /accounts/{accountId}/workers/workers/{workerId}/previews/{previewId}` | Get Preview |
| `client.api.previews.workersPreviewsEdit` | `PATCH /accounts/{accountId}/workers/workers/{workerId}/previews/{previewId}` | Edit Preview |
| `client.api.previews.workersPreviewsUpdate` | `PUT /accounts/{accountId}/workers/workers/{workerId}/previews/{previewId}` | Update Preview |

## previewDeployments

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.previewDeployments.workersPreviewsDeploymentsList` | `GET /accounts/{accountId}/workers/workers/{workerId}/previews/{previewId}/deployments` | List Preview Deployments |
| `client.api.previewDeployments.workersPreviewsDeploymentsCreate` | `POST /accounts/{accountId}/workers/workers/{workerId}/previews/{previewId}/deployments` | Create Preview Deployment |
| `client.api.previewDeployments.workersPreviewsDeploymentsPatchLatest` | `PATCH /accounts/{accountId}/workers/workers/{workerId}/previews/{previewId}/deployments/latest` | Patch Latest Preview Deployment |
| `client.api.previewDeployments.workersPreviewsDeploymentsDelete` | `DELETE /accounts/{accountId}/workers/workers/{workerId}/previews/{previewId}/deployments/{deploymentId}` | Delete Preview Deployment |
| `client.api.previewDeployments.workersPreviewsDeploymentsGet` | `GET /accounts/{accountId}/workers/workers/{workerId}/previews/{previewId}/deployments/{deploymentId}` | Get Preview Deployment |

## versions

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.versions.listWorkerVersions` | `GET /accounts/{accountId}/workers/workers/{workerId}/versions` | List Worker Versions |
| `client.api.versions.createWorkerVersion` | `POST /accounts/{accountId}/workers/workers/{workerId}/versions` | Create Worker Version |
| `client.api.versions.getLatestWorkerVersion` | `GET /accounts/{accountId}/workers/workers/{workerId}/versions/latest` | Get Latest Worker Version |
| `client.api.versions.patchLatestWorkerVersion` | `PATCH /accounts/{accountId}/workers/workers/{workerId}/versions/latest` | Patch Latest Worker Version |
| `client.api.versions.deleteWorkerVersion` | `DELETE /accounts/{accountId}/workers/workers/{workerId}/versions/{versionId}` | Delete Worker Version |
| `client.api.versions.getWorkerVersion` | `GET /accounts/{accountId}/workers/workers/{workerId}/versions/{versionId}` | Get Worker Version |

## workerProfiling

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workerProfiling.profileWorkerVersion` | `POST /accounts/{accountId}/workers/workers/{workerId}/versions/{versionId}/profile` | Profile Worker Version |

## zeroTrustConnectivitySettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustConnectivitySettings.zeroTrustAccountsGetConnectivitySettings` | `GET /accounts/{accountId}/zerotrust/connectivity_settings` | Get Zero Trust Connectivity Settings |
| `client.api.zeroTrustConnectivitySettings.zeroTrustAccountsPatchConnectivitySettings` | `PATCH /accounts/{accountId}/zerotrust/connectivity_settings` | Updates the Zero Trust Connectivity Settings |

## zeroTrustHostnameRoute

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustHostnameRoute.zeroTrustNetworksRouteHostnameList` | `GET /accounts/{accountId}/zerotrust/routes/hostname` | List hostname routes |
| `client.api.zeroTrustHostnameRoute.zeroTrustNetworksRouteHostnameCreate` | `POST /accounts/{accountId}/zerotrust/routes/hostname` | Create hostname route |
| `client.api.zeroTrustHostnameRoute.zeroTrustNetworksRouteHostnameDelete` | `DELETE /accounts/{accountId}/zerotrust/routes/hostname/{hostnameRouteId}` | Delete hostname route |
| `client.api.zeroTrustHostnameRoute.zeroTrustNetworksRouteHostnameGet` | `GET /accounts/{accountId}/zerotrust/routes/hostname/{hostnameRouteId}` | Get hostname route |
| `client.api.zeroTrustHostnameRoute.zeroTrustNetworksRouteHostnameUpdate` | `PATCH /accounts/{accountId}/zerotrust/routes/hostname/{hostnameRouteId}` | Update hostname route |

## zeroTrustSubnets

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustSubnets.zeroTrustNetworksSubnetsList` | `GET /accounts/{accountId}/zerotrust/subnets` | List Subnets |
| `client.api.zeroTrustSubnets.zeroTrustNetworksSubnetGetCloudflareSource` | `GET /accounts/{accountId}/zerotrust/subnets/cloudflare_source/{addressFamily}` | Get Cloudflare Source Subnet |
| `client.api.zeroTrustSubnets.zeroTrustNetworksSubnetUpdateCloudflareSource` | `PATCH /accounts/{accountId}/zerotrust/subnets/cloudflare_source/{addressFamily}` | Update Cloudflare Source Subnet |
| `client.api.zeroTrustSubnets.zeroTrustNetworksSubnetGetInitialResolvedIp` | `GET /accounts/{accountId}/zerotrust/subnets/initial_resolved_ip/{addressFamily}` | Get Initial Resolved IP Subnet |
| `client.api.zeroTrustSubnets.zeroTrustNetworksSubnetUpdateInitialResolvedIp` | `PUT /accounts/{accountId}/zerotrust/subnets/initial_resolved_ip/{addressFamily}` | Update Initial Resolved IP Subnet |
| `client.api.zeroTrustSubnets.zeroTrustNetworksSubnetCreateWarp` | `POST /accounts/{accountId}/zerotrust/subnets/warp` | Create WARP IP subnet |
| `client.api.zeroTrustSubnets.zeroTrustNetworksSubnetDeleteWarp` | `DELETE /accounts/{accountId}/zerotrust/subnets/warp/{subnetId}` | Delete WARP IP subnet |
| `client.api.zeroTrustSubnets.zeroTrustNetworksSubnetGetWarp` | `GET /accounts/{accountId}/zerotrust/subnets/warp/{subnetId}` | Get WARP IP subnet |
| `client.api.zeroTrustSubnets.zeroTrustNetworksSubnetUpdateWarp` | `PATCH /accounts/{accountId}/zerotrust/subnets/warp/{subnetId}` | Update WARP IP subnet |

## zeroTrustRiskScoring

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustRiskScoring.dlpRiskScoreBehaviorsGet` | `GET /accounts/{accountId}/zt_risk_scoring/behaviors` | Get all behaviors and associated configuration |
| `client.api.zeroTrustRiskScoring.dlpRiskScoreBehaviorsPut` | `PUT /accounts/{accountId}/zt_risk_scoring/behaviors` | Update configuration for risk behaviors |
| `client.api.zeroTrustRiskScoring.dlpRiskScoreSummaryGet` | `GET /accounts/{accountId}/zt_risk_scoring/summary` | Get risk score info for all users in the account |
| `client.api.zeroTrustRiskScoring.dlpRiskScoreSummaryGetForUser` | `GET /accounts/{accountId}/zt_risk_scoring/{userId}` | Get risk event/score information for a specific user |
| `client.api.zeroTrustRiskScoring.dlpRiskScoreResetPost` | `POST /accounts/{accountId}/zt_risk_scoring/{userId}/reset` | Clear the risk score for a particular user |

## zeroTrustRiskScoringIntegrations

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zeroTrustRiskScoringIntegrations.dlpZtRiskScoreIntegrationList` | `GET /accounts/{accountId}/zt_risk_scoring/integrations` | List all risk score integrations for the account. |
| `client.api.zeroTrustRiskScoringIntegrations.dlpZtRiskScoreIntegrationCreate` | `POST /accounts/{accountId}/zt_risk_scoring/integrations` | Create new risk score integration. |
| `client.api.zeroTrustRiskScoringIntegrations.dlpZtRiskScoreIntegrationGetByReferenceId` | `GET /accounts/{accountId}/zt_risk_scoring/integrations/reference_id/{referenceId}` | Get risk score integration by reference id. |
| `client.api.zeroTrustRiskScoringIntegrations.dlpZtRiskScoreIntegrationDelete` | `DELETE /accounts/{accountId}/zt_risk_scoring/integrations/{integrationId}` | Delete a risk score integration. |
| `client.api.zeroTrustRiskScoringIntegrations.dlpZtRiskScoreIntegrationGet` | `GET /accounts/{accountId}/zt_risk_scoring/integrations/{integrationId}` | Get risk score integration by id. |
| `client.api.zeroTrustRiskScoringIntegrations.dlpZtRiskScoreIntegrationUpdate` | `PUT /accounts/{accountId}/zt_risk_scoring/integrations/{integrationId}` | Update a risk score integration. |

## ratePlans

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ratePlans.billingGetRatePlan` | `GET /billing/rate_plans/{publicKey}` | Get Rate Plan by Public Key |

## organizationmembers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.organizationmembers.membersList` | `GET /organizations/{organizationId}/members` | List organization members |
| `client.api.organizationmembers.membersCreate` | `POST /organizations/{organizationId}/members` | Create organization member |
| `client.api.organizationmembers.membersDelete` | `DELETE /organizations/{organizationId}/members/{memberId}` | Delete organization member |
| `client.api.organizationmembers.membersRetrieve` | `GET /organizations/{organizationId}/members/{memberId}` | Get organization member |
| `client.api.organizationmembers.membersBatchCreate` | `POST /organizations/{organizationId}/members:batchCreate` | Batch create organization members |

## tenants

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.tenants.tenantsListAccounts` | `GET /tenants/{tenantId}/accounts` | List tenant accounts |

## tenantLevelCustomNameservers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.tenantLevelCustomNameservers.tenantLevelCustomNameserversListTenantCustomNameservers` | `GET /tenants/{tenantId}/custom_ns` | List Tenant Custom Nameservers |
| `client.api.tenantLevelCustomNameservers.tenantLevelCustomNameserversAddTenantCustomNameserver` | `POST /tenants/{tenantId}/custom_ns` | Add Tenant Custom Nameserver |
| `client.api.tenantLevelCustomNameservers.tenantLevelCustomNameserversDeleteTenantCustomNameserver` | `DELETE /tenants/{tenantId}/custom_ns/{customNsId}` | Delete Tenant Custom Nameserver |

## zoneLevelAccessApplications

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneLevelAccessApplications.zoneLevelAccessApplicationsListAccessApplications` | `GET /zones/{zoneId}/access/apps` | List Access Applications |
| `client.api.zoneLevelAccessApplications.zoneLevelAccessApplicationsAddABookmarkApplication` | `POST /zones/{zoneId}/access/apps` | Add an Access application |
| `client.api.zoneLevelAccessApplications.zoneLevelAccessApplicationsDeleteAnAccessApplication` | `DELETE /zones/{zoneId}/access/apps/{appId}` | Delete an Access application |
| `client.api.zoneLevelAccessApplications.zoneLevelAccessApplicationsGetAnAccessApplication` | `GET /zones/{zoneId}/access/apps/{appId}` | Get an Access application |
| `client.api.zoneLevelAccessApplications.zoneLevelAccessApplicationsUpdateABookmarkApplication` | `PUT /zones/{zoneId}/access/apps/{appId}` | Update an Access application |
| `client.api.zoneLevelAccessApplications.zoneLevelAccessApplicationsRevokeServiceTokens` | `POST /zones/{zoneId}/access/apps/{appId}/revoke_tokens` | Revoke application tokens |
| `client.api.zoneLevelAccessApplications.zoneLevelAccessApplicationsPatchUpdateAccessApplicationSettings` | `PATCH /zones/{zoneId}/access/apps/{appId}/settings` | Update application settings |
| `client.api.zoneLevelAccessApplications.zoneLevelAccessApplicationsPutUpdateAccessApplicationSettings` | `PUT /zones/{zoneId}/access/apps/{appId}/settings` | Update application settings |
| `client.api.zoneLevelAccessApplications.zoneLevelAccessApplicationsTestAccessPolicies` | `GET /zones/{zoneId}/access/apps/{appId}/user_policy_checks` | Test Access policies |

## zoneLevelAccessShortLivedCertificateCas

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneLevelAccessShortLivedCertificateCas.zoneLevelAccessShortLivedCertificateCAsListShortLivedCertificateCAs` | `GET /zones/{zoneId}/access/apps/ca` | List short-lived certificate CAs |
| `client.api.zoneLevelAccessShortLivedCertificateCas.zoneLevelAccessShortLivedCertificateCAsDeleteAShortLivedCertificateCa` | `DELETE /zones/{zoneId}/access/apps/{appId}/ca` | Delete a short-lived certificate CA |
| `client.api.zoneLevelAccessShortLivedCertificateCas.zoneLevelAccessShortLivedCertificateCAsGetAShortLivedCertificateCa` | `GET /zones/{zoneId}/access/apps/{appId}/ca` | Get a short-lived certificate CA |
| `client.api.zoneLevelAccessShortLivedCertificateCas.zoneLevelAccessShortLivedCertificateCAsCreateAShortLivedCertificateCa` | `POST /zones/{zoneId}/access/apps/{appId}/ca` | Create a short-lived certificate CA |

## zoneLevelAccessPolicies

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneLevelAccessPolicies.zoneLevelAccessPoliciesListAccessPolicies` | `GET /zones/{zoneId}/access/apps/{appId}/policies` | List Access policies |
| `client.api.zoneLevelAccessPolicies.zoneLevelAccessPoliciesCreateAnAccessPolicy` | `POST /zones/{zoneId}/access/apps/{appId}/policies` | Create an Access policy |
| `client.api.zoneLevelAccessPolicies.zoneLevelAccessPoliciesDeleteAnAccessPolicy` | `DELETE /zones/{zoneId}/access/apps/{appId}/policies/{policyId}` | Delete an Access policy |
| `client.api.zoneLevelAccessPolicies.zoneLevelAccessPoliciesGetAnAccessPolicy` | `GET /zones/{zoneId}/access/apps/{appId}/policies/{policyId}` | Get an Access policy |
| `client.api.zoneLevelAccessPolicies.zoneLevelAccessPoliciesUpdateAnAccessPolicy` | `PUT /zones/{zoneId}/access/apps/{appId}/policies/{policyId}` | Update an Access policy |

## zoneLevelAccessMtlsAuthentication

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneLevelAccessMtlsAuthentication.zoneLevelAccessMtlsAuthenticationListMtlsCertificates` | `GET /zones/{zoneId}/access/certificates` | List mTLS certificates |
| `client.api.zoneLevelAccessMtlsAuthentication.zoneLevelAccessMtlsAuthenticationAddAnMtlsCertificate` | `POST /zones/{zoneId}/access/certificates` | Add an mTLS certificate |
| `client.api.zoneLevelAccessMtlsAuthentication.zoneLevelAccessMtlsAuthenticationListMtlsCertificatesHostnameSettings` | `GET /zones/{zoneId}/access/certificates/settings` | List all mTLS hostname settings |
| `client.api.zoneLevelAccessMtlsAuthentication.zoneLevelAccessMtlsAuthenticationUpdateAnMtlsCertificateSettings` | `PUT /zones/{zoneId}/access/certificates/settings` | Update an mTLS certificate's hostname settings |
| `client.api.zoneLevelAccessMtlsAuthentication.zoneLevelAccessMtlsAuthenticationDeleteAnMtlsCertificate` | `DELETE /zones/{zoneId}/access/certificates/{certificateId}` | Delete an mTLS certificate |
| `client.api.zoneLevelAccessMtlsAuthentication.zoneLevelAccessMtlsAuthenticationGetAnMtlsCertificate` | `GET /zones/{zoneId}/access/certificates/{certificateId}` | Get an mTLS certificate |
| `client.api.zoneLevelAccessMtlsAuthentication.zoneLevelAccessMtlsAuthenticationUpdateAnMtlsCertificate` | `PUT /zones/{zoneId}/access/certificates/{certificateId}` | Update an mTLS certificate |

## zoneLevelAccessGroups

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneLevelAccessGroups.zoneLevelAccessGroupsListAccessGroups` | `GET /zones/{zoneId}/access/groups` | List Access groups |
| `client.api.zoneLevelAccessGroups.zoneLevelAccessGroupsCreateAnAccessGroup` | `POST /zones/{zoneId}/access/groups` | Create an Access group |
| `client.api.zoneLevelAccessGroups.zoneLevelAccessGroupsDeleteAnAccessGroup` | `DELETE /zones/{zoneId}/access/groups/{groupId}` | Delete an Access group |
| `client.api.zoneLevelAccessGroups.zoneLevelAccessGroupsGetAnAccessGroup` | `GET /zones/{zoneId}/access/groups/{groupId}` | Get an Access group |
| `client.api.zoneLevelAccessGroups.zoneLevelAccessGroupsUpdateAnAccessGroup` | `PUT /zones/{zoneId}/access/groups/{groupId}` | Update an Access group |

## zoneLevelAccessIdentityProviders

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneLevelAccessIdentityProviders.zoneLevelAccessIdentityProvidersListAccessIdentityProviders` | `GET /zones/{zoneId}/access/identity_providers` | List Access identity providers |
| `client.api.zoneLevelAccessIdentityProviders.zoneLevelAccessIdentityProvidersAddAnAccessIdentityProvider` | `POST /zones/{zoneId}/access/identity_providers` | Add an Access identity provider |
| `client.api.zoneLevelAccessIdentityProviders.zoneLevelAccessIdentityProvidersDeleteAnAccessIdentityProvider` | `DELETE /zones/{zoneId}/access/identity_providers/{identityProviderId}` | Delete an Access identity provider |
| `client.api.zoneLevelAccessIdentityProviders.zoneLevelAccessIdentityProvidersGetAnAccessIdentityProvider` | `GET /zones/{zoneId}/access/identity_providers/{identityProviderId}` | Get an Access identity provider |
| `client.api.zoneLevelAccessIdentityProviders.zoneLevelAccessIdentityProvidersUpdateAnAccessIdentityProvider` | `PUT /zones/{zoneId}/access/identity_providers/{identityProviderId}` | Update an Access identity provider |

## zoneLevelZeroTrustOrganization

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneLevelZeroTrustOrganization.zoneLevelZeroTrustOrganizationGetYourZeroTrustOrganization` | `GET /zones/{zoneId}/access/organizations` | Get your Zero Trust organization |
| `client.api.zoneLevelZeroTrustOrganization.zoneLevelZeroTrustOrganizationCreateYourZeroTrustOrganization` | `POST /zones/{zoneId}/access/organizations` | Create your Zero Trust organization |
| `client.api.zoneLevelZeroTrustOrganization.zoneLevelZeroTrustOrganizationUpdateYourZeroTrustOrganization` | `PUT /zones/{zoneId}/access/organizations` | Update your Zero Trust organization |
| `client.api.zoneLevelZeroTrustOrganization.zoneLevelZeroTrustOrganizationRevokeAllAccessTokensForAUser` | `POST /zones/{zoneId}/access/organizations/revoke_user` | Revoke all Access tokens for a user |

## zoneLevelAccessServiceTokens

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneLevelAccessServiceTokens.zoneLevelAccessServiceTokensListServiceTokens` | `GET /zones/{zoneId}/access/service_tokens` | List service tokens |
| `client.api.zoneLevelAccessServiceTokens.zoneLevelAccessServiceTokensCreateAServiceToken` | `POST /zones/{zoneId}/access/service_tokens` | Create a service token |
| `client.api.zoneLevelAccessServiceTokens.zoneLevelAccessServiceTokensDeleteAServiceToken` | `DELETE /zones/{zoneId}/access/service_tokens/{serviceTokenId}` | Delete a service token |
| `client.api.zoneLevelAccessServiceTokens.zoneLevelAccessServiceTokensGetAServiceToken` | `GET /zones/{zoneId}/access/service_tokens/{serviceTokenId}` | Get a service token |
| `client.api.zoneLevelAccessServiceTokens.zoneLevelAccessServiceTokensUpdateAServiceToken` | `PUT /zones/{zoneId}/access/service_tokens/{serviceTokenId}` | Update a service token |

## customOriginTrustStore

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.customOriginTrustStore.customOriginTrustStoreListDetails` | `GET /zones/{zoneId}/acm/custom_trust_store` | List Custom Origin Trust Store Details |
| `client.api.customOriginTrustStore.customOriginTrustStoreCreate` | `POST /zones/{zoneId}/acm/custom_trust_store` | Upload Custom Origin Trust Store |
| `client.api.customOriginTrustStore.customOriginTrustStoreDelete` | `DELETE /zones/{zoneId}/acm/custom_trust_store/{customOriginTrustStoreId}` | Delete Custom Origin Trust Store |
| `client.api.customOriginTrustStore.customOriginTrustStoreDetails` | `GET /zones/{zoneId}/acm/custom_trust_store/{customOriginTrustStoreId}` | Custom Origin Trust Store Details |

## totalTls

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.totalTls.totalTlsTotalTlsSettingsDetails` | `GET /zones/{zoneId}/acm/total_tls` | Total TLS Settings Details |
| `client.api.totalTls.totalTlsEnableOrDisableTotalTls` | `POST /zones/{zoneId}/acm/total_tls` | Enable or Disable Total TLS |

## aiAudit

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aiAudit.aiAuditGetRobots` | `GET /zones/{zoneId}/ai-audit/robots` | Get robots.txt rules |
| `client.api.aiAudit.aiAuditBulkGetRobots` | `POST /zones/{zoneId}/ai-audit/robots/bulk` | Bulk get robots.txt rules |

## aiSecurityForApps

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.aiSecurityForApps.aiSecurityCustomTopicsGet` | `GET /zones/{zoneId}/ai-security/custom-topics` | Get the AI Security for Apps custom topics of a zone. |
| `client.api.aiSecurityForApps.aiSecurityCustomTopicsPut` | `PUT /zones/{zoneId}/ai-security/custom-topics` | Update the AI Security for Apps custom topics of a zone. |
| `client.api.aiSecurityForApps.aiSecuritySettingsGet` | `GET /zones/{zoneId}/ai-security/settings` | Get the AI Security for Apps status for a zone. |
| `client.api.aiSecurityForApps.aiSecuritySettingsPut` | `PUT /zones/{zoneId}/ai-security/settings` | Update the AI Security for Apps status for a zone. |

## zoneAnalyticsDeprecated

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneAnalyticsDeprecated.zoneAnalyticsDeprecatedGetAnalyticsByCoLocations` | `GET /zones/{zoneId}/analytics/colos` | Get analytics by Co-locations |
| `client.api.zoneAnalyticsDeprecated.zoneAnalyticsDeprecatedGetDashboard` | `GET /zones/{zoneId}/analytics/dashboard` | Get dashboard |

## argoAnalyticsForZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.argoAnalyticsForZone.argoAnalyticsForZoneArgoAnalyticsForAZone` | `GET /zones/{zoneId}/analytics/latency` | Argo Analytics for a zone |

## argoAnalyticsForGeolocation

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.argoAnalyticsForGeolocation.argoAnalyticsForGeolocationArgoAnalyticsForAZoneAtDifferentPoPs` | `GET /zones/{zoneId}/analytics/latency/colos` | Argo Analytics for a zone at different PoPs |

## apiShieldSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.apiShieldSettings.apiShieldSettingsRetrieveInformationAboutSpecificConfigurationProperties` | `GET /zones/{zoneId}/api_gateway/configuration` | Get session identifier settings |
| `client.api.apiShieldSettings.apiShieldSettingsSetConfigurationProperties` | `PUT /zones/{zoneId}/api_gateway/configuration` | Update session identifier settings |

## apiShieldApiDiscovery

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.apiShieldApiDiscovery.apiShieldApiDiscoveryRetrieveDiscoveredOperationsOnAZoneAsOpenapi` | `GET /zones/{zoneId}/api_gateway/discovery` | Export discovered API operations as OpenAPI schemas |
| `client.api.apiShieldApiDiscovery.apiShieldApiDiscoveryRetrieveDiscoveredOperationsOnAZone` | `GET /zones/{zoneId}/api_gateway/discovery/operations` | List discovered web and API operations |
| `client.api.apiShieldApiDiscovery.apiShieldApiPatchDiscoveredOperations` | `PATCH /zones/{zoneId}/api_gateway/discovery/operations` | Edit discovered web and API operations |
| `client.api.apiShieldApiDiscovery.apiShieldApiDiscoveryRetrieveDiscoveredOperationById` | `GET /zones/{zoneId}/api_gateway/discovery/operations/{discoveryId}` | Get a discovered web or API operation |
| `client.api.apiShieldApiDiscovery.apiShieldApiPatchDiscoveredOperation` | `PATCH /zones/{zoneId}/api_gateway/discovery/operations/{discoveryId}` | Edit a discovered web or API operation |

## apiShieldWafExpressionTemplates

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.apiShieldWafExpressionTemplates.apiShieldExpressionTemplatesFallthrough` | `POST /zones/{zoneId}/api_gateway/expression-template/fallthrough` | Generate a fallthrough WAF expression template |

## apiShieldLabels

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.apiShieldLabels.apiShieldLabelsGetLabels` | `GET /zones/{zoneId}/api_gateway/labels` | List operation labels |
| `client.api.apiShieldLabels.apiShieldLabelsGetManagedLabel` | `GET /zones/{zoneId}/api_gateway/labels/managed/{name}` | Get a managed operation label |
| `client.api.apiShieldLabels.apiShieldLabelsReplaceOperationsAttachedToManagedLabel` | `PUT /zones/{zoneId}/api_gateway/labels/managed/{name}/resources/operation` | Replace operations attached to a managed label |
| `client.api.apiShieldLabels.apiShieldLabelsDeleteUserLabels` | `DELETE /zones/{zoneId}/api_gateway/labels/user` | Delete user-defined operation labels |
| `client.api.apiShieldLabels.apiShieldLabelsCreateUserLabels` | `POST /zones/{zoneId}/api_gateway/labels/user` | Create user-defined operation labels |
| `client.api.apiShieldLabels.apiShieldDeleteUserLabel` | `DELETE /zones/{zoneId}/api_gateway/labels/user/{name}` | Delete a user-defined operation label |
| `client.api.apiShieldLabels.apiShieldLabelsGetUserLabel` | `GET /zones/{zoneId}/api_gateway/labels/user/{name}` | Get a user-defined operation label |
| `client.api.apiShieldLabels.apiShieldPatchUserLabel` | `PATCH /zones/{zoneId}/api_gateway/labels/user/{name}` | Edit a user-defined operation label |
| `client.api.apiShieldLabels.apiShieldPutUserLabel` | `PUT /zones/{zoneId}/api_gateway/labels/user/{name}` | Update a user-defined operation label |
| `client.api.apiShieldLabels.apiShieldLabelsReplaceOperationsAttachedToUserLabel` | `PUT /zones/{zoneId}/api_gateway/labels/user/{name}/resources/operation` | Replace operations attached to a user-defined label |
| `client.api.apiShieldLabels.apiShieldOperationsBulkDeleteLabelsToOperations` | `DELETE /zones/{zoneId}/api_gateway/operations/labels` | Remove labels from web or API operations |
| `client.api.apiShieldLabels.apiShieldOperationsBulkPostLabelsToOperations` | `POST /zones/{zoneId}/api_gateway/operations/labels` | Attach labels to web or API operations |
| `client.api.apiShieldLabels.apiShieldOperationsBulkPutLabelsToOperations` | `PUT /zones/{zoneId}/api_gateway/operations/labels` | Replace labels on web or API operations |
| `client.api.apiShieldLabels.apiShieldOperationsDeleteLabelsFromOperation` | `DELETE /zones/{zoneId}/api_gateway/operations/{operationId}/labels` | Remove labels from a web or API operation |
| `client.api.apiShieldLabels.apiShieldOperationsPostLabelsToOperation` | `POST /zones/{zoneId}/api_gateway/operations/{operationId}/labels` | Attach labels to a web or API operation |
| `client.api.apiShieldLabels.apiShieldOperationsPutLabelsToOperation` | `PUT /zones/{zoneId}/api_gateway/operations/{operationId}/labels` | Replace labels on a web or API operation |

## apiShieldEndpointManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.apiShieldEndpointManagement.apiShieldEndpointManagementDeleteMultipleOperations` | `DELETE /zones/{zoneId}/api_gateway/operations` | Delete web or API operations |
| `client.api.apiShieldEndpointManagement.apiShieldEndpointManagementRetrieveInformationAboutAllOperationsOnAZone` | `GET /zones/{zoneId}/api_gateway/operations` | List web and API operations |
| `client.api.apiShieldEndpointManagement.apiShieldEndpointManagementAddOperationsToAZone` | `POST /zones/{zoneId}/api_gateway/operations` | Create web or API operations |
| `client.api.apiShieldEndpointManagement.apiShieldEndpointManagementAddOperationToAZone` | `POST /zones/{zoneId}/api_gateway/operations/item` | Create a web or API operation |
| `client.api.apiShieldEndpointManagement.apiShieldEndpointManagementDeleteAnOperation` | `DELETE /zones/{zoneId}/api_gateway/operations/{operationId}` | Delete a web or API operation |
| `client.api.apiShieldEndpointManagement.apiShieldEndpointManagementRetrieveInformationAboutAnOperation` | `GET /zones/{zoneId}/api_gateway/operations/{operationId}` | Get a web or API operation |
| `client.api.apiShieldEndpointManagement.apiShieldEndpointManagementRetrieveOperationsAndFeaturesAsOpenApiSchemas` | `GET /zones/{zoneId}/api_gateway/schemas` | Export web and API operations as OpenAPI schemas |

## apiShieldSchemaValidation20

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.apiShieldSchemaValidation20.apiShieldSchemaValidationUpdateMultipleOperationLevelSettings` | `PATCH /zones/{zoneId}/api_gateway/operations/schema_validation` | Update multiple operation-level schema validation settings |
| `client.api.apiShieldSchemaValidation20.apiShieldSchemaValidationRetrieveOperationLevelSettings` | `GET /zones/{zoneId}/api_gateway/operations/{operationId}/schema_validation` | Retrieve operation-level schema validation settings |
| `client.api.apiShieldSchemaValidation20.apiShieldSchemaValidationUpdateOperationLevelSettings` | `PUT /zones/{zoneId}/api_gateway/operations/{operationId}/schema_validation` | Update operation-level schema validation settings |
| `client.api.apiShieldSchemaValidation20.apiShieldSchemaValidationRetrieveZoneLevelSettings` | `GET /zones/{zoneId}/api_gateway/settings/schema_validation` | Retrieve zone level schema validation settings |
| `client.api.apiShieldSchemaValidation20.apiShieldSchemaValidationPatchZoneLevelSettings` | `PATCH /zones/{zoneId}/api_gateway/settings/schema_validation` | Update zone level schema validation settings |
| `client.api.apiShieldSchemaValidation20.apiShieldSchemaValidationUpdateZoneLevelSettings` | `PUT /zones/{zoneId}/api_gateway/settings/schema_validation` | Update zone level schema validation settings |
| `client.api.apiShieldSchemaValidation20.apiShieldSchemaValidationRetrieveInformationAboutAllSchemas` | `GET /zones/{zoneId}/api_gateway/user_schemas` | Retrieve information about all schemas on a zone |
| `client.api.apiShieldSchemaValidation20.apiShieldSchemaValidationPostSchema` | `POST /zones/{zoneId}/api_gateway/user_schemas` | Upload a legacy schema |
| `client.api.apiShieldSchemaValidation20.apiShieldSchemaValidationRetrieveUserSchemaHosts` | `GET /zones/{zoneId}/api_gateway/user_schemas/hosts` | Retrieve schema hosts in a zone |
| `client.api.apiShieldSchemaValidation20.apiShieldSchemaDeleteASchema` | `DELETE /zones/{zoneId}/api_gateway/user_schemas/{schemaId}` | Delete a schema |
| `client.api.apiShieldSchemaValidation20.apiShieldSchemaValidationRetrieveInformationAboutSpecificSchema` | `GET /zones/{zoneId}/api_gateway/user_schemas/{schemaId}` | Retrieve information about a specific schema on a zone |
| `client.api.apiShieldSchemaValidation20.apiShieldSchemaValidationEnableValidationForASchema` | `PATCH /zones/{zoneId}/api_gateway/user_schemas/{schemaId}` | Enable validation for a schema |
| `client.api.apiShieldSchemaValidation20.apiShieldSchemaValidationExtractOperationsFromSchema` | `GET /zones/{zoneId}/api_gateway/user_schemas/{schemaId}/operations` | Retrieve all operations from a schema |

## tieredCaching

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.tieredCaching.tieredCachingGetTieredCachingSetting` | `GET /zones/{zoneId}/argo/tiered_caching` | Get Tiered Cache |
| `client.api.tieredCaching.tieredCachingPatchTieredCachingSetting` | `PATCH /zones/{zoneId}/argo/tiered_caching` | Update Tiered Cache |

## zoneRatePlan

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneRatePlan.zoneRatePlanListAvailablePlans` | `GET /zones/{zoneId}/available_plans` | List Available Plans |
| `client.api.zoneRatePlan.zoneRatePlanAvailablePlanDetails` | `GET /zones/{zoneId}/available_plans/{planIdentifier}` | Available Plan Details |
| `client.api.zoneRatePlan.zoneRatePlanListAvailableRatePlans` | `GET /zones/{zoneId}/available_rate_plans` | List Available Rate Plans |

## botSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.botSettings.botManagementForAZoneGetConfig` | `GET /zones/{zoneId}/bot_management` | Get Zone Bot Management Config |
| `client.api.botSettings.botManagementForAZoneUpdateConfig` | `PUT /zones/{zoneId}/bot_management` | Update Zone Bot Management Config |

## feedback

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.feedback.botManagementZoneFeedbackList` | `GET /zones/{zoneId}/bot_management/feedback` | List zone feedback reports |
| `client.api.feedback.botManagementZoneFeedbackCreate` | `POST /zones/{zoneId}/bot_management/feedback` | Submit a feedback report |

## zoneCacheSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneCacheSettings.zoneCacheSettingsGetCacheReserveSetting` | `GET /zones/{zoneId}/cache/cache_reserve` | Get Cache Reserve setting |
| `client.api.zoneCacheSettings.zoneCacheSettingsChangeCacheReserveSetting` | `PATCH /zones/{zoneId}/cache/cache_reserve` | Change Cache Reserve setting |
| `client.api.zoneCacheSettings.zoneCacheSettingsGetCacheReserveClear` | `GET /zones/{zoneId}/cache/cache_reserve_clear` | Get Cache Reserve Clear |
| `client.api.zoneCacheSettings.zoneCacheSettingsStartCacheReserveClear` | `POST /zones/{zoneId}/cache/cache_reserve_clear` | Start Cache Reserve Clear |
| `client.api.zoneCacheSettings.zoneCacheSettingsGetRegionalTieredCacheSetting` | `GET /zones/{zoneId}/cache/regional_tiered_cache` | Get Regional Tiered Cache setting |
| `client.api.zoneCacheSettings.zoneCacheSettingsChangeRegionalTieredCacheSetting` | `PATCH /zones/{zoneId}/cache/regional_tiered_cache` | Change Regional Tiered Cache setting |
| `client.api.zoneCacheSettings.zoneCacheSettingsDeleteVariantsSetting` | `DELETE /zones/{zoneId}/cache/variants` | Delete variants setting |
| `client.api.zoneCacheSettings.zoneCacheSettingsGetVariantsSetting` | `GET /zones/{zoneId}/cache/variants` | Get variants setting |
| `client.api.zoneCacheSettings.zoneCacheSettingsChangeVariantsSetting` | `PATCH /zones/{zoneId}/cache/variants` | Change variants setting |

## originCloudRegions

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.originCloudRegions.originCloudRegionsList` | `GET /zones/{zoneId}/cache/origin_cloud_regions` | List origin cloud region mappings |
| `client.api.originCloudRegions.originCloudRegionsUpsert` | `PATCH /zones/{zoneId}/cache/origin_cloud_regions` | Create or update an origin cloud region mapping |
| `client.api.originCloudRegions.originCloudRegionsCreate` | `POST /zones/{zoneId}/cache/origin_cloud_regions` | Create an origin cloud region mapping |
| `client.api.originCloudRegions.originCloudRegionsBatchDelete` | `DELETE /zones/{zoneId}/cache/origin_cloud_regions/batch` | Batch delete origin cloud region mappings |
| `client.api.originCloudRegions.originCloudRegionsBatchUpsert` | `PATCH /zones/{zoneId}/cache/origin_cloud_regions/batch` | Batch create or update origin cloud region mappings |
| `client.api.originCloudRegions.originCloudRegionsSupportedRegions` | `GET /zones/{zoneId}/cache/origin_cloud_regions/supported_regions` | List supported cloud vendors and regions |
| `client.api.originCloudRegions.originCloudRegionsDelete` | `DELETE /zones/{zoneId}/cache/origin_cloud_regions/{originIp}` | Delete an origin cloud region mapping |
| `client.api.originCloudRegions.originCloudRegionsGet` | `GET /zones/{zoneId}/cache/origin_cloud_regions/{originIp}` | Get an origin cloud region mapping |
| `client.api.originCloudRegions.originCloudRegionsV2List` | `GET /zones/{zoneId}/origin/cloud_regions` | List origin cloud region mappings |
| `client.api.originCloudRegions.originCloudRegionsV2BatchDelete` | `DELETE /zones/{zoneId}/origin/cloud_regions/batch` | Batch delete origin cloud region mappings |
| `client.api.originCloudRegions.originCloudRegionsV2BatchUpsert` | `PUT /zones/{zoneId}/origin/cloud_regions/batch` | Batch create or replace origin cloud region mappings |
| `client.api.originCloudRegions.originCloudRegionsV2SupportedRegions` | `GET /zones/{zoneId}/origin/cloud_regions/supported_regions` | List supported cloud vendors and regions |
| `client.api.originCloudRegions.originCloudRegionsV2Delete` | `DELETE /zones/{zoneId}/origin/cloud_regions/{originIp}` | Delete an origin cloud region mapping |
| `client.api.originCloudRegions.originCloudRegionsV2Get` | `GET /zones/{zoneId}/origin/cloud_regions/{originIp}` | Get an origin cloud region mapping |
| `client.api.originCloudRegions.originCloudRegionsV2Upsert` | `PUT /zones/{zoneId}/origin/cloud_regions/{originIp}` | Create or replace an origin cloud region mapping |

## originPostQuantum

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.originPostQuantum.zoneCacheSettingsGetOriginPostQuantumEncryptionSetting` | `GET /zones/{zoneId}/cache/origin_post_quantum_encryption` | Get Origin Post-Quantum Encryption setting |
| `client.api.originPostQuantum.zoneCacheSettingsChangeOriginPostQuantumEncryptionSetting` | `PUT /zones/{zoneId}/cache/origin_post_quantum_encryption` | Change Origin Post-Quantum Encryption setting |

## smartTieredCache

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.smartTieredCache.smartTieredCacheDeleteSmartTieredCacheSetting` | `DELETE /zones/{zoneId}/cache/tiered_cache_smart_topology_enable` | Delete Smart Tiered Cache setting |
| `client.api.smartTieredCache.smartTieredCacheGetSmartTieredCacheSetting` | `GET /zones/{zoneId}/cache/tiered_cache_smart_topology_enable` | Get Smart Tiered Cache setting |
| `client.api.smartTieredCache.smartTieredCachePatchSmartTieredCacheSetting` | `PATCH /zones/{zoneId}/cache/tiered_cache_smart_topology_enable` | Patch Smart Tiered Cache setting |
| `client.api.smartTieredCache.smartTieredCacheCreateSmartTieredCacheSetting` | `POST /zones/{zoneId}/cache/tiered_cache_smart_topology_enable` | Create Smart Tiered Cache setting |

## apiShieldClientCertificatesForAZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.apiShieldClientCertificatesForAZone.clientCertificateForAZoneListHostnameAssociations` | `GET /zones/{zoneId}/certificate_authorities/hostname_associations` | List Hostname Associations |
| `client.api.apiShieldClientCertificatesForAZone.clientCertificateForAZonePutHostnameAssociations` | `PUT /zones/{zoneId}/certificate_authorities/hostname_associations` | Replace Hostname Associations |
| `client.api.apiShieldClientCertificatesForAZone.clientCertificateForAZoneListClientCertificates` | `GET /zones/{zoneId}/client_certificates` | List Client Certificates |
| `client.api.apiShieldClientCertificatesForAZone.clientCertificateForAZoneCreateClientCertificate` | `POST /zones/{zoneId}/client_certificates` | Create Client Certificate |
| `client.api.apiShieldClientCertificatesForAZone.clientCertificateForAZoneDeleteClientCertificate` | `DELETE /zones/{zoneId}/client_certificates/{clientCertificateId}` | Revoke Client Certificate |
| `client.api.apiShieldClientCertificatesForAZone.clientCertificateForAZoneClientCertificateDetails` | `GET /zones/{zoneId}/client_certificates/{clientCertificateId}` | Client Certificate Details |
| `client.api.apiShieldClientCertificatesForAZone.clientCertificateForAZoneEditClientCertificate` | `PATCH /zones/{zoneId}/client_certificates/{clientCertificateId}` | Reactivate Client Certificate |

## zoneCloudConnectorRulesGet

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneCloudConnectorRulesGet.zoneCloudConnectorRules` | `GET /zones/{zoneId}/cloud_connector/rules` | Rules |

## zoneCloudConnectorRulesPut

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneCloudConnectorRulesPut.zoneCloudConenctorRulesPut` | `PUT /zones/{zoneId}/cloud_connector/rules` | Put Rules |

## contentScanning

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.contentScanning.wafContentScanningDisable` | `POST /zones/{zoneId}/content-upload-scan/disable` | Disable Content Scanning for a zone. |
| `client.api.contentScanning.wafContentScanningEnable` | `POST /zones/{zoneId}/content-upload-scan/enable` | Enable Content Scanning for a zone. |
| `client.api.contentScanning.wafContentScanningListCustomScanExpressions` | `GET /zones/{zoneId}/content-upload-scan/payloads` | List the Content Scanning custom expressions of a zone. |
| `client.api.contentScanning.wafContentScanningAddCustomScanExpressions` | `POST /zones/{zoneId}/content-upload-scan/payloads` | Create Content Scanning custom expressions for a zone. |
| `client.api.contentScanning.wafContentScanningDeleteCustomScanExpressions` | `DELETE /zones/{zoneId}/content-upload-scan/payloads/{expressionId}` | Delete a Content Scanning custom expression from a zone. |
| `client.api.contentScanning.wafContentScanningUpdateCustomScanExpression` | `PATCH /zones/{zoneId}/content-upload-scan/payloads/{expressionId}` | Update a Content Scanning custom expression for a zone. |
| `client.api.contentScanning.wafContentScanningGetStatus` | `GET /zones/{zoneId}/content-upload-scan/settings` | Get the Content Scanning status for a zone. |
| `client.api.contentScanning.wafContentScanningUpdateSettings` | `PUT /zones/{zoneId}/content-upload-scan/settings` | Update the Content Scanning status for a zone. |

## ctAlerting

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ctAlerting.ctAlertingGetSubscription` | `GET /zones/{zoneId}/ct/alerting` | Get CT Alerting Subscription |
| `client.api.ctAlerting.ctAlertingUpdateSubscription` | `PATCH /zones/{zoneId}/ct/alerting` | Update CT Alerting Subscription |

## customSslForAZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.customSslForAZone.customSslForAZoneListSslConfigurations` | `GET /zones/{zoneId}/custom_certificates` | List SSL Configurations |
| `client.api.customSslForAZone.customSslForAZoneCreateSslConfiguration` | `POST /zones/{zoneId}/custom_certificates` | Create SSL Configuration |
| `client.api.customSslForAZone.customSslForAZoneRePrioritizeSslCertificates` | `PUT /zones/{zoneId}/custom_certificates/prioritize` | Re-prioritize SSL Certificates |
| `client.api.customSslForAZone.customSslForAZoneDeleteSslConfiguration` | `DELETE /zones/{zoneId}/custom_certificates/{customCertificateId}` | Delete SSL Configuration |
| `client.api.customSslForAZone.customSslForAZoneSslConfigurationDetails` | `GET /zones/{zoneId}/custom_certificates/{customCertificateId}` | SSL Configuration Details |
| `client.api.customSslForAZone.customSslForAZoneEditSslConfiguration` | `PATCH /zones/{zoneId}/custom_certificates/{customCertificateId}` | Edit SSL Configuration |

## customCsrsForAZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.customCsrsForAZone.customCsrsForAZoneListCustomCsrs` | `GET /zones/{zoneId}/custom_csrs` | List Custom CSRs |
| `client.api.customCsrsForAZone.customCsrsForAZoneCreateCustomCsr` | `POST /zones/{zoneId}/custom_csrs` | Create Custom CSR |
| `client.api.customCsrsForAZone.customCsrsForAZoneDeleteCustomCsr` | `DELETE /zones/{zoneId}/custom_csrs/{customCsrId}` | Delete Custom CSR |
| `client.api.customCsrsForAZone.customCsrsForAZoneCustomCsrDetails` | `GET /zones/{zoneId}/custom_csrs/{customCsrId}` | Custom CSR Details |

## customHostnameForAZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.customHostnameForAZone.customHostnameForAZoneListCustomHostnames` | `GET /zones/{zoneId}/custom_hostnames` | List Custom Hostnames |
| `client.api.customHostnameForAZone.customHostnameForAZoneCreateCustomHostname` | `POST /zones/{zoneId}/custom_hostnames` | Create Custom Hostname |
| `client.api.customHostnameForAZone.customHostnameForAZoneGetCustomHostnameQuota` | `GET /zones/{zoneId}/custom_hostnames/quota` | Get Custom Hostname Quota |
| `client.api.customHostnameForAZone.customHostnameForAZoneDeleteCustomHostnameAndAnyIssuedSslCertificates` | `DELETE /zones/{zoneId}/custom_hostnames/{customHostnameId}` | Delete Custom Hostname (and any issued SSL certificates) |
| `client.api.customHostnameForAZone.customHostnameForAZoneCustomHostnameDetails` | `GET /zones/{zoneId}/custom_hostnames/{customHostnameId}` | Custom Hostname Details |
| `client.api.customHostnameForAZone.customHostnameForAZoneEditCustomHostname` | `PATCH /zones/{zoneId}/custom_hostnames/{customHostnameId}` | Edit Custom Hostname |
| `client.api.customHostnameForAZone.customHostnameForAZoneDeleteSingleCertificateAndKeyInACustomHostname` | `DELETE /zones/{zoneId}/custom_hostnames/{customHostnameId}/certificate_pack/{certificatePackId}/certificates/{certificateId}` | Delete Single Certificate And Key For Custom Hostname |
| `client.api.customHostnameForAZone.customHostnameForAZoneEditCustomCertificateCustomHostname` | `PUT /zones/{zoneId}/custom_hostnames/{customHostnameId}/certificate_pack/{certificatePackId}/certificates/{certificateId}` | Replace Custom Certificate and Custom Key In Custom Hostname |

## customHostnameFallbackOriginForAZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.customHostnameFallbackOriginForAZone.customHostnameFallbackOriginForAZoneDeleteFallbackOriginForCustomHostnames` | `DELETE /zones/{zoneId}/custom_hostnames/fallback_origin` | Delete Fallback Origin for Custom Hostnames |
| `client.api.customHostnameFallbackOriginForAZone.customHostnameFallbackOriginForAZoneGetFallbackOriginForCustomHostnames` | `GET /zones/{zoneId}/custom_hostnames/fallback_origin` | Get Fallback Origin for Custom Hostnames |
| `client.api.customHostnameFallbackOriginForAZone.customHostnameFallbackOriginForAZoneUpdateFallbackOriginForCustomHostnames` | `PUT /zones/{zoneId}/custom_hostnames/fallback_origin` | Update Fallback Origin for Custom Hostnames |

## accountLevelCustomNameserversUsageForAZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountLevelCustomNameserversUsageForAZone.accountLevelCustomNameserversUsageForAZoneGetAccountCustomNameserverRelatedZoneMetadata` | `GET /zones/{zoneId}/custom_ns` | Get Account Custom Nameserver Related Zone Metadata |
| `client.api.accountLevelCustomNameserversUsageForAZone.accountLevelCustomNameserversUsageForAZoneSetAccountCustomNameserverRelatedZoneMetadata` | `PUT /zones/{zoneId}/custom_ns` | Set Account Custom Nameserver Related Zone Metadata |

## customPagesForAZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.customPagesForAZone.customPagesForAZoneListCustomPages` | `GET /zones/{zoneId}/custom_pages` | List custom pages |
| `client.api.customPagesForAZone.customPagesForAZoneCreatePreviewToken` | `POST /zones/{zoneId}/custom_pages/preview_tokens` | Create a preview token |
| `client.api.customPagesForAZone.customPagesForAZoneGetACustomPage` | `GET /zones/{zoneId}/custom_pages/{identifier}` | Get a custom page |
| `client.api.customPagesForAZone.customPagesForAZoneUpdateACustomPage` | `PUT /zones/{zoneId}/custom_pages/{identifier}` | Update a custom page |

## customAssetsForAZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.customAssetsForAZone.customAssetsForAZoneListCustomAssets` | `GET /zones/{zoneId}/custom_pages/assets` | List custom assets |
| `client.api.customAssetsForAZone.customAssetsForAZoneCreateACustomAsset` | `POST /zones/{zoneId}/custom_pages/assets` | Create a custom asset |
| `client.api.customAssetsForAZone.customAssetsForAZoneDeleteACustomAsset` | `DELETE /zones/{zoneId}/custom_pages/assets/{assetName}` | Delete a custom asset |
| `client.api.customAssetsForAZone.customAssetsForAZoneGetACustomAsset` | `GET /zones/{zoneId}/custom_pages/assets/{assetName}` | Get a custom asset |
| `client.api.customAssetsForAZone.customAssetsForAZoneUpdateACustomAsset` | `PUT /zones/{zoneId}/custom_pages/assets/{assetName}` | Update a custom asset |

## dcvDelegation

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dcvDelegation.dcvDelegationUuidGet` | `GET /zones/{zoneId}/dcv_delegation/uuid` | Retrieve the DCV Delegation unique identifier. |

## dnsAnalytics

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dnsAnalytics.dnsAnalyticsTable` | `GET /zones/{zoneId}/dns_analytics/report` | Table |
| `client.api.dnsAnalytics.dnsAnalyticsByTime` | `GET /zones/{zoneId}/dns_analytics/report/bytime` | By Time |

## dnsRecordsForAZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dnsRecordsForAZone.dnsRecordsForAZoneListDnsRecords` | `GET /zones/{zoneId}/dns_records` | List DNS Records |
| `client.api.dnsRecordsForAZone.dnsRecordsForAZoneCreateDnsRecord` | `POST /zones/{zoneId}/dns_records` | Create DNS Record |
| `client.api.dnsRecordsForAZone.dnsRecordsForAZoneBatchDnsRecords` | `POST /zones/{zoneId}/dns_records/batch` | Batch DNS Records |
| `client.api.dnsRecordsForAZone.dnsRecordsForAZoneExportDnsRecords` | `GET /zones/{zoneId}/dns_records/export` | Export DNS Records |
| `client.api.dnsRecordsForAZone.dnsRecordsForAZoneImportDnsRecords` | `POST /zones/{zoneId}/dns_records/import` | Import DNS Records |
| `client.api.dnsRecordsForAZone.dnsRecordsForAZoneScanDnsRecords` | `POST /zones/{zoneId}/dns_records/scan` | Scan DNS Records |
| `client.api.dnsRecordsForAZone.dnsRecordsForAZoneReviewDnsScan` | `GET /zones/{zoneId}/dns_records/scan/review` | List Scanned DNS Records |
| `client.api.dnsRecordsForAZone.dnsRecordsForAZoneApplyDnsScanResults` | `POST /zones/{zoneId}/dns_records/scan/review` | Review Scanned DNS Records |
| `client.api.dnsRecordsForAZone.dnsRecordsForAZoneTriggerDnsScan` | `POST /zones/{zoneId}/dns_records/scan/trigger` | Trigger DNS Record Scan |
| `client.api.dnsRecordsForAZone.dnsRecordsForAZoneGetUsage` | `GET /zones/{zoneId}/dns_records/usage` | Get DNS Record Usage |
| `client.api.dnsRecordsForAZone.dnsRecordsForAZoneDeleteDnsRecord` | `DELETE /zones/{zoneId}/dns_records/{dnsRecordId}` | Delete DNS Record |
| `client.api.dnsRecordsForAZone.dnsRecordsForAZoneDnsRecordDetails` | `GET /zones/{zoneId}/dns_records/{dnsRecordId}` | DNS Record Details |
| `client.api.dnsRecordsForAZone.dnsRecordsForAZonePatchDnsRecord` | `PATCH /zones/{zoneId}/dns_records/{dnsRecordId}` | Update DNS Record |
| `client.api.dnsRecordsForAZone.dnsRecordsForAZoneUpdateDnsRecord` | `PUT /zones/{zoneId}/dns_records/{dnsRecordId}` | Overwrite DNS Record |

## dnsSettingsForAZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dnsSettingsForAZone.dnsSettingsForAZoneListDnsSettings` | `GET /zones/{zoneId}/dns_settings` | Show DNS Settings |
| `client.api.dnsSettingsForAZone.dnsSettingsForAZoneUpdateDnsSettings` | `PATCH /zones/{zoneId}/dns_settings` | Update DNS Settings |

## dnssec

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.dnssec.dnssecDeleteDnssecRecords` | `DELETE /zones/{zoneId}/dnssec` | Delete DNSSEC records |
| `client.api.dnssec.dnssecDnssecDetails` | `GET /zones/{zoneId}/dnssec` | DNSSEC Details |
| `client.api.dnssec.dnssecEditDnssecStatus` | `PATCH /zones/{zoneId}/dnssec` | Edit DNSSEC Status |
| `client.api.dnssec.dnssecListDnssecZsks` | `GET /zones/{zoneId}/dnssec/zsk` | List DNSSEC ZSKs |

## emailAuth

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.emailAuth.getDmarcReportsStatus` | `GET /zones/{zoneId}/email/auth/dmarc-reports` | Get DMARC Report Status |
| `client.api.emailAuth.configureDmarcReports` | `PATCH /zones/{zoneId}/email/auth/dmarc-reports` | Configure DMARC Reports |
| `client.api.emailAuth.inspectSpf` | `GET /zones/{zoneId}/email/auth/spf/inspect` | Inspect SPF Record |

## emailRoutingSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.emailRoutingSettings.emailRoutingSettingsGetEmailRoutingSettings` | `GET /zones/{zoneId}/email/routing` | Get Email Routing settings |
| `client.api.emailRoutingSettings.emailRoutingSettingsUpdateEmailRoutingSettings` | `PATCH /zones/{zoneId}/email/routing` | Update Email Routing settings |
| `client.api.emailRoutingSettings.emailRoutingSettingsReplaceEmailRoutingSettings` | `PUT /zones/{zoneId}/email/routing` | Apply Email Routing settings |
| `client.api.emailRoutingSettings.emailRoutingSettingsDisableEmailRouting` | `POST /zones/{zoneId}/email/routing/disable` | Disable Email Routing |
| `client.api.emailRoutingSettings.emailRoutingSettingsDisableEmailRoutingDns` | `DELETE /zones/{zoneId}/email/routing/dns` | Disable Email Routing |
| `client.api.emailRoutingSettings.emailRoutingSettingsEmailRoutingDnsSettings` | `GET /zones/{zoneId}/email/routing/dns` | Email Routing - DNS settings |
| `client.api.emailRoutingSettings.emailRoutingSettingsUnlockEmailRoutingDns` | `PATCH /zones/{zoneId}/email/routing/dns` | Unlock Email Routing DNS records |
| `client.api.emailRoutingSettings.emailRoutingSettingsEnableEmailRoutingDns` | `POST /zones/{zoneId}/email/routing/dns` | Enable Email Routing |
| `client.api.emailRoutingSettings.emailRoutingSettingsEnableEmailRouting` | `POST /zones/{zoneId}/email/routing/enable` | Enable Email Routing |
| `client.api.emailRoutingSettings.emailRoutingSettingsUnlockEmailRouting` | `POST /zones/{zoneId}/email/routing/unlock` | Unlock Email Routing |

## emailSendingSubdomains

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.emailSendingSubdomains.emailSendingSubdomainsListSendingSubdomains` | `GET /zones/{zoneId}/email/sending/subdomains` | List sending subdomains |
| `client.api.emailSendingSubdomains.emailSendingSubdomainsCreateSendingSubdomain` | `POST /zones/{zoneId}/email/sending/subdomains` | Create a sending subdomain |
| `client.api.emailSendingSubdomains.emailSendingSubdomainsPreviewSendingSubdomain` | `POST /zones/{zoneId}/email/sending/subdomains/preview` | Preview sending subdomain DNS |
| `client.api.emailSendingSubdomains.emailSendingSubdomainsDeleteSendingSubdomain` | `DELETE /zones/{zoneId}/email/sending/subdomains/{subdomainId}` | Delete a sending subdomain |
| `client.api.emailSendingSubdomains.emailSendingSubdomainsGetSendingSubdomain` | `GET /zones/{zoneId}/email/sending/subdomains/{subdomainId}` | Get a sending subdomain |
| `client.api.emailSendingSubdomains.emailSendingSubdomainsUpdateSendingSubdomain` | `PATCH /zones/{zoneId}/email/sending/subdomains/{subdomainId}` | Update a sending subdomain |
| `client.api.emailSendingSubdomains.emailSendingSubdomainsGetSendingSubdomainDns` | `GET /zones/{zoneId}/email/sending/subdomains/{subdomainId}/dns` | Get sending subdomain DNS records |
| `client.api.emailSendingSubdomains.emailSendingSubdomainsFixSendingSubdomainDns` | `POST /zones/{zoneId}/email/sending/subdomains/{subdomainId}/dns` | Fix sending subdomain DNS records |
| `client.api.emailSendingSubdomains.emailSendingSubdomainsGetSendingSubdomainDnsStatus` | `GET /zones/{zoneId}/email/sending/subdomains/{subdomainId}/dns/status` | Get sending subdomain DNS status |
| `client.api.emailSendingSubdomains.emailSendingSubdomainsGetSendingSubdomainReputationComplaints` | `GET /zones/{zoneId}/email/sending/subdomains/{subdomainId}/reputation/complaints` | Get sending subdomain complaint count |

## zoneEntitlements

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneEntitlements.entitlementsGetZoneEntitlements` | `GET /zones/{zoneId}/entitlements` | Get Zone Entitlements |

## zoneEnvironments

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneEnvironments.zonesEnvironmentsList` | `GET /zones/{zoneId}/environments` | List zone environments |
| `client.api.zoneEnvironments.zonesEnvironmentsEdit` | `PATCH /zones/{zoneId}/environments` | Partially update zone environments |
| `client.api.zoneEnvironments.zonesEnvironmentsCreate` | `POST /zones/{zoneId}/environments` | Create zone environments |
| `client.api.zoneEnvironments.zonesEnvironmentsUpdate` | `PUT /zones/{zoneId}/environments` | Upsert zone environments |
| `client.api.zoneEnvironments.zonesEnvironmentsDelete` | `DELETE /zones/{zoneId}/environments/{environmentId}` | Delete zone environment |
| `client.api.zoneEnvironments.zonesEnvironmentsRollback` | `POST /zones/{zoneId}/environments/{environmentId}/rollback` | Roll back zone environment |

## filters

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.filters.filtersDeleteFilters` | `DELETE /zones/{zoneId}/filters` | Delete filters |
| `client.api.filters.filtersListFilters` | `GET /zones/{zoneId}/filters` | List filters |
| `client.api.filters.filtersCreateFilters` | `POST /zones/{zoneId}/filters` | Create filters |
| `client.api.filters.filtersUpdateFilters` | `PUT /zones/{zoneId}/filters` | Update filters |
| `client.api.filters.filtersDeleteAFilter` | `DELETE /zones/{zoneId}/filters/{filterId}` | Delete a filter |
| `client.api.filters.filtersGetAFilter` | `GET /zones/{zoneId}/filters/{filterId}` | Get a filter |
| `client.api.filters.filtersUpdateAFilter` | `PUT /zones/{zoneId}/filters/{filterId}` | Update a filter |

## ipAccessRulesForAZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ipAccessRulesForAZone.ipAccessRulesForAZoneListIpAccessRules` | `GET /zones/{zoneId}/firewall/access_rules/rules` | List IP Access rules |
| `client.api.ipAccessRulesForAZone.ipAccessRulesForAZoneCreateAnIpAccessRule` | `POST /zones/{zoneId}/firewall/access_rules/rules` | Create an IP Access rule |
| `client.api.ipAccessRulesForAZone.ipAccessRulesForAZoneDeleteAnIpAccessRule` | `DELETE /zones/{zoneId}/firewall/access_rules/rules/{ruleId}` | Delete an IP Access rule |
| `client.api.ipAccessRulesForAZone.ipAccessRulesForAZoneUpdateAnIpAccessRule` | `PATCH /zones/{zoneId}/firewall/access_rules/rules/{ruleId}` | Update an IP Access rule |

## zoneLockdown

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneLockdown.zoneLockdownListZoneLockdownRules` | `GET /zones/{zoneId}/firewall/lockdowns` | List Zone Lockdown rules |
| `client.api.zoneLockdown.zoneLockdownCreateAZoneLockdownRule` | `POST /zones/{zoneId}/firewall/lockdowns` | Create a Zone Lockdown rule |
| `client.api.zoneLockdown.zoneLockdownDeleteAZoneLockdownRule` | `DELETE /zones/{zoneId}/firewall/lockdowns/{lockDownsId}` | Delete a Zone Lockdown rule |
| `client.api.zoneLockdown.zoneLockdownGetAZoneLockdownRule` | `GET /zones/{zoneId}/firewall/lockdowns/{lockDownsId}` | Get a Zone Lockdown rule |
| `client.api.zoneLockdown.zoneLockdownUpdateAZoneLockdownRule` | `PUT /zones/{zoneId}/firewall/lockdowns/{lockDownsId}` | Update a Zone Lockdown rule |

## payloadLoggingKeysForAZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.payloadLoggingKeysForAZone.payloadLoggingKeysForAZoneDeleteThePayloadLoggingKey` | `DELETE /zones/{zoneId}/firewall/payload_logging/key` | Delete the payload logging key |
| `client.api.payloadLoggingKeysForAZone.payloadLoggingKeysForAZoneGetThePayloadLoggingKey` | `GET /zones/{zoneId}/firewall/payload_logging/key` | Get the payload logging key |
| `client.api.payloadLoggingKeysForAZone.payloadLoggingKeysForAZoneSetThePayloadLoggingKey` | `PUT /zones/{zoneId}/firewall/payload_logging/key` | Set the payload logging key |

## firewallRules

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.firewallRules.firewallRulesDeleteFirewallRules` | `DELETE /zones/{zoneId}/firewall/rules` | Delete firewall rules |
| `client.api.firewallRules.firewallRulesListFirewallRules` | `GET /zones/{zoneId}/firewall/rules` | List firewall rules |
| `client.api.firewallRules.firewallRulesUpdatePriorityOfFirewallRules` | `PATCH /zones/{zoneId}/firewall/rules` | Update priority of firewall rules |
| `client.api.firewallRules.firewallRulesCreateFirewallRules` | `POST /zones/{zoneId}/firewall/rules` | Create firewall rules |
| `client.api.firewallRules.firewallRulesUpdateFirewallRules` | `PUT /zones/{zoneId}/firewall/rules` | Update firewall rules |
| `client.api.firewallRules.firewallRulesDeleteAFirewallRule` | `DELETE /zones/{zoneId}/firewall/rules/{ruleId}` | Delete a firewall rule |
| `client.api.firewallRules.firewallRulesGetAFirewallRule` | `GET /zones/{zoneId}/firewall/rules/{ruleId}` | Get a firewall rule |
| `client.api.firewallRules.firewallRulesUpdatePriorityOfAFirewallRule` | `PATCH /zones/{zoneId}/firewall/rules/{ruleId}` | Update priority of a firewall rule |
| `client.api.firewallRules.firewallRulesUpdateAFirewallRule` | `PUT /zones/{zoneId}/firewall/rules/{ruleId}` | Update a firewall rule |

## userAgentBlockingRules

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.userAgentBlockingRules.userAgentBlockingRulesListUserAgentBlockingRules` | `GET /zones/{zoneId}/firewall/ua_rules` | List User Agent Blocking rules |
| `client.api.userAgentBlockingRules.userAgentBlockingRulesCreateAUserAgentBlockingRule` | `POST /zones/{zoneId}/firewall/ua_rules` | Create a User Agent Blocking rule |
| `client.api.userAgentBlockingRules.userAgentBlockingRulesDeleteAUserAgentBlockingRule` | `DELETE /zones/{zoneId}/firewall/ua_rules/{uaRuleId}` | Delete a User Agent Blocking rule |
| `client.api.userAgentBlockingRules.userAgentBlockingRulesGetAUserAgentBlockingRule` | `GET /zones/{zoneId}/firewall/ua_rules/{uaRuleId}` | Get a User Agent Blocking rule |
| `client.api.userAgentBlockingRules.userAgentBlockingRulesUpdateAUserAgentBlockingRule` | `PUT /zones/{zoneId}/firewall/ua_rules/{uaRuleId}` | Update a User Agent Blocking rule |

## wafOverrides

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.wafOverrides.wafOverridesListWafOverrides` | `GET /zones/{zoneId}/firewall/waf/overrides` | List WAF overrides |
| `client.api.wafOverrides.wafOverridesCreateAWafOverride` | `POST /zones/{zoneId}/firewall/waf/overrides` | Create a WAF override |
| `client.api.wafOverrides.wafOverridesDeleteAWafOverride` | `DELETE /zones/{zoneId}/firewall/waf/overrides/{overridesId}` | Delete a WAF override |
| `client.api.wafOverrides.wafOverridesGetAWafOverride` | `GET /zones/{zoneId}/firewall/waf/overrides/{overridesId}` | Get a WAF override |
| `client.api.wafOverrides.wafOverridesUpdateWafOverride` | `PUT /zones/{zoneId}/firewall/waf/overrides/{overridesId}` | Update WAF override |

## wafPackages

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.wafPackages.wafPackagesListWafPackages` | `GET /zones/{zoneId}/firewall/waf/packages` | List WAF packages |
| `client.api.wafPackages.wafPackagesGetAWafPackage` | `GET /zones/{zoneId}/firewall/waf/packages/{packageId}` | Get a WAF package |
| `client.api.wafPackages.wafPackagesUpdateAWafPackage` | `PATCH /zones/{zoneId}/firewall/waf/packages/{packageId}` | Update a WAF package |

## wafRuleGroups

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.wafRuleGroups.wafRuleGroupsListWafRuleGroups` | `GET /zones/{zoneId}/firewall/waf/packages/{packageId}/groups` | List WAF rule groups |
| `client.api.wafRuleGroups.wafRuleGroupsGetAWafRuleGroup` | `GET /zones/{zoneId}/firewall/waf/packages/{packageId}/groups/{groupId}` | Get a WAF rule group |
| `client.api.wafRuleGroups.wafRuleGroupsUpdateAWafRuleGroup` | `PATCH /zones/{zoneId}/firewall/waf/packages/{packageId}/groups/{groupId}` | Update a WAF rule group |

## wafRules

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.wafRules.wafRulesListWafRules` | `GET /zones/{zoneId}/firewall/waf/packages/{packageId}/rules` | List WAF rules |
| `client.api.wafRules.wafRulesGetAWafRule` | `GET /zones/{zoneId}/firewall/waf/packages/{packageId}/rules/{ruleId}` | Get a WAF rule |
| `client.api.wafRules.wafRulesUpdateAWafRule` | `PATCH /zones/{zoneId}/firewall/waf/packages/{packageId}/rules/{ruleId}` | Update a WAF rule |

## fraudDetection

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.fraudDetection.fraudDetectionZoneGetSettings` | `GET /zones/{zoneId}/fraud_detection/settings` | Get Fraud Detection Settings |
| `client.api.fraudDetection.fraudDetectionZoneUpdateSettings` | `PUT /zones/{zoneId}/fraud_detection/settings` | Update Fraud Detection Settings |

## healthChecks

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.healthChecks.healthChecksListHealthChecks` | `GET /zones/{zoneId}/healthchecks` | List Health Checks |
| `client.api.healthChecks.healthChecksCreateHealthCheck` | `POST /zones/{zoneId}/healthchecks` | Create Health Check |
| `client.api.healthChecks.healthChecksCreatePreviewHealthCheck` | `POST /zones/{zoneId}/healthchecks/preview` | Create Preview Health Check |
| `client.api.healthChecks.healthChecksDeletePreviewHealthCheck` | `DELETE /zones/{zoneId}/healthchecks/preview/{healthcheckId}` | Delete Preview Health Check |
| `client.api.healthChecks.healthChecksHealthCheckPreviewDetails` | `GET /zones/{zoneId}/healthchecks/preview/{healthcheckId}` | Health Check Preview Details |
| `client.api.healthChecks.healthChecksDeleteHealthCheck` | `DELETE /zones/{zoneId}/healthchecks/{healthcheckId}` | Delete Health Check |
| `client.api.healthChecks.healthChecksHealthCheckDetails` | `GET /zones/{zoneId}/healthchecks/{healthcheckId}` | Health Check Details |
| `client.api.healthChecks.healthChecksPatchHealthCheck` | `PATCH /zones/{zoneId}/healthchecks/{healthcheckId}` | Patch Health Check |
| `client.api.healthChecks.healthChecksUpdateHealthCheck` | `PUT /zones/{zoneId}/healthchecks/{healthcheckId}` | Update Health Check |
| `client.api.healthChecks.smartShieldListHealthChecks` | `GET /zones/{zoneId}/smart_shield/healthchecks` | List Health Checks |
| `client.api.healthChecks.smartShieldCreateHealthCheck` | `POST /zones/{zoneId}/smart_shield/healthchecks` | Create Health Check |
| `client.api.healthChecks.smartShieldDeleteHealthCheck` | `DELETE /zones/{zoneId}/smart_shield/healthchecks/{healthcheckId}` | Delete Health Check |
| `client.api.healthChecks.smartShieldHealthCheckDetails` | `GET /zones/{zoneId}/smart_shield/healthchecks/{healthcheckId}` | Health Check Details |
| `client.api.healthChecks.smartShieldPatchHealthCheck` | `PATCH /zones/{zoneId}/smart_shield/healthchecks/{healthcheckId}` | Patch Health Check |
| `client.api.healthChecks.smartShieldUpdateHealthCheck` | `PUT /zones/{zoneId}/smart_shield/healthchecks/{healthcheckId}` | Update Health Check |

## zoneHolds

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneHolds.zones0HoldDelete` | `DELETE /zones/{zoneId}/hold` | Remove Zone Hold |
| `client.api.zoneHolds.zones0HoldGet` | `GET /zones/{zoneId}/hold` | Get Zone Hold |
| `client.api.zoneHolds.zones0HoldPatch` | `PATCH /zones/{zoneId}/hold` | Update Zone Hold |
| `client.api.zoneHolds.zones0HoldPost` | `POST /zones/{zoneId}/hold` | Create Zone Hold |

## perHostnameTlsSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.perHostnameTlsSettings.perHostnameTlsSettingsList` | `GET /zones/{zoneId}/hostnames/settings/{settingId}` | List TLS setting for hostnames |
| `client.api.perHostnameTlsSettings.perHostnameTlsSettingsDelete` | `DELETE /zones/{zoneId}/hostnames/settings/{settingId}/{hostname}` | Delete TLS setting for hostname |
| `client.api.perHostnameTlsSettings.perHostnameTlsSettingsGet` | `GET /zones/{zoneId}/hostnames/settings/{settingId}/{hostname}` | Get TLS setting for hostname |
| `client.api.perHostnameTlsSettings.perHostnameTlsSettingsPut` | `PUT /zones/{zoneId}/hostnames/settings/{settingId}/{hostname}` | Edit TLS setting for hostname |

## images

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.images.getFlowsGet` | `GET /zones/{zoneId}/images/v1/flows` | Get transformation flows |
| `client.api.images.putFlowsUpdate` | `PUT /zones/{zoneId}/images/v1/flows` | Update transformation flows |

## keylessSslForAZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.keylessSslForAZone.keylessSslForAZoneListKeylessSslConfigurations` | `GET /zones/{zoneId}/keyless_certificates` | List Keyless SSL Configurations |
| `client.api.keylessSslForAZone.keylessSslForAZoneCreateKeylessSslConfiguration` | `POST /zones/{zoneId}/keyless_certificates` | Create Keyless SSL Configuration |
| `client.api.keylessSslForAZone.keylessSslForAZoneDeleteKeylessSslConfiguration` | `DELETE /zones/{zoneId}/keyless_certificates/{keylessCertificateId}` | Delete Keyless SSL Configuration |
| `client.api.keylessSslForAZone.keylessSslForAZoneGetKeylessSslConfiguration` | `GET /zones/{zoneId}/keyless_certificates/{keylessCertificateId}` | Get Keyless SSL Configuration |
| `client.api.keylessSslForAZone.keylessSslForAZoneEditKeylessSslConfiguration` | `PATCH /zones/{zoneId}/keyless_certificates/{keylessCertificateId}` | Edit Keyless SSL Configuration |

## leakedCredentialChecks

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.leakedCredentialChecks.wafProductApiLeakedCredentialsGetStatus` | `GET /zones/{zoneId}/leaked-credential-checks` | Get the Leaked Credential Checks status for a zone. |
| `client.api.leakedCredentialChecks.wafProductApiLeakedCredentialsSetStatus` | `POST /zones/{zoneId}/leaked-credential-checks` | Update the Leaked Credential Checks status for a zone. |
| `client.api.leakedCredentialChecks.wafProductApiLeakedCredentialsListDetections` | `GET /zones/{zoneId}/leaked-credential-checks/detections` | List the custom detection locations of a zone. |
| `client.api.leakedCredentialChecks.wafProductApiLeakedCredentialsCreateDetection` | `POST /zones/{zoneId}/leaked-credential-checks/detections` | Create a custom detection location for a zone. |
| `client.api.leakedCredentialChecks.wafProductApiLeakedCredentialsDeleteDetection` | `DELETE /zones/{zoneId}/leaked-credential-checks/detections/{detectionId}` | Delete a custom detection location from a zone. |
| `client.api.leakedCredentialChecks.wafProductApiLeakedCredentialsGetDetection` | `GET /zones/{zoneId}/leaked-credential-checks/detections/{detectionId}` | Get a custom detection location of a zone. |
| `client.api.leakedCredentialChecks.wafProductApiLeakedCredentialsUpdateDetection` | `PUT /zones/{zoneId}/leaked-credential-checks/detections/{detectionId}` | Update a custom detection location of a zone. |

## loadBalancers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.loadBalancers.loadBalancersListLoadBalancers` | `GET /zones/{zoneId}/load_balancers` | List Load Balancers |
| `client.api.loadBalancers.loadBalancersCreateLoadBalancer` | `POST /zones/{zoneId}/load_balancers` | Create Load Balancer |
| `client.api.loadBalancers.loadBalancersDeleteLoadBalancer` | `DELETE /zones/{zoneId}/load_balancers/{loadBalancerId}` | Delete Load Balancer |
| `client.api.loadBalancers.loadBalancersLoadBalancerDetails` | `GET /zones/{zoneId}/load_balancers/{loadBalancerId}` | Load Balancer Details |
| `client.api.loadBalancers.loadBalancersPatchLoadBalancer` | `PATCH /zones/{zoneId}/load_balancers/{loadBalancerId}` | Patch Load Balancer |
| `client.api.loadBalancers.loadBalancersUpdateLoadBalancer` | `PUT /zones/{zoneId}/load_balancers/{loadBalancerId}` | Update Load Balancer |

## logpushJobsForAZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.logpushJobsForAZone.getZonesZoneIdLogpushDatasetsDatasetIdFields` | `GET /zones/{zoneId}/logpush/datasets/{datasetId}/fields` | List fields |
| `client.api.logpushJobsForAZone.getZonesZoneIdLogpushDatasetsDatasetIdJobs` | `GET /zones/{zoneId}/logpush/datasets/{datasetId}/jobs` | List Logpush jobs for a dataset |
| `client.api.logpushJobsForAZone.getZonesZoneIdLogpushJobs` | `GET /zones/{zoneId}/logpush/jobs` | List Logpush jobs |
| `client.api.logpushJobsForAZone.postZonesZoneIdLogpushJobs` | `POST /zones/{zoneId}/logpush/jobs` | Create Logpush job |
| `client.api.logpushJobsForAZone.deleteZonesZoneIdLogpushJobsJobId` | `DELETE /zones/{zoneId}/logpush/jobs/{jobId}` | Delete Logpush job |
| `client.api.logpushJobsForAZone.getZonesZoneIdLogpushJobsJobId` | `GET /zones/{zoneId}/logpush/jobs/{jobId}` | Get Logpush job details |
| `client.api.logpushJobsForAZone.putZonesZoneIdLogpushJobsJobId` | `PUT /zones/{zoneId}/logpush/jobs/{jobId}` | Update Logpush job |
| `client.api.logpushJobsForAZone.postZonesZoneIdLogpushOwnership` | `POST /zones/{zoneId}/logpush/ownership` | Get ownership challenge |
| `client.api.logpushJobsForAZone.postZonesZoneIdLogpushOwnershipValidate` | `POST /zones/{zoneId}/logpush/ownership/validate` | Validate ownership challenge |
| `client.api.logpushJobsForAZone.postZonesZoneIdLogpushValidateDestination` | `POST /zones/{zoneId}/logpush/validate/destination` | Validate destination |
| `client.api.logpushJobsForAZone.postZonesZoneIdLogpushValidateDestinationExists` | `POST /zones/{zoneId}/logpush/validate/destination/exists` | Check destination exists |
| `client.api.logpushJobsForAZone.postZonesZoneIdLogpushValidateOrigin` | `POST /zones/{zoneId}/logpush/validate/origin` | Validate origin |

## instantLogsJobsForAZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.instantLogsJobsForAZone.getZonesZoneIdLogpushEdgeJobs` | `GET /zones/{zoneId}/logpush/edge/jobs` | List Instant Logs jobs |
| `client.api.instantLogsJobsForAZone.postZonesZoneIdLogpushEdgeJobs` | `POST /zones/{zoneId}/logpush/edge/jobs` | Create Instant Logs job |

## logsReceived

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.logsReceived.getZonesZoneIdLogsControlRetentionFlag` | `GET /zones/{zoneId}/logs/control/retention/flag` | Get log retention flag |
| `client.api.logsReceived.postZonesZoneIdLogsControlRetentionFlag` | `POST /zones/{zoneId}/logs/control/retention/flag` | Update log retention flag |
| `client.api.logsReceived.getZonesZoneIdLogsRayidsRayId` | `GET /zones/{zoneId}/logs/rayids/{rayId}` | Get logs RayIDs |
| `client.api.logsReceived.getZonesZoneIdLogsReceived` | `GET /zones/{zoneId}/logs/received` | Get logs received |
| `client.api.logsReceived.getZonesZoneIdLogsReceivedFields` | `GET /zones/{zoneId}/logs/received/fields` | List fields |

## managedTransforms

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.managedTransforms.deleteManagedTransforms` | `DELETE /zones/{zoneId}/managed_headers` | Delete Managed Transforms |
| `client.api.managedTransforms.listManagedTransforms` | `GET /zones/{zoneId}/managed_headers` | List Managed Transforms |
| `client.api.managedTransforms.updateManagedTransforms` | `PATCH /zones/{zoneId}/managed_headers` | Update Managed Transforms |

## zoneLevelAuthenticatedOriginPulls

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneLevelAuthenticatedOriginPulls.zoneLevelAuthenticatedOriginPullsListCertificates` | `GET /zones/{zoneId}/origin_tls_client_auth` | List Certificates |
| `client.api.zoneLevelAuthenticatedOriginPulls.zoneLevelAuthenticatedOriginPullsUploadCertificate` | `POST /zones/{zoneId}/origin_tls_client_auth` | Upload Certificate |
| `client.api.zoneLevelAuthenticatedOriginPulls.zoneLevelAuthenticatedOriginPullsGetEnablementSettingForZone` | `GET /zones/{zoneId}/origin_tls_client_auth/settings` | Get Enablement Setting for Zone |
| `client.api.zoneLevelAuthenticatedOriginPulls.zoneLevelAuthenticatedOriginPullsSetEnablementForZone` | `PUT /zones/{zoneId}/origin_tls_client_auth/settings` | Set Enablement for Zone |
| `client.api.zoneLevelAuthenticatedOriginPulls.zoneLevelAuthenticatedOriginPullsDeleteCertificate` | `DELETE /zones/{zoneId}/origin_tls_client_auth/{certificateId}` | Delete Certificate |
| `client.api.zoneLevelAuthenticatedOriginPulls.zoneLevelAuthenticatedOriginPullsGetCertificateDetails` | `GET /zones/{zoneId}/origin_tls_client_auth/{certificateId}` | Get Certificate Details |

## perHostnameAuthenticatedOriginPull

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.perHostnameAuthenticatedOriginPull.perHostnameAuthenticatedOriginPullListHostnameAssociations` | `GET /zones/{zoneId}/origin_tls_client_auth/hostnames` | List Hostname Associations |
| `client.api.perHostnameAuthenticatedOriginPull.perHostnameAuthenticatedOriginPullEnableOrDisableAHostnameForClientAuthentication` | `PUT /zones/{zoneId}/origin_tls_client_auth/hostnames` | Enable or Disable a Hostname for Client Authentication |
| `client.api.perHostnameAuthenticatedOriginPull.perHostnameAuthenticatedOriginPullListCertificates` | `GET /zones/{zoneId}/origin_tls_client_auth/hostnames/certificates` | List Certificates |
| `client.api.perHostnameAuthenticatedOriginPull.perHostnameAuthenticatedOriginPullUploadAHostnameClientCertificate` | `POST /zones/{zoneId}/origin_tls_client_auth/hostnames/certificates` | Upload a Hostname Client Certificate |
| `client.api.perHostnameAuthenticatedOriginPull.perHostnameAuthenticatedOriginPullDeleteHostnameClientCertificate` | `DELETE /zones/{zoneId}/origin_tls_client_auth/hostnames/certificates/{certificateId}` | Delete Hostname Client Certificate |
| `client.api.perHostnameAuthenticatedOriginPull.perHostnameAuthenticatedOriginPullGetTheHostnameClientCertificate` | `GET /zones/{zoneId}/origin_tls_client_auth/hostnames/certificates/{certificateId}` | Get the Hostname Client Certificate |
| `client.api.perHostnameAuthenticatedOriginPull.perHostnameAuthenticatedOriginPullGetTheHostnameStatusForClientAuthentication` | `GET /zones/{zoneId}/origin_tls_client_auth/hostnames/{hostname}` | Get the Hostname Status for Client Authentication |

## clientSideSecurity

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.clientSideSecurity.pageShieldGetSettings` | `GET /zones/{zoneId}/page_shield` | Get client-side security settings |
| `client.api.clientSideSecurity.pageShieldUpdateSettings` | `PUT /zones/{zoneId}/page_shield` | Update client-side security settings |
| `client.api.clientSideSecurity.pageShieldListConnections` | `GET /zones/{zoneId}/page_shield/connections` | List detected connections |
| `client.api.clientSideSecurity.pageShieldGetConnection` | `GET /zones/{zoneId}/page_shield/connections/{connectionId}` | Get a detected connection |
| `client.api.clientSideSecurity.pageShieldListCookies` | `GET /zones/{zoneId}/page_shield/cookies` | List detected cookies |
| `client.api.clientSideSecurity.pageShieldGetCookie` | `GET /zones/{zoneId}/page_shield/cookies/{cookieId}` | Get a detected cookie |
| `client.api.clientSideSecurity.pageShieldListPolicies` | `GET /zones/{zoneId}/page_shield/policies` | List content security rules |
| `client.api.clientSideSecurity.pageShieldCreatePolicy` | `POST /zones/{zoneId}/page_shield/policies` | Create a content security rule |
| `client.api.clientSideSecurity.pageShieldDeletePolicy` | `DELETE /zones/{zoneId}/page_shield/policies/{policyId}` | Delete a content security rule |
| `client.api.clientSideSecurity.pageShieldGetPolicy` | `GET /zones/{zoneId}/page_shield/policies/{policyId}` | Get a content security rule |
| `client.api.clientSideSecurity.pageShieldUpdatePolicy` | `PUT /zones/{zoneId}/page_shield/policies/{policyId}` | Update a content security rule |
| `client.api.clientSideSecurity.pageShieldListScripts` | `GET /zones/{zoneId}/page_shield/scripts` | List detected scripts |
| `client.api.clientSideSecurity.pageShieldGetScript` | `GET /zones/{zoneId}/page_shield/scripts/{scriptId}` | Get a detected script |

## pageRules

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.pageRules.pageRulesListPageRules` | `GET /zones/{zoneId}/pagerules` | List Page Rules |
| `client.api.pageRules.pageRulesCreateAPageRule` | `POST /zones/{zoneId}/pagerules` | Create a Page Rule |
| `client.api.pageRules.pageRulesDeleteAPageRule` | `DELETE /zones/{zoneId}/pagerules/{pageruleId}` | Delete a Page Rule |
| `client.api.pageRules.pageRulesGetAPageRule` | `GET /zones/{zoneId}/pagerules/{pageruleId}` | Get a Page Rule |
| `client.api.pageRules.pageRulesEditAPageRule` | `PATCH /zones/{zoneId}/pagerules/{pageruleId}` | Edit a Page Rule |
| `client.api.pageRules.pageRulesUpdateAPageRule` | `PUT /zones/{zoneId}/pagerules/{pageruleId}` | Update a Page Rule |

## availablePageRulesSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.availablePageRulesSettings.availablePageRulesSettingsListAvailablePageRulesSettings` | `GET /zones/{zoneId}/pagerules/settings` | List available Page Rules settings |

## precursor

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.precursor.precursorForAZoneGetConfig` | `GET /zones/{zoneId}/precursor` | Get Zone Precursor Config |
| `client.api.precursor.precursorForAZoneUpdateConfig` | `PUT /zones/{zoneId}/precursor` | Update Zone Precursor Config |

## rateLimitingAnalytics

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.rateLimitingAnalytics.rateLimitAnalyticsGetZoneAnalytics` | `GET /zones/{zoneId}/rate_limit_analytics` | Get Rate Limiting Analytics |

## rateLimitsForAZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.rateLimitsForAZone.rateLimitsForAZoneListRateLimits` | `GET /zones/{zoneId}/rate_limits` | List rate limits |
| `client.api.rateLimitsForAZone.rateLimitsForAZoneCreateARateLimit` | `POST /zones/{zoneId}/rate_limits` | Create a rate limit |
| `client.api.rateLimitsForAZone.rateLimitsForAZoneDeleteARateLimit` | `DELETE /zones/{zoneId}/rate_limits/{rateLimitId}` | Delete a rate limit |
| `client.api.rateLimitsForAZone.rateLimitsForAZoneGetARateLimit` | `GET /zones/{zoneId}/rate_limits/{rateLimitId}` | Get a rate limit |
| `client.api.rateLimitsForAZone.rateLimitsForAZoneUpdateARateLimit` | `PUT /zones/{zoneId}/rate_limits/{rateLimitId}` | Update a rate limit |

## zoneRulesets

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneRulesets.listZoneRulesets` | `GET /zones/{zoneId}/rulesets` | List zone rulesets |
| `client.api.zoneRulesets.createZoneRuleset` | `POST /zones/{zoneId}/rulesets` | Create a zone ruleset |
| `client.api.zoneRulesets.getZoneEntrypointRuleset` | `GET /zones/{zoneId}/rulesets/phases/{rulesetPhase}/entrypoint` | Get a zone entry point ruleset |
| `client.api.zoneRulesets.updateZoneEntrypointRuleset` | `PUT /zones/{zoneId}/rulesets/phases/{rulesetPhase}/entrypoint` | Update a zone entry point ruleset |
| `client.api.zoneRulesets.listZoneEntrypointRulesetVersions` | `GET /zones/{zoneId}/rulesets/phases/{rulesetPhase}/entrypoint/versions` | List a zone entry point ruleset's versions |
| `client.api.zoneRulesets.getZoneEntrypointRulesetVersion` | `GET /zones/{zoneId}/rulesets/phases/{rulesetPhase}/entrypoint/versions/{rulesetVersion}` | Get a zone entry point ruleset version |
| `client.api.zoneRulesets.deleteZoneRuleset` | `DELETE /zones/{zoneId}/rulesets/{rulesetId}` | Delete a zone ruleset |
| `client.api.zoneRulesets.getZoneRuleset` | `GET /zones/{zoneId}/rulesets/{rulesetId}` | Get a zone ruleset |
| `client.api.zoneRulesets.updateZoneRuleset` | `PUT /zones/{zoneId}/rulesets/{rulesetId}` | Update a zone ruleset |
| `client.api.zoneRulesets.createZoneRulesetRule` | `POST /zones/{zoneId}/rulesets/{rulesetId}/rules` | Create a zone ruleset rule |
| `client.api.zoneRulesets.deleteZoneRulesetRule` | `DELETE /zones/{zoneId}/rulesets/{rulesetId}/rules/{ruleId}` | Delete a zone ruleset rule |
| `client.api.zoneRulesets.updateZoneRulesetRule` | `PATCH /zones/{zoneId}/rulesets/{rulesetId}/rules/{ruleId}` | Update a zone ruleset rule |
| `client.api.zoneRulesets.listZoneRulesetVersions` | `GET /zones/{zoneId}/rulesets/{rulesetId}/versions` | List a zone ruleset's versions |
| `client.api.zoneRulesets.deleteZoneRulesetVersion` | `DELETE /zones/{zoneId}/rulesets/{rulesetId}/versions/{rulesetVersion}` | Delete a zone ruleset version |
| `client.api.zoneRulesets.getZoneRulesetVersion` | `GET /zones/{zoneId}/rulesets/{rulesetId}/versions/{rulesetVersion}` | Get a zone ruleset version |
| `client.api.zoneRulesets.listZoneRulesetVersionRulesByTag` | `GET /zones/{zoneId}/rulesets/{rulesetId}/versions/{rulesetVersion}/by_tag/{ruleTag}` | List a zone ruleset version's rules by tag |

## schemaValidation

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.schemaValidation.schemaValidationListSchemasPaginated` | `GET /zones/{zoneId}/schema_validation/schemas` | List all uploaded schemas |
| `client.api.schemaValidation.schemaValidationCreateSchema` | `POST /zones/{zoneId}/schema_validation/schemas` | Upload a schema |
| `client.api.schemaValidation.schemaValidationListSchemaHosts` | `GET /zones/{zoneId}/schema_validation/schemas/hosts` | List hosts covered by uploaded schemas |
| `client.api.schemaValidation.schemaValidationDeleteSchema` | `DELETE /zones/{zoneId}/schema_validation/schemas/{schemaId}` | Delete a schema |
| `client.api.schemaValidation.schemaValidationGetSchema` | `GET /zones/{zoneId}/schema_validation/schemas/{schemaId}` | Get details of a schema |
| `client.api.schemaValidation.schemaValidationEditSchema` | `PATCH /zones/{zoneId}/schema_validation/schemas/{schemaId}` | Set schema validation state |
| `client.api.schemaValidation.schemaValidationExtractOperationsFromSchema` | `GET /zones/{zoneId}/schema_validation/schemas/{schemaId}/operations` | Retrieve all operations from the schema |

## schemaValidationSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.schemaValidationSettings.schemaValidationGetSettings` | `GET /zones/{zoneId}/schema_validation/settings` | Get global schema validation settings |
| `client.api.schemaValidationSettings.schemaValidationEditSettings` | `PATCH /zones/{zoneId}/schema_validation/settings` | Edit global schema validation settings |
| `client.api.schemaValidationSettings.schemaValidationUpdateSettings` | `PUT /zones/{zoneId}/schema_validation/settings` | Update global schema validation settings |
| `client.api.schemaValidationSettings.schemaValidationListPerOperationSettings` | `GET /zones/{zoneId}/schema_validation/settings/operations` | List per-operation schema validation settings |
| `client.api.schemaValidationSettings.schemaValidationBulkEditPerOperationSettings` | `PATCH /zones/{zoneId}/schema_validation/settings/operations` | Bulk edit per-operation schema validation settings |
| `client.api.schemaValidationSettings.schemaValidationDeletePerOperationSetting` | `DELETE /zones/{zoneId}/schema_validation/settings/operations/{operationId}` | Delete per-operation schema validation setting |
| `client.api.schemaValidationSettings.schemaValidationGetPerOperationSetting` | `GET /zones/{zoneId}/schema_validation/settings/operations/{operationId}` | Get per-operation schema validation setting |
| `client.api.schemaValidationSettings.schemaValidationUpdatePerOperationSetting` | `PUT /zones/{zoneId}/schema_validation/settings/operations/{operationId}` | Update per-operation schema validation setting |

## secondaryDnsSecondaryZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.secondaryDnsSecondaryZone.secondaryDnsSecondaryZoneForceAxfr` | `POST /zones/{zoneId}/secondary_dns/force_axfr` | Force AXFR |
| `client.api.secondaryDnsSecondaryZone.secondaryDnsSecondaryZoneDeleteSecondaryZoneConfiguration` | `DELETE /zones/{zoneId}/secondary_dns/incoming` | Delete Secondary Zone Configuration |
| `client.api.secondaryDnsSecondaryZone.secondaryDnsSecondaryZoneSecondaryZoneConfigurationDetails` | `GET /zones/{zoneId}/secondary_dns/incoming` | Secondary Zone Configuration Details |
| `client.api.secondaryDnsSecondaryZone.secondaryDnsSecondaryZoneCreateSecondaryZoneConfiguration` | `POST /zones/{zoneId}/secondary_dns/incoming` | Create Secondary Zone Configuration |
| `client.api.secondaryDnsSecondaryZone.secondaryDnsSecondaryZoneUpdateSecondaryZoneConfiguration` | `PUT /zones/{zoneId}/secondary_dns/incoming` | Update Secondary Zone Configuration |

## secondaryDnsPrimaryZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.secondaryDnsPrimaryZone.secondaryDnsPrimaryZoneDeletePrimaryZoneConfiguration` | `DELETE /zones/{zoneId}/secondary_dns/outgoing` | Delete Primary Zone Configuration |
| `client.api.secondaryDnsPrimaryZone.secondaryDnsPrimaryZonePrimaryZoneConfigurationDetails` | `GET /zones/{zoneId}/secondary_dns/outgoing` | Primary Zone Configuration Details |
| `client.api.secondaryDnsPrimaryZone.secondaryDnsPrimaryZoneCreatePrimaryZoneConfiguration` | `POST /zones/{zoneId}/secondary_dns/outgoing` | Create Primary Zone Configuration |
| `client.api.secondaryDnsPrimaryZone.secondaryDnsPrimaryZoneUpdatePrimaryZoneConfiguration` | `PUT /zones/{zoneId}/secondary_dns/outgoing` | Update Primary Zone Configuration |
| `client.api.secondaryDnsPrimaryZone.secondaryDnsPrimaryZoneDisableOutgoingZoneTransfers` | `POST /zones/{zoneId}/secondary_dns/outgoing/disable` | Disable Outgoing Zone Transfers |
| `client.api.secondaryDnsPrimaryZone.secondaryDnsPrimaryZoneEnableOutgoingZoneTransfers` | `POST /zones/{zoneId}/secondary_dns/outgoing/enable` | Enable Outgoing Zone Transfers |
| `client.api.secondaryDnsPrimaryZone.secondaryDnsPrimaryZoneForceDnsNotify` | `POST /zones/{zoneId}/secondary_dns/outgoing/force_notify` | Force DNS NOTIFY |
| `client.api.secondaryDnsPrimaryZone.secondaryDnsPrimaryZoneGetOutgoingZoneTransferStatus` | `GET /zones/{zoneId}/secondary_dns/outgoing/status` | Get Outgoing Zone Transfer Status |

## securityTxt

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.securityTxt.deleteSecurityTxt` | `DELETE /zones/{zoneId}/security-center/securitytxt` | Deletes security.txt |
| `client.api.securityTxt.getSecurityTxt` | `GET /zones/{zoneId}/security-center/securitytxt` | Retrieves security.txt |
| `client.api.securityTxt.updateSecurityTxt` | `PUT /zones/{zoneId}/security-center/securitytxt` | Updates security.txt |

## zoneSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneSettings.zoneSettingsGetAllZoneSettings` | `GET /zones/{zoneId}/settings` | Get all zone settings |
| `client.api.zoneSettings.zoneSettingsEditZoneSettingsInfo` | `PATCH /zones/{zoneId}/settings` | Edit multiple zone settings |
| `client.api.zoneSettings.zoneCacheSettingsDeleteAegisSetting` | `DELETE /zones/{zoneId}/settings/aegis` | Delete aegis setting |
| `client.api.zoneSettings.zoneCacheSettingsGetAegisSetting` | `GET /zones/{zoneId}/settings/aegis` | Get aegis setting |
| `client.api.zoneSettings.zoneCacheSettingsChangeAegisSetting` | `PATCH /zones/{zoneId}/settings/aegis` | Change aegis setting |
| `client.api.zoneSettings.zoneSettingsGetAutomaticPlatformOptimizationSetting` | `GET /zones/{zoneId}/settings/automatic_platform_optimization` | Get Automatic Platform Optimization setting |
| `client.api.zoneSettings.zoneSettingsChangeAutomaticPlatformOptimizationSetting` | `PATCH /zones/{zoneId}/settings/automatic_platform_optimization` | Change Automatic Platform Optimization setting |
| `client.api.zoneSettings.zoneSettingsGetBinaryAstSetting` | `GET /zones/{zoneId}/settings/binary_ast` | Get Binary AST setting |
| `client.api.zoneSettings.zoneSettingsChangeBinaryAstSetting` | `PATCH /zones/{zoneId}/settings/binary_ast` | Change Binary AST setting |
| `client.api.zoneSettings.zoneSettingsGetFontsSetting` | `GET /zones/{zoneId}/settings/fonts` | Get Cloudflare Fonts setting |
| `client.api.zoneSettings.zoneSettingsChangeFontsSetting` | `PATCH /zones/{zoneId}/settings/fonts` | Change Cloudflare Fonts setting |
| `client.api.zoneSettings.zoneSettingsGetH2PrioritizationSetting` | `GET /zones/{zoneId}/settings/h2_prioritization` | Get HTTP/2 Prioritization setting |
| `client.api.zoneSettings.zoneSettingsChangeH2PrioritizationSetting` | `PATCH /zones/{zoneId}/settings/h2_prioritization` | Change HTTP/2 Prioritization setting |
| `client.api.zoneSettings.zoneSettingsGetImageResizingSetting` | `GET /zones/{zoneId}/settings/image_resizing` | Get Image Transformations setting |
| `client.api.zoneSettings.zoneSettingsChangeImageResizingSetting` | `PATCH /zones/{zoneId}/settings/image_resizing` | Change Image Transformations setting |
| `client.api.zoneSettings.zoneCacheSettingsGetOriginH2MaxStreamsSetting` | `GET /zones/{zoneId}/settings/origin_h2_max_streams` | Get Origin H2 Max Streams Setting |
| `client.api.zoneSettings.zoneCacheSettingsChangeOriginH2MaxStreamsSetting` | `PATCH /zones/{zoneId}/settings/origin_h2_max_streams` | Change Origin H2 Max Streams Setting |
| `client.api.zoneSettings.zoneCacheSettingsGetOriginMaxHttpVersionSetting` | `GET /zones/{zoneId}/settings/origin_max_http_version` | Get Origin Max HTTP Version Setting |
| `client.api.zoneSettings.zoneCacheSettingsChangeOriginMaxHttpVersionSetting` | `PATCH /zones/{zoneId}/settings/origin_max_http_version` | Change Origin Max HTTP Version Setting |
| `client.api.zoneSettings.zoneSettingsGetSpeedBrainSetting` | `GET /zones/{zoneId}/settings/speed_brain` | Get Cloudflare Speed Brain setting |
| `client.api.zoneSettings.zoneSettingsChangeSpeedBrainSetting` | `PATCH /zones/{zoneId}/settings/speed_brain` | Change Cloudflare Speed Brain setting |
| `client.api.zoneSettings.zoneSettingsGetTransformationsAllowedOriginsSetting` | `GET /zones/{zoneId}/settings/transformations_allowed_origins` | Get Image Transformations Allowed Origins setting |
| `client.api.zoneSettings.zoneSettingsChangeTransformationsAllowedOriginsSetting` | `PATCH /zones/{zoneId}/settings/transformations_allowed_origins` | Change Image Transformations Allowed Origins setting |
| `client.api.zoneSettings.zoneSettingsGetTransformationsC2PaSetting` | `GET /zones/{zoneId}/settings/transformations_c2pa` | Get Image Transformations C2PA setting |
| `client.api.zoneSettings.zoneSettingsChangeTransformationsC2PaSetting` | `PATCH /zones/{zoneId}/settings/transformations_c2pa` | Change Image Transformations C2PA setting |
| `client.api.zoneSettings.zoneSettingsGetTransformationsConfig` | `GET /zones/{zoneId}/settings/transformations_config` | Get Transformations configuration |
| `client.api.zoneSettings.zoneSettingsChangeTransformationsConfig` | `PATCH /zones/{zoneId}/settings/transformations_config` | Change Transformations configuration |
| `client.api.zoneSettings.zoneSettingsGetSingleSetting` | `GET /zones/{zoneId}/settings/{settingId}` | Get zone setting |
| `client.api.zoneSettings.zoneSettingsEditSingleSetting` | `PATCH /zones/{zoneId}/settings/{settingId}` | Edit zone setting |

## originTls

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.originTls.sslDetectorAutoOriginTlsKexGetEnrollment` | `GET /zones/{zoneId}/settings/auto_origin_tls_kex` | Get Auto-Origin TLS KEX enrollment status for the given zone |
| `client.api.originTls.sslDetectorAutoOriginTlsKexPatchEnrollment` | `PATCH /zones/{zoneId}/settings/auto_origin_tls_kex` | Patch Auto-Origin TLS KEX enrollment status for the given zone |
| `client.api.originTls.zoneCacheSettingsDeleteOriginTlsComplianceModesSetting` | `DELETE /zones/{zoneId}/settings/origin_tls_compliance_modes` | Delete Origin TLS Compliance Modes setting |
| `client.api.originTls.zoneCacheSettingsGetOriginTlsComplianceModesSetting` | `GET /zones/{zoneId}/settings/origin_tls_compliance_modes` | Get Origin TLS Compliance Modes setting |
| `client.api.originTls.zoneCacheSettingsChangeOriginTlsComplianceModesSetting` | `PATCH /zones/{zoneId}/settings/origin_tls_compliance_modes` | Change Origin TLS Compliance Modes setting |
| `client.api.originTls.zoneCacheSettingsReplaceOriginTlsComplianceModesSetting` | `PUT /zones/{zoneId}/settings/origin_tls_compliance_modes` | Replace Origin TLS Compliance Modes setting |

## csamScannerSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.csamScannerSettings.csamScannerGetSetting` | `GET /zones/{zoneId}/settings/csam_scanner_third_party` | Get CSAM Scanner setting |
| `client.api.csamScannerSettings.csamScannerUpdateSetting` | `PATCH /zones/{zoneId}/settings/csam_scanner_third_party` | Update CSAM Scanner setting |

## googleTagGateway

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.googleTagGateway.zoneSettingsGetGoogleTagGatewayConfig` | `GET /zones/{zoneId}/settings/google-tag-gateway/config` | Get Google Tag Gateway configuration |
| `client.api.googleTagGateway.zoneSettingsChangeGoogleTagGatewayConfig` | `PUT /zones/{zoneId}/settings/google-tag-gateway/config` | Update Google Tag Gateway configuration |

## nelSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.nelSettings.nelSettingsGet` | `GET /zones/{zoneId}/settings/nel` | Get NEL setting |
| `client.api.nelSettings.nelSettingsEdit` | `PATCH /zones/{zoneId}/settings/nel` | Edit NEL setting |

## ohttpGateway

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ohttpGateway.ohttpGatewayDisable` | `DELETE /zones/{zoneId}/settings/ohttp-gateway` | Disable OHTTP Gateway |
| `client.api.ohttpGateway.ohttpGatewayGetEnablement` | `GET /zones/{zoneId}/settings/ohttp-gateway` | Get OHTTP Gateway enablement |
| `client.api.ohttpGateway.ohttpGatewayEnable` | `PUT /zones/{zoneId}/settings/ohttp-gateway` | Enable OHTTP Gateway |

## automaticSslTls

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.automaticSslTls.sslDetectorAutomaticModeGetEnrollment` | `GET /zones/{zoneId}/settings/ssl_automatic_mode` | Get Automatic SSL/TLS enrollment status for the given zone |
| `client.api.automaticSslTls.sslDetectorAutomaticModePatchEnrollment` | `PATCH /zones/{zoneId}/settings/ssl_automatic_mode` | Patch Automatic SSL/TLS Enrollment status for given zone |

## zaraz

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zaraz.getZonesZoneIdentifierZarazConfig` | `GET /zones/{zoneId}/settings/zaraz/config` | Get Zaraz configuration |
| `client.api.zaraz.putZonesZoneIdentifierZarazConfig` | `PUT /zones/{zoneId}/settings/zaraz/config` | Update Zaraz configuration |
| `client.api.zaraz.getZonesZoneIdentifierZarazDefault` | `GET /zones/{zoneId}/settings/zaraz/default` | Get default Zaraz configuration |
| `client.api.zaraz.getZonesZoneIdentifierZarazExport` | `GET /zones/{zoneId}/settings/zaraz/export` | Export Zaraz configuration |
| `client.api.zaraz.getZonesZoneIdentifierZarazHistory` | `GET /zones/{zoneId}/settings/zaraz/history` | List Zaraz historical configuration records |
| `client.api.zaraz.putZonesZoneIdentifierZarazHistory` | `PUT /zones/{zoneId}/settings/zaraz/history` | Restore Zaraz historical configuration by ID |
| `client.api.zaraz.getZonesZoneIdentifierZarazConfigHistory` | `GET /zones/{zoneId}/settings/zaraz/history/configs` | Get Zaraz historical configurations by ID(s) |
| `client.api.zaraz.postZonesZoneIdentifierZarazPublish` | `POST /zones/{zoneId}/settings/zaraz/publish` | Publish Zaraz preview configuration |
| `client.api.zaraz.getZonesZoneIdentifierZarazWorkflow` | `GET /zones/{zoneId}/settings/zaraz/workflow` | Get Zaraz workflow |
| `client.api.zaraz.putZonesZoneIdentifierZarazWorkflow` | `PUT /zones/{zoneId}/settings/zaraz/workflow` | Update Zaraz workflow |

## smartShieldSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.smartShieldSettings.smartShieldGetSettings` | `GET /zones/{zoneId}/smart_shield` | Get Smart Shield Settings |
| `client.api.smartShieldSettings.smartShieldPatchSettings` | `PATCH /zones/{zoneId}/smart_shield` | Patch Smart Shield Settings |

## cacheReserveClear

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cacheReserveClear.smartShieldSettingsGetCacheReserveClear` | `GET /zones/{zoneId}/smart_shield/cache_reserve_clear` | Get Cache Reserve Clear |
| `client.api.cacheReserveClear.smartShieldSettingsStartCacheReserveClear` | `POST /zones/{zoneId}/smart_shield/cache_reserve_clear` | Start Cache Reserve Clear |

## zoneSnippets

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneSnippets.listZoneSnippets` | `GET /zones/{zoneId}/snippets` | List zone snippets |
| `client.api.zoneSnippets.deleteZoneSnippetRules` | `DELETE /zones/{zoneId}/snippets/snippet_rules` | Delete zone snippet rules |
| `client.api.zoneSnippets.listZoneSnippetRules` | `GET /zones/{zoneId}/snippets/snippet_rules` | List zone snippet rules |
| `client.api.zoneSnippets.updateZoneSnippetRules` | `PUT /zones/{zoneId}/snippets/snippet_rules` | Update zone snippet rules |
| `client.api.zoneSnippets.deleteZoneSnippet` | `DELETE /zones/{zoneId}/snippets/{snippetName}` | Delete a zone snippet |
| `client.api.zoneSnippets.getZoneSnippet` | `GET /zones/{zoneId}/snippets/{snippetName}` | Get a zone snippet |
| `client.api.zoneSnippets.updateZoneSnippet` | `PUT /zones/{zoneId}/snippets/{snippetName}` | Update a zone snippet |
| `client.api.zoneSnippets.getZoneSnippetContent` | `GET /zones/{zoneId}/snippets/{snippetName}/content` | Get a zone snippet content |

## spectrumApplications

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.spectrumApplications.spectrumApplicationsListSpectrumApplications` | `GET /zones/{zoneId}/spectrum/apps` | List Spectrum applications |
| `client.api.spectrumApplications.spectrumApplicationsCreateSpectrumApplicationUsingANameForTheOrigin` | `POST /zones/{zoneId}/spectrum/apps` | Create Spectrum application using a name for the origin |
| `client.api.spectrumApplications.spectrumApplicationsDeleteSpectrumApplication` | `DELETE /zones/{zoneId}/spectrum/apps/{appId}` | Delete Spectrum application |
| `client.api.spectrumApplications.spectrumApplicationsGetSpectrumApplicationConfiguration` | `GET /zones/{zoneId}/spectrum/apps/{appId}` | Get Spectrum application configuration |
| `client.api.spectrumApplications.spectrumApplicationsUpdateSpectrumApplicationConfigurationUsingANameForTheOrigin` | `PUT /zones/{zoneId}/spectrum/apps/{appId}` | Update Spectrum application configuration using a name for the origin |
| `client.api.spectrumApplications.spectrumApplicationsListSpectrumApplicationProtocols` | `GET /zones/{zoneId}/spectrum/protocols` | List Spectrum application protocols |

## observatory

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.observatory.speedGetAvailabilities` | `GET /zones/{zoneId}/speed_api/availabilities` | Get quota and availability |
| `client.api.observatory.speedListPages` | `GET /zones/{zoneId}/speed_api/pages` | List tested webpages |
| `client.api.observatory.speedDeleteTests` | `DELETE /zones/{zoneId}/speed_api/pages/{url}/tests` | Delete all page tests |
| `client.api.observatory.speedListTestHistory` | `GET /zones/{zoneId}/speed_api/pages/{url}/tests` | List page test history |
| `client.api.observatory.speedCreateTest` | `POST /zones/{zoneId}/speed_api/pages/{url}/tests` | Start page test |
| `client.api.observatory.speedGetTest` | `GET /zones/{zoneId}/speed_api/pages/{url}/tests/{testId}` | Get a page test result |
| `client.api.observatory.speedListPageTrend` | `GET /zones/{zoneId}/speed_api/pages/{url}/trend` | List core web vital metrics trend |
| `client.api.observatory.speedDeleteTestSchedule` | `DELETE /zones/{zoneId}/speed_api/schedule/{url}` | Delete scheduled page test |
| `client.api.observatory.speedGetScheduledTest` | `GET /zones/{zoneId}/speed_api/schedule/{url}` | Get a page test schedule |
| `client.api.observatory.speedCreateScheduledTest` | `POST /zones/{zoneId}/speed_api/schedule/{url}` | Create scheduled page test |

## analyzeCertificate

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.analyzeCertificate.analyzeCertificateAnalyzeCertificate` | `POST /zones/{zoneId}/ssl/analyze` | Analyze Certificate |

## certificatePacks

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.certificatePacks.certificatePacksListCertificatePacks` | `GET /zones/{zoneId}/ssl/certificate_packs` | List Certificate Packs |
| `client.api.certificatePacks.certificatePacksOrderAdvancedCertificateManagerCertificatePack` | `POST /zones/{zoneId}/ssl/certificate_packs/order` | Order Advanced Certificate Manager Certificate Pack |
| `client.api.certificatePacks.certificatePacksGetCertificatePackQuotas` | `GET /zones/{zoneId}/ssl/certificate_packs/quota` | Get Certificate Pack Quotas |
| `client.api.certificatePacks.certificatePacksDeleteAdvancedCertificateManagerCertificatePack` | `DELETE /zones/{zoneId}/ssl/certificate_packs/{certificatePackId}` | Delete Advanced Certificate Manager Certificate Pack |
| `client.api.certificatePacks.certificatePacksGetCertificatePack` | `GET /zones/{zoneId}/ssl/certificate_packs/{certificatePackId}` | Get Certificate Pack |
| `client.api.certificatePacks.certificatePacksRestartValidationForAdvancedCertificateManagerCertificatePack` | `PATCH /zones/{zoneId}/ssl/certificate_packs/{certificatePackId}` | Restart Validation or Update Advanced Certificate Manager Certificate Pack |

## sslTlsModeRecommendation

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.sslTlsModeRecommendation.sslTlsModeRecommendationSslTlsRecommendation` | `GET /zones/{zoneId}/ssl/recommendation` | SSL/TLS Recommendation |

## universalSslSettingsForAZone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.universalSslSettingsForAZone.universalSslSettingsForAZoneUniversalSslSettingsDetails` | `GET /zones/{zoneId}/ssl/universal/settings` | Universal SSL Settings Details |
| `client.api.universalSslSettingsForAZone.universalSslSettingsForAZoneEditUniversalSslSettings` | `PATCH /zones/{zoneId}/ssl/universal/settings` | Edit Universal SSL Settings |

## sslVerification

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.sslVerification.sslVerificationSslVerificationDetails` | `GET /zones/{zoneId}/ssl/verification` | SSL Verification Details |
| `client.api.sslVerification.sslVerificationEditSslCertificatePackValidationMethod` | `PATCH /zones/{zoneId}/ssl/verification/{certificatePackId}` | Edit SSL Certificate Pack Validation Method |

## zoneSubscription

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.zoneSubscription.zoneSubscriptionDeleteZoneSubscription` | `DELETE /zones/{zoneId}/subscription` | Delete Zone Subscription |
| `client.api.zoneSubscription.zoneSubscriptionZoneSubscriptionDetails` | `GET /zones/{zoneId}/subscription` | Zone Subscription Details |
| `client.api.zoneSubscription.zoneSubscriptionCreateZoneSubscription` | `POST /zones/{zoneId}/subscription` | Create Zone Subscription |
| `client.api.zoneSubscription.zoneSubscriptionUpdateZoneSubscription` | `PUT /zones/{zoneId}/subscription` | Update Zone Subscription |
| `client.api.zoneSubscription.zoneSubscriptionDeleteZoneSubscriptions` | `DELETE /zones/{zoneId}/subscriptions` | Delete Zone Subscription |
| `client.api.zoneSubscription.zoneSubscriptionCreateZoneSubscriptions` | `POST /zones/{zoneId}/subscriptions` | Create Zone Subscription |
| `client.api.zoneSubscription.zoneSubscriptionUpdateZoneSubscriptions` | `PUT /zones/{zoneId}/subscriptions` | Update Zone Subscription |

## tokenValidationTokenConfiguration

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.tokenValidationTokenConfiguration.tokenValidationConfigList` | `GET /zones/{zoneId}/token_validation/config` | List token validation configurations |
| `client.api.tokenValidationTokenConfiguration.tokenValidationConfigCreate` | `POST /zones/{zoneId}/token_validation/config` | Create a token validation configuration |
| `client.api.tokenValidationTokenConfiguration.tokenValidationConfigDelete` | `DELETE /zones/{zoneId}/token_validation/config/{configId}` | Delete a token validation configuration |
| `client.api.tokenValidationTokenConfiguration.tokenValidationConfigGet` | `GET /zones/{zoneId}/token_validation/config/{configId}` | Get a token validation configuration |
| `client.api.tokenValidationTokenConfiguration.tokenValidationConfigEdit` | `PATCH /zones/{zoneId}/token_validation/config/{configId}` | Edit a token validation configuration |
| `client.api.tokenValidationTokenConfiguration.tokenValidationConfigCredentialsEdit` | `PATCH /zones/{zoneId}/token_validation/config/{configId}/credentials` | Edit token validation credentials |
| `client.api.tokenValidationTokenConfiguration.tokenValidationConfigCredentialsUpdate` | `PUT /zones/{zoneId}/token_validation/config/{configId}/credentials` | Replace token validation credentials |

## tokenValidationTokenRules

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.tokenValidationTokenRules.tokenValidationRulesList` | `GET /zones/{zoneId}/token_validation/rules` | List token validation rules |
| `client.api.tokenValidationTokenRules.tokenValidationRulesCreate` | `POST /zones/{zoneId}/token_validation/rules` | Create a token validation rule |
| `client.api.tokenValidationTokenRules.tokenValidationRulesBulkEdit` | `PATCH /zones/{zoneId}/token_validation/rules/bulk` | Edit token validation rules |
| `client.api.tokenValidationTokenRules.tokenValidationRulesBulkCreate` | `POST /zones/{zoneId}/token_validation/rules/bulk` | Create token validation rules |
| `client.api.tokenValidationTokenRules.tokenValidationRulesPreview` | `POST /zones/{zoneId}/token_validation/rules/preview` | Preview a token validation rule |
| `client.api.tokenValidationTokenRules.tokenValidationRulesDelete` | `DELETE /zones/{zoneId}/token_validation/rules/{ruleId}` | Delete a token validation rule |
| `client.api.tokenValidationTokenRules.tokenValidationRulesGet` | `GET /zones/{zoneId}/token_validation/rules/{ruleId}` | Get a token validation rule |
| `client.api.tokenValidationTokenRules.tokenValidationRulesEdit` | `PATCH /zones/{zoneId}/token_validation/rules/{ruleId}` | Edit a token validation rule |

## urlNormalization

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.urlNormalization.deleteUrlNormalization` | `DELETE /zones/{zoneId}/url_normalization` | Delete URL Normalization settings |
| `client.api.urlNormalization.getUrlNormalization` | `GET /zones/{zoneId}/url_normalization` | Get URL Normalization settings |
| `client.api.urlNormalization.updateUrlNormalization` | `PUT /zones/{zoneId}/url_normalization` | Update URL Normalization settings |

## web3Hostname

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.web3Hostname.web3HostnameListWeb3Hostnames` | `GET /zones/{zoneId}/web3/hostnames` | List Web3 Hostnames |
| `client.api.web3Hostname.web3HostnameCreateWeb3Hostname` | `POST /zones/{zoneId}/web3/hostnames` | Create Web3 Hostname |
| `client.api.web3Hostname.web3HostnameDeleteWeb3Hostname` | `DELETE /zones/{zoneId}/web3/hostnames/{identifier}` | Delete Web3 Hostname |
| `client.api.web3Hostname.web3HostnameWeb3HostnameDetails` | `GET /zones/{zoneId}/web3/hostnames/{identifier}` | Web3 Hostname Details |
| `client.api.web3Hostname.web3HostnameEditWeb3Hostname` | `PATCH /zones/{zoneId}/web3/hostnames/{identifier}` | Edit Web3 Hostname |
| `client.api.web3Hostname.web3HostnameIpfsUniversalPathGatewayContentListDetails` | `GET /zones/{zoneId}/web3/hostnames/{identifier}/ipfs_universal_path/content_list` | IPFS Universal Path Gateway Content List Details |
| `client.api.web3Hostname.web3HostnameUpdateIpfsUniversalPathGatewayContentList` | `PUT /zones/{zoneId}/web3/hostnames/{identifier}/ipfs_universal_path/content_list` | Update IPFS Universal Path Gateway Content List |
| `client.api.web3Hostname.web3HostnameListIpfsUniversalPathGatewayContentListEntries` | `GET /zones/{zoneId}/web3/hostnames/{identifier}/ipfs_universal_path/content_list/entries` | List IPFS Universal Path Gateway Content List Entries |
| `client.api.web3Hostname.web3HostnameCreateIpfsUniversalPathGatewayContentListEntry` | `POST /zones/{zoneId}/web3/hostnames/{identifier}/ipfs_universal_path/content_list/entries` | Create IPFS Universal Path Gateway Content List Entry |
| `client.api.web3Hostname.web3HostnameDeleteIpfsUniversalPathGatewayContentListEntry` | `DELETE /zones/{zoneId}/web3/hostnames/{identifier}/ipfs_universal_path/content_list/entries/{contentListEntryIdentifier}` | Delete IPFS Universal Path Gateway Content List Entry |
| `client.api.web3Hostname.web3HostnameIpfsUniversalPathGatewayContentListEntryDetails` | `GET /zones/{zoneId}/web3/hostnames/{identifier}/ipfs_universal_path/content_list/entries/{contentListEntryIdentifier}` | IPFS Universal Path Gateway Content List Entry Details |
| `client.api.web3Hostname.web3HostnameEditIpfsUniversalPathGatewayContentListEntry` | `PUT /zones/{zoneId}/web3/hostnames/{identifier}/ipfs_universal_path/content_list/entries/{contentListEntryIdentifier}` | Edit IPFS Universal Path Gateway Content List Entry |

## workerRoutes

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workerRoutes.workerRoutesListRoutes` | `GET /zones/{zoneId}/workers/routes` | List Worker Routes |
| `client.api.workerRoutes.workerRoutesCreateRoute` | `POST /zones/{zoneId}/workers/routes` | Create Worker Route |
| `client.api.workerRoutes.workerRoutesDeleteRoute` | `DELETE /zones/{zoneId}/workers/routes/{routeId}` | Delete Worker Route |
| `client.api.workerRoutes.workerRoutesGetRoute` | `GET /zones/{zoneId}/workers/routes/{routeId}` | Get Worker Route |
| `client.api.workerRoutes.workerRoutesUpdateRoute` | `PUT /zones/{zoneId}/workers/routes/{routeId}` | Replace Worker Route |
