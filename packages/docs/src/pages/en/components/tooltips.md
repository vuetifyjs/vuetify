---
meta:
  title: Tooltip component
  description: The tooltip component displays textual information regarding the element it is attached to.
  keywords: tooltips, vuetify tooltip component, vue tooltip component
related:
  - /components/badges/
  - /components/icons/
  - /components/menus/
---

# Tooltips

The `v-tooltip` component is useful for conveying information when a user hovers over an element. You can also programmatically control the display of tooltips through a `v-model`. When activated, tooltips display a text label identifying an element, such as a description of its function.

<entry-ad />

## Usage

Tooltips can wrap any element.

<example file="v-tooltip/usage" />

## API

- [v-tooltip](/api/v-tooltip)

## Caveats

<alert type="info">

  In order for `v-tooltip` to be positioned correctly a position prop ( `top` | `bottom` | `left` | `right` ) is required

</alert>

## Examples

### Props

#### Alignment

A tooltip can be aligned to any of the four sides of the activator element.

<example file="v-tooltip/prop-alignment" />

#### Visibility

Tooltip visibility can be programmatically changed using `v-model`.

<example file="v-tooltip/prop-visibility" />

<backmatter />
