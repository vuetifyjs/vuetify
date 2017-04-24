import Toggleable from '../../mixins/toggleable'

export default {
  name: 'sidebar',

  mixins: [Toggleable],

  data () {
    return {
      isMobile: false
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
    mini: Boolean,
    mobile: {
      type: Boolean,
      default: true
    },
    mobileBreakPoint: {
      type: [Number, String],
      default: 992
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
        'sidebar--drawer': this.drawer,
        'sidebar--fixed': this.fixed,
        'sidebar--fixed-right': this.fixed && this.right,
        'sidebar--mini': this.mini,
        'sidebar--mobile': this.mobile,
        'sidebar--open': this.isActive,
        'sidebar--right': this.right
      }
    }
  },

  watch: {
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

    resize () {
      if (this.mobile && !this.drawer) {
        const isMobile = window.innerWidth <= parseInt(this.mobileBreakPoint)
        this.isActive = !isMobile
        this.isMobile = isMobile
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

    return h('v-overlay', {
      props: {
        absolute: this.absolute,
        value: this.isActive && (this.isMobile || this.drawer)
      }
    }, [h('aside', data, [this.$slots.default])])
  }
}
