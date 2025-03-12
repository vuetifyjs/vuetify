---
meta:
  nav: Steppers Vertical
  title: Vertical Stepper component
  description: The vertical stepper component is a navigation element that guides users through a sequence of steps.
  keywords: vertical stepper, vuetify vertical stepper component, vue vertical stepper component
related:
  - /components/buttons/
  - /components/icons/
  - /styles/transitions/
features:
  report: true
---

# Vertical Steppers

The `v-stepper-vertical` component can be used as a navigation element that guides users through a sequence of steps.

<PageFeatures />

::: warning

This feature requires [v3.6.5](/getting-started/release-notes/?version=v3.6.5)

:::

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VStepperVertical } from 'vuetify/labs/VStepperVertical'

export default createVuetify({
  components: {
    VStepperVertical,
  },
})
```

## Usage

Vertical steppers allow users to complete a series of actions in step order.

<ExamplesUsage name="v-stepper-vertical" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-stepper-vertical](/api/v-stepper-vertical/) | Primary Component |

<ApiInline hide-links />

### Guide

The `v-stepper-vertical` is the vertical variant of the [v-stepper](/components/steppers/) component. It also extends functionality of [v-expansion-panels](/components/expansion-panels/).

#### Slots

The `v-stepper-vertical` component has several slots for customization.

##### Actions

Customize the flow of your stepper by hooking into the available **prev** and **next** slots.

<ExamplesExample file="v-stepper-vertical/slot-actions" />
