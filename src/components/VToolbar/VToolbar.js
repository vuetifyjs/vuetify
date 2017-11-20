require('../../stylus/components/_toolbar.styl')

import Applicationable from '../../mixins/applicationable'
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import SSRBootable from '../../mixins/ssr-bootable'

export default {
  name: 'v-toolbar',

  mixins: [
    Applicationable,
    Colorable,
    SSRBootable,
    Themeable
  ],

  data: () => ({
    currentScroll: 0,
    heights: {
      mobileLandscape: 48,
      mobile: 56,
      desktop: 64,
      dense: 48
    },
    isExtended: false,
    isScrollingUp: false,
    previousScroll: null,
    target: null
  }),

  props: {
    absolute: Boolean,
    card: Boolean,
    clippedLeft: Boolean,
    clippedRight: Boolean,
    dense: Boolean,
    extended: Boolean,
    extensionHeight: [Number, String],
    fixed: Boolean,
    flat: Boolean,
    floating: Boolean,
    height: [Number, String],
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
    classes () {
      return this.addBackgroundColorClassChecks({
        'toolbar': true,
        'elevation-0': this.flat || (!this.isActive && !this.tabs),
        'toolbar--absolute': this.absolute,
        'toolbar--card': this.card,
        'toolbar--clipped': this.clippedLeft || this.clippedRight,
        'toolbar--dense': this.dense,
        'toolbar--extended': this.isExtended,
        'toolbar--fixed': this.fixed,
        'toolbar--floating': this.floating,
        'toolbar--is-booted': this.isBooted,
        'toolbar--prominent': this.prominent,
        'theme--dark': this.dark,
        'theme--light': this.light
      })
    },
    paddingLeft () {
      if (!this.app || this.clippedLeft) return 0

      return this.$vuetify.application.left
    },
    paddingRight () {
      if (!this.app || this.clippedRight) return 0

      return this.$vuetify.application.right
    },
    isActive () {
      if (!this.scrollOffScreen) return true
      if (this.manualScroll) return this.manualScroll

      return this.invertedScroll
        ? this.currentScroll > this.scrollThreshold
        : this.currentScroll < this.scrollThreshold ||
          this.isScrollingUp
    },
    styles () {
      const style = {}

      if (!this.isActive) {
        style.transform = `translateY(-${this.computedHeight}px)`
      }

      if (this.app) {
        style.paddingRight = `${this.paddingRight}px`
        style.paddingLeft = `${this.paddingLeft}px`
      }

      return style
    }
  },

  watch: {
    clippedLeft (val) {
      this.updateApplication()
    },
    clippedRight (val) {
      this.updateApplication()
    },
    isScrolling (val) {
      this.updateApplication()
    }
  },

  destroyed () {
    if (this.app) this.$vuetify.application.top -= this.computedHeight
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
    updateApplication () {
      if (!this.app) return

      this.$vuetify.application.top = !this.fixed &&
        !this.absolute ||
        this.invertedScroll
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
