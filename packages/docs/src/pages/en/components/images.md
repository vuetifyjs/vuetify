---
meta:
  title: Image component
  description: The image component provides a flexible interface for displaying different types of images.
  keywords: images, vuetify image component, vue image component
related:
  - /components/grids/
  - /components/aspect-ratios/
  - /components/parallax/
---

# Images

The `v-img` component is packed with features to support rich media. Combined with the [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader), you can add dynamic progressive images to provide a better user experience.

<entry-ad />

## Usage

`v-img` component is used to display a responsive image with lazy-load and placeholder.

<usage name="v-img" />

## API

- [v-img](/api/v-img)

## Caveats

<alert type="info">

  The `v-img` component uses the [v-intersect](/directives/intersect) directive which requires a [Polyfill](/directives/intersect#polyfill) for IE11 and Safari. If a browser that does not support this functionality is detected, the image will still load as normal.

</alert>

## Examples

### Props

#### Aspect ratio

You can set a fixed aspect ratio if you want to change aspect ratio of the image.

<example file="v-img/prop-aspect-ratio" />

#### Contain

If the provided aspect ratio doesn't match that of the actual image, the default behavior is to fill as much space as possible, clipping the sides of the image. Enabling the `contain` prop will prevent this, but will result in empty space at the sides.

<example file="v-img/prop-contain" />

#### Gradients

The `gradient` prop can be used to apply a simple gradient overlay to the image. More complex gradients should be written as a class on the content slot instead.

<example file="v-img/prop-gradient" />

#### Height

`v-img` will automatically grow to the size of its `src`, preserving the correct aspect ratio. You can limit this with the `height` and `max-height` props.

<example file="v-img/prop-max-height" />

### Slots

#### Placeholder

`v-img` has a special `placeholder` slot for placeholder to display while image's loading. Note: the example below has bad src which won't load for you to see placeholder.

<example file="v-img/slot-placeholder" />

### Misc

#### Grid

You can use `v-img` to make, for example, a picture gallery.

<example file="v-img/misc-grid" />

<backmatter />
