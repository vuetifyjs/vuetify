const { inputEvents, inputSlots } = require('../helpers/variables')

module.exports = {
  'v-input': {
    events: [
      ...inputEvents,
    ],
    slots: [
      ...inputSlots,
    ],
  },
}
