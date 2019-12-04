module.exports = {
  'v-file-input': {
    props: [
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: null,
      },
    ],
    slots: [{
      name: 'selection',
      props: {
        file: 'File',
        index: 'number',
        multiple: 'boolean',
        text: 'string',
      },
    }],
    events: [{
      name: 'change',
      value: 'File[]',
    }],
  },
}
