---
emphasized: true
meta:
  nav: Morphing icons
  title: Morphing icon component
  description: The v-morphing-icon component provides smooth animated transitions between icons using blend-mode techniques.
  keywords: morphing icon, animated icon, icon transition, blend mode
related:
  - /components/icons/
  - /components/icon-buttons/
features:
  github: /labs/VMorphingIcon/
  label: 'C: VMorphingIcon'
  report: true
---

# Morphing Icons

The `v-morphing-icon` component provides smooth animated transitions between icons. It uses CSS blend modes and blur filters to create a fluid morphing effect when the icon changes.

<PageFeatures />

::: warning

This feature requires [v4.0.1](/getting-started/release-notes/?version=v4.0.1)

:::

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VMorphingIcon } from 'vuetify/labs/VMorphingIcon'

export default createVuetify({
  components: {
    VMorphingIcon,
  },
})
```

## Usage

<ExamplesUsage name="v-morphing-icon" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-morphing-icon](/api/v-morphing-icon/) | Primary Component |

<ApiInline hide-links />

## Guide

The `v-morphing-icon` component animates icon changes by using CSS blend modes and blur filters. The outgoing icon blurs and fades out while the incoming icon blurs in and sharpens — creating a fluid morphing effect.

### Props

#### Dark

The **dark** prop switches the blend-mode strategy for use on dark backgrounds. By default, the component auto-detects based on the current theme.

<ExamplesExample file="v-morphing-icon/prop-dark" />
