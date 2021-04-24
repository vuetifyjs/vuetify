module.exports = {
  'v-banner': {
    slots: [
      {
        name: 'default',
        props: undefined,
      },
      {
        name: 'actions',
        props: {
          dismiss: '(): void',
        },
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
