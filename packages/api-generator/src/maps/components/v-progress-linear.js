module.exports = {
  'v-progress-linear': {
    events: [
      {
        name: 'update:modelValue',
        value: 'number',
      },
    ],
    slots: [
      {
        name: 'default',
        props: {
          value: 'number',
          buffer: 'number',
        },
      },
    ],
  },
}
