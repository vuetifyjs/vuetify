---
nav: Progress linear
meta:
  title: Progress linear component
  description: The progress-linear component is useful for displaying a visual indicator of numerical data in a straight line.
  keywords: progress linear, vuetify progress linear component, vue progress linear component, linear progress
related:
  - /components/cards/
  - /components/progress-circular/
  - /components/lists/
---

# Progress linear

The `v-progress-linear` component is used to convey data visually to users. It supports both indeterminate amounts, such as loading or processing, and finite amounts of progress (including separate buffer values).

<entry />

## Usage

In its simplest form, `v-progress-linear` displays a horizontal progress bar. Use the **value** prop to control the progress.

<usage name="v-progress-linear" />

## API

<api-inline />

## Examples

### Props

#### Buffering

The primary value is controlled by **v-model**, whereas the buffer is controlled by the **buffer-value** prop.

<example file="v-progress-linear/prop-buffer-value" />

#### Colors

You can set the colors of the progresss bar using the props **color** and **background-color**.

<example file="v-progress-linear/prop-colors" />

#### Indeterminate

Using the **indeterminate** prop, `v-progress-linear` continuously animates.

<example file="v-progress-linear/prop-indeterminate" />

#### Reversed

Displays reversed progress. The component also has RTL support, such that a progress bar in right-to-left mode with **reverse** prop enabled will display left-to-right.

<example file="v-progress-linear/prop-reverse" />

#### Rounded

The **rounded** prop is used to apply a border radius to the `v-progress-linear` component.

<example file="v-progress-linear/prop-rounded" />

<alert type="info">

  Use the **rounded-bar** property to add a border-radius to the inner edges of value bar. By default, the value bar's border-radius is equal to the default _border-radius_ of your application unless a different value is provided by the **rounded** prop or SASS variable.

</alert>

#### Stream

The **stream** property works with **buffer-value** to convey to the user that there is some action taking place.

<example file="v-progress-linear/prop-stream" />

#### Striped

This applies a striped background over the value portion of the `v-progress-linear`. This prop has no effect when using **inderminate**.

<example file="v-progress-linear/prop-striped" />

### Slots

#### Default

The `v-progress-linear` component will be responsive to user input when using **v-model**. You can use the default slot or bind a local model to display inside of the progress. If you are looking for advanced features on a linear type component, check out [v-slider](/components/sliders).

<example file="v-progress-linear/slot-default" />

### Misc

#### Determinate

The progress linear component can have a determinate state modified by **v-model**.

<example file="v-progress-linear/misc-determinate" />

#### File loader

The `v-progress-linear` component is good for communicating to the user that they are waiting for a response.

<example file="v-progress-linear/misc-file-loader" />

#### Toolbar loader

Using the **absolute** prop we are able to position the `v-progress-linear` component at the bottom of the `v-toolbar`. We also use the **active** prop which allows us to control the visibility of the progress.

<example file="v-progress-linear/misc-toolbar-loader" />

<backmatter />
