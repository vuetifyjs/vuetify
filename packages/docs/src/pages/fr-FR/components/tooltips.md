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

# Info-bulles

The `v-tooltip` component is useful for conveying information when a user hovers over an element. You can also programmatically control the display of tooltips through a `v-model`. When activated, tooltips display a text label identifying an element, such as a description of its function.

<entry-ad />

## Utilisation

Les info-bulles peuvent envelopper n'importe quel élément.

<example file="v-tooltip/usage" />

## API

- [v-tooltip](/api/v-tooltip)

<inline-api page="components/tooltips" />

## Caveats

<alert type="info">

  Pour que `v-tooltip` soit positionné correctement un prop de position ( `top` | `bottom` | `left` | `right` ) est requis

</alert>

## Exemples

### Propriétés

#### Alignment

Une aide peut être alignée sur l'un des quatre côtés de l'élément activateur.

<example file="v-tooltip/prop-alignment" />

#### Color

Tooltip color can be set with the `color` prop.

<example file="v-tooltip/prop-color" />

#### Visibilité

Tooltip visibility can be programmatically changed using `v-model`.

<example file="v-tooltip/prop-visibility" />

<backmatter />
