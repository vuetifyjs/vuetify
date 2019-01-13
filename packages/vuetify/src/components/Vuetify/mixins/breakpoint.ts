import Vue from 'vue'
import { VuetifyUseOptions, VuetifyBreakpoint } from 'vuetify/types'

const BREAKPOINTS_DEFAULTS = {
  thresholds: {
    xs: 600,
    sm: 960,
    md: 1280,
    lg: 1920
  },
  scrollbarWidth: 16
}

/**
 * Factory function for the breakpoint mixin.
 */
export default function breakpoint (opts: VuetifyUseOptions['breakpoint'] = {}) {
  if (!opts) {
    opts = {}
  }

  return Vue.extend({
    data () {
      return {
        clientHeight: getClientHeight(),
        clientWidth: getClientWidth(),
        resizeTimeout: undefined as number | undefined,

        ...BREAKPOINTS_DEFAULTS,
        ...opts
      }
    },

    computed: {
      breakpoint (): VuetifyBreakpoint {
        const xs = this.clientWidth < this.thresholds.xs
        const sm = this.clientWidth < this.thresholds.sm && !xs
        const md = this.clientWidth < (this.thresholds.md - this.scrollbarWidth) && !(sm || xs)
        const lg = this.clientWidth < (this.thresholds.lg - this.scrollbarWidth) && !(md || sm || xs)
        const xl = this.clientWidth >= (this.thresholds.lg - this.scrollbarWidth)

        const xsOnly = xs
        const smOnly = sm
        const smAndDown = (xs || sm) && !(md || lg || xl)
        const smAndUp = !xs && (sm || md || lg || xl)
        const mdOnly = md
        const mdAndDown = (xs || sm || md) && !(lg || xl)
        const mdAndUp = !(xs || sm) && (md || lg || xl)
        const lgOnly = lg
        const lgAndDown = (xs || sm || md || lg) && !xl
        const lgAndUp = !(xs || sm || md) && (lg || xl)
        const xlOnly = xl

        let name
        switch (true) {
          case (xs):
            name = 'xs'
            break
          case (sm):
            name = 'sm'
            break
          case (md):
            name = 'md'
            break
          case (lg):
            name = 'lg'
            break
          default:
            name = 'xl'
            break
        }

        return {
          // Definite breakpoint.
          xs,
          sm,
          md,
          lg,
          xl,

          // Useful e.g. to construct CSS class names dynamically.
          name,

          // Breakpoint ranges.
          xsOnly,
          smOnly,
          smAndDown,
          smAndUp,
          mdOnly,
          mdAndDown,
          mdAndUp,
          lgOnly,
          lgAndDown,
          lgAndUp,
          xlOnly,

          // For custom breakpoint logic.
          width: this.clientWidth,
          height: this.clientHeight,
          thresholds: this.thresholds,
          scrollbarWidth: this.scrollbarWidth
        }
      }
    },

    created () {
      if (typeof window === 'undefined') return

      window.addEventListener('resize', this.onResize, { passive: true })
    },

    beforeDestroy () {
      if (typeof window === 'undefined') return

      window.removeEventListener('resize', this.onResize)
    },

    methods: {
      onResize (): void {
        clearTimeout(this.resizeTimeout)

        // Added debounce to match what
        // v-resize used to do but was
        // removed due to a memory leak
        // https://github.com/vuetifyjs/vuetify/pull/2997
        this.resizeTimeout = window.setTimeout(this.setDimensions, 200)
      },
      setDimensions (): void {
        this.clientHeight = getClientHeight()
        this.clientWidth = getClientWidth()
      }
    }
  })
}

// Cross-browser support as described in:
// https://stackoverflow.com/questions/1248081
function getClientWidth () {
  if (typeof document === 'undefined') return 0 // SSR
  return Math.max(
    document.documentElement!.clientWidth,
    window.innerWidth || 0
  )
}

function getClientHeight () {
  if (typeof document === 'undefined') return 0 // SSR
  return Math.max(
    document.documentElement!.clientHeight,
    window.innerHeight || 0
  )
}
