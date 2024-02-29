---
emphasized: true
meta:
  title: Sparklines
  description: The sparkline component creates beautiful and expressive simple graphs for displaying numerical data.
  keywords: sparklines, vuetify sparkline component, vue sparkline component, sparkline, graph, chart, line
related:
  - /components/cards/
  - /components/sheets/
  - /components/expansion-panels/
---

# Sparklines

The sparkline component can be used to create simple graphs, like GitHub's contribution chart.

<PromotedEntry />

::: warning

This feature requires [v3.5.5](/getting-started/release-notes/?version=v3.5.5)

:::

## Installation

Labs components require a manual import and installation of the component.

```js { resource="src/plugins/vuetify.js" }
import { VSparkline } from 'vuetify/labs/VSparkline'

export default createVuetify({
  components: {
    VSparkline,
  },
})
```

## Usage

A sparkline is a tiny chart that provides a visual representation of data. The sparkline component comes in 2 variations, **trend** (default) and **bar**. Each supports a multitude of options for customizing the look and feel of the sparkline.

<ExamplesExample file="v-sparkline/usage" />

## API

| Component | Description |
| - | - |
| [v-sparkline](/api/v-sparkline/) | Primary Component |

<ApiInline hide-links />

## Examples

### Props

#### Fill

You can create a `v-sparkline` with fill using the `fill` property.

<ExamplesExample file="v-sparkline/prop-fill" />

### Misc

#### Custom labels

By providing a **label** slot, we are able to modify the displayed content by adding a dollar sign ($). This slot is **_exclusively_** for text content. For more information on the svg `<text>` element, [navigate here](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text).

<ExamplesExample file="v-sparkline/misc-custom-labels" />

#### Dashboard card

The `v-sparkline` component pairs nicely with `v-card` and `v-sheet` to create customized information cards, perfect for admin dashboards. Here we use custom labels to provide additional context for the sparkline.

<ExamplesExample file="v-sparkline/misc-dashboard-card" />

#### Heart rate

For concise information, a complete chart might be overkill. Using a trend line with gradient provides enough detail for the user without showing too much information.

<ExamplesExample file="v-sparkline/misc-heart-rate" />
