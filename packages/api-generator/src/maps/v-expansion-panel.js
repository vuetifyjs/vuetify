module.exports = {
  'v-expansion-panels': {
    slots: ['default'],
  },
  'v-expansion-panel': {
    slots: ['default'],
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
    slots: ['default'],
  },
  'v-expansion-panel-header': {
    slots: ['default', 'icon', 'actions'],
    events: [
      {
        name: 'click',
        value: 'MouseEvent',
      },
    ],
  },
}
