const meta = require('@/router/meta.json')

export default {
  data: () => ({
    meta: {},
    _description: {},
    _keywords: {}
  }),

  computed: {
    title () {
      return this.meta.title
    },
    description () {
      return this.meta.description
    },
    keywords () {
      return this.meta.keywords
    }
  },

  watch: {
    '$route' () {
      this.setMeta()
    },
    meta: {
      deep: true,
      handler () {
        document.title = this.title
        this._description.setAttribute('content', this.description)
        this._keywords.setAttribute('content', this.keywords)
      }
    }
  },
  
  created () {
    if (process.env.VUE_ENV === 'client') return

    this.setMeta()

    this.$ssrContext.title = this.title
    this.$ssrContext.description = this.description
    this.$ssrContext.keywords = this.keywords
  },

  mounted () {
    this.bootstrapMeta()
  },

  methods: {
    getPrevNext () {
      const currentIndex = this.$router.options.routes.findIndex(r => r.path === this.$route.path)
      const previous = currentIndex > 0 ? this.$router.options.routes[currentIndex - 1] : null
      const next = currentIndex < this.$router.options.routes.length - 1
        ? this.$router.options.routes[currentIndex + 1]
        : null

      this.$store.commit('app/NEXT', {
        name: next ? next.meta && next.meta.h1 : null,
        route: next ? next.path : null
      })

      this.$store.commit('app/PREVIOUS', {
        name: previous ? previous.meta && previous.meta.h1 : null,
        route: previous && previous.path !== '/' ? previous.path : null
      })
    },
    bootstrapMeta () {
      if (typeof document === 'undefined') return

      this._title = document.title
      this._description = document.querySelector('meta[name="description"]')
      this._keywords = document.querySelector('meta[name="keywords"]')

      this.setMeta()
    },
    setMeta () {
      this.getPrevNext()
      this.meta = meta[this.$route.path] || {}
    }
  }
}
