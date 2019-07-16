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
    events: [
      {
        name: 'click:outside',
        value: 'void',
      },
      {
        name: 'keydown',
        value: 'KeyboardEvent',
      },
    ],
  },
}
