---
nav: Checkboxes
meta:
  title: Checkbox component
  description: The checkbox component permits users to select between two values.
  keywords: checkbox, checkbox component, vuetify checkbox component, vue checkbox component
related:
  - /components/switches
  - /components/forms
  - /components/text-fields
---

# Checkboxes

The `v-checkbox` component provides users the ability to choose between two distinct values. These are very similar to a switch and can be used in complex forms and checklists. A simpler version, `v-simple-checkbox` is used primarily as a lightweight alternative in data-table components to select rows or display inline boolean data.

<!-- ![checkbox Entry](https://cdn.vuetifyjs.com/docs/images/components-temp/v-checkbox/v-checkbox-entry.png) -->

---

## Usage

A `v-checkbox` in its simplest form provides a toggle between 2 values.

<usage name="v-checkbox" />

<entry />

## API

| Component | Description |
| - | - |
| [v-checkbox](/api/v-checkbox/) | Primary component |

<api-inline hide-links />

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

If you need to place checkboxes in line with other components, you can use the `v-checkbox-btn` component.

This component renders just checkbox, without the trapping of a form input such as validation, a label, and messages.

<example file="v-checkbox/misc-inline-textfield" />
