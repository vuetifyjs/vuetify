---
meta:
  nav: Progress circular
  title: Progress circular component
  description: The progress circular component is useful for displaying a visual indicator of numerical data in a circle.
  keywords: progress circular, vuetify progress circular component, vue progress circular component, circular progress
related:
  - /components/cards/
  - /components/progress-linear/
  - /components/lists/
features:
  github: /components/VProgressCircular/
  label: 'C: VProgressCircular'
  report: true
  spec: https://m2.material.io/components/progress-indicators
---

# Progress circular

The `v-progress-circular` component is used to convey data circularly to users. It also can be put into an indeterminate state to portray loading.

<PageFeatures />

## Usage

In its simplest form, v-progress-circular displays a circular progress bar. Use the value prop to control the progress.

<ExamplesUsage name="v-progress-circular" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-progress-circular](/api/v-progress-circular/) | Primary Component |

<ApiInline hide-links />

## Examples

### Props

#### Color

Alternate colors can be applied to `v-progress-circular` using the `color` prop.

<ExamplesExample file="v-progress-circular/prop-color" />

#### Indeterminate

Using the `indeterminate` prop, a `v-progress-circular` continues to animate indefinitely.

<ExamplesExample file="v-progress-circular/prop-indeterminate" />

#### Rotate

The `rotate` prop gives you the ability to customize the `v-progress-circular`'s origin.

<ExamplesExample file="v-progress-circular/prop-rotate" />

#### Size and Width

The `size` and `width` props allow you to easily alter the size and width of the `v-progress-circular` component.

<ExamplesExample file="v-progress-circular/prop-size-and-width" />

### Slots

#### Default

`default` slot can be used to replace the text inside the loader.

<ExamplesExample file="v-progress-circular/prop-slot-default" />
