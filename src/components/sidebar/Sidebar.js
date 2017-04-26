import Toggleable from '../../mixins/toggleable'
import Overlayable from '../../mixins/overlayable'

export default {
  name: 'sidebar',

  mixins: [Overlayable, Toggleable],

  data () {
    return {
      isMobile: false,
      overlay: null
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
      type: Number,
      default: 1024
    },
    right: Boolean
  },

  computed: {
    calculatedHeight () {
      return this.height || '100vh'
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
        'sidebar--left': !this.right,
        'sidebar--right': this.right
      }
    },
    isDrawer () {
      return this.drawer || this.isMobile
    }
  },

  watch: {
    isDrawer () {
      this.handleOverlay()
    },
    isActive () {
      this.handleOverlay()
    },
    '$route' () {
      if (!this.disableRouteWatcher) {
        this.isActive = !this.routeChanged()
      }
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      this.resize()
      window.addEventListener('resize', this.resize, false)
    })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  },

  methods: {
    closeConditional () {
      return this.routeChanged()
    },
    handleOverlay () {
      if (this.isActive && !this.hideOverlay && this.isDrawer) {
        this.genOverlay()
      } else {
        this.removeOverlay()
      }
    },
    resize () {
      this.isMobile = window.innerWidth <= parseInt(this.mobileBreakPoint)

      if (!this.persistent) {
        this.isActive = !this.isMobile
      }
    },
    routeChanged () {
      return (
        (window.innerWidth < parseInt(this.mobileBreakPoint) && this.mobile) ||
        (this.isDrawer && !this.persistent)
      )
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
