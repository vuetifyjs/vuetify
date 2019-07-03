module.exports = {
  'v-dialog': {
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
