module.exports = {
  'v-tooltip': {
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
