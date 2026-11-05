# @sferadev/openapi-utils

## 0.1.0

### Minor Changes

- 8870d15: The Effect `makeApiLayer` takes `token` as a function, sync or async, asked for the current token before every call, so a refreshed token needs no new layer. What the function throws fails the effect like a failed request.

## 0.0.3

### Patch Changes

- 4108b72: Run the operation ID, path parameter and server transforms on OPTIONS operations too, so an OPTIONS without an ID, with another method's ID or with an undeclared path parameter still generates.

## 0.0.2

### Patch Changes

- 0d36fae: Run the operation ID, path parameter and server transforms on HEAD operations that `cleanOperationIds` keeps, so a HEAD without an ID, with a GET's ID or with an undeclared path parameter still generates.
