<script>
  export default {
    name: 'BaseCard',

    functional: true,

    props: {
      elevation: {
        type: [Number, String],
        default: 12,
      },
    },

    render (h, { data, children }) {
      return h('v-card', data, children)
    },
  }
</script>
