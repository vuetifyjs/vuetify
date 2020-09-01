---
meta:
  title: Range Slider component
  description: The range slider component is a better visualization of the number input. It is used for gathering a range of numerical user data.
  keywords: sliders, range, vuetify slider component, vuetify range slider component, vue slider component
related:
  - /components/forms/
  - /components/selects/
  - /components/sliders/
---

# Range Sliders

The `v-slider` component is a better visualization of the number input. It is used for gathering numerical user data.

<entry-ad />

## Usage

Sliders reflect a range of values along a bar, from which users may select a single value. They are ideal for adjusting settings such as volume, brightness, or applying image filters.

<usage name="v-range-slider" />

## API

- [v-range-slider](/api/v-range-slider)
- [v-slider](/api/v-slider)

## Examples

### Props

#### Disabled

You cannot interact with **disabled** sliders.

<example file="v-range-slider/prop-disabled" />

#### Min and max

You can set **min** and **max** values of sliders.

<example file="v-range-slider/prop-min-and-max" />

#### Step

`v-range-slider` can have steps other than 1. This can be helpful for some applications where you need to adjust values with more or less accuracy.

<example file="v-range-slider/prop-step" />

#### Vertical sliders

You can use the **vertical** prop to switch sliders to a vertical orientation. If you need to change the height of the slider, use css.

<example file="v-range-slider/prop-vertical" />

### Slots

#### Thumb label

Using the **tick-labels** prop along with the `thumb-label` slot, you can create a very customized solution.

<example file="v-range-slider/slot-thumb-label" />

<backmatter />
