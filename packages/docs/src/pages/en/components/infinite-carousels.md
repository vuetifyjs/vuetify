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

This feature requires [v4.2.0](/getting-started/release-notes/?version=v4.2.0)

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
- the strip is a single tab stop; arrow keys move focus between items and pull each one into view. Pass an `aria-label` so the group announces what it holds
- pointer and touch drag scrub the loop, and it resumes where you let go
- the loop pauses while focus is inside it and under `prefers-reduced-motion`

### Props

#### Direction

`direction` switches the loop to the block axis. A vertical carousel needs a container with a definite height.

<ExamplesExample file="v-infinite-carousel/prop-direction" />

#### Auto play

`auto-play` scrolls the content on its own. Pass an object to set the `speed` in pixels per second or to `reverse` the travel direction. Left off, the strip holds still while staying draggable and keyboard navigable.

<ExamplesExample file="v-infinite-carousel/prop-auto-play" />

#### Mask

`mask` fades both edges out under a gradient. Pass an object to change its `size` or its `color`, which takes a theme colour name or any CSS colour — set it to match whatever the carousel sits on.

```html
<v-infinite-carousel mask></v-infinite-carousel>

<v-infinite-carousel :mask="{ size: 80, color: 'surface' }"></v-infinite-carousel>
```

#### Arrows

`show-arrows` overlays previous and next controls, and `hover` reveals them on pointer hover or keyboard focus. One click moves the content by `shift-distance`, which takes any CSS length — percentages resolve against the visible area.

<ExamplesExample file="v-infinite-carousel/prop-shift-distance" />

### Slots

#### Custom arrows

Use the `prev` and `next` slots to replace the default buttons. Each receives the props the default button would have used.

<ExamplesExample file="v-infinite-carousel/slot-arrows" />

### Examples

The following are a collection of examples that demonstrate more advanced capabilities of `v-infinite-carousel`.

#### Logo strip

A common use for an infinite carousel is an endless row of logos or partner names.

<ExamplesExample file="v-infinite-carousel/misc-logo-strip" />
