const { VInput } = require('../helpers/variables')

const slots = VInput.slots.filter(event => event.name !== 'message')

module.exports = {
  'v-radio': {
    ...VInput,
    slots,
  },
}
