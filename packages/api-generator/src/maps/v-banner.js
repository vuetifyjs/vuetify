module.exports = {
  'v-banner': {
    slots: ['default', 'icon', 'actions'],
    scopedSlots: [{
      name: 'actions',
      props: {
        dismiss: '(): void',
      },
    }],
    functions: [
      {
        name: 'toggle',
        signature: '(): void',
      },
    ],
  },
}
