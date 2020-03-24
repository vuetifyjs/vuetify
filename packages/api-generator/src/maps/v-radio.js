const { VInput } = require('../helpers/variables')

module.exports = {
  'v-radio': {
    ...VInput,
    slots: [
      {
        name: 'label',
        props: undefined,
      },
    ],
  },
}
