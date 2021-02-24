module.exports = {
  composables: [
    'border',
    'border-radius',
    'dimensions',
    'elevation',
    'position',
    'tag',
  ],
  props: [
    {
      name: 'color',
      type: 'string',
      default: 'undefined',
      source: 'colorable',
    },
    {
      name: 'dark',
      type: 'boolean',
      default: 'false',
      source: 'themeable',
    },
    {
      name: 'elevation',
      type: [
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'elevatable',
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
      name: 'light',
      type: 'boolean',
      default: 'false',
      source: 'themeable',
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
      name: 'outlined',
      type: 'boolean',
      default: 'false',
      source: 'v-sheet',
    },
    {
      name: 'rounded',
      type: [
        'boolean',
        'string',
      ],
      default: 'undefined',
      source: 'roundable',
    },
    {
      name: 'shaped',
      type: 'boolean',
      default: 'false',
      source: 'v-sheet',
    },
    {
      name: 'tag',
      type: 'string',
      default: 'div',
      source: 'v-sheet',
    },
    {
      name: 'tile',
      type: 'boolean',
      default: 'false',
      source: 'roundable',
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
