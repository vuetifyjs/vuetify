import Vue from 'vue'
import { VuetifyBreakpoint } from 'types'

const breakpoints = {
  xs: 600,
  sm: 960,
  md: 1280 - 16,
  lg: 1920 - 16,
  xl: Infinity
}
const keys = Object.keys(breakpoints)
const values = Object.values(breakpoints)

type bit3 = [boolean, boolean, boolean]
type bit5 = [boolean, boolean, boolean, boolean, boolean]
const false5: bit5 = [false, false, false, false, false]
/**
 * Creates array of length 5 with all values false except at position `pos`
 */
const one = (pos: number) => {
  const mask = false5.slice() as bit5
  mask[pos] = true
  return mask
}
/**
 * Not created on the fly because there are multiple references to each
 */
const tr: bit3[] = [
  [false, false, false],
  [true, false, false],
  [true, true, false],
  [true, true, true]
]
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
const breakpointExplainations: Omit<
VuetifyBreakpoint,
'width' | 'height'
>[] = keys.map((name, i) => {
  const mask = one(i)
  const [xs, sm, md, lg, xl] = mask
  const [xsOnly, smOnly, mdOnly, lgOnly, xlOnly] = mask

  const [smAndUp, mdAndUp, lgAndUp] = tr[Math.min(i, 3)]
  const [lgAndDown, mdAndDown, smAndDown] = tr[Math.min(4 - i, 3)]

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
    xlOnly
  }
})

const classifyBreakpoint = (width: number) =>
  values.findIndex(bp => width < bp)

/**
 * A modified version of https://gist.github.com/cb109/b074a65f7595cffc21cea59ce8d15f9b
 */

/**
 * A Vue mixin to get the current width/height and the associated breakpoint.
 *
 *   <div v-if="$breakpoint.smAndDown">...</div>
 *
 */
export default Vue.extend({
  data: () => ({
    clientHeight: getClientHeight(),
    clientWidth: getClientWidth(),
    resizeTimeout: undefined as number | undefined
  }),

  computed: {
    breakpoint (): VuetifyBreakpoint {
      const cl = classifyBreakpoint(this.clientWidth)

      const bools = breakpointExplainations[cl]

      return Object.assign(bools, {
        // For custom breakpoint logic.
        width: this.clientWidth,
        height: this.clientHeight
      })
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

// Cross-browser support as described in:
// https://stackoverflow.com/questions/1248081
function getClientWidth () {
  if (typeof document === 'undefined') return 0 // SSR
  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
}

function getClientHeight () {
  if (typeof document === 'undefined') return 0 // SSR
  return Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )
}
