export default {
  header: 'Scrolling directive',
  headerText: 'The `v-scroll` directive allows you to provide callbacks when the window or a specifically defined element are scrolled.',
  components: ['v-scroll'],
  examples: [{
    default: {
      header: 'Default',
      desc: 'The default behavior is to bind to the window. If no additional configuration options are needed, you can simple pass your callback function.',
      uninverted: true
    },
    options: {
      header: 'Scroll with options',
      desc: 'For a more fine tuned approach, you can designate the target to bind the scroll event listener.',
      uninverted: true
    }
  }],
  params: [{
    'v-scroll': [
      {
        name: 'callback',
        type: 'Function',
        default: 'null'
      },
      {
        name: 'target',
        type: 'String',
        default: 'null',
        desc: 'The DOM element to bind the scroll event listener'
      },
      {
        name: 'debounce',
        type: 'Object',
        default: '{ _passive_: **true** }',
        desc: 'The options to be passed to the event listener of the binding target'
      }
    ]
  }]
}
