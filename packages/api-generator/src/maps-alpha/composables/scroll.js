module.exports = {
  composables: [],
  props: [
    {
      name: 'scrollTarget',
      type: 'string',
      default: 'undefined',
      source: 'scroll',
    },
    {
      name: 'scrollThreshold',
      type: [
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'scroll',
    },
  ],
  slots: [],
  events: [],
  functions: [],
}
