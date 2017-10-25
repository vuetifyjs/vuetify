export default {
  label: {
    header: 'With label',
    desc: 'Text-fields come in two theme options, dark and light.'
  },
  labelDark: {
    header: 'Dark theme with label',
    desc: 'The dark theme compliments darker backgrounds.'
  },
  singleLine: {
    header: 'Single line light theme',
    desc: 'Single line text-fields do not float their label on focus or with data.'
  },
  singleLineDark: {
    header: 'Single line dark theme',
    desc: 'A single line label mimics the display of a placeholder.'
  },
  icon: {
    header: 'With Icon',
    desc: 'Icons can be specified as prepended or appended.'
  },
  iconDark: {
    header: 'Dark theme with icon',
    desc: 'The icon inherits the applications primary color on text-field focus.'
  },
  multiLine: {
    header: 'Multi-Line',
    desc: 'A multi-line text-field is useful for larger amounts of text.'
  },
  multiLineDark: {
    header: 'Dark theme multi-line',
    desc: 'Multi-line text-fields can be set to autogrow allowing the field to scale with the input.'
  },
  characterCounter: {
    header: 'Character counter',
    desc: 'Use a counter to inform a user of the character limit. The counter does not perform any validation by itself. You will need to pair it with either the internal validation system, or a 3rd party library.'
  },
  password: {
    header: 'Password input',
    desc: 'A password input can be used with an appended icon and callback to control the visibility.'
  },
  validation: {
    header: 'Validation',
    desc: `Vuetify includes simple validation through the <code>rules</code> prop. The prop accepts an array of callbacks. While validating rules, the current v-model value will be passed to the callback. This callback should return either <code>true</code> or a <code>String</code>, the error message.`
  },
  fullWidthWithCharacterCounter: {
    header: 'Full-width text field with character counter',
    desc: 'Light theme'
  },
  requiredFields: {
    header: 'Required fields',
    desc: 'In this example two of the text-fields are required. We utilize the <strong>required</strong> prop in order to apply an asterisk to the label and rules to validate the fields.'
  },
  hint: {
    header: 'Hint text',
    desc: 'Light theme'
  },
  prefixesAndSuffixes: {
    header: 'Prefixes & suffixes',
    desc: 'Light theme'
  },
  customValidation: {
    header: 'Custom validation',
    desc: 'While the built in <code>v-form</code> or 3rd party plugin such as <a href="https://github.com/monterail/vuelidate" target="_blank" rel="noopener">vuelidate</a> or <a href="https://github.com/logaretm/vee-validate" target="_blank" rel="noopener">vee-validation</a> can help streamline your validation process, you can choose to simply control it yourself.'
  },
  textarea: {
    header: 'Textarea',
    desc: 'Textarea text-fields have an alternate style.'
  },
  box: {
    header: 'Box style',
    desc: 'Text-fields can be used with an alternative box design. Append and prepend icon props are <strong>not</strong> supported in this mode.'
  },
  customColors: {
    header: 'Custom colors',
    desc: 'You can optionally change a text-field into any color in the Material design palette. Below is an example implementation of a custom form with validation.'
  },
  masks: {
    header: 'Masks',
    desc: 'Text fields can validate against character masks. Using either a pre-made or custom rules, you can optionally format and validate specific character sets.'
  },
  progressBar: {
    header: 'Progress bar',
    desc: 'You can display a progress bar instead of the bottom line. You can use the default indeterminate progress having same color as the text field or designate a custom one using the <code>progress</code> slot'
  }
}
