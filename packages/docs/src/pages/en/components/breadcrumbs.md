---
nav: Breadcrumbs
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

<!-- ![breadcrumbs Entry](https://cdn.vuetifyjs.com/docs/images/components-temp/v-breadcrumbs/v-breadcrumbs-entry.png) -->

---

## Usage

By default, breadcrumbs use a text divider. This can be any string.

<usage name="v-breadcrumbs" />

<entry />

## API

| Component | Description |
| - | - |
| [v-breadcrumbs](/api/v-breadcrumbs/) | Primary Component |
| [v-breadcrumbs-item](/api/v-breadcrumbs-item/) | Sub-component used for each breadcrumb |
| [v-breadcrumbs-divider](/api/v-breadcrumbs-divider/) | Sub-component used for dividing breadcrumbs |

<api-inline hide-links />

<alert type="info">

  By default `v-breadcrumbs` will disable all crumbs up to the current page in a nested paths. You can prevent this behavior by using `exact: true` on each applicable breadcrumb in the `items` array.

</alert>

## Examples

### Props

#### Divider

Breadcrumbs separator can be set using `divider` property.

<example file="v-breadcrumbs/prop-divider" />

### Slots

#### Prepend

Prepend content with the `prepend` slot.

<example file="v-breadcrumbs/slot-prepend" />

#### Dividers

To customize the divider, use the `divider` slot.

<example file="v-breadcrumbs/slot-icon-dividers" />

#### Title

You can use the `title` slot to customize each breadcrumb title.

<example file="v-breadcrumbs/slot-title" />
