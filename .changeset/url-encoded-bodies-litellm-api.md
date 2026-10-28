---
"litellm-api": minor
---

Add a `body` parameter to the operations that only take an `application/x-www-form-urlencoded` request body, sent as form fields. Before this, the OAuth operations `tokenEndpointTokenPost`, `tokenEndpointMcpServerNameTokenPost`, `introspectEndpointIntrospectPost`, `revokeEndpointRevokePost` and `authorizeCompleteAuthorizeCompletePost` could not send their form fields, such as `grant_type` and `code`.
