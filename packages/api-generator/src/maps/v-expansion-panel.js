module.exports = {
  'v-expansion-panel': {
    slots: [
      {
        name: 'default',
        props: undefined,
      },
    ],
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
  'v-expansion-panel-content': {
    slots: [
      {
        name: 'default',
        props: undefined,
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
