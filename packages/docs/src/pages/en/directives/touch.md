---
meta:
  nav: Touch
  title: Touch directive
  description: The touch directive provides an interface for responding to various user touch actions.
  keywords: touch, vuetify touch directive, vue touch directive, mobile touch directive
related:
  - /components/navigation-drawers/
  - /components/slide-groups/
  - /components/windows/
---

# Touch directive

The `v-touch` directive allows you to capture swipe gestures and apply directional callbacks.

<PageFeatures />

## Usage

On a mobile device, try swiping in various directions.

<ExamplesExample file="v-touch/usage" />

::: tip

`v-touch` attaches **passive** listeners and never calls `preventDefault`, so it cannot stop the browser from scrolling during a swipe. Set the CSS [touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action) property on the element to reserve the gesture—`touch-action: none` for vertical (up/down) swipes, or `touch-action: pan-y` to keep vertical page scrolling while capturing horizontal (left/right) swipes.

Alternatively, pass `options: { passive: false }` **and** call `originalEvent.preventDefault()` inside your `start` or `move` handler. `touch-action` is preferred, since non-passive listeners come at a scrolling performance cost.

:::

<PromotedEntry />

## API

| Directive                          | Description         |
|------------------------------------|---------------------|
| [v-touch](/api/v-touch-directive/) | The touch directive |

<ApiInline hide-links />

## Examples

### Directions

Only provide handlers for the directions you care about—here just **up** and **right**.

<ExamplesExample file="v-touch/misc-directions" />

### Once

The `options` object is passed straight to [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). Using `once` captures a single gesture and then detaches the listeners.

<ExamplesExample file="v-touch/option-once" />

### Tracking movement

The `start`, `move` and `end` handlers receive the raw touch data, useful for following a drag in real time.

<ExamplesExample file="v-touch/misc-tracking" />

### Right-to-left

Physical swipe directions do not flip with the locale, so map `left`/`right` to the logical start/end of your content based on the reading direction.

<ExamplesExample file="v-touch/misc-rtl" />

### Reactive bindings

The directive responds to changes in its binding, so you can enable, disable or swap handlers on the fly without remounting the element.

<ExamplesExample file="v-touch/misc-reactive" new-in="4.2.0" />
