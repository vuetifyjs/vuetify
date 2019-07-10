module.exports = {
  'v-banner': {
    slots: [
      {
        name: 'actions',
        props: {
          dismiss: '(): void',
        },
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
    functions: [
      {
        name: 'toggle',
        signature: '(): void',
      },
    ],
  },
}
