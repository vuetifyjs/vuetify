---
emphasized: true
meta:
  nav: Sparkline groups
  title: Sparkline group component
  description: The sparkline group component overlays multiple sparklines on a shared scale with axes and a combined tooltip.
  keywords: vuetify sparkline group component, vue chart component, line chart, axis, multiple series
related:
  - /components/sparklines/
  - /components/pie-charts/
features:
  github: /labs/VSparklineGroup/
  label: 'C: VSparklineGroup'
  report: true
---

# Sparkline groups

The `v-sparkline-group` component plots several `v-sparkline` components in one chart, sharing scale, axes and tooltip.

<PageFeatures />

::: warning

This feature requires [v4.3.0](/getting-started/release-notes/?version=v4.3.0)

:::

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VSparklineGroup } from 'vuetify/labs/VSparklineGroup'

export default createVuetify({
  components: {
    VSparklineGroup,
  },
})
```

## Usage

Place `v-sparkline` components inside `v-sparkline-group`. They are stacked on top of each other and stretched to the plot size.

<ExamplesUsage name="v-sparkline-group" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-sparkline-group](/api/v-sparkline-group/) | Primary Component |
| [v-sparkline](/api/v-sparkline/) | Sub-component used for each series |

<ApiInline hide-links />

## Guide

- sparklines share one vertical scale derived from their values, or pinned with `min` and `max` on the group
- a sparkline with its own `min` or `max` keeps an independent scale, e.g. volume bars under a price line
- a sparkline with its own `height` becomes a band at the bottom of the plot
- with `interactive`, the group draws one crosshair and every sparkline shows its marker at the hovered point; `tooltip` lists all values at once
