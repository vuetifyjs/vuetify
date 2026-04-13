---
emphasized: true
meta:
  nav: Heatmaps
  title: Heatmap component
  description: The heatmap component visualizes tabular data as a grid of colored cells.
  keywords: vuetify heatmap component, vue heatmap component, calendar heatmap, grid, chart
features:
  github: /labs/VHeatmap/
  label: 'C: VHeatmap'
  report: true
---

# Heatmap

The `v-heatmap` component visualizes tabular data as a grid of colored cells, with linear color scale or value ranges with distinct thresholds.

<PageFeatures />

::: warning

This feature requires [v4.1.0](/getting-started/release-notes/?version=v4.1.0)

:::

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VHeatmap } from 'vuetify/labs/VHeatmap'

export default createVuetify({
  components: {
    VHeatmap,
  },
})
```

## Usage

The `v-heatmap` takes an array of `items` and maps each one to a cell. Cell color is picked from the `thresholds` list based on the item's value.

<ExamplesUsage name="v-heatmap" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-heatmap](/api/v-heatmap/) | Primary Component |
| [v-heatmap-legend](/api/v-heatmap-legend/) | Sub-component used to render the threshold legend |

<ApiInline hide-links />

## Guide

`v-heatmap` is intentionally unopinionated about the shape of your data. You pass flat `items` plus accessors, and the component arranges them into rows, columns, and column groups.

Notable behaviors:

- rows and columns are  **derived from data** (by default) or **provided explicitly** via `rows`, `columns` props when you need a stable axis (e.g. always render all days of the week)
- makes calendar-like layouts easy to pull off
- fully customizable with slots for labels, legend and inner cell content
- `group-by` splits items into separate column groups (e.g. by month), each with its own header
- cell colors come from `thresholds` using linear gradient/scale or distinct color buckets
- when configured with color buckets the legend is clickable - allows to toggle a color toggles groups of cells on/off

### Props

#### Cell size

`cell-size` sets the width and height of every cell. Pass a single value for a square cell, or a `[width, height]` tuple for rectangular cells — useful when one axis carries finer granularity than the other.

<ExamplesExample file="v-heatmap/prop-cell-size" />

#### Thresholds and legend

The `legend` prop accepts `true` or an object like `{ labels: ['Low', 'High'], cellSize: 16 }` allowing you to replace the default labels and resize the legend cells independently from the grid.

<ExamplesExample file="v-heatmap/prop-thresholds" />

The `thresholds` prop drives both cell colors. It accept array (like in the example above) or a linear scale object `{ from, to }` making the cell interpolate colors between the two stops.

<ExamplesExample file="v-heatmap/prop-thresholds-linear" />

#### Grouping

Use `group-by` to split items into column groups - useful to present more complex data.

<ExamplesExample file="v-heatmap/prop-grouping" />

#### Explicit axes

Provide `rows` and `columns` to pin the grid shape regardless of the items passed in — empty slots render as blank cells.

<ExamplesExample file="v-heatmap/prop-axes" />

### Slots

#### Custom cell content

Use the `cell` slot to render custom content inside each cell (numbers, icons, tooltips).

<ExamplesExample file="v-heatmap/slot-cell" />

#### Custom legend

Use the `legend` slot to fully replace the default legend with your own UI while still allowing to `toggle` value buckets.

<ExamplesExample file="v-heatmap/slot-legend" />

### Examples

The following are a collection of examples that demonstrate more advanced capabilities of `v-heatmap`.

#### Calendar view

Combine `group-by` with inferred columns to render a multi-month calendar heatmap.

<ExamplesExample file="v-heatmap/misc-calendar" />
