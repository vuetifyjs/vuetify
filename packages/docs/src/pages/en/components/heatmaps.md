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

The `v-heatmap` component visualizes tabular data as a grid of colored cells, with value ranges driven by a configurable list of thresholds.

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

The `v-heatmap` takes an array of `items` and maps each one to a cell using the `item-row`, `item-column` and `item-value` accessors. Cell color is picked from the `thresholds` list based on the item's value.

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

- Rows and columns can be **derived from data** (insertion order) or **provided explicitly** via `rows` / `columns` when you need a stable axis (e.g. always render all days of the week).
- When items don't resolve an `item-column` value, columns are **inferred**: a new column starts whenever the row index wraps back. This makes calendar-like layouts trivial — no need to fabricate a column key per item.
- When `item-column` *does* resolve, per-column headers render above the grid. Override their content with the `column-header` slot, or suppress them with `hide-column-headers`.
- `group-by` splits items into separate column groups (e.g. by month), each with its own header.
- Cell colors come from `thresholds` using **find-last** semantics — the last matching threshold wins.
- The legend at the bottom is clickable: clicking a color toggles visibility of all cells with that color.

### Props

#### Cell size

`cell-size` sets the width and height of every cell. Pass a single value for a square cell, or a `[width, height]` tuple for rectangular cells — useful when one axis carries finer granularity than the other.

<ExamplesExample file="v-heatmap/prop-cell-size" />

#### Thresholds and legend

The `thresholds` prop drives both cell colors and the legend. Pass `:legend="false"` to drop the legend entirely, or an object like `:legend="{ labels: ['Low', 'High'], cellSize: 16 }"` to replace the default 'Less' / 'More' text (pass empty strings to hide individual labels) or resize the legend cells independently from the grid.

<ExamplesExample file="v-heatmap/prop-thresholds" />

Alternatively, pass a linear scale object — `{ from: { min, color }, to: { min, color } }` — and cell colors are interpolated between the two stops with `color-mix`. Values outside `[from.min, to.min]` clamp to the nearest stop, and the legend renders as a gradient bar.

<ExamplesExample file="v-heatmap/prop-thresholds-linear" />

#### Grouping

`group-by` splits items into column groups, each rendered with its own header. Combined with inferred columns this produces a GitHub-style calendar view.

<ExamplesExample file="v-heatmap/prop-grouping" />

#### Explicit axes

Provide `rows` and `columns` to pin the grid shape regardless of the items passed in — empty slots render as blank cells. When `item-column` resolves a value, the component automatically renders a column-header strip above the grid; customise it with the `column-header` slot.

<ExamplesExample file="v-heatmap/prop-axes" />

### Slots

#### Custom cell content

Use the `cell` slot to render custom content inside each cell (numbers, icons, tooltips).

<ExamplesExample file="v-heatmap/slot-cell" />

#### Custom legend

Use the `legend` slot to fully replace the default legend with your own UI while still receiving the `toggle` helper and disabled-color state.

<ExamplesExample file="v-heatmap/slot-legend" />

### Examples

The following are a collection of examples that demonstrate more advanced capabilities of `v-heatmap`.

#### Calendar view

Combine `group-by` with inferred columns to render a multi-month calendar heatmap.

<ExamplesExample file="v-heatmap/misc-calendar" />
