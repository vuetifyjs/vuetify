module.exports = {
  'v-snackbar': {
    events: [
      {
        name: 'input',
        value: 'boolean',
      },
    ],
    slots: [
      {
        name: 'default',
        props: undefined,
      },
      {
        name: 'action',
        props: { attrs: 'object' },
      },
    ],
  },
}
