module.exports = {
  'v-banner': {
    slots: [
      'default',
      'icon',
      'actions',
      {
        name: 'actions',
        props: {
          dismiss: '(): void',
        },
      },
    ],
    functions: [
      {
        name: 'toggle',
        signature: '(): void',
      },
    ],
  },
}
