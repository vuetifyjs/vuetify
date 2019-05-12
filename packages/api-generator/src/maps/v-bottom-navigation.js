module.exports = {
  'v-bottom-navigation': {
    slots: ['default'],
    events: [
      {
        name: 'input',
        value: 'boolean'
      },
      {
        name: 'update:inputValue',
        value: 'string | number'
      }
    ]
  }
}
