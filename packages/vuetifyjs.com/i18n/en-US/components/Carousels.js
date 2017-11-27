export default {
  header: 'Carousel',
  headerText: 'The `v-carousel` component is used to display large numbers of visual content on a rotating timer.',
  components: ['v-carousel', 'v-carousel-item'],
  examples: [{
    default: {
      header: 'Default',
      desc: 'A carousel by default has a slide transition.'
    },
    customTransition: {
      header: 'Custom transition',
      desc: 'You can also apply your own custom transition.'
    },
    customDelimiter: {
      header: 'Custom delimiter',
      desc: 'You can also change the icon for the carousel delimiter.'
    },
    hideControls: {
      header: 'Hide controls',
      desc: 'You can hide the bottom controls with the `hide-controls` prop.'
    }
  }],
  props: {
    cycle: 'Determines if carousel should cycle through images',
    hideControls: 'Hides the panel with carousel delimiters',
    icon: 'Sets icon for carousel delimiter',
    interval: 'The duration between image cycles',
    lazy: 'Lazily load the carousel slides',
    leftControlIcon: 'Sets icon for left carousel control, false removes icon',
    reverseTransition: 'Sets the reverse transition',
    rightControlIcon: 'Sets icon for right carousel control, false removes icon',
    src: 'The image src'
  }
}
