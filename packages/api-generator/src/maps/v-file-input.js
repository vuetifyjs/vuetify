module.exports = {
  'v-file-input': {
    slots: [{
      name: 'selection',
      props: {
        file: 'File',
        index: 'number',
        text: 'string',
      },
    }],
    events: [{
      name: 'change',
      value: 'File[]',
    }],
  },
}
