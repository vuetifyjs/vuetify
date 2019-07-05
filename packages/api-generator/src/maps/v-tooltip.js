module.exports = {
  'v-tooltip': {
    slots: ['default'],
    scopedSlots: [{
      name: 'activator',
      props: {
        on: '{ [eventName]: eventHandler }',
        value: 'boolean',
      },
    }],
  },
}
