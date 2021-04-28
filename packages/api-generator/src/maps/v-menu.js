module.exports = {
  'v-menu': {
    slots: [
      {
        name: 'default',
        props: undefined,
      },
      {
        name: 'activator',
        props: {
          attrs: '{ role: string, aria-haspopup: boolean, aria-expanded: string }',
          on: '{ [eventName]: eventHandler }',
          value: 'boolean',
        },
      },
    ],
    events: [
      {
        name: 'input',
        value: 'boolean',
      },
    ],
  },
}
