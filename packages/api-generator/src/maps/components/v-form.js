module.exports = {
  'v-form': {
    slots: [
      {
        name: 'default',
        props: undefined,
      },
    ],
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
        name: 'update:modelValue',
        value: 'boolean',
      },
      {
        name: 'submit',
        value: 'SubmitEventPromise',
      },
    ],
  },
}
