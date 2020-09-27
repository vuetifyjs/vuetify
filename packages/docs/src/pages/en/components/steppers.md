---
meta:
  title: Stepper component
  description: The stepper component provides a linear progression process for gathering and displaying information to a user, similar to a form wizard.
  keywords: steppers, vuetify stepper component, vue stepper component
related:
  - /components/tabs/
  - /components/buttons/
  - /components/windows/
---

# Steppers

The `v-stepper` component displays progress through numbered steps.

<entry-ad />

## Usage

A stepper can be used for a multitude of scenarios, including shopping carts, record creation and more.

<example file="v-stepper/usage" />

## API

- [v-stepper](/api/v-stepper)
- [v-stepper-content](/api/v-stepper-content)
- [v-stepper-header](/api/v-stepper-header)
- [v-stepper-items](/api/v-stepper-items)
- [v-stepper-step](/api/v-stepper-step)

<!-- ## Sub-components

### v-stepper-content

v-stepper-content description

### v-stepper-header

v-stepper-header description

### v-stepper-items

v-stepper-header description

### v-stepper-step

v-stepper-step description -->

## Examples

### Props

#### Alternate label

Steppers also have an alternative label style which places the title under the step itself.

<example file="v-stepper/prop-alternate-label" />

#### Non linear

Non-linear steppers allow the user to move through your process in whatever way they choose.

<example file="v-stepper/prop-non-linear" />

#### Vertical

Vertical steppers move users along the y-axis and otherwise work exactly the same as their horizontal counterpart.

<example file="v-stepper/prop-vertical" />

### Misc

#### Alternative label with errors

The error state can also be applied to the alternative label style.

<example file="v-stepper/misc-alternate-error" />

#### Dynamic steps

Steppers can have their steps dynamically added or removed. If a currently active step is removed, be sure to account for this by changing the applied model.

<example file="v-stepper/misc-dynamic" />

#### Editable steps

An editable step can be selected by a user at any point and will navigate them to that step.

<example file="v-stepper/misc-editable" />

#### Errors

An error state can be displayed to notify the user of some action that must be taken.

<example file="v-stepper/misc-error" />

#### Horizontal steps

Horizontal steppers move users along the x-axis through the defined steps.

<example file="v-stepper/misc-horizontal" />

#### Linear steppers

Linear steppers will always move a user through your defined path.

<example file="v-stepper/misc-linear" />

#### Non editable steps

Non-editable steps force a user to process linearly through your process.

<example file="v-stepper/misc-non-editable" />

#### Optional steps

An optional step can be called out with sub-text.

<example file="v-stepper/misc-optional" />

#### Vertical errors

The same state also applies to Vertical steppers.

<example file="v-stepper/misc-vertical-error" />

<backmatter />
