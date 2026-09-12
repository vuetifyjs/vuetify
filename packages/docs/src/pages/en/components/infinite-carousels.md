---
emphasized: true
meta:
  nav: Infinite carousels
  title: Infinite carousel component
  description: The infinite carousel component scrolls a strip of content in a seamless loop.
  keywords: vuetify infinite carousel component, vue infinite carousel component, marquee, ticker, logo strip, scrolling banner
features:
  github: /labs/VInfiniteCarousel/
  label: 'C: VInfiniteCarousel'
  report: true
---

# Infinite carousel

The `v-infinite-carousel` component scrolls a strip of content in a seamless loop, clipped to its container.

<PageFeatures />

::: warning

This feature requires [v4.3.0](/getting-started/release-notes/?version=v4.3.0)

:::

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VInfiniteCarousel } from 'vuetify/labs/VInfiniteCarousel'

export default createVuetify({
  components: {
    VInfiniteCarousel,
  },
})
```

## Usage

Put anything in the default slot. The content is repeated as many times as it takes to fill the container, and the loop is seamless in either direction. It moves on its own unless `paused`.

<ExamplesUsage name="v-infinite-carousel" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-infinite-carousel](/api/v-infinite-carousel/) | Primary Component |

<ApiInline hide-links />

## Guide

Unlike [v-carousel](/components/carousels/), which moves between discrete slides, `v-infinite-carousel` scrolls its content continuously and treats it as one uninterrupted strip.

It clips with `overflow: clip` rather than a scroll container, so the strip cannot be scrolled out of position by a wheel, a trackpad, or a browser scrolling a focused child into view.

Notable behaviors:

- content is duplicated to fill the container, and the copy count follows a resize
- duplicates are hidden from screen readers and left out of the tab order, so assistive tech gets the content once; keyboard focus that lands out of view pulls its item into view
- the strip is a single tab stop; arrow keys move focus between items and pull each one into view. When nothing inside is focusable, they move the strip by `shift-distance` instead. Pass an `aria-label` so the group announces what it holds
- with `draggable`, pointer and touch drag scrub the loop, and it resumes where you let go; a drag that ends over a link does not follow it
- with `wheel`, a horizontal loop scrubs on trackpad swipes and shift+wheel, and a vertical one on the regular wheel, which keeps the page from scrolling while the pointer is over it
- the loop pauses while focus is inside it and under `prefers-reduced-motion`

### Props

#### Direction

`direction` switches the loop to the block axis. A vertical carousel needs a definite height, either from `height` or from its container.

<ExamplesExample file="v-infinite-carousel/prop-direction" />

#### Speed

`speed` sets how many pixels per second the content travels, and `reverse` flips its direction. `paused` holds it still, while dragging and the arrows can still move it. Add `pause-on-hover` to also hold it while the pointer is over the carousel.

<ExamplesExample file="v-infinite-carousel/prop-speed" />

#### Mask

`mask` fades both edges out to transparent, so it blends into any background. You can customize the size using `$infinite-carousel-mask-size` or pass a length to the `mask` prop.

```html
<!-- default 60px -->
<v-infinite-carousel mask></v-infinite-carousel>

<!-- changed to 80px (accepts string value with CSS units or percentage) -->
<v-infinite-carousel mask="80"></v-infinite-carousel>
```

#### Arrows

`show-arrows` overlays previous and next controls, and `hover` reveals them on pointer hover or keyboard focus. One click moves the content by `shift-distance`, which takes any CSS length — percentages resolve against the container width.

<ExamplesExample file="v-infinite-carousel/prop-shift-distance" />

### Slots

#### Separator

The `separator` slot places a divider after every item, including across the seam between repeated copies.

<ExamplesExample file="v-infinite-carousel/slot-separator" />

### Examples

The following are a collection of examples that demonstrate more advanced capabilities of `v-infinite-carousel`.

#### Logo strip

A common use for an infinite carousel is an endless row of logos or partner names. Cards need some vertical margin so their shadows are not clipped.

<ExamplesExample file="v-infinite-carousel/misc-logo-strip" />

#### Floating bubbles

Items do not have to sit in a straight row. Here a single tile holds 12 absolutely positioned bubbles drifting in pseudo-random directions.

<ExamplesExample file="v-infinite-carousel/misc-bubbles" />

#### External controls

Controls can live anywhere on the page. Grab the component with a template ref and call its exposed `slide('prev')` or `slide('next')`, which moves the content by `shift-distance` like the built-in arrows. A play/pause toggle only needs to flip `paused`.

<ExamplesExample file="v-infinite-carousel/misc-external-controls" />
