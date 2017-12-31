export default {
  header: 'Text field',
  headerText: 'Text fields components are used for collecting user provided information.',
  components: ['v-text-field'],
  supplemental: ['MaskTable'],
  examples: [{
    label: {
      header: 'With label',
      desc: 'Text-fields come in two theme options, dark and light.'
    },
    singleLine: {
      header: 'Single line light theme',
      desc: 'Single line text-fields do not float their label on focus or with data.'
    },
    icon: {
      header: 'With Icon',
      desc: 'Icons can be specified as prepended or appended.'
    },
    multiLine: {
      header: 'Multi-Line',
      desc: 'A multi-line text-field is useful for larger amounts of text.'
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
      desc: 'Vuetify includes simple validation through the `rules` prop. The prop accepts an array of callbacks. While validating rules, the current v-model value will be passed to the callback. This callback should return either `true` or a `String`, the error message.'
    },
    fullWidthWithCharacterCounter: {
      header: 'Full-width text field with character counter',
      desc: 'Full width text fields allow you to create boundless inputs. In this example, we use a `v-divider` to separate the fields.'
    },
    requiredFields: {
      header: 'Required fields',
      desc: 'In this example two of the text-fields are required. We utilize the **required** prop in order to apply an asterisk to the label and rules to validate the fields.'
    },
    hint: {
      header: 'Hint text',
      desc: 'The **hint** property on text-fields adds the provided string beneath the text-field. Using **persistent-hint** keeps the hint visible when the text-field is not focused.'
    },
    prefixesAndSuffixes: {
      header: 'Prefixes & suffixes',
      desc: 'The **prefix** and **suffix** property allows you to prepend and append inline non-modifiable text next to the text-field'
    },
    customValidation: {
      header: 'Custom validation',
      desc: 'While the built in `v-form` or 3rd party plugin such as <a href="https://github.com/monterail/vuelidate" target="_blank" rel="noopener">vuelidate</a> or <a href="https://github.com/logaretm/vee-validate" target="_blank" rel="noopener">vee-validation</a> can help streamline your validation process, you can choose to simply control it yourself.'
    },
    textarea: {
      header: 'Textarea',
      desc: 'Textarea text-fields have an alternate style.',
      uninverted: true
    },
    box: {
      header: 'Box style',
      desc: 'Text-fields can be used with an alternative box design. Append and prepend icon props are **not** supported in this mode.'
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
      desc: 'You can display a progress bar instead of the bottom line. You can use the default indeterminate progress having same color as the text field or designate a custom one using the `progress` slot'
    }
  }],
  props: {
    autoGrow: 'Auto-grows the input. This option requires the use of **v-model**',
    autofocus: 'Enable autofocus',
    box: 'Applies the alternate box input style',
    counter: 'Creates counter for input length. If no Number is specified, it defaults to 25. Does not apply any validation.',
    fullWidth: 'Desginates input type as full-width',
    multiLine: 'Turns into textarea',
    prefix: 'Displays prefix text',
    rows: 'Number of rows in textarea',
    suffix: 'Displays suffix text',
    textarea: 'Textarea text-field with alternate style',
    toggleKeys: 'Array of key codes that will toggle the input (if it supports toggling)',
    type: 'Sets input type'
  }
}
