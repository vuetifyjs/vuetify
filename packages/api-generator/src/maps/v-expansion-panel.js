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
        name: 'icon',
        props: undefined,
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
