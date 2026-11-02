---
"keycloak-api": minor
---

Add an `onResponse` call option that gets the status and headers of each response before its body is read, and export its `ResponseInfo` type. Keycloak answers a create call, such as `POST /admin/realms/{realm}/users`, with `201` and an empty body, and puts the new resource's id only in the `Location` header, which a caller could not read before. An error thrown inside `onResponse` rejects the call as `onResponse threw on <METHOD> <path>` with the thrown value as its `cause`.
