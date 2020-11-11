module.exports = {
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
