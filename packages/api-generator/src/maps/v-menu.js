module.exports = {
  'v-menu': {
    slots: [
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
