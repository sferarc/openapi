---
"litellm-api": patch
---

Send array and object fields of a multipart body instead of dropping them: an array is sent as one part per item and an object as a JSON part, and a bigint field as a string. Before this, the image edit operations sent no `image` or `mask`.
