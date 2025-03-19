---
meta:
  nav: Forms
  title: Form component
  description: The form component provides a wrapper that makes it easy to process and control validation states of input components.
  keywords: forms, vuetify form component, vue form component, form validation
related:
  - /components/selects/
  - /components/switches/
  - /components/text-fields/
features:
  label: 'C: VForm'
  report: true
  github: /components/VForm/
---

# Forms

Vuetify offers a simple built-in form validation system based on functions as rules, making it easy for developers to get set up quickly.

<PageFeatures />

## Usage

The `v-form` component makes it easy to add validation to form inputs. All input components have a **rules** prop that can be used to specify conditions in which the input is either *valid* or *invalid*.

::: tip

If you prefer using a 3rd party validation plugin, we provide [examples](#vee-validate) further down the page for integrating both [Vee-validate](https://github.com/baianat/Vee-validate) and [vuelidate](https://github.com/vuelidate/vuelidate) validation libraries.

:::

Whenever the value of an input is changed, each rule receives a new value and is re-evaluated. If a rule returns `false` or a `string`, validation has failed and the `string` value is presented as an error message.

<ExamplesExample file="v-form/usage" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-form](/api/v-form/) | Primary Component |

<ApiInline hide-links />

## Rules

Rules allow you to apply custom validation on all form components. These are validated sequentially, and components display a *maximum* of 1 error at a time; so make sure you order your rules accordingly.

The most basic of rules is a simple function that checks if an input has a value or not; i.e. it makes it a required input.

<ExamplesExample file="v-form/rules-required" />

However, you can make rules as complicated as needed, even allowing for asynchronous input validation. In the example below, the input is checked against a fake API service that takes some time to respond. Wait for the `submit` event promise to resolve and see the validation in action.

<ExamplesExample file="v-form/rules-async" />

The submit event is a combination of a native `SubmitEvent` with a promise, so it can be `await`ed or used with `.then()` to get the result of the validation.
<br>
This also demonstrates the **validate-on** prop, which tells the `v-form` component when validation should happen. Here we set it to `'submit lazy'` so that we only call the API service when the button is clicked.

## Validation state

When rules run is controlled with the **validate-on** prop which accepts a string containing `input`, `blur`, `submit`, `invalid-input`, `eager`, or `lazy`.
<br>
`input`, `blur`, `submit`, and `eager` set when a validation error can first be displayed to the user, while `lazy` disables validation on mount (useful for async rules).
<br>
By default, all inputs run their validation rules when mounted but do not display errors to the user. Adding `eager` will display errors immediately, or `lazy` to disable this.
<br>
`eager` and `lazy` can be combined with other options but not each other, and both imply `input` on their own.
<br>
`invalid-input` behaves the same as `blur` unless the field is invalid, then it will run on input instead until validation passes again.

| `validate-on=` | `"input"` | `"blur"` | `"submit"` | `"invalid-input"` |   `"eager"`   | `"lazy"` |
|----------------|:---------:|:--------:|:----------:|:-----------------:|:-------------:|:--------:|
| On mount       |     ✅     |    ✅     |     ✅      |         ✅         | ✅<sup>†</sup> |    ❌     |
| On input       |     ✅     |    ❌     |     ❌      |         ‡         |       *       |    *     |
| On blur        |     ✅     |    ✅     |     ❌      |         ✅         |       *       |    *     |
| On submit      |     ✅     |    ✅     |     ✅      |         ✅         |       ✅       |    ✅     |

<p class="text-caption">
* Uses the behavior of whatever it's combined with, the same as on="input" by default.
<br>
† Displays errors immediately on mount or reset.
<br>
‡ Only if the validation failed previously.
</p>

The form's current validation status is accessed using `v-model` or the submit event. It can be in one of three states:

- `true`: All inputs with validation rules have been successfully validated.
- `false`: At least one input has failed validation either by interaction or manual validation.
- `null`: At least one input has failed validation without interaction or has not been validated yet due to `lazy` validation.

This allows you to either check for any validation failure with `!valid`, or only errors that are displayed to the user with `valid === false`{.text-no-wrap}.

## Examples

### Props

#### Disabled

You can easily disable all input components in a `v-form` by setting the **disabled** prop.

<ExamplesExample file="v-form/prop-disabled" />

#### Fast fail

When the **fast-fail** prop is set, validation will short-circuit after the first invalid input is found. This can be useful if some of your rules are computationally heavy and can take a long time. In this example, notice how when the submit button is clicked, the second input does not show validation errors even though it does not satisfy the rules.

<ExamplesExample file="v-form/prop-fast-fail" />

### Misc

#### Exposed properties

The `v-form` component has a number of exposed properties that can be accessed by setting a **ref** on the component. A ref allows us to access internal methods on a component. You can find all of them on the API page, but some of the more commonly used ones are `validate()`, `reset()`, and `resetValidation()`.

The difference between `reset()` and `resetValidation()` is that the former resets both input values and validation state, while the latter only resets validation state.

<ExamplesExample file="v-form/misc-exposed" />

#### Vee-validate

**vee-validate** documentation can be found [here](https://vee-validate.logaretm.com/v4/).

<ExamplesExample file="v-form/misc-vee-validate" />

#### Vuelidate

**vuelidate** documentation can be found [here](https://vuelidate-next.netlify.app/).

<ExamplesExample file="v-form/misc-vuelidate" />
