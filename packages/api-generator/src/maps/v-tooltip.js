module.exports = {
  'v-tooltip': {
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
