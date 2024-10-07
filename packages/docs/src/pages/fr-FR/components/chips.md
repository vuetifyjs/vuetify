---
meta:
  title: Chip component
  description: The chip component allows a user to enter information, make selections, filter content or trigger actions.
  keywords: chips, vuetify chip component, vue chip component
related:
  - /components/avatars/
  - /components/icons/
  - /components/selects/
---

# Puces

Le composant `v-chip` est utilisé pour transmettre de petits éléments d'information. En utilisant la propriété `close` , la puce devient interactive, permettant l'interaction de l'utilisateur. Ce composant est utilisé par [v-chip-group](/components/chip-groups) pour des seléctions d'options avancées.

<entry-ad />

## Utilisation

Chips come in the following variations: closeable, filter, outlined, pill. The default slot of `v-chip` will also accept avatars and icons alongside text.

<usage name="v-chip" />

## API

- [v-chip](/api/v-chip)

<inline-api page="components/chips" />

## Exemples

### Propriétés

#### Closable

Closable chips can be controlled with a v-model. You can also listen to the `click:close` event if you want to know when a chip has been closed."

<example file="v-chip/prop-closable" />

#### Colored

Toute couleur de la palette Material Design peut être utilisée pour changer une couleur de puce.

<example file="v-chip/prop-colored" />

#### Draggable

`draggable` `v-chip` component can be dragged by mouse.

<example file="v-chip/prop-draggable" />

#### Filter

`v-chip` component has `filter` option which shows an additional icon to you if chip is active. It can be customized using `filter-icon`.

<example file="v-chip/prop-filter" />

#### Label

Label chips use the `v-card` border-radius.

<example file="v-chip/prop-label" />

#### No ripple

`v-chip` can be rendered without ripple if `ripple` prop is set to `false`.

<example file="v-chip/prop-no-ripple" />

#### Contour

Les puces hors ligne héritent de leur couleur de bordure de la couleur actuelle du texte.

<example file="v-chip/prop-outlined" />

#### Sizes

`v-chip` component can have various sizes from `x-small` to `x-large`.

<example file="v-chip/prop-sizes" />

### Events

#### Action chips

Chips can be used as actionable items. Provided with a _click_ event, the chip becomes interactive and can invoke methods.

<example file="v-chip/event-action-chips" />

### Slots

#### Icônes

Les puces peuvent utiliser du texte ou toute icône disponible dans la bibliothèque de polices d'icônes Material.

<example file="v-chip/slot-icon" />

### Divers

#### Custom list

In this example we opt to use a customized list instead of [v-autocomplete](/components/autocompletes). This allows us to always display the options available while still providing the same functionality of search and selection.

<example file="v-chip/misc-custom-list" />

#### Expandable

Chips can be combined with `v-menu` to enable a specific set of actions for a chip.

<example file="v-chip/misc-expandable" />

#### Filtering

Chips are great for providing supplementary actions to a particular task. In this instance, we are searching a list of items and collecting a subset of information to display available keywords.

<example file="v-chip/misc-filtering" />

#### In selects

Selects can use chips to display the selected data. Try adding your own tags below.

<example file="v-chip/misc-in-selects" />

<backmatter />
