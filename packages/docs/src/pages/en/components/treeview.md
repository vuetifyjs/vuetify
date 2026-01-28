---
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

<DocIntroduced version="3.9.0" />

## Usage

A basic example of the treeview component.

<ExamplesExample file="v-treeview/usage" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-treeview](/api/v-treeview/) | Primary Component |
| [v-treeview-item](/api/v-treeview-item/) | Sub-component used to display a single treeview node |
| [v-treeview-group](/api/v-treeview-group/) | Sub-component used to display a single treeview node's children |

<ApiInline hide-links />

::: info

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

#### Density

Dense mode provides more compact layout with decreased heights of the items.

<ExamplesExample file="v-treeview/prop-dense" />

#### Items registration

When working with large trees it is recommended to include `items-registration="props"` to ensure faster loading and interactions.

<ExamplesExample file="v-treeview/prop-items-registration" />

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

Treeview supports several selection modes:

- **leaf** (default): Limits selection to items without children.
- **independent**: Lets you select any node, with no parent-child linkage at all.
- **classic**: Selecting a parent selects all descendants, and parent nodes show as selected only when all their descendants are selected. Only leaf nodes are added to the model.

Classic has two variants that are displayed the same way but with slightly different v-model behavior:

- **branch**: Any parent node with at least one selected descendant is also added to the model.
- **trunk**: If all children are selected only the parent node is added to the model.

<ExamplesExample file="v-treeview/prop-selection-type" />

#### Load children

You can dynamically load child data by supplying a _Promise_ callback to the **load-children** prop. This callback will be executed the first time a user tries to expand an item that has a children property that is an empty array.

<ExamplesExample file="v-treeview/prop-load-children" />

### Slots

The `v-treeview` component has several slots that allow you to customize the appearance and behavior of its items.

#### Append and prepend

Using the the **prepend** slot we are able to create an intuitive file explorer.

<ExamplesExample file="v-treeview/slot-append-and-label" />

Both **append**, and **prepend** slots get additional information about the item: `depth`, `path` (from indexes), `isFirst`, `isLast` and the `index` within the children list.

<ExamplesExample file="v-treeview/slot-append-and-prepend-item" />

#### No data

When searching within the treeview, you might want to show custom **no-data** slot to provide context or immediate action.

<ExamplesExample file="v-treeview/slot-no-data" />

#### Title

In this example we use a custom **title** slot to apply a line-through the treeview item's text when selected.

<ExamplesExample file="v-treeview/slot-title" />

#### Toggle

Here, a custom **toggle** slot is utilized to assign a specific color and variant to the button depending on the state of the item.

<ExamplesExample file="v-treeview/slot-toggle" />

## Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-treeview` component.

### Search and filter

Easily filter your treeview by using the **search** prop. You can easily apply your custom filtering function if you need case-sensitive or fuzzy filtering by setting the **custom-filter** prop. This works similar to the [v-autocomplete](/components/autocompletes) component.

<ExamplesExample file="v-treeview/misc-search-and-filter" />

### Selectable icons

Customize the **on**, **off** and **indeterminate** icons for your selectable tree. Combine with other advanced functionality like API loaded items.

<ExamplesExample file="v-treeview/misc-selectable-icons" />

### Indent lines

The `v-treeview` component can be configured to show indent lines. The `indent-lines` prop controls lines visibility and the variant.

<ExamplesExample file="v-treeview/misc-indent-lines" />
