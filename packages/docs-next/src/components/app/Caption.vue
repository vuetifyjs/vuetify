<script>
  import Headline from './Headline'

  export default {
    name: 'AppCaption',

    extends: Headline,

    props: {
      color: {
        type: String,
        default: 'secondary',
      },
      size: {
        type: String,
        default: 'caption',
      },
      weight: {
        type: String,
        default: 'regular',
      },
    },
  }
</script>
