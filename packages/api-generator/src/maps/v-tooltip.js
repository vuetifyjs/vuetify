module.exports = {
  'v-tooltip': {
    slots: [
      {
        name: 'activator',
        props: {
          on: '{ [eventName]: eventHandler }',
          value: 'boolean',
        },
      },
      {
        name: 'default',
        props: undefined,
      },
    ],
  },
}
