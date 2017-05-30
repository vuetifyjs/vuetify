import Contextualable from '../../mixins/contextualable'
import Toggleable from '../../mixins/toggleable'
import GenerateRouteLink from '../../mixins/route-link'
import Themeable from '../../mixins/themeable'

export default {
  name: 'fab',

  mixins: [Contextualable, GenerateRouteLink, Toggleable, Themeable],

  data: () => ({
    changeTimeout: {},
    isChanging: false
  }),

  props: {
    activeClass: {
      type: String,
      default: 'fab--active'
    },
    default: Boolean,
    flat: Boolean,
    lateral: Boolean,
    loading: Boolean,
    outline: Boolean,
    hidden: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    mini: Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'button'
    }
  },

  computed: {
    classes () {
      return {
        'fab': true,
        'fab--dark': this.dark && !this.light,
        'fab--light': this.light,
        'fab--small': this.mini,
        'fab--hidden': this.hidden,
        'fab--lateral': this.lateral,
        'fab--is-changing': this.isChanging,
        'primary': this.primary && !this.outline,
        'secondary': this.secondary && !this.outline,
        'success': this.success && !this.outline,
        'info': this.info && !this.outline,
        'warning': this.warning && !this.outline,
        'error': this.error && !this.outline,
        'primary--text': this.primary && (this.outline || this.flat),
        'secondary--text': this.secondary && (this.outline || this.flat),
        'success--text': this.success && (this.outline || this.flat),
        'info--text': this.info && (this.outline || this.flat),
        'warning--text': this.warning && (this.outline || this.flat),
        'error--text': this.error && (this.outline || this.flat)
      }
    }
  },

  methods: {
    changeAction () {
      this.isChanging = true
      clearTimeout(this.changeTimeout)
      this.changeTimeout = setTimeout(() => (this.isChanging = false), 600)
    },
    genContent (h) {
      return h('span', { 'class': 'fab__content' }, [this.$slots.default])
    },
    genLoader (h) {
      const children = []

      if (!this.$slots.loader) {
        children.push(h('v-progress-circular', {
          props: {
            indeterminate: true,
            size: 26
          }
        }))
      } else {
        children.push(this.$slots.loader)
      }

      return h('span', { 'class': 'fab__loading' }, children)
    }
  },

  render (h) {
    const { tag, data } = this.generateRouteLink()
    const children = []

    if (tag === 'button') {
      data.attrs.type = this.type
    }

    children.push(this.genContent(h))

    if (this.loading) {
      children.push(this.genLoader(h))
    }

    return h(tag, data, children)
  }
}
