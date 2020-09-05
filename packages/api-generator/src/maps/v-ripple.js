module.exports = {
  'v-ripple': {
    argument: {
      name: 'argument',
      type: ['object'],
      default: undefined,
    },
    modifiers: [
      {
        name: 'center',
        default: 'false',
        type: ['boolean'],
      },
      {
        name: 'class',
        default: '',
        type: ['string'],
      },
    ],
  },
}
