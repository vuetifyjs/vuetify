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
        value: 'boolean',
      },
      {
        name: 'click:close',
        value: 'boolean',
      },
      {
        name: 'update:active',
        value: 'boolean',
      },
    ],
  },
}
