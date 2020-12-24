const { NextPrevSlots } = require('./v-window')

module.exports = {
  'v-carousel': {
    slots: [
      {
        name: 'default',
        props: undefined,
      },
      ...NextPrevSlots,
    ],
    events: [
      {
        name: 'change',
        value: 'number',
      },
    ],
  },
}
