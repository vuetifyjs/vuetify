module.exports = {
  'v-navigation-drawer': {
    slots: ['default'],
    scopedSlots: [{
      name: 'img',
      props: { height: 'string', src: 'string | srcObject' }
    }],
    events: [
      {
        name: 'input',
        value: 'boolean'
      },
      {
        name: 'update:miniVariant',
        value: 'boolean'
      }
    ]
  }
}
