require('../../stylus/components/_navigation-drawer.styl')

import Applicationable from '../../mixins/applicationable'
import Overlayable from '../../mixins/overlayable'
import Themeable from '../../mixins/themeable'

import ClickOutside from '../../directives/click-outside'
import Resize from '../../directives/resize'
import Touch from '../../directives/touch'

export default {
  name: 'v-navigation-drawer',

  mixins: [Applicationable, Overlayable, Themeable],

  directives: {
    ClickOutside,
    Resize,
    Touch
  },

  data () {
    return {
      isActive: this.value,
      isBooted: false,
      isMobile: false,
      touchArea: {
        left: 0,
        right: 0
      }
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
    miniVariantWidth: {
      type: [Number, String],
      default: 80
    },
    mobileBreakPoint: {
      type: Number,
      default: 1264
    },
    permanent: Boolean,
    persistent: Boolean,
    right: Boolean,
    temporary: Boolean,
    touchless: Boolean,
    width: {
      type: [Number, String],
      default: 300
    },
    value: { required: false }
  },

  computed: {
    calculatedHeight () {
      return this.height || '100%'
    },
    calculatedWidth () {
      return this.miniVariant
        ? this.miniVariantWidth
        : this.width
    },
    classes () {
      return {
        'navigation-drawer': true,
        'navigation-drawer--absolute': this.absolute,
        'navigation-drawer--clipped': this.clipped,
        'navigation-drawer--close': !this.isBooted || !this.isActive,
        'navigation-drawer--floating': this.floating,
        'navigation-drawer--is-booted': this.isBooted,
        'navigation-drawer--is-mobile': this.isMobile,
        'navigation-drawer--mini-variant': this.miniVariant,
        'navigation-drawer--open': this.isActive && this.isBooted,
        'navigation-drawer--permanent': this.permanent,
        'navigation-drawer--persistent': this.persistent,
        'navigation-drawer--right': this.right,
        'navigation-drawer--temporary': this.temporary,
        'theme--dark': this.dark,
        'theme--light': this.light
      }
    },
    marginTop () {
      if (!this.app) return 0
      let marginTop = this.$vuetify.application.bar

      marginTop += this.clipped
        ? this.$vuetify.application.top
        : 0

      return marginTop
    },
    maxHeight () {
      if (!this.app) return '100%'

      return this.clipped
        ? this.$vuetify.application.top + this.$vuetify.application.bottom
        : this.$vuetify.application.bottom
    },
    showOverlay () {
      return !this.permanent &&
        this.isActive &&
        (this.temporary || this.isMobile)
    },
    styles () {
      return {
        height: this.calculatedHeight,
        marginTop: `${this.marginTop}px`,
        maxHeight: `calc(100% - ${this.maxHeight}px)`,
        width: `${this.calculatedWidth}px`
      }
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
      this.showOverlay &&
        val &&
        this.genOverlay() ||
        this.removeOverlay()
      this.$el.scrollTop = 0
    },
    isMobile (val) {
      !val && this.removeOverlay()
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
      if (this.value != null) this.isActive = this.value
      else if (this.permanent) this.isActive = true
      else if (this.isMobile) this.isActive = false
      else if (!this.value &&
        (this.persistent || this.temporary)
      ) this.isActive = false
      else this.isActive = true

      setTimeout(() => (this.isBooted = true), 0)
    },
    calculateTouchArea () {
      if (!this.$el.parentNode) return
      const parentRect = this.$el.parentNode.getBoundingClientRect()

      this.touchArea = {
        left: parentRect.left + 50,
        right: parentRect.right - 50
      }
    },
    checkIfMobile () {
      this.isMobile = window.innerWidth < parseInt(this.mobileBreakPoint)
    },
    closeConditional () {
      return !this.permanent && (this.temporary || this.isMobile)
    },
    genDirectives () {
      const directives = [
        {
          name: 'click-outside',
          value: this.closeConditional
        },
        {
          name: 'resize',
          value: this.onResize
        }
      ]

      !this.touchless && directives.push({
        name: 'touch',
        value: {
          parent: true,
          left: this.swipeLeft,
          right: this.swipeRight
        }
      })

      return directives
    },
    onResize () {
      if (!this.enableResizeWatcher ||
        this.permanent ||
        this.temporary
      ) return

      this.checkIfMobile()

      this.isActive = !this.isMobile
    },
    swipeRight (e) {
      if (this.isActive && !this.right) return
      this.calculateTouchArea()

      if (Math.abs(e.touchendX - e.touchstartX) < 100) return
      else if (!this.right &&
        e.touchstartX <= this.touchArea.left
      ) this.isActive = true
      else if (this.right && this.isActive) this.isActive = false
    },
    swipeLeft (e) {
      if (this.isActive && this.right) return
      this.calculateTouchArea()

      if (Math.abs(e.touchendX - e.touchstartX) < 100) return
      else if (this.right &&
        e.touchstartX >= this.touchArea.right
      ) this.isActive = true
      else if (!this.right && this.isActive) this.isActive = false
    },
    updateApplication () {
      if (!this.app) return

      const width = !this.isActive ||
        !this.isBooted ||
        !this.permanent &&
        this.$vuetify.breakpoint.width < this.mobileBreakPoint
        ? 0
        : this.calculatedWidth

      if (this.right) {
        this.$vuetify.application.right = width
      } else {
        this.$vuetify.application.left = width
      }
    }
  },

  render (h) {
    this.updateApplication()

    const data = {
      'class': this.classes,
      style: this.styles,
      directives: this.genDirectives(),
      on: {
        click: () => this.$emit('update:miniVariant', false)
      }
    }

    return h('aside', data, [
      this.$slots.default,
      h('div', { 'class': 'navigation-drawer__border' })
    ])
  }
}
