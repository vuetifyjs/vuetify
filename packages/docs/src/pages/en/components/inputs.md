---
meta:
  nav: Custom inputs
  title: Input component
  description: The input component is the baseline functionality for all of Vuetify's form components and provides a baseline for custom implementations.
  keywords: inputs, vuetify input component, vue input component
related:
  - /components/forms/
  - /components/selects/
  - /components/text-fields/
features:
  label: 'C: VInput'
  report: true
  github: /components/VInput/
---

# Inputs

The `v-input` component gives you a baseline to create your own custom inputs. It consists of a prepend/append slot, messages, validation, and a default slot.

<PageFeatures />

## Usage

`v-input` has 4 main areas. The prepended slot, the appended slot, the default slot, and messages. These make up the core logic shared between all form components.

<ExamplesExample file="v-input/usage" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-input](/api/v-input/) | Primary Component |
| [v-field](/api/v-field/) | Field container used by most text-like inputs |
| [v-validation](/api/v-validation/) | Validation state shared by input components |

<ApiInline hide-links />

## Caveats

::: warning

The `v-input` component is used as a wrapper for all of the Vuetify form controls. It does **NOT** inherit attributes as they are expected to be passed down to inner inputs.

:::

## Guide

### Building custom inputs

Most custom text-like inputs combine `v-input` and `v-field`. `v-input` owns validation, messages, and the outer prepend/append areas. `v-field` renders the label, loader, and field styling. Your control owns its value and must receive the attributes provided by the `v-field` default slot.

Pass the same model to `v-input` and to your control. Then forward `v-input` validation state to `v-field` so the label, details, disabled state, and error state stay in sync. The example below creates a custom text control with an outlined field and validation rules.

<ExamplesExample file="v-input/misc-custom-field" />

The `v-field` default slot provides `props` for the control, a `controlRef`, and `focus` and `blur` handlers. Bind `props` to the focusable control, assign `controlRef`, and call the handlers from the control's focus events. `v-field` slot state values are Vue refs, so use `.value` when reading them in template expressions or JavaScript.

`v-input` does not pass its attributes to the inner control automatically. Pass attributes such as `name`, `autocomplete`, and `aria-*` directly to your custom control.

## Examples

### Props

#### Error

As any validatable Vuetify component, `v-input` can be set to error state using **error** prop, messages can be added using **error-messages** prop. You can determine error messages count to show using **error-count** property.

#### Error count

You can add multiple errors to `v-input` using **error-count** property.

<ExamplesExample file="v-input/prop-error-count" />

<ExamplesExample file="v-input/prop-error" />

#### Hide details

When the **hide-details** prop is set to `auto` messages will be rendered only if there's a message (hint, error message etc) to display.

<ExamplesExample file="v-input/prop-hide-details" />

#### Hint

`v-input` can have **hint** which can tell user how to use the input (when focused). **persistent-hint** prop makes the hint visible always if no `error-messages` are displayed.

<ExamplesExample file="v-input/prop-hint" />

#### Loading

`v-input` has **loading** state which can be used, for example, for data loading indication. Note: `v-text-field` is used just for example.

<ExamplesExample file="v-input/prop-loading" />

#### Rules

You can add custom validation rules to `v-input` as functions returning `true` or an error message. Bind the same model to the custom control so `v-input` can validate it.

<ExamplesExample file="v-input/prop-rules" />

### Events

#### Slot clicks

`v-input` can have `click:append` and `click:prepend` events for its slots. Note: `v-text-field` is used just for example.

<ExamplesExample file="v-input/event-slot-clicks" />

### Slots

#### Append and prepend

`v-input` has `append` and `prepend` slots. You can place custom icons in them.

<ExamplesExample file="v-input/slot-append-and-prepend" />
