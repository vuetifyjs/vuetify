import Contextualable from '../../mixins/contextualable'
import GenerateRouteLink from '../../mixins/route-link'
import Schemable from '../../mixins/schemable'
import Toggleable from '../../mixins/toggleable'

export default {
  name: 'fab',

  mixins: [Contextualable, GenerateRouteLink, Schemable, Toggleable],

  data: () => ({
    changeTimeout: {},
    isChanging: false
  }),

  props: {
    absolute: Boolean,
    activeClass: {
      type: String,
      default: 'fab--active'
    },
    default: Boolean,
    flat: Boolean,
    lateral: Boolean,
    loading: Boolean,
    outline: Boolean,
    positionX: [Number, String],
    positionY: [Number, String],
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
    top: {
      type: [Number, String]
    },
    right: {
      type: [Number, String],
      default: 24
    },
    bottom: {
      type: [Number, String],
      default: 124
    },
    left: {
      type: [Number, String]
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
        'fab--absolute': this.absolute,
        'fab--small': this.mini,
        'fab--hidden': this.hidden,
        'fab--lateral': this.lateral,
        'fab--is-changing': this.isChanging,
        'primary': this.primary && !this.outline,
        'secondary': this.secondary && !this.outline,
        'success': this.success && !this.outline,
        'info': this.info && !this.outline,
        'warning': this.warning && !this.outline,
        'error': this.error && !this.outline
      }
    },
    styles () {
      const pos = (p) => typeof p === 'undefined' ? 'initial' : !isNaN(p) ? `${p}px` : p

      return {
        top: pos(this.top),
        right: pos(this.right),
        bottom: pos(this.bottom),
        left: pos(this.left)
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

    data.style = this.styles

    children.push(this.genContent(h))

    if (this.loading) {
      children.push(this.genLoader(h))
    }

    return h(tag, data, children)
  }
}
