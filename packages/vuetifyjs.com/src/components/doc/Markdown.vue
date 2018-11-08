<script>
  // Utilities
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

      // Convert all markdown external links
      // to have an icon and target blank
      code = code.replace(/\[([^\]]*)\]\(([^)]*)\)/g, (match, p1, p2) => {
        if (p2.indexOf('http') < 0) return match

        return `
          <a
            href="${p2}"
            target="_blank"
            rel="noopener"
            class="markdown--link"
          >${p1}<i class="v-icon mdi mdi-open-in-new"></i></a>
        `.trim()
      })

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
    font-size: 16px;
  }
}
</style>
