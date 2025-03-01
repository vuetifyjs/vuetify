---
emphasized: true
meta:
  nav: Treeview
  title: Treeview component
  description: The treeview component is a user interface that is used to represent hierarchical data in a tree structure.
  keywords: treeview, vuetify treeview component, vue treeview component
related:
  - /components/lists/
  - /components/timelines/
  - /components/autocompletes/
features:
  label: 'C: VTreeview'
  report: true
---

# Treeview

The `v-treeview` component is useful for displaying large amounts of nested data.

<PageFeatures />

::: warning

This feature requires [v3.5.9](/getting-started/release-notes/?version=v3.5.9)

:::

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VTreeview } from 'vuetify/labs/VTreeview'

export default createVuetify({
  components: {
    VTreeview,
  },
})
```

## Usage

A basic example of the treeview component.

<ExamplesExample file="v-treeview/usage" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-treeview](/api/v-treeview/) | Primary Component |
| [v-treeview-item](/api/v-treeview-item/) | Sub-component used to display a single treeview node |
| [v-treeview-children](/api/v-treeview-children/) | Sub-component used to display a single treeview node's children |
| [v-treeview-group](/api/v-treeview-group/) | Sub-component used to display a single treeview node's children |

<ApiInline hide-links />

::: error

There is a [bug](https://github.com/vuejs/babel-plugin-jsx/issues/712) related to how [babel-plugin-jsx](https://github.com/vuejs/babel-plugin-jsx) renders templates that degrades VTreeview performance. We are tracking the issue [here](https://github.com/vuetifyjs/vuetify/issues/19919).

:::

## Guide

The `v-treeview` component is useful for displaying large amounts of nested data. It is a tree structure that can be expanded and collapsed, allowing users to navigate through the hierarchy of items.

It is built on top of the [v-list](/components/lists/) component, which provides the basic structure and functionality for displaying lists of items. The `v-treeview` component extends this functionality by adding support for hierarchical data, allowing users to expand and collapse items to reveal or hide their children.

### Props

The `v-treeview` component has several props that allow you to customize its appearance and behavior.

#### Activatable

Treeview nodes can be activated by clicking on them.

<ExamplesExample file="v-treeview/prop-activatable" />

#### Color

You can control the text and background color of the active treeview node.

<ExamplesExample file="v-treeview/prop-color" />

#### Dense mode

Dense mode provides more compact layout with decreased heights of the items.

<ExamplesExample file="v-treeview/prop-dense" />

<!-- #### Hoverable

Treeview nodes can have a hover effect.

<ExamplesExample file="v-treeview/prop-hoverable" /> -->

#### Item props

If **item-props** is set to `true` then the whole item will be spread. In the following example, the disabled prop defined in each item will disable the item accordingly.

<ExamplesExample file="v-treeview/prop-item-props" />

#### Open all

Treeview nodes can be pre-opened on page load.

<ExamplesExample file="v-treeview/prop-open-all" />

<!-- #### Rounded

You can make treeview nodes rounded.

<ExamplesExample file="v-treeview/prop-rounded" /> -->

#### Fluid

The **fluid** prop removes the extra indentation used to line up children. This is useful when you want to reduce the horizontal space used by the treeview.

<ExamplesExample file="v-treeview/prop-fluid" />

#### Selected color

You can control the color of the selected node checkbox.

<ExamplesExample file="v-treeview/prop-selected-color" />

#### Selection type

Treeview now supports two different selection types. The default type is **'leaf'**, which will only include leaf nodes in the v-model array, but will render parent nodes as either partially or fully selected. The alternative mode is **'independent'**, which allows one to select parent nodes, but each node is independent of its parent and children.

<ExamplesExample file="v-treeview/prop-selection-type" />

#### Load children

You can dynamically load child data by supplying a _Promise_ callback to the **load-children** prop. This callback will be executed the first time a user tries to expand an item that has a children property that is an empty array.

<ExamplesExample file="v-treeview/prop-load-children" />

### Slots

The `v-treeview` component has several slots that allow you to customize the appearance and behavior of its items.

#### Prepend

Using the the **prepend** slot we are able to create an intuitive file explorer.

<ExamplesExample file="v-treeview/slot-append-and-label" />

#### Title

In this example we use a custom **title** slot to apply a line-through the treeview item's text when selected.

<ExamplesExample file="v-treeview/slot-title" />

## Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-treeview` component.

### Search and filter

Easily filter your treeview by using the **search** prop. You can easily apply your custom filtering function if you need case-sensitive or fuzzy filtering by setting the **custom-filter** prop. This works similar to the [v-autocomplete](/components/autocompletes) component.

<ExamplesExample file="v-treeview/misc-search-and-filter" />

### Selectable icons

Customize the **on**, **off** and **indeterminate** icons for your selectable tree. Combine with other advanced functionality like API loaded items.

<ExamplesExample file="v-treeview/misc-selectable-icons" />
