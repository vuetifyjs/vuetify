<template lang="pug">
  component-view(v-bind:doc="doc")
    mask-table
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
            { header: 'With label', file: 'text-fields/label', desc: 'Text-fields come in two theme options, dark and light.' },
            { header: 'Dark theme with label', file: 'text-fields/label-dark', desc: 'The dark theme compliments darker backgrounds.' },
            { header: 'Single line light theme', file: 'text-fields/single-line', desc: 'Single line text-fields do not float their label on focus or with data.' },
            { header: 'Single line dark theme', file: 'text-fields/single-line-dark', desc: 'A single line label mimics the display of a placeholder.' },
            { header: 'With Icon', file: 'text-fields/icon', desc: 'Icons can be specified as prepended or appended.' },
            { header: 'Dark theme with icon', file: 'text-fields/icon-dark', desc: 'The icon inherits the applications primary color on text-field focus.' },
            { header: 'Multi-Line', file: 'text-fields/multi-line', desc: 'A multi-line text-field is useful for larger amounts of text.' },
            { header: 'Dark theme multi-line', file: 'text-fields/multi-line-dark', desc: 'Multi-line text-fields can be set to autogrow allowing the field to scale with the input.' },
            { header: 'Character counter', file: 'text-fields/character-counter', desc: 'Use a counter to inform a user of the character limit. The counter does not perform any validation by itself. You will need to pair it with either the internal validation system, or a 3rd party library.' },
            { header: 'Password input', file: 'text-fields/password', desc: 'A password input can be used with an appended icon and callback to control the visibility.' },
            { header: 'Validation', file: 'text-fields/validation', desc: `Vuetify includes simple validation through the <code>rules</code> prop. The prop accepts an array of callbacks. While validating rules, the current v-model value will be passed to the callback. This callback should return either <code>true</code> or a <code>String</code>, the error message.` },
            { header: 'Full-width text field with character counter', file: 'text-fields/full-width-with-character-counter', desc: 'Light theme' },
            { header: 'Required fields', file: 'text-fields/required-fields', desc: 'In this example two of the text-fields are required. We utilize the <strong>required</strong> prop in order to apply an asterisk to the label and rules to validate the fields.' },
            { header: 'Hint text', file: 'text-fields/hint', desc: 'Light theme' },
            { header: 'Prefixes & suffixes', file: 'text-fields/prefixes-and-suffixes', desc: 'Light theme' },
            { header: 'Custom validation', file: 'text-fields/custom-validation', desc: 'While the built in <code>v-form</code> or 3rd party plugin such as <a href="https://github.com/monterail/vuelidate" target="_blank" rel="noopener">vuelidate</a> or <a href="https://github.com/logaretm/vee-validate" target="_blank" rel="noopener">vee-validation</a> can help streamline your validation process, you can choose to simply control it yourself.' },
            { header: 'Textarea', file: 'text-fields/textarea', desc: 'Textarea text-fields have an alternate style.'},
            { header: 'Box style', file: 'text-fields/box', desc: 'Text-fields can be used with an alternative box design. Append and prepend icon props are <strong>not</strong> supported in this mode.' },
            { header: 'Custom colors', file: 'text-fields/custom-colors', new: '0.16.0', desc: 'You can optionally change a text-field into any color in the Material design palette. Below is an example implementation of a custom form with validation.' },
            { header: 'Masks', file: 'text-fields/masks', new: '0.16.0', desc: 'Text fields can validate against character masks. Using either a pre-made or custom rules, you can optionally format and validate specific character sets.' },
            { header: 'Progress bar', file: 'text-fields/progress-bar', new: '0.16.0', desc: 'You can display a progress bar instead of the bottom line. You can use the default indeterminate progress having same color as the text field or designate a custom one using the <code>progress</code> slot' }
          ],
          props: {
            'v-text-field': {
              shared: ['input', 'loadable', 'mask'],
              params: [
                [
                  'autofocus',
                  'Boolean',
                  'False',
                  'Enable autofocus'
                ],
                [
                  'color',
                  'String',
                  'primary',
                  'Sets a custom theme color'
                ],
                [
                  'box',
                  'Boolean',
                  'False',
                  'Applies the alternate <strong>box</strong> input style'
                ],
                [
                  'clearable',
                  'Boolean',
                  'False',
                  'Add input clear functionality'
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
                  'Designates input type as full-width'
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
              shared: ['label', 'progress']
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
