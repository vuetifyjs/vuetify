export default {
  header: 'Scrolling directive',
  headerText: 'The `v-scroll` directive allows you to provide callbacks when the window or a specifically defined element are scrolled.',
  components: ['v-scroll'],
  examples: [{
    default: {
      header: 'Default',
      desc: 'The default behavior is to bind to the window. If no additional configuration options are needed, you can simple pass your callback function.'
    },
    options: {
      header: 'Scroll w/ options',
      desc: 'For a more fine tuned approach, you can designate the target to bind the scroll event listener.'
    }
  }],
  props: {
    '[up, down, left, right]': 'Assign a callback based upon a swipe direction. Pairing x-axis and y-axis callbacks is not recommended at this time',
    '[move, start, end]': 'Assign a callback when the touch event starts, ends, and while it is in progress'
  }
}
