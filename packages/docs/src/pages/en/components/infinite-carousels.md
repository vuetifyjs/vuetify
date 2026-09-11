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

Put anything in the default slot. The content is repeated as many times as it takes to fill the container, and the loop is seamless in either direction. Add `auto-play` to set it moving.

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
- duplicates are `inert`, as is anything clipped out of view, so screen readers and the tab order only ever see what is on screen
- the strip is a single tab stop; arrow keys move focus between items and pull each one into view. When nothing inside is focusable, they move the strip by `shift-distance` instead. Pass an `aria-label` so the group announces what it holds
- with `draggable`, pointer and touch drag scrub the loop, and it resumes where you let go; a drag that ends over a link does not follow it
- the loop pauses while focus is inside it, while the pointer is over a link, button or input in it, and under `prefers-reduced-motion`

### Props

#### Direction

`direction` switches the loop to the block axis. A vertical carousel needs a container with a definite height.

<ExamplesExample file="v-infinite-carousel/prop-direction" />

#### Auto play

`auto-play` scrolls the content on its own. Pass an object to set the `speed` in pixels per second or to `reverse` the travel direction. The movement pauses while the pointer is over an item with interactive item – set `pauseOnHover: false` to make it move regardless.

<ExamplesExample file="v-infinite-carousel/prop-auto-play" />

#### Mask

`mask` fades both edges out to transparent, so it blends into any background. You can customize the size using `$infinite-carousel-mask-size` or pass an object to the `mask` prop.

```html
<!-- default 60px -->
<v-infinite-carousel mask></v-infinite-carousel>

<!-- changed to 80px (accepts string value with CSS units or percentage) -->
<v-infinite-carousel :mask="{ size: 80 }"></v-infinite-carousel>
```

#### Arrows

`show-arrows` overlays previous and next controls, and `hover` reveals them on pointer hover or keyboard focus. One click moves the content by `shift-distance`, which takes any CSS length — percentages resolve against the container width.

<ExamplesExample file="v-infinite-carousel/prop-shift-distance" />

### Slots

#### Separator

The `separator` slot places a divider after every item, including across the seam between repeated copies.

<ExamplesExample file="v-infinite-carousel/slot-divider" />

### Examples

The following are a collection of examples that demonstrate more advanced capabilities of `v-infinite-carousel`.

#### Logo strip

A common use for an infinite carousel is an endless row of logos or partner names. It requires some spacing for the shadows to be fully rendered.

<ExamplesExample file="v-infinite-carousel/misc-logo-strip" />

#### Floating bubbles

Items do not have to sit in a straight row. Here a single tile holds 12 absolutely positioned bubbles with drift movements in pseudo-random direction.

<ExamplesExample file="v-infinite-carousel/misc-bubbles" />

#### External controls

Controls can live anywhere on the page. Grab the component with a template ref and call its exposed `slide('prev')` or `slide('next')`, which moves the content by `shift-distance` like the built-in arrows.

<ExamplesExample file="v-infinite-carousel/misc-external-controls" />