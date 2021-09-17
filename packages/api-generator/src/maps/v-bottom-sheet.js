module.exports = {
  'v-bottom-sheet': {
    slots: [
      {
        name: 'default',
        props: undefined,
      },
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
