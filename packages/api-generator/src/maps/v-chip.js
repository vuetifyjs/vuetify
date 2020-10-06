module.exports = {
  'v-chip': {
    slots: [
      {
        name: 'default',
        props: undefined,
      },
    ],
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
