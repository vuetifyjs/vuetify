module.exports = {
  'v-img': {
    slots: ['default', 'placeholder'],
    events: [
      {
        name: 'error',
        value: 'object | string',
      },
      {
        name: 'load',
        value: 'object | string',
      },
    ],
  },
}
