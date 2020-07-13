module.exports = {
  'v-date-picker': {
    events: [
      {
        name: 'input',
        value: 'string',
      },
      {
        name: 'change',
        value: 'string',
      },
      {
        name: 'update:picker-date',
        value: 'string',
      },
      {
        name: '<domevent>:date',
        value: 'string',
      },
      {
        name: '<domevent>:month',
        value: 'string',
      },
      {
        name: '<domevent>:year',
        value: 'number',
      },
    ],
  },
}
