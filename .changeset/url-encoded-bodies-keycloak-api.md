---
"keycloak-api": minor
---

Add a `body` parameter to the operations that only take an `application/x-www-form-urlencoded` request body, sent as form fields. Before this, `pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUser` and `pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteExistingUser` could not send the `email`, `firstName`, `lastName` or `id` they need.
