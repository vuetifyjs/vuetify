module.exports = {
  composables: [
    'dimensions',
  ],
  props: [
    {
      name: 'aspect-ratio',
      type: [
        'string',
        'number',
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
    {
      name: 'height',
      type: [
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'measurable',
    },
    {
      name: 'max-height',
      type: [
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'measurable',
    },
    {
      name: 'max-width',
      type: [
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'measurable',
    },
    {
      name: 'min-height',
      type: [
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'measurable',
    },
    {
      name: 'min-width',
      type: [
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'measurable',
    },
    {
      name: 'width',
      type: [
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'measurable',
    },
  ],
  slots: [
    {
      name: 'default',
    },
  ],
  events: [],
  functions: [],
}
