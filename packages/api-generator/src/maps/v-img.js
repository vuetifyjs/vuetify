module.exports = {
  'v-img': {
    slots: ['placeholder'],
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
