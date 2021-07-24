---
meta:
  title: Hover component
  description: The hover component makes it easy respond when the user hover events by wrapping selectable content.
  keywords: hover, vuetify hover component, vue hover component
related:
  - /components/cards/
  - /components/images/
  - /components/tooltips/
---

# Hover

The `v-hover` component provides a simple interface for handling hover states for any component.

<entry-ad />

## Usage

The `v-hover` component is a wapper that should contain a default scoped slot. In order for `v-hover` to work properly, either control the **model-value** prop manually, or bind the **props** object from the scoped slot to the component inside the slot.

<usage name="v-hover" />

## API

- [v-hover](/api/v-hover)

## Examples

### Props

#### Disabled

The **disabled** prop disables the hover functionality.

<example file="v-hover/prop-disabled" />

#### Open and close delay

Delay `v-hover` events by using **open-delay** and **close-delay** props in combination or separately.

<example file="v-hover/prop-open-and-close-delay" />

### Misc

#### Hover list

`v-hover` can be used in combination with `v-for` to make a single item stand out when the user interacts with the list.

<example file="v-hover/misc-hover-list" />

#### Transition

Create highly customized components that respond to user interaction.

<example file="v-hover/misc-transition" />

<backmatter />
