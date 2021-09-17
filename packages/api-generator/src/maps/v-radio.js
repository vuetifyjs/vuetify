const { VInput } = require('../helpers/variables')

VInput.slots = VInput.slots.filter(slot => !['append', 'prepend'].includes(slot.name))

module.exports = {
  'v-radio': {
    ...VInput,
    events: [
      ...VInput.events,
      {
        name: 'click',
        value: 'MouseEvent',
      },
    ],
  },
}
