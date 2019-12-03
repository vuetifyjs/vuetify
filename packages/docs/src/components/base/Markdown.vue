<script>
  // Utilities
  import marked from 'marked'
  import { parseLink } from '@/util/helpers'
  import {
    get,
    sync,
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

    data: () => ({
      timeout: null,
    }),

    computed: {
      lang: sync('route/params@lang'),
      namespace: get('documentation/namespace'),
      page: get('documentation/page'),
    },

    mounted () {
      this.init()
    },

    beforeDestroy () {
      clearTimeout(this.timeout)
    },

    methods: {
      init () {
        clearTimeout(this.timeout)

        this.timeout = setTimeout(() => {
          const sameInternal = this.$el.querySelectorAll('a.v-markdown--same-internal')
          const internal = this.$el.querySelectorAll('a.v-markdown--internal')

          Array.prototype.forEach.call(sameInternal, el => {
            el.addEventListener('click', this.onSameInternalClick)
          })

          Array.prototype.forEach.call(internal, el => {
            el.addEventListener('click', this.onInternalClick)
          })
        }, 300)
      },
      onSameInternalClick (e) {
        e.preventDefault()

        this.$router.push(e.target)
      },
      onInternalClick (e) {
        e.preventDefault()

        const target = e.target.tagName === 'A'
          ? e.target
          : e.target.parentElement

        const lang = `/${this.lang}`
        const length = lang.length
        let href = target.getAttribute('href')

        // If missing leading forward slash
        if (href.charAt(0) !== '/') href = `/${href}`

        // If missing language
        if (href.slice(0, length) !== lang) href = `${lang}${href}`

        this.$router.push(href)
      },
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
      code = (code || '').replace(/\[([^\]]*)\]\(([^)]*)\)/g, parseLink)

      const innerHTML = marked(code)

      return h(this.tag, {
        staticClass: 'v-markdown',
        class: { 'mb-6': wantsList },
        domProps: { innerHTML },
      })
    },
  }
</script>

<style lang="sass">
  .v-markdown:last-child p,
  .v-markdown:last-child
    margin-bottom: 0 !important

  .v-markdown--link
    text-decoration: none
    font-weight: 500

    &:hover
      text-decoration: underline

    .v-icon.v-icon
      font-size: 14px
      margin-left: 4px
      vertical-align: baseline

  .v-markdown > h4
    margin: 8px 0

  .v-markdown code
    box-shadow: none !important
    color: #c0341d !important
    background-color: #fbe5e1 !important

  .v-markdown kbd > code
    background: transparent !important
    color: inherit !important
</style>
