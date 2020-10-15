---
meta:
  title: Checkbox component
  description: The checkbox component permits users to select between two values.
  keywords: checkbox, checkbox component, vuetify checkbox component, vue checkbox component
related:
  - /components/switches/
  - /components/forms/
  - /components/text-fields/
---

# Checkboxes

The `v-checkbox` component provides users the ability to choose between two distinct values. These are very similar to a switch and can be used in complex forms and checklists. A simpler version, `v-simple-checkbox` is used primarily as a lightweight alternative in data-table components to select rows or display inline boolean data.
<entry-ad />

## Usage

A `v-checkbox` in its simplest form provides a toggle between 2 values.

<example file="v-checkbox/usage" />

## API

- [v-checkbox](/api/v-checkbox)
- [v-simple-checkbox](/api/v-simple-checkbox)

## Examples

### Props

#### Colors

Checkboxes can be colored by using any of the builtin colors and contextual names using the **color** prop.

<example file="v-checkbox/prop-colors" />

#### Model as array

Multiple `v-checkbox`'s can share the same **v-model** by using an array.

<example file="v-checkbox/prop-model-as-array" />

#### Model as boolean

A single `v-checkbox` will have a boolean value as its **value**.

<example file="v-checkbox/prop-model-as-boolean" />

#### States

`v-checkbox` can have different states such as **default**, **disabled**, and **indeterminate**.

<example file="v-checkbox/prop-states" />

### Slots

#### Label slot

Checkbox labels can be defined in `label` slot - that will allow to use HTML content.

<example file="v-checkbox/slot-label" />

### Misc

#### Inline text-field

You can place `v-checkbox` in line with other components such as `v-text-field`.

<example file="v-checkbox/misc-inline-textfield" />

<backmatter />
