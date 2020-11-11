---
meta:
  title: Slider component
  description: The slider component is a better visualization of the number input. It is used for gathering numerical user data.
  keywords: sliders, vuetify slider component, vue slider component
related:
  - /components/forms/
  - /components/selects/
  - /components/range-sliders/
---

# Sliders

The `v-slider` component is a better visualization of the number input. It is used for gathering numerical user data.

<entry-ad />

## Usage

Sliders reflect a range of values along a bar, from which users may select a single value. They are ideal for adjusting settings such as volume, brightness, or applying image filters.

<usage name="v-slider" />

## API

- [v-slider](/api/v-slider)
- [v-range-slider](/api/v-range-slider)

## Examples

### Props

#### Colors

You can set the colors of the slider using the props **color**, **track-color** and **thumb-color**.

<example file="v-slider/prop-colors" />

#### Disabled

You cannot interact with **disabled** sliders.

<example file="v-slider/prop-disabled" />

#### Discrete

Discrete sliders offer a thumb label that displays the exact current amount. Using the **step** prop you can disallow selecting values outside of steps.

<example file="v-slider/prop-discrete" />

#### Icons

You can add icons to the slider with the **append-icon** and **prepend-icon** props. With `@click:append` and `@click:prepend` you can trigger a callback function when click the icon.

<example file="v-slider/prop-icons" />

#### Inverse label

`v-slider` with **inverse-label** property displays label at the end of it.

<example file="v-slider/prop-inverse-label" />

#### Min and max

You can set **min** and **max** values of sliders.

<example file="v-slider/prop-min-and-max" />

#### Readonly

You cannot interact with **readonly** sliders, but they look as ordinary ones.

<example file="v-slider/prop-readonly" />

#### Step

`v-slider` can have steps other than 1. This can be helpful for some applications where you need to adjust values with more or less accuracy.

<example file="v-slider/prop-step" />

#### Thumb

You can display a thumb label while sliding or always with the **thumb-label** prop . It can have a custom color by setting **thumb-color** prop and a custom size with the **thumb-size** prop. With the **always-dirty** prop its color will never change, even when on the **`min** value.

<example file="v-slider/prop-thumb" />

#### Ticks

Tick marks represent predetermined values to which the user can move the slider.

<example file="v-slider/prop-ticks" />

#### Validation

Vuetify includes simple validation through the **rules** prop. The prop accepts an array of callbacks. While validating rules, the current v-model value will be passed to the callback. This callback should return either `true` or a `String`, the error message.

<example file="v-slider/prop-validation" />

#### Vertical sliders

You can use the **vertical** prop to switch sliders to a vertical orientation. If you need to change the height of the slider, use css.

<example file="v-slider/prop-vertical" />

### Slots

#### Append and prepend

Use slots such as `append` and `prepend` to easily customize the `v-slider` to fit any situation.

<example file="v-slider/slot-append-and-prepend" />

#### Append text field

Sliders can be combined with other components in its `append` slot, such as `v-text-field`, to add additional functionality to the component.

<example file="v-slider/slot-append-text-field" />

<backmatter />
