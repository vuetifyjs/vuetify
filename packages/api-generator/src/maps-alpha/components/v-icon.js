module.exports = {
  composables: [
    'size',
    'tag',
  ],
  props: [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      source: 'v-icon',
    },
    {
      name: 'icon',
      type: [
        'string',
        'object',
      ],
      default: 'undefined',
      source: 'v-icon',
    },
    {
      name: 'left',
      type: 'boolean',
      default: 'false',
      source: 'v-icon',
    },
    {
      name: 'right',
      type: 'boolean',
      default: 'false',
      source: 'v-icon',
    },
    {
      name: 'tag',
      type: 'string',
      default: "'i'",
      source: 'tag',
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
