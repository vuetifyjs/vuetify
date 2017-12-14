export default {
  header: 'Slider',
  headerText: 'The <code>v-slider</code> component is a better visualization of the number input. It is used for gathering numerical user data.',
  components: ['v-slider'],
  examples: [{
    continuous: {
      header: 'Continuous',
      desc: 'Continuous sliders should be used when precision is not a concern.'
    },
    discrete: {
      header: 'Discrete',
      desc: 'Discrete sliders offer a thumb label that displays the exact current amount. Using the <code>step</code> prop you can disallow selecting values outside of steps.'
    },
    icons: {
      header: 'Icons',
      desc: 'You can add icons to the slider with the <code>append-icon</code> and <code>prepend-icon</code> props.'
    },
    editableNumericValue: {
      header: 'With an editable numeric value',
      desc: 'Sliders can be combined with other components for a better display.'
    },
    dark: {
      header: 'Dark theme',
      desc: 'Sliders also support theming.',
      uninverted: true
    },
    customColors: {
      header: 'Custom colors',
      desc: 'You can set the colors of the slider using the props <code>color</code>, <code>track-color</code> and <code>thumb-color</code>.'
    }
  }],
  props: {
    step: 'If greater than 0, sets step interval for ticks',
    thumbColor: 'Sets the thumb and thumb label color',
    thumbLabel: 'Show thumb label',
    ticks: '',
    trackColor: 'Sets the track fill color'
  }
}
