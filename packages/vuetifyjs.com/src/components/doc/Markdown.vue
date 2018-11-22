<script>
  // Utilities
  import marked from 'marked'
  import { parseLink } from '@/util/helpers'

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
        type: [Array, String],
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

      // Convert markdown links
      code = code.replace(/\[([^\]]*)\]\(([^)]*)\)/g, parseLink)

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

<style lang="stylus">
h4.markdown > p {
  margin-bottom: 0;
}

.markdown--link {
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }

  .v-icon {
    font-size: 14px;
    margin-left: 4px;
    vertical-align: baseline;
  }
}
</style>
