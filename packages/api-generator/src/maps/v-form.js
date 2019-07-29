module.exports = {
  'v-form': {
    functions: [
      {
        name: 'reset',
        signature: '(): void',
      },
      {
        name: 'resetValidation',
        signature: '(): void',
      },
      {
        name: 'validate',
        signature: '(): boolean',
      },
    ],
    events: [
      {
        name: 'input',
        value: 'boolean',
      },
      {
        name: 'submit',
        value: 'event',
      },
    ],
  },
}
