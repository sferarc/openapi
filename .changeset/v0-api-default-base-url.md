---
"v0-api": patch
---

Send requests to `https://api.v0.dev/v1` when no `baseUrl` is configured. Since the move to kubb the generated operations carry only the path and the fetcher defaulted to an empty base URL, so `new V0Api({ token }).api.chats.chatsFind()` fetched the relative URL `/chats`, which Node's `fetch` rejects as an invalid URL and a browser sends to the page's own origin. The Effect bindings had the same problem unless the layer set `baseUrl`.
