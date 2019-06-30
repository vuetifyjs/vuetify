module.exports = {
  'v-edit-dialog': {
    slots: ['default', 'input'],
    events: [
      {
        name: 'cancel',
        value: 'void',
      },
      {
        name: 'close',
        value: 'void',
      },
      {
        name: 'open',
        value: 'void',
      },
      {
        name: 'save',
        value: 'void',
      },
    ],
  },
}
