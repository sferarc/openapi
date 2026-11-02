---
"netlify-api": minor
---

Add an `onResponse` call option that gets the status and headers of each response before its body is read, and export its `ResponseInfo` type. Netlify pages its lists with `page` and `per_page` and links the next page in the `Link` header, which a caller could not read before. An error thrown inside `onResponse` rejects the call as `onResponse threw on <METHOD> <path>` with the thrown value as its `cause`.
