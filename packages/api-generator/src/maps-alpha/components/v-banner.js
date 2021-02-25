module.exports = {
  composables: [
    'v-sheet',
  ],
  props: [
    {
      name: 'avatar',
      type: 'string',
      default: 'undefined',
      source: 'v-banner',
    },
    {
      name: 'icon',
      type: 'string',
      default: 'undefined',
      source: 'v-banner',
    },
    {
      name: 'mobile',
      type: 'boolean',
      source: 'v-banner',
    },
    {
      name: 'single-line',
      type: 'boolean',
      default: 'false',
      source: 'v-banner',
    },
    {
      name: 'sticky',
      type: 'boolean',
      default: 'false',
      source: 'v-banner',
    },
  ],
  slots: [
    {
      name: 'actions',
    },
    {
      name: 'default',
    },
    {
      name: 'thumbnail',
    },
  ],
  events: [],
  functions: [],
}
