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

The `v-hover` component provides a clean interface for handling hover states for any component.

<entry-ad />

## Usage

The `v-hover` component is a wrapper that should contain only one child element, and can trigger an event when hovered over. In order for `v-hover` to work properly, either the **value** prop should be set to `true` or the wrapped element should contain `slot-scope="{ wrapper }"`.

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
