module.exports = {
  'v-list-item': {
    slots: [
      {
        name: 'default',
        props: {
          active: 'boolean',
          toggle: 'Function',
        },
      },
    ],
    events: [
      {
        name: 'click',
        value: 'MouseEvent | KeyboardEvent',
      },
      {
        name: 'keydown',
        value: 'KeyboardEvent',
      },
    ],
  },
}
