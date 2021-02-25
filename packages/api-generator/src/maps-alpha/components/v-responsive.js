module.exports = {
  composables: [
    'dimensions',
  ],
  props: [
    {
      name: 'aspect-ratio',
      type: [
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'v-responsive',
    },
    {
      name: 'content-class',
      type: 'string',
      default: 'undefined',
      source: 'v-responsive',
    },
  ],
  slots: [
    {
      name: 'default',
    },
    {
      name: 'additional',
    },
  ],
  events: [],
  functions: [],
}
