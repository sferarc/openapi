# @sferadev/openapi-utils

## 0.0.2

### Patch Changes

- 0d36fae: Run the operation ID, path parameter and server transforms on HEAD operations that `cleanOperationIds` keeps, so a HEAD without an ID, with a GET's ID or with an undeclared path parameter still generates.
