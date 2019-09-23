module.exports = {
  'v-intersect': {
    options: [
      {
        name: 'modifiers.quiet',
        default: false,
        type: 'boolean',
        snippet: 'html_directive_intersect_quiet',
      },
      {
        name: 'value',
        default: '{}',
        type: 'object',
        snippet: 'html_directive_intersect',
      },
    ],
  },
}
