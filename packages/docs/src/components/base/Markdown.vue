<script>
  // Utilities
  import marked from 'marked'
  import { parseLink } from '@/util/helpers'
  import {
    get,
  } from 'vuex-pathify'

  marked.setOptions({
    headerIds: false,
  })

  export default {
    name: 'BaseMarkdown',

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
      namespace: get('documentation/namespace'),
      page: get('documentation/page'),
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
    font-weight: 500

    &:hover
      text-decoration: underline

    .v-icon.v-icon
      font-size: 14px
      margin-left: 4px
      vertical-align: baseline

  .markdown > h4
    margin: 8px 0

  .markdown code
    box-shadow: none !important
    color: #c0341d !important
    background-color: #fbe5e1 !important

  .markdown kbd > code
    background: transparent !important
    color: inherit !important
</style>
