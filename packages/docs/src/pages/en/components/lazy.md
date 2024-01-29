---
meta:
  nav: Lazy
  title: Lazy component
  description: The lazy component allows you to dynamically render content based upon the user's viewport.
  keywords: lazy loading
related:
  - /components/badges/
  - /components/icons/
  - /components/lists/
features:
  github: /components/VLazy/
  label: 'C: VLazy'
  report: true
---

# Lazy

The `v-lazy` component is used to dynamically load components based upon an elements visibility.

<page-features />

## Usage

The `v-lazy` component by default will not render its contents until it has been intersected. Scroll down and watch the element render as you go past it.

<example file="v-lazy/usage" />

<entry />

## API

| Component | Description |
| - | - |
| [v-lazy](/api/v-lazy/) | Primary Component |

<api-inline hide-links />

## Examples

### Lists

The `v-lazy` component can be used to render lists of items. This is useful for long lists that may cause the page to become unresponsive while rendering.

<example file="v-lazy/list" />
