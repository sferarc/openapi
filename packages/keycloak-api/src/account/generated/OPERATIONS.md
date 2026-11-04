# Operations

Generated from the Keycloak Account API 1.0.0 OpenAPI spec; do not edit. 19 operations. Call an operation by its request as `account.request("<METHOD> <path>", params)`.

## account

| Request | Summary |
| --- | --- |
| `GET /account/` | Get account |
| `POST /account/` | Update account |
| `GET /account/applications` | Get applications |
| `GET /account/applications/{clientId}/consent` | Get consent |
| `POST /account/applications/{clientId}/consent` | Create consent |
| `PUT /account/applications/{clientId}/consent` | Update consent |
| `DELETE /account/applications/{clientId}/consent` | Delete consent |
| `GET /account/credentials` | Get credentials |
| `DELETE /account/credentials/{credentialId}` | Delete the credential |
| `PUT /account/credentials/{credentialId}/label` | Update a user label of specified credential of current user |
| `GET /account/sessions` | Get sessions |
| `DELETE /account/sessions` | Delete current session |
| `GET /account/sessions/devices` | Get devices |
| `DELETE /account/sessions/{sessionId}` | Delete the session |
| `GET /account/linked-accounts` | Get linked accounts |
| `GET /account/linked-accounts/{providerId}` | Build account linking URI |
| `DELETE /account/linked-accounts/{providerId}` | Delete the linked provider |
| `GET /account/groups` | Get groups that this user is a member of |
| `GET /account/organizations` | Get organizations |
