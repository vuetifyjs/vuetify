module.exports = {
  'v-menu': {
    slots: ['activator', 'default'],
    scopedSlots: [{
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
    }],
  },
}
