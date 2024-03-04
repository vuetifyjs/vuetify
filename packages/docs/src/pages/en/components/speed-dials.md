---
emphasized: true
meta:
  nav: Speed Dials
  title: Speed Dial component
  description: The speed dial component is a floating action button that can reveal additional actions when clicked.
  keywords: speed dial, fab, vuetify speed dial component, vue speed dial component
related:
  - /components/buttons/
  - /components/icons/
  - /styles/transitions/
features:
  report: true
---

# Speed Dials

The `v-speed-dial` component can be used as a floating action button that can reveal additional actions when clicked.

<PageFeatures />

::: warning

This feature requires [v3.5.8](/getting-started/release-notes/?version=v3.5.8)

:::

## Installation

Labs components require a manual import and installation of the component.

```js { resource="src/plugins/vuetify.js" }
import { VSpeedDial } from 'vuetify/labs/VSpeedDial'

export default createVuetify({
  components: {
    VSpeedDial,
  },
})
```

## Usage

Speed dials can be attached to material to signify a promoted action in your application. The default size will be used in most cases, whereas the `small` variant can be used to maintain continuity with similar sized elements.

<ExamplesUsage name="v-speed-dial" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-speed-dial](/api/v-speed-dial/) | Primary Component |

<ApiInline hide-links />

### Guide

Coming soon.
