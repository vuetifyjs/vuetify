<script>
  // Utilities
  import kebabCase from 'lodash/kebabCase'
  import marked from 'marked'
  import { parseLink } from '@/util/helpers'
  import {
    mapGetters,
    mapMutations,
    mapState,
  } from 'vuex'

  marked.setOptions({
    headerIds: false,
  })

  export default {
    props: {
      code: {
        type: [Array, String],
        default: '',
      },
      source: {
        type: String,
        default: '',
      },
      tag: {
        type: String,
        default: 'div',
      },
    },

    computed: {
      ...mapGetters('documentation', [
        'namespace',
        'page',
      ]),
      ...mapState('route', ['params']),
    },

    methods: {
      ...mapMutations('documentation', ['pushToc']),
    },

    render (h, context) {
      let code = this.code || this.source

      if (!this.code) {
        if ((this.$slots.default || []).length > 0) {
          code = this.$slots.default[0].text.trim()
        }

        if (code.indexOf('.') > -1) {
          code = this.$t(code)
        } else if (
          this.namespace &&
          this.page
        ) {
          code = this.$t(
            `${this.namespace}.${this.page}.${code}`
          )
        }
      }

      // Probably wants to make a list
      const wantsList = Array.isArray(code)

      if (wantsList) code = code.map(c => `- ${c}\n`).join('')

      // Convert markdown links
      code = code.replace(/\[([^\]]*)\]\(([^)]*)\)/g, parseLink)

      const innerHTML = marked(code)
      const heading = innerHTML.slice(1, 3)

      if (['h1', 'h2', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(heading)) {
        const index = innerHTML.indexOf('</')
        const text = innerHTML.slice(4, index)
        const id = kebabCase(text)

        if (['h1', 'h2'].includes(heading)) this.pushToc({ id, text })
      }

      return h(this.tag, {
        staticClass: 'markdown',
        class: { 'mb-6': wantsList },
        domProps: { innerHTML },
      })
    },
  }
</script>

<style lang="sass">
.markdown:last-child p,
.markdown:last-child
  margin-bottom: 0 !important

.markdown--link
  text-decoration: none

  &:hover
    opacity: 0.8

  .v-icon
    font-size: 14px
    margin-left: 4px
    vertical-align: baseline

.markdown > h4
  margin: 8px 0
</style>
