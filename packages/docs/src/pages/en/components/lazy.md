---
meta:
  title: Lazy component
  description: The lazy component allows you to dynamically render content based upon the user's viewport.
  keywords: lazy loading
related:
  - /components/badges/
  - /components/icons/
  - /components/lists/
---

# Lazy

The `v-lazy` component is used to dynamically load components based upon an elements visibility.

<entry-ad />

## Usage

The `v-lazy` component by default will not render its contents until it has been intersected. Scroll down and watch the element render as you go past it.

<example file="v-lazy/usage" />

## API

- [v-lazy](/api/v-lazy)

## Caveats

<alert type="info">

  The `v-lazy` component uses the [v-intersect](/directives/intersect) directive which requires a [Polyfill](/directives/intersect#polyfill) in order to work on IE11 / Safari. It's possible on some iOS versions will also require the use of this polyfill.

</alert>

<backmatter />
