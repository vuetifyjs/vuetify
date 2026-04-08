---
emphasized: true
meta:
  nav: Upgrade guide
  title: Upgrade guide
  description: Detailed instructions on how to upgrade Vuetify from v4 to v5
  keywords: migration, upgrade, releases, upgrading vuetify, v5
related:
  - /introduction/roadmap/
  - /introduction/long-term-support/
  - /introduction/enterprise-support/
---

# Upgrade Guide

This page contains a detailed list of breaking changes and the steps required to upgrade your application from Vuetify 4 to Vuetify 5.

<PageFeatures />

## `useDisplay`

- Returned Refs are now readonly.
- Breakpoints are matched with `window.matchMedia` instead of `window.innerWidth`. This may result in slightly different values at zoom levels other than 100%.
