<script>
  import marked from 'marked'

  export default {
    functional: true,

    props: {
      source: {
        type: String,
        default: ''
      }
    },

    render (h, ctx) {
      let code = ctx.props.source

      if (ctx.children) {
        code = ctx.children[0].text
      }

      return h('div', {
        domProps: { innerHTML: marked(code) },
        ...ctx.data
      })
    }
  }
</script>
