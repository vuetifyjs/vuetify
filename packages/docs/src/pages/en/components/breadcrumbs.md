---
meta:
  nav: Breadcrumbs
  title: Breadcrumbs component
  description: The breadcrumbs component is a navigational helper for pages. It can accept a Material Icons icon or characters as a divider.
  keywords: breadcrumbs, vuetify breadcrumbs component, vue breadcrumbs component, v-breadcrumbs component
related:
  - /components/buttons/
  - /components/navigation-drawers/
  - /components/icons/
features:
  figma: true
  label: 'C: VBreadcrumbs'
  report: true
  github: /components/VBreadcrumbs/
---

# Breadcrumbs

The `v-breadcrumbs` component is used as a navigational helper and hierarchy for pages.

<!-- ![breadcrumbs Entry](https://cdn.vuetifyjs.com/docs/images/components-temp/v-breadcrumbs/v-breadcrumbs-entry.png) -->

<PageFeatures />

## Usage

By default, breadcrumbs use a text divider. This can be any string.

<ExamplesUsage name="v-breadcrumbs" />

<PromotedEntry />

::: tip

Use [slots](/api/v-breadcrumbs/#slots) for more control of the breadcrumbs, either utilizing `v-breadcrumbs-item` or other custom markup.

:::

## API

| Component | Description |
| - | - |
| [v-breadcrumbs](/api/v-breadcrumbs/) | Primary Component |
| [v-breadcrumbs-item](/api/v-breadcrumbs-item/) | Sub-component used for each breadcrumb |
| [v-breadcrumbs-divider](/api/v-breadcrumbs-divider/) | Sub-component used for dividing breadcrumbs |

<ApiInline hide-links />

::: info
  By default `v-breadcrumbs` will disable all crumbs up to the current page in a nested paths. You can prevent this behavior by using `exact: true` on each applicable breadcrumb in the `items` array.
:::

## Examples

### Props

#### Divider

Breadcrumbs separator can be set using `divider` property.

<ExamplesExample file="v-breadcrumbs/prop-divider" />

### Slots

#### Prepend

Prepend content with the `prepend` slot.

<ExamplesExample file="v-breadcrumbs/slot-prepend" />

#### Dividers

To customize the divider, use the `divider` slot.

<ExamplesExample file="v-breadcrumbs/slot-icon-dividers" />

#### Title

You can use the `title` slot to customize each breadcrumb title.

<ExamplesExample file="v-breadcrumbs/slot-title" />
