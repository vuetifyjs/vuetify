// Utilities
import { defineComponent } from 'vue'
import { consoleWarn } from '../../util/console'

/**
 * Scrollable
 *
 * Used for monitoring scrolling and
 * invoking functions based upon
 * scrolling thresholds being
 * met.
 */
export default defineComponent({
  name: 'scrollable',

  props: {
    scrollTarget: String,
    scrollThreshold: [String, Number],
  },

  data: () => ({
    currentScroll: 0,
    currentThreshold: 0,
    isActive: false,
    isScrollingUp: false,
    previousScroll: 0,
    savedScroll: 0,
    target: null as Element | null,
  }),

  computed: {
    /**
     * A computed property that returns
     * whether scrolling features are
     * enabled or disabled
     */
    canScroll (): boolean {
      return typeof window !== 'undefined'
    },
    /**
     * The threshold that must be met before
     * thresholdMet function is invoked
     */
    computedScrollThreshold (): number {
      return this.scrollThreshold
        ? Number(this.scrollThreshold)
        : 300
    },
  },

  watch: {
    isScrollingUp () {
      this.savedScroll = this.savedScroll || this.currentScroll
    },
    isActive () {
      this.savedScroll = 0
    },
  },

  mounted () {
    if (this.scrollTarget) {
      this.target = document.querySelector(this.scrollTarget)

      if (!this.target) {
        consoleWarn(`Unable to locate element with identifier ${this.scrollTarget}`, this)
      }
    }
  },

  methods: {
    onScroll () {
      if (!this.canScroll) return

      this.previousScroll = this.currentScroll
      this.currentScroll = this.target
        ? this.target.scrollTop
        : window.pageYOffset

      this.isScrollingUp = this.currentScroll < this.previousScroll
      this.currentThreshold = Math.abs(this.currentScroll - this.computedScrollThreshold)

      this.$nextTick(() => {
        if (
          Math.abs(this.currentScroll - this.savedScroll) >
          this.computedScrollThreshold
        ) this.thresholdMet()
      })
    },
    /**
     * The method invoked when
     * scrolling in any direction
     * has exceeded the threshold
     */
    thresholdMet () { /* noop */ },
  },
})
