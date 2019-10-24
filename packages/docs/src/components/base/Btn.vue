<script>
  export default {
    name: 'BaseBtn',

    functional: true,

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

    render (h, { children, data, props }) {
      data.props = {
        ...(data.props || {}),
        ...props,
      }

      return h('v-btn', data, children)
    },
  }
</script>
