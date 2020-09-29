// Utilities
import { get } from 'vuex-pathify'

export default {
  name: 'ad',

  props: {
    discover: Boolean,
    slug: {
      type: String,
      required: true,
    },
  },

  computed: {
    all: get('ads/all'),
    locale: get('route/params@locale'),
    ads () {
      return this.all
    },
    adAttrs () {
      if (!this.current) return undefined

      return {
        class: 'text-decoration-none',
        href: this.href,
        rel: `noopener${this.isSponsored ? ' sponsored' : ''}`,
        target: '_blank',
      }
    },
    current () {
      const index = !this.slug
        ? this.getRandomIndex()
        : this.getSlugIndex()

      return this.ads[index]
    },
    description () {
      return this.current
        ? this.current.metadata.description
        : ''
    },
    href () {
      if (!this.current) return undefined

      const [url, query] = this.current.metadata.url.split('?')

      if (!url.startsWith('http')) {
        return `/${this.locale}${url}/`
      }

      return `${url}?ref=vuetifyjs.com${query ? `&${query}` : ''}`
    },
    isSponsored () {
      if (!this.current) return undefined

      return this.current.metadata.sponsored
    },
    src () {
      if (!this.current || this.compact) return undefined

      return this.current.metadata.src
    },
  },

  methods: {
    getSlugIndex () {
      return this.ads.findIndex(ad => ad.slug === this.slug)
    },
    getRandomIndex () {
      return Math.floor(Math.random() * this.ads.length)
    },
  },
}
