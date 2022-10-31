const { VTextField } = require('../helpers/variables')

module.exports = {
  'v-textarea': {
    ...VTextField,
    exclude: {
      props: ['type', 'hide-spin-buttons'],
    },
  },
}
