---
meta:
  nav: Switches
  title: Switch component
  description: The switch component is a simple and eloquent toggle used to select between two values.
  keywords: switch, switch component, vuetify switch component, vue switch component
related:
  - /components/checkboxes/
  - /components/forms/
  - /components/radio-buttons/
features:
  label: 'C: VSwitch'
  report: true
  github: /components/VSwitch/
  spec: https://m2.material.io/components/switches
---

# Switches

The `v-switch` component provides users the ability to choose between two distinct values. These are very similar to a toggle, or on/off switch, though aesthetically different than a checkbox.

<PageFeatures />

## Usage

A `v-switch` in its simplest form provides a toggle between 2 values.

<ExamplesUsage name="v-switch" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-switch](/api/v-switch/) | Primary Component |

<ApiInline hide-links />

## Examples

### Props

#### Colors

Switches can be colored by using any of the builtin colors and contextual names using the **color** prop.

<ExamplesExample file="v-switch/prop-colors" />

<!-- #### Flat

You can make switch render without elevation of thumb using **flat** property.

<ExamplesExample file="v-switch/prop-flat" /> -->

#### Inset

You can make switch render in inset mode.

<ExamplesExample file="v-switch/prop-inset" />

#### Model as array

Multiple `v-switch`'s can share the same **v-model** by using an array.

<ExamplesExample file="v-switch/prop-model-as-array" />

#### Custom true/false values

The switch can use custom values for its v-model, using the props **true-value** and **false-value**.

<ExamplesExample file="v-switch/prop-custom-values" />

#### States

`v-switch` can have different states such as **default**, **disabled**, and **loading**.

<ExamplesExample file="v-switch/prop-states" />

### Slots

#### Label

If you need to render a switch label with more complex markup than plain text, you can use the **label** slot.

<ExamplesExample file="v-switch/slot-label" />
