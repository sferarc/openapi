# Operations

Generated from the LiteLLM API 1.109.1 OpenAPI spec; do not edit. 866 operations. Call an operation as `client.api.<tag>.<operation>(params)`, or by its request as `client.request("<METHOD> <path>", params)`.

## modelManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.modelManagement.modelListModelsGet` | `GET /models` | Model List |
| `client.api.modelManagement.modelListV1ModelsGet` | `GET /v1/models` | Model List |
| `client.api.modelManagement.modelInfoModelsModelIdGet` | `GET /models/{model_id}` | Model Info |
| `client.api.modelManagement.modelInfoV1ModelsModelIdGet` | `GET /v1/models/{model_id}` | Model Info |
| `client.api.modelManagement.modelInfoV2V2ModelInfoGet` | `GET /v2/model/info` | Model Info V2 |
| `client.api.modelManagement.modelInfoV1V1ModelInfoGet` | `GET /v1/model/info` | Model Info V1 |
| `client.api.modelManagement.modelInfoV1ModelInfoGet` | `GET /model/info` | Model Info V1 |
| `client.api.modelManagement.modelDeprecationsV1ModelDeprecationsGet` | `GET /v1/model/deprecations` | Model Deprecations |
| `client.api.modelManagement.modelDeprecationsModelDeprecationsGet` | `GET /model/deprecations` | Model Deprecations |
| `client.api.modelManagement.modelGroupInfoModelGroupInfoGet` | `GET /model_group/info` | Model Group Info |
| `client.api.modelManagement.publicModelHubPublicModelHubGet` | `GET /public/model_hub` | Public Model Hub |
| `client.api.modelManagement.publicModelHubInfoPublicModelHubInfoGet` | `GET /public/model_hub/info` | Public Model Hub Info |
| `client.api.modelManagement.getLitellmModelCostMapPublicLitellmModelCostMapGet` | `GET /public/litellm_model_cost_map` | Get Litellm Model Cost Map |
| `client.api.modelManagement.publicModelHubListPublicV1ModelHubGet` | `GET /public/v1/model_hub` | Public Model Hub List |
| `client.api.modelManagement.publicModelHubFacetPublicV1ModelHubFacetGet` | `GET /public/v1/model_hub/{facet}` | Public Model Hub Facet |
| `client.api.modelManagement.getKubernetesPodsModelModelIdKubernetesPodsGet` | `GET /model/{model_id}/kubernetes_pods` | Get Kubernetes Pods |
| `client.api.modelManagement.patchModelModelModelIdUpdatePatch` | `PATCH /model/{model_id}/update` | Patch Model |
| `client.api.modelManagement.blockModelModelBlockPost` | `POST /model/block` | Block Model |
| `client.api.modelManagement.unblockModelModelUnblockPost` | `POST /model/unblock` | Unblock Model |
| `client.api.modelManagement.deleteModelModelDeletePost` | `POST /model/delete` | Delete Model |
| `client.api.modelManagement.addNewModelModelNewPost` | `POST /model/new` | Add New Model |
| `client.api.modelManagement.updateModelModelUpdatePost` | `POST /model/update` | Update Model |
| `client.api.modelManagement.updatePublicModelGroupsModelGroupMakePublicPost` | `POST /model_group/make_public` | Update Public Model Groups |
| `client.api.modelManagement.updateUsefulLinksModelHubUpdateUsefulLinksPost` | `POST /model_hub/update_useful_links` | Update Useful Links |
| `client.api.modelManagement.getAutoRouterClassifierDefaultPromptAutoRouterClassifierDefaultPromptGet` | `GET /auto_router/classifier/default_prompt` | Get Auto Router Classifier Default Prompt |
| `client.api.modelManagement.previewAutoRouterClassifierPromptAutoRouterClassifierDefaultPromptPost` | `POST /auto_router/classifier/default_prompt` | Preview Auto Router Classifier Prompt |
| `client.api.modelManagement.createModelGroupAccessGroupNewPost` | `POST /access_group/new` | Create Model Group |
| `client.api.modelManagement.listAccessGroupsAccessGroupListGet` | `GET /access_group/list` | List Access Groups |
| `client.api.modelManagement.getAccessGroupInfoAccessGroupAccessGroupInfoGet` | `GET /access_group/{access_group}/info` | Get Access Group Info |
| `client.api.modelManagement.updateAccessGroupAccessGroupAccessGroupUpdatePut` | `PUT /access_group/{access_group}/update` | Update Access Group |
| `client.api.modelManagement.deleteAccessGroupAccessGroupAccessGroupDeleteDelete` | `DELETE /access_group/{access_group}/delete` | Delete Access Group |
| `client.api.modelManagement.getAccessGroupBudgetAccessGroupAccessGroupBudgetGet` | `GET /access_group/{access_group}/budget` | Get Access Group Budget |
| `client.api.modelManagement.setAccessGroupBudgetAccessGroupAccessGroupBudgetPut` | `PUT /access_group/{access_group}/budget` | Set Access Group Budget |
| `client.api.modelManagement.deleteAccessGroupBudgetAccessGroupAccessGroupBudgetDelete` | `DELETE /access_group/{access_group}/budget` | Delete Access Group Budget |
| `client.api.modelManagement.validateComplexityRouterConfigAutoRouterValidateComplexityRouterConfigPost` | `POST /auto_router/validate_complexity_router_config` | Validate Complexity Router Config |
| `client.api.modelManagement.getAutoRouterAvailabilityAutoRouterAvailabilityPost` | `POST /auto_router/availability` | Get Auto Router Availability |
| `client.api.modelManagement.previewAutoRouterRoutingAutoRouterTestRoutingPost` | `POST /auto_router/test_routing` | Preview Auto Router Routing |

## chatCompletions

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.chatCompletions.chatCompletionOpenaiDeploymentsModelChatCompletionsPost` | `POST /openai/deployments/{model}/chat/completions` | Chat Completion |
| `client.api.chatCompletions.chatCompletionEnginesModelChatCompletionsPost` | `POST /engines/{model}/chat/completions` | Chat Completion |
| `client.api.chatCompletions.chatCompletionChatCompletionsPost` | `POST /chat/completions` | Chat Completion |
| `client.api.chatCompletions.chatCompletionV1ChatCompletionsPost` | `POST /v1/chat/completions` | Chat Completion |

## completions

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.completions.completionOpenaiDeploymentsModelCompletionsPost` | `POST /openai/deployments/{model}/completions` | Completion |
| `client.api.completions.completionEnginesModelCompletionsPost` | `POST /engines/{model}/completions` | Completion |
| `client.api.completions.completionCompletionsPost` | `POST /completions` | Completion |
| `client.api.completions.completionV1CompletionsPost` | `POST /v1/completions` | Completion |

## embeddings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.embeddings.embeddingsOpenaiDeploymentsModelEmbeddingsPost` | `POST /openai/deployments/{model}/embeddings` | Embeddings |
| `client.api.embeddings.embeddingsEnginesModelEmbeddingsPost` | `POST /engines/{model}/embeddings` | Embeddings |
| `client.api.embeddings.embeddingsEmbeddingsPost` | `POST /embeddings` | Embeddings |
| `client.api.embeddings.embeddingsV1EmbeddingsPost` | `POST /v1/embeddings` | Embeddings |

## moderations

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.moderations.moderationsModerationsPost` | `POST /moderations` | Moderations |
| `client.api.moderations.moderationsV1ModerationsPost` | `POST /v1/moderations` | Moderations |

## audio

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.audio.audioSpeechAudioSpeechPost` | `POST /audio/speech` | Audio Speech |
| `client.api.audio.audioSpeechV1AudioSpeechPost` | `POST /v1/audio/speech` | Audio Speech |
| `client.api.audio.audioTranscriptionsAudioTranscriptionsPost` | `POST /audio/transcriptions` | Audio Transcriptions |
| `client.api.audio.audioTranscriptionsV1AudioTranscriptionsPost` | `POST /v1/audio/transcriptions` | Audio Transcriptions |

## assistants

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.assistants.getAssistantsAssistantsGet` | `GET /assistants` | Get Assistants |
| `client.api.assistants.createAssistantAssistantsPost` | `POST /assistants` | Create Assistant |
| `client.api.assistants.getAssistantsV1AssistantsGet` | `GET /v1/assistants` | Get Assistants |
| `client.api.assistants.createAssistantV1AssistantsPost` | `POST /v1/assistants` | Create Assistant |
| `client.api.assistants.deleteAssistantAssistantsAssistantIdDelete` | `DELETE /assistants/{assistant_id}` | Delete Assistant |
| `client.api.assistants.deleteAssistantV1AssistantsAssistantIdDelete` | `DELETE /v1/assistants/{assistant_id}` | Delete Assistant |
| `client.api.assistants.createThreadsThreadsPost` | `POST /threads` | Create Threads |
| `client.api.assistants.createThreadsV1ThreadsPost` | `POST /v1/threads` | Create Threads |
| `client.api.assistants.getThreadThreadsThreadIdGet` | `GET /threads/{thread_id}` | Get Thread |
| `client.api.assistants.getThreadV1ThreadsThreadIdGet` | `GET /v1/threads/{thread_id}` | Get Thread |
| `client.api.assistants.getMessagesThreadsThreadIdMessagesGet` | `GET /threads/{thread_id}/messages` | Get Messages |
| `client.api.assistants.addMessagesThreadsThreadIdMessagesPost` | `POST /threads/{thread_id}/messages` | Add Messages |
| `client.api.assistants.getMessagesV1ThreadsThreadIdMessagesGet` | `GET /v1/threads/{thread_id}/messages` | Get Messages |
| `client.api.assistants.addMessagesV1ThreadsThreadIdMessagesPost` | `POST /v1/threads/{thread_id}/messages` | Add Messages |
| `client.api.assistants.runThreadThreadsThreadIdRunsPost` | `POST /threads/{thread_id}/runs` | Run Thread |
| `client.api.assistants.runThreadV1ThreadsThreadIdRunsPost` | `POST /v1/threads/{thread_id}/runs` | Run Thread |

## llmUtils

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.llmUtils.tokenCounterUtilsTokenCounterPost` | `POST /utils/token_counter` | Token Counter |
| `client.api.llmUtils.supportedOpenaiParamsUtilsSupportedOpenaiParamsGet` | `GET /utils/supported_openai_params` | Supported Openai Params |
| `client.api.llmUtils.modelInfoLookupUtilsModelInfoGet` | `GET /utils/model_info` | Model Info Lookup |
| `client.api.llmUtils.transformRequestUtilsTransformRequestPost` | `POST /utils/transform_request` | Transform Request |

## default

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.default.homeGet` | `GET /` | Home |
| `client.api.default.getRoutesRoutesGet` | `GET /routes` | Get Routes |
| `client.api.default.getPublicFusePresetsPublicComplexityRouterFusePresetsGet` | `GET /public/complexity_router/fuse_presets` | Get Public Fuse Presets |
| `client.api.default.getPassThroughEndpointsConfigPassThroughEndpointTeamTeamIdGet` | `GET /config/pass_through_endpoint/team/{team_id}` | Get Pass Through Endpoints |
| `client.api.default.getPassThroughEndpointsConfigPassThroughEndpointGet` | `GET /config/pass_through_endpoint` | Get Pass Through Endpoints |
| `client.api.default.createPassThroughEndpointsConfigPassThroughEndpointPost` | `POST /config/pass_through_endpoint` | Create Pass Through Endpoints |
| `client.api.default.deletePassThroughEndpointsConfigPassThroughEndpointDelete` | `DELETE /config/pass_through_endpoint` | Delete Pass Through Endpoints |
| `client.api.default.updatePassThroughEndpointsConfigPassThroughEndpointEndpointIdPost` | `POST /config/pass_through_endpoint/{endpoint_id}` | Update Pass Through Endpoints |
| `client.api.default.listAvailableTeamsTeamAvailableGet` | `GET /team/available` | List Available Teams |
| `client.api.default.providerBudgetsProviderBudgetsGet` | `GET /provider/budgets` | Provider Budgets |
| `client.api.default.getActiveTasksStatsDebugAsyncioTasksGet` | `GET /debug/asyncio-tasks` | Get Active Tasks Stats |
| `client.api.default.getRobotsRobotsTxtGet` | `GET /robots.txt` | Get Robots |
| `client.api.default.getUiConfigLitellmWellKnownLitellmUiConfigGet` | `GET /litellm/.well-known/litellm-ui-config` | Get Ui Config |
| `client.api.default.getUiConfigWellKnownLitellmUiConfigGet` | `GET /.well-known/litellm-ui-config` | Get Ui Config |
| `client.api.default.proxyMcpRouteMcpProxyGet` | `GET /mcp/proxy` | Proxy Mcp Route |
| `client.api.default.proxyMcpRouteMcpProxyPut` | `PUT /mcp/proxy` | Proxy Mcp Route |
| `client.api.default.proxyMcpRouteMcpProxyPost` | `POST /mcp/proxy` | Proxy Mcp Route |
| `client.api.default.proxyMcpRouteMcpProxyPatch` | `PATCH /mcp/proxy` | Proxy Mcp Route |
| `client.api.default.proxyMcpRouteMcpProxyDelete` | `DELETE /mcp/proxy` | Proxy Mcp Route |
| `client.api.default.proxyMcpRouteMcpProxyHead` | `HEAD /mcp/proxy` | Proxy Mcp Route |
| `client.api.default.proxyMcpRouteMcpProxyOptions` | `OPTIONS /mcp/proxy` | Proxy Mcp Route |
| `client.api.default.aggregateMcpRouteMcpGet` | `GET /mcp` | Aggregate Mcp Route |
| `client.api.default.aggregateMcpRouteMcpPut` | `PUT /mcp` | Aggregate Mcp Route |
| `client.api.default.aggregateMcpRouteMcpPost` | `POST /mcp` | Aggregate Mcp Route |
| `client.api.default.aggregateMcpRouteMcpPatch` | `PATCH /mcp` | Aggregate Mcp Route |
| `client.api.default.aggregateMcpRouteMcpDelete` | `DELETE /mcp` | Aggregate Mcp Route |
| `client.api.default.aggregateMcpRouteMcpHead` | `HEAD /mcp` | Aggregate Mcp Route |
| `client.api.default.aggregateMcpRouteMcpOptions` | `OPTIONS /mcp` | Aggregate Mcp Route |
| `client.api.default.toolsetMcpRouteToolsetToolsetNameMcpGet` | `GET /toolset/{toolset_name}/mcp` | Toolset Mcp Route |
| `client.api.default.toolsetMcpRouteToolsetToolsetNameMcpPut` | `PUT /toolset/{toolset_name}/mcp` | Toolset Mcp Route |
| `client.api.default.toolsetMcpRouteToolsetToolsetNameMcpPost` | `POST /toolset/{toolset_name}/mcp` | Toolset Mcp Route |
| `client.api.default.toolsetMcpRouteToolsetToolsetNameMcpPatch` | `PATCH /toolset/{toolset_name}/mcp` | Toolset Mcp Route |
| `client.api.default.toolsetMcpRouteToolsetToolsetNameMcpDelete` | `DELETE /toolset/{toolset_name}/mcp` | Toolset Mcp Route |
| `client.api.default.toolsetMcpRouteToolsetToolsetNameMcpHead` | `HEAD /toolset/{toolset_name}/mcp` | Toolset Mcp Route |
| `client.api.default.toolsetMcpRouteToolsetToolsetNameMcpOptions` | `OPTIONS /toolset/{toolset_name}/mcp` | Toolset Mcp Route |
| `client.api.default.dynamicMcpRouteMcpServerNameMcpGet` | `GET /{mcp_server_name}/mcp` | Dynamic Mcp Route |
| `client.api.default.dynamicMcpRouteMcpServerNameMcpPut` | `PUT /{mcp_server_name}/mcp` | Dynamic Mcp Route |
| `client.api.default.dynamicMcpRouteMcpServerNameMcpPost` | `POST /{mcp_server_name}/mcp` | Dynamic Mcp Route |
| `client.api.default.dynamicMcpRouteMcpServerNameMcpPatch` | `PATCH /{mcp_server_name}/mcp` | Dynamic Mcp Route |
| `client.api.default.dynamicMcpRouteMcpServerNameMcpDelete` | `DELETE /{mcp_server_name}/mcp` | Dynamic Mcp Route |
| `client.api.default.dynamicMcpRouteMcpServerNameMcpHead` | `HEAD /{mcp_server_name}/mcp` | Dynamic Mcp Route |
| `client.api.default.dynamicMcpRouteMcpServerNameMcpOptions` | `OPTIONS /{mcp_server_name}/mcp` | Dynamic Mcp Route |

## adaptiveRouter

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.adaptiveRouter.getAdaptiveRouterStateAdaptiveRouterStateGet` | `GET /adaptive_router/state` | Get Adaptive Router State |

## responses

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.responses.responsesApiOpenaiV1ResponsesPost` | `POST /openai/v1/responses` | Responses Api |
| `client.api.responses.responsesApiResponsesPost` | `POST /responses` | Responses Api |
| `client.api.responses.responsesApiV1ResponsesPost` | `POST /v1/responses` | Responses Api |
| `client.api.responses.cursorModelListCursorV1ModelsGet` | `GET /cursor/v1/models` | Cursor Model List |
| `client.api.responses.cursorModelListCursorModelsGet` | `GET /cursor/models` | Cursor Model List |
| `client.api.responses.cursorChatCompletionsCursorChatCompletionsPost` | `POST /cursor/chat/completions` | Cursor Chat Completions |
| `client.api.responses.getResponseOpenaiV1ResponsesResponseIdGet` | `GET /openai/v1/responses/{response_id}` | Get Response |
| `client.api.responses.deleteResponseOpenaiV1ResponsesResponseIdDelete` | `DELETE /openai/v1/responses/{response_id}` | Delete Response |
| `client.api.responses.getResponseResponsesResponseIdGet` | `GET /responses/{response_id}` | Get Response |
| `client.api.responses.deleteResponseResponsesResponseIdDelete` | `DELETE /responses/{response_id}` | Delete Response |
| `client.api.responses.getResponseV1ResponsesResponseIdGet` | `GET /v1/responses/{response_id}` | Get Response |
| `client.api.responses.deleteResponseV1ResponsesResponseIdDelete` | `DELETE /v1/responses/{response_id}` | Delete Response |
| `client.api.responses.getResponseInputItemsOpenaiV1ResponsesResponseIdInputItemsGet` | `GET /openai/v1/responses/{response_id}/input_items` | Get Response Input Items |
| `client.api.responses.getResponseInputItemsResponsesResponseIdInputItemsGet` | `GET /responses/{response_id}/input_items` | Get Response Input Items |
| `client.api.responses.getResponseInputItemsV1ResponsesResponseIdInputItemsGet` | `GET /v1/responses/{response_id}/input_items` | Get Response Input Items |
| `client.api.responses.compactResponseOpenaiV1ResponsesCompactPost` | `POST /openai/v1/responses/compact` | Compact Response |
| `client.api.responses.compactResponseResponsesCompactPost` | `POST /responses/compact` | Compact Response |
| `client.api.responses.compactResponseV1ResponsesCompactPost` | `POST /v1/responses/compact` | Compact Response |
| `client.api.responses.responsesInputTokensOpenaiV1ResponsesInputTokensPost` | `POST /openai/v1/responses/input_tokens` | Responses Input Tokens |
| `client.api.responses.responsesInputTokensResponsesInputTokensPost` | `POST /responses/input_tokens` | Responses Input Tokens |
| `client.api.responses.responsesInputTokensV1ResponsesInputTokensPost` | `POST /v1/responses/input_tokens` | Responses Input Tokens |
| `client.api.responses.cancelResponseOpenaiV1ResponsesResponseIdCancelPost` | `POST /openai/v1/responses/{response_id}/cancel` | Cancel Response |
| `client.api.responses.cancelResponseResponsesResponseIdCancelPost` | `POST /responses/{response_id}/cancel` | Cancel Response |
| `client.api.responses.cancelResponseV1ResponsesResponseIdCancelPost` | `POST /v1/responses/{response_id}/cancel` | Cancel Response |

## public

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.public.publicModelHubPublicModelHubGet` | `GET /public/model_hub` | Public Model Hub |
| `client.api.public.getAgentsPublicAgentHubGet` | `GET /public/agent_hub` | Get Agents |
| `client.api.public.getMcpServersPublicMcpHubGet` | `GET /public/mcp_hub` | Get Mcp Servers |
| `client.api.public.publicSkillHubPublicSkillHubGet` | `GET /public/skill_hub` | Public Skill Hub |
| `client.api.public.publicModelHubInfoPublicModelHubInfoGet` | `GET /public/model_hub/info` | Public Model Hub Info |
| `client.api.public.getSupportedProvidersPublicProvidersGet` | `GET /public/providers` | Get Supported Providers |
| `client.api.public.getProviderFieldsPublicProvidersFieldsGet` | `GET /public/providers/fields` | Get Provider Fields |
| `client.api.public.getComplexityScorerDefaultsPublicComplexityRouterScorerDefaultsGet` | `GET /public/complexity_router/scorer_defaults` | Get Complexity Scorer Defaults |
| `client.api.public.getLitellmModelCostMapPublicLitellmModelCostMapGet` | `GET /public/litellm_model_cost_map` | Get Litellm Model Cost Map |
| `client.api.public.getLitellmBlogPostsPublicLitellmBlogPostsGet` | `GET /public/litellm_blog_posts` | Get Litellm Blog Posts |
| `client.api.public.getPublicAutorouterPresetsPublicAutorouterPresetsGet` | `GET /public/autorouter_presets` | Get Public Autorouter Presets |
| `client.api.public.getSupportedEndpointsPublicEndpointsGet` | `GET /public/endpoints` | Get Supported Endpoints |
| `client.api.public.getAgentFieldsPublicAgentsFieldsGet` | `GET /public/agents/fields` | Get Agent Fields |
| `client.api.public.publicModelHubListPublicV1ModelHubGet` | `GET /public/v1/model_hub` | Public Model Hub List |
| `client.api.public.publicModelHubFacetPublicV1ModelHubFacetGet` | `GET /public/v1/model_hub/{facet}` | Public Model Hub Facet |
| `client.api.public.agentSkillsIndexWellKnownAgentSkillsIndexJsonGet` | `GET /.well-known/agent-skills/index.json` | Agent Skills Index |
| `client.api.public.agentSkillsArchiveV1SkillsSkillIdArchiveGet` | `GET /v1/skills/{skill_id}/archive` | Agent Skills Archive |

## betaAgents

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.betaAgents.getAgentsPublicAgentHubGet` | `GET /public/agent_hub` | Get Agents |
| `client.api.betaAgents.getAgentFieldsPublicAgentsFieldsGet` | `GET /public/agents/fields` | Get Agent Fields |

## betaMcp

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.betaMcp.getMcpServersPublicMcpHubGet` | `GET /public/mcp_hub` | Get Mcp Servers |

## claudeCodeMarketplace

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.claudeCodeMarketplace.publicSkillHubPublicSkillHubGet` | `GET /public/skill_hub` | Public Skill Hub |
| `client.api.claudeCodeMarketplace.getMarketplaceClaudeCodeMarketplaceJsonGet` | `GET /claude-code/marketplace.json` | Get Marketplace |
| `client.api.claudeCodeMarketplace.listPluginsClaudeCodePluginsGet` | `GET /claude-code/plugins` | List Plugins |
| `client.api.claudeCodeMarketplace.registerPluginClaudeCodePluginsPost` | `POST /claude-code/plugins` | Register Plugin |
| `client.api.claudeCodeMarketplace.getPluginClaudeCodePluginsPluginNameGet` | `GET /claude-code/plugins/{plugin_name}` | Get Plugin |
| `client.api.claudeCodeMarketplace.updatePluginClaudeCodePluginsPluginNamePut` | `PUT /claude-code/plugins/{plugin_name}` | Update Plugin |
| `client.api.claudeCodeMarketplace.deletePluginClaudeCodePluginsPluginNameDelete` | `DELETE /claude-code/plugins/{plugin_name}` | Delete Plugin |
| `client.api.claudeCodeMarketplace.disablePluginClaudeCodePluginsPluginNameDisablePost` | `POST /claude-code/plugins/{plugin_name}/disable` | Disable Plugin |
| `client.api.claudeCodeMarketplace.enablePluginClaudeCodePluginsPluginNameEnablePost` | `POST /claude-code/plugins/{plugin_name}/enable` | Enable Plugin |

## providers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.providers.getSupportedProvidersPublicProvidersGet` | `GET /public/providers` | Get Supported Providers |
| `client.api.providers.getProviderFieldsPublicProvidersFieldsGet` | `GET /public/providers/fields` | Get Provider Fields |

## autoRouter

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.autoRouter.getComplexityScorerDefaultsPublicComplexityRouterScorerDefaultsGet` | `GET /public/complexity_router/scorer_defaults` | Get Complexity Scorer Defaults |
| `client.api.autoRouter.getPublicAutorouterPresetsPublicAutorouterPresetsGet` | `GET /public/autorouter_presets` | Get Public Autorouter Presets |
| `client.api.autoRouter.getAutoRouterBenchmarksAutoRouterBenchmarksGet` | `GET /auto_router/benchmarks` | Get Auto Router Benchmarks |
| `client.api.autoRouter.getAutoRouterSessionAutoRouterSessionGet` | `GET /auto_router/session` | Get Auto Router Session |
| `client.api.autoRouter.startShadowEvalAutoRouterShadowEvalStartPost` | `POST /auto_router/shadow_eval/start` | Start Shadow Eval |
| `client.api.autoRouter.listShadowEvalJobsAutoRouterShadowEvalGet` | `GET /auto_router/shadow_eval` | List Shadow Eval Jobs |
| `client.api.autoRouter.getShadowEvalJobAutoRouterShadowEvalJobIdGet` | `GET /auto_router/shadow_eval/{job_id}` | Get Shadow Eval Job |
| `client.api.autoRouter.stopShadowEvalJobAutoRouterShadowEvalJobIdStopPost` | `POST /auto_router/shadow_eval/{job_id}/stop` | Stop Shadow Eval Job |

## rerank

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.rerank.rerankRerankPost` | `POST /rerank` | Rerank |
| `client.api.rerank.rerankV1RerankPost` | `POST /v1/rerank` | Rerank |
| `client.api.rerank.rerankV2RerankPost` | `POST /v2/rerank` | Rerank |

## ocr

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ocr.ocrOcrPost` | `POST /ocr` | Ocr |
| `client.api.ocr.ocrV1OcrPost` | `POST /v1/ocr` | Ocr |

## rag

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.rag.ragIngestRagIngestPost` | `POST /rag/ingest` | Rag Ingest |
| `client.api.rag.ragIngestV1RagIngestPost` | `POST /v1/rag/ingest` | Rag Ingest |
| `client.api.rag.ragQueryRagQueryPost` | `POST /rag/query` | Rag Query |
| `client.api.rag.ragQueryV1RagQueryPost` | `POST /v1/rag/query` | Rag Query |

## videos

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.videos.videoListVideosGet` | `GET /videos` | Video List |
| `client.api.videos.videoGenerationVideosPost` | `POST /videos` | Video Generation |
| `client.api.videos.videoListV1VideosGet` | `GET /v1/videos` | Video List |
| `client.api.videos.videoGenerationV1VideosPost` | `POST /v1/videos` | Video Generation |
| `client.api.videos.videoStatusVideosVideoIdGet` | `GET /videos/{video_id}` | Video Status |
| `client.api.videos.videoStatusV1VideosVideoIdGet` | `GET /v1/videos/{video_id}` | Video Status |
| `client.api.videos.videoContentVideosVideoIdContentGet` | `GET /videos/{video_id}/content` | Video Content |
| `client.api.videos.videoContentV1VideosVideoIdContentGet` | `GET /v1/videos/{video_id}/content` | Video Content |
| `client.api.videos.videoRemixVideosVideoIdRemixPost` | `POST /videos/{video_id}/remix` | Video Remix |
| `client.api.videos.videoRemixV1VideosVideoIdRemixPost` | `POST /v1/videos/{video_id}/remix` | Video Remix |
| `client.api.videos.videoCreateCharacterVideosCharactersPost` | `POST /videos/characters` | Video Create Character |
| `client.api.videos.videoCreateCharacterV1VideosCharactersPost` | `POST /v1/videos/characters` | Video Create Character |
| `client.api.videos.videoGetCharacterVideosCharactersCharacterIdGet` | `GET /videos/characters/{character_id}` | Video Get Character |
| `client.api.videos.videoGetCharacterV1VideosCharactersCharacterIdGet` | `GET /v1/videos/characters/{character_id}` | Video Get Character |
| `client.api.videos.videoEditVideosEditsPost` | `POST /videos/edits` | Video Edit |
| `client.api.videos.videoEditV1VideosEditsPost` | `POST /v1/videos/edits` | Video Edit |
| `client.api.videos.videoExtensionVideosExtensionsPost` | `POST /videos/extensions` | Video Extension |
| `client.api.videos.videoExtensionV1VideosExtensionsPost` | `POST /v1/videos/extensions` | Video Extension |

## containers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.containers.listContainersContainersGet` | `GET /containers` | List Containers |
| `client.api.containers.createContainerContainersPost` | `POST /containers` | Create Container |
| `client.api.containers.listContainersV1ContainersGet` | `GET /v1/containers` | List Containers |
| `client.api.containers.createContainerV1ContainersPost` | `POST /v1/containers` | Create Container |
| `client.api.containers.retrieveContainerContainersContainerIdGet` | `GET /containers/{container_id}` | Retrieve Container |
| `client.api.containers.deleteContainerContainersContainerIdDelete` | `DELETE /containers/{container_id}` | Delete Container |
| `client.api.containers.retrieveContainerV1ContainersContainerIdGet` | `GET /v1/containers/{container_id}` | Retrieve Container |
| `client.api.containers.deleteContainerV1ContainersContainerIdDelete` | `DELETE /v1/containers/{container_id}` | Delete Container |
| `client.api.containers.handlerContainerIdV1ContainersContainerIdFilesGet` | `GET /v1/containers/{container_id}/files` | Handler Container Id |
| `client.api.containers.handlerMultipartUploadV1ContainersContainerIdFilesPost` | `POST /v1/containers/{container_id}/files` | Handler Multipart Upload |
| `client.api.containers.handlerContainerIdContainersContainerIdFilesGet` | `GET /containers/{container_id}/files` | Handler Container Id |
| `client.api.containers.handlerMultipartUploadContainersContainerIdFilesPost` | `POST /containers/{container_id}/files` | Handler Multipart Upload |
| `client.api.containers.handlerContainerFileV1ContainersContainerIdFilesFileIdGet` | `GET /v1/containers/{container_id}/files/{file_id}` | Handler Container File |
| `client.api.containers.handlerContainerFileV1ContainersContainerIdFilesFileIdDelete` | `DELETE /v1/containers/{container_id}/files/{file_id}` | Handler Container File |
| `client.api.containers.handlerContainerFileContainersContainerIdFilesFileIdGet` | `GET /containers/{container_id}/files/{file_id}` | Handler Container File |
| `client.api.containers.handlerContainerFileContainersContainerIdFilesFileIdDelete` | `DELETE /containers/{container_id}/files/{file_id}` | Handler Container File |
| `client.api.containers.handlerBinaryContentV1ContainersContainerIdFilesFileIdContentGet` | `GET /v1/containers/{container_id}/files/{file_id}/content` | Handler Binary Content |
| `client.api.containers.handlerBinaryContentContainersContainerIdFilesFileIdContentGet` | `GET /containers/{container_id}/files/{file_id}/content` | Handler Binary Content |

## search

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.search.searchSearchPost` | `POST /search` | Search |
| `client.api.search.searchV1SearchPost` | `POST /v1/search` | Search |
| `client.api.search.searchSearchSearchToolNamePost` | `POST /search/{search_tool_name}` | Search |
| `client.api.search.searchV1SearchSearchToolNamePost` | `POST /v1/search/{search_tool_name}` | Search |
| `client.api.search.listSearchToolsSearchToolsGet` | `GET /search/tools` | List Search Tools |
| `client.api.search.listSearchToolsV1SearchToolsGet` | `GET /v1/search/tools` | List Search Tools |

## agentTracing

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.agentTracing.listAgentTracesV1TracesGet` | `GET /v1/traces` | List Agent Traces |
| `client.api.agentTracing.listTraceAgentsV1TracesAgentsGet` | `GET /v1/traces/agents` | List Trace Agents |
| `client.api.agentTracing.queryAgentTracesV1TracesQueryPost` | `POST /v1/traces/query` | Query Agent Traces |
| `client.api.agentTracing.helpAgentTraceQueriesV1TracesQueryHelpGet` | `GET /v1/traces/query/help` | Help Agent Trace Queries |
| `client.api.agentTracing.getAgentTraceV1TracesTraceIdGet` | `GET /v1/traces/{trace_id}` | Get Agent Trace |
| `client.api.agentTracing.getAgentTraceSpanV1TracesTraceIdSpansSpanIdGet` | `GET /v1/traces/{trace_id}/spans/{span_id}` | Get Agent Trace Span |
| `client.api.agentTracing.getAgentTraceSpanErrorV1TracesTraceIdSpansSpanIdErrorGet` | `GET /v1/traces/{trace_id}/spans/{span_id}/error` | Get Agent Trace Span Error |

## images

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.images.imageGenerationOpenaiDeploymentsModelImagesGenerationsPost` | `POST /openai/deployments/{model}/images/generations` | Image Generation |
| `client.api.images.imageGenerationImagesGenerationsPost` | `POST /images/generations` | Image Generation |
| `client.api.images.imageGenerationV1ImagesGenerationsPost` | `POST /v1/images/generations` | Image Generation |
| `client.api.images.imageEditApiOpenaiDeploymentsModelImagesEditsPost` | `POST /openai/deployments/{model}/images/edits` | Image Edit Api |
| `client.api.images.imageEditApiImagesEditsPost` | `POST /images/edits` | Image Edit Api |
| `client.api.images.imageEditApiV1ImagesEditsPost` | `POST /v1/images/edits` | Image Edit Api |

## fineTuning

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.fineTuning.listFineTuningJobsFineTuningJobsGet` | `GET /fine_tuning/jobs` | ✨ (Enterprise) List Fine-Tuning Jobs |
| `client.api.fineTuning.createFineTuningJobFineTuningJobsPost` | `POST /fine_tuning/jobs` | ✨ (Enterprise) Create Fine-Tuning Job |
| `client.api.fineTuning.listFineTuningJobsV1FineTuningJobsGet` | `GET /v1/fine_tuning/jobs` | ✨ (Enterprise) List Fine-Tuning Jobs |
| `client.api.fineTuning.createFineTuningJobV1FineTuningJobsPost` | `POST /v1/fine_tuning/jobs` | ✨ (Enterprise) Create Fine-Tuning Job |
| `client.api.fineTuning.retrieveFineTuningJobFineTuningJobsFineTuningJobIdGet` | `GET /fine_tuning/jobs/{fine_tuning_job_id}` | ✨ (Enterprise) Retrieve Fine-Tuning Job |
| `client.api.fineTuning.retrieveFineTuningJobV1FineTuningJobsFineTuningJobIdGet` | `GET /v1/fine_tuning/jobs/{fine_tuning_job_id}` | ✨ (Enterprise) Retrieve Fine-Tuning Job |
| `client.api.fineTuning.cancelFineTuningJobFineTuningJobsFineTuningJobIdCancelPost` | `POST /fine_tuning/jobs/{fine_tuning_job_id}/cancel` | ✨ (Enterprise) Cancel Fine-Tuning Jobs |
| `client.api.fineTuning.cancelFineTuningJobV1FineTuningJobsFineTuningJobIdCancelPost` | `POST /v1/fine_tuning/jobs/{fine_tuning_job_id}/cancel` | ✨ (Enterprise) Cancel Fine-Tuning Jobs |

## credentialManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.credentialManagement.getCredentialsCredentialsGet` | `GET /credentials` | Get Credentials |
| `client.api.credentialManagement.createCredentialCredentialsPost` | `POST /credentials` | Create Credential |
| `client.api.credentialManagement.getCredentialByNameCredentialsByNameCredentialNameGet` | `GET /credentials/by_name/{credential_name}` | Get Credential By Name |
| `client.api.credentialManagement.getCredentialInternalIssuerJwksCredentialsCredentialNameJwksGet` | `GET /credentials/{credential_name}/jwks` | Get Credential Internal Issuer Jwks |
| `client.api.credentialManagement.getCredentialByModelCredentialsByModelModelIdGet` | `GET /credentials/by_model/{model_id}` | Get Credential By Model |
| `client.api.credentialManagement.listUserConnectionsCredentialsUserConnectionsGet` | `GET /credentials/user_connections` | List User Connections |
| `client.api.credentialManagement.startUserConnectionCredentialsCredentialNameUserConnectionStartPost` | `POST /credentials/{credential_name}/user_connection/start` | Start User Connection |
| `client.api.credentialManagement.pollUserConnectionCredentialsCredentialNameUserConnectionPollPost` | `POST /credentials/{credential_name}/user_connection/poll` | Poll User Connection |
| `client.api.credentialManagement.deleteUserConnectionCredentialsCredentialNameUserConnectionDelete` | `DELETE /credentials/{credential_name}/user_connection` | Delete User Connection |
| `client.api.credentialManagement.updateCredentialCredentialsCredentialNamePatch` | `PATCH /credentials/{credential_name}` | Update Credential |
| `client.api.credentialManagement.deleteCredentialCredentialsCredentialNameDelete` | `DELETE /credentials/{credential_name}` | Delete Credential |
| `client.api.credentialManagement.migrateEncryptionEndpointCredentialsMigrateEncryptionPost` | `POST /credentials/migrate-encryption` | Migrate Encryption Endpoint |
| `client.api.credentialManagement.checkEncryptionEndpointCredentialsMigrateEncryptionCheckGet` | `GET /credentials/migrate-encryption/check` | Check Encryption Endpoint |

## batch

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.batch.listBatchesBatchesGet` | `GET /batches` | List Batches |
| `client.api.batch.createBatchBatchesPost` | `POST /batches` | Create Batch |
| `client.api.batch.listBatchesV1BatchesGet` | `GET /v1/batches` | List Batches |
| `client.api.batch.createBatchV1BatchesPost` | `POST /v1/batches` | Create Batch |
| `client.api.batch.listBatchesProviderV1BatchesGet` | `GET /{provider}/v1/batches` | List Batches |
| `client.api.batch.createBatchProviderV1BatchesPost` | `POST /{provider}/v1/batches` | Create Batch |
| `client.api.batch.retrieveBatchBatchesBatchIdGet` | `GET /batches/{batch_id}` | Retrieve Batch |
| `client.api.batch.retrieveBatchV1BatchesBatchIdGet` | `GET /v1/batches/{batch_id}` | Retrieve Batch |
| `client.api.batch.retrieveBatchProviderV1BatchesBatchIdGet` | `GET /{provider}/v1/batches/{batch_id}` | Retrieve Batch |
| `client.api.batch.cancelBatchBatchesBatchIdCancelPost` | `POST /batches/{batch_id}/cancel` | Cancel Batch |
| `client.api.batch.cancelBatchV1BatchesBatchIdCancelPost` | `POST /v1/batches/{batch_id}/cancel` | Cancel Batch |
| `client.api.batch.cancelBatchProviderV1BatchesBatchIdCancelPost` | `POST /{provider}/v1/batches/{batch_id}/cancel` | Cancel Batch |

## files

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.files.listFilesFilesGet` | `GET /files` | List Files |
| `client.api.files.createFileFilesPost` | `POST /files` | Create File |
| `client.api.files.listFilesV1FilesGet` | `GET /v1/files` | List Files |
| `client.api.files.createFileV1FilesPost` | `POST /v1/files` | Create File |
| `client.api.files.listFilesProviderV1FilesGet` | `GET /{provider}/v1/files` | List Files |
| `client.api.files.createFileProviderV1FilesPost` | `POST /{provider}/v1/files` | Create File |
| `client.api.files.getFileContentFilesFileIdContentGet` | `GET /files/{file_id}/content` | Get File Content |
| `client.api.files.getFileContentV1FilesFileIdContentGet` | `GET /v1/files/{file_id}/content` | Get File Content |
| `client.api.files.getFileContentProviderV1FilesFileIdContentGet` | `GET /{provider}/v1/files/{file_id}/content` | Get File Content |
| `client.api.files.getFileFilesFileIdGet` | `GET /files/{file_id}` | Get File |
| `client.api.files.deleteFileFilesFileIdDelete` | `DELETE /files/{file_id}` | Delete File |
| `client.api.files.getFileV1FilesFileIdGet` | `GET /v1/files/{file_id}` | Get File |
| `client.api.files.deleteFileV1FilesFileIdDelete` | `DELETE /v1/files/{file_id}` | Delete File |
| `client.api.files.getFileProviderV1FilesFileIdGet` | `GET /{provider}/v1/files/{file_id}` | Get File |
| `client.api.files.deleteFileProviderV1FilesFileIdDelete` | `DELETE /{provider}/v1/files/{file_id}` | Delete File |

## health

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.health.testEndpointTestGet` | `GET /test` | Test Endpoint |
| `client.api.health.healthServicesEndpointHealthServicesGet` | `GET /health/services` | Health Services Endpoint |
| `client.api.health.healthEndpointHealthGet` | `GET /health` | Health Endpoint |
| `client.api.health.healthCheckHistoryEndpointHealthHistoryGet` | `GET /health/history` | Health Check History Endpoint |
| `client.api.health.latestHealthChecksEndpointHealthLatestGet` | `GET /health/latest` | Latest Health Checks Endpoint |
| `client.api.health.sharedHealthCheckStatusEndpointHealthSharedStatusGet` | `GET /health/shared-status` | Shared Health Check Status Endpoint |
| `client.api.health.healthLicenseEndpointHealthLicenseGet` | `GET /health/license` | Health License Endpoint |
| `client.api.health.activeCallbacksActiveCallbacksGet` | `GET /active/callbacks` | Active Callbacks |
| `client.api.health.activeCallbacksSettingsGet` | `GET /settings` | Active Callbacks |
| `client.api.health.healthReadinessHealthReadinessGet` | `GET /health/readiness` | Health Readiness |
| `client.api.health.healthReadinessOptionsHealthReadinessOptions` | `OPTIONS /health/readiness` | Health Readiness Options |
| `client.api.health.healthReadinessDetailsHealthReadinessDetailsGet` | `GET /health/readiness/details` | Health Readiness Details |
| `client.api.health.healthBacklogHealthBacklogGet` | `GET /health/backlog` | Health Backlog |
| `client.api.health.healthDrainHealthDrainGet` | `GET /health/drain` | Health Drain |
| `client.api.health.healthLivelinessHealthLivenessGet` | `GET /health/liveness` | Health Liveliness |
| `client.api.health.healthLivelinessOptionsHealthLivenessOptions` | `OPTIONS /health/liveness` | Health Liveliness Options |
| `client.api.health.healthLivelinessHealthLivelinessGet` | `GET /health/liveliness` | Health Liveliness |
| `client.api.health.healthLivelinessOptionsHealthLivelinessOptions` | `OPTIONS /health/liveliness` | Health Liveliness Options |
| `client.api.health.testModelConnectionHealthTestConnectionPost` | `POST /health/test_connection` | Test Model Connection |
| `client.api.health.getDeploymentWarningsHealthDeploymentWarningsGet` | `GET /health/deployment_warnings` | Get Deployment Warnings |
| `client.api.health.updateDeploymentWarningIgnoreHealthDeploymentWarningsWarningIdPatch` | `PATCH /health/deployment_warnings/{warning_id}` | Update Deployment Warning Ignore |

## keyManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.keyManagement.generateKeyFnKeyGeneratePost` | `POST /key/generate` | Generate Key Fn |
| `client.api.keyManagement.generateServiceAccountKeyFnKeyServiceAccountGeneratePost` | `POST /key/service-account/generate` | Generate Service Account Key Fn |
| `client.api.keyManagement.updateKeyFnKeyUpdatePost` | `POST /key/update` | Update Key Fn |
| `client.api.keyManagement.bulkUpdateKeysKeyBulkUpdatePost` | `POST /key/bulk_update` | Bulk Update Keys |
| `client.api.keyManagement.bulkUpdateTeamKeysTeamKeyBulkUpdatePost` | `POST /team/key/bulk_update` | Bulk Update Team Keys |
| `client.api.keyManagement.deleteKeyFnKeyDeletePost` | `POST /key/delete` | Delete Key Fn |
| `client.api.keyManagement.infoKeyFnKeyInfoGet` | `GET /key/info` | Info Key Fn |
| `client.api.keyManagement.regenerateKeyFnKeyRegeneratePost` | `POST /key/regenerate` | Regenerate Key Fn |
| `client.api.keyManagement.regenerateKeyFnKeyKeyRegeneratePost` | `POST /key/{key}/regenerate` | Regenerate Key Fn |
| `client.api.keyManagement.resetKeySpendFnKeyKeyResetSpendPost` | `POST /key/{key}/reset_spend` | Reset Key Spend Fn |
| `client.api.keyManagement.listKeysKeyListGet` | `GET /key/list` | List Keys |
| `client.api.keyManagement.keyAliasesKeyAliasesGet` | `GET /key/aliases` | Key Aliases |
| `client.api.keyManagement.blockKeyKeyBlockPost` | `POST /key/block` | Block Key |
| `client.api.keyManagement.unblockKeyKeyUnblockPost` | `POST /key/unblock` | Unblock Key |
| `client.api.keyManagement.keyHealthKeyHealthPost` | `POST /key/health` | Key Health |

## internalUserManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.internalUserManagement.newUserUserNewPost` | `POST /user/new` | New User |
| `client.api.internalUserManagement.userInfoUserInfoGet` | `GET /user/info` | User Info |
| `client.api.internalUserManagement.userInfoV2V2UserInfoGet` | `GET /v2/user/info` | User Info V2 |
| `client.api.internalUserManagement.userUpdateUserUpdatePost` | `POST /user/update` | User Update |
| `client.api.internalUserManagement.bulkUserUpdateUserBulkUpdatePost` | `POST /user/bulk_update` | Bulk User Update |
| `client.api.internalUserManagement.getUsersUserListGet` | `GET /user/list` | Get Users |
| `client.api.internalUserManagement.deleteUserUserDeletePost` | `POST /user/delete` | Delete User |
| `client.api.internalUserManagement.getUserDailyActivityUserDailyActivityGet` | `GET /user/daily/activity` | Get User Daily Activity |
| `client.api.internalUserManagement.getUserDailyActivityAggregatedUserDailyActivityAggregatedGet` | `GET /user/daily/activity/aggregated` | Get User Daily Activity Aggregated |
| `client.api.internalUserManagement.getUserDailyActivityAggregatedKeysUserDailyActivityAggregatedKeysGet` | `GET /user/daily/activity/aggregated/keys` | Get User Daily Activity Aggregated Keys |
| `client.api.internalUserManagement.getUserDailyActivityAggregatedSearchUserDailyActivityAggregatedSearchGet` | `GET /user/daily/activity/aggregated/search` | Get User Daily Activity Aggregated Search |
| `client.api.internalUserManagement.getUserDailyActivityModelTopKeysUserDailyActivityAggregatedModelTopKeysGet` | `GET /user/daily/activity/aggregated/model_top_keys` | Get User Daily Activity Model Top Keys |
| `client.api.internalUserManagement.getUserDailyActivityExportUserDailyActivityExportGet` | `GET /user/daily/activity/export` | Get User Daily Activity Export |
| `client.api.internalUserManagement.getUserDailyActivityAggregatedUsersUserDailyActivityAggregatedUsersGet` | `GET /user/daily/activity/aggregated/users` | Get User Daily Activity Aggregated Users |
| `client.api.internalUserManagement.getUserDailyActivityCacheLeakageKeysUserDailyActivityAggregatedCacheLeakageKeysGet` | `GET /user/daily/activity/aggregated/cache_leakage_keys` | Get User Daily Activity Cache Leakage Keys |
| `client.api.internalUserManagement.changePasswordUserPasswordChangePost` | `POST /user/password/change` | Change Password |
| `client.api.internalUserManagement.bulkCreateUsersRouteManagementV1UsersBulkPost` | `POST /management/v1/users/bulk` | Bulk Create Users Route |
| `client.api.internalUserManagement.bulkDeleteUsersActionManagementV1UsersBulkDeletePost` | `POST /management/v1/users/bulk_delete` | Bulk Delete Users Action |
| `client.api.internalUserManagement.availableEnterpriseUsersUserAvailableUsersGet` | `GET /user/available_users` | Available Enterprise Users |

## budgetSpendTracking

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.budgetSpendTracking.getUserDailyActivityUserDailyActivityGet` | `GET /user/daily/activity` | Get User Daily Activity |
| `client.api.budgetSpendTracking.getUserDailyActivityAggregatedUserDailyActivityAggregatedGet` | `GET /user/daily/activity/aggregated` | Get User Daily Activity Aggregated |
| `client.api.budgetSpendTracking.getUserDailyActivityAggregatedKeysUserDailyActivityAggregatedKeysGet` | `GET /user/daily/activity/aggregated/keys` | Get User Daily Activity Aggregated Keys |
| `client.api.budgetSpendTracking.getUserDailyActivityAggregatedSearchUserDailyActivityAggregatedSearchGet` | `GET /user/daily/activity/aggregated/search` | Get User Daily Activity Aggregated Search |
| `client.api.budgetSpendTracking.getUserDailyActivityModelTopKeysUserDailyActivityAggregatedModelTopKeysGet` | `GET /user/daily/activity/aggregated/model_top_keys` | Get User Daily Activity Model Top Keys |
| `client.api.budgetSpendTracking.getUserDailyActivityExportUserDailyActivityExportGet` | `GET /user/daily/activity/export` | Get User Daily Activity Export |
| `client.api.budgetSpendTracking.getUserDailyActivityAggregatedUsersUserDailyActivityAggregatedUsersGet` | `GET /user/daily/activity/aggregated/users` | Get User Daily Activity Aggregated Users |
| `client.api.budgetSpendTracking.getUserDailyActivityCacheLeakageKeysUserDailyActivityAggregatedCacheLeakageKeysGet` | `GET /user/daily/activity/aggregated/cache_leakage_keys` | Get User Daily Activity Cache Leakage Keys |
| `client.api.budgetSpendTracking.listSpendLogEndUsersManagementV1SpendLogsEndUsersGet` | `GET /management/v1/spend_logs/end_users` | List Spend Log End Users |
| `client.api.budgetSpendTracking.listSpendLogUsersManagementV1SpendLogsUsersGet` | `GET /management/v1/spend_logs/users` | List Spend Log Users |
| `client.api.budgetSpendTracking.viewSpendTagsSpendTagsGet` | `GET /spend/tags` | View Spend Tags |
| `client.api.budgetSpendTracking.getSpendCaptureRateSpendCaptureRateGet` | `GET /spend/capture_rate` | Get Spend Capture Rate |
| `client.api.budgetSpendTracking.getGlobalSpendReportGlobalSpendReportGet` | `GET /global/spend/report` | Get Global Spend Report |
| `client.api.budgetSpendTracking.getKeySpendReportKeySpendReportGet` | `GET /key/spend/report` | Get Key Spend Report |
| `client.api.budgetSpendTracking.getUserSpendReportUserSpendReportGet` | `GET /user/spend/report` | Get User Spend Report |
| `client.api.budgetSpendTracking.getTeamSpendReportTeamSpendReportGet` | `GET /team/spend/report` | Get Team Spend Report |
| `client.api.budgetSpendTracking.getOrganizationSpendReportOrganizationSpendReportGet` | `GET /organization/spend/report` | Get Organization Spend Report |
| `client.api.budgetSpendTracking.globalViewSpendTagsGlobalSpendTagsGet` | `GET /global/spend/tags` | Global View Spend Tags |
| `client.api.budgetSpendTracking.calculateSpendSpendCalculatePost` | `POST /spend/calculate` | Calculate Spend |
| `client.api.budgetSpendTracking.uiViewSpendLogsSpendLogsV2Get` | `GET /spend/logs/v2` | Ui View Spend Logs |
| `client.api.budgetSpendTracking.viewSpendLogsSpendLogsGet` | `GET /spend/logs` | View Spend Logs |
| `client.api.budgetSpendTracking.globalSpendResetGlobalSpendResetPost` | `POST /global/spend/reset` | Global Spend Reset |
| `client.api.budgetSpendTracking.addAllowedIpAddAllowedIpPost` | `POST /add/allowed_ip` | Add Allowed Ip |
| `client.api.budgetSpendTracking.deleteAllowedIpDeleteAllowedIpPost` | `POST /delete/allowed_ip` | Delete Allowed Ip |
| `client.api.budgetSpendTracking.getGatewayDailyActivityGatewayDailyActivityGet` | `GET /gateway/daily/activity` | Get Gateway Daily Activity |
| `client.api.budgetSpendTracking.getRequestErrorActivityGatewayErrorsActivityGet` | `GET /gateway/errors/activity` | Get Request Error Activity |

## teamManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.teamManagement.getTeamDailyActivityAggregatedTeamDailyActivityAggregatedGet` | `GET /team/daily/activity/aggregated` | Get Team Daily Activity Aggregated |
| `client.api.teamManagement.getTeamDailyActivityAggregatedKeysTeamDailyActivityAggregatedKeysGet` | `GET /team/daily/activity/aggregated/keys` | Get Team Daily Activity Aggregated Keys |
| `client.api.teamManagement.getTeamDailyActivityAggregatedSearchTeamDailyActivityAggregatedSearchGet` | `GET /team/daily/activity/aggregated/search` | Get Team Daily Activity Aggregated Search |
| `client.api.teamManagement.getTeamDailyActivityModelTopKeysTeamDailyActivityAggregatedModelTopKeysGet` | `GET /team/daily/activity/aggregated/model_top_keys` | Get Team Daily Activity Model Top Keys |
| `client.api.teamManagement.getTeamDailyActivityExportTeamDailyActivityExportGet` | `GET /team/daily/activity/export` | Get Team Daily Activity Export |
| `client.api.teamManagement.newTeamTeamNewPost` | `POST /team/new` | New Team |
| `client.api.teamManagement.updateTeamTeamUpdatePost` | `POST /team/update` | Update Team |
| `client.api.teamManagement.patchTeamTeamTeamIdPatch` | `PATCH /team/{team_id}` | Patch Team |
| `client.api.teamManagement.teamMemberAddTeamMemberAddPost` | `POST /team/member_add` | Team Member Add |
| `client.api.teamManagement.teamMemberDeleteTeamMemberDeletePost` | `POST /team/member_delete` | Team Member Delete |
| `client.api.teamManagement.teamMemberUpdateTeamMemberUpdatePost` | `POST /team/member_update` | Team Member Update |
| `client.api.teamManagement.resetTeamMemberSpendFnTeamTeamIdMemberUserIdResetSpendPost` | `POST /team/{team_id}/member/{user_id}/reset_spend` | Reset Team Member Spend Fn |
| `client.api.teamManagement.resetTeamMemberBudgetFnTeamTeamIdMemberUserIdResetBudgetPost` | `POST /team/{team_id}/member/{user_id}/reset_budget` | Reset Team Member Budget Fn |
| `client.api.teamManagement.bulkTeamMemberAddTeamBulkMemberAddPost` | `POST /team/bulk_member_add` | Bulk Team Member Add |
| `client.api.teamManagement.deleteTeamTeamDeletePost` | `POST /team/delete` | Delete Team |
| `client.api.teamManagement.teamInfoTeamInfoGet` | `GET /team/info` | Team Info |
| `client.api.teamManagement.teamMemberMeTeamTeamIdMembersMeGet` | `GET /team/{team_id}/members/me` | Team Member Me |
| `client.api.teamManagement.blockTeamTeamBlockPost` | `POST /team/block` | Block Team |
| `client.api.teamManagement.unblockTeamTeamUnblockPost` | `POST /team/unblock` | Unblock Team |
| `client.api.teamManagement.getTeamMetadataSchemaTeamMetadataSchemaGet` | `GET /team/metadata_schema` | Get Team Metadata Schema |
| `client.api.teamManagement.listTeamV2V2TeamListGet` | `GET /v2/team/list` | List Team V2 |
| `client.api.teamManagement.listTeamTeamListGet` | `GET /team/list` | List Team |
| `client.api.teamManagement.teamModelAddTeamModelAddPost` | `POST /team/model/add` | Team Model Add |
| `client.api.teamManagement.teamModelDeleteTeamModelDeletePost` | `POST /team/model/delete` | Team Model Delete |
| `client.api.teamManagement.teamMemberPermissionsTeamPermissionsListGet` | `GET /team/permissions_list` | Team Member Permissions |
| `client.api.teamManagement.updateTeamMemberPermissionsTeamPermissionsUpdatePost` | `POST /team/permissions_update` | Update Team Member Permissions |
| `client.api.teamManagement.bulkUpdateTeamMemberPermissionsTeamPermissionsBulkUpdatePost` | `POST /team/permissions_bulk_update` | Bulk Update Team Member Permissions |
| `client.api.teamManagement.getTeamDailyActivityTeamDailyActivityGet` | `GET /team/daily/activity` | Get Team Daily Activity |
| `client.api.teamManagement.getTeamSpendByUserTeamSpendByUserGet` | `GET /team/spend/by_user` | Get Team Spend By User |
| `client.api.teamManagement.bulkDeleteTeamMembersActionManagementV1TeamsTeamIdMembersBulkDeletePost` | `POST /management/v1/teams/{team_id}/members/bulk_delete` | Bulk Delete Team Members Action |
| `client.api.teamManagement.bulkUpdateTeamMemberBudgetsActionManagementV1TeamsTeamIdMembersBulkUpdatePost` | `POST /management/v1/teams/{team_id}/members/bulk_update` | Bulk Update Team Member Budgets Action |
| `client.api.teamManagement.getTeamCallbacksTeamTeamIdCallbackGet` | `GET /team/{team_id}/callback` | Get Team Callbacks |
| `client.api.teamManagement.addTeamCallbacksTeamTeamIdCallbackPost` | `POST /team/{team_id}/callback` | Add Team Callbacks |
| `client.api.teamManagement.deleteTeamCallbackTeamTeamIdCallbackCallbackNameDelete` | `DELETE /team/{team_id}/callback/{callback_name}` | Delete Team Callback |
| `client.api.teamManagement.disableTeamLoggingTeamTeamIdDisableLoggingPost` | `POST /team/{team_id}/disable_logging` | Disable Team Logging |

## tagManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.tagManagement.getTagDailyActivityAggregatedTagDailyActivityAggregatedGet` | `GET /tag/daily/activity/aggregated` | Get Tag Daily Activity Aggregated |
| `client.api.tagManagement.getTagDailyActivityAggregatedKeysTagDailyActivityAggregatedKeysGet` | `GET /tag/daily/activity/aggregated/keys` | Get Tag Daily Activity Aggregated Keys |
| `client.api.tagManagement.getTagDailyActivityAggregatedSearchTagDailyActivityAggregatedSearchGet` | `GET /tag/daily/activity/aggregated/search` | Get Tag Daily Activity Aggregated Search |
| `client.api.tagManagement.getTagDailyActivityModelTopKeysTagDailyActivityAggregatedModelTopKeysGet` | `GET /tag/daily/activity/aggregated/model_top_keys` | Get Tag Daily Activity Model Top Keys |
| `client.api.tagManagement.getTagDailyActivityExportTagDailyActivityExportGet` | `GET /tag/daily/activity/export` | Get Tag Daily Activity Export |
| `client.api.tagManagement.newTagTagNewPost` | `POST /tag/new` | New Tag |
| `client.api.tagManagement.updateTagTagUpdatePost` | `POST /tag/update` | Update Tag |
| `client.api.tagManagement.infoTagTagInfoPost` | `POST /tag/info` | Info Tag |
| `client.api.tagManagement.listTagsTagListGet` | `GET /tag/list` | List Tags |
| `client.api.tagManagement.deleteTagTagDeletePost` | `POST /tag/delete` | Delete Tag |
| `client.api.tagManagement.getTagDailyActivityTagDailyActivityGet` | `GET /tag/daily/activity` | Get Tag Daily Activity |
| `client.api.tagManagement.getDistinctUserAgentTagsTagDistinctGet` | `GET /tag/distinct` | Get Distinct User Agent Tags |
| `client.api.tagManagement.getDailyActiveUsersTagDauGet` | `GET /tag/dau` | Get Daily Active Users |
| `client.api.tagManagement.getWeeklyActiveUsersTagWauGet` | `GET /tag/wau` | Get Weekly Active Users |
| `client.api.tagManagement.getMonthlyActiveUsersTagMauGet` | `GET /tag/mau` | Get Monthly Active Users |
| `client.api.tagManagement.getTagSummaryTagSummaryGet` | `GET /tag/summary` | Get Tag Summary |
| `client.api.tagManagement.getPerUserAnalyticsTagUserAgentPerUserAnalyticsGet` | `GET /tag/user-agent/per-user-analytics` | Get Per User Analytics |

## organizationManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.organizationManagement.getOrganizationDailyActivityAggregatedOrganizationDailyActivityAggregatedGet` | `GET /organization/daily/activity/aggregated` | Get Organization Daily Activity Aggregated |
| `client.api.organizationManagement.getOrganizationDailyActivityAggregatedKeysOrganizationDailyActivityAggregatedKeysGet` | `GET /organization/daily/activity/aggregated/keys` | Get Organization Daily Activity Aggregated Keys |
| `client.api.organizationManagement.getOrganizationDailyActivityAggregatedSearchOrganizationDailyActivityAggregatedSearchGet` | `GET /organization/daily/activity/aggregated/search` | Get Organization Daily Activity Aggregated Search |
| `client.api.organizationManagement.getOrganizationDailyActivityModelTopKeysOrganizationDailyActivityAggregatedModelTopKeysGet` | `GET /organization/daily/activity/aggregated/model_top_keys` | Get Organization Daily Activity Model Top Keys |
| `client.api.organizationManagement.getOrganizationDailyActivityExportOrganizationDailyActivityExportGet` | `GET /organization/daily/activity/export` | Get Organization Daily Activity Export |
| `client.api.organizationManagement.newOrganizationOrganizationNewPost` | `POST /organization/new` | New Organization |
| `client.api.organizationManagement.getOrganizationDailyActivityOrganizationDailyActivityGet` | `GET /organization/daily/activity` | Get Organization Daily Activity |
| `client.api.organizationManagement.updateOrganizationOrganizationUpdatePatch` | `PATCH /organization/update` | Update Organization |
| `client.api.organizationManagement.updateOrganizationV2V2OrganizationOrganizationIdPatch` | `PATCH /v2/organization/{organization_id}` | Update Organization V2 |
| `client.api.organizationManagement.deleteOrganizationOrganizationDeleteDelete` | `DELETE /organization/delete` | Delete Organization |
| `client.api.organizationManagement.listOrganizationOrganizationListGet` | `GET /organization/list` | List Organization |
| `client.api.organizationManagement.infoOrganizationOrganizationInfoGet` | `GET /organization/info` | Info Organization |
| `client.api.organizationManagement.deprecatedInfoOrganizationOrganizationInfoPost` | `POST /organization/info` | Deprecated Info Organization |
| `client.api.organizationManagement.organizationMemberAddOrganizationMemberAddPost` | `POST /organization/member_add` | Organization Member Add |
| `client.api.organizationManagement.organizationMemberUpdateOrganizationMemberUpdatePatch` | `PATCH /organization/member_update` | Organization Member Update |
| `client.api.organizationManagement.organizationMemberDeleteOrganizationMemberDeleteDelete` | `DELETE /organization/member_delete` | Organization Member Delete |

## customerManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.customerManagement.getCustomerDailyActivityAggregatedCustomerDailyActivityAggregatedGet` | `GET /customer/daily/activity/aggregated` | Get Customer Daily Activity Aggregated |
| `client.api.customerManagement.getCustomerDailyActivityAggregatedKeysCustomerDailyActivityAggregatedKeysGet` | `GET /customer/daily/activity/aggregated/keys` | Get Customer Daily Activity Aggregated Keys |
| `client.api.customerManagement.getCustomerDailyActivityAggregatedSearchCustomerDailyActivityAggregatedSearchGet` | `GET /customer/daily/activity/aggregated/search` | Get Customer Daily Activity Aggregated Search |
| `client.api.customerManagement.getCustomerDailyActivityModelTopKeysCustomerDailyActivityAggregatedModelTopKeysGet` | `GET /customer/daily/activity/aggregated/model_top_keys` | Get Customer Daily Activity Model Top Keys |
| `client.api.customerManagement.getCustomerDailyActivityExportCustomerDailyActivityExportGet` | `GET /customer/daily/activity/export` | Get Customer Daily Activity Export |
| `client.api.customerManagement.blockUserCustomerBlockPost` | `POST /customer/block` | Block User |
| `client.api.customerManagement.unblockUserCustomerUnblockPost` | `POST /customer/unblock` | Unblock User |
| `client.api.customerManagement.newEndUserCustomerNewPost` | `POST /customer/new` | New End User |
| `client.api.customerManagement.endUserInfoCustomerInfoGet` | `GET /customer/info` | End User Info |
| `client.api.customerManagement.updateEndUserCustomerUpdatePost` | `POST /customer/update` | Update End User |
| `client.api.customerManagement.deleteEndUserCustomerDeletePost` | `POST /customer/delete` | Delete End User |
| `client.api.customerManagement.listEndUserCustomerListGet` | `GET /customer/list` | List End User |
| `client.api.customerManagement.getCustomerDailyActivityCustomerDailyActivityGet` | `GET /customer/daily/activity` | Get Customer Daily Activity |

## agentManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.agentManagement.getAgentDailyActivityAggregatedAgentDailyActivityAggregatedGet` | `GET /agent/daily/activity/aggregated` | Get Agent Daily Activity Aggregated |
| `client.api.agentManagement.getAgentDailyActivityAggregatedKeysAgentDailyActivityAggregatedKeysGet` | `GET /agent/daily/activity/aggregated/keys` | Get Agent Daily Activity Aggregated Keys |
| `client.api.agentManagement.getAgentDailyActivityAggregatedSearchAgentDailyActivityAggregatedSearchGet` | `GET /agent/daily/activity/aggregated/search` | Get Agent Daily Activity Aggregated Search |
| `client.api.agentManagement.getAgentDailyActivityModelTopKeysAgentDailyActivityAggregatedModelTopKeysGet` | `GET /agent/daily/activity/aggregated/model_top_keys` | Get Agent Daily Activity Model Top Keys |
| `client.api.agentManagement.getAgentDailyActivityExportAgentDailyActivityExportGet` | `GET /agent/daily/activity/export` | Get Agent Daily Activity Export |

## uiSession

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.uiSession.sessionLogoutSessionLogoutPost` | `POST /session/logout` | Session Logout |

## experimental

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.experimental.ssoReadinessSsoReadinessGet` | `GET /sso/readiness` | Sso Readiness |

## budgetManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.budgetManagement.listBudgetsManagementV1BudgetsGet` | `GET /management/v1/budgets` | List Budgets |
| `client.api.budgetManagement.newBudgetBudgetNewPost` | `POST /budget/new` | New Budget |
| `client.api.budgetManagement.updateBudgetBudgetUpdatePost` | `POST /budget/update` | Update Budget |
| `client.api.budgetManagement.infoBudgetBudgetInfoPost` | `POST /budget/info` | Info Budget |
| `client.api.budgetManagement.budgetSettingsBudgetSettingsGet` | `GET /budget/settings` | Budget Settings |
| `client.api.budgetManagement.listBudgetBudgetListGet` | `GET /budget/list` | List Budget |
| `client.api.budgetManagement.deleteBudgetBudgetDeletePost` | `POST /budget/delete` | Delete Budget |

## caching

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.caching.cachePingCachePingGet` | `GET /cache/ping` | Cache Ping |
| `client.api.caching.cacheDeleteCacheDeletePost` | `POST /cache/delete` | Cache Delete |
| `client.api.caching.cacheRedisInfoCacheRedisInfoGet` | `GET /cache/redis/info` | Cache Redis Info |
| `client.api.caching.cacheFlushallCacheFlushallPost` | `POST /cache/flushall` | Cache Flushall |

## loggingCallbacks

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.loggingCallbacks.listCallbacksCallbacksListGet` | `GET /callbacks/list` | List Callbacks |
| `client.api.loggingCallbacks.getCallbackConfigsCallbacksConfigsGet` | `GET /callbacks/configs` | Get Callback Configs |

## rustControlPlane

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.rustControlPlane.ingestCallbackLogsV1RustControlPlaneLogsPost` | `POST /v1/rust_control_plane/logs` | Ingest Callback Logs |

## ssoSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ssoSettings.getInternalUserSettingsGetInternalUserSettingsGet` | `GET /get/internal_user_settings` | Get Internal User Settings |
| `client.api.ssoSettings.getDefaultTeamSettingsGetDefaultTeamSettingsGet` | `GET /get/default_team_settings` | Get Default Team Settings |
| `client.api.ssoSettings.updateInternalUserSettingsUpdateInternalUserSettingsPatch` | `PATCH /update/internal_user_settings` | Update Internal User Settings |
| `client.api.ssoSettings.updateDefaultTeamSettingsUpdateDefaultTeamSettingsPatch` | `PATCH /update/default_team_settings` | Update Default Team Settings |
| `client.api.ssoSettings.getSsoSettingsGetSsoSettingsGet` | `GET /get/sso_settings` | Get Sso Settings |
| `client.api.ssoSettings.updateSsoSettingsUpdateSsoSettingsPatch` | `PATCH /update/sso_settings` | Update Sso Settings |

## uiThemeSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.uiThemeSettings.getUiThemeSettingsGetUiThemeSettingsGet` | `GET /get/ui_theme_settings` | Get Ui Theme Settings |
| `client.api.uiThemeSettings.updateUiThemeSettingsUpdateUiThemeSettingsPatch` | `PATCH /update/ui_theme_settings` | Update Ui Theme Settings |
| `client.api.uiThemeSettings.uploadLogoUploadLogoPost` | `POST /upload/logo` | Upload Logo |

## settings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.settings.getMcpSemanticFilterSettingsGetMcpSemanticFilterSettingsGet` | `GET /get/mcp_semantic_filter_settings` | Get Mcp Semantic Filter Settings |
| `client.api.settings.updateMcpSemanticFilterSettingsUpdateMcpSemanticFilterSettingsPatch` | `PATCH /update/mcp_semantic_filter_settings` | Update Mcp Semantic Filter Settings |
| `client.api.settings.getWebsearchInterceptionSettingsGetWebsearchInterceptionSettingsGet` | `GET /get/websearch_interception_settings` | Get Websearch Interception Settings |
| `client.api.settings.updateWebsearchInterceptionSettingsUpdateWebsearchInterceptionSettingsPatch` | `PATCH /update/websearch_interception_settings` | Update Websearch Interception Settings |
| `client.api.settings.getMcpToolSearchSettingsGetMcpToolSearchSettingsGet` | `GET /get/mcp_tool_search_settings` | Get Mcp Tool Search Settings |
| `client.api.settings.updateMcpToolSearchSettingsUpdateMcpToolSearchSettingsPatch` | `PATCH /update/mcp_tool_search_settings` | Update Mcp Tool Search Settings |
| `client.api.settings.getBackgroundChatSettingsGetBackgroundChatSettingsGet` | `GET /get/background_chat_settings` | Get Background Chat Settings |
| `client.api.settings.updateBackgroundChatSettingsUpdateBackgroundChatSettingsPatch` | `PATCH /update/background_chat_settings` | Update Background Chat Settings |

## uiSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.uiSettings.getUiSettingsGetUiSettingsGet` | `GET /get/ui_settings` | Get Ui Settings |
| `client.api.uiSettings.updateUiSettingsUpdateUiSettingsPatch` | `PATCH /update/ui_settings` | Update Ui Settings |
| `client.api.uiSettings.getUserBannerGetUserBannerGet` | `GET /get/user_banner` | Get User Banner |
| `client.api.uiSettings.updateUserBannerUpdateUserBannerPatch` | `PATCH /update/user_banner` | Update User Banner |
| `client.api.uiSettings.latestReleaseInfoGetLatestReleaseInfoGet` | `GET /get/latest_release_info` | Latest Release Info |

## moyai

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.moyai.moyaiConnectStartMoyaiConnectStartPost` | `POST /moyai/connect/start` | Moyai Connect Start |
| `client.api.moyai.moyaiConnectExchangeMoyaiConnectExchangePost` | `POST /moyai/connect/exchange` | Moyai Connect Exchange |

## workflowManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.workflowManagement.listWorkflowRunsV1WorkflowsRunsGet` | `GET /v1/workflows/runs` | List Workflow Runs |
| `client.api.workflowManagement.createWorkflowRunV1WorkflowsRunsPost` | `POST /v1/workflows/runs` | Create Workflow Run |
| `client.api.workflowManagement.getWorkflowRunV1WorkflowsRunsRunIdGet` | `GET /v1/workflows/runs/{run_id}` | Get Workflow Run |
| `client.api.workflowManagement.updateWorkflowRunV1WorkflowsRunsRunIdPatch` | `PATCH /v1/workflows/runs/{run_id}` | Update Workflow Run |
| `client.api.workflowManagement.listWorkflowEventsV1WorkflowsRunsRunIdEventsGet` | `GET /v1/workflows/runs/{run_id}/events` | List Workflow Events |
| `client.api.workflowManagement.appendWorkflowEventV1WorkflowsRunsRunIdEventsPost` | `POST /v1/workflows/runs/{run_id}/events` | Append Workflow Event |
| `client.api.workflowManagement.listWorkflowMessagesV1WorkflowsRunsRunIdMessagesGet` | `GET /v1/workflows/runs/{run_id}/messages` | List Workflow Messages |
| `client.api.workflowManagement.appendWorkflowMessageV1WorkflowsRunsRunIdMessagesPost` | `POST /v1/workflows/runs/{run_id}/messages` | Append Workflow Message |

## memoryManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.memoryManagement.listMemoryV1MemoryGet` | `GET /v1/memory` | List Memory |
| `client.api.memoryManagement.createMemoryV1MemoryPost` | `POST /v1/memory` | Create Memory |
| `client.api.memoryManagement.getMemoryV1MemoryKeyGet` | `GET /v1/memory/{key}` | Get Memory |
| `client.api.memoryManagement.upsertMemoryV1MemoryKeyPut` | `PUT /v1/memory/{key}` | Upsert Memory |
| `client.api.memoryManagement.deleteMemoryV1MemoryKeyDelete` | `DELETE /v1/memory/{key}` | Delete Memory |

## lens

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.lens.serviceConnectionLensServiceGet` | `GET /lens/service` | Service Connection |
| `client.api.lens.lensRequestLensPathGet` | `GET /lens/{path}` | Lens Request |
| `client.api.lens.lensRequestLensPathPut` | `PUT /lens/{path}` | Lens Request |
| `client.api.lens.lensRequestLensPathPost` | `POST /lens/{path}` | Lens Request |
| `client.api.lens.lensRequestLensPathPatch` | `PATCH /lens/{path}` | Lens Request |
| `client.api.lens.lensRequestLensPathDelete` | `DELETE /lens/{path}` | Lens Request |
| `client.api.lens.lensRequestLensGet` | `GET /lens` | Lens Request |
| `client.api.lens.lensRequestLensPut` | `PUT /lens` | Lens Request |
| `client.api.lens.lensRequestLensPost` | `POST /lens` | Lens Request |
| `client.api.lens.lensRequestLensPatch` | `PATCH /lens` | Lens Request |
| `client.api.lens.lensRequestLensDelete` | `DELETE /lens` | Lens Request |

## plugins

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.plugins.listPluginsApiPluginsGet` | `GET /api/plugins` | List Plugins |
| `client.api.plugins.pluginAuthTokenApiPluginsAuthTokenGet` | `GET /api/plugins/auth-token` | Plugin Auth Token |

## costTracking

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.costTracking.predictCacheCostCostPredictCachePost` | `POST /cost/predict-cache` | Predict Cache Cost |
| `client.api.costTracking.getCostDiscountConfigConfigCostDiscountConfigGet` | `GET /config/cost_discount_config` | Get Cost Discount Config |
| `client.api.costTracking.updateCostDiscountConfigConfigCostDiscountConfigPatch` | `PATCH /config/cost_discount_config` | Update Cost Discount Config |
| `client.api.costTracking.getCostMarginConfigConfigCostMarginConfigGet` | `GET /config/cost_margin_config` | Get Cost Margin Config |
| `client.api.costTracking.updateCostMarginConfigConfigCostMarginConfigPatch` | `PATCH /config/cost_margin_config` | Update Cost Margin Config |
| `client.api.costTracking.getBlockRequestsForModelsWithoutPricingConfigBlockRequestsForModelsWithoutPricingGet` | `GET /config/block_requests_for_models_without_pricing` | Get Block Requests For Models Without Pricing |
| `client.api.costTracking.updateBlockRequestsForModelsWithoutPricingConfigBlockRequestsForModelsWithoutPricingPatch` | `PATCH /config/block_requests_for_models_without_pricing` | Update Block Requests For Models Without Pricing |
| `client.api.costTracking.estimateCostCostEstimatePost` | `POST /cost/estimate` | Estimate Cost |

## subscriptionAccounts

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.subscriptionAccounts.getSubscriptionUsageSubscriptionAccountsUsageGet` | `GET /subscription_accounts/usage` | Get Subscription Usage |
| `client.api.subscriptionAccounts.newSubscriptionAccountSubscriptionAccountsNewPost` | `POST /subscription_accounts/new` | New Subscription Account |
| `client.api.subscriptionAccounts.updateSubscriptionAccountSubscriptionAccountsUpdatePost` | `POST /subscription_accounts/update` | Update Subscription Account |
| `client.api.subscriptionAccounts.deleteSubscriptionAccountSubscriptionAccountsDeletePost` | `POST /subscription_accounts/delete` | Delete Subscription Account |

## costOptimization

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.costOptimization.getPromptCachingRequestsCostOptimizationPromptCachingRequestsGet` | `GET /cost_optimization/prompt_caching/requests` | Get Prompt Caching Requests |

## routerSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.routerSettings.getRouterSettingsRouterSettingsGet` | `GET /router/settings` | Get Router Settings |
| `client.api.routerSettings.getRouterFieldsRouterFieldsGet` | `GET /router/fields` | Get Router Fields |

## fallbackManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.fallbackManagement.createFallbackFallbackPost` | `POST /fallback` | Create Fallback |
| `client.api.fallbackManagement.getFallbackFallbackModelGet` | `GET /fallback/{model}` | Get Fallback |
| `client.api.fallbackManagement.deleteFallbackFallbackModelDelete` | `DELETE /fallback/{model}` | Delete Fallback |

## cacheSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cacheSettings.getCacheSettingsCacheSettingsGet` | `GET /cache/settings` | Get Cache Settings |
| `client.api.cacheSettings.updateCacheSettingsCacheSettingsPost` | `POST /cache/settings` | Update Cache Settings |
| `client.api.cacheSettings.testCacheConnectionCacheSettingsTestPost` | `POST /cache/settings/test` | Test Cache Connection |

## coordinationRedisSettings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.coordinationRedisSettings.getCoordinationRedisSettingsCoordinationRedisSettingsGet` | `GET /coordination_redis/settings` | Get Coordination Redis Settings |
| `client.api.coordinationRedisSettings.updateCoordinationRedisSettingsCoordinationRedisSettingsPost` | `POST /coordination_redis/settings` | Update Coordination Redis Settings |
| `client.api.coordinationRedisSettings.checkCoordinationRedisConnectionCoordinationRedisSettingsTestPost` | `POST /coordination_redis/settings/test` | Check Coordination Redis Connection |

## userAgentAnalytics

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.userAgentAnalytics.getDistinctUserAgentTagsTagDistinctGet` | `GET /tag/distinct` | Get Distinct User Agent Tags |
| `client.api.userAgentAnalytics.getDailyActiveUsersTagDauGet` | `GET /tag/dau` | Get Daily Active Users |
| `client.api.userAgentAnalytics.getWeeklyActiveUsersTagWauGet` | `GET /tag/wau` | Get Weekly Active Users |
| `client.api.userAgentAnalytics.getMonthlyActiveUsersTagMauGet` | `GET /tag/mau` | Get Monthly Active Users |
| `client.api.userAgentAnalytics.getTagSummaryTagSummaryGet` | `GET /tag/summary` | Get Tag Summary |
| `client.api.userAgentAnalytics.getPerUserAnalyticsTagUserAgentPerUserAnalyticsGet` | `GET /tag/user-agent/per-user-analytics` | Get Per User Analytics |

## telemetry

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.telemetry.recordUiEventTelemetryUiEventsPost` | `POST /telemetry/ui_events` | Record Ui Event |
| `client.api.telemetry.exportTelemetryReportsTelemetryReportsGet` | `GET /telemetry/reports` | Export Telemetry Reports |
| `client.api.telemetry.getTelemetrySettingsTelemetrySettingsGet` | `GET /telemetry/settings` | Get Telemetry Settings |
| `client.api.telemetry.updateTelemetrySettingsTelemetrySettingsPut` | `PUT /telemetry/settings` | Update Telemetry Settings |
| `client.api.telemetry.uiEventsEnabledTelemetryUiEventsEnabledGet` | `GET /telemetry/ui_events/enabled` | Ui Events Enabled |

## emailManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.emailManagement.getEmailEventSettingsEmailEventSettingsGet` | `GET /email/event_settings` | Get Email Event Settings |
| `client.api.emailManagement.updateEventSettingsEmailEventSettingsPatch` | `PATCH /email/event_settings` | Update Event Settings |
| `client.api.emailManagement.resetEventSettingsEmailEventSettingsResetPost` | `POST /email/event_settings/reset` | Reset Event Settings |

## auditLogging

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.auditLogging.getAuditLogsAuditGet` | `GET /audit` | Get Audit Logs |
| `client.api.auditLogging.getAuditLogByIdAuditIdGet` | `GET /audit/{id}` | Get Audit Log By Id |

## projectManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.projectManagement.newProjectProjectNewPost` | `POST /project/new` | New Project |
| `client.api.projectManagement.updateProjectProjectUpdatePost` | `POST /project/update` | Update Project |
| `client.api.projectManagement.deleteProjectProjectDeleteDelete` | `DELETE /project/delete` | Delete Project |
| `client.api.projectManagement.projectInfoProjectInfoGet` | `GET /project/info` | Project Info |
| `client.api.projectManagement.listProjectsProjectListGet` | `GET /project/list` | List Projects |

## skills

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.skills.agentSkillsIndexWellKnownAgentSkillsIndexJsonGet` | `GET /.well-known/agent-skills/index.json` | Agent Skills Index |
| `client.api.skills.agentSkillsArchiveV1SkillsSkillIdArchiveGet` | `GET /v1/skills/{skill_id}/archive` | Agent Skills Archive |

## googleGenaiEndpoints

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.googleGenaiEndpoints.googleGenerateContentModelsModelNameGenerateContentPost` | `POST /models/{model_name}:generateContent` | Google Generate Content |
| `client.api.googleGenaiEndpoints.googleGenerateContentV1BetaModelsModelNameGenerateContentPost` | `POST /v1beta/models/{model_name}:generateContent` | Google Generate Content |
| `client.api.googleGenaiEndpoints.googleStreamGenerateContentModelsModelNameStreamGenerateContentPost` | `POST /models/{model_name}:streamGenerateContent` | Google Stream Generate Content |
| `client.api.googleGenaiEndpoints.googleStreamGenerateContentV1BetaModelsModelNameStreamGenerateContentPost` | `POST /v1beta/models/{model_name}:streamGenerateContent` | Google Stream Generate Content |
| `client.api.googleGenaiEndpoints.googleCountTokensModelsModelNameCountTokensPost` | `POST /models/{model_name}:countTokens` | Google Count Tokens |
| `client.api.googleGenaiEndpoints.googleCountTokensV1BetaModelsModelNameCountTokensPost` | `POST /v1beta/models/{model_name}:countTokens` | Google Count Tokens |
| `client.api.googleGenaiEndpoints.createInteractionInteractionsPost` | `POST /interactions` | Create Interaction |
| `client.api.googleGenaiEndpoints.createInteractionV1BetaInteractionsPost` | `POST /v1beta/interactions` | Create Interaction |
| `client.api.googleGenaiEndpoints.getInteractionInteractionsInteractionIdGet` | `GET /interactions/{interaction_id}` | Get Interaction |
| `client.api.googleGenaiEndpoints.deleteInteractionInteractionsInteractionIdDelete` | `DELETE /interactions/{interaction_id}` | Delete Interaction |
| `client.api.googleGenaiEndpoints.getInteractionV1BetaInteractionsInteractionIdGet` | `GET /v1beta/interactions/{interaction_id}` | Get Interaction |
| `client.api.googleGenaiEndpoints.deleteInteractionV1BetaInteractionsInteractionIdDelete` | `DELETE /v1beta/interactions/{interaction_id}` | Delete Interaction |
| `client.api.googleGenaiEndpoints.cancelInteractionInteractionsInteractionIdCancelPost` | `POST /interactions/{interaction_id}/cancel` | Cancel Interaction |
| `client.api.googleGenaiEndpoints.cancelInteractionV1BetaInteractionsInteractionIdCancelPost` | `POST /v1beta/interactions/{interaction_id}/cancel` | Cancel Interaction |

## interactions

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.interactions.createInteractionInteractionsPost` | `POST /interactions` | Create Interaction |
| `client.api.interactions.createInteractionV1BetaInteractionsPost` | `POST /v1beta/interactions` | Create Interaction |
| `client.api.interactions.getInteractionInteractionsInteractionIdGet` | `GET /interactions/{interaction_id}` | Get Interaction |
| `client.api.interactions.deleteInteractionInteractionsInteractionIdDelete` | `DELETE /interactions/{interaction_id}` | Delete Interaction |
| `client.api.interactions.getInteractionV1BetaInteractionsInteractionIdGet` | `GET /v1beta/interactions/{interaction_id}` | Get Interaction |
| `client.api.interactions.deleteInteractionV1BetaInteractionsInteractionIdDelete` | `DELETE /v1beta/interactions/{interaction_id}` | Delete Interaction |
| `client.api.interactions.cancelInteractionInteractionsInteractionIdCancelPost` | `POST /interactions/{interaction_id}/cancel` | Cancel Interaction |
| `client.api.interactions.cancelInteractionV1BetaInteractionsInteractionIdCancelPost` | `POST /v1beta/interactions/{interaction_id}/cancel` | Cancel Interaction |

## websocket

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.websocket.websocketVertexAiLivePassthroughEndpoint` | `GET /vertex_ai/live` | WebSocket: vertex_ai_live_passthrough_endpoint |
| `client.api.websocket.websocketRealtimeWebsocketEndpointGet` | `GET /realtime` | WebSocket: realtime_websocket_endpoint |
| `client.api.websocket.websocketRealtimeWebsocketEndpointGet2` | `GET /v1/realtime` | WebSocket: realtime_websocket_endpoint |
| `client.api.websocket.websocketRealtimeWebsocketEndpointGet3` | `GET /openai/v1/realtime` | WebSocket: realtime_websocket_endpoint |
| `client.api.websocket.websocketLiveSessionsWebsocketEndpointGet` | `GET /live/sessions` | WebSocket: live_sessions_websocket_endpoint |
| `client.api.websocket.websocketLiveSessionsWebsocketEndpointGet2` | `GET /v1/live/sessions` | WebSocket: live_sessions_websocket_endpoint |
| `client.api.websocket.websocketLiveSessionsWebsocketEndpointGet3` | `GET /openai/v1/live/sessions` | WebSocket: live_sessions_websocket_endpoint |

## guardrails

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.guardrails.applyGuardrailApplyGuardrailPost` | `POST /apply_guardrail` | Apply Guardrail |
| `client.api.guardrails.createGuardrailGuardrailsPost` | `POST /guardrails` | Create Guardrail |
| `client.api.guardrails.applyGuardrailGuardrailsApplyGuardrailPost` | `POST /guardrails/apply_guardrail` | Apply Guardrail |
| `client.api.guardrails.listGuardrailsGuardrailsListGet` | `GET /guardrails/list` | List Guardrails |
| `client.api.guardrails.registerGuardrailGuardrailsRegisterPost` | `POST /guardrails/register` | Register Guardrail |
| `client.api.guardrails.listGuardrailSubmissionsGuardrailsSubmissionsGet` | `GET /guardrails/submissions` | List Guardrail Submissions |
| `client.api.guardrails.getGuardrailSubmissionGuardrailsSubmissionsGuardrailIdGet` | `GET /guardrails/submissions/{guardrail_id}` | Get Guardrail Submission |
| `client.api.guardrails.approveGuardrailSubmissionGuardrailsSubmissionsGuardrailIdApprovePost` | `POST /guardrails/submissions/{guardrail_id}/approve` | Approve Guardrail Submission |
| `client.api.guardrails.rejectGuardrailSubmissionGuardrailsSubmissionsGuardrailIdRejectPost` | `POST /guardrails/submissions/{guardrail_id}/reject` | Reject Guardrail Submission |
| `client.api.guardrails.testCustomCodeGuardrailGuardrailsTestCustomCodePost` | `POST /guardrails/test_custom_code` | Test Custom Code Guardrail |
| `client.api.guardrails.getGuardrailUiSettingsGuardrailsUiAddGuardrailSettingsGet` | `GET /guardrails/ui/add_guardrail_settings` | Get Guardrail Ui Settings |
| `client.api.guardrails.getCategoryYamlGuardrailsUiCategoryYamlCategoryNameGet` | `GET /guardrails/ui/category_yaml/{category_name}` | Get Category Yaml |
| `client.api.guardrails.getMajorAirlinesGuardrailsUiMajorAirlinesGet` | `GET /guardrails/ui/major_airlines` | Get Major Airlines |
| `client.api.guardrails.getProviderSpecificParamsGuardrailsUiProviderSpecificParamsGet` | `GET /guardrails/ui/provider_specific_params` | Get Provider Specific Params |
| `client.api.guardrails.guardrailsUsageDetailGuardrailsUsageDetailGuardrailIdGet` | `GET /guardrails/usage/detail/{guardrail_id}` | Guardrails Usage Detail |
| `client.api.guardrails.guardrailsUsageLogsGuardrailsUsageLogsGet` | `GET /guardrails/usage/logs` | Guardrails Usage Logs |
| `client.api.guardrails.guardrailsUsageOverviewGuardrailsUsageOverviewGet` | `GET /guardrails/usage/overview` | Guardrails Usage Overview |
| `client.api.guardrails.validateBlockedWordsFileGuardrailsValidateBlockedWordsFilePost` | `POST /guardrails/validate_blocked_words_file` | Validate Blocked Words File |
| `client.api.guardrails.getGuardrailInfoGuardrailsGuardrailIdGet` | `GET /guardrails/{guardrail_id}` | Get Guardrail Info |
| `client.api.guardrails.updateGuardrailGuardrailsGuardrailIdPut` | `PUT /guardrails/{guardrail_id}` | Update Guardrail |
| `client.api.guardrails.patchGuardrailGuardrailsGuardrailIdPatch` | `PATCH /guardrails/{guardrail_id}` | Patch Guardrail |
| `client.api.guardrails.deleteGuardrailGuardrailsGuardrailIdDelete` | `DELETE /guardrails/{guardrail_id}` | Delete Guardrail |
| `client.api.guardrails.getGuardrailInfoGuardrailsGuardrailIdInfoGet` | `GET /guardrails/{guardrail_id}/info` | Get Guardrail Info |
| `client.api.guardrails.policiesUsageOverviewPoliciesUsageOverviewGet` | `GET /policies/usage/overview` | Policies Usage Overview |
| `client.api.guardrails.listGuardrailsV2V2GuardrailsListGet` | `GET /v2/guardrails/list` | List Guardrails V2 |

## policies

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.policies.getPolicyInfoPolicyInfoPolicyNameGet` | `GET /policy/info/{policy_name}` | Get Policy Info |
| `client.api.policies.listPoliciesPolicyListGet` | `GET /policy/list` | List Policies |
| `client.api.policies.getPolicyTemplatesPolicyTemplatesGet` | `GET /policy/templates` | Get Policy Templates |
| `client.api.policies.enrichPolicyTemplatePolicyTemplatesEnrichPost` | `POST /policy/templates/enrich` | Enrich Policy Template |
| `client.api.policies.enrichPolicyTemplateStreamPolicyTemplatesEnrichStreamPost` | `POST /policy/templates/enrich/stream` | Enrich Policy Template Stream |
| `client.api.policies.suggestPolicyTemplatesPolicyTemplatesSuggestPost` | `POST /policy/templates/suggest` | Suggest Policy Templates |
| `client.api.policies.testPolicyTemplatePolicyTemplatesTestPost` | `POST /policy/templates/test` | Test Policy Template |
| `client.api.policies.testPolicyMatchingPolicyTestPost` | `POST /policy/test` | Test Policy Matching |
| `client.api.policies.validatePolicyPolicyValidatePost` | `POST /policy/validate` | Validate Policy |
| `client.api.policies.testPoliciesAndGuardrailsUtilsTestPoliciesAndGuardrailsPost` | `POST /utils/test_policies_and_guardrails` | Test Policies And Guardrails |

## policyEngine

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.policyEngine.createPolicyPoliciesPost` | `POST /policies` | Create Policy |
| `client.api.policyEngine.createPolicyAttachmentPoliciesAttachmentsPost` | `POST /policies/attachments` | Create Policy Attachment |
| `client.api.policyEngine.estimateAttachmentImpactPoliciesAttachmentsEstimateImpactPost` | `POST /policies/attachments/estimate-impact` | Estimate Attachment Impact |
| `client.api.policyEngine.listPolicyAttachmentsPoliciesAttachmentsListGet` | `GET /policies/attachments/list` | List Policy Attachments |
| `client.api.policyEngine.getPolicyAttachmentPoliciesAttachmentsAttachmentIdGet` | `GET /policies/attachments/{attachment_id}` | Get Policy Attachment |
| `client.api.policyEngine.deletePolicyAttachmentPoliciesAttachmentsAttachmentIdDelete` | `DELETE /policies/attachments/{attachment_id}` | Delete Policy Attachment |
| `client.api.policyEngine.comparePolicyVersionsPoliciesCompareGet` | `GET /policies/compare` | Compare Policy Versions |
| `client.api.policyEngine.listPoliciesPoliciesListGet` | `GET /policies/list` | List Policies |
| `client.api.policyEngine.deleteAllPolicyVersionsPoliciesNamePolicyNameAllVersionsDelete` | `DELETE /policies/name/{policy_name}/all-versions` | Delete All Policy Versions |
| `client.api.policyEngine.listPolicyVersionsPoliciesNamePolicyNameVersionsGet` | `GET /policies/name/{policy_name}/versions` | List Policy Versions |
| `client.api.policyEngine.createPolicyVersionPoliciesNamePolicyNameVersionsPost` | `POST /policies/name/{policy_name}/versions` | Create Policy Version |
| `client.api.policyEngine.resolvePoliciesForContextPoliciesResolvePost` | `POST /policies/resolve` | Resolve Policies For Context |
| `client.api.policyEngine.testPipelinePoliciesTestPipelinePost` | `POST /policies/test-pipeline` | Test Pipeline |
| `client.api.policyEngine.getPolicyPoliciesPolicyIdGet` | `GET /policies/{policy_id}` | Get Policy |
| `client.api.policyEngine.updatePolicyPoliciesPolicyIdPut` | `PUT /policies/{policy_id}` | Update Policy |
| `client.api.policyEngine.deletePolicyPoliciesPolicyIdDelete` | `DELETE /policies/{policy_id}` | Delete Policy |
| `client.api.policyEngine.getResolvedGuardrailsPoliciesPolicyIdResolvedGuardrailsGet` | `GET /policies/{policy_id}/resolved-guardrails` | Get Resolved Guardrails |
| `client.api.policyEngine.updatePolicyVersionStatusPoliciesPolicyIdStatusPut` | `PUT /policies/{policy_id}/status` | Update Policy Version Status |

## agents

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.agents.getAgentDailyActivityAgentDailyActivityGet` | `GET /agent/daily/activity` | Get Agent Daily Activity |
| `client.api.agents.getAgentsV1AgentsGet` | `GET /v1/agents` | Get Agents |
| `client.api.agents.createAgentV1AgentsPost` | `POST /v1/agents` | Create Agent |
| `client.api.agents.getAgentIdentityProvidersV1AgentsIdentityProvidersGet` | `GET /v1/agents/identity/providers` | Get Agent Identity Providers |
| `client.api.agents.makeAgentsPublicV1AgentsMakePublicPost` | `POST /v1/agents/make_public` | Make Agents Public |
| `client.api.agents.getAgentByIdV1AgentsAgentIdGet` | `GET /v1/agents/{agent_id}` | Get Agent By Id |
| `client.api.agents.updateAgentV1AgentsAgentIdPut` | `PUT /v1/agents/{agent_id}` | Update Agent |
| `client.api.agents.patchAgentV1AgentsAgentIdPatch` | `PATCH /v1/agents/{agent_id}` | Patch Agent |
| `client.api.agents.deleteAgentV1AgentsAgentIdDelete` | `DELETE /v1/agents/{agent_id}` | Delete Agent |
| `client.api.agents.getAgentIdentityStatusV1AgentsAgentIdIdentityGet` | `GET /v1/agents/{agent_id}/identity` | Get Agent Identity Status |
| `client.api.agents.triggerAgentKillSwitchV1AgentsAgentIdKillSwitchPost` | `POST /v1/agents/{agent_id}/kill_switch` | Trigger Agent Kill Switch |
| `client.api.agents.makeAgentPublicV1AgentsAgentIdMakePublicPost` | `POST /v1/agents/{agent_id}/make_public` | Make Agent Public |

## geminiAgents

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.geminiAgents.listGeminiAgentsV1BetaAgentsGet` | `GET /v1beta/agents` | List Gemini Agents |
| `client.api.geminiAgents.createGeminiAgentV1BetaAgentsPost` | `POST /v1beta/agents` | Create Gemini Agent |
| `client.api.geminiAgents.getGeminiAgentV1BetaAgentsNameGet` | `GET /v1beta/agents/{name}` | Get Gemini Agent |
| `client.api.geminiAgents.deleteGeminiAgentV1BetaAgentsNameDelete` | `DELETE /v1beta/agents/{name}` | Delete Gemini Agent |
| `client.api.geminiAgents.listGeminiAgentVersionsV1BetaAgentsNameVersionsGet` | `GET /v1beta/agents/{name}/versions` | List Gemini Agent Versions |

## a2a

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.a2a.invokeAgentA2AA2AAgentIdPost` | `POST /a2a/{agent_id}` | Invoke Agent A2A |
| `client.api.a2a.getAgentCardA2AAgentIdWellKnownAgentCardJsonGet` | `GET /a2a/{agent_id}/.well-known/agent-card.json` | Get Agent Card |
| `client.api.a2a.getAgentCardA2AAgentIdWellKnownAgentJsonGet` | `GET /a2a/{agent_id}/.well-known/agent.json` | Get Agent Card |
| `client.api.a2a.invokeAgentA2AA2AAgentIdMessageSendPost` | `POST /a2a/{agent_id}/message/send` | Invoke Agent A2A |
| `client.api.a2a.invokeAgentA2AA2AAgentIdMessageStreamPost` | `POST /a2a/{agent_id}/message/stream` | Invoke Agent A2A |
| `client.api.a2a.invokeAgentA2AV1A2AAgentIdMessageSendPost` | `POST /v1/a2a/{agent_id}/message/send` | Invoke Agent A2A |
| `client.api.a2a.invokeAgentA2AV1A2AAgentIdMessageStreamPost` | `POST /v1/a2a/{agent_id}/message/stream` | Invoke Agent A2A |

## a2aRegistration

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.a2aRegistration.discoverAgentCardV1A2ADiscoverPost` | `POST /v1/a2a/discover` | Discover Agent Card |

## vectorStores

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.vectorStores.indexListV1IndexesGet` | `GET /v1/indexes` | Index List |
| `client.api.vectorStores.indexCreateV1IndexesPost` | `POST /v1/indexes` | Index Create |
| `client.api.vectorStores.vectorStoreListV1VectorStoresGet` | `GET /v1/vector_stores` | Vector Store List |
| `client.api.vectorStores.vectorStoreCreateV1VectorStoresPost` | `POST /v1/vector_stores` | Vector Store Create |
| `client.api.vectorStores.vectorStoreRetrieveV1VectorStoresVectorStoreIdGet` | `GET /v1/vector_stores/{vector_store_id}` | Vector Store Retrieve |
| `client.api.vectorStores.vectorStoreUpdateV1VectorStoresVectorStoreIdPost` | `POST /v1/vector_stores/{vector_store_id}` | Vector Store Update |
| `client.api.vectorStores.vectorStoreDeleteV1VectorStoresVectorStoreIdDelete` | `DELETE /v1/vector_stores/{vector_store_id}` | Vector Store Delete |
| `client.api.vectorStores.vectorStoreFileListV1VectorStoresVectorStoreIdFilesGet` | `GET /v1/vector_stores/{vector_store_id}/files` | Vector Store File List |
| `client.api.vectorStores.vectorStoreFileCreateV1VectorStoresVectorStoreIdFilesPost` | `POST /v1/vector_stores/{vector_store_id}/files` | Vector Store File Create |
| `client.api.vectorStores.vectorStoreFileRetrieveV1VectorStoresVectorStoreIdFilesFileIdGet` | `GET /v1/vector_stores/{vector_store_id}/files/{file_id}` | Vector Store File Retrieve |
| `client.api.vectorStores.vectorStoreFileUpdateV1VectorStoresVectorStoreIdFilesFileIdPost` | `POST /v1/vector_stores/{vector_store_id}/files/{file_id}` | Vector Store File Update |
| `client.api.vectorStores.vectorStoreFileDeleteV1VectorStoresVectorStoreIdFilesFileIdDelete` | `DELETE /v1/vector_stores/{vector_store_id}/files/{file_id}` | Vector Store File Delete |
| `client.api.vectorStores.vectorStoreFileContentV1VectorStoresVectorStoreIdFilesFileIdContentGet` | `GET /v1/vector_stores/{vector_store_id}/files/{file_id}/content` | Vector Store File Content |
| `client.api.vectorStores.vectorStoreSearchV1VectorStoresVectorStoreIdSearchPost` | `POST /v1/vector_stores/{vector_store_id}/search` | Vector Store Search |
| `client.api.vectorStores.vectorStoreListVectorStoresGet` | `GET /vector_stores` | Vector Store List |
| `client.api.vectorStores.vectorStoreCreateVectorStoresPost` | `POST /vector_stores` | Vector Store Create |
| `client.api.vectorStores.vectorStoreRetrieveVectorStoresVectorStoreIdGet` | `GET /vector_stores/{vector_store_id}` | Vector Store Retrieve |
| `client.api.vectorStores.vectorStoreUpdateVectorStoresVectorStoreIdPost` | `POST /vector_stores/{vector_store_id}` | Vector Store Update |
| `client.api.vectorStores.vectorStoreDeleteVectorStoresVectorStoreIdDelete` | `DELETE /vector_stores/{vector_store_id}` | Vector Store Delete |
| `client.api.vectorStores.vectorStoreFileListVectorStoresVectorStoreIdFilesGet` | `GET /vector_stores/{vector_store_id}/files` | Vector Store File List |
| `client.api.vectorStores.vectorStoreFileCreateVectorStoresVectorStoreIdFilesPost` | `POST /vector_stores/{vector_store_id}/files` | Vector Store File Create |
| `client.api.vectorStores.vectorStoreFileRetrieveVectorStoresVectorStoreIdFilesFileIdGet` | `GET /vector_stores/{vector_store_id}/files/{file_id}` | Vector Store File Retrieve |
| `client.api.vectorStores.vectorStoreFileUpdateVectorStoresVectorStoreIdFilesFileIdPost` | `POST /vector_stores/{vector_store_id}/files/{file_id}` | Vector Store File Update |
| `client.api.vectorStores.vectorStoreFileDeleteVectorStoresVectorStoreIdFilesFileIdDelete` | `DELETE /vector_stores/{vector_store_id}/files/{file_id}` | Vector Store File Delete |
| `client.api.vectorStores.vectorStoreFileContentVectorStoresVectorStoreIdFilesFileIdContentGet` | `GET /vector_stores/{vector_store_id}/files/{file_id}/content` | Vector Store File Content |
| `client.api.vectorStores.vectorStoreSearchVectorStoresVectorStoreIdSearchPost` | `POST /vector_stores/{vector_store_id}/search` | Vector Store Search |

## vectorStoreManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.vectorStoreManagement.listVectorStoresV1VectorStoreListGet` | `GET /v1/vector_store/list` | List Vector Stores |
| `client.api.vectorStoreManagement.deleteVectorStoreVectorStoreDeletePost` | `POST /vector_store/delete` | Delete Vector Store |
| `client.api.vectorStoreManagement.getVectorStoreInfoVectorStoreInfoPost` | `POST /vector_store/info` | Get Vector Store Info |
| `client.api.vectorStoreManagement.listVectorStoresVectorStoreListGet` | `GET /vector_store/list` | List Vector Stores |
| `client.api.vectorStoreManagement.newVectorStoreVectorStoreNewPost` | `POST /vector_store/new` | New Vector Store |
| `client.api.vectorStoreManagement.updateVectorStoreVectorStoreUpdatePost` | `POST /vector_store/update` | Update Vector Store |

## tools

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.tools.listToolsV1ToolListGet` | `GET /v1/tool/list` | List Tools |
| `client.api.tools.updateToolPolicyV1ToolPolicyPost` | `POST /v1/tool/policy` | Update Tool Policy |
| `client.api.tools.getToolPolicyOptionsV1ToolPolicyOptionsGet` | `GET /v1/tool/policy/options` | Get Tool Policy Options |
| `client.api.tools.getToolSpendV1ToolSpendGet` | `GET /v1/tool/spend` | Get Tool Spend |
| `client.api.tools.getToolV1ToolToolNameGet` | `GET /v1/tool/{tool_name}` | Get Tool |
| `client.api.tools.getToolDetailV1ToolToolNameDetailGet` | `GET /v1/tool/{tool_name}/detail` | Get Tool Detail |
| `client.api.tools.getToolUsageLogsV1ToolToolNameLogsGet` | `GET /v1/tool/{tool_name}/logs` | Get Tool Usage Logs |
| `client.api.tools.deleteToolPolicyOverrideV1ToolToolNameOverridesDelete` | `DELETE /v1/tool/{tool_name}/overrides` | Delete Tool Policy Override |

## modelInsights

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.modelInsights.getModelInsightsModelInsightsGet` | `GET /model-insights` | Get Model Insights |
| `client.api.modelInsights.getModelInsightTasksModelInsightsTasksGet` | `GET /model-insights/tasks` | Get Model Insight Tasks |

## searchTools

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.searchTools.createSearchToolSearchToolsPost` | `POST /search_tools` | Create Search Tool |
| `client.api.searchTools.listSearchToolsSearchToolsListGet` | `GET /search_tools/list` | List Search Tools |
| `client.api.searchTools.testSearchToolConnectionSearchToolsTestConnectionPost` | `POST /search_tools/test_connection` | Test Search Tool Connection |
| `client.api.searchTools.getAvailableSearchProvidersSearchToolsUiAvailableProvidersGet` | `GET /search_tools/ui/available_providers` | Get Available Search Providers |
| `client.api.searchTools.getSearchToolInfoSearchToolsSearchToolIdGet` | `GET /search_tools/{search_tool_id}` | Get Search Tool Info |
| `client.api.searchTools.updateSearchToolSearchToolsSearchToolIdPut` | `PUT /search_tools/{search_tool_id}` | Update Search Tool |
| `client.api.searchTools.deleteSearchToolSearchToolsSearchToolIdDelete` | `DELETE /search_tools/{search_tool_id}` | Delete Search Tool |

## mcpManagement

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.mcpManagement.getMcpAccessGroupsV1McpAccessGroupsGet` | `GET /v1/mcp/access_groups` | Get Mcp Access Groups |
| `client.api.mcpManagement.discoverMcpServersV1McpDiscoverGet` | `GET /v1/mcp/discover` | Discover Mcp Servers |
| `client.api.mcpManagement.makeMcpServersPublicV1McpMakePublicPost` | `POST /v1/mcp/make_public` | Make Mcp Servers Public |
| `client.api.mcpManagement.getClientIpV1McpNetworkClientIpGet` | `GET /v1/mcp/network/client-ip` | Get Client Ip |
| `client.api.mcpManagement.getOpenapiRegistryV1McpOpenapiRegistryGet` | `GET /v1/mcp/openapi-registry` | Get Openapi Registry |
| `client.api.mcpManagement.getMcpRegistryV1McpRegistryJsonGet` | `GET /v1/mcp/registry.json` | Get Mcp Registry |
| `client.api.mcpManagement.fetchAllMcpServersV1McpServerGet` | `GET /v1/mcp/server` | Fetch All Mcp Servers |
| `client.api.mcpManagement.editMcpServerV1McpServerPut` | `PUT /v1/mcp/server` | Edit Mcp Server |
| `client.api.mcpManagement.addMcpServerV1McpServerPost` | `POST /v1/mcp/server` | Add Mcp Server |
| `client.api.mcpManagement.healthCheckServersV1McpServerHealthGet` | `GET /v1/mcp/server/health` | Health Check Servers |
| `client.api.mcpManagement.importMcpServersV1McpServerImportPost` | `POST /v1/mcp/server/import` | Import Mcp Servers |
| `client.api.mcpManagement.addSessionMcpServerV1McpServerOauthSessionPost` | `POST /v1/mcp/server/oauth/session` | Add Session Mcp Server |
| `client.api.mcpManagement.registerMcpServerV1McpServerRegisterPost` | `POST /v1/mcp/server/register` | Register Mcp Server |
| `client.api.mcpManagement.getMcpServerSubmissionsV1McpServerSubmissionsGet` | `GET /v1/mcp/server/submissions` | Get Mcp Server Submissions |
| `client.api.mcpManagement.fetchMcpServerV1McpServerServerIdGet` | `GET /v1/mcp/server/{server_id}` | Fetch Mcp Server |
| `client.api.mcpManagement.removeMcpServerV1McpServerServerIdDelete` | `DELETE /v1/mcp/server/{server_id}` | Remove Mcp Server |
| `client.api.mcpManagement.approveMcpServerSubmissionV1McpServerServerIdApprovePut` | `PUT /v1/mcp/server/{server_id}/approve` | Approve Mcp Server Submission |
| `client.api.mcpManagement.storeMcpOauthUserCredentialV1McpServerServerIdOauthUserCredentialPost` | `POST /v1/mcp/server/{server_id}/oauth-user-credential` | Store Mcp Oauth User Credential |
| `client.api.mcpManagement.deleteMcpOauthUserCredentialV1McpServerServerIdOauthUserCredentialDelete` | `DELETE /v1/mcp/server/{server_id}/oauth-user-credential` | Delete Mcp Oauth User Credential |
| `client.api.mcpManagement.getMcpOauthUserCredentialStatusV1McpServerServerIdOauthUserCredentialStatusGet` | `GET /v1/mcp/server/{server_id}/oauth-user-credential/status` | Get Mcp Oauth User Credential Status |
| `client.api.mcpManagement.pinMcpServerToolsV1McpServerServerIdPinPost` | `POST /v1/mcp/server/{server_id}/pin` | Pin Mcp Server Tools |
| `client.api.mcpManagement.unpinMcpServerToolsV1McpServerServerIdPinDelete` | `DELETE /v1/mcp/server/{server_id}/pin` | Unpin Mcp Server Tools |
| `client.api.mcpManagement.rejectMcpServerSubmissionV1McpServerServerIdRejectPut` | `PUT /v1/mcp/server/{server_id}/reject` | Reject Mcp Server Submission |
| `client.api.mcpManagement.storeMcpUserCredentialV1McpServerServerIdUserCredentialPost` | `POST /v1/mcp/server/{server_id}/user-credential` | Store Mcp User Credential |
| `client.api.mcpManagement.deleteMcpUserCredentialV1McpServerServerIdUserCredentialDelete` | `DELETE /v1/mcp/server/{server_id}/user-credential` | Delete Mcp User Credential |
| `client.api.mcpManagement.listMcpServerUserCredentialsV1McpServerServerIdUserCredentialsGet` | `GET /v1/mcp/server/{server_id}/user-credentials` | List Mcp Server User Credentials |
| `client.api.mcpManagement.getMcpUserEnvVarsV1McpServerServerIdUserEnvVarsGet` | `GET /v1/mcp/server/{server_id}/user-env-vars` | Get Mcp User Env Vars |
| `client.api.mcpManagement.storeMcpUserEnvVarsV1McpServerServerIdUserEnvVarsPost` | `POST /v1/mcp/server/{server_id}/user-env-vars` | Store Mcp User Env Vars |
| `client.api.mcpManagement.clearMcpUserEnvVarsV1McpServerServerIdUserEnvVarsDelete` | `DELETE /v1/mcp/server/{server_id}/user-env-vars` | Clear Mcp User Env Vars |
| `client.api.mcpManagement.getMcpGatewaySessionsV1McpSessionsGet` | `GET /v1/mcp/sessions` | Get Mcp Gateway Sessions |
| `client.api.mcpManagement.deleteMcpGatewaySessionsV1McpSessionsDelete` | `DELETE /v1/mcp/sessions` | Delete Mcp Gateway Sessions |
| `client.api.mcpManagement.getMcpToolsV1McpToolsGet` | `GET /v1/mcp/tools` | Get Mcp Tools |
| `client.api.mcpManagement.fetchMcpToolsetsV1McpToolsetGet` | `GET /v1/mcp/toolset` | Fetch Mcp Toolsets |
| `client.api.mcpManagement.editMcpToolsetV1McpToolsetPut` | `PUT /v1/mcp/toolset` | Edit Mcp Toolset |
| `client.api.mcpManagement.addMcpToolsetV1McpToolsetPost` | `POST /v1/mcp/toolset` | Add Mcp Toolset |
| `client.api.mcpManagement.fetchMcpToolsetV1McpToolsetToolsetIdGet` | `GET /v1/mcp/toolset/{toolset_id}` | Fetch Mcp Toolset |
| `client.api.mcpManagement.removeMcpToolsetV1McpToolsetToolsetIdDelete` | `DELETE /v1/mcp/toolset/{toolset_id}` | Remove Mcp Toolset |
| `client.api.mcpManagement.listMcpUserCredentialsV1McpUserCredentialsGet` | `GET /v1/mcp/user-credentials` | List Mcp User Credentials |
| `client.api.mcpManagement.listMcpUserEnvVarStatusV1McpUserEnvVarsStatusGet` | `GET /v1/mcp/user-env-vars/status` | List Mcp User Env Var Status |

## mcpDiscoverable

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.mcpDiscoverable.jwksJsonWellKnownJwksJsonGet` | `GET /.well-known/jwks.json` | Jwks Json |
| `client.api.mcpDiscoverable.nativeClientAuthDiscoveryWellKnownLitellmCliAuthGet` | `GET /.well-known/litellm-cli-auth` | Native Client Auth Discovery |
| `client.api.mcpDiscoverable.oauthAuthorizationServerMcpWellKnownOauthAuthorizationServerGet` | `GET /.well-known/oauth-authorization-server` | Oauth Authorization Server Mcp |
| `client.api.mcpDiscoverable.oauthAuthorizationServerAggregateWellKnownOauthAuthorizationServerMcpGet` | `GET /.well-known/oauth-authorization-server/mcp` | Oauth Authorization Server Aggregate |
| `client.api.mcpDiscoverable.oauthAuthorizationServerMcpStandardWellKnownOauthAuthorizationServerMcpMcpServerNameGet` | `GET /.well-known/oauth-authorization-server/mcp/{mcp_server_name}` | Oauth Authorization Server Mcp Standard |
| `client.api.mcpDiscoverable.oauthAuthorizationServerMcpWellKnownOauthAuthorizationServerMcpServerNameGet` | `GET /.well-known/oauth-authorization-server/{mcp_server_name}` | Oauth Authorization Server Mcp |
| `client.api.mcpDiscoverable.oauthAuthorizationServerLegacyWellKnownOauthAuthorizationServerMcpServerNameMcpGet` | `GET /.well-known/oauth-authorization-server/{mcp_server_name}/mcp` | Oauth Authorization Server Legacy |
| `client.api.mcpDiscoverable.oauthProtectedResourceRootWellKnownOauthProtectedResourceGet` | `GET /.well-known/oauth-protected-resource` | Oauth Protected Resource Root |
| `client.api.mcpDiscoverable.oauthProtectedResourceAggregateWellKnownOauthProtectedResourceMcpGet` | `GET /.well-known/oauth-protected-resource/mcp` | Oauth Protected Resource Aggregate |
| `client.api.mcpDiscoverable.oauthProtectedResourceMcpStandardWellKnownOauthProtectedResourceMcpMcpServerNameGet` | `GET /.well-known/oauth-protected-resource/mcp/{mcp_server_name}` | Oauth Protected Resource Mcp Standard |
| `client.api.mcpDiscoverable.oauthProtectedResourceMcpWellKnownOauthProtectedResourceMcpServerNameMcpGet` | `GET /.well-known/oauth-protected-resource/{mcp_server_name}/mcp` | Oauth Protected Resource Mcp |
| `client.api.mcpDiscoverable.openidConfigurationWellKnownOpenidConfigurationGet` | `GET /.well-known/openid-configuration` | Openid Configuration |
| `client.api.mcpDiscoverable.authorizeAuthorizeGet` | `GET /authorize` | Authorize |
| `client.api.mcpDiscoverable.authorizeCompleteAuthorizeCompletePost` | `POST /authorize/complete` | Authorize Complete |
| `client.api.mcpDiscoverable.authorizeFlowAuthorizeFlowGet` | `GET /authorize/flow` | Authorize Flow |
| `client.api.mcpDiscoverable.authorizeMcpSessionAuthorizeMcpSessionGet` | `GET /authorize/mcp-session` | Authorize Mcp Session |
| `client.api.mcpDiscoverable.callbackCallbackGet` | `GET /callback` | Callback |
| `client.api.mcpDiscoverable.introspectEndpointIntrospectPost` | `POST /introspect` | Introspect Endpoint |
| `client.api.mcpDiscoverable.registerClientRegisterPost` | `POST /register` | Register Client |
| `client.api.mcpDiscoverable.revokeEndpointRevokePost` | `POST /revoke` | Revoke Endpoint |
| `client.api.mcpDiscoverable.tokenEndpointTokenPost` | `POST /token` | Token Endpoint |
| `client.api.mcpDiscoverable.authorizeMcpServerNameAuthorizeGet` | `GET /{mcp_server_name}/authorize` | Authorize |
| `client.api.mcpDiscoverable.registerClientMcpServerNameRegisterPost` | `POST /{mcp_server_name}/register` | Register Client |
| `client.api.mcpDiscoverable.tokenEndpointMcpServerNameTokenPost` | `POST /{mcp_server_name}/token` | Token Endpoint |

## mcpRest

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.mcpRest.testConnectionMcpRestTestConnectionPost` | `POST /mcp-rest/test/connection` | Test Connection |
| `client.api.mcpRest.testToolsListMcpRestTestToolsListPost` | `POST /mcp-rest/test/tools/list` | Test Tools List |
| `client.api.mcpRest.callToolRestApiMcpRestToolsCallPost` | `POST /mcp-rest/tools/call` | Call Tool Rest Api |
| `client.api.mcpRest.listToolRestApiMcpRestToolsListGet` | `GET /mcp-rest/tools/list` | List Tool Rest Api |

## configOverrides

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.configOverrides.getCyberarkConfigConfigOverridesCyberarkGet` | `GET /config_overrides/cyberark` | Get Cyberark Config |
| `client.api.configOverrides.updateCyberarkConfigConfigOverridesCyberarkPost` | `POST /config_overrides/cyberark` | Update Cyberark Config |
| `client.api.configOverrides.deleteCyberarkConfigConfigOverridesCyberarkDelete` | `DELETE /config_overrides/cyberark` | Delete Cyberark Config |
| `client.api.configOverrides.testCyberarkConnectionConfigOverridesCyberarkTestConnectionPost` | `POST /config_overrides/cyberark/test_connection` | Test Cyberark Connection |
| `client.api.configOverrides.getHashicorpVaultConfigConfigOverridesHashicorpVaultGet` | `GET /config_overrides/hashicorp_vault` | Get Hashicorp Vault Config |
| `client.api.configOverrides.updateHashicorpVaultConfigConfigOverridesHashicorpVaultPost` | `POST /config_overrides/hashicorp_vault` | Update Hashicorp Vault Config |
| `client.api.configOverrides.deleteHashicorpVaultConfigConfigOverridesHashicorpVaultDelete` | `DELETE /config_overrides/hashicorp_vault` | Delete Hashicorp Vault Config |
| `client.api.configOverrides.testHashicorpVaultConnectionConfigOverridesHashicorpVaultTestConnectionPost` | `POST /config_overrides/hashicorp_vault/test_connection` | Test Hashicorp Vault Connection |

## llmPassthrough

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.llmPassthrough.bespokeProxyRouteBespokeV1SystemonePost` | `POST /bespoke/v1/systemone` | Bespoke Proxy Route |
| `client.api.llmPassthrough.comprehendMedicalSdkProxyRouteComprehendmedicalPost` | `POST /comprehendmedical` | Comprehend Medical Sdk Proxy Route |
| `client.api.llmPassthrough.comprehendMedicalProxyRouteComprehendmedicalOperationPost` | `POST /comprehendmedical/{operation}` | Comprehend Medical Proxy Route |
| `client.api.llmPassthrough.euJevProxyRouteEuJevV1SystemonePost` | `POST /eu_jev/v1/systemone` | Eu Jev Proxy Route |
| `client.api.llmPassthrough.layaProxyRouteLayaV1SystemonePost` | `POST /laya/v1/systemone` | Laya Proxy Route |
| `client.api.llmPassthrough.proxyRealtimeCallsOpenaiV1RealtimeCallsPost` | `POST /openai/v1/realtime/calls` | Proxy Realtime Calls |
| `client.api.llmPassthrough.createRealtimeClientSecretOpenaiV1RealtimeClientSecretsPost` | `POST /openai/v1/realtime/client_secrets` | Create Realtime Client Secret |
| `client.api.llmPassthrough.createRealtimeTranscriptionSessionOpenaiV1RealtimeTranscriptionSessionsPost` | `POST /openai/v1/realtime/transcription_sessions` | Create Realtime Transcription Session |
| `client.api.llmPassthrough.transcribeSdkProxyRouteTranscribePost` | `POST /transcribe` | Transcribe Sdk Proxy Route |
| `client.api.llmPassthrough.transcribeProxyRouteTranscribeOperationPost` | `POST /transcribe/{operation}` | Transcribe Proxy Route |

## realtime

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.realtime.proxyRealtimeCallsRealtimeCallsPost` | `POST /realtime/calls` | Proxy Realtime Calls |
| `client.api.realtime.createRealtimeClientSecretRealtimeClientSecretsPost` | `POST /realtime/client_secrets` | Create Realtime Client Secret |
| `client.api.realtime.createRealtimeTranscriptionSessionRealtimeTranscriptionSessionsPost` | `POST /realtime/transcription_sessions` | Create Realtime Transcription Session |
| `client.api.realtime.proxyRealtimeCallsV1RealtimeCallsPost` | `POST /v1/realtime/calls` | Proxy Realtime Calls |
| `client.api.realtime.createRealtimeClientSecretV1RealtimeClientSecretsPost` | `POST /v1/realtime/client_secrets` | Create Realtime Client Secret |
| `client.api.realtime.createRealtimeTranscriptionSessionV1RealtimeTranscriptionSessionsPost` | `POST /v1/realtime/transcription_sessions` | Create Realtime Transcription Session |

## anthropicPassthrough

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.anthropicPassthrough.eventLoggingBatchApiEventLoggingBatchPost` | `POST /api/event_logging/batch` | Event Logging Batch |
| `client.api.anthropicPassthrough.anthropicResponseV1MessagesPost` | `POST /v1/messages` | Anthropic Response |
| `client.api.anthropicPassthrough.countTokensV1MessagesCountTokensPost` | `POST /v1/messages/count_tokens` | Count Tokens |

## anthropicSkills

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.anthropicSkills.listSkillsV1SkillsGet` | `GET /v1/skills` | List Skills |
| `client.api.anthropicSkills.createSkillV1SkillsPost` | `POST /v1/skills` | Create Skill |
| `client.api.anthropicSkills.getSkillV1SkillsSkillIdGet` | `GET /v1/skills/{skill_id}` | Get Skill |
| `client.api.anthropicSkills.deleteSkillV1SkillsSkillIdDelete` | `DELETE /v1/skills/{skill_id}` | Delete Skill |

## evals

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.evals.listEvalsV1EvalsGet` | `GET /v1/evals` | List Evals |
| `client.api.evals.createEvalV1EvalsPost` | `POST /v1/evals` | Create Eval |
| `client.api.evals.getEvalV1EvalsEvalIdGet` | `GET /v1/evals/{eval_id}` | Get Eval |
| `client.api.evals.updateEvalV1EvalsEvalIdPost` | `POST /v1/evals/{eval_id}` | Update Eval |
| `client.api.evals.deleteEvalV1EvalsEvalIdDelete` | `DELETE /v1/evals/{eval_id}` | Delete Eval |
| `client.api.evals.cancelEvalV1EvalsEvalIdCancelPost` | `POST /v1/evals/{eval_id}/cancel` | Cancel Eval |
| `client.api.evals.listRunsV1EvalsEvalIdRunsGet` | `GET /v1/evals/{eval_id}/runs` | List Runs |
| `client.api.evals.createRunV1EvalsEvalIdRunsPost` | `POST /v1/evals/{eval_id}/runs` | Create Run |
| `client.api.evals.getRunV1EvalsEvalIdRunsRunIdGet` | `GET /v1/evals/{eval_id}/runs/{run_id}` | Get Run |
| `client.api.evals.cancelRunV1EvalsEvalIdRunsRunIdPost` | `POST /v1/evals/{eval_id}/runs/{run_id}` | Cancel Run |
| `client.api.evals.deleteRunV1EvalsEvalIdRunsRunIdDelete` | `DELETE /v1/evals/{eval_id}/runs/{run_id}` | Delete Run |

## decisions

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.decisions.decisionsDecisionsPost` | `POST /decisions` | Ask questions about an input (OpenAI Decisions format) |
| `client.api.decisions.extractionExtractionPost` | `POST /extraction` | Extract typed fields from a state |
| `client.api.decisions.systemoneSystemonePost` | `POST /systemone` | Ask named questions about a state (System One format) |
| `client.api.decisions.decisionsV1DecisionsPost` | `POST /v1/decisions` | Ask questions about an input (OpenAI Decisions format) |
| `client.api.decisions.extractionV1ExtractionPost` | `POST /v1/extraction` | Extract typed fields from a state |
| `client.api.decisions.systemoneV1SystemonePost` | `POST /v1/systemone` | Ask named questions about a state (System One format) |

## scim

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.scim.getScimBaseScimV2Get` | `GET /scim/v2` | Get Scim Base |
| `client.api.scim.getGroupsScimV2GroupsGet` | `GET /scim/v2/Groups` | Get Groups |
| `client.api.scim.createGroupScimV2GroupsPost` | `POST /scim/v2/Groups` | Create Group |
| `client.api.scim.getGroupScimV2GroupsGroupIdGet` | `GET /scim/v2/Groups/{group_id}` | Get Group |
| `client.api.scim.updateGroupScimV2GroupsGroupIdPut` | `PUT /scim/v2/Groups/{group_id}` | Update Group |
| `client.api.scim.patchGroupScimV2GroupsGroupIdPatch` | `PATCH /scim/v2/Groups/{group_id}` | Patch Group |
| `client.api.scim.deleteGroupScimV2GroupsGroupIdDelete` | `DELETE /scim/v2/Groups/{group_id}` | Delete Group |
| `client.api.scim.getResourceTypesScimV2ResourceTypesGet` | `GET /scim/v2/ResourceTypes` | Get Resource Types |
| `client.api.scim.getResourceTypeScimV2ResourceTypesResourceTypeIdGet` | `GET /scim/v2/ResourceTypes/{resource_type_id}` | Get Resource Type |
| `client.api.scim.getSchemasScimV2SchemasGet` | `GET /scim/v2/Schemas` | Get Schemas |
| `client.api.scim.getSchemaScimV2SchemasSchemaIdGet` | `GET /scim/v2/Schemas/{schema_id}` | Get Schema |
| `client.api.scim.getServiceProviderConfigScimV2ServiceProviderConfigGet` | `GET /scim/v2/ServiceProviderConfig` | Get Service Provider Config |
| `client.api.scim.getUsersScimV2UsersGet` | `GET /scim/v2/Users` | Get Users |
| `client.api.scim.createUserScimV2UsersPost` | `POST /scim/v2/Users` | Create User |
| `client.api.scim.getUserScimV2UsersUserIdGet` | `GET /scim/v2/Users/{user_id}` | Get User |
| `client.api.scim.updateUserScimV2UsersUserIdPut` | `PUT /scim/v2/Users/{user_id}` | Update User |
| `client.api.scim.patchUserScimV2UsersUserIdPatch` | `PATCH /scim/v2/Users/{user_id}` | Patch User |
| `client.api.scim.deleteUserScimV2UsersUserIdDelete` | `DELETE /scim/v2/Users/{user_id}` | Delete User |
| `client.api.scim.listPlaceholdersScimV2PlaceholdersGet` | `GET /scim/v2/placeholders` | List Placeholders |
| `client.api.scim.mergePlaceholderScimV2PlaceholdersUserIdMergePost` | `POST /scim/v2/placeholders/{user_id}/merge` | Merge Placeholder |

## cloudzero

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cloudzero.deleteCloudzeroSettingsCloudzeroDeleteDelete` | `DELETE /cloudzero/delete` | Delete Cloudzero Settings |
| `client.api.cloudzero.cloudzeroDryRunExportCloudzeroDryRunPost` | `POST /cloudzero/dry-run` | Cloudzero Dry Run Export |
| `client.api.cloudzero.cloudzeroExportCloudzeroExportPost` | `POST /cloudzero/export` | Cloudzero Export |
| `client.api.cloudzero.initCloudzeroSettingsCloudzeroInitPost` | `POST /cloudzero/init` | Init Cloudzero Settings |
| `client.api.cloudzero.getCloudzeroSettingsCloudzeroSettingsGet` | `GET /cloudzero/settings` | Get Cloudzero Settings |
| `client.api.cloudzero.updateCloudzeroSettingsCloudzeroSettingsPut` | `PUT /cloudzero/settings` | Update Cloudzero Settings |

## vantage

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.vantage.deleteVantageSettingsVantageDeleteDelete` | `DELETE /vantage/delete` | Delete Vantage Settings |
| `client.api.vantage.vantageDryRunExportVantageDryRunPost` | `POST /vantage/dry-run` | Vantage Dry Run Export |
| `client.api.vantage.vantageExportVantageExportPost` | `POST /vantage/export` | Vantage Export |
| `client.api.vantage.initVantageSettingsVantageInitPost` | `POST /vantage/init` | Init Vantage Settings |
| `client.api.vantage.getVantageSettingsVantageSettingsGet` | `GET /vantage/settings` | Get Vantage Settings |
| `client.api.vantage.updateVantageSettingsVantageSettingsPut` | `PUT /vantage/settings` | Update Vantage Settings |

## prompts

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.prompts.createPromptPromptsPost` | `POST /prompts` | Create Prompt |
| `client.api.prompts.listPromptsPromptsListGet` | `GET /prompts/list` | List Prompts |
| `client.api.prompts.testPromptPromptsTestPost` | `POST /prompts/test` | Test Prompt |
| `client.api.prompts.getPromptInfoPromptsPromptIdGet` | `GET /prompts/{prompt_id}` | Get Prompt Info |
| `client.api.prompts.updatePromptPromptsPromptIdPut` | `PUT /prompts/{prompt_id}` | Update Prompt |
| `client.api.prompts.patchPromptPromptsPromptIdPatch` | `PATCH /prompts/{prompt_id}` | Patch Prompt |
| `client.api.prompts.deletePromptPromptsPromptIdDelete` | `DELETE /prompts/{prompt_id}` | Delete Prompt |
| `client.api.prompts.getPromptInfoPromptsPromptIdInfoGet` | `GET /prompts/{prompt_id}/info` | Get Prompt Info |
| `client.api.prompts.getPromptVersionsPromptsPromptIdVersionsGet` | `GET /prompts/{prompt_id}/versions` | Get Prompt Versions |
| `client.api.prompts.convertPromptFileToJsonUtilsDotpromptJsonConverterPost` | `POST /utils/dotprompt_json_converter` | Convert Prompt File To Json |

## jwtMappings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.jwtMappings.deleteJwtKeyMappingJwtKeyMappingDeletePost` | `POST /jwt/key/mapping/delete` | Delete Jwt Key Mapping |
| `client.api.jwtMappings.infoJwtKeyMappingJwtKeyMappingInfoGet` | `GET /jwt/key/mapping/info` | Info Jwt Key Mapping |
| `client.api.jwtMappings.listJwtKeyMappingsJwtKeyMappingListGet` | `GET /jwt/key/mapping/list` | List Jwt Key Mappings |
| `client.api.jwtMappings.createJwtKeyMappingJwtKeyMappingNewPost` | `POST /jwt/key/mapping/new` | Create Jwt Key Mapping |
| `client.api.jwtMappings.updateJwtKeyMappingJwtKeyMappingUpdatePost` | `POST /jwt/key/mapping/update` | Update Jwt Key Mapping |

## compliance

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.compliance.checkEuAiActComplianceComplianceEuAiActPost` | `POST /compliance/eu-ai-act` | Check Eu Ai Act Compliance |
| `client.api.compliance.checkGdprComplianceComplianceGdprPost` | `POST /compliance/gdpr` | Check Gdpr Compliance |

## accessGroups

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accessGroups.listAccessGroupsV1AccessGroupGet` | `GET /v1/access_group` | List Access Groups |
| `client.api.accessGroups.createAccessGroupV1AccessGroupPost` | `POST /v1/access_group` | Create Access Group |
| `client.api.accessGroups.getAccessGroupV1AccessGroupAccessGroupIdGet` | `GET /v1/access_group/{access_group_id}` | Get Access Group |
| `client.api.accessGroups.updateAccessGroupV1AccessGroupAccessGroupIdPut` | `PUT /v1/access_group/{access_group_id}` | Update Access Group |
| `client.api.accessGroups.deleteAccessGroupV1AccessGroupAccessGroupIdDelete` | `DELETE /v1/access_group/{access_group_id}` | Delete Access Group |
| `client.api.accessGroups.listAccessGroupsV1UnifiedAccessGroupGet` | `GET /v1/unified_access_group` | List Access Groups |
| `client.api.accessGroups.createAccessGroupV1UnifiedAccessGroupPost` | `POST /v1/unified_access_group` | Create Access Group |
| `client.api.accessGroups.getAccessGroupV1UnifiedAccessGroupAccessGroupIdGet` | `GET /v1/unified_access_group/{access_group_id}` | Get Access Group |
| `client.api.accessGroups.updateAccessGroupV1UnifiedAccessGroupAccessGroupIdPut` | `PUT /v1/unified_access_group/{access_group_id}` | Update Access Group |
| `client.api.accessGroups.deleteAccessGroupV1UnifiedAccessGroupAccessGroupIdDelete` | `DELETE /v1/unified_access_group/{access_group_id}` | Delete Access Group |
