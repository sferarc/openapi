---
"clickhouse-cloud": patch
---

Show the API's own error message in the `effect` entry's errors. `ApiError.message` read only a top-level `message` on the rejection, which HTTP errors never have, so every failure read `API Error: <status>`. It now reads `API error <status>: <message>`, taking the message from the error body's `message`, `error`, `error.message` or `errors[0].message`, or the body itself when it is text, and keeps the old text when none is found. `NetworkError.message` also reads `message` from a cause that is not an `Error`. `status`, `error` and `cause` are unchanged.
