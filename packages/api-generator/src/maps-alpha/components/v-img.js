module.exports = {
  mixins: [
    'measurable',
    'themeable',
    'v-responsive',
  ],
  props: [
    {
      name: 'alt',
      type: 'string',
      default: 'undefined',
      source: 'v-img',
    },
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
      name: 'contain',
      type: 'boolean',
      default: 'false',
      source: 'v-img',
    },
    {
      name: 'content-class',
      type: 'string',
      default: 'undefined',
      source: 'v-responsive',
    },
    {
      name: 'dark',
      type: 'boolean',
      default: 'false',
      source: 'themeable',
    },
    {
      name: 'eager',
      type: 'boolean',
      default: 'false',
      source: 'v-img',
    },
    {
      name: 'gradient',
      type: 'string',
      default: 'undefined',
      source: 'v-img',
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
      name: 'lazy-src',
      type: 'string',
      default: 'undefined',
      source: 'v-img',
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
      name: 'options',
      type: 'object',
      default: {},
      source: 'v-img',
    },
    {
      name: 'position',
      type: 'string',
      default: "'center center'",
      source: 'v-img',
    },
    {
      name: 'sizes',
      type: 'string',
      default: 'undefined',
      source: 'v-img',
    },
    {
      name: 'src',
      type: [
        'string',
        'object',
      ],
      default: 'undefined',
      source: 'v-img',
    },
    {
      name: 'srcset',
      type: 'string',
      default: 'undefined',
      source: 'v-img',
    },
    {
      name: 'transition',
      type: [
        'boolean',
        'string',
      ],
      default: 'fade-transition',
      source: 'v-img',
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
    {
      name: 'placeholder',
    },
  ],
  events: [
    {
      name: 'error',
      value: 'object | string',
    },
    {
      name: 'load',
      value: 'object | string',
    },
  ],
  functions: [],
}
