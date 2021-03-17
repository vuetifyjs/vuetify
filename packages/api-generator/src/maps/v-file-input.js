const { VTextField } = require('../helpers/variables')

const events = VTextField.events.slice()
const index = VTextField.events.findIndex(event => event.name === 'change')
events.splice(index, 1, {
  name: 'change',
  source: 'v-text-field',
  value: 'File[]',
})

const props = VTextField.props.filter(prop => !['readonly'].includes(prop.name))
props.push({
  name: 'multiple',
  type: 'boolean',
  default: 'false',
  source: 'v-file-input',
})

module.exports = {
  'v-file-input': {
    ...VTextField,
    props,
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
