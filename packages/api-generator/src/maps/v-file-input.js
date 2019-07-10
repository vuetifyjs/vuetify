module.exports = {
  'v-file-input': {
    scopedSlots: [{
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
