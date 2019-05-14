module.exports = {
  'v-form': {
    slots: ['default'],
    functions: [
      {
        name: 'reset',
        signature: '(): void'
      },
      {
        name: 'resetValidation',
        signature: '(): void'
      },
      {
        name: 'validate',
        signature: '(): boolean'
      }
    ],
    events: [
      {
        name: 'input',
        value: 'boolean'
      }
    ]
  }
}
