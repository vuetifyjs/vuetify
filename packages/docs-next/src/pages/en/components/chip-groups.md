---
meta:
  title: Chip group component
  description: The chip group component combines numerous selectable chips into single or multiple lines.
  keywords: chip groups, vuetify chip group component, vue chip group component
related:
  - /components/chips/
  - /components/slide-groups/
  - /components/item-groups/
---

# Chip groups

The `v-chip-group` supercharges the `v-chip` component by providing groupable functionality. It is used for creating groups of selections using chips.

<entry-ad />

## Usage

Chip groups make it easy for users to select filtering options for more complex implementations. By default `v-chip-group` will overflow to the right but can be changed to a **column** only mode.

<usage name="v-chip-group" />

## API

- [v-chip-group](/api/v-chip-group)
- [v-chip](/api/v-chip)

## Examples

### Props

#### Column

Chip groups with **column** prop can wrap their chips.

<example file="v-chip-group/prop-column" />

#### Filter results

Easily create chip groups that provide additional feedback with the **filter** prop. This creates an alternative visual style that communicates to the user that the chip is selected.

<example file="v-chip-group/prop-filter" />

#### Mandatory

Chip groups with **mandatory** prop must always have a value selected.

<example file="v-chip-group/prop-mandatory" />

#### Multiple

Chip groups with **multiple** prop can have many values selected.

<example file="v-chip-group/prop-multiple" />

### Misc

#### Product card

The `v-chip` component can have an explicit value used for its model. This gets passed to the `v-chip-group` component and is useful for when you don't want to use the chips index as their values.

<example file="v-chip-group/misc-product-card" />

#### Toothbrush card

Chip groups allow the creation of custom interfaces that perform the same actions as an item group or radio controls, but are stylistically different.

<example file="v-chip-group/misc-toothbrush-card" />

<backmatter />
