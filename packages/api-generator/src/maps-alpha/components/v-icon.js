module.exports = {
  mixins: [
    'colorable',
    'sizeable',
    'themeable',
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
      name: 'dense',
      type: 'boolean',
      default: 'false',
      source: null,
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      source: 'v-icon',
    },
    {
      name: 'large',
      type: 'boolean',
      default: 'false',
      source: 'sizeable',
    },
    {
      name: 'left',
      type: 'boolean',
      default: 'false',
      source: 'v-icon',
    },
    {
      name: 'light',
      type: 'boolean',
      default: 'false',
      source: 'themeable',
    },
    {
      name: 'right',
      type: 'boolean',
      default: 'false',
      source: 'v-icon',
    },
    {
      name: 'size',
      type: [
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'v-icon',
    },
    {
      name: 'small',
      type: 'boolean',
      default: 'false',
      source: 'sizeable',
    },
    {
      name: 'tag',
      type: 'string',
      default: "'i'",
      source: 'v-icon',
    },
    {
      name: 'x-large',
      type: 'boolean',
      default: 'false',
      source: 'sizeable',
    },
    {
      name: 'x-small',
      type: 'boolean',
      default: 'false',
      source: 'sizeable',
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
