---
"cloudflare-api-js": patch
---

The K2 stream data operations now call the stream's own endpoint, `https://<streamId>.k2.cloudflarestorage.com`, as the spec declares for those paths, instead of `https://api.cloudflare.com/client/v4`, where they could not succeed. They take the stream ID as a required `streamId` path parameter: `postK2Produce`, `getK2Subscriptions`, `postK2Subscriptions`, `getK2SubscriptionsBySubscriptionId`, `deleteK2SubscriptionsBySubscriptionId`, `postK2SubscriptionsBySubscriptionIdConsume` and the batch `ack`, `extend` and `nack` calls.
