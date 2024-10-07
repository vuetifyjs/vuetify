---
meta:
  title: Item group component
  description: The item group components provides the ability to create a group of selectable items out of any component.
  keywords: item groups, vuetify item group component, vue item group component
related:
  - /components/button-groups/
  - /components/carousels/
  - /components/tabs/
---

# Groupes d'objets

The `v-item-group` provides the ability to create a group of selectable items out of any component. This is the baseline functionality for components such as `v-tabs` and `v-carousel`.

<entry-ad />

## Utilisation

The core usage of the `v-item-group` is to create groups of anything that should be controlled by a **model**.

<example file="v-item-group/usage" />

## API

- [v-item](/api/v-item)
- [v-item-group](/api/v-item-group)

<inline-api page="components/item-groups" />


<!-- ## Sub-components

### v-item

v-item description -->

## Exemples

### Propriétés

#### Active class

The **active-class** property allows you to set custom CSS class on active items.

<example file="v-item-group/prop-active-class" />

#### Mandatory

**mandatory** item groups must have at least 1 item selected.

<example file="v-item-group/prop-mandatory" />

#### Multiple

Item groups can have **multiple** items selected.

<example file="v-item-group/prop-multiple" />

### Divers

#### Puces

Branchez facilement un groupe de puces sur mesure.

<example file="v-item-group/misc-chips" />

#### Selection

Les icônes peuvent être utilisées comme boutons de basculement lorsqu'elles permettent la sélection ou la désélection d'un seul choix, comme le marquage d'un élément comme un favori.

<example file="v-item-group/misc-selection" />

<backmatter />
