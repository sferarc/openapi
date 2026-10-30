---
"zoom-api-js": patch
---

Encode a meeting or webinar UUID that begins with `/` or contains `//` twice in the request path, as the Zoom API documentation requires; it was encoded once, so a UUID passed as Zoom returns it had to be encoded by hand first. A UUID already encoded by hand is still sent as it was.
