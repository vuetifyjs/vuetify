module.exports = {
  'v-menu': {
    slots: [
      'default',
      {
        name: 'activator',
        props: {
          on: '{ [eventName]: eventHandler }',
          value: 'boolean',
        },
      }, {
        name: 'default',
        props: {
          value: 'boolean',
        },
      },
    ],
  },
}
