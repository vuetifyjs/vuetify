module.exports = {
  'v-expansion-panel-header': {
    slots: [
      {
        name: 'actions',
        props: {
          open: 'boolean',
        },
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
