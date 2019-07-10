module.exports = {
  'v-alert': {
    slots: [
      {
        name: 'append',
        props: undefined,
      },
      {
        name: 'close',
        props: {
          toggle: 'Function',
        },
      },
      {
        name: 'default',
        props: undefined,
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
    ],
    functions: [
      {
        name: 'toggle',
        signature: '(): void',
      },
    ],
  },
}
