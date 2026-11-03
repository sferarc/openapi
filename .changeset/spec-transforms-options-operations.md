---
"@sferadev/openapi-utils": patch
---

Run the operation ID, path parameter and server transforms on OPTIONS operations too, so an OPTIONS without an ID, with another method's ID or with an undeclared path parameter still generates.
