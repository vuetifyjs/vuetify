module.exports = {
  'v-navigation-drawer': {
    slots: [
      {
        name: 'default',
        props: undefined,
      },
      {
        name: 'append',
        props: undefined,
      },
      {
        name: 'img',
        props: { height: 'string', src: 'string | srcObject' },
      },
      {
        name: 'prepend',
        props: undefined,
      },
    ],
    events: [
      {
        name: 'input',
        value: 'boolean',
      },
      {
        name: 'transitionend',
        value: 'object',
      },
      {
        name: 'update:mini-variant',
        value: 'boolean',
      },
    ],
  },
}
