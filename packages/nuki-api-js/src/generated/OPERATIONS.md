# Operations

Generated from the Nuki API 4.25.0 OpenAPI spec; do not edit. 104 operations. Call an operation as `client.api.<tag>.<operation>(params)`, or by its request as `client.request("<METHOD> <path>", params)`.

## account

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.account.getAccountsResource` | `GET /account` | Get an account |
| `client.api.account.postAccountsResource` | `POST /account` | Update an account |
| `client.api.account.deleteAccountsResource` | `DELETE /account` | Delete an account |
| `client.api.account.postAccountEmailChangeResource` | `POST /account/email/change` | Trigger the email change verification email |
| `client.api.account.postAccountEmailVerifyResource` | `POST /account/email/verify` | Trigger the email change verification email |
| `client.api.account.getAccountIntegrationsResource` | `GET /account/integration` | Get all integrations for this account |
| `client.api.account.deleteAccountIntegrationsResource` | `DELETE /account/integration` | Delete an integration |
| `client.api.account.postAccountOtpResource` | `POST /account/otp` | Enable one-time password for an account |
| `client.api.account.putAccountOtpResource` | `PUT /account/otp` | Create a one-time password secret |
| `client.api.account.deleteAccountOtpResource` | `DELETE /account/otp` | Disable one-time password for an account |
| `client.api.account.postAccountPasswordResetResource` | `POST /account/password/reset` | Reset account password |
| `client.api.account.getAccountSettingResource` | `GET /account/setting` | Get account setting |
| `client.api.account.putAccountSettingResource` | `PUT /account/setting` | Create or update account setting |
| `client.api.account.deleteAccountSettingResource` | `DELETE /account/setting` | Delete an account setting |
| `client.api.account.getAccountSubsResource` | `GET /account/sub` | Get a list of sub accounts |
| `client.api.account.putAccountSubsResource` | `PUT /account/sub` | Create a sub account |
| `client.api.account.getAccountSubResource` | `GET /account/sub/{accountId}` | Get a sub account |
| `client.api.account.postAccountSubResource` | `POST /account/sub/{accountId}` | Update a sub account |
| `client.api.account.deleteAccountSubResource` | `DELETE /account/sub/{accountId}` | Delete a sub account |

## accountuser

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.accountuser.getAccountUsersResource` | `GET /account/user` | Get a list of account users |
| `client.api.accountuser.putAccountUsersResource` | `PUT /account/user` | Create an account user |
| `client.api.accountuser.getAccountUserResource` | `GET /account/user/{accountUserId}` | Get an account user |
| `client.api.accountuser.postAccountUserResource` | `POST /account/user/{accountUserId}` | Update an account user |
| `client.api.accountuser.deleteAccountUserResource` | `DELETE /account/user/{accountUserId}` | Delete an account user asynchronously |

## address

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.address.getAddressesResource` | `GET /address` | Get a list of addresses |
| `client.api.address.putAddressesResource` | `PUT /address` | Create an address |
| `client.api.address.postAddressResource` | `POST /address/{addressId}` | Update an address |
| `client.api.address.deleteAddressResource` | `DELETE /address/{addressId}` | Delete an address |
| `client.api.address.getAddressUnitsResource` | `GET /address/{addressId}/unit` | Get a list of address units |
| `client.api.address.putAddressUnitsResource` | `PUT /address/{addressId}/unit` | Create an address unit |
| `client.api.address.deleteAddressUnitsResource` | `DELETE /address/{addressId}/unit` | Delete address units asynchronously |
| `client.api.address.deleteAddressUnitResource` | `DELETE /address/{addressId}/unit/{id}` | Delete an address unit |

## addresstoken

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.addresstoken.getAddressTokenResource` | `GET /address/token/{id}` | Get info about an address token |
| `client.api.addresstoken.getAddressTokenRedeemResource` | `GET /address/token/{id}/redeem` | Get a redeemed address token |
| `client.api.addresstoken.postAddressTokenRedeemResource` | `POST /address/token/{id}/redeem` | Redeem an address token |
| `client.api.addresstoken.getAddressTokensResource` | `GET /address/{addressId}/token` | Get a list of address tokens |

## addressreservation

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.addressreservation.getAddressReservationsResource` | `GET /address/{addressId}/reservation` | Get a list of address reservations |
| `client.api.addressreservation.postAddressReservationIssueResource` | `POST /address/{addressId}/reservation/{id}/issue` | Issues authorizations for an address reservation |
| `client.api.addressreservation.postAddressReservationRevokeResource` | `POST /address/{addressId}/reservation/{id}/revoke` | Revoke authorizations for an address reservation |
| `client.api.addressreservation.postReservationAccessTimesUpdateResource` | `POST /address/{addressId}/reservation/{id}/update/accesstimes` | Update access times of a reservation |

## advancedapi

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.advancedapi.getDecentralWebhooksResource` | `GET /api/decentralWebhook` | Get all registered decentral webhooks |
| `client.api.advancedapi.putDecentralWebhooksResource` | `PUT /api/decentralWebhook` | Create decentral webhook |
| `client.api.advancedapi.deleteDecentralWebhookResource` | `DELETE /api/decentralWebhook/{id}` | Unregister a decentral webhook |
| `client.api.advancedapi.getWebhookLogsResource` | `GET /api/key/{apiKeyId}/webhook/logs` | Get a list of webhook logs (descending) |
| `client.api.advancedapi.putSmartlockAuthsAdvancedResource` | `PUT /smartlock/auth/advanced` | Create smartlock authorizations asynchronously |
| `client.api.advancedapi.postSmartlockActionAdvancedResource` | `POST /smartlock/{smartlockId}/action/advanced` | Lock & unlock a smartlock with callback |
| `client.api.advancedapi.postSmartlockLockActionAdvancedResource` | `POST /smartlock/{smartlockId}/action/lock/advanced` | Lock a smartlock |
| `client.api.advancedapi.postSmartlockUnlockActionAdvancedResource` | `POST /smartlock/{smartlockId}/action/unlock/advanced` | Unlock a smartlock |

## apikey

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.apikey.getApiKeysResource` | `GET /api/key` | Get a list of API keys |
| `client.api.apikey.putApiKeysResource` | `PUT /api/key` | Create an API key |
| `client.api.apikey.postApiKeyResource` | `POST /api/key/{apiKeyId}` | Update an API key |
| `client.api.apikey.deleteApiKeyResource` | `DELETE /api/key/{apiKeyId}` | Delete an API key |
| `client.api.apikey.getApiKeyAdvancedResource` | `GET /api/key/{apiKeyId}/advanced` | Get an advanced API key |
| `client.api.apikey.postApiKeyAdvancedResource` | `POST /api/key/{apiKeyId}/advanced` | Update an advanced API key |
| `client.api.apikey.putApiKeyAdvancedResource` | `PUT /api/key/{apiKeyId}/advanced` | Create an advanced API key |
| `client.api.apikey.deleteApiKeyAdvancedResource` | `DELETE /api/key/{apiKeyId}/advanced` | Delete an advanced API key |
| `client.api.apikey.postApiKeyAdvancedReactivateResource` | `POST /api/key/{apiKeyId}/advanced/reactivate` | Reactivate a deactivated advanced webhook integration |
| `client.api.apikey.getApiKeyTokensResource` | `GET /api/key/{apiKeyId}/token` | Get a list of API key tokens |
| `client.api.apikey.putApiKeyTokensResource` | `PUT /api/key/{apiKeyId}/token` | Create an API key token |
| `client.api.apikey.postApiKeyTokenResource` | `POST /api/key/{apiKeyId}/token/{id}` | Update an API key token |
| `client.api.apikey.deleteApiKeyTokenResource` | `DELETE /api/key/{apiKeyId}/token/{id}` | Delete an API key token |

## smartlock

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.smartlock.postSmartlockBulkWebConfigResource` | `POST /bulk-web-config` | Update the web config for a group of smartlocks |
| `client.api.smartlock.getSmartlocksResource` | `GET /smartlock` | Get a list of smartlocks |
| `client.api.smartlock.getSmartlockResource` | `GET /smartlock/{smartlockId}` | Get a smartlock |
| `client.api.smartlock.postSmartlockResource` | `POST /smartlock/{smartlockId}` | Update a smartlock |
| `client.api.smartlock.deleteSmartlockResource` | `DELETE /smartlock/{smartlockId}` | Delete a smartlock |
| `client.api.smartlock.postSmartlockActionResource` | `POST /smartlock/{smartlockId}/action` | Lock & unlock a smartlock with options |
| `client.api.smartlock.postSmartlockLockActionResource` | `POST /smartlock/{smartlockId}/action/lock` | Lock a smartlock |
| `client.api.smartlock.postSmartlockUnlockActionResource` | `POST /smartlock/{smartlockId}/action/unlock` | Unlock a smartlock |
| `client.api.smartlock.postSmartlockAdminPinResource` | `POST /smartlock/{smartlockId}/admin/pin` | Update a smartlock admin PIN |
| `client.api.smartlock.postSmartlockAdvancedConfigResource` | `POST /smartlock/{smartlockId}/advanced/config` | Update a smartlock advanced config |
| `client.api.smartlock.postSmartlockOpenerAdvancedConfigResource` | `POST /smartlock/{smartlockId}/advanced/openerconfig` | Update an opener advanced config |
| `client.api.smartlock.postSmartdoorAdvancedConfigResource` | `POST /smartlock/{smartlockId}/advanced/smartdoorconfig` | Update a smartdoor advanced config |
| `client.api.smartlock.postSmartlockConfigResource` | `POST /smartlock/{smartlockId}/config` | Update a smartlock config |
| `client.api.smartlock.postSmartlockSyncResource` | `POST /smartlock/{smartlockId}/sync` | Sync a smartlock |
| `client.api.smartlock.postSmartlockWebConfigResource` | `POST /smartlock/{smartlockId}/web/config` | Update a smartlock web config |

## company

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.company.getCompaniesResource` | `GET /company` | Get a list of companies |

## notification

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.notification.getNotificationsResource` | `GET /notification` | Get all notifications attached to your account |
| `client.api.notification.putNotificationsResource` | `PUT /notification` | Create a notification configuration |
| `client.api.notification.getNotificationResource` | `GET /notification/{notificationId}` | Get a notification configuration |
| `client.api.notification.postNotificationResource` | `POST /notification/{notificationId}` | Update a notification configuration |
| `client.api.notification.deleteNotificationResource` | `DELETE /notification/{notificationId}` | Delete a notification configuration |

## opener

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.opener.getOpenerBrandsResource` | `GET /opener/brand` | Get all intercom brands |
| `client.api.opener.getOpenerBrandResource` | `GET /opener/brand/{brandId}` | Get an intercom brand |
| `client.api.opener.getOpenerIntercomsResource` | `GET /opener/intercom` | Get a list of intercom models |
| `client.api.opener.getOpenerIntercomResource` | `GET /opener/intercom/{intercomId}` | Get an intercom model |

## service

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.service.getServicesResource` | `GET /service` | Get a list of services |
| `client.api.service.getServiceResource` | `GET /service/{serviceId}` | Get a service |
| `client.api.service.postServiceLinkResource` | `POST /service/{serviceId}/link` | Link a service |
| `client.api.service.postServiceSyncResource` | `POST /service/{serviceId}/sync` | Sync a service |
| `client.api.service.postServiceUnlinkResource` | `POST /service/{serviceId}/unlink` | Unlink a service |

## smartlockauth

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.smartlockauth.getSmartlocksAuthsResource` | `GET /smartlock/auth` | Get a list of smartlock authorizations for your smartlocks |
| `client.api.smartlockauth.postSmartlocksAuthsResource` | `POST /smartlock/auth` | Update smartlock authorizations asynchronously |
| `client.api.smartlockauth.putSmartlocksAuthsResource` | `PUT /smartlock/auth` | Create smartlock authorizations asynchronously |
| `client.api.smartlockauth.deleteSmartlocksAuthsResource` | `DELETE /smartlock/auth` | Delete smartlock authorizations asynchronously |
| `client.api.smartlockauth.getSmartlocksAuthsPaginatedResource` | `GET /smartlock/auth/paged` | Get a paginated list of smartlock authorizations for your smartlocks |
| `client.api.smartlockauth.getSmartlockAuthsResource` | `GET /smartlock/{smartlockId}/auth` | Get a list of smartlock authorizations |
| `client.api.smartlockauth.putSmartlockAuthsResource` | `PUT /smartlock/{smartlockId}/auth` | Create a smartlock authorization asynchronously |
| `client.api.smartlockauth.postSmartlockAuthWithSharedKeyResource` | `POST /smartlock/{smartlockId}/auth/advanced/sharedkey` | Generate a new smartlock auth with a shared key |
| `client.api.smartlockauth.getSmartlockAuthResource` | `GET /smartlock/{smartlockId}/auth/{id}` | Get a smartlock authorization |
| `client.api.smartlockauth.postSmartlockAuthResource` | `POST /smartlock/{smartlockId}/auth/{id}` | Update a smartlock authorization asynchronously |
| `client.api.smartlockauth.deleteSmartlockAuthResource` | `DELETE /smartlock/{smartlockId}/auth/{id}` | Delete a smartlock authorization asynchronously |

## smartlocklog

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.smartlocklog.getSmartlocksLogsResource` | `GET /smartlock/log` | Get a list of smartlock logs for all of your smartlocks |
| `client.api.smartlocklog.getSmartlockLogsResource` | `GET /smartlock/{smartlockId}/log` | Get a list of smartlock logs |
