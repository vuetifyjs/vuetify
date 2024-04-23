---
meta:
  nav: Steppers
  title: Stepper component
  description: The stepper component provides a linear progression process for gathering and displaying information to a user, similar to a form wizard.
  keywords: steppers, vuetify stepper component, vue stepper component
related:
  - /components/tabs/
  - /components/item-groups/
  - /components/windows/
features:
  figma: true
  github: /components/VStepper/
  label: 'C: VStepper'
  report: true
  spec: https://m1.material.io/components/steppers.html
---

# Steppers

The `v-stepper` component displays progress through numbered steps.

![Stepper Entry](https://cdn.vuetifyjs.com/docs/images/components/v-stepper/v-stepper-entry.png)

<PageFeatures />

::: success
This feature was introduced in [v3.4.0 (Blackguard)](/getting-started/release-notes/?version=v3.4.0)
:::

## Usage

A stepper can be used for a multitude of scenarios, including shopping carts, record creation and more.

<ExamplesUsage name="v-stepper" />

<PromotedEntry />

::: warning

Due to the massive differences in display and functionality between horizontal and vertical steppers, the **vertical** property is moving to a new component `v-stepper-vertical`.

:::

## API

| Component | Description |
| - | - |
| [v-stepper](/api/v-stepper/) | Primary Component |
| [v-stepper-actions](/api/v-stepper-actions/) | Actions for stepper |
| [v-stepper-header](/api/v-stepper-header/) | Container for stepper items |
| [v-stepper-item](/api/v-stepper-item/) | Primary Component |
| [v-stepper-window](/api/v-stepper-window/) | Window container for stepper window items |
| [v-stepper-window-item](/api/v-stepper-window-item/) | Items for stepper window |

<ApiInline hide-links />

## Anatomy

The recommended placement of elements inside of `v-stepper` is:

* Place `v-stepper-header` on top
* Place `v-stepper-window` or other forms of content below the stepper header
* Place `v-stepper-actions` after the stepper window

![Pending graphic](https://cdn.vuetifyjs.com/docs/images/components/v-stepper/v-stepper-anatomy.png "Stepper Anatomy")

| Element / Area | Description |
| - | - |
| 1. Container | The Stepper container holds all `v-stepper` components and is composed of 3 major parts: `v-stepper-header`, `v-stepper-window`, and `v-stepper-actions`. |
| 2. Header | The header is the container for the `v-stepper-item` components. |
| 3. Window | The window is the container for the `v-stepper-window-item` components. |
| 4. Actions (optional) | A content area that typically contains one or more [v-btn](/components/buttons) components |

## Guide

The `v-stepper` component provides a linear progression process for gathering and displaying information to a user, similar to a form wizard.

### Props

The `v-stepper` component has multiple props to customize its visual appearance and functionality.

#### Non editable steps

A basic stepper has non-editable steps that force a user to move linearly through your process.

<ExamplesExample file="v-stepper/misc-non-editable" />

#### Editable steps

An editable step can be selected by a user at any point and will navigate them to that step.

<ExamplesExample file="v-stepper/misc-editable" />

#### Alternate label

Steppers also have an alternative label style which places the title under the step itself.

<ExamplesExample file="v-stepper/prop-alternate-label" />

#### Linear steppers

Linear steppers will always move a user through your defined path.

<ExamplesExample file="v-stepper/misc-linear" />

#### Optional steps

An optional step can be called out with sub-text.

<ExamplesExample file="v-stepper/misc-optional" />

#### Items

The stepper component accepts an array of items similar to other components such as [v-list](/components/lists/) and [v-select](/components/selects/).

<ExamplesExample file="v-stepper/misc-horizontal" />

::: warning

If no value is provided, the stepper will assign a value based off of its index + 1

:::

#### Mobile

Use the **mobile** prop to hide the title and subtitle of the `v-stepper-item` component.

<ExamplesExample file="v-stepper/prop-mobile" />

#### Errors

An error state can be displayed to notify the user of some action that must be taken.

<ExamplesExample file="v-stepper/misc-error" />

#### Dynamic steps

Steppers can have their steps dynamically added or removed. If a currently active step is removed, be sure to account for this by changing the applied model.

<ExamplesExample file="v-stepper/misc-dynamic" />

#### Alternative label with errors

The error state can also be applied to the alternative label style.

<ExamplesExample file="v-stepper/misc-alternate-error" />

#### Non linear

Non-linear steppers allow the user to move through your process in whatever way they choose.

<ExamplesExample file="v-stepper/prop-non-linear" />
