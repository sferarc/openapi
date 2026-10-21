---
"litellm-api": major
---

The client now targets the self-hosted LiteLLM proxy API, generated from `docs.litellm.ai/openapi.json`, instead of LiteLLM's hosted billing and model catalog API at `api.litellm.ai`, which no longer resolves.

Breaking: the hosted API's operations are removed, together with their types and schemas: `createCheckoutBillingCheckoutPost`, `checkUsageBillingUsageGet`, `listModelCatalogModelCatalogGet` and `getModelCatalogEntryModelCatalogModelIdGet`, and `CheckoutResponse`, `FreeTierResponse`, `ModelCatalogEntry` and `ModelCatalogListResponse`. Call the hosted API directly if you still need them.
