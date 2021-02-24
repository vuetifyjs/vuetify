module.exports = {
  composables: [],
  props: [
    {
      name: 'outlined',
      type: 'boolean',
      default: 'false',
      source: 'border',
    },
    {
      name: 'border',
      type: [
        'boolean',
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'border',
    },
  ],
  slots: [],
  events: [],
  functions: [],
}
