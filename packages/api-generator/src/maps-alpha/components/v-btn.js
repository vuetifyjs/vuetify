module.exports = {
  composables: [
    'density',
    'size',
    'tag',
    'v-sheet',
  ],
  props: [
    {
      name: 'block',
      type: 'boolean',
      default: 'false',
      source: 'v-btn',
    },
    {
      name: 'color',
      type: 'string',
      default: "'primary'",
      source: 'v-btn',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      source: 'v-btn',
    },
    {
      name: 'flat',
      type: 'boolean',
      default: 'false',
      source: 'v-btn',
    },
    {
      name: 'icon',
      type: [
        'boolean',
        'string',
      ],
      default: 'false',
      source: 'v-btn',
    },
    {
      name: 'plain',
      type: 'boolean',
      default: 'false',
      source: 'v-btn',
    },
    {
      name: 'tag',
      type: 'string',
      default: "'button'",
      source: 'tag',
    },
    {
      name: 'text',
      type: 'boolean',
      default: 'false',
      source: 'v-btn',
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
