module.exports = {
  'v-mutate': {
    options: [
      {
        name: 'modifiers.once',
        default: false,
        type: 'boolean',
        snippet: 'html_directive_mutate_once',
      },
      {
        name: 'modifiers.attr',
        default: true,
        type: 'boolean',
        snippet: 'html_directive_mutate_attr',
      },
      {
        name: 'modifiers.char',
        default: true,
        type: 'boolean',
        snippet: 'html_directive_mutate_char',
      },
      {
        name: 'modifiers.child',
        default: true,
        type: 'boolean',
        snippet: 'html_directive_mutate_child',
      },
      {
        name: 'modifiers.sub',
        default: true,
        type: 'boolean',
        snippet: 'html_directive_mutate_sub',
      },
      {
        name: 'value',
        default: '(): {}',
        type: 'function | object',
        snippet: 'html_directive_mutate',
      },
    ],
  },
}
