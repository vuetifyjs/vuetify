export default {
  header: 'Touch Support',
  headerText: 'The <code>v-touch</code> directive allows you to capture swipe gestures and apply directional callbacks.',
  components: ['v-touch'],
  examples: [{
    default: {
      header: 'Default',
      desc: 'On a mobile device, try swiping in various directions.',
      uninverted: true
    }
  }],
  props: [{
    'v-touch': [
      {
        name: '[up, down, left, right]',
        type: 'Function',
        default: 'null',
        desc: 'Assign a callback based upon a swipe direction. Pairing x-axis and y-axis callbacks is not recommended at this time',
      },
      {
        name: '[move, start, end]',
        type: 'Function',
        default: 'null',
        desc: 'Assign a callback when the touch event starts, ends, and while it is in progress'
      }
    ]
  }]
}
