module.exports = {
  'v-dialog': {
    slots: ['activator', 'default'],
    scopedSlots: [{
      name: 'activator',
      props: {
        on: '{ [eventName]: eventHandler }',
        value: 'boolean'
      }
    }, {
      name: 'default',
      props: {
        value: 'boolean'
      }
    }]
  }
}
