const { VInput } = require('../helpers/variables')

module.exports = {
  'v-checkbox': {
    ...VInput,
    events: [
      ...VInput.events,
      {
        name: 'change',
        value: 'any',
      },
      {
        name: 'update:indeterminate',
        value: 'boolean',
      },
    ],
  },
}
