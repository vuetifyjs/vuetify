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
      isActive: false,
      isBooted: false,
      isMobile: null,
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
    disableResizeWatcher: Boolean,
    height: String,
    fixed: Boolean,
    floating: Boolean,
    miniVariant: Boolean,
    miniVariantWidth: {
      type: [Number, String],
      default: 80
    },
    mobileBreakPoint: {
      type: [Number, String],
      default: 1264
    },
    permanent: Boolean,
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
        'navigation-drawer--fixed': this.fixed,
        'navigation-drawer--floating': this.floating,
        'navigation-drawer--is-booted': this.isBooted,
        'navigation-drawer--is-mobile': this.isMobile,
        'navigation-drawer--mini-variant': this.miniVariant,
        'navigation-drawer--open': this.isActive && this.isBooted,
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
      return this.isActive &&
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
      this.tryOverlay()
      this.$el.scrollTop = 0
    },
    /**
     * When mobile changes, adjust
     * the active state only when
     * there has been a previous
     * value
     */
    isMobile (val, prev) {
      // This skips normal functionality
      // when the drawer first boots up
      if (prev == null) return

      !val && this.isActive && this.removeOverlay()

      if (prev != null && !this.temporary) {
        this.isActive = !val
      }
    },
    permanent (val) {
      // If we are removing prop
      // reset active to match
      // current value
      if (!val) return (this.isActive = this.value)

      // We are enabling prop
      // set its state to match
      // viewport size
      this.isActive = !this.isMobile
    },
    right (val, prev) {
      // When the value changes
      // reset previous direction
      if (prev != null) {
        const dir = val ? 'left' : 'right'
        this.$vuetify.application[dir] = 0
      }

      this.updateApplication()
    },
    temporary (val) {
      if (!val) return

      this.tryOverlay()
    },
    value (val) {
      if (this.permanent && !this.isMobile) return
      if (val !== this.isActive) this.isActive = val
    }
  },

  mounted () {
    this.$vuetify.load(this.init)
  },

  destroyed () {
    if (this.app) {
      this.$vuetify.application[this.right ? 'right' : 'left'] = 0
    }
  },

  methods: {
    init () {
      this.checkIfMobile()

      if (this.permanent && !this.isMobile) {
        this.isActive = true
      } else if (this.value != null) {
        this.isActive = this.value
      } else {
        this.isActive = !this.isMobile
      }

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
      this.isMobile = window.innerWidth < parseInt(this.mobileBreakPoint, 10)
    },
    closeConditional () {
      return this.isMobile || this.temporary
    },
    genDirectives () {
      const directives = [
        { name: 'click-outside', value: this.closeConditional },
        {
          name: 'resize',
          value: {
            debounce: 200,
            quiet: true,
            value: this.onResize
          }
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
      if (this.disableResizeWatcher) return

      this.checkIfMobile()
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
    tryOverlay () {
      if (this.showOverlay && this.isActive) {
        return this.genOverlay()
      }

      this.removeOverlay()
    },
    updateApplication () {
      if (!this.app) return

      const width = !this.isActive ||
        this.isMobile ||
        this.temporary
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
