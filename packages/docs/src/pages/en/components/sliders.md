---
meta:
  title: Slider component
  description: The slider component can be used as an alternative visualization instead of a number input.
  keywords: sliders, vuetify slider component, vue slider component
nav: Sliders
related:
  - /components/forms/
  - /components/selects/
  - /components/range-sliders/
---

# Sliders

The `v-slider` component can be used as an alternative visualization instead of a number input.

## Usage

Sliders reflect a range of values along a track, from which users may select a single value. They are ideal for adjusting settings such as volume, brightness, or applying image filters.

<usage name="v-slider" />

<entry />

## API

| Component | Description |
| - | - |
| [v-slider](/api/v-slider/) | Primary Component |

<api-inline hide-links />

## Examples

### Props

#### Colors

You can set the colors of the slider using the props **color**, **track-color** and **thumb-color**.

<example file="v-slider/prop-colors" />

#### Disabled

You cannot interact with **disabled** sliders.

<example file="v-slider/prop-disabled" />

#### Step

Using the **step** prop you can control the precision of the slider, and how much it should move each step.

<example file="v-slider/prop-step" />

#### Icons

You can add icons to the slider with the **append-icon** and **prepend-icon** props. With `@click:append` and `@click:prepend` you can trigger a callback function when click the icon.

<example file="v-slider/prop-icons" />

#### Min and max

You can set **min** and **max** values of sliders.

<example file="v-slider/prop-min-and-max" />

#### Readonly

You cannot interact with **readonly** sliders, but they look as ordinary ones.

<example file="v-slider/prop-readonly" />

#### Thumb

You can display a thumb label while sliding or always with the **thumb-label** prop . It can have a custom color by setting **thumb-color** prop and a custom size with the **thumb-size** prop.

<example file="v-slider/prop-thumb" />

#### Ticks

Tick marks represent predetermined values to which the user can move the slider.

<example file="v-slider/prop-ticks" />

<!-- #### Validation

Vuetify includes simple validation through the **rules** prop. The prop accepts a mixed array of types `function`, `boolean` and `string`. When the input value changes, each element in the array will be validated. Functions pass the current v-model as an argument and must return either `true` / `false` or a `string` containing an error message.

<example file="v-slider/prop-validation" /> -->

#### Vertical sliders

You can use the **direction** prop to switch sliders to a vertical orientation. If you need to change the height of the slider, use css.

<example file="v-slider/prop-vertical" />

### Slots

#### Append and prepend

Use slots such as `append` and `prepend` to easily customize the `v-slider` to fit any situation.

<example file="v-slider/slot-append-and-prepend" />

#### Append text field

Sliders can be combined with other components in its `append` slot, such as `v-text-field`, to add additional functionality to the component.

<example file="v-slider/slot-append-text-field" />
