# Operations

Generated from the v0 Platform API (beta) 1 OpenAPI spec; do not edit. 59 operations. Call an operation as `client.api.<tag>.<operation>(params)`, or by its request as `client.request("<METHOD> <path>", params)`.

## chats

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.chats.chatsCreate` | `POST /chats` | Create Chat |
| `client.api.chats.chatsFind` | `GET /chats` | Find Chats |
| `client.api.chats.chatsInit` | `POST /chats/init` | Initialize Chat |
| `client.api.chats.chatsDelete` | `DELETE /chats/{chatId}` | Delete Chat |
| `client.api.chats.chatsGetById` | `GET /chats/{chatId}` | Get Chat |
| `client.api.chats.chatsUpdate` | `PATCH /chats/{chatId}` | Update Chat |
| `client.api.chats.chatsFavorite` | `PUT /chats/{chatId}/favorite` | Favorite Chat |
| `client.api.chats.chatsFork` | `POST /chats/{chatId}/fork` | Fork Chat |
| `client.api.chats.chatsFindMessages` | `GET /chats/{chatId}/messages` | Find Chat Messages |
| `client.api.chats.chatsSendMessage` | `POST /chats/{chatId}/messages` | Send Message |
| `client.api.chats.chatsGetMessage` | `GET /chats/{chatId}/messages/{messageId}` | Get Chat Message |
| `client.api.chats.chatsFindVersions` | `GET /chats/{chatId}/versions` | Find Chat Versions |
| `client.api.chats.chatsGetVersion` | `GET /chats/{chatId}/versions/{versionId}` | Get Chat Version |
| `client.api.chats.chatsUpdateVersion` | `PATCH /chats/{chatId}/versions/{versionId}` | Update Chat Version Files |
| `client.api.chats.chatsDownloadVersion` | `GET /chats/{chatId}/versions/{versionId}/download` | Download version files |
| `client.api.chats.chatsDeleteVersionFiles` | `POST /chats/{chatId}/versions/{versionId}/files/delete` | Delete Chat Version Files |
| `client.api.chats.chatsResume` | `POST /chats/{chatId}/messages/{messageId}/resume` | Resume Message |
| `client.api.chats.chatsStop` | `POST /chats/{chatId}/messages/{messageId}/stop` | Stop Message |
| `client.api.chats.chatsResolveTask` | `POST /chats/{chatId}/tasks/resolve` | Resolve Task |
| `client.api.chats.chatsRestore` | `POST /chats/{chatId}/versions/{versionId}/restore` | Restore Block |

## projects

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.projects.projectsGetByChatId` | `GET /chats/{chatId}/project` | Get Project by Chat ID |
| `client.api.projects.projectsFind` | `GET /projects` | Find Projects |
| `client.api.projects.projectsCreate` | `POST /projects` | Create Project |
| `client.api.projects.projectsGetById` | `GET /projects/{projectId}` | Get Project by ID |
| `client.api.projects.projectsUpdate` | `PATCH /projects/{projectId}` | Update Project |
| `client.api.projects.projectsDelete` | `DELETE /projects/{projectId}` | Delete Project |
| `client.api.projects.projectsAssign` | `POST /projects/{projectId}/assign` | Assign Project to Chat |
| `client.api.projects.projectsFindEnvVars` | `GET /projects/{projectId}/env-vars` | Find Environment Variables |
| `client.api.projects.projectsCreateEnvVars` | `POST /projects/{projectId}/env-vars` | Create Environment Variables |
| `client.api.projects.projectsUpdateEnvVars` | `PATCH /projects/{projectId}/env-vars` | Update Environment Variables |
| `client.api.projects.projectsDeleteEnvVars` | `POST /projects/{projectId}/env-vars/delete` | Delete Environment Variables |
| `client.api.projects.projectsGetEnvVar` | `GET /projects/{projectId}/env-vars/{environmentVariableId}` | Get Environment Variable |

## deployments

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.deployments.deploymentsFind` | `GET /deployments` | Find Deployments |
| `client.api.deployments.deploymentsCreate` | `POST /deployments` | Create Deployment |
| `client.api.deployments.deploymentsGetById` | `GET /deployments/{deploymentId}` | Get Deployment |
| `client.api.deployments.deploymentsDelete` | `DELETE /deployments/{deploymentId}` | Delete Deployment |
| `client.api.deployments.deploymentsFindLogs` | `GET /deployments/{deploymentId}/logs` | Find Deployment Logs |
| `client.api.deployments.deploymentsFindErrors` | `GET /deployments/{deploymentId}/errors` | Find Deployment Errors |

## hooks

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.hooks.hooksFind` | `GET /hooks` | Find Hooks |
| `client.api.hooks.hooksCreate` | `POST /hooks` | Create Hook |
| `client.api.hooks.hooksGetById` | `GET /hooks/{hookId}` | Get Hook |
| `client.api.hooks.hooksUpdate` | `PATCH /hooks/{hookId}` | Update Hook |
| `client.api.hooks.hooksDelete` | `DELETE /hooks/{hookId}` | Delete Hook |

## integrations

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.integrations.integrationsVercelProjectsFind` | `GET /integrations/vercel/projects` | Find Vercel Projects |
| `client.api.integrations.integrationsVercelProjectsCreate` | `POST /integrations/vercel/projects` | Create Vercel Project |

## ratelimits

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.ratelimits.rateLimitsFind` | `GET /rate-limits` | Find Rate Limit |

## user

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.user.userGet` | `GET /user` | Get User |
| `client.api.user.userGetBilling` | `GET /user/billing` | Get Billing |
| `client.api.user.userGetPlan` | `GET /user/plan` | Get Plan |
| `client.api.user.userGetScopes` | `GET /user/scopes` | Get User Scopes |

## reports

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.reports.reportsGetUsage` | `GET /reports/usage` | Get Usage Report |
| `client.api.reports.reportsGetAIUsage` | `GET /reports/usage/ai` | Get AI Usage Report |
| `client.api.reports.reportsGetUserActivity` | `GET /reports/user-activity` | Get User Activity Report |

## mcpservers

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.mcpservers.mcpServersFind` | `GET /mcp-servers` | List MCP Servers |
| `client.api.mcpservers.mcpServersCreate` | `POST /mcp-servers` | Create MCP Server |
| `client.api.mcpservers.mcpServersGetById` | `GET /mcp-servers/{mcpServerId}` | Get MCP Server |
| `client.api.mcpservers.mcpServersUpdate` | `PATCH /mcp-servers/{mcpServerId}` | Update MCP Server |
| `client.api.mcpservers.mcpServersDelete` | `DELETE /mcp-servers/{mcpServerId}` | Delete MCP Server |
| `client.api.mcpservers.mcpServersCreateOAuthAuthorizationUrl` | `POST /mcp-servers/{mcpServerId}/oauth/authorize` | Create MCP Server OAuth Authorization URL |
