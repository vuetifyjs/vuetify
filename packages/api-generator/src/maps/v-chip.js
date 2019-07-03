module.exports = {
  'v-chip': {
    slots: ['default'],
    events: [
      {
        name: 'input',
        value: 'boolean',
      },
      {
        name: 'click',
        value: 'MouseEvent',
      },
      {
        name: 'click:close',
        value: 'void',
      },
      {
        name: 'update:active',
        value: 'boolean',
      },
    ],
  },
}
