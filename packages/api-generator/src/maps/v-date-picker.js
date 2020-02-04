module.exports = {
  'v-date-picker': {
    slots: [{
      name: 'default',
    }],
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
        name: 'click:date',
        value: 'string',
      },
      {
        name: 'click:month',
        value: 'string',
      },
      {
        name: 'dblclick:date',
        value: 'string',
      },
      {
        name: 'dblclick:month',
        value: 'string',
      },
    ],
  },
}
