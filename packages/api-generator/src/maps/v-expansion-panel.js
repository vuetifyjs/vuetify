module.exports = {
  'v-expansion-panel': {
    events: [
      {
        name: 'change',
        value: 'void',
      },
      {
        name: 'click',
        value: 'MouseEvent',
      },
    ],
  },
  'v-expansion-panel-header': {
    slots: [
      {
        name: 'actions',
        props: undefined,
      },
      {
        name: 'default',
        props: {
          open: 'boolean',
        },
      },
    ],
    events: [
      {
        name: 'click',
        value: 'MouseEvent',
      },
    ],
  },
}
