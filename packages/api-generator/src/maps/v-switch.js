const { VInput } = require('../helpers/variables')

module.exports = {
  'v-switch': {
    ...VInput,
    events: [
      ...VInput.events,
      {
        name: 'click',
        value: 'MouseEvent',
      },
    ],
    exclude: {
      props: ['type', 'hide-spin-buttons'],
    },
  },
}
