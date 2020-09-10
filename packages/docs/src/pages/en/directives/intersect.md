---
meta:
  title: Intersection observer directive
  description: The intersection observer directive utilizes the Intersection observer API. It allows you to determine when elements are visible on the screen.
  keywords: intersect, vuetify intersect directive, intersection observer directive
related:
  - /components/cards/
  - /components/images/
---

# Intersection observer

The `v-intersect` directive utilizes the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). It provides an easy-to-use interface for detecting when elements are visible within the user's viewport. This is also used for the [v-lazy](/components/lazy) component.

<entry-ad />

## Usage

Scroll the window and watch the colored dot. Notice as the [v-card](/components/cards) comes into view that it changes from error to success.

<example file="v-intersect/usage" />

## API

- [v-intersect](/api/v-intersect)

## Caveats

<alert type="info">

  While the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) is not available in IE11 by default, it can be implemented using a [polyfill](https://github.com/w3c/IntersectionObserver)

</alert>

## Examples

### Props

#### Options

The `v-intersect` directive accepts options. Available options can be found in the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). Below is an example using the `threshold` option.

<example file="v-intersect/prop-options" />

<backmatter />
