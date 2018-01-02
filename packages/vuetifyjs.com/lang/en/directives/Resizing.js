export default {
  header: 'Resize directive',
  headerText: 'The `v-resize` directive can be used for calling specific functions when the window resizes.',
  components: ['v-resize'],
  examples: [{
    default: {
      header: 'Default',
      desc: 'Resize your window and observe the values change..',
      uninverted: true
    }
  }],
  params: [{
    'v-resize': [
      {
        name: 'callback',
        type: 'Function',
        default: 'null'
      },
      {
        name: 'quiet',
        type: 'Boolean',
        default: 'false',
        desc: 'Do not invoke callback method when directive is bound'
      },
      {
        name: 'debounce',
        type: 'Number',
        default: '200'
      }
    ]
  }]
}
