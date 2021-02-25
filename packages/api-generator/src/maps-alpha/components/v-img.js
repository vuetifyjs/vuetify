module.exports = {
  composables: [],
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
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'v-img',
    },
    {
      name: 'cover',
      type: 'boolean',
      default: 'false',
      source: 'v-img',
    },
    {
      name: 'eager',
      type: 'boolean',
      default: 'false',
      source: 'v-img',
    },
    {
      name: 'lazy-src',
      type: 'string',
      default: 'undefined',
      source: 'v-img',
    },
    {
      name: 'options',
      type: 'object',
      default: {
        root: undefined,
        rootMargin: undefined,
        threshold: undefined,
      },
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
      default: "''",
      source: 'v-img',
    },
    {
      name: 'srcset',
      type: 'string',
      default: 'undefined',
      source: 'v-img',
    },
    {
      name: 'theme',
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
      default: "'fade-transition'",
      source: 'v-img',
    },
  ],
  slots: [
    {
      name: 'default',
    },
    {
      name: 'error',
    },
    {
      name: 'placeholder',
    },
    {
      name: 'sources',
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
    {
      name: 'loadstart',
      value: 'object | string',
    },
  ],
  functions: [],
}
