module.exports = {
  'v-otp-input': {
    events: [
      {
        name: 'input',
        value: 'string',
      },
      {
        name: 'finish',
        value: 'string',
      },
      {
        name: 'change',
        value: 'string',
      },
    ],
    exclude: {
      props: ['hide-spin-buttons'],
    },
  },
}
