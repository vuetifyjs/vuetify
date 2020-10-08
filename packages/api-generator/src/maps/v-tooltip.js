module.exports = {
  'v-tooltip': {
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
