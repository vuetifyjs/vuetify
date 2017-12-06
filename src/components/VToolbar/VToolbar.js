// Styles
require('../../stylus/components/_toolbar.styl')

// Mixins
import Applicationable from '../../mixins/applicationable'
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import SSRBootable from '../../mixins/ssr-bootable'

// Directives
import Scroll from '../../directives/scroll'

export default {
  name: 'v-toolbar',

  mixins: [
    Applicationable('top', [
      'clippedLeft',
      'clippedRight',
      'height',
      'invertedScroll'
    ]),
    Colorable,
    SSRBootable,
    Themeable
  ],

  directives: { Scroll },

  data: () => ({
    activeTimeout: null,
    currentScroll: 0,
    heights: {
      mobileLandscape: 48,
      mobile: 56,
      desktop: 64,
      dense: 48
    },
    isActiveProxy: false,
    isExtended: false,
    isScrollingUp: false,
    previousScroll: null,
    previousScrollDirection: null,
    target: null
  }),

  props: {
    card: Boolean,
    clippedLeft: Boolean,
    clippedRight: Boolean,
    dense: Boolean,
    extended: Boolean,
    extensionHeight: {
      type: [Number, String],
      validator: v => !isNaN(parseInt(v))
    },
    flat: Boolean,
    floating: Boolean,
    height: {
      type: [Number, String],
      validator: v => !isNaN(parseInt(v))
    },
    invertedScroll: Boolean,
    manualScroll: {
      type: Boolean,
      default: null
    },
    prominent: Boolean,
    scrollOffScreen: Boolean,
    scrollTarget: String,
    scrollThreshold: {
      type: Number,
      default: 300
    },
    tabs: Boolean
  },

  computed: {
    computedContentHeight () {
      if (this.height) return parseInt(this.height)
      if (this.dense) return this.heights.dense

      if (this.prominent ||
        this.$vuetify.breakpoint.mdAndUp
      ) return this.heights.desktop

      if (this.$vuetify.breakpoint.width >
        this.$vuetify.breakpoint.height
      ) return this.heights.mobileLandscape

      return this.heights.mobile
    },
    computedExtensionHeight () {
      if (this.extensionHeight) return parseInt(this.extensionHeight)

      return this.computedContentHeight
    },
    computedHeight () {
      if (!this.isExtended) return this.computedContentHeight

      return this.computedContentHeight + this.computedExtensionHeight
    },
    computedMarginTop () {
      if (!this.app) return 0

      return this.$vuetify.application.bar
    },
    classes () {
      return this.addBackgroundColorClassChecks({
        'toolbar': true,
        'elevation-0': this.flat || (!this.isActiveProxy && !this.tabs),
        'toolbar--absolute': this.absolute,
        'toolbar--card': this.card,
        'toolbar--clipped': this.clippedLeft || this.clippedRight,
        'toolbar--dense': this.dense,
        'toolbar--extended': this.isExtended,
        'toolbar--fixed': !this.absolute && (this.app || this.fixed),
        'toolbar--floating': this.floating,
        'toolbar--is-booted': this.isBooted,
        'toolbar--prominent': this.prominent,
        'theme--dark': this.dark,
        'theme--light': this.light
      })
    },
    computedPaddingLeft () {
      if (!this.app || this.clippedLeft) return 0

      return this.$vuetify.application.left
    },
    computedPaddingRight () {
      if (!this.app || this.clippedRight) return 0

      return this.$vuetify.application.right
    },
    isActive () {
      if (!this.scrollOffScreen) return true
      if (this.manualScroll != null) return !this.manualScroll

      return this.invertedScroll
        ? this.currentScroll > this.scrollThreshold
        : this.currentScroll < this.scrollThreshold ||
          this.isScrollingUp
    },
    styles () {
      const style = {}

      if (!this.isActiveProxy) {
        style.transform = `translateY(-${this.computedHeight}px)`
      }

      if (this.computedMarginTop) {
        style.marginTop = `${this.computedMarginTop}px`
      }

      if (this.app) {
        style.paddingRight = `${this.computedPaddingRight}px`
        style.paddingLeft = `${this.computedPaddingLeft}px`
      }

      return style
    }
  },

  watch: {
    // This is to avoid an accidental
    // false positive when scrolling.
    // sometimes for 1 frame it appears
    // as if the direction has changed
    // but it actually has not
    isActive: {
      immediate: true,
      handler (val) {
        clearTimeout(this.activeTimeout)

        this.activeTimeout = setTimeout(() => {
          this.isActiveProxy = val
        }, 20)
      }
    }
  },

  methods: {
    onScroll () {
      if (typeof window === 'undefined') return

      if (!this.target) {
        this.target = this.scrollTarget
          ? document.querySelector(this.scrollTarget)
          : window
      }

      this.currentScroll = this.scrollTarget
        ? this.target.scrollTop
        : this.target.pageYOffset || document.documentElement.scrollTop

      this.isScrollingUp = this.currentScroll < this.previousScroll

      this.previousScroll = this.currentScroll
    },
    /**
     * Update the application layout
     *
     * @return {number}
     */
    updateApplication () {
      return this.invertedScroll
        ? 0
        : this.computedHeight
    }
  },

  render (h) {
    this.isExtended = this.extended || !!this.$slots.extension

    const children = []
    const data = {
      'class': this.classes,
      style: this.styles,
      on: this.$listeners
    }

    if (this.scrollOffScreen) {
      data.directives = [{
        name: 'scroll',
        value: {
          callback: this.onScroll,
          target: this.scrollTarget
        }
      }]
    }

    children.push(h('div', {
      staticClass: 'toolbar__content',
      style: { height: `${this.computedContentHeight}px` },
      ref: 'content'
    }, this.$slots.default))

    if (this.isExtended) {
      children.push(h('div', {
        staticClass: 'toolbar__extension',
        style: { height: `${this.computedExtensionHeight}px` }
      }, this.$slots.extension))
    }

    return h('nav', data, children)
  }
}
