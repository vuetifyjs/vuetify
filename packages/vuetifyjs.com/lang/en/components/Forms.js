export default {
  header: 'Form',
  headerText: 'When it comes to form validation, Vuetify has a multitude of integrations and baked in functionality. Want to use a 3rd party validation plugin? Out of the box you can use Vee-validate and Vuelidate.',
  components: ['v-form'],
  examples: [{
    basicValidation: {
      header: 'VForm - Basic validation',
      desc: ''
    },
    validationWithSubmitAndClear: {
      header: 'VForm - Validation with submit & clear',
      desc: ''
    },
    vuelidate: {
      header: 'Vuelidate',
      desc: ''
    },
    veeValidate: {
      header: 'Vee-validate',
      desc: 'Vee-validate is another validation plugin that allows you to check your forms. One caveat is that you must add the **type="checkbox"** to properly validate a `v-checkbox` when using the **value** prop.'
    }
  }],
  props: {
    lazyValidation: 'If enabled, **value** will always be _true_ unless there are visible validation errors. You can still call `validate()` to manually trigger validation'
  }
}
