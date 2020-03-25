// Styles
import './VAppBar.sass'

// Extensions
import VToolbar from '../VToolbar/VToolbar'

// Directives
import Scroll from '../../directives/scroll'

// Mixins
import Applicationable from '../../mixins/applicationable'
import Scrollable from '../../mixins/scrollable'
import SSRBootable from '../../mixins/ssr-bootable'
import Toggleable from '../../mixins/toggleable'

// Utilities
import { convertToUnit } from '../../util/helpers'
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'

const baseMixins = mixins(
  VToolbar,
  Scrollable,
  SSRBootable,
  Toggleable,
  Applicationable('top', [
    'clippedLeft',
    'clippedRight',
    'computedHeight',
    'invertedScroll',
    'isExtended',
    'isProminent',
    'value',
  ])
)

/* @vue/component */
export default baseMixins.extend({
  name: 'v-app-bar',

  directives: { Scroll },

  props: {
    clippedLeft: Boolean,
    clippedRight: Boolean,
    collapseOnScroll: Boolean,
    elevateOnScroll: Boolean,
    fadeImgOnScroll: Boolean,
    hideOnScroll: Boolean,
    invertedScroll: Boolean,
    scrollOffScreen: Boolean,
    shrinkOnScroll: Boolean,
    value: {
      type: Boolean,
      default: true,
    },
  },

  data () {
    return {
      isActive: this.value,
    }
  },

  computed: {
    applicationProperty (): string {
      return !this.bottom ? 'top' : 'bottom'
    },
    canScroll (): boolean {
      return (
        Scrollable.options.computed.canScroll.call(this) &&
        (
          this.invertedScroll ||
          this.elevateOnScroll ||
          this.hideOnScroll ||
          this.collapseOnScroll ||
          this.isBooted ||
          // If falsey, user has provided an
          // explicit value which should
          // overwrite anything we do
          !this.value
        )
      )
    },
    classes (): object {
      return {
        ...VToolbar.options.computed.classes.call(this),
        'v-toolbar--collapse': this.collapse || this.collapseOnScroll,
        'v-app-bar': true,
        'v-app-bar--clipped': this.clippedLeft || this.clippedRight,
        'v-app-bar--fade-img-on-scroll': this.fadeImgOnScroll,
        'v-app-bar--elevate-on-scroll': this.elevateOnScroll,
        'v-app-bar--fixed': !this.absolute && (this.app || this.fixed),
        'v-app-bar--hide-shadow': this.hideShadow,
        'v-app-bar--is-scrolled': this.currentScroll > 0,
        'v-app-bar--shrink-on-scroll': this.shrinkOnScroll,
      }
    },
    computedContentHeight (): number {
      if (!this.shrinkOnScroll) return VToolbar.options.computed.computedContentHeight.call(this)

      const height = this.computedOriginalHeight

      const min = this.dense ? 48 : 56
      const max = height
      const difference = max - min
      const iteration = difference / this.computedScrollThreshold
      const offset = this.currentScroll * iteration

      return Math.max(min, max - offset)
    },
    computedFontSize (): number | undefined {
      if (!this.isProminent) return undefined

      const max = this.dense ? 96 : 128
      const difference = max - this.computedContentHeight
      const increment = 0.00347

      // 1.5rem to a minimum of 1.25rem
      return Number((1.50 - difference * increment).toFixed(2))
    },
    computedLeft (): number {
      if (!this.app || this.clippedLeft) return 0

      return this.$vuetify.application.left
    },
    computedMarginTop (): number {
      if (!this.app) return 0

      return this.$vuetify.application.bar
    },
    computedOpacity (): number | undefined {
      if (!this.fadeImgOnScroll) return undefined

      const opacity = Math.max(
        (this.computedScrollThreshold - this.currentScroll) / this.computedScrollThreshold,
        0
      )

      return Number(parseFloat(opacity).toFixed(2))
    },
    computedOriginalHeight (): number {
      let height = VToolbar.options.computed.computedContentHeight.call(this)
      if (this.isExtended) height += parseInt(this.extensionHeight)
      return height
    },
    computedRight (): number {
      if (!this.app || this.clippedRight) return 0

      return this.$vuetify.application.right
    },
    computedScrollThreshold (): number {
      if (this.scrollThreshold) return Number(this.scrollThreshold)

      return this.computedOriginalHeight - (this.dense ? 48 : 56)
    },
    computedTransform (): number {
      if (
        !this.canScroll ||
        (this.elevateOnScroll && this.currentScroll === 0 && this.isActive)
      ) return 0

      if (this.isActive) return 0

      const scrollOffScreen = this.scrollOffScreen
        ? this.computedHeight
        : this.computedContentHeight

      return this.bottom ? scrollOffScreen : -scrollOffScreen
    },
    hideShadow (): boolean {
      if (this.elevateOnScroll && this.isExtended) {
        return this.currentScroll < this.computedScrollThreshold
      }

      if (this.elevateOnScroll) {
        return this.currentScroll === 0 ||
          this.computedTransform < 0
      }

      return (
        !this.isExtended ||
        this.scrollOffScreen
      ) && this.computedTransform !== 0
    },
    isCollapsed (): boolean {
      if (!this.collapseOnScroll) {
        return VToolbar.options.computed.isCollapsed.call(this)
      }

      return this.currentScroll > 0
    },
    isProminent (): boolean {
      return (
        VToolbar.options.computed.isProminent.call(this) ||
        this.shrinkOnScroll
      )
    },
    styles (): object {
      return {
        ...VToolbar.options.computed.styles.call(this),
        fontSize: convertToUnit(this.computedFontSize, 'rem'),
        marginTop: convertToUnit(this.computedMarginTop),
        transform: `translateY(${convertToUnit(this.computedTransform)})`,
        left: convertToUnit(this.computedLeft),
        right: convertToUnit(this.computedRight),
      }
    },
  },

  watch: {
    canScroll: 'onScroll',
    computedTransform () {
      // Normally we do not want the v-app-bar
      // to update the application top value
      // to avoid screen jump. However, in
      // this situation, we must so that
      // the clipped drawer can update
      // its top value when scrolled
      if (
        !this.canScroll ||
        (!this.clippedLeft && !this.clippedRight)
      ) return

      this.callUpdate()
    },
    invertedScroll (val: boolean) {
      this.isActive = !val || this.currentScroll !== 0
    },
  },

  created () {
    if (this.invertedScroll) this.isActive = false
  },

  methods: {
    genBackground () {
      const render = VToolbar.options.methods.genBackground.call(this)

      render.data = this._b(render.data || {}, render.tag!, {
        style: { opacity: this.computedOpacity },
      })

      return render
    },
    updateApplication (): number {
      return this.invertedScroll
        ? 0
        : this.computedHeight + this.computedTransform
    },
    thresholdMet () {
      if (this.invertedScroll) {
        this.isActive = this.currentScroll > this.computedScrollThreshold
        return
      }

      if (this.currentThreshold < this.computedScrollThreshold) return

      if (this.hideOnScroll) {
        this.isActive = this.isScrollingUp
      }

      this.savedScroll = this.currentScroll
    },
  },

  render (h): VNode {
    const render = VToolbar.options.render.call(this, h)

    render.data = render.data || {}

    if (this.canScroll) {
      render.data.directives = render.data.directives || []
      render.data.directives.push({
        arg: this.scrollTarget,
        name: 'scroll',
        value: this.onScroll,
      })
    }

    return render
  },
})
