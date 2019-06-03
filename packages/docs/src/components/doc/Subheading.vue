<script>
  // Extensions
  import Heading from './Heading'

  export default {
    name: 'Subheading',

    extends: Heading,

    props: {
      tag: {
        type: String,
        default: 'v-headline',
      },
    },
  }
</script>
