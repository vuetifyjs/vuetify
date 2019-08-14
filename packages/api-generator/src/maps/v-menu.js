module.exports = {
  'v-menu': {
    slots: [
      {
        name: 'activator',
        props: {
          attrs: '{ role: string, aria-haspopup: boolean, aria-expanded: string }',
          on: '{ [eventName]: eventHandler }',
          value: 'boolean',
        },
      },
    ],
  },
}
