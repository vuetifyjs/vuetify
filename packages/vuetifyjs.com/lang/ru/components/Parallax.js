export default {
  header: 'Parallax',
  headerText: 'The `v-parallax` component creates a 3d effect that makes an image appear to scroll slower than the window.',
  components: ['v-parallax'],
  examples: [{
    default: {
      header: 'Default',
      desc: 'A parallax causes a shift in a background image when the user scrolls the page.'
    },
    content: {
      header: 'With content',
      desc: 'You can also place any content inside of the parallax. This allows you to use the parallax as a hero image.'
    },
    customHeight: {
      header: 'Custom height',
      desc: 'You can specify a custom height on a parallax. Keep in mind this can break the parallax if your image is not sized properly'
    },
    jumbotron: {
      header: 'Jumbotron',
      desc: 'The parallax can have its effect disabled to be used as a standard **jumbotron**'
    }
  }]
}
