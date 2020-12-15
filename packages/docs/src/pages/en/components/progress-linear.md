---
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

The `v-progress-linear` component is used to convey data visually to users. They can also represent an indeterminate amount, such as loading or processing.

<entry-ad />

## Usage

In its simplest form, `v-progress-linear` displays a horizontal progress bar. Use the **value** prop to control the progress.

<example file="v-progress-linear/usage" />

## API

- [v-progress-linear](/api/v-progress-linear)

## Examples

### Props

#### Buffer value

A buffer state represents two values simultaneously. The primary value is controlled by **v-model**, whereas the buffer is controlled by the **buffer-value** prop.

<example file="v-progress-linear/prop-buffer-value" />

#### Colors

You can also set the color using the props **color** and **background-color**.

<example file="v-progress-linear/prop-colors" />

#### Indeterminate

Using the **indeterminate** prop, `v-progress-linear` continuously animates.

<example file="v-progress-linear/prop-indeterminate" />

#### Reversed

Displays reversed progress (right to left in LTR mode and left to right in RTL).

<example file="v-progress-linear/prop-reverse" />

#### Rounded

The **rounded** prop is an alternative style that adds a border radius to the `v-progress-linear` component.

<example file="v-progress-linear/prop-rounded" />

#### Stream

The **stream** property works with **buffer-value** to convey to the user that there is some action taking place. You can use any combination of **buffer-value** and **value** to achieve your design.

<example file="v-progress-linear/prop-stream" />

#### Striped

This applies a striped background over the value portion of the `v-progress-linear`.

<example file="v-progress-linear/prop-striped" />

#### Query

The **query** props value is controlled by the truthiness of indeterminate, while the **query** prop set to true.

<example file="v-progress-linear/prop-query" />

### Slots

#### Default

The `v-progress-linear` component will be responsive to user input when using **v-model**. You can use the default slot or bind a local model to display inside of the progress. If you are looking for advanced features on a linear type component, check out [v-slider](/components/sliders).

<example file="v-progress-linear/slot-default" />

### Misc

#### Determinate

The progress linear component can have a determinate state modified by **v-model**.

<example file="v-progress-linear/misc-determinate" />

#### File loader

The `v-progress-linear` component is good for translating to the user that they are waiting for a response.

<example file="v-progress-linear/misc-file-loader" />

#### Toolbar loader

Using the **absolute** prop we are able to position the `v-progress-linear` component at the bottom of the `v-toolbar`. We also use the **active** prop which allows us to control the visibility of the progress.

<example file="v-progress-linear/misc-toolbar-loader" />

<backmatter />
