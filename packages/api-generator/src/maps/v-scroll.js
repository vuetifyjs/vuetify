module.exports = {
  'v-scroll': {
    options: [
      {
        name: 'arg:target',
        default: 'window',
        type: 'string',
      },
      {
        name: 'arg:self',
        default: false,
        type: 'boolean',
      },
      {
        name: 'value',
        default: '(): {}',
        type: 'Function',
      },
    ],
  },
}
