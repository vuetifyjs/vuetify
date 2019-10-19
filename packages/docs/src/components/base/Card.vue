<script>
  import { VCard } from 'vuetify/lib'

  export default {
    name: 'BaseCard',

    extends: VCard,

    props: {
      elevation: {
        type: [Number, String],
        default: 12,
      },
    },
  }
</script>
