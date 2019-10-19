<script>
  // Components
  import {
    VBtn,
  } from 'vuetify/lib'

  export default {
    name: 'BaseBtn',

    extends: VBtn,

    props: {
      color: {
        type: String,
        default: 'primary',
      },
      elevation: {
        type: [Number, String],
        default: 6,
      },
    },
  }
</script>
