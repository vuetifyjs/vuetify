---
nav: Lists
meta:
  title: List component
  description: The list component is a continuous group of text, images and icons that may contain primary or supplemental actions.
  keywords: lists, vuetify list component, vue list component
related:
  - /components/item-groups/
  - /components/avatars/
  - /components/sheets/
---

# Lists

The `v-list` component is used to display information. It can contain an avatar, content, actions, subheaders and much more. Lists present content in a way that makes it easy to identify a specific item in a collection. They provide a consistent styling for organizing groups of text and images.

## Usage

Lists come in three main variations. **single-line** (default), **two-line** and **three-line**. The line declaration specifies the minimum height of the item and can also be controlled from `v-list` with the same prop.

<usage name="v-list" />

<entry />

## API

| Component | Description |
| - | - |
| [v-list](/api/v-list/) | Primary Component |
| [v-list-group](/api/v-list-group/) | Sub-component used to display or hide groups of items |
| [v-list-subheader](/api/v-list-subheader/) | Sub-component used to separate groups of items |
| [v-list-item](/api/v-list-item/) | Sub-component used to display a single item or modify the `v-list` state |
| [v-list-item-title](/api/v-list-item-title/) | Sub-component used to display the title of a list item. Wraps the `#title` slot |
| [v-list-item-subtitle](/api/v-list-item-subtitle/) | Sub-component used to display the subtitle of a list item. Wraps the `#subtitle` slot |
| [v-list-item-action](/api/v-list-item-action/) | Sub-component used to display [v-checkbox](/components/checkboxes/) or [v-switch](/components/switches/) |
| [v-list-img](/api/v-list-img/) | Sub-component that is used to wrap a the [v-img](/components/images/) component |
| [v-list-item-media](/api/v-list-item-media/) | Sub-component that is used to wrap a the [v-img](/components/images/) component |

<api-inline hide-links />

## Examples

### Props

#### Items

Lists can either be created by markup using the many sub-components that are available, or by using the **items** prop.

<example file="v-list/prop-items" />

To customize which properties will be used for the title and value of each item, use the **item-title** and **item-value** props.

<example file="v-list/prop-items-custom" />

If you need to render subheaders or dividers, add an item with a **type** property. Which property to use can be customized using the **item-type** prop.

<example file="v-list/prop-items-type" />

To customize individual items, you can use the **item-props** prop. It defaults to looking for a **props** property on the items. The value should be an object, and if found it will be spread on the **v-list-item** component.

If **item-props** is set to **true** then the whole item will be spread.

<example file="v-list/prop-items-prop" />

#### Density

`v-list` supports the **density** property.

<example file="v-list/prop-density" />

<promoted slug="vuetify-lux-admin-pro" />

#### Disabled

You cannot interact with disabled `v-list`.

<example file="v-list/prop-disabled" />

#### Variant

`v-list` supports the **variant** prop.

<example file="v-list/prop-variant" />

#### Nav

Lists can receive an alternative **nav** styling that reduces the width `v-list-item` takes up as well as adding a border radius.

<example file="v-list/prop-nav" />

#### Rounded

You can make `v-list` items rounded.

<example file="v-list/prop-rounded" />

#### Shaped

Shaped lists have rounded borders on one side of the `v-list-item`.

<example file="v-list/prop-shaped" />

#### Sub group

Using the `v-list-group` component you can create sub-groups of items.

<example file="v-list/prop-sub-group" />

#### Three line

For three line lists, the subtitle will clamp vertically at 2 lines and then ellipsis. This feature uses [line-clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp) and is not supported in all browsers.

<example file="v-list/prop-three-line" />

#### Two lines and subheader

Lists can contain subheaders, dividers, and can contain 1 or more lines. The subtitle will overflow with ellipsis if it extends past one line.

<example file="v-list/prop-two-line-and-subheader" />

### Misc

#### Action and item groups

A **three-line** list with actions. Utilizing **v-list-group**, easily connect actions to your tiles.

<example file="v-list/misc-action-and-item-groups" />
