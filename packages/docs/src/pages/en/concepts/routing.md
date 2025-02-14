---
meta:
  nav: Routing
  title: Routing
  description: Routing
  keywords: routing
related:
  - /components/buttons/
  - /components/lists/
  - /components/overlays/
---

# Routing

- `to` renders a `<router-link>` (internal link)
  - supports most router-link props like `replace`
  - brings back `exact` from vue-router v3

- `href` renders a `<a>` (external link)
  - `target="_blank"` to open in a new tab

Overlay components can be closed with the browser back button, but this also triggers when calling `router.back()`. Use `:close-on-back="false"` to disable this behavior.
