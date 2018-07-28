// Styles
import '../../stylus/components/_toolbar.styl'

// Mixins
import Applicationable from '../../mixins/applicationable'
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import SSRBootable from '../../mixins/ssr-bootable'

// Directives
import Scroll from '../../directives/scroll'
import { deprecate } from '../../util/console'

/* @vue/component */
export default {
  name: 'v-toolbar',

  directives: { Scroll },

  mixins: [
    Applicationable('top', [
      'clippedLeft',
      'clippedRight',
      'computedHeight',
      'invertedScroll',
      'manualScroll'
    ]),
    Colorable,
    SSRBootable,
    Themeable
  ],

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
    /* @deprecated */
    scrollToolbarOffScreen: Boolean,
    scrollTarget: String,
    scrollThreshold: {
      type: Number,
      default: 300
    },
    tabs: Boolean
  },

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

  computed: {
    canScroll () {
      // TODO: remove
      if (this.scrollToolbarOffScreen) {
        deprecate('scrollToolbarOffScreen', 'scrollOffScreen', this)

        return true
      }

      return this.scrollOffScreen || this.invertedScroll
    },
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
      if (this.tabs) return 48
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
        'v-toolbar': true,
        'elevation-0': this.flat || (!this.isActive &&
          !this.tabs &&
          this.canScroll
        ),
        'v-toolbar--absolute': this.absolute,
        'v-toolbar--card': this.card,
        'v-toolbar--clipped': this.clippedLeft || this.clippedRight,
        'v-toolbar--dense': this.dense,
        'v-toolbar--extended': this.isExtended,
        'v-toolbar--fixed': !this.absolute && (this.app || this.fixed),
        'v-toolbar--floating': this.floating,
        'v-toolbar--prominent': this.prominent,
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
        ? this.canScroll
          ? -this.computedContentHeight
          : -this.computedHeight
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
    isScrollingUp () {
      this.savedScroll = this.savedScroll || this.currentScroll
    }
  },

  created () {
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
      if (!this.canScroll ||
        this.manualScroll ||
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
      return this.invertedScroll || this.manualScroll
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
      arg: this.scrollTarget,
      name: 'scroll',
      value: this.onScroll
    }]

    children.push(h('div', {
      staticClass: 'v-toolbar__content',
      style: { height: `${this.computedContentHeight}px` },
      ref: 'content'
    }, this.$slots.default))

    if (this.isExtended) {
      children.push(h('div', {
        staticClass: 'v-toolbar__extension',
        style: { height: `${this.computedExtensionHeight}px` }
      }, this.$slots.extension))
    }

    return h('nav', data, children)
  }
}
