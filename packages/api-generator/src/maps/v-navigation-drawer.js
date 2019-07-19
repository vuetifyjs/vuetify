module.exports = {
  'v-navigation-drawer': {
    slots: [
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
        name: 'update:miniVariant',
        value: 'boolean',
      },
    ],
  },
}
