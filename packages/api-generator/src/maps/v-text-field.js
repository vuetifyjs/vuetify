const { inputEvents, textEvents, validatableEvents, textFieldSlots } = require('../helpers/variables')

module.exports = {
  'v-text-field': {
    events: [
      {
        name: 'input',
        value: 'string',
      },
      {
        name: 'change',
        value: 'string',
      },
      {
        name: 'blur',
        value: 'boolean',
      },
      {
        name: 'focus',
        value: 'boolean',
      },
      {
        name: 'keydown',
        value: 'KeyboardEvent',
      },
      ...inputEvents,
      ...textEvents,
    ].concat(validatableEvents),
    slots: [
      ...textFieldSlots,
    ],
  },
}
