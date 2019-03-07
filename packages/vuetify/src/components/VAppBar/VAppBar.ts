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
import mixins from '../../util/mixins'
import { deprecate } from '../../util/console'

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
    'manualScroll'
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
    manualScroll: Boolean,
    /* @deprecated */
    scrollOffScreen: Boolean,
    scrollTarget: String,
    scrollThreshold: {
      type: Number,
      default: 300
    },
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
          this.scrollOffScreen ||
          this.invertedScroll ||
          this.elevateOnScroll ||
          this.hideOnScroll
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
        'v-app-bar--is-scrolled': this.currentScroll > 0
      }
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
        marginTop: convertToUnit(this.computedMarginTop),
        transform: `translateY(${convertToUnit(this.computedTransform)})`,
        left: convertToUnit(this.computedLeft),
        right: convertToUnit(this.computedRight)
      }
    }
  },

  watch: {
    currentThreshold (val: number) {
      // If falsey, user has provided an
      // explicit value which should
      // overwrite anything we do
      if (!this.value) return

      if (this.invertedScroll) {
        this.isActive = this.currentScroll > this.scrollThreshold
        return
      }

      if (val < this.scrollThreshold ||
        !this.isBooted
      ) return

      this.isActive = this.isScrollingUp
      this.savedScroll = this.currentScroll
    },
    invertedScroll (val: boolean) {
      this.isActive = !val
    },
    manualScroll (val: boolean) {
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
    if (this.manualScroll) {
      deprecate('manual-scroll', 'value')
    }

    if (this.scrollOffScreen) {
      deprecate('scroll-off-screen', 'hide-on-scroll')
    }

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
      if (!this.canScroll) return

      this.currentScroll = this.target
        ? this.target.scrollTop
        : window.pageYOffset

      this.isScrollingUp = this.currentScroll < this.previousScroll
      this.previousScroll = this.currentScroll
    },
    updateApplication (): number {
      return this.invertedScroll || this.manualScroll
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
