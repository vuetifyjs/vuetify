import Toggleable from '../../mixins/toggleable'
import Overlayable from '../../mixins/overlayable'

export default {
  name: 'sidebar',

  mixins: [Overlayable, Toggleable],

  data () {
    return {
      isMini: this.mini,
      isMobile: false,
      mobileBreakPoint: 1024
    }
  },

  props: {
    absolute: Boolean,
    clipped: Boolean,
    dark: Boolean,
    disableRouteWatcher: Boolean,
    height: String,
    floating: Boolean,
    fullHeight: Boolean,
    miniVariant: Boolean,
    permanent: Boolean,
    persistent: Boolean,
    right: Boolean,
    temporary: Boolean
  },

  computed: {
    calculatedHeight () {
      return this.height || '100vh'
    },
    classes () {
      return {
        'navigation-drawer': true,
        'navigation-drawer--absolute': this.absolute,
        'navigation-drawer--clipped': this.clipped,
        'navigation-drawer--close': !this.isActive,
        'navigation-drawer--dark': this.dark,
        'navigation-drawer--floating': this.floating,
        'navigation-drawer--full-height': this.fullHeight,
        'navigation-drawer--is-mobile': this.isMobile,
        'navigation-drawer--light': !this.dark,
        'navigation-drawer--mini': this.miniVariant && this.isMini,
        'navigation-drawer--open': this.isActive,
        'navigation-drawer--permanent': this.permanent,
        'navigation-drawer--persistent': this.persistent,
        'navigation-drawer--right': this.right,
        'navigation-drawer--temporary': this.temporary
      }
    },
    showOverlay () {
      return this.isActive && (this.temporary || this.isMobile)
    }
  },

  watch: {
    miniVariant (val) {
      if (val) this.isMini = true
    },
    showOverlay (val) {
      val && this.genOverlay() || this.removeOverlay()
    },
    '$route' () {
      if (!this.disableRouteWatcher) {
        this.isActive = !this.closeConditional()
      }
    }
  },

  mounted () {
    this.$vuetify.load(this.init)
  },

  beforeDestroy () {
    if (this.permanent) return
    window.removeEventListener('resize', this.resize, { passive: false })
  },

  methods: {
    init () {
      if (this.persistent && this.temporary) this.isActive = false
      if (this.permanent) this.isActive = true

      this.resize()
      window.addEventListener('resize', this.resize, { passive: false })
    },
    closeConditional () {
      return this.temporary || this.isMobile
    },
    resize () {
      this.isMobile = window.innerWidth <= parseInt(this.mobileBreakPoint)
      this.isActive = !this.isMobile
    }
  },

  render (h) {
    const data = {
      'class': this.classes,
      style: { height: this.calculatedHeight },
      directives: [{
        name: 'click-outside',
        value: this.closeConditional
      }],
      on: {
        click: () => (this.isMini = false)
      }
    }

    return h('aside', data, [this.$slots.default])
  }
}
