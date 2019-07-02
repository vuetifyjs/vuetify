module.exports = {
  'v-bottom-navigation': {
    slots: ['default'],
    events: [
      {
        name: 'change',
        value: 'any',
      },
      {
        name: 'update:inputValue',
        value: 'string | number',
      },
    ],
  },
}
