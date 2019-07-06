module.exports = {
  'v-file-input': {
    scopedSlots: [{
      name: 'selection',
      props: {
        text: 'string[]',
        files: 'File[]',
      },
    }],
    events: [{
      name: 'change',
      value: 'File[]',
    }]
  },
}
