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
    closeOnClick: {
      type: Boolean,
      default: true
    },
    disableRouteWatcher: Boolean,
    drawer: Boolean,
    fixed: Boolean,
    height: String,
    light: Boolean,
    mini: Boolean,
    mobile: {
      type: Boolean,
      default: true
    },
    mobileBreakPoint: {
      type: Number,
      default: 1024
    },
    right: Boolean
  },

  computed: {
    calculatedHeight () {
      return this.height || (this.fixed || this.drawer ? '100vh' : 'auto')
    },
    classes () {
      return {
        'sidebar': true,
        'sidebar--absolute': this.absolute,
        'sidebar--close': !this.isActive,
        'sidebar--dark': !this.light,
        'sidebar--drawer': this.drawer,
        'sidebar--fixed': this.fixed || this.drawer,
        'sidebar--light': this.light,
        'sidebar--mini': this.mini,
        'sidebar--mobile': this.mobile,
        'sidebar--is-mobile': this.isMobile,
        'sidebar--open': this.isActive,
        'sidebar--left': !this.right,
        'sidebar--right': this.right
      }
    }
  },

  watch: {
    drawer () {
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
      if (this.isActive && !this.hideOverlay && (this.isMobile || this.drawer)) {
        this.genOverlay()
      } else {
        this.removeOverlay()
      }
    },
    resize () {
      if (this.mobile && !this.drawer) {
        const isMobile = window.innerWidth <= parseInt(this.mobileBreakPoint)
        this.isMobile = isMobile
        this.isActive = !isMobile
      }
    },
    routeChanged () {
      return (
        (window.innerWidth < parseInt(this.mobileBreakPoint) && this.mobile) ||
        (this.drawer && this.closeOnClick)
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
