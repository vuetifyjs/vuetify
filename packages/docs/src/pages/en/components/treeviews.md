---
nav: Treeviews
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

<entry />

## Usage

A basic example

<example file="v-treeview/usage" />

## API

<api-inline />

## Examples

### Props

#### Selection

<example file="v-treeview/prop-selection" />

#### Show lines

<example file="v-treeview/prop-show-lines" />

#### Density

Use the **density** prop to provide a more compact layout that decreases the heights of the items.

<example file="v-treeview/prop-density" />

#### Hover

Treeview items have a hover effect by default. This can be disabled with the **hover** prop.

<example file="v-treeview/prop-hoverable" />

#### Item disabled

Setting **item-disabled** prop allows to control which node's property disables the node when set to `true`.

<example file="v-treeview/prop-item-disabled" />

#### Open on mount

Treeview nodes can be pre-opened on page load. Use the **open-on-mount** prop with either `all` to open the entire tree, or `root` to only open the first level.

<example file="v-treeview/prop-open-on-mount" />

#### Rounded

You can make treeview nodes rounded.

<example file="v-treeview/prop-rounded" />

#### Selected color

You can control the color of the selected node checkbox.

<example file="v-treeview/prop-selected-color" />

#### Select strategy

Treeview supports several different selection strategies using the **select-strategy** prop, and you can also supply your own custom strategy.

| Strategy | Description |
|-|-
| `leaf` | Only leaf items can be selected
| `single-leaf` | Same as `leaf` but only a single item can be selected at a time.
| `independent` | Any items can be selected, without regard for the parent-child hierarchy.
| `single-independent` | Same as `independent` but only a single item can be selected at a time.
| `classic` | The default select strategy. Selecting (and unselecting) a parent will also affect all of its children.
| `classic-leaf` | Same as `classic` but only leaf items will be emitted

<example file="v-treeview/prop-select-strategy" />

#### Open strategy

Treeview supports two different open strategies using the **open-strategy** prop, and you can also supply your own custom strategy.

| Strategy | Description |
|-|-
| `multiple` | The default open strategy. Multiple parents can be open simultaneously.
| `single` | At any depth in the tree, only one parent can be open at a time.

<example file="v-treeview/prop-open-strategy" />

### Slots

#### Prepend

Using the the **prepend** slot we are able to create a simple file explorer.

<example file="v-treeview/slot-prepend" />

### Misc

#### Custom open strategy

In this example we provide a custom open strategy that allows the user to hold <kbd>Ctrl</kbd> while opening a parent to fully expand or collapse it and all of its children.

<example file="v-treeview/misc-custom-open-strategy" />

#### Dynamic data

You can dynamically load data by listening to the `click:open` event and modifying your items accordingly.

<example file="v-treeview/misc-dynamic" />

Here is a more complex example where dynamic data is loaded in deeply nested items.

<example file="v-treeview/misc-dynamic-complex" />

#### Search and filter

Easily filter your treeview by using the **search** prop. You can easily apply your custom filtering function if you need case-sensitive or fuzzy filtering by setting the **filter** prop. This works similar to the [v-autocomplete](/components/autocompletes) component.

<example file="v-treeview/misc-search-and-filter" />

#### Selectable icons

Customize the **on**, **off** and **indeterminate** icons for your selectable tree. Combine with other advanced functionality like API loaded items.

<example file="v-treeview/misc-selectable-icons" />

<backmatter />
