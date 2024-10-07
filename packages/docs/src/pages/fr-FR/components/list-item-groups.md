---
meta:
  title: List item group component
  description: The list item group component provides an interface for displaying a series of content using list items.
  keywords: list-groups, vuetify list item group component, vue list item group component
related:
  - /components/lists/
  - /components/item-groups/
  - /components/cards/
---

# Liste des groupes d'items

The `v-list-item-group` provides the ability to create a group of selectable `v-list-item`s. The `v-list-item-group` component utilizes [v-item-group](/components/item-groups) at its core to provide a clean interface for interactive lists.

<entry-ad />

## Utilisation

By default, the `v-list-item-group` operates similarly to `v-item-group`. If a **value** is not provided, the group will provide a default based upon its index.

<example file="v-list-item-group/usage" />

## API

- [v-list-group](/api/v-list-group)
- [v-list-item](/api/v-list-item)
- [v-list-item-action](/api/v-list-item-action)
- [v-list-item-action-text](/api/v-list-item-action-text)
- [v-list-item-avatar](/api/v-list-item-avatar)
- [v-list-item-content](/api/v-list-item-content)
- [v-list-item-group](/api/v-list-item-group)
- [v-list-item-subtitle](/api/v-list-item-subtitle)
- [v-list-item-title](/api/v-list-item-title)

<inline-api page="components/list-item-groups" />

## Exemples

### Propriétés

#### Active class

Vous pouvez définir une classe qui sera ajoutée lorsqu'un élément est sélectionné.

<example file="v-list-item-group/prop-active-class" />

#### Mandatory

Au moins un élément doit être sélectionné.

<example file="v-list-item-group/prop-mandatory" />

#### Multiple

Vous pouvez sélectionner plusieurs éléments à la fois.

<example file="v-list-item-group/prop-multiple" />

### Divers

#### Flat list

You can easily disable the default highlighting of selected `v-list-item`s. This creates a lower profile for a user's choices.

<example file="v-list-item-group/misc-flat-list" />

#### Commandes de sélection

Using the default slot, you can access an items internal state and toggle it. Since the **active** property is a _boolean_, we use the **true-value** prop on the checkbox to link its state to the `v-list-item`.

<example file="v-list-item-group/misc-selection-controls" />

<backmatter />
