import Toggleable from '../../mixins/toggleable'
import Overlayable from '../../mixins/overlayable'

export default {
  name: 'sidebar',

  mixins: [Overlayable, Toggleable],

  data () {
    return {
      isBooted: false,
      isMobile: false
    }
  },

  props: {
    absolute: Boolean,
    disableRouteWatcher: Boolean,
    drawer: Boolean,
    fixed: Boolean,
    height: String,
    light: Boolean,
    mini: Boolean,
    persistent: Boolean,
    mobileBreakPoint: {
      type: [Number, String],
      default: 1024
    },
    right: Boolean
  },

  computed: {
    calculatedHeight () {
      return this.height
        ? isNaN(this.mobileBreakPoint)
          ? this.mobileBreakPoint
          : `${this.mobileBreakPoint}px`
        : '100vh'
    },
    classes () {
      return {
        'sidebar': true,
        'sidebar--absolute': this.absolute,
        'sidebar--close': !this.isActive,
        'sidebar--dark': !this.light,
        'sidebar--drawer': this.drawer || this.isMobile,
        'sidebar--light': this.light,
        'sidebar--mini': this.mini,
        'sidebar--persistent': this.persistent,
        'sidebar--is-mobile': this.isMobile,
        'sidebar--open': this.isActive,
        'sidebar--right': this.right
      }
    },
    showOverlay () {
      return this.isActive && !this.hideOverlay && (this.drawer || this.isMobile)
    }
  },

  watch: {
    showOverlay (val) {
      this.isBooted && val && this.genOverlay() || this.removeOverlay()
    },
    '$route' () {
      if (!this.disableRouteWatcher) {
        this.isActive = !this.closeConditional()
      }
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      this.resize()
      window.addEventListener('resize', this.resize, { passive: false })
    })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resize, { passive: false })
  },

  methods: {
    closeConditional () {
      return !this.persistent && (this.drawer || this.isMobile)
    },
    resize () {
      this.isMobile = window.innerWidth <= parseInt(this.mobileBreakPoint)

      if (!this.persistent && !this.drawer) {
        this.isActive = !this.isMobile && (!this.isMobile && !this.isBooted)
      }
      this.isBooted = true
    }
  },

  render (h) {
    const data = {
      'class': this.classes,
      style: { height: this.calculatedHeight },
      directives: [{
        name: 'click-outside',
        value: this.closeConditional
      }]
    }

    return h('aside', data, [this.$slots.default])
  }
}
