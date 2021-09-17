// Utilities
import kebabCase from 'lodash.kebabcase'
import { get } from 'vuex-pathify'

export default {
  name: 'ad',

  props: {
    medium: {
      type: String,
      default: 'docs',
    },
    slug: String,
    type: String,
  },

  computed: {
    all: get('ads/all'),
    locale: get('route/params@locale'),
    ads () {
      return this.all.filter(ad => (
        this.slug === ad.slug ||
        (
          ad.metadata.discoverable &&
          this.type === kebabCase(ad.metadata.type)
        )
      ))
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
      return this.ads[this.slug ? 0 : this.getRandomIndex()]
    },
    description () {
      return this.current?.metadata.description
    },
    href () {
      if (!this.current) return undefined

      const [url, query] = this.current.metadata.url.split('?')

      if (!url.startsWith('http')) {
        return `/${this.locale}${url}/`
      }

      if (query && query.indexOf('utm_source') !== -1) {
        return `${url}?${query}`
      }

      return `${url}?utm_source=vuetifyads&utm_medium=${this.medium}${query ? `&${query}` : ''}`
    },
    isSponsored () {
      return this.current?.metadata?.sponsored
    },
    src () {
      return this.compact || this.current?.metadata?.src
    },
  },

  methods: {
    getRandomIndex () {
      return Math.floor(Math.random() * this.ads.length)
    },
  },
}
