---
meta:
  title: List component
  description: The list component is a continuous group of text, images and icons that may contain primary or supplemental actions.
  keywords: lists, vuetify list component, vue list component
related:
  - /components/item-groups/
  - /components/list-item-groups/
  - /components/subheaders/
---

# Lists

The `v-list` component is used to display information. It can contain an avatar, content, actions, subheaders and much more. Lists present content in a way that makes it easy to identify a specific item in a collection. They provide a consistent styling for organizing groups of text and images.

<entry-ad />

## Usage

Lists come in three main variations. **single-line** (default), **two-line** and **three-line**. The line declaration specifies the minimum height of the item and can also be controlled from `v-list` with the same prop.

<example file="v-list/usage" />

## API

- [v-list](/api/v-list)
- [v-list-item](/api/v-list-item)
- [v-list-item-action](/api/v-list-item-action)
- [v-list-item-action-text](/api/v-list-item-action-text)
- [v-list-item-avatar](/api/v-list-item-avatar)
- [v-list-item-content](/api/v-list-item-content)
- [v-list-item-group](/api/v-list-group)
- [v-list-item-icon](/api/v-list-item-icon)
- [v-list-item-subtitle](/api/v-list-item-subtitle)
- [v-list-item-title](/api/v-list-item-title)

<!-- ## Sub-components

### v-list-item

v-list-item description

### v-list-item-action

v-list-item-action description

### v-list-item-action-text

v-list-item-action-text description

### v-list-item-avatar

v-list-item-avatar description

### v-list-item-content

v-list-item-content description

### v-list-item-subtitle

v-list-item-subtitle description

### v-list-item-title

v-list-item-title description -->

## Caveats

<alert type="info">

  If you are looking for stateful list items, please check out [v-list-item-group](/components/list-item-groups).

</alert>

## Examples

### Props

#### Dense

`v-list` can be lowered with **dense** property.

<example file="v-list/prop-dense" />

#### Disabled

You cannot interact with disabled `v-list`.

<example file="v-list/prop-disabled" />

#### Flat

Items don't change when selected in `v-list` with **flat** property.

<example file="v-list/prop-flat" />

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

Using the `v-list-group` component you can create up to **2** levels in depth using the **sub-group** prop.

<example file="v-list/prop-sub-group" />

#### Three line

For three line lists, the subtitle will clamp vertically at 2 lines and then ellipsis. This feature uses [line-clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp) and is not supported in all browsers.

<example file="v-list/prop-three-line" />

#### Two lines and subheader

Lists can contain subheaders, dividers, and can contain 1 or more lines. The subtitle will overflow with ellipsis if it extends past one line.

<example file="v-list/prop-two-line-and-subheader" />

### Slots

#### Expansion Lists

A list can contain a group of items which will display on click utilizing `v-item-group`'s `activator` slot. Expansion lists are also used within the **[v-navigation-drawer](/components/navigation-drawers)** component.

<example file="v-list/slot-expansion-lists" />

### Misc

#### Action and item groups

A **three-line** list with actions. Utilizing **[v-list-item-group](/components/list-item-groups)**, easily connect actions to your tiles.

<example file="v-list/misc-action-and-item-groups" />

#### Action stack

A list can contain a stack within an action. This is useful when you need to display meta text next to your action item.

<example file="v-list/misc-action-stack" />

#### Card list

A list can be combined with a card.

<example file="v-list/misc-card-list" />

#### Simple avatar list

A simple list utilizing `v-list-item-icon`, `v-list-item-title` and `v-list-item-avatar`.

<example file="v-list/misc-simple-avatar-list" />

#### Single line list

Here we combine **v-list-item-avatar** and **v-list-item-icon** in a single-line list.

<example file="v-list/misc-single-line-list" />

#### Subheadings and dividers

Lists can contain multiple subheaders and dividers.

<example file="v-list/misc-subheadings-and-dividers" />

<backmatter />
