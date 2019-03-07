

// Mixins
import Applicationable from '../../mixins/applicationable'
import SSRBootable from '../../mixins/ssr-bootable'
import Toggleable from '../../mixins/toggleable'

SSRBootable,
Applicationable('top', [
  'clippedLeft',
  'clippedRight',
  'computedHeight',
  'invertedScroll',
  'manualScroll'
]),
export default {
  name: 'v-app-bar',

  directives: { Scroll },

  props: {
    clippedLeft: Boolean,
    clippedRight: Boolean,
    dense: Boolean,
    extended: Boolean,
    extensionHeight: {
      type: [Number, String],
      validator: (v: any) => !isNaN(parseInt(v))
    },
    flat: Boolean,
    floating: Boolean,
    invertedScroll: Boolean,
    manualScroll: Boolean,
    prominent: Boolean,
    scrollOffScreen: Boolean,
    scrollTarget: String,
    scrollThreshold: {
      type: Number,
      default: 300
    },
    short: Boolean,
    tile: {
      type: Boolean,
      default: true
    },
    value: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    activeTimeout: null,
    currentScroll: 0,
    isExtended: false,
    isScrollingUp: false,
    previousScroll: 0,
    savedScroll: 0,
    target: null as Element | null
  }),

  computed: {
    canScroll (): boolean {
      return (
        typeof window !== 'undefined' &&
        (this.scrollOffScreen || this.invertedScroll)
      )
    },

    classes (): object {
      return {
        ...VSheet.options.computed.classes.call(this),
        'v-toolbar': true,
        'v-toolbar--absolute': this.absolute,
        'v-toolbar--clipped': this.clippedLeft || this.clippedRight,
        'v-toolbar--dense': this.dense,
        'v-toolbar--extended': this.isExtended,
        'v-toolbar--fixed': !this.absolute && (this.app || this.fixed),
        'v-toolbar--floating': this.floating,
        'v-toolbar--prominent': this.prominent
      }
    },
    computedMarginTop (): number {
      if (!this.app) return 0

      return this.$vuetify.application.bar
    },
    computedLeft (): number {
      if (!this.app || this.clippedLeft) return 0

      return this.$vuetify.application.left
    },
    computedRight (): number {
      if (!this.app || this.clippedRight) return 0

      return this.$vuetify.application.right
    },
    computedTransform (): number {
      if (!this.canScroll) return 0

      return !this.isActive
        ? -this.computedContentHeight
        : 0
    },
    currentThreshold (): number {
      return Math.abs(this.currentScroll - this.savedScroll)
    },
    styles () {
      return {
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

      if (val < this.scrollThreshold ||
        !this.isBooted
      ) return

      this.isActive = this.isScrollingUp
      this.savedScroll = this.currentScroll
    },
    // invertedScroll (val: boolean) {
    //   this.isActive = !val
    // },
    // manualScroll (val: boolean) {
    //   this.isActive = !val
    // },
    isScrollingUp () {
      this.savedScroll = this.savedScroll || this.currentScroll
    }
    isActive () {
      this.savedScroll = 0
    },
  },

  created () {
    // if (this.invertedScroll ||
    //   this.manualScroll
    // ) this.isActive = false
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

  render (h) {


    data.directives = [{
      arg: this.scrollTarget,
      name: 'scroll',
      value: this.onScroll
    }]
  }
}
