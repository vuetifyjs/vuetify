const { inputEvents, inputSlots } = require('../variables')

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
