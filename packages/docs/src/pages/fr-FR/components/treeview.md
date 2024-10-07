---
meta:
  title: Treeview component
  description: The treeview component is a user interface that is used to represent hierarchical data in a tree structure.
  keywords: treeview, vuetify treeview component, vue treeview component
related:
  - /components/lists/
  - /components/list-item-groups/
  - /components/timelines/
---

# Arborescence

The `v-treeview` component is useful for displaying large amounts of nested data.

<entry-ad />

## Utilisation

Un exemple simple

<example file="v-treeview/usage" />

## API

- [v-treeview](/api/v-treeview)

<inline-api page="components/treeview" />

## Exemples

### Propriétés

#### Activatable

Les nœuds d'aperçu peuvent être activés en cliquant dessus.

<example file="v-treeview/prop-activatable" />

#### Color

Vous pouvez contrôler la couleur du texte et de l'arrière-plan du nœud d'exclusion active.

<example file="v-treeview/prop-color" />

#### Dense mode

Le mode 'dense' offre une mise en page plus compacte avec une diminution des hauteurs des objets.

<example file="v-treeview/prop-dense" />

#### Hoverable

Les nœuds de l'arbre peuvent avoir un effet de survol.

<example file="v-treeview/prop-hoverable" />

#### Item disabled

Setting **item-disabled** prop allows to control which node's property disables the node when set to `true`.

<example file="v-treeview/prop-item-disabled" />

#### Load children

You can dynamically load child data by supplying a _Promise_ callback to the **load-children** prop. This callback will be executed the first time a user tries to expand an item that has a children property that is an empty array.

<example file="v-treeview/prop-load-children" />

#### Open all

Les noeuds d'aperçu peuvent être pré-ouverts sur la charge de page.

<example file="v-treeview/prop-open-all" />

#### Rounded

Vous pouvez faire arrondir les nœuds de l’arborescence.

<example file="v-treeview/prop-rounded" />

#### Selectable

Vous pouvez facilement sélectionner des nœuds et des enfants de treeview.

<example file="v-treeview/prop-selectable" />

#### Selected color

Vous pouvez contrôler la couleur de la checkbox du nœud sélectionné.

<example file="v-treeview/prop-selected-color" />

#### Selection type

Treeview now supports two different selection types. The default type is **'leaf'**, which will only include leaf nodes in the v-model array, but will render parent nodes as either partially or fully selected. The alternative mode is **'independent'**, which allows one to select parent nodes, but each node is independent of its parent and children.

<example file="v-treeview/prop-selection-type" />

#### Shaped

Arborescences façonnées ont des bords arrondis d'un côté des nœuds.

<example file="v-treeview/prop-shaped" />

### Slots

#### Append and label

Using the the **label**, and an **append** slots we are able to create an intuitive file explorer.

<example file="v-treeview/slot-append-and-label" />

### Divers

#### Search and filter

Easily filter your treeview by using the **search** prop. You can easily apply your custom filtering function if you need case-sensitive or fuzzy filtering by setting the **filter** prop. This works similar to the [v-autocomplete](/components/autocompletes) component.

<example file="v-treeview/misc-search-and-filter" />

#### Selectable icons

Customize the **on**, **off** and **indeterminate** icons for your selectable tree. Combine with other advanced functionality like API loaded items.

<example file="v-treeview/misc-selectable-icons" />

<backmatter />
