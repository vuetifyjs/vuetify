const { VInput } = require('../helpers/variables')

VInput.slots = VInput.slots.filter(slot => slot.name !== 'append' && slot.name !== 'prepend')

module.exports = {
  'v-radio': {
    ...VInput,
  },
}
