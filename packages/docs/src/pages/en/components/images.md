---
meta:
  nav: Images
  title: Image component
  description: The image component provides a flexible interface for displaying different types of images.
  keywords: images, vuetify image component, vue image component
related:
  - /components/grids
  - /components/aspect-ratios
  - /components/parallax
features:
  github: /components/VImg/
  label: 'C: VImg'
  report: true
---

# Images

The `v-img` component is packed with features to support rich media. Combined with the [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader), you can add dynamic progressive images to provide a better user experience.

<PageFeatures />

## Usage

`v-img` component is used to display a responsive image with lazy-load and placeholder.

<ExamplesUsage name="v-img" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-img](/api/v-img/) | Primary Component |

<ApiInline hide-links />

## Caveats

::: warning
  The **lazy-src** property has no effect unless either **height** or **aspect-ratio** are provided. This is because
  the image container needs a non-zero height in order for the temporary image to be shown.
:::

## Examples

### Props

#### Cover

If the provided aspect ratio doesn't match that of the actual image, the default behavior is to fill as much space as possible without cropping. To fill the entire available space use the `cover` prop.

<ExamplesExample file="v-img/prop-cover" />

#### Height

`v-img` will automatically grow to the size of its `src`, preserving the correct aspect ratio. You can limit this with the `height` and `max-height` props.

<ExamplesExample file="v-img/prop-max-height" />

### Slots

#### Placeholder

`v-img` has a special `placeholder` slot for placeholder to display while image's loading. Note: the example below has bad src which won't load for you to see placeholder.

<ExamplesExample file="v-img/slot-placeholder" />

#### Error

`v-img` has an `error` slot that can be used to display alternative content if an error occurs while loading your source image. A common use for this slot is to load a fallback image if your original image is not available.

<ExamplesExample file="v-img/slot-error" />

### Misc

#### Future image formats

By default `v-img` will render a basic `<img>` element. If you want to use `.webp` images with a fallback for older browsers, you can pass a list of `<source>` elements to the `sources` slot:

```html
<v-img src="image.jpeg">
  <template #sources>
    <source srcset="image.webp">
  </template>
</v-img>
```

This will behave similarly to:

```html
<picture>
  <source srcset="image.webp">
  <img src="image.jpeg">
</picture>
```

`srcset` and `media` attributes can also be used for art direction or alternate sizes, see [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) for more.

#### Grid

You can use `v-img` to make, for example, a picture gallery.

<ExamplesExample file="v-img/misc-grid" />

#### Complex Grid Layout

Build a more complex picture gallery layout using `flex-box` classes.

<ExamplesExample file="v-img/complex-grid" />
