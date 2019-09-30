module.exports = {
  'v-mutate': {
    options: [
      {
        name: 'modifiers.once',
        default: false,
        type: 'boolean',
      },
      {
        name: 'modifiers.attr',
        default: true,
        type: 'boolean',
      },
      {
        name: 'modifiers.char',
        default: true,
        type: 'boolean',
      },
      {
        name: 'modifiers.child',
        default: true,
        type: 'boolean',
      },
      {
        name: 'modifiers.sub',
        default: true,
        type: 'boolean',
      },
      {
        name: 'value',
        default: 'undefined',
        type: 'function',
      },
    ],
  },
}
