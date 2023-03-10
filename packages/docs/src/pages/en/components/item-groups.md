---
nav: Item groups
meta:
  title: Item group component
  description: The item group components provides the ability to create a group of selectable items out of any component.
  keywords: item groups, vuetify item group component, vue item group component
related:
  - /components/button-groups
  - /components/carousels
  - /components/tabs
---

# Item groups

The `v-item-group` provides the ability to create a group of selectable items out of any component. This is the baseline functionality for components such as `v-tabs` and `v-carousel`.

## Usage

The core usage of the `v-item-group` is to create groups of anything that should be controlled by a **model**.

<!-- <example file="v-item-group/usage" /> -->

<entry />

## API

| Component | Description |
| - | - |
| [v-item-group](/api/v-item-group/) | The item group component. |
| [v-item](/api/v-item/) | Sub-component used for modifying the `v-item-group` state |

<api-inline hide-links />

## Examples

### Props

#### Selected class

The **selected-class** prop allows you to designate a CSS class applied to _selected_ items.

<example file="v-item-group/prop-selected-class" />

#### Mandatory

**mandatory** item groups must have at least 1 item selected.

<example file="v-item-group/prop-mandatory" />

#### Multiple

Item groups can have **multiple** items selected.

<example file="v-item-group/prop-multiple" />

### Misc

#### Chips

Easily hook up a custom chip group.

<example file="v-item-group/misc-chips" />

#### Selection

Icons can be used as toggle buttons when they allow selection, or deselection, of a single choice, such as marking an item as a favorite.

<example file="v-item-group/misc-selection" />
