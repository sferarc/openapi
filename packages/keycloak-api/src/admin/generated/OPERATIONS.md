# Operations

Generated from the Keycloak Admin REST API 1.0 OpenAPI spec; do not edit. 415 operations. Call an operation by its request as `admin.request("<METHOD> <path>", params)`.

## realmsAdmin

| Request | Summary |
| --- | --- |
| `GET /admin/realms` | Get accessible realms Returns a list of accessible realms. The list is filtered based on what realms the caller is allowed to view. |
| `POST /admin/realms` | Import a realm. Imports a realm from a full representation of that realm. |
| `GET /admin/realms/{realm}` | Get the top-level representation of the realm It will not include nested information like User and Client representations. |
| `PUT /admin/realms/{realm}` | Update the top-level information of the realm Any user, roles or client information in the representation will be ignored. |
| `DELETE /admin/realms/{realm}` | Delete the realm |
| `GET /admin/realms/{realm}/admin-events` | Get admin events Returns all admin events, or filters events based on URL query parameters listed here |
| `DELETE /admin/realms/{realm}/admin-events` | Delete all admin events |
| `POST /admin/realms/{realm}/client-description-converter` | Base path for importing clients under this realm. |
| `GET /admin/realms/{realm}/client-policies/policies` |  |
| `PUT /admin/realms/{realm}/client-policies/policies` |  |
| `GET /admin/realms/{realm}/client-policies/profiles` |  |
| `PUT /admin/realms/{realm}/client-policies/profiles` |  |
| `GET /admin/realms/{realm}/client-session-stats` | Get client session stats Returns a JSON map. |
| `GET /admin/realms/{realm}/client-types` | List all client types available in the current realm |
| `PUT /admin/realms/{realm}/client-types` | Update a client type |
| `GET /admin/realms/{realm}/credential-registrators` |  |
| `GET /admin/realms/{realm}/default-default-client-scopes` | Get realm default client scopes. Only name and ids are returned. |
| `PUT /admin/realms/{realm}/default-default-client-scopes/{clientScopeId}` |  |
| `DELETE /admin/realms/{realm}/default-default-client-scopes/{clientScopeId}` |  |
| `GET /admin/realms/{realm}/default-groups` | Get group hierarchy. Only name and ids are returned. |
| `PUT /admin/realms/{realm}/default-groups/{groupId}` |  |
| `DELETE /admin/realms/{realm}/default-groups/{groupId}` |  |
| `GET /admin/realms/{realm}/default-optional-client-scopes` | Get realm optional client scopes. Only name and ids are returned. |
| `PUT /admin/realms/{realm}/default-optional-client-scopes/{clientScopeId}` |  |
| `DELETE /admin/realms/{realm}/default-optional-client-scopes/{clientScopeId}` |  |
| `GET /admin/realms/{realm}/events` | Get events Returns all events, or filters them based on URL query parameters listed here |
| `DELETE /admin/realms/{realm}/events` | Delete all events |
| `GET /admin/realms/{realm}/events/config` | Get the events provider configuration Returns JSON object with events provider configuration |
| `PUT /admin/realms/{realm}/events/config` | Update the events provider Change the events provider and/or its configuration |
| `GET /admin/realms/{realm}/group-by-path/{path}` |  |
| `GET /admin/realms/{realm}/localization` |  |
| `GET /admin/realms/{realm}/localization/{locale}` |  |
| `POST /admin/realms/{realm}/localization/{locale}` | Import localization from uploaded JSON file |
| `DELETE /admin/realms/{realm}/localization/{locale}` |  |
| `GET /admin/realms/{realm}/localization/{locale}/{key}` |  |
| `PUT /admin/realms/{realm}/localization/{locale}/{key}` |  |
| `DELETE /admin/realms/{realm}/localization/{locale}/{key}` |  |
| `POST /admin/realms/{realm}/logout-all` | Removes all user sessions. |
| `POST /admin/realms/{realm}/partial-export` | Partial export of existing realm into a JSON file. |
| `POST /admin/realms/{realm}/partialImport` | Partial import from a JSON file to an existing realm. |
| `POST /admin/realms/{realm}/push-revocation` | Push the realm's revocation policy to any client that has an admin url associated with it. |
| `DELETE /admin/realms/{realm}/sessions/{session}` | Remove a specific user session. |
| `POST /admin/realms/{realm}/testSMTPConnection` | Test SMTP connection with current logged in user |
| `GET /admin/realms/{realm}/users-management-permissions` |  |
| `PUT /admin/realms/{realm}/users-management-permissions` |  |

## attackDetection

| Request | Summary |
| --- | --- |
| `DELETE /admin/realms/{realm}/attack-detection/brute-force/users` | Clear any user login failures for all users This can release temporary disabled users |
| `GET /admin/realms/{realm}/attack-detection/brute-force/users/{userId}` | Get status of a username in brute force detection |
| `DELETE /admin/realms/{realm}/attack-detection/brute-force/users/{userId}` | Clear any user login failures for the user This can release temporary disabled user |

## authenticationManagement

| Request | Summary |
| --- | --- |
| `GET /admin/realms/{realm}/authentication/authenticator-providers` | Get authenticator providers Returns a stream of authenticator providers. |
| `GET /admin/realms/{realm}/authentication/client-authenticator-providers` | Get client authenticator providers Returns a stream of client authenticator providers. |
| `POST /admin/realms/{realm}/authentication/config` | Create new authenticator configuration |
| `GET /admin/realms/{realm}/authentication/config-description/{providerId}` | Get authenticator provider's configuration description |
| `GET /admin/realms/{realm}/authentication/config/{id}` | Get authenticator configuration |
| `PUT /admin/realms/{realm}/authentication/config/{id}` | Update authenticator configuration |
| `DELETE /admin/realms/{realm}/authentication/config/{id}` | Delete authenticator configuration |
| `POST /admin/realms/{realm}/authentication/executions` | Add new authentication execution |
| `GET /admin/realms/{realm}/authentication/executions/{executionId}` | Get Single Execution |
| `DELETE /admin/realms/{realm}/authentication/executions/{executionId}` | Delete execution |
| `POST /admin/realms/{realm}/authentication/executions/{executionId}/config` | Update execution with new configuration |
| `GET /admin/realms/{realm}/authentication/executions/{executionId}/config/{id}` | Get execution's configuration |
| `POST /admin/realms/{realm}/authentication/executions/{executionId}/lower-priority` | Lower execution's priority |
| `POST /admin/realms/{realm}/authentication/executions/{executionId}/raise-priority` | Raise execution's priority |
| `GET /admin/realms/{realm}/authentication/flows` | Get authentication flows Returns a stream of authentication flows. |
| `POST /admin/realms/{realm}/authentication/flows` | Create a new authentication flow |
| `POST /admin/realms/{realm}/authentication/flows/{flowAlias}/copy` | Copy existing authentication flow under a new name The new name is given as 'newName' attribute of the passed JSON object |
| `GET /admin/realms/{realm}/authentication/flows/{flowAlias}/executions` | Get authentication executions for a flow |
| `PUT /admin/realms/{realm}/authentication/flows/{flowAlias}/executions` | Update authentication executions of a Flow |
| `POST /admin/realms/{realm}/authentication/flows/{flowAlias}/executions/execution` | Add new authentication execution to a flow |
| `POST /admin/realms/{realm}/authentication/flows/{flowAlias}/executions/flow` | Add new flow with new execution to existing flow |
| `GET /admin/realms/{realm}/authentication/flows/{id}` | Get authentication flow for id |
| `PUT /admin/realms/{realm}/authentication/flows/{id}` | Update an authentication flow |
| `DELETE /admin/realms/{realm}/authentication/flows/{id}` | Delete an authentication flow |
| `GET /admin/realms/{realm}/authentication/form-action-providers` | Get form action providers Returns a stream of form action providers. |
| `GET /admin/realms/{realm}/authentication/form-providers` | Get form providers Returns a stream of form providers. |
| `GET /admin/realms/{realm}/authentication/per-client-config-description` | Get configuration descriptions for all clients |
| `POST /admin/realms/{realm}/authentication/register-required-action` | Register a new required actions |
| `GET /admin/realms/{realm}/authentication/required-actions` | Get required actions Returns a stream of required actions. |
| `GET /admin/realms/{realm}/authentication/required-actions/{alias}` | Get required action for alias |
| `PUT /admin/realms/{realm}/authentication/required-actions/{alias}` | Update required action |
| `DELETE /admin/realms/{realm}/authentication/required-actions/{alias}` | Delete required action |
| `GET /admin/realms/{realm}/authentication/required-actions/{alias}/config` | Get RequiredAction configuration |
| `PUT /admin/realms/{realm}/authentication/required-actions/{alias}/config` | Update RequiredAction configuration |
| `DELETE /admin/realms/{realm}/authentication/required-actions/{alias}/config` | Delete RequiredAction configuration |
| `GET /admin/realms/{realm}/authentication/required-actions/{alias}/config-description` | Get RequiredAction provider configuration description |
| `POST /admin/realms/{realm}/authentication/required-actions/{alias}/lower-priority` | Lower required action's priority |
| `POST /admin/realms/{realm}/authentication/required-actions/{alias}/raise-priority` | Raise required action's priority |
| `GET /admin/realms/{realm}/authentication/unregistered-required-actions` | Get unregistered required actions Returns a stream of unregistered required actions. |

## clientRegistrationPolicy

| Request | Summary |
| --- | --- |
| `GET /admin/realms/{realm}/client-registration-policy/providers` | Base path for retrieve providers with the configProperties properly filled |

## clientScopes

| Request | Summary |
| --- | --- |
| `GET /admin/realms/{realm}/client-scopes` | Get client scopes belonging to the realm Returns a list of client scopes belonging to the realm |
| `POST /admin/realms/{realm}/client-scopes` | Create a new client scope Client Scope’s name must be unique! |
| `GET /admin/realms/{realm}/client-templates` | Get client scopes belonging to the realm Returns a list of client scopes belonging to the realm |
| `POST /admin/realms/{realm}/client-templates` | Create a new client scope Client Scope’s name must be unique! |
| `GET /admin/realms/{realm}/client-scopes/{clientScopeId}` | Get representation of the client scope |
| `PUT /admin/realms/{realm}/client-scopes/{clientScopeId}` | Update the client scope |
| `DELETE /admin/realms/{realm}/client-scopes/{clientScopeId}` | Delete the client scope |
| `GET /admin/realms/{realm}/client-templates/{clientScopeId}` | Get representation of the client scope |
| `PUT /admin/realms/{realm}/client-templates/{clientScopeId}` | Update the client scope |
| `DELETE /admin/realms/{realm}/client-templates/{clientScopeId}` | Delete the client scope |

## clients

| Request | Summary |
| --- | --- |
| `GET /admin/realms/{realm}/clients` | Get clients belonging to the realm. |
| `POST /admin/realms/{realm}/clients` | Create a new client Client’s client_id must be unique! |
| `GET /admin/realms/{realm}/clients/{clientUuid}` | Get representation of the client |
| `PUT /admin/realms/{realm}/clients/{clientUuid}` | Update the client |
| `DELETE /admin/realms/{realm}/clients/{clientUuid}` | Delete the client |
| `GET /admin/realms/{realm}/clients/{clientUuid}/client-secret` | Get the client secret |
| `POST /admin/realms/{realm}/clients/{clientUuid}/client-secret` | Generate a new secret for the client |
| `GET /admin/realms/{realm}/clients/{clientUuid}/client-secret/rotated` | Get the rotated client secret |
| `DELETE /admin/realms/{realm}/clients/{clientUuid}/client-secret/rotated` | Invalidate the rotated secret for the client |
| `GET /admin/realms/{realm}/clients/{clientUuid}/default-client-scopes` | Get default client scopes. Only name and ids are returned. |
| `PUT /admin/realms/{realm}/clients/{clientUuid}/default-client-scopes/{clientScopeId}` |  |
| `DELETE /admin/realms/{realm}/clients/{clientUuid}/default-client-scopes/{clientScopeId}` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/evaluate-scopes/generate-example-access-token` | Create JSON with payload of example access token |
| `GET /admin/realms/{realm}/clients/{clientUuid}/evaluate-scopes/generate-example-id-token` | Create JSON with payload of example id token |
| `GET /admin/realms/{realm}/clients/{clientUuid}/evaluate-scopes/generate-example-saml-response` | Create JSON with an example SAML response as payload |
| `GET /admin/realms/{realm}/clients/{clientUuid}/evaluate-scopes/generate-example-userinfo` | Create JSON with payload of example user info |
| `GET /admin/realms/{realm}/clients/{clientUuid}/evaluate-scopes/protocol-mappers` | Return list of all protocol mappers, which will be used when generating tokens issued for particular client. |
| `GET /admin/realms/{realm}/clients/{clientUuid}/evaluate-scopes/scope-mappings/{roleContainerId}/granted` | Get effective scope mapping of all roles of particular role container, which this client is defacto allowed to have in the accessToken issued for him. |
| `GET /admin/realms/{realm}/clients/{clientUuid}/evaluate-scopes/scope-mappings/{roleContainerId}/not-granted` | Get roles, which this client doesn't have scope for and can't have them in the accessToken issued for him. |
| `GET /admin/realms/{realm}/clients/{clientUuid}/installation/providers/{providerId}` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/management/permissions` | Return object stating whether client Authorization permissions have been initialized or not and a reference |
| `PUT /admin/realms/{realm}/clients/{clientUuid}/management/permissions` | Return object stating whether client Authorization permissions have been initialized or not and a reference |
| `POST /admin/realms/{realm}/clients/{clientUuid}/nodes` | Register a cluster node with the client Manually register cluster node to this client - usually it’s not needed to call this directly as adapter should handle by sending registration request to Keycloak |
| `DELETE /admin/realms/{realm}/clients/{clientUuid}/nodes/{node}` | Unregister a cluster node from the client |
| `GET /admin/realms/{realm}/clients/{clientUuid}/offline-session-count` | Get application offline session count Returns a number of offline user sessions associated with this client { "count": number } |
| `GET /admin/realms/{realm}/clients/{clientUuid}/offline-sessions` | Get offline sessions for client. Returns a list of offline user sessions associated with this client |
| `GET /admin/realms/{realm}/clients/{clientUuid}/optional-client-scopes` | Get optional client scopes. Only name and ids are returned. |
| `PUT /admin/realms/{realm}/clients/{clientUuid}/optional-client-scopes/{clientScopeId}` |  |
| `DELETE /admin/realms/{realm}/clients/{clientUuid}/optional-client-scopes/{clientScopeId}` |  |
| `POST /admin/realms/{realm}/clients/{clientUuid}/push-revocation` | Push the client's revocation policy to its admin URL If the client has an admin URL, push revocation policy to it. |
| `POST /admin/realms/{realm}/clients/{clientUuid}/registration-access-token` | Generate a new registration access token for the client |
| `GET /admin/realms/{realm}/clients/{clientUuid}/service-account-user` | Get a user dedicated to the service account |
| `GET /admin/realms/{realm}/clients/{clientUuid}/session-count` | Get application session count Returns a number of user sessions associated with this client { "count": number } |
| `GET /admin/realms/{realm}/clients/{clientUuid}/test-nodes-available` | Test if registered cluster nodes are available Tests availability by sending 'ping' request to all cluster nodes. |
| `GET /admin/realms/{realm}/clients/{clientUuid}/user-sessions` | Get user sessions for client. Returns a list of user sessions associated with this client. |

## clientInitialAccess

| Request | Summary |
| --- | --- |
| `GET /admin/realms/{realm}/clients-initial-access` |  |
| `POST /admin/realms/{realm}/clients-initial-access` | Create a new initial access token. |
| `DELETE /admin/realms/{realm}/clients-initial-access/{id}` |  |

## component

| Request | Summary |
| --- | --- |
| `GET /admin/realms/{realm}/components` |  |
| `POST /admin/realms/{realm}/components` |  |
| `GET /admin/realms/{realm}/components/{id}` |  |
| `PUT /admin/realms/{realm}/components/{id}` |  |
| `DELETE /admin/realms/{realm}/components/{id}` |  |
| `GET /admin/realms/{realm}/components/{id}/sub-component-types` | List of subcomponent types that are available to configure for a particular parent component. |

## groups

| Request | Summary |
| --- | --- |
| `GET /admin/realms/{realm}/groups` | Get group hierarchy. Only `name` and `id` are returned. `subGroups` are only returned when using the `search` or `q` parameter. If none of these parameters is provided, the top-level groups are returned without `subGroups` being filled. |
| `POST /admin/realms/{realm}/groups` | create or add a top level realm groupSet or create child. |
| `GET /admin/realms/{realm}/groups/count` | Returns the groups counts. |
| `GET /admin/realms/{realm}/groups/{groupId}` |  |
| `PUT /admin/realms/{realm}/groups/{groupId}` | Update group, ignores subgroups. |
| `DELETE /admin/realms/{realm}/groups/{groupId}` |  |
| `GET /admin/realms/{realm}/groups/{groupId}/children` | Return a paginated list of subgroups that have a parent group corresponding to the group on the URL |
| `POST /admin/realms/{realm}/groups/{groupId}/children` | Set or create child. |
| `GET /admin/realms/{realm}/groups/{groupId}/management/permissions` | Return object stating whether client Authorization permissions have been initialized or not and a reference |
| `PUT /admin/realms/{realm}/groups/{groupId}/management/permissions` | Return object stating whether client Authorization permissions have been initialized or not and a reference |
| `GET /admin/realms/{realm}/groups/{groupId}/members` | Get users Returns a stream of users, filtered according to query parameters |

## identityProviders

| Request | Summary |
| --- | --- |
| `POST /admin/realms/{realm}/identity-provider/import-config` | Import identity provider from JSON body |
| `GET /admin/realms/{realm}/identity-provider/instances` | List identity providers |
| `POST /admin/realms/{realm}/identity-provider/instances` | Create a new identity provider |
| `GET /admin/realms/{realm}/identity-provider/instances/{alias}` | Get the identity provider |
| `PUT /admin/realms/{realm}/identity-provider/instances/{alias}` | Update the identity provider |
| `DELETE /admin/realms/{realm}/identity-provider/instances/{alias}` | Delete the identity provider |
| `GET /admin/realms/{realm}/identity-provider/instances/{alias}/export` | Export public broker configuration for identity provider |
| `GET /admin/realms/{realm}/identity-provider/instances/{alias}/management/permissions` | Return object stating whether client Authorization permissions have been initialized or not and a reference |
| `PUT /admin/realms/{realm}/identity-provider/instances/{alias}/management/permissions` | Return object stating whether client Authorization permissions have been initialized or not and a reference |
| `GET /admin/realms/{realm}/identity-provider/instances/{alias}/mapper-types` | Get mapper types for identity provider |
| `GET /admin/realms/{realm}/identity-provider/instances/{alias}/mappers` | Get mappers for identity provider |
| `POST /admin/realms/{realm}/identity-provider/instances/{alias}/mappers` | Add a mapper to identity provider |
| `GET /admin/realms/{realm}/identity-provider/instances/{alias}/mappers/{id}` | Get mapper by id for the identity provider |
| `PUT /admin/realms/{realm}/identity-provider/instances/{alias}/mappers/{id}` | Update a mapper for the identity provider |
| `DELETE /admin/realms/{realm}/identity-provider/instances/{alias}/mappers/{id}` | Delete a mapper for the identity provider |
| `GET /admin/realms/{realm}/identity-provider/instances/{alias}/reload-keys` | Reaload keys for the identity provider if the provider supports it, "true" is returned if reload was performed, "false" if not. |
| `GET /admin/realms/{realm}/identity-provider/providers/{providerId}` | Get the identity provider factory for that provider id |

## clientAttributeCertificate

| Request | Summary |
| --- | --- |
| `POST /admin/realms/{realm}/identity-provider/upload-certificate` | Uploads a certificate, prepares the jwks or public key associated, and returns the certificate representation. |
| `GET /admin/realms/{realm}/clients/{clientUuid}/certificates/{attr}` | Get key info |
| `POST /admin/realms/{realm}/clients/{clientUuid}/certificates/{attr}/download` | Get a keystore file for the client, containing the public certificate |
| `POST /admin/realms/{realm}/clients/{clientUuid}/certificates/{attr}/generate` | Generate a new certificate with new key pair |
| `POST /admin/realms/{realm}/clients/{clientUuid}/certificates/{attr}/generate-and-download` | Generate a new keypair and certificate, and get the private key file Generates a keypair and certificate and serves the private key in a specified keystore format. Only generated public certificate is saved in Keycloak DB - the private key is not. |
| `POST /admin/realms/{realm}/clients/{clientUuid}/certificates/{attr}/upload` | Upload only certificate, not private key |
| `POST /admin/realms/{realm}/clients/{clientUuid}/certificates/{attr}/upload-certificate` | Upload only certificate, not private key |

## key

| Request | Summary |
| --- | --- |
| `GET /admin/realms/{realm}/keys` |  |

## organizations

| Request | Summary |
| --- | --- |
| `GET /admin/realms/{realm}/organizations` | Returns a paginated list of organizations filtered according to the specified parameters |
| `POST /admin/realms/{realm}/organizations` | Creates a new organization |
| `GET /admin/realms/{realm}/organizations/count` | Returns the organizations counts. |
| `GET /admin/realms/{realm}/organizations/members/{memberId}/organizations` | Returns the organizations associated with the user that has the specified id |
| `GET /admin/realms/{realm}/organizations/{orgId}` | Returns the organization representation |
| `PUT /admin/realms/{realm}/organizations/{orgId}` | Updates the organization |
| `DELETE /admin/realms/{realm}/organizations/{orgId}` | Deletes the organization |
| `GET /admin/realms/{realm}/organizations/{orgId}/groups` | Get organization groups |
| `POST /admin/realms/{realm}/organizations/{orgId}/groups` | Creates a new top-level group or moves an existing group to top-level |
| `GET /admin/realms/{realm}/organizations/{orgId}/groups/group-by-path/{path}` | Get organization group by path |
| `GET /admin/realms/{realm}/organizations/{orgId}/groups/{groupId}` | Get organization group representation |
| `PUT /admin/realms/{realm}/organizations/{orgId}/groups/{groupId}` | Update organization group |
| `DELETE /admin/realms/{realm}/organizations/{orgId}/groups/{groupId}` | Delete the organization group |
| `GET /admin/realms/{realm}/organizations/{orgId}/groups/{groupId}/children` | Get subgroups of this organization group |
| `POST /admin/realms/{realm}/organizations/{orgId}/groups/{groupId}/children` | Create or move a subgroup |
| `GET /admin/realms/{realm}/organizations/{orgId}/groups/{groupId}/members` | Get members of this organization group |
| `PUT /admin/realms/{realm}/organizations/{orgId}/groups/{groupId}/members/{userId}` | Add a user to this organization group |
| `DELETE /admin/realms/{realm}/organizations/{orgId}/groups/{groupId}/members/{userId}` | Remove a user from this organization group |
| `GET /admin/realms/{realm}/organizations/{orgId}/identity-providers` | Returns all identity providers associated with the organization |
| `POST /admin/realms/{realm}/organizations/{orgId}/identity-providers` | Adds the identity provider with the specified id to the organization |
| `GET /admin/realms/{realm}/organizations/{orgId}/identity-providers/{alias}` | Returns the identity provider associated with the organization that has the specified alias |
| `PUT /admin/realms/{realm}/organizations/{orgId}/identity-providers/{alias}` | Updates the per-association config for the identity provider linked to the organization |
| `DELETE /admin/realms/{realm}/organizations/{orgId}/identity-providers/{alias}` | Removes the identity provider with the specified alias from the organization |
| `GET /admin/realms/{realm}/organizations/{orgId}/identity-providers/{alias}/groups` | Returns organization groups for the identity provider |
| `GET /admin/realms/{realm}/organizations/{orgId}/invitations` | Get invitations for the organization |
| `GET /admin/realms/{realm}/organizations/{orgId}/invitations/{id}` | Get invitation by ID |
| `DELETE /admin/realms/{realm}/organizations/{orgId}/invitations/{id}` | Delete an invitation |
| `POST /admin/realms/{realm}/organizations/{orgId}/invitations/{id}/resend` | Resend an invitation |
| `GET /admin/realms/{realm}/organizations/{orgId}/members` | Returns a paginated list of organization members filtered according to the specified parameters |
| `POST /admin/realms/{realm}/organizations/{orgId}/members` | Adds the user with the specified id as a member of the organization |
| `GET /admin/realms/{realm}/organizations/{orgId}/members/count` | Returns number of members in the organization. |
| `POST /admin/realms/{realm}/organizations/{orgId}/members/invite-existing-user` | Invites an existing user to the organization, using the specified user id |
| `POST /admin/realms/{realm}/organizations/{orgId}/members/invite-user` | Invites an existing user or sends a registration link to a new user, based on the provided e-mail address. |
| `GET /admin/realms/{realm}/organizations/{orgId}/members/{memberId}` | Returns the member of the organization with the specified id |
| `DELETE /admin/realms/{realm}/organizations/{orgId}/members/{memberId}` | Removes the user with the specified id from the organization |
| `GET /admin/realms/{realm}/organizations/{orgId}/members/{memberId}/groups` | Returns the organization group memberships for a member with the specified id |
| `PUT /admin/realms/{realm}/organizations/{orgId}/members/{memberId}/membership-type` | Updates the membership type of the member with the specified id |
| `GET /admin/realms/{realm}/organizations/{orgId}/members/{memberId}/organizations` | Returns the organizations associated with the user that has the specified id |

## roles

| Request | Summary |
| --- | --- |
| `GET /admin/realms/{realm}/roles` | Get all roles for the realm or client |
| `POST /admin/realms/{realm}/roles` | Create a new role for the realm or client |
| `GET /admin/realms/{realm}/clients/{clientUuid}/roles` | Get all roles for the realm or client |
| `POST /admin/realms/{realm}/clients/{clientUuid}/roles` | Create a new role for the realm or client |
| `GET /admin/realms/{realm}/clients/{clientUuid}/roles/{roleName}` | Get a role by name |
| `PUT /admin/realms/{realm}/clients/{clientUuid}/roles/{roleName}` | Update a role by name |
| `DELETE /admin/realms/{realm}/clients/{clientUuid}/roles/{roleName}` | Delete a role by name |
| `GET /admin/realms/{realm}/clients/{clientUuid}/roles/{roleName}/composites` | Get composites of the role |
| `POST /admin/realms/{realm}/clients/{clientUuid}/roles/{roleName}/composites` | Add a composite to the role |
| `DELETE /admin/realms/{realm}/clients/{clientUuid}/roles/{roleName}/composites` | Remove roles from the role's composite |
| `GET /admin/realms/{realm}/clients/{clientUuid}/roles/{roleName}/composites/clients/{targetClientUuid}` | Get client-level roles for the client that are in the role's composite |
| `GET /admin/realms/{realm}/clients/{clientUuid}/roles/{roleName}/composites/realm` | Get realm-level roles of the role's composite |
| `GET /admin/realms/{realm}/clients/{clientUuid}/roles/{roleName}/groups` | Returns a stream of groups that have the specified role name |
| `GET /admin/realms/{realm}/clients/{clientUuid}/roles/{roleName}/management/permissions` | Return object stating whether role Authorization permissions have been initialized or not and a reference |
| `PUT /admin/realms/{realm}/clients/{clientUuid}/roles/{roleName}/management/permissions` | Return object stating whether role Authorization permissions have been initialized or not and a reference |
| `GET /admin/realms/{realm}/clients/{clientUuid}/roles/{roleName}/users` | Returns a stream of users that have the specified role name. |
| `GET /admin/realms/{realm}/roles/{roleName}` | Get a role by name |
| `PUT /admin/realms/{realm}/roles/{roleName}` | Update a role by name |
| `DELETE /admin/realms/{realm}/roles/{roleName}` | Delete a role by name |
| `GET /admin/realms/{realm}/roles/{roleName}/composites` | Get composites of the role |
| `POST /admin/realms/{realm}/roles/{roleName}/composites` | Add a composite to the role |
| `DELETE /admin/realms/{realm}/roles/{roleName}/composites` | Remove roles from the role's composite |
| `GET /admin/realms/{realm}/roles/{roleName}/composites/clients/{targetClientUuid}` | Get client-level roles for the client that are in the role's composite |
| `GET /admin/realms/{realm}/roles/{roleName}/composites/realm` | Get realm-level roles of the role's composite |
| `GET /admin/realms/{realm}/roles/{roleName}/groups` | Returns a stream of groups that have the specified role name |
| `GET /admin/realms/{realm}/roles/{roleName}/management/permissions` | Return object stating whether role Authorization permissions have been initialized or not and a reference |
| `PUT /admin/realms/{realm}/roles/{roleName}/management/permissions` | Return object stating whether role Authorization permissions have been initialized or not and a reference |
| `GET /admin/realms/{realm}/roles/{roleName}/users` | Returns a stream of users that have the specified role name. |

## users

| Request | Summary |
| --- | --- |
| `GET /admin/realms/{realm}/users` | Get users Returns a stream of users, filtered according to query parameters. |
| `POST /admin/realms/{realm}/users` | Create a new user Username must be unique. |
| `GET /admin/realms/{realm}/users/count` | Returns the number of users that match the given criteria. |
| `GET /admin/realms/{realm}/users/profile` | Get the configuration for the user profile |
| `PUT /admin/realms/{realm}/users/profile` | Set the configuration for the user profile |
| `GET /admin/realms/{realm}/users/profile/metadata` | Get the UserProfileMetadata from the configuration |
| `GET /admin/realms/{realm}/users/{userId}` | Get representation of the user |
| `PUT /admin/realms/{realm}/users/{userId}` | Update the user |
| `DELETE /admin/realms/{realm}/users/{userId}` | Delete the user |
| `GET /admin/realms/{realm}/users/{userId}/configured-user-storage-credential-types` | Return credential types, which are provided by the user storage where user is stored. |
| `GET /admin/realms/{realm}/users/{userId}/consents` | Get consents granted by the user |
| `DELETE /admin/realms/{realm}/users/{userId}/consents/{client}` | Revoke consent and offline tokens for particular client from user |
| `GET /admin/realms/{realm}/users/{userId}/credentials` |  |
| `DELETE /admin/realms/{realm}/users/{userId}/credentials/{credentialId}` | Remove a credential for a user |
| `POST /admin/realms/{realm}/users/{userId}/credentials/{credentialId}/moveAfter/{newPreviousCredentialId}` | Move a credential to a position behind another credential |
| `POST /admin/realms/{realm}/users/{userId}/credentials/{credentialId}/moveToFirst` | Move a credential to a first position in the credentials list of the user |
| `PUT /admin/realms/{realm}/users/{userId}/credentials/{credentialId}/userLabel` | Update a credential label for a user |
| `PUT /admin/realms/{realm}/users/{userId}/disable-credential-types` | Disable all credentials for a user of a specific type |
| `PUT /admin/realms/{realm}/users/{userId}/execute-actions-email` | Send an email to the user with a link they can click to execute particular actions. |
| `GET /admin/realms/{realm}/users/{userId}/federated-identity` | Get social logins associated with the user |
| `POST /admin/realms/{realm}/users/{userId}/federated-identity/{provider}` | Add a social login provider to the user |
| `DELETE /admin/realms/{realm}/users/{userId}/federated-identity/{provider}` | Remove a social login provider from user |
| `GET /admin/realms/{realm}/users/{userId}/groups` |  |
| `GET /admin/realms/{realm}/users/{userId}/groups/count` |  |
| `PUT /admin/realms/{realm}/users/{userId}/groups/{groupId}` |  |
| `DELETE /admin/realms/{realm}/users/{userId}/groups/{groupId}` |  |
| `POST /admin/realms/{realm}/users/{userId}/impersonation` | Impersonate the user |
| `POST /admin/realms/{realm}/users/{userId}/logout` | Remove all user sessions associated with the user Also send notification to all clients that have an admin URL to invalidate the sessions for the particular user. |
| `GET /admin/realms/{realm}/users/{userId}/offline-sessions/{clientUuid}` | Get offline sessions associated with the user and client |
| `PUT /admin/realms/{realm}/users/{userId}/reset-password` | Set up a new password for the user. |
| `PUT /admin/realms/{realm}/users/{userId}/reset-password-email` | Send an email to the user with a link they can click to reset their password. |
| `PUT /admin/realms/{realm}/users/{userId}/send-verify-email` | Send an email-verification email to the user An email contains a link the user can click to verify their email address. |
| `GET /admin/realms/{realm}/users/{userId}/sessions` | Get sessions associated with the user |
| `GET /admin/realms/{realm}/users/{userId}/unmanagedAttributes` |  |

## workflows

| Request | Summary |
| --- | --- |
| `GET /admin/realms/{realm}/workflows` | List workflows |
| `POST /admin/realms/{realm}/workflows` | Create workflow |
| `POST /admin/realms/{realm}/workflows/migrate` | Migrate scheduled resources from one step to another |
| `GET /admin/realms/{realm}/workflows/{id}` | Get workflow |
| `PUT /admin/realms/{realm}/workflows/{id}` | Update workflow |
| `DELETE /admin/realms/{realm}/workflows/{id}` | Delete workflow |
| `POST /admin/realms/{realm}/workflows/{id}/activate/{type}/{resourceId}` | Activate workflow for resource |
| `POST /admin/realms/{realm}/workflows/{id}/deactivate/{type}/{resourceId}` | Deactivate workflow for resource |
| `GET /admin/realms/{realm}/workflows/scheduled/{resourceId}` | List scheduled workflows for resource |

## protocolMappers

| Request | Summary |
| --- | --- |
| `POST /admin/realms/{realm}/client-scopes/{clientScopeId}/protocol-mappers/add-models` | Create multiple mappers |
| `GET /admin/realms/{realm}/client-scopes/{clientScopeId}/protocol-mappers/models` | Get mappers |
| `POST /admin/realms/{realm}/client-scopes/{clientScopeId}/protocol-mappers/models` | Create a mapper |
| `GET /admin/realms/{realm}/client-scopes/{clientScopeId}/protocol-mappers/models/{id}` | Get mapper by id |
| `PUT /admin/realms/{realm}/client-scopes/{clientScopeId}/protocol-mappers/models/{id}` | Update the mapper |
| `DELETE /admin/realms/{realm}/client-scopes/{clientScopeId}/protocol-mappers/models/{id}` | Delete the mapper |
| `GET /admin/realms/{realm}/client-scopes/{clientScopeId}/protocol-mappers/protocol/{protocol}` | Get mappers by name for a specific protocol |
| `POST /admin/realms/{realm}/client-templates/{clientScopeId}/protocol-mappers/add-models` | Create multiple mappers |
| `GET /admin/realms/{realm}/client-templates/{clientScopeId}/protocol-mappers/models` | Get mappers |
| `POST /admin/realms/{realm}/client-templates/{clientScopeId}/protocol-mappers/models` | Create a mapper |
| `GET /admin/realms/{realm}/client-templates/{clientScopeId}/protocol-mappers/models/{id}` | Get mapper by id |
| `PUT /admin/realms/{realm}/client-templates/{clientScopeId}/protocol-mappers/models/{id}` | Update the mapper |
| `DELETE /admin/realms/{realm}/client-templates/{clientScopeId}/protocol-mappers/models/{id}` | Delete the mapper |
| `GET /admin/realms/{realm}/client-templates/{clientScopeId}/protocol-mappers/protocol/{protocol}` | Get mappers by name for a specific protocol |
| `POST /admin/realms/{realm}/clients/{clientUuid}/protocol-mappers/add-models` | Create multiple mappers |
| `GET /admin/realms/{realm}/clients/{clientUuid}/protocol-mappers/models` | Get mappers |
| `POST /admin/realms/{realm}/clients/{clientUuid}/protocol-mappers/models` | Create a mapper |
| `GET /admin/realms/{realm}/clients/{clientUuid}/protocol-mappers/models/{id}` | Get mapper by id |
| `PUT /admin/realms/{realm}/clients/{clientUuid}/protocol-mappers/models/{id}` | Update the mapper |
| `DELETE /admin/realms/{realm}/clients/{clientUuid}/protocol-mappers/models/{id}` | Delete the mapper |
| `GET /admin/realms/{realm}/clients/{clientUuid}/protocol-mappers/protocol/{protocol}` | Get mappers by name for a specific protocol |

## scopeMappings

| Request | Summary |
| --- | --- |
| `GET /admin/realms/{realm}/client-scopes/{clientScopeId}/scope-mappings` | Get all scope mappings for the client |
| `GET /admin/realms/{realm}/client-scopes/{clientScopeId}/scope-mappings/clients/{client}` | Get the roles associated with a client's scope Returns roles for the client. |
| `POST /admin/realms/{realm}/client-scopes/{clientScopeId}/scope-mappings/clients/{client}` | Add client-level roles to the client's scope |
| `DELETE /admin/realms/{realm}/client-scopes/{clientScopeId}/scope-mappings/clients/{client}` | Remove client-level roles from the client's scope. |
| `GET /admin/realms/{realm}/client-scopes/{clientScopeId}/scope-mappings/clients/{client}/available` | The available client-level roles Returns the roles for the client that can be associated with the client's scope |
| `GET /admin/realms/{realm}/client-scopes/{clientScopeId}/scope-mappings/clients/{client}/composite` | Get effective client roles Returns the roles for the client that are associated with the client's scope. |
| `GET /admin/realms/{realm}/client-scopes/{clientScopeId}/scope-mappings/realm` | Get realm-level roles associated with the client's scope |
| `POST /admin/realms/{realm}/client-scopes/{clientScopeId}/scope-mappings/realm` | Add a set of realm-level roles to the client's scope |
| `DELETE /admin/realms/{realm}/client-scopes/{clientScopeId}/scope-mappings/realm` | Remove a set of realm-level roles from the client's scope |
| `GET /admin/realms/{realm}/client-scopes/{clientScopeId}/scope-mappings/realm/available` | Get realm-level roles that are available to attach to this client's scope |
| `GET /admin/realms/{realm}/client-scopes/{clientScopeId}/scope-mappings/realm/composite` | Get effective realm-level roles associated with the client’s scope What this does is recurse any composite roles associated with the client’s scope and adds the roles to this lists. |
| `GET /admin/realms/{realm}/client-templates/{clientScopeId}/scope-mappings` | Get all scope mappings for the client |
| `GET /admin/realms/{realm}/client-templates/{clientScopeId}/scope-mappings/clients/{client}` | Get the roles associated with a client's scope Returns roles for the client. |
| `POST /admin/realms/{realm}/client-templates/{clientScopeId}/scope-mappings/clients/{client}` | Add client-level roles to the client's scope |
| `DELETE /admin/realms/{realm}/client-templates/{clientScopeId}/scope-mappings/clients/{client}` | Remove client-level roles from the client's scope. |
| `GET /admin/realms/{realm}/client-templates/{clientScopeId}/scope-mappings/clients/{client}/available` | The available client-level roles Returns the roles for the client that can be associated with the client's scope |
| `GET /admin/realms/{realm}/client-templates/{clientScopeId}/scope-mappings/clients/{client}/composite` | Get effective client roles Returns the roles for the client that are associated with the client's scope. |
| `GET /admin/realms/{realm}/client-templates/{clientScopeId}/scope-mappings/realm` | Get realm-level roles associated with the client's scope |
| `POST /admin/realms/{realm}/client-templates/{clientScopeId}/scope-mappings/realm` | Add a set of realm-level roles to the client's scope |
| `DELETE /admin/realms/{realm}/client-templates/{clientScopeId}/scope-mappings/realm` | Remove a set of realm-level roles from the client's scope |
| `GET /admin/realms/{realm}/client-templates/{clientScopeId}/scope-mappings/realm/available` | Get realm-level roles that are available to attach to this client's scope |
| `GET /admin/realms/{realm}/client-templates/{clientScopeId}/scope-mappings/realm/composite` | Get effective realm-level roles associated with the client’s scope What this does is recurse any composite roles associated with the client’s scope and adds the roles to this lists. |
| `GET /admin/realms/{realm}/clients/{clientUuid}/scope-mappings` | Get all scope mappings for the client |
| `GET /admin/realms/{realm}/clients/{clientUuid}/scope-mappings/clients/{client}` | Get the roles associated with a client's scope Returns roles for the client. |
| `POST /admin/realms/{realm}/clients/{clientUuid}/scope-mappings/clients/{client}` | Add client-level roles to the client's scope |
| `DELETE /admin/realms/{realm}/clients/{clientUuid}/scope-mappings/clients/{client}` | Remove client-level roles from the client's scope. |
| `GET /admin/realms/{realm}/clients/{clientUuid}/scope-mappings/clients/{client}/available` | The available client-level roles Returns the roles for the client that can be associated with the client's scope |
| `GET /admin/realms/{realm}/clients/{clientUuid}/scope-mappings/clients/{client}/composite` | Get effective client roles Returns the roles for the client that are associated with the client's scope. |
| `GET /admin/realms/{realm}/clients/{clientUuid}/scope-mappings/realm` | Get realm-level roles associated with the client's scope |
| `POST /admin/realms/{realm}/clients/{clientUuid}/scope-mappings/realm` | Add a set of realm-level roles to the client's scope |
| `DELETE /admin/realms/{realm}/clients/{clientUuid}/scope-mappings/realm` | Remove a set of realm-level roles from the client's scope |
| `GET /admin/realms/{realm}/clients/{clientUuid}/scope-mappings/realm/available` | Get realm-level roles that are available to attach to this client's scope |
| `GET /admin/realms/{realm}/clients/{clientUuid}/scope-mappings/realm/composite` | Get effective realm-level roles associated with the client’s scope What this does is recurse any composite roles associated with the client’s scope and adds the roles to this lists. |

## default

| Request | Summary |
| --- | --- |
| `GET /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server` |  |
| `PUT /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server` |  |
| `POST /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/import` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/permission` |  |
| `POST /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/permission` |  |
| `POST /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/permission/evaluate` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/permission/providers` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/permission/search` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/policy` |  |
| `POST /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/policy` |  |
| `POST /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/policy/evaluate` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/policy/providers` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/policy/search` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/resource` |  |
| `POST /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/resource` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/resource/search` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/resource/{resourceId}` |  |
| `PUT /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/resource/{resourceId}` |  |
| `DELETE /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/resource/{resourceId}` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/resource/{resourceId}/attributes` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/resource/{resourceId}/permissions` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/resource/{resourceId}/scopes` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/scope` |  |
| `POST /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/scope` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/scope/search` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/scope/{scopeId}` |  |
| `PUT /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/scope/{scopeId}` |  |
| `DELETE /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/scope/{scopeId}` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/scope/{scopeId}/permissions` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/scope/{scopeId}/resources` |  |
| `GET /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/settings` |  |

## roleMapper

| Request | Summary |
| --- | --- |
| `GET /admin/realms/{realm}/groups/{groupId}/role-mappings` | Get role mappings |
| `GET /admin/realms/{realm}/groups/{groupId}/role-mappings/realm` | Get realm-level role mappings |
| `POST /admin/realms/{realm}/groups/{groupId}/role-mappings/realm` | Add realm-level role mappings to the user |
| `DELETE /admin/realms/{realm}/groups/{groupId}/role-mappings/realm` | Delete realm-level role mappings |
| `GET /admin/realms/{realm}/groups/{groupId}/role-mappings/realm/available` | Get realm-level roles that can be mapped |
| `GET /admin/realms/{realm}/groups/{groupId}/role-mappings/realm/composite` | Get effective realm-level role mappings This will recurse all composite roles to get the result. |
| `GET /admin/realms/{realm}/organizations/{orgId}/groups/{groupId}/role-mappings` | Get role mappings |
| `GET /admin/realms/{realm}/organizations/{orgId}/groups/{groupId}/role-mappings/realm` | Get realm-level role mappings |
| `POST /admin/realms/{realm}/organizations/{orgId}/groups/{groupId}/role-mappings/realm` | Add realm-level role mappings to the user |
| `DELETE /admin/realms/{realm}/organizations/{orgId}/groups/{groupId}/role-mappings/realm` | Delete realm-level role mappings |
| `GET /admin/realms/{realm}/organizations/{orgId}/groups/{groupId}/role-mappings/realm/available` | Get realm-level roles that can be mapped |
| `GET /admin/realms/{realm}/organizations/{orgId}/groups/{groupId}/role-mappings/realm/composite` | Get effective realm-level role mappings This will recurse all composite roles to get the result. |
| `GET /admin/realms/{realm}/users/{userId}/role-mappings` | Get role mappings |
| `GET /admin/realms/{realm}/users/{userId}/role-mappings/realm` | Get realm-level role mappings |
| `POST /admin/realms/{realm}/users/{userId}/role-mappings/realm` | Add realm-level role mappings to the user |
| `DELETE /admin/realms/{realm}/users/{userId}/role-mappings/realm` | Delete realm-level role mappings |
| `GET /admin/realms/{realm}/users/{userId}/role-mappings/realm/available` | Get realm-level roles that can be mapped |
| `GET /admin/realms/{realm}/users/{userId}/role-mappings/realm/composite` | Get effective realm-level role mappings This will recurse all composite roles to get the result. |

## clientRoleMappings

| Request | Summary |
| --- | --- |
| `GET /admin/realms/{realm}/groups/{groupId}/role-mappings/clients/{clientId}` | Get client-level role mappings for the user or group, and the app |
| `POST /admin/realms/{realm}/groups/{groupId}/role-mappings/clients/{clientId}` | Add client-level roles to the user or group role mapping |
| `DELETE /admin/realms/{realm}/groups/{groupId}/role-mappings/clients/{clientId}` | Delete client-level roles from user or group role mapping |
| `GET /admin/realms/{realm}/groups/{groupId}/role-mappings/clients/{clientId}/available` | Get available client-level roles that can be mapped to the user or group |
| `GET /admin/realms/{realm}/groups/{groupId}/role-mappings/clients/{clientId}/composite` | Get effective client-level role mappings This recurses any composite roles |
| `GET /admin/realms/{realm}/organizations/{orgId}/groups/{groupId}/role-mappings/clients/{clientId}` | Get client-level role mappings for the user or group, and the app |
| `POST /admin/realms/{realm}/organizations/{orgId}/groups/{groupId}/role-mappings/clients/{clientId}` | Add client-level roles to the user or group role mapping |
| `DELETE /admin/realms/{realm}/organizations/{orgId}/groups/{groupId}/role-mappings/clients/{clientId}` | Delete client-level roles from user or group role mapping |
| `GET /admin/realms/{realm}/organizations/{orgId}/groups/{groupId}/role-mappings/clients/{clientId}/available` | Get available client-level roles that can be mapped to the user or group |
| `GET /admin/realms/{realm}/organizations/{orgId}/groups/{groupId}/role-mappings/clients/{clientId}/composite` | Get effective client-level role mappings This recurses any composite roles |
| `GET /admin/realms/{realm}/users/{userId}/role-mappings/clients/{clientId}` | Get client-level role mappings for the user or group, and the app |
| `POST /admin/realms/{realm}/users/{userId}/role-mappings/clients/{clientId}` | Add client-level roles to the user or group role mapping |
| `DELETE /admin/realms/{realm}/users/{userId}/role-mappings/clients/{clientId}` | Delete client-level roles from user or group role mapping |
| `GET /admin/realms/{realm}/users/{userId}/role-mappings/clients/{clientId}/available` | Get available client-level roles that can be mapped to the user or group |
| `GET /admin/realms/{realm}/users/{userId}/role-mappings/clients/{clientId}/composite` | Get effective client-level role mappings This recurses any composite roles |

## rolesById

| Request | Summary |
| --- | --- |
| `GET /admin/realms/{realm}/roles-by-id/{roleId}` | Get a specific role's representation |
| `PUT /admin/realms/{realm}/roles-by-id/{roleId}` | Update the role |
| `DELETE /admin/realms/{realm}/roles-by-id/{roleId}` | Delete the role |
| `GET /admin/realms/{realm}/roles-by-id/{roleId}/composites` | Get role's children Returns a set of role's children provided the role is a composite. |
| `POST /admin/realms/{realm}/roles-by-id/{roleId}/composites` | Make the role a composite role by associating some child roles |
| `DELETE /admin/realms/{realm}/roles-by-id/{roleId}/composites` | Remove a set of roles from the role's composite |
| `GET /admin/realms/{realm}/roles-by-id/{roleId}/composites/clients/{clientUuid}` | Get client-level roles for the client that are in the role's composite |
| `GET /admin/realms/{realm}/roles-by-id/{roleId}/composites/realm` | Get realm-level roles that are in the role's composite |
| `GET /admin/realms/{realm}/roles-by-id/{roleId}/management/permissions` | Return object stating whether role Authorization permissions have been initialized or not and a reference |
| `PUT /admin/realms/{realm}/roles-by-id/{roleId}/management/permissions` | Return object stating whether role Authorization permissions have been initialized or not and a reference |
