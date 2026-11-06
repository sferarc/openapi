---
"litellm-api": minor
---

Add an `eventStream: "stream"` call option that resolves a Server-Sent Events response (`text/event-stream`), such as a chat completion sent with `stream: true`, to an async iterable of its events as they arrive, and export `isEventStream` and the `ServerSentEvent` type. Before this, the body was always read whole, so nothing reached the caller until the generation ended. Without the option such a response still resolves to its raw text.
