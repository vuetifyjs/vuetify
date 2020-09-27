---
meta:
  title: Sparkline component
  description: The sparkline component creates beautiful and expressive simple graphs for displaying numerical data.
  keywords: sparklines, vuetify sparkline component, vue sparkline component, sparkline, graph, chart, line
related:
  - /components/cards/
  - /components/sheets/
  - /components/expansion-panels/
---

# Sparklines

The sparkline component can be used to create simple graphs, like GitHub's contribution chart.

Any [SVG attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute) may be used in addition to the ones listed below.

<entry-ad />

## Usage

A sparkline is a tiny chart that provides a visual representation of data. The sparkline component comes in 2 variations, **trend**(default) and **bar**. Each support a multitude of options for customizing the look and feel of the sparkline.

<example file="v-sparkline/usage" />

## API

- [v-sparkline](/api/v-sparkline)

## Examples

### Props

#### Fill

You can create a `v-sparkline` with fill using the `fill` property.

<example file="v-sparkline/prop-fill" />

### Misc

#### Custom labels

By providing a **label** slot, we are able to modify the displayed content adding a dollar sign ($). This slot is **_exclusively_** for text content. For more information on the svg `<text>` element, [navigate here](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text).

<example file="v-sparkline/misc-custom-labels" />

#### Dashboard card

The `v-sparkline` component pairs nicely with `v-card` and `v-sheet` to create customized information cards, perfect for admin dashboards. Here we use custom labels to provide additional context for the sparkline.

<example file="v-sparkline/misc-dashboard-card" />

#### Heart rate

For concise information, a complete chart might be overkill. Using a trend line with gradient provides enough detail for the user without showing too much information.

<example file="v-sparkline/misc-heart-rate" />

<backmatter />
