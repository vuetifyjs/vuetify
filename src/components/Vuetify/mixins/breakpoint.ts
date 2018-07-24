import Vue from 'vue'
import { VuetifyBreakpoint } from 'types'

const breakpoints = {
  xs: 600,
  sm: 960,
  md: 1280 - 16,
  lg: 1920 - 16,
  xl: Infinity
}
const keys = Object.keys(breakpoints) as (keyof typeof breakpoints)[]
const values = Object.values(breakpoints)
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type Static = Omit<VuetifyBreakpoint, 'width' | 'height'>
const breakpointExplainations: Static[] = keys.map((name, rowIndex) => {
  const result: Record<
  string,
  keyof Omit<VuetifyBreakpoint, 'width' | 'height'> | boolean
  > = { name }
  keys.forEach((key: keyof typeof breakpoints, i) => {
    result[key] = result[`${key}Only`] = i === rowIndex
    result[`${key}AndDown`] = i >= rowIndex
    result[`${key}AndUp`] = i <= rowIndex
  })
  return result as Static
})

const classifyBreakpoint = (width: number) => values.findIndex(bp => width < bp)

/**
 * A modified version of https://gist.github.com/cb109/b074a65f7595cffc21cea59ce8d15f9b
 */

/**
 * A Vue mixin to get the current width/height and the associated breakpoint.
 *
 *   <div v-if="$vuetify.breakpoint.smAndDown">...</div>
 *
 */
export default Vue.extend({
  data () {
    const width = getClientWidth()
    const height = getClientHeight()
    const cl = classifyBreakpoint(width)
    return Object.assign(
      {
        clientHeight: height,
        clientWidth: width,
        width,
        height,
        cl,
        resizeTimeout: undefined as number | undefined
      },
      breakpointExplainations[cl]
    )
  },
  watch: {
    cl (clnumber: number) {
      Object.assign(this, breakpointExplainations[clnumber])
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
      const width = getClientWidth()
      const height = getClientHeight()
      const cl = classifyBreakpoint(width)
      Object.assign(this, {
        clientHeight: height,
        clientWidth: width,
        width,
        height,
        cl
      })
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
