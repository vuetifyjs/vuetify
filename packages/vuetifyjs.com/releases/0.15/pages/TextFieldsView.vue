<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Text fields',
          desc: 'Text fields components are used for collecting user provided information.',
          component: 'VTextField',
          edit: 'TextFieldsView',
          examples: [
            { header: 'With label', file: 'text-fields/1', desc: 'Text-fields come in two theme options, dark and light.' },
            { header: 'Dark theme with label', file: 'text-fields/2', desc: 'The dark theme compliments darker backgrounds.' },
            { header: 'Single line light theme', file: 'text-fields/3', desc: 'Single line text-fields do not float their label on focus or with data.' },
            { header: 'Single line dark theme', file: 'text-fields/4', desc: 'A single line label mimics the display of a placeholder.' },
            { header: 'With Icon', file: 'text-fields/5', desc: 'Icons can be specified as prepended or appended.' },
            { header: 'Dark theme with icon', file: 'text-fields/6', desc: 'The icon inherits the applications primary color on text-field focus.' },
            { header: 'Multi-Line', file: 'text-fields/7', desc: 'A multi-line text-field is useful for larger amounts of text.' },
            { header: 'Dark theme multi-line', file: 'text-fields/8', desc: 'Multi-line text-fields can be set to autogrow allowing the field to scale with the input.' },
            { header: 'Character counter', file: 'text-fields/9', desc: 'Use a counter to inform a user of the character limit.' },
            { header: 'Password input', file: 'text-fields/10', desc: 'A password input can be used with an appended icon and callback to control the visibility.' },
            { header: 'Validation', file: 'text-fields/11', desc: `Vuetify includes simple validation through the <code>rules</code> prop. The prop accepts an array of callbacks. While validating rules, the current v-model value will be passed to the callback. This callback should return either <code>true</code> or a <code>String</code>, the error message.` },
            { header: 'Full-width text field with character counter', file: 'text-fields/12', desc: 'Light theme' },
            { header: 'Required fields', file: 'text-fields/13', desc: 'In this example two of the text-fields are required. We utilize the <strong>required</strong> prop in order to apply an asterisk to the label and rules to validate the fields.' },
            { header: 'Hint text', file: 'text-fields/14', desc: 'Light theme' },
            { header: 'Prefixes & suffixes', file: 'text-fields/15', desc: 'Light theme' },
            { header: 'Custom validation', file: 'text-fields/16', desc: 'While the built in <code>v-form</code> or 3rd party plugin such as <a href="https://github.com/monterail/vuelidate" target="_blank" rel="noopener">vuelidate</a> or <a href="https://github.com/logaretm/vee-validate" target="_blank" rel="noopener">vee-validation</a> can help streamline your validation process, you can choose to simply control it yourself.' },
            { header: 'Textarea', file: 'text-fields/17', desc: 'Textarea text-fields have an alternate style.'},
            { header: 'Box style', file: 'text-fields/18', desc: 'Text-fields can be used with an alternative box design. Append and prepend icon props are <strong>not</strong> supported in this mode.' }
          ],
          props: {
            'v-text-field': {
              shared: ['input'],
              params: [
                [
                  'autofocus',
                  'Boolean',
                  'False',
                  'Enable autofocus'
                ],
                [
                  'auto-grow',
                  'Boolean',
                  'False',
                  'Auto-grows the input. This option <strong>requires</strong> the use of <code>v-model</code>'
                ],
                [
                  'counter',
                  '[Boolean, Number]',
                  'False',
                  'Creates counter for input length. If no Number is specified, it defaults to 25. Does not apply any validation.'
                ],
                [
                  'full-width',
                  'Boolean',
                  'False',
                  'Desginates input type as full-width'
                ],
                [
                  'prefix',
                  'String',
                  '',
                  'Displays prefix text'
                ],
                [
                  'multi-line',
                  'Boolean',
                  'False',
                  'Turns into textarea'
                ],
                [
                  'readonly',
                  'Boolean',
                  'False',
                  'Disables input'
                ],
                [
                  'rows',
                  'Number',
                  '5',
                  'Number of rows in textarea'
                ],
                [
                  'single-line',
                  'Boolean',
                  'False',
                  'Label does not move on focus/dirty'
                ],
                [
                  'solo',
                  'Boolean',
                  'False',
                  'Changes the style of the text-field for use in toolbars'
                ],
                [
                  'textarea',
                  'Boolean',
                  'False',
                  'Textarea text-field with alternate style'
                ],
                [
                  'suffix',
                  'String',
                  '',
                  'Displays suffix text'
                ],
                [
                  'type',
                  'String',
                  'text',
                  'Sets input type'
                ]
              ],
              model: {
                type: ['*'],
                default: '-',
                description: 'Current input value'
              }
            }
          },
          slots: {
            'v-text-field': {
              shared: ['label']
            }
          },
          events: {
            'v-text-field': {
              params: [
                ['input', 'String', 'Current input value. Fires while typing.'],
                ['focus', '-', 'Input gained focus.'],
                ['blur', '-', 'Input lost focus.'],
                ['change', 'String', 'Input value was changed. Fired on blur.'],
              ]
            },
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  #text-fields-view
    main

    .container
      min-height: 0
</style>
