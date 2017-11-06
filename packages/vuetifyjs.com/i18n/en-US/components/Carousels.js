export default {
  header: 'Carousel',
  headerText: 'The <code>v-carousel</code> component is used to display large numbers of visual content on a rotating timer.',
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
