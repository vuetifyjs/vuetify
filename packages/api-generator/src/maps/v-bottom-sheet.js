module.exports = {
  'v-bottom-sheet': {
    slots: ['default'],
    scopedSlots: [
      {
        name: 'activator',
        props: {
          on: '{ [eventName]: eventHandler }',
          value: 'boolean',
        },
      },
    ],
  },
}
