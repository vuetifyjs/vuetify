---
meta:
  title: Radio button component
  description: A radio button allows the user to choose only one of a set of options using a radio group.
  keywords: radio groups, radio buttons, vuetify radio group component, vuetify radio component, vue radio component, vue radio group component
related:
  - /components/button-groups/
  - /components/forms/
  - /components/checkboxes/
---

# Radio buttons

The `v-radio` component is a simple radio button. When combined with  the `v-radio-group` component you can provide groupable functionality to allow users to select from a predefined set of options.

<entry-ad />

## Usage

Although `v-radio` can be used on its own, it is best used in conjunction with `v-radio-group`. Using the **v-model** on the `v-radio-group` you can access the value of the selected radio button inside the group.

<example file="v-radio-group/usage" />

## API

- [v-radio](/api/v-radio)
- [v-radio-group](/api/v-radio-group)

## Examples

### Props

#### Colors

Radios can be colored by using any of the builtin colors and contextual names using the **color** prop.

<example file="v-radio-group/prop-colors" />

#### Direction

Radio-groups can be presented either as a row or a column, using their respective props. The default is as a column.

<example file="v-radio-group/prop-direction" />

#### Mandatory

Radio-groups are by default mandatory. This can be changed with the **mandatory** prop.

<example file="v-radio-group/prop-mandatory" />

### Slots

#### Label

Radio Group labels can be defined in `label` slot - that will allow to use HTML content.

<example file="v-radio-group/slot-label" />

<backmatter />
