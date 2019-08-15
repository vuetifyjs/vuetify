const { inputSlots } = require('../helpers/variables')

module.exports = {
  'v-checkbox': {
    slots: inputSlots.concat(['label']),
    events: [
      {
        name: 'update:indeterminate',
        value: 'boolean',
      },
    ],
  },
}
