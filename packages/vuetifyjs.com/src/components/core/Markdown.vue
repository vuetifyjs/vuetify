<script>
  import marked from 'marked'

  export default {
    inject: {
      namespace: {
        default: undefined
      },
      page: {
        default: undefined
      }
    },

    functional: true,

    props: {
      code: {
        type: String,
        default: ''
      },
      source: {
        type: String,
        default: ''
      },
      tag: {
        type: String,
        default: 'div'
      }
    },

    render (h, ctx) {
      const { children, data, injections, props } = ctx
      let code = props.code || props.source

      if (!props.code) {
        if (children) {
          code = children[0].text
        }

        if (code.indexOf('.') > -1) {
          code = ctx.parent.$t(code)
        } else if (
          injections.namespace &&
          injections.page
        ) {
          code = ctx.parent.$t(
            `${injections.namespace}.${injections.page}.${code}`
          )
        }
      }

      // Probably wants to make a list
      const wantsList = Array.isArray(code)

      if (wantsList) {
        code = code.map(c => `- ${c}\n`).join('')
      }

      return h(props.tag, {
        staticClass: 'markdown',
        class: {
          'mb-3': wantsList
        },
        domProps: { innerHTML: marked(code) },
        ...data
      })
    }
  }
</script>

<style>
h4.markdown > p {
  margin-bottom: 0;
}
</style>
