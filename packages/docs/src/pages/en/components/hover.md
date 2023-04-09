---
nav: Hover
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

## Usage

 `v-hover` is a renderless component that uses the default slot to provide scoped access to its internal model; as well as mouse event listeners to modify it. To explicitly control the internal state, use the **model-value** property.

<usage name="v-hover" />

<entry />

## API

| Component | Description |
| - | - |
| [v-hover](/api/v-hover/) | Primary Component |

<api-inline hide-links />

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
