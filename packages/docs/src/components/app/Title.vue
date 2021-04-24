<script>
  import Headline from './Headline'

  export default {
    name: 'AppTitle',

    extends: Headline,

    props: {
      size: {
        type: String,
        default: 'subtitle-2',
      },
      weight: {
        type: String,
        default: 'black',
      },
    },
  }
</script>
