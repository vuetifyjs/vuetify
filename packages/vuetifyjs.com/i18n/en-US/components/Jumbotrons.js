export default {
  header: 'Jumbotron',
  headerText: 'Soon...',
  components: [
    'v-jumbotron'
  ],
  examples: [{
    usage: {
      header: 'Usage',
      desc: 'Soon..'
    },
    color: {
      header: 'Custom color',
      desc: 'Soon...'
    },
    gradient: {
      header: 'Gradient',
      desc: 'More information on writing gradients can be found [here](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient)'
    },
    gradientWithImage: {
      header: 'Gradient with image',
      desc: 'More information on writing gradients can be found [here](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient)'
    }
  }],
  props: {
    gradient: 'Apply a gradient background. If used with the **src** prop, will overlay it',
    src: 'The img src'
  }
}
