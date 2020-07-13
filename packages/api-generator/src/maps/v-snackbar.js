module.exports = {
  'v-snackbar': {
    events: [
      {
        name: 'input',
        value: 'boolean',
      },
    ],
    slots: [{
      name: 'action',
      props: { attrs: 'object' },
    }],
  },
}
