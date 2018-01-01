export default {
  header: 'Carousel',
  headerText: 'The `v-carousel` component is used to display large numbers of visual content on a rotating timer.',
  components: ['v-carousel', 'v-carousel-item'],
  examples: [{
    default: {
      header: 'Default',
      desc: 'A carousel by default has a slide transition.',
      uninverted: true
    },
    customTransition: {
      header: 'Custom transition',
      desc: 'You can also apply your own custom transition.',
      uninverted: true
    },
    customDelimiter: {
      header: 'Custom delimiter',
      desc: 'You can also change the icon for the carousel delimiter.',
      uninverted: true
    },
    hideControls: {
      header: 'Hide controls',
      desc: 'You can hide the bottom controls with the `hide-controls` prop.',
      uninverted: true
    }
  }],
  props: {
    appendIcon: 'Mixins.Input.props.appendIcon',
    prependIcon: 'Mixins.Input.props.prependIcon',
    cycle: 'Determines if carousel should cycle through images',
    delimiterIcon: 'Sets icon for carousel delimiter',
    hideControls: 'Hides the navigation controls',
    hideDelimiters: 'Hides the panel with carousel delimiters',
    interval: 'The duration between image cycles',
    reverseTransition: 'Sets the reverse transition',
    src: 'The image src',
    transition: 'Mixins.Transitionable.props.transition'
  }
}
