module.exports = {
  mixins: [],
  props: [
    {
      name: 'fluid',
      type: 'boolean',
      default: 'false',
      source: 'v-container',
    },
    {
      name: 'id',
      type: 'string',
      default: 'undefined',
      source: 'v-container',
    },
    {
      name: 'tag',
      type: 'string',
      default: "'div'",
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
