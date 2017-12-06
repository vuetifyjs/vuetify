require('../../stylus/components/_navigation-drawer.styl')

// Mixins
import Applicationable from '../../mixins/applicationable'
import Overlayable from '../../mixins/overlayable'
import SSRBootable from '../../mixins/ssr-bootable'
import Themeable from '../../mixins/themeable'

// Directives
import ClickOutside from '../../directives/click-outside'
import Resize from '../../directives/resize'
import Touch from '../../directives/touch'

export default {
  name: 'v-navigation-drawer',

  mixins: [
    Applicationable(null, [
      'miniVariant',
      'right',
      'width'
    ]),
    Overlayable,
    SSRBootable,
    Themeable
  ],

  directives: {
    ClickOutside,
    Resize,
    Touch
  },

  data: () => ({
    isActive: false,
    touchArea: {
      left: 0,
      right: 0
    }
  }),

  props: {
    clipped: Boolean,
    disableRouteWatcher: Boolean,
    disableResizeWatcher: Boolean,
    height: {
      type: [Number, String],
      default: '100%'
    },
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
    stateless: Boolean,
    temporary: Boolean,
    touchless: Boolean,
    width: {
      type: [Number, String],
      default: 300
    },
    value: { required: false }
  },

  computed: {
    /**
     * Used for setting an app
     * value from a dynamic
     * property. Called from
     * applicationable.js
     *
     * @return {string}
     */
    applicationProperty () {
      return this.right ? 'right' : 'left'
    },
    calculatedHeight () {
      return isNaN(this.height) ? this.height : `${this.height}px`
    },
    calculatedTransform () {
      if (this.isActive) return 0

      return this.right
        ? this.calculatedWidth
        : -this.calculatedWidth
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
        'navigation-drawer--close': !this.isActive,
        'navigation-drawer--fixed': !this.absolute && (this.app || this.fixed),
        'navigation-drawer--floating': this.floating,
        'navigation-drawer--is-booted': this.isBooted,
        'navigation-drawer--is-mobile': this.isMobile,
        'navigation-drawer--mini-variant': this.miniVariant,
        'navigation-drawer--open': this.isActive,
        'navigation-drawer--right': this.right,
        'navigation-drawer--temporary': this.temporary,
        'theme--dark': this.dark,
        'theme--light': this.light
      }
    },
    isMobile () {
      return !this.permanent &&
        !this.temporary &&
        this.$vuetify.breakpoint.width < parseInt(this.mobileBreakPoint, 10)
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
    reactsToClick () {
      return !this.stateless &&
        !this.permanent &&
        (this.isMobile || this.temporary)
    },
    reactsToMobile () {
      return !this.disableResizeWatcher &&
        !this.stateless &&
        !this.permanent &&
        !this.temporary
    },
    reactsToRoute () {
      return !this.disableRouteWatcher &&
        !this.stateless &&
        !this.permanent
    },
    resizeIsDisabled () {
      return this.disableResizeWatcher || this.stateless
    },
    showOverlay () {
      return this.isActive &&
        (this.temporary || this.isMobile)
    },
    styles () {
      const styles = {
        height: this.calculatedHeight,
        marginTop: `${this.marginTop}px`,
        maxHeight: `calc(100% - ${this.maxHeight}px)`,
        transform: `translateX(${this.calculatedTransform}px)`,
        width: `${this.calculatedWidth}px`
      }

      return styles
    }
  },

  watch: {
    $route () {
      if (this.reactsToRoute) {
        this.isActive = !this.closeConditional()
      }
    },
    isActive (val) {
      this.$emit('input', val)

      if (this.temporary || this.isMobile) {
        this.tryOverlay()
        this.$el && (this.$el.scrollTop = 0)
      }

      this.callUpdate()
    },
    /**
     * When mobile changes, adjust
     * the active state only when
     * there has been a previous
     * value
     */
    isMobile (val, prev) {
      !val &&
        this.isActive &&
        !this.temporary &&
        this.removeOverlay()

      if (prev == null ||
        this.resizeIsDisabled ||
        !this.reactsToMobile
      ) return

      this.isActive = !val
      this.callUpdate()
    },
    permanent (val) {
      // If enabling prop
      // enable the drawer
      if (val) {
        this.isActive = true
      }
      this.callUpdate()
    },
    temporary () {
      this.tryOverlay()
      this.callUpdate()
    },
    value (val) {
      if (this.permanent) return

      if (val !== this.isActive) this.isActive = val
    }
  },

  beforeMount () {
    this.init()
  },

  methods: {
    calculateTouchArea () {
      if (!this.$el.parentNode) return
      const parentRect = this.$el.parentNode.getBoundingClientRect()

      this.touchArea = {
        left: parentRect.left + 50,
        right: parentRect.right - 50
      }
    },
    closeConditional () {
      return this.reactsToClick
    },
    genDirectives () {
      const directives = [
        { name: 'click-outside', value: this.closeConditional }
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
    /**
     * Sets state before mount to avoid
     * entry transitions in SSR
     *
     * @return {void}
     */
    init () {
      if (this.permanent) {
        this.isActive = true
      } else if (this.stateless ||
        this.value != null
      ) {
        this.isActive = this.value
      } else if (!this.temporary) {
        this.isActive = !this.isMobile
      }
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
      if (!this.permanent &&
        this.showOverlay &&
        this.isActive
      ) {
        return this.genOverlay()
      }

      this.removeOverlay()
    },
    /**
     * Update the application layout
     *
     * @return {number}
     */
    updateApplication () {
      return !this.isActive ||
        this.temporary ||
        this.isMobile
        ? 0
        : this.calculatedWidth
    }
  },

  render (h) {
    const data = {
      'class': this.classes,
      style: this.styles,
      directives: this.genDirectives(),
      on: {
        click: () => {
          if (!this.miniVariant) return

          this.$emit('update:miniVariant', false)
        }
      }
    }

    return h('aside', data, [
      this.$slots.default,
      h('div', { 'class': 'navigation-drawer__border' })
    ])
  }
}
