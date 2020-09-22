---
meta:
  title: Breadcrumbs component
  description: The breadcrumbs component is a navigational helper for pages. It can accept a Material Icons icon or characters as a divider.
  keywords: breadcrumbs, vuetify breadcrumbs component, vue breadcrumbs component, v-breadcrumbs component
related:
  - /components/buttons/
  - /components/navigation-drawers/
  - /components/icons/
---

# Breadcrumbs

The `v-breadcrumbs` component is a navigational helper for pages. It can accept a **Material Icons** icon or text characters as a divider. An array of objects can be passed to the **items** property of the component.  Additionally, slots exists for more control of the breadcrumbs, either utilizing `v-breadcrumbs-item` or other custom markup.

<entry-ad />

## Usage

By default, breadcrumbs use a text divider. This can be any string.

<usage name="v-breadcrumbs" />

## API

- [v-breadcrumbs](/api/v-breadcrumbs)
- [v-breadcrumbs-item](/api/v-breadcrumbs-item)

<!-- ## Sub-components

### v-breadcrumbs-item

v-breadcrumbs-item description -->

## Caveats

<alert type="info">

  By default `v-breadcrumbs` will disable all crumbs up to the current page in a nested paths. You can prevent this behavior by using `exact: true` on each applicable breadcrumb in the `items` array.

</alert>

## Examples

### Props

#### Divider

Breadcrumbs separator can be set using `divider` property.

<example file="v-breadcrumbs/prop-divider" />

#### Large

Large breadcrumbs have larger font size.

<example file="v-breadcrumbs/prop-large" />

### Slots

#### Icon Dividers

For the icon variant, breadcrumbs can use any icon in Material Design Icons.

<example file="v-breadcrumbs/slot-icon-dividers" />

#### Item

You can use the `item` slot to customize each breadcrumb.

<example file="v-breadcrumbs/slot-item" />

<backmatter />
