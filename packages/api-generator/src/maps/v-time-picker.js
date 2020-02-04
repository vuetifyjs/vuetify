module.exports = {
  'v-time-picker': {
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
        name: 'click:hour',
        value: 'string',
      },
      {
        name: 'click:minute',
        value: 'string',
      },
      {
        name: 'click:second',
        value: 'string',
      },
      {
        name: 'update:period',
        value: 'string',
      },
    ],
  },
}
