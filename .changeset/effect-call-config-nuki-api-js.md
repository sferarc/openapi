---
"nuki-api-js": minor
---

Let `ApiService` and `effectByPath` calls pass their own `config`, typed like the operation's without `signal`, which layers over the `makeApiLayer` config: its `headers` join the layer's and its other fields replace them. Before, the Effect bindings dropped a call's `config`, so a per-call option such as `vercel-api-js`'s `onResponse` had no typed way in.
