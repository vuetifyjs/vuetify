import Overlayable from '~mixins/overlayable'
import Resizable from '~mixins/resizable'
import Themeable from '~mixins/themeable'

export default {
  name: 'navigation-drawer',

  mixins: [Overlayable, Resizable, Themeable],

  data () {
    return {
      isActive: this.value,
      isBooted: false,
      isMobile: false,
      mobileBreakPoint: 1024
    }
  },

  props: {
    absolute: Boolean,
    clipped: Boolean,
    disableRouteWatcher: Boolean,
    enableResizeWatcher: Boolean,
    height: String,
    floating: Boolean,
    miniVariant: Boolean,
    permanent: Boolean,
    persistent: Boolean,
    right: Boolean,
    temporary: Boolean,
    touchless: Boolean,
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
        'navigation-drawer--floating': this.floating,
        'navigation-drawer--is-booted': this.isBooted,
        'navigation-drawer--is-mobile': this.isMobile,
        'navigation-drawer--mini-variant': this.miniVariant,
        'navigation-drawer--open': this.isActive,
        'navigation-drawer--permanent': this.permanent,
        'navigation-drawer--persistent': this.persistent,
        'navigation-drawer--right': this.right,
        'navigation-drawer--temporary': this.temporary,
        'theme--dark': this.dark,
        'theme--light': this.light
      }
    },
    showOverlay () {
      return !this.permanent && this.isActive && (this.temporary || this.isMobile)
    }
  },

  watch: {
    $route () {
      if (!this.disableRouteWatcher) {
        this.isActive = !this.closeConditional()
      }
    },
    isActive (val) {
      this.$emit('input', val)
      this.showOverlay && val && this.genOverlay() || this.removeOverlay()
      this.$el.scrollTop = 0
    },
    permanent (val) {
      this.$emit('input', val)
    },
    value (val) {
      if (this.permanent) return
      if (val !== this.isActive) this.isActive = val
    }
  },

  mounted () {
    this.$vuetify.load(this.init)
  },

  methods: {
    init () {
      this.checkIfMobile()
      setTimeout(() => (this.isBooted = true), 0)

      if (this.permanent) return (this.isActive = true)
      else if (this.isMobile) this.isActive = false
      else if (!this.value && (this.persistent || this.temporary)) this.isActive = false
    },
    checkIfMobile () {
      this.isMobile = window.innerWidth < parseInt(this.mobileBreakPoint)
    },
    closeConditional () {
      return !this.permanent && (this.temporary || this.isMobile)
    },
    onResize () {
      if (!this.enableResizeWatcher || this.permanent || this.temporary) return
      this.checkIfMobile()
      this.isActive = !this.isMobile
    },
    swipeRight (e) {
      if (this.isActive && !this.right) return
      this.calculateTouchArea()

      if (Math.abs(e.touchendX - e.touchstartX) < 100) return
      else if (!this.right && e.touchstartX <= this.touchArea.left) this.isActive = true
      else if (this.right && this.isActive) this.isActive = false
    },
    swipeLeft (e) {
      if (this.isActive && this.right) return
      this.calculateTouchArea()

      if (Math.abs(e.touchendX - e.touchstartX) < 100) return
      else if (this.right && e.touchstartX >= this.touchArea.right) this.isActive = true
      else if (!this.right && this.isActive) this.isActive = false
    },
    calculateTouchArea () {
      const parentRect = this.$el.parentNode.getBoundingClientRect()

      this.touchArea = {
        left: parentRect.left + 50,
        right: parentRect.right - 50
      }
    },
    genDirectives () {
      const directives = [{
        name: 'click-outside',
        value: this.closeConditional
      }]

      !this.touchless && directives.push({
        name: 'touch',
        value: {
          parent: true,
          left: this.swipeLeft,
          right: this.swipeRight
        }
      })

      return directives
    }
  },

  render (h) {
    const data = {
      'class': this.classes,
      style: { height: this.calculatedHeight },
      directives: this.genDirectives(),
      on: Object.assign({}, {
        click: () => this.$emit('update:miniVariant', false)
      }, this.$listeners)
    }

    return h('aside', data, this.$slots.default)
  }
}
