module.exports = {
  'v-bottom-sheet': {
    slots: [
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
