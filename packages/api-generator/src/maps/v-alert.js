module.exports = {
  'v-alert': {
    slots: ['append', 'default', 'prepend'],
    scopedSlots: [
      {
        name: 'close',
        props: {
          toggle: 'Function',
        },
      },
    ],
    events: [
      {
        name: 'input',
        value: 'boolean',
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
