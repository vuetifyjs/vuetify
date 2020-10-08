---
meta:
  title: Carousel component
  description: The carousel component is used to cycle through visual content such as images or slides of text.
  keywords: carousels, vuetify carousel component, vue carousel component
related:
  - /components/parallax/
  - /components/images/
  - /components/windows/
---

# Carousels

The `v-carousel` component is used to display large numbers of visual content on a rotating timer.

<entry-ad />

## Usage

The `v-carousel` component expands upon `v-window` by providing additional features targeted at displaying images.

<example file="v-carousel/usage" />

## API

- [v-carousel](/api/v-carousel)
- [v-carousel-item](/api/v-carousel-item)

<!-- ## Sub-components

### v-carousel-item

v-carousel-item description -->

## Examples

### Props

#### Custom delimiters

Use any available icon as your carousel's slide delimiter.

<example file="v-carousel/prop-custom-icons" />

#### Custom transition

The `v-carousel-item` component can have its **transition/reverse-transition** changed.

<example file="v-carousel/prop-custom-transition" />

#### Cycle

With the **cycle** prop you can have your slides automatically transition to the next available every 6s (default).

<example file="v-carousel/prop-cycle" />

#### Hide controls

You can hide the carousel navigation controls with `:show-arrows="false"`.

<example file="v-carousel/prop-hide-controls" />

#### Hide delimiters

You can hide the bottom controls with `hide-delimiters` prop.

<example file="v-carousel/prop-hide-delimiters" />

#### Model

You can control carousel with model.

<example file="v-carousel/prop-model" />

<backmatter />
