---
nav: Switches
meta:
  title: Switch component
  description: The switch component is a simple and eloquent toggle used to select between two values.
  keywords: switch, switch component, vuetify switch component, vue switch component
related:
  - /components/checkboxes/
  - /components/forms/
  - /components/radio-buttons/
---

# Switches

The `v-switch` component provides users the ability to choose between two distinct values. These are very similar to a toggle, or on/off switch, though aesthetically different than a checkbox.

## Usage

A `v-switch` in its simplest form provides a toggle between 2 values.

<usage name="v-switch" />

<entry />

## API

| Component | Description |
| - | - |
| [v-switch](/api/v-switch/) | Primary Component |

<api-inline hide-links />

## Examples

### Props

#### Colors

Switches can be colored by using any of the builtin colors and contextual names using the **color** prop.

<example file="v-switch/prop-colors" />

<!-- #### Flat

You can make switch render without elevation of thumb using **flat** property.

<example file="v-switch/prop-flat" /> -->

#### Inset

You can make switch render in inset mode.

<example file="v-switch/prop-inset" />

#### Model as array

Multiple `v-switch`'s can share the same **v-model** by using an array.

<example file="v-switch/prop-model-as-array" />

#### Custom true/false values

The switch can use custom values for its v-model, using the props **true-value** and **false-value**.

<example file="v-switch/prop-custom-values" />

#### States

`v-switch` can have different states such as **default**, **disabled**, and **loading**.

<example file="v-switch/prop-states" />

### Slots

#### Label

If you need to render a switch label with more complex markup than plain text, you can use the **label** slot.

<example file="v-switch/slot-label" />
