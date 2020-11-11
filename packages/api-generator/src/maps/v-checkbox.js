const { VInput } = require('../helpers/variables')

module.exports = {
  'v-checkbox': {
    ...VInput,
    events: [
      ...VInput.events,
      {
        name: 'update:indeterminate',
        value: 'boolean',
      },
    ],
  },
}
