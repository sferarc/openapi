---
"litellm-api": patch
---

Generate the operations of a route with several methods in a fixed order (GET, PUT, POST, PATCH, DELETE, HEAD, OPTIONS) instead of the order the LiteLLM spec lists them in, which changes between LiteLLM releases. No operation, name or type changes. The breaking entries in the previous release notes that say an operation such as `dynamicMcpRouteMcpServerNameMcpPatch` became another method were wrong: those operations only moved within the generated files.
