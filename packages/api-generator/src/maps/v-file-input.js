const { VTextField } = require('../helpers/variables')

const events = VTextField.events.slice()
const index = VTextField.events.findIndex(event => event.name === 'change')
events.splice(index, 1, {
  name: 'change',
  source: 'v-text-field',
  value: 'File[]',
})

module.exports = {
  'v-file-input': {
    ...VTextField,
    props: [
      ...VTextField.props,
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: 'v-file-input',
      },
    ],
    slots: [
      ...VTextField.slots,
      {
        name: 'selection',
        props: {
          file: 'File',
          index: 'number',
          multiple: 'boolean',
          text: 'string',
        },
        source: 'v-file-input',
      },
    ],
    events,
  },
}
