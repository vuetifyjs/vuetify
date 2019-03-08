// Styles
import './VAppBar.sass'

// Extensions
import VToolbar from '../VToolbar/VToolbar'

// Directives
import Scroll from '../../directives/scroll'

// Mixins
import Applicationable from '../../mixins/applicationable'
import SSRBootable from '../../mixins/ssr-bootable'
import Toggleable from '../../mixins/toggleable'

// Utilities
import { convertToUnit } from '../../util/helpers'
import { consoleWarn } from '../../util/console'
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'

export default mixins(
  VToolbar,
  SSRBootable,
  Toggleable,
  Applicationable('top', [
    'clippedLeft',
    'clippedRight',
    'computedHeight',
    'invertedScroll',
    'value'
  ])
  /* @vue/component */
).extend({
  name: 'v-app-bar',

  directives: { Scroll },

  props: {
    clippedLeft: Boolean,
    clippedRight: Boolean,
    elevateOnScroll: Boolean,
    hideOnScroll: Boolean,
    invertedScroll: Boolean,
    scrollTarget: String,
    scrollThreshold: {
      type: Number,
      default: 300
    },
    shrinkOnScroll: Boolean,
    value: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    activeTimeout: null,
    currentScroll: 0,
    isScrollingUp: false,
    previousScroll: 0,
    savedScroll: 0,
    target: null as Element | null
  }),

  computed: {
    canScroll (): boolean {
      return (
        typeof window !== 'undefined' &&
        (
          this.invertedScroll ||
          this.elevateOnScroll ||
          this.hideOnScroll ||
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
        'v-app-bar': true,
        'v-app-bar--clipped': this.clippedLeft || this.clippedRight,
        'v-app-bar--elevate-on-scroll': this.elevateOnScroll,
        'v-app-bar--fixed': !this.absolute && (this.app || this.fixed),
        'v-app-bar--hide-shadow': this.hideShadow,
        'v-app-bar--is-scrolled': this.currentScroll > 0,
        'v-app-bar--shrink-on-scroll': this.shrinkOnScroll
      }
    },
    computedContentHeight (): number {
      const height = VToolbar.options.computed.computedContentHeight.call(this)

      if (!this.shrinkOnScroll || !this.prominent) {
        return height
      }

      const max = this.dense ? 48 : 56

      return Math.max(max, height - this.currentScroll)
    },
    computedFontSize (): number | undefined {
      if (
        !this.shrinkOnScroll ||
        !this.prominent
      ) return undefined

      const max = this.dense ? 96 : 128
      const difference = max - this.computedContentHeight
      const increment = 0.00347

      // 1.5 default rem
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
    computedRight (): number {
      if (!this.app || this.clippedRight) return 0

      return this.$vuetify.application.right
    },
    computedTransform (): number {
      if (!this.canScroll || this.elevateOnScroll) return 0

      return !this.isActive
        ? -this.computedContentHeight
        : 0
    },
    currentThreshold (): number {
      return Math.abs(this.currentScroll - this.savedScroll)
    },
    hideShadow (): boolean {
      if (this.elevateOnScroll) return this.currentScroll === 0

      return this.computedTransform !== 0
    },
    styles (): object {
      return {
        ...VToolbar.options.computed.styles.call(this),
        fontSize: convertToUnit(this.computedFontSize, 'rem'),
        marginTop: convertToUnit(this.computedMarginTop),
        transform: `translateY(${convertToUnit(this.computedTransform)})`,
        left: convertToUnit(this.computedLeft),
        right: convertToUnit(this.computedRight)
      }
    }
  },

  watch: {
    currentThreshold (val: number) {
      if (this.invertedScroll) {
        this.isActive = this.currentScroll > this.scrollThreshold
        return
      }

      if (val < this.scrollThreshold) return

      if (this.hideOnScroll) {
        this.isActive = this.isScrollingUp
      }

      this.savedScroll = this.currentScroll
    },
    invertedScroll (val: boolean) {
      this.isActive = !val
    },
    isScrollingUp () {
      this.savedScroll = this.savedScroll || this.currentScroll
    },
    isActive () {
      this.savedScroll = 0
    }
  },

  created () {
    if (this.invertedScroll) this.isActive = false
  },

  mounted () {
    if (this.scrollTarget) {
      this.target = document.querySelector(this.scrollTarget)

      if (!this.target) {
        consoleWarn(`Unable to locate element with identifier ${this.scrollTarget}`, this)
      } else {
        this.target.addEventListener('scroll', this.onScroll, { passive: true })
      }
    }
  },

  beforeDestroy () {
    this.target && this.target.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll () {
      if (!this.canScroll) return

      this.currentScroll = this.target
        ? this.target.scrollTop
        : window.pageYOffset

      this.isScrollingUp = this.currentScroll < this.previousScroll
      this.previousScroll = this.currentScroll
    },
    updateApplication (): number {
      return this.invertedScroll
        ? 0
        : this.$el ? this.$el.clientHeight : 0
    }
  },

  render (h): VNode {
    const render = VToolbar.options.render.call(this, h)

    render.data = render.data || {}
    render.data.directives = render.data.directives || []
    render.data.directives.push({
      arg: this.scrollTarget,
      name: 'scroll',
      value: this.onScroll
    })

    return render
  }
})
