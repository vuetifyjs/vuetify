---
nav: Images
meta:
  title: Image component
  description: The image component provides a flexible interface for displaying different types of images.
  keywords: images, vuetify image component, vue image component
related:
  - /components/grids
  - /components/aspect-ratios
  - /components/parallax
---

# Images

The `v-img` component is packed with features to support rich media. Combined with the [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader), you can add dynamic progressive images to provide a better user experience.

----

## Usage

`v-img` component is used to display a responsive image with lazy-load and placeholder.

<usage name="v-img" />

<entry />

## API

| Component | Description |
| - | - |
| [v-img](/api/v-img/) | Primary Component |

<api-inline hide-links />

## Caveats

<alert type="warning">

  The **lazy-src** property has no effect unless either **height** or **aspect-ratio** are provided. This is because
  the image container needs a non-zero height in order for the temporary image to be shown.

</alert>

## Examples

### Props

#### Cover

If the provided aspect ratio doesn't match that of the actual image, the default behavior is to fill as much space as possible without cropping. To fill the entire available space use the `cover` prop.

<example file="v-img/prop-cover" />

#### Height

`v-img` will automatically grow to the size of its `src`, preserving the correct aspect ratio. You can limit this with the `height` and `max-height` props.

<example file="v-img/prop-max-height" />

### Slots

#### Placeholder

`v-img` has a special `placeholder` slot for placeholder to display while image's loading. Note: the example below has bad src which won't load for you to see placeholder.

<example file="v-img/slot-placeholder" />

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

<example file="v-img/misc-grid" />

#### Complex Grid Layout

Build a more complex picture gallery layout using `flex-box` classes.

<example file="v-img/complex-grid" />
