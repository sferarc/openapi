---
"clickhouse-cloud": patch
---

Abort the HTTP request when an operation from the `effect` entry is interrupted, for example by `Effect.timeout` or `Fiber.interrupt`. The request used to keep running after the effect gave up on it. `makeApiLayer` now also accepts `fetchImpl`, and `ApiService` and `effectByPath` return `undefined` for `Object.prototype` keys such as `constructor` instead of a broken operation.
