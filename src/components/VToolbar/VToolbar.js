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
      'computedHeight',
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
    isActive: true,
    isExtended: false,
    isScrollingUp: false,
    previousScroll: null,
    previousScrollDirection: null,
    savedScroll: 0,
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
    manualScroll: Boolean,
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
        'elevation-0': this.flat || (!this.isActive && !this.tabs),
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
    computedTransform () {
      return !this.isActive
        ? -this.computedHeight
        : 0
    },
    currentThreshold () {
      return Math.abs(this.currentScroll - this.savedScroll)
    },
    styles () {
      return {
        marginTop: `${this.computedMarginTop}px`,
        paddingRight: `${this.computedPaddingRight}px`,
        paddingLeft: `${this.computedPaddingLeft}px`,
        transform: `translateY(${this.computedTransform}px)`
      }
    }
  },

  watch: {
    currentThreshold (val) {
      if (this.invertedScroll) {
        return this.isActive = this.currentScroll > this.scrollThreshold
      }

      if (val < this.scrollThreshold ||
        !this.isBooted
      ) return

      this.isActive = this.isScrollingUp
      this.savedScroll = this.currentScroll
    },
    isActive () {
      this.savedScroll = 0
    },
    invertedScroll (val) {
      this.isActive = !val
    },
    manualScroll (val) {
      this.isActive = !val
    },
    isScrollingUp (val) {
      this.savedScroll = this.savedScroll || this.currentScroll
    }
  },

  beforeMount () {
    if (this.invertedScroll ||
      this.manualScroll
    ) this.isActive = false
  },

  mounted () {
    if (this.scrollTarget) {
      this.target = document.querySelector(this.scrollTarget)
    }
  },

  methods: {
    onScroll () {
      if (!this.scrollOffScreen ||
        typeof window === 'undefined'
      ) return

      const target = this.target || window

      this.currentScroll = this.scrollTarget
        ? target.scrollTop
        : target.pageYOffset || document.documentElement.scrollTop

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

    data.directives = [{
      name: 'scroll',
      value: {
        callback: this.onScroll,
        target: this.scrollTarget
      }
    }]

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
