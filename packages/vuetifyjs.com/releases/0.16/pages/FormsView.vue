<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Forms',
          component: 'VForm',
          edit: 'FormView',
          desc: 'When it comes to form validation, Vuetify has a multitude of integrations and baked in functionality. Want to use a 3rd party validation plugin? Out of the box you can use Vee-validate and Vuelidate.',
          examples: [
            { header: "VForm - Basic validation", file: "forms/basic-validation", desc: '' },
            { header: "VForm - Validation w/ submit & clear", file: "forms/validation-with-submit-and-clear", desc: '' },
            { header: "Vuelidate", file: "forms/vuelidate", desc: '' },
            { header: "Vee-validate", file: "forms/vee-validate", desc: 'Vee-validate is another validation plugin that allows you to check your forms. One caveat is that you must add the <strong>type="checkbox"</strong> to properly validate a <code>v-checkbox</code> when using the <strong>value</strong> prop.' }
          ],
          props: {
            'v-form': {
              params: [
                [
                  'value',
                  'Boolean',
                  'false',
                  'Current validation state of form'
                ],
                [
                  'lazy-validation',
                  'Boolean',
                  'false',
                  'If enabled, <code>value</code> will always be true unless there are visible validation errors. You can still call <code>validate()</code> to manually trigger validation'
                ]
              ],
              model: {
                type: 'Boolean',
                default: 'false',
                description: 'Current validation state of form'
              }
            }
          },
          slots: {
            'v-form': {
              shared: ['default']
            }
          },
          events: {
            'v-form': {
              params: [
                ['input', 'Boolean', 'Validation state changed'],
                ['submit', '-', 'Form has been submitted. You can use <code>@submit.prevent</code> to suppress this event and disable form submission (e.g. to avoid reloading the page)']
              ]
            },
          }
        }
      }
    },
  }
</script>

<style lang="stylus">
</style>
