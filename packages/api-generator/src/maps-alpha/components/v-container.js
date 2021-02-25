module.exports = {
  composables: [
    'tag',
  ],
  props: [
    {
      name: 'fluid',
      type: 'boolean',
      default: 'false',
      source: 'v-container',
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
