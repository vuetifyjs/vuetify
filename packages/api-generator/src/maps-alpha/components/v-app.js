module.exports = {
  mixins: [
    'themeable',
  ],
  props: [
    {
      name: 'id',
      type: 'string',
      default: "'app'",
      source: 'v-app',
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
