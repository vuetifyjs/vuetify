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
    lateral: Boolean,
    positionX: [Number, String],
    positionY: [Number, String],
    hidden: Boolean,
    top: Boolean,
    right: Boolean,
    bottom: Boolean,
    left: Boolean
  },

  computed: {
    classes () {
      return {
        'fab': true,
        'fab--absolute': this.absolute,
        'fab--hidden': this.hidden,
        'fab--is-changing': this.isChanging,
        'fab--top': this.top,
        'fab--right': this.right,
        'fab--bottom': this.bottom,
        'fab--left': this.left
      }
    }
  },

  methods: {
    changeAction () {
      this.isChanging = true
      clearTimeout(this.changeTimeout)
      this.changeTimeout = setTimeout(() => {
        requestAnimationFrame(() => (this.isChanging = false))
      }, 600)
    },
    genContent (h) {
      return h('div', { 'class': 'fab__activator' }, this.$slots.default)
    }
  },

  render (h) {
    return h('div', {
      'class': this.classes
    }, [this.genContent(h)])
  }
}
