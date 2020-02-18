const { VInput } = require('../helpers/variables')

module.exports = {
  'v-switch': {
    ...VInput,
    slots: [
      ...VInput.slots,
      {
        name: 'label',
        props: undefined,
      },
    ],
  },
}
