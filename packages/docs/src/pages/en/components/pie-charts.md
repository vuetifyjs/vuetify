---
emphasized: true
meta:
  nav: Pie charts
  title: Pie chart component
  description: The pie/donut chart component is versatile and fully customizable.
  keywords: vuetify pie component, vue pie component, chart, pie, donut
features:
  github: /components/VPie/
  label: 'C: VPie'
  report: true
---

# Pie Chart

The `v-pie` component is design to display either pie or a donut chart with integrated tooltips and legend.

<PageFeatures />

::: warning

This feature requires [v3.8.0](/getting-started/release-notes/?version=v3.8.0)

:::

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VPie } from 'vuetify/labs/VPie'

export default createVuetify({
  components: {
    VPie,
  },
})
```

## Usage

<ExamplesUsage name="v-pie" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-pie](/api/v-pie/) | Primary Component |
| [v-pie-segment](/api/v-pie-segment/) | Sub-component used to display a single segment |
| [v-pie-tooltip](/api/v-pie-tooltip/) | Chart tooltip component based on `v-list-item` |

<ApiInline hide-links />

## Guide

`v-pie` does not have any opinionated way to use. You may start by providing an array of items (data) and then customize, hide or replace elements to make it behave as you wish to fit your project.

There are some notable features that are not common in other Vuetify components:

- `tooltip-[title/substitle]-format` props take a string with `[title]` or `[value]` macro. It accepts custom formatter function, should you need to transform the value (e.g. format with i18n)
- `animations` prop let you control duration and easing

### Props

The `v-pie` supports various stylistic props to customize the appearance and hover transitions.

#### Size

Charts are more like drawings then regular HTML elements and their size needs to be controlled externally. `hover-scale` will reserve some space to move segments on hover.

<ExamplesExample file="v-pie/prop-size" />

#### Width

With `width` prop you can make Pie into a nice looking Donut. By default semi-transparent inner-slice is visible, but you can hide it with `hide-slice`.

<ExamplesExample file="v-pie/prop-width" />

#### Rounded

Donut version supports rounded corners and will look best with a little padding

<ExamplesExample file="v-pie/prop-rounded" />

#### Rotate

The **rotate** prop is used to adjust the chart drawing to your project's conventions for data presentation

<ExamplesExample file="v-pie/prop-rotate" />

#### Legend position

The legend can be moved to any side or hidden entirely

<ExamplesExample file="v-pie/prop-legend-position" />

#### Item text overrides

Single item representation can be easily customized

<ExamplesExample file="v-pie/prop-formats" />

### Examples

The following are a collection of examples that demonstrate some more advanced capabilities of `v-pie` component.

#### Custom Legend

Legend does not need to be a list of chips. You can fully override it to match the expected design.

<ExamplesExample file="v-pie/misc-custom-legend" />

#### Overlay patterns

The following example demonstrates how to provide overlay patterns to support users with vision impairments.

<ExamplesExample file="v-pie/misc-patterns" />
