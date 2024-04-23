---
meta:
  nav: Carousels
  title: Carousel component
  description: The carousel component is used to cycle through visual content such as images or slides of text.
  keywords: carousels, vuetify carousel component, vue carousel component
related:
  - /components/parallax/
  - /components/images/
  - /components/windows/
features:
  github: /components/VCarousel/
  label: 'C: VCarousel'
  report: true
---

# Carousels

The `v-carousel` component is used to display large numbers of visual content on a rotating timer.

<!-- ![carousel Entry](https://cdn.vuetifyjs.com/docs/images/components-temp/v-carousel/v-carousel-entry.png) -->

<PageFeatures />

## Usage

The `v-carousel` component expands upon `v-window` by providing additional features targeted at displaying images.

<ExamplesUsage name="v-carousel" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-carousel](/api/v-carousel/) | Primary component |
| [v-carousel-item](/api/v-carousel-item/) | Sub-component used for displaying the `v-carousel` state |

<ApiInline hide-links />

## Examples

### Props

#### Custom delimiters

Use any available icon as your carousel's slide delimiter.

<ExamplesExample file="v-carousel/prop-custom-icons" />

<!-- #### Custom transition

The `v-carousel-item` component can have its **transition/reverse-transition** changed.

<ExamplesExample file="v-carousel/prop-custom-transition" /> -->

#### Cycle

With the **cycle** prop you can have your slides automatically transition to the next available every 6s (default).

<ExamplesExample file="v-carousel/prop-cycle" />

#### Hide controls

You can hide the carousel navigation controls with `:show-arrows="false"`. Or you can make them only appear on hover with `show-arrows="hover"`.

<ExamplesExample file="v-carousel/prop-hide-controls" />

#### Customized arrows

Arrows can be customized by using **prev** and **next** slots.

<ExamplesExample file="v-carousel/slots-next-prev" />

#### Hide delimiters

You can hide the bottom controls with **hide-delimiters** prop.

<ExamplesExample file="v-carousel/prop-hide-delimiters" />

#### Progress

You can show a linear progress bar with the **progress** prop. It will indicate how far into the cycle the carousel currently is.

<ExamplesExample file="v-carousel/prop-progress" />

#### Model

You can control carousel with **v-model**.

<ExamplesExample file="v-carousel/prop-model" />
