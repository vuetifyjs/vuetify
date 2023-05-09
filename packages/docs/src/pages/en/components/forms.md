---
nav: Forms
meta:
  title: Form component
  description: The form component provides a wrapper that makes it easy to process and control validation states of input components.
  keywords: forms, vuetify form component, vue form component, form validation
related:
  - /components/selects/
  - /components/switches/
  - /components/text-fields/
---

# Forms

Vuetify offers a simple built-in form validation system based on functions as rules, making it easy for developers to get set up quickly. If you prefer using a 3rd party validation plugin, we also provide examples for integrating both [Vee-validate](https://github.com/baianat/Vee-validate) and [vuelidate](https://github.com/vuelidate/vuelidate).

<promoted slug="vuemastery-forms" />

## Usage

The `v-form` component makes it easy to add validation to form inputs. All input components have a **rules** prop that can be used to specify conditions in which the input is either *valid* or *invalid*.

Whenever the value of an input is changed, each rule will receive the new value and be re-evaluated. If a rule returns `false` or a `string`, validation has failed and the `string` value will be presented as an error message.

<example file="v-form/usage" />

<entry />

## API

| Component | Description |
| - | - |
| [v-form](/api/v-form/) | Primary Component |

<api-inline hide-links />

## Rules

Rules allow you to apply custom validation on all form components. These are validated sequentially, and components will display a *maximum* of 1 error at a time, so make sure you order your rules accordingly.

The most basic of rules is a simple function that checks if an input has a value or not, i.e. it makes it a required input.

<example file="v-form/rules-required" />

However, you can make rules as complicated as needed, even allowing for asynchronous input validation. In the example below, the input is checked against a fake API service that takes some time to respond. Wait for the `submit` event promise to resolve and see the validation in action.

<example file="v-form/rules-async" />

This also demonstrates the **validate-on** prop, which tells the `v-form` component when validation should happen. Here we set it to `'submit'` so that we only call the API service when the button is clicked.

## Validation state

By default, all inputs run their validation rules when mounted. This means that inputs failing validation are mounted in an error state. To avoid this, add [lazy](/api/v-form/#props-lazy) to the **validate-on** prop.

The following example contains a [v-text-field](/components/text-fields/) with a rule that requires the input to have a value. To avoid being mounted in an error state, we set **validate-on** to `"input lazy"`:

```html
<template>
  <v-form validate-on="input lazy">
    <v-text-field
      v-model="name"
      :rules="[ v => !!v || 'Name is required' ]"
      label="Name"
      required
    ></v-text-field>
  </v-form>
</template>

<script>
  export default {
    data: () => ({ name: '' }),
  }
</script>
```

The table below is a list of all available validation states:

| Validate On | Description |
| - | - |
| **lazy** | Validation runs on mount but does not display errors. |
| **input** | Validation runs when the input's value changes. |
| **blur** | Validation runs when the input loses focus. |
| **submit** | Validation runs when the form is submitted. |

<alert type="warning">

Note that **lazy** does not prevent input validation on mount. It only suppresses the error state.

</alert>

## Examples

### Props

#### Disabled

You can easily disable all input components in a `v-form` by setting the **disabled** prop.

<example file="v-form/prop-disabled" />

#### Fast fail

When the **fast-fail** prop is set, validation will short-circuit after the first invalid input is found. This can be useful if some of your rules are computationally heavy and can take a long time. In this example, notice how when the submit button is clicked, the second input does not show validation errors even though it does not satisfy the rules.

<example file="v-form/prop-fast-fail" />

### Misc

#### Exposed properties

The `v-form` component has a number of exposed properties that can be accessed by setting a **ref** on the component. A ref allows us to access internal methods on a component. You can find all of them on the API page, but some of the more commonly used ones are `validate()`, `reset()`, and `resetValidation()`.

The difference between `reset()` and `resetValidation()` is that the former resets both input values and validation state, while the latter only resets validation state.

<example file="v-form/misc-exposed" />

#### Vee-validate

**vee-validate** documentation can be found [here](https://vee-validate.logaretm.com/v4/).

<example file="v-form/misc-vee-validate" />

#### Vuelidate

**vuelidate** documentation can be found [here](https://vuelidate-next.netlify.app/).

<example file="v-form/misc-vuelidate" />
