module.exports = {
  composables: [
    'tag',
    'v-sheet',
  ],
  props: [
    {
      name: 'tag',
      type: 'string',
      default: "'footer'",
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
