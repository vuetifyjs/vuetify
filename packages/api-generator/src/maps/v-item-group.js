module.exports = {
  'v-item-group': {
    props: [
      {
        name: 'tag',
        type: 'string',
        default: "'div'",
      },
    ],
    events: [
      {
        name: 'change',
        value: 'any[] | any',
      },
    ],
  },
}
