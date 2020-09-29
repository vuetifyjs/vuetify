---
meta:
  title: Form component
  description: The form component provides a wrapper that makes it easy to process and control validation states of input components.
  keywords: forms, vuetify form component, vue form component, form validation
related:
  - /components/selects/
  - /components/selection-controls/
  - /components/text-fields/
---

# Forms

When it comes to form validation, Vuetify has a multitude of integrations and baked in functionality. Want to use a 3rd party validation plugin? Out of the box you can use [Vee-validate](https://github.com/baianat/Vee-validate) and [vuelidate](https://github.com/vuelidate/vuelidate).

<promoted-ad slug="vuemastery-forms" />

## Usage

The internal `v-form` component makes it easy to add validation to form inputs. All input components have a **rules** prop which takes an array of functions. These functions allow you to specify conditions in which the field is _valid_ or _invalid_. Whenever the value of an input is changed, each function in the array will receive the new value. If a function returns false or a string, validation has failed.

<example file="v-form/usage" />

## API

- [v-form](/api/v-form)

## Examples

### Props

#### Rules

Rules allow you to apply custom validation on all form components. These are validated sequentially and will display a **maximum** of 1 error at a time, so make sure you order your rules accordingly.

<example file="v-form/prop-rules" />

### Misc

#### Validation with submit & clear

The `v-form` component has **three** functions that can be accessed by setting a _ref_ on the component. A ref allows us to access internal methods on a component, for example, `<v-form ref="form">`. **this.$refs.form.validate()** will validate all inputs and return if they are all valid or not. **this.$refs.form.reset()** will clear all inputs and reset their validation errors. **this.$refs.form.resetValidation()** will only reset input validation and not alter their state.

<example file="v-form/misc-validation-with-submit-and-clear" />

#### Vee-validate

**vee-validate** is a template Based Validation Framework for Vue.js. [Documentation](https://logaretm.github.io/vee-validate/)

<example file="v-form/misc-vee-validate" />

#### Vuelidate

**vuelidate** is a simple, lightweight model-based validation for Vue.js. [Documentation](https://vuelidate.netlify.com/)

<example file="v-form/misc-vuelidate" />

<backmatter />
