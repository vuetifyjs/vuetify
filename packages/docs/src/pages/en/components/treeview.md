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

# Treeview

The `v-treeview` component is useful for displaying large amounts of nested data.

<entry-ad />

## Usage

A basic example

<example file="v-treeview/usage" />

## API

- [v-treeview](/api/v-treeview)

## Examples

### Props

#### Activatable

Treeview nodes can be activated by clicking on them.

<example file="v-treeview/prop-activatable" />

#### Color

You can control the text and background color of the active treeview node.

<example file="v-treeview/prop-color" />

#### Dense mode

Dense mode provides more compact layout with decreased heights of the items.

<example file="v-treeview/prop-dense" />

#### Hoverable

Treeview nodes can have a hover effect.

<example file="v-treeview/prop-hoverable" />

#### Item disabled

Setting **item-disabled** prop allows to control which node's property disables the node when set to `true`.

<example file="v-treeview/prop-item-disabled" />

#### Load children

You can dynamically load child data by supplying a _Promise_ callback to the **load-children** prop. This callback will be executed the first time a user tries to expand an item that has a children property that is an empty array.

<example file="v-treeview/prop-load-children" />

#### Open all

Treeview nodes can be pre-opened on page load.

<example file="v-treeview/prop-open-all" />

#### Rounded

You can make treeview nodes rounded.

<example file="v-treeview/prop-rounded" />

#### Selectable

You can easily select treeview nodes and children.

<example file="v-treeview/prop-selectable" />

#### Selected color

You can control the color of the selected node checkbox.

<example file="v-treeview/prop-selected-color" />

#### Selection type

Treeview now supports two different selection types. The default type is **'leaf'**, which will only include leaf nodes in the v-model array, but will render parent nodes as either partially or fully selected. The alternative mode is **'independent'**, which allows one to select parent nodes, but each node is independent of its parent and children.

<example file="v-treeview/prop-selection-type" />

#### Shaped

Shaped treeview's have rounded borders on one side of the nodes.

<example file="v-treeview/prop-shaped" />

### Slots

#### Append and label

Using the the **label**, and an **append** slots we are able to create an intuitive file explorer.

<example file="v-treeview/slot-append-and-label" />

### Misc

#### Search and filter

Easily filter your treeview by using the **search** prop. You can easily apply your custom filtering function if you need case-sensitive or fuzzy filtering by setting the **filter** prop. This works similar to the [v-autocomplete](/components/autocompletes) component.

<example file="v-treeview/misc-search-and-filter" />

#### Selectable icons

Customize the **on**, **off** and **indeterminate** icons for your selectable tree. Combine with other advanced functionality like API loaded items.

<example file="v-treeview/misc-selectable-icons" />

<backmatter />
