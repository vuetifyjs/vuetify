---
meta:
  nav: Progress linear
  title: Progress linear component
  description: The progress-linear component is useful for displaying a visual indicator of numerical data in a straight line.
  keywords: progress linear, vuetify progress linear component, vue progress linear component, linear progress
related:
  - /components/cards/
  - /components/progress-circular/
  - /components/lists/
features:
  figma: true
  github: /components/VProgressLinear/
  label: 'C: VProgressLinear'
  report: true
  spec: https://m2.material.io/components/progress-indicators
---

# Progress linear

The `v-progress-linear` component is used to convey data visually to users. It supports both indeterminate amounts, such as loading or processing, and finite amounts of progress (including separate buffer values).

<PageFeatures />

## Usage

In its simplest form, `v-progress-linear` displays a horizontal progress bar. Use the **value** prop to control the progress.

<ExamplesUsage name="v-progress-linear" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-progress-linear](/api/v-progress-linear/) | Primary Component |

<ApiInline hide-links />

## Examples

### Props

#### Buffering

The primary value is controlled by **v-model**, whereas the buffer is controlled by the **buffer-value** prop.

<ExamplesExample file="v-progress-linear/prop-buffer-value" />

#### Colors

You can set the colors of the progress bar using the props **color** and **bg-color**.

<ExamplesExample file="v-progress-linear/prop-colors" />

#### Indeterminate

Using the **indeterminate** prop, `v-progress-linear` continuously animates.

<ExamplesExample file="v-progress-linear/prop-indeterminate" />

#### Reversed

Displays reversed progress. The component also has RTL support, such that a progress bar in right-to-left mode with **reverse** prop enabled will display left-to-right.

<ExamplesExample file="v-progress-linear/prop-reverse" />

#### Rounded

The **rounded** prop is used to apply a border radius to the `v-progress-linear` component.

<ExamplesExample file="v-progress-linear/prop-rounded" />

::: info
  Use the **rounded-bar** property to add a border-radius to the inner edges of value bar. By default, the value bar's border-radius is equal to the default _border-radius_ of your application unless a different value is provided by the **rounded** prop or SASS variable.
:::

#### Stream

The **stream** property works with **buffer-value** to convey to the user that there is some action taking place.

<ExamplesExample file="v-progress-linear/prop-stream" />

#### Striped

This applies a striped background over the value portion of the `v-progress-linear`. This prop has no effect when using **indeterminate**.

<ExamplesExample file="v-progress-linear/prop-striped" />

### Slots

#### Default

The `v-progress-linear` component will be responsive to user input when using **v-model**. You can use the default slot or bind a local model to display inside of the progress. If you are looking for advanced features on a linear type component, check out [v-slider](/components/sliders).

<ExamplesExample file="v-progress-linear/slot-default" />

### Misc

#### Determinate

The progress linear component can have a determinate state modified by **v-model**.

<ExamplesExample file="v-progress-linear/misc-determinate" />

#### File loader

The `v-progress-linear` component is good for communicating to the user that they are waiting for a response.

<ExamplesExample file="v-progress-linear/misc-file-loader" />

#### Toolbar loader

Using the **absolute** prop we are able to position the `v-progress-linear` component at the bottom of the `v-toolbar`. We also use the **active** prop which allows us to control the visibility of the progress.

<ExamplesExample file="v-progress-linear/misc-toolbar-loader" />

#### Buffer color and opacity

::: success

This feature was introduced in [v3.6.0 (Nebula)](/getting-started/release-notes/?version=v3.6.0)

:::

The buffer color and opacity can be controlled using the **buffer-color** and **buffer-opacity** props. This enables you to make multi colored progress bars.

<ExamplesExample file="v-progress-linear/misc-buffer-color" />
