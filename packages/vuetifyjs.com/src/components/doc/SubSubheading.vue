<script>
  // Extensions
  import Heading from './Heading'

  export default {
    name: 'SubSubheading',

    extends: Heading,

    props: {
      tag: {
        type: String,
        default: 'v-subtitle-2'
      }
    }
  }
</script>
