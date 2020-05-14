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
    slots: [
      ...VInput.slots,
      {
        name: 'label',
        props: undefined,
      },
    ],
  },
}
