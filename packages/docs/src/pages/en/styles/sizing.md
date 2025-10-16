---
meta:
  title: Sizing
  description: Modify the dimension of block level elements using one of the Vuetify sizing utility classes.
  keywords: css height, css width, sizing elements, element dimensions
related:
  - /styles/content/
  - /styles/flex/
  - /styles/text-and-typography/
features:
  report: true
---

# Sizing

Sizing utility classes are used to modify the dimensions of an element.

<PageFeatures />

| Class        | Description      |
| ------------ |------------------|
| **h-auto**   | height: auto   |
| **h-screen** | height: 100vh |
| **h-0**      | height: 0      |
| **h-25**     | height: 25%    |
| **h-50**     | height: 50%    |
| **h-75**     | height: 75%    |
| **h-100**    | height: 100%   |
| **fill-height** | height: 100% |
| **height-screen** | height: 100dvh |
| **w-auto**   | width: auto    |
| **w-0**      | width: 0       |
| **w-33**     | width: 33% |
| **w-25**     | width: 25%     |
| **w-50**     | width: 50%     |
| **w-66**     | width: 66% |
| **w-75**     | width: 75%     |
| **w-100**    | width: 100% { style="max-height: 420px;" fixed-header }  |

<PromotedEntry />

## Usage

The sizing utility classes allow you to quickly style the dimensions of any element. These classes can be used to apply the `height` and `width` properties to an element.

### Height

Specify the `height` property of **block level elements** with a utility class. The following classes are applied using the format `.{prefix}-{size}` ; where _prefix_ is **h** and _size_ is the value.

<ExamplesExample file="sizing/height" />

### Width

Specify the `width` property of **block level elements** with a utility class. The following classes are applied using the format `.{prefix}-{size}` ; where _prefix_ is **w** and _size_ is the value.

| Class        | Description     |

<ExamplesExample file="sizing/width" />

## SASS Variables

You can also use the following SASS variables to customize the generated height and width classes:

```scss { resource="src/styles/settings.scss" }
@use 'vuetify/settings' with (
  $utilities: (
    "fill-height": (
      property: height,
      class: fill,
      values: (
        height: 100%
      )
    ),
    "height": (
      property: height,
      responsive: true,
      class: h,
      values: (
        auto: auto,
        screen: 100vh,
        0: 0,
        25: 25%,
        50: 50%,
        75: 75%,
        100: 100%
      )
    ),
    "height-screen": (
      property: height,
      class: h,
      values: (
        screen: 100dvh
      )
    ),
    "width": (
      property: width,
      responsive: true,
      class: w,
      values: (
        auto: auto,
        0: 0,
        25: 25%,
        33: 33%,
        50: 50%,
        66: 66%,
        75: 75%,
        100: 100%
      )
    )
  )
);
```

Disable height/width class generation by setting the the fill-height, height, height-screen, and, width variables to **false**.

```scss { resource="src/styles/settings.scss" }
@use 'vuetify/settings' with (
  $utilities: (
    "fill-height": false,
    "height": false,
    "height-screen": false,
    "width": false
  )
);
```
