module.exports = {
  'v-scroll': {
    argument: [{
      name: 'argument',
      type: ['Function'],
      default: undefined,
    }],
    modifiers: [
      {
        name: '#target',
        default: 'window',
        type: ['string'],
      },
      {
        name: 'self',
        default: false,
        type: ['boolean'],
      },
    ],
  },
}
