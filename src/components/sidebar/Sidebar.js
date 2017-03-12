import Toggleable from '../../mixins/toggleable'

export default {
  name: 'sidebar',

  mixins: [Toggleable],

  props: {
    closeOnClick: {
      type: Boolean,
      default: true
    },
    drawer: Boolean,
    fixed: Boolean,
    right: Boolean,
    height: String,
    mobile: {
      type: Boolean,
      default: true
    },
    mobileBreakPoint: {
      type: Number,
      default: 992
    },
    disableRouteWatcher: Boolean
  },

  computed: {
    calculatedHeight () {
      return this.height || this.fixed || this.drawer ? '100vh' : 'auto'
    },
    classes () {
      return {
        'sidebar': true,
        'sidebar--close': !this.isActive,
        'sidebar--right': this.right,
        'sidebar--drawer': this.drawer,
        'sidebar--fixed': this.fixed || this.drawer,
        'sidebar--fixed-right': this.fixed && this.right,
        'sidebar--mobile': this.mobile,
        'sidebar--open': this.isActive
      }
    },
    styles () {
      return {
        height: this.calculatedHeight
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
        this.isActive = window.innerWidth >= this.mobileBreakPoint
      }
    },

    routeChanged () {
      return (
        (window.innerWidth < this.mobileBreakPoint && this.mobile) ||
        (this.drawer && this.closeOnClick)
      )
    }
  },

  render (h) {
    const data = {
      'class': this.classes,
      style: this.styles,
      directives: [
        {
          name: 'click-outside',
          value: this.closeConditional
        }
      ]
    }

    return h('aside', data, [this.$slots.default])
  }
}
