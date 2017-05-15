import Overlayable from '../../mixins/overlayable'

export default {
  name: 'navigation-drawer',

  mixins: [Overlayable],

  data () {
    return {
      isActive: this.value,
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
    temporary: Boolean,
    value: { required: false }
  },

  computed: {
    calculatedHeight () {
      return this.height || '100%'
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
        'navigation-drawer--mini-variant': this.miniVariant,
        'navigation-drawer--open': this.isActive,
        'navigation-drawer--permanent': this.permanent,
        'navigation-drawer--persistent': this.persistent,
        'navigation-drawer--right': this.right,
        'navigation-drawer--temporary': this.temporary
      }
    },
    showOverlay () {
      return !this.permanent && this.isActive && (this.temporary || this.isMobile)
    }
  },

  watch: {
    isActive (val) {
      this.$emit('input', val)
    },
    showOverlay (val) {
      val && this.genOverlay() || this.removeOverlay()
    },
    '$route' () {
      if (!this.disableRouteWatcher) {
        this.isActive = !this.closeConditional()
      }
    },
    value (val) {
      if (this.permanent) return
      if (val !== this.isActive) this.isActive = val
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
      this.checkIfMobile()

      if (this.permanent) {
        this.isActive = true
        return
      } else if (this.isMobile) this.isActive = false
      else if (!this.value && (this.persistent || this.temporary)) this.isActive = false

      window.addEventListener('resize', this.resize, { passive: false })
    },
    checkIfMobile () {
      this.isMobile = window.innerWidth <= parseInt(this.mobileBreakPoint)
    },
    closeConditional () {
      return !this.permanent && (this.temporary || this.isMobile)
    },
    resize () {
      if (this.permanent || this.temporary) return
      this.checkIfMobile()
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
        click: () => {
          this.$emit('update:miniVariant', false)
        }
      }
    }

    return h('aside', data, [this.$slots.default])
  }
}
