---
meta:
  nav: Intersection observer
  title: Intersection observer directive
  description: The intersection observer directive utilizes the Intersection observer API. It allows you to determine when elements are visible on the screen.
  keywords: intersect, vuetify intersect directive, intersection observer directive
related:
  - /components/cards/
  - /components/images/
  - /components/text-fields/
---

# Intersection observer

The `v-intersect` directive utilizes the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). It provides an easy-to-use interface for detecting when elements are visible within the user's viewport. This is also used for the [v-lazy](/components/lazy) component.

<PageFeatures />

## Usage

Scroll the window and watch the colored dot. Notice as the [v-card](/components/cards) comes into view that it changes from error to success.

<ExamplesExample file="v-intersect/usage" />

<PromotedEntry />

## API

| Directive                                  | Description                         |
|--------------------------------------------|-------------------------------------|
| [v-intersect](/api/v-intersect-directive/) | The intersection observer directive |

<ApiInline hide-links />

## Examples

### Props

#### Options

The `v-intersect` directive accepts options. Available options can be found in the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). Below is an example using the `threshold` option.

<ExamplesExample file="v-intersect/prop-options" />
