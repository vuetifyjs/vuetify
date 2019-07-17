module.exports = {
  'v-bottom-sheet': {
    slots: [
      'default',
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
