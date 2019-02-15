// Extensions
import { Service } from '../service'

// Types
import { VuetifyBreakpointOptions } from 'vuetify/types/services/breakpoint'

export class Breakpoint extends Service {
  static property = 'breakpoint'

  // Public
  xs = false
  sm = false
  md = false
  lg = false
  xl = false

  xsOnly = false
  smOnly = false
  smAndDown = false
  smAndUp = false
  mdOnly = false
  mdAndDown = false
  mdAndUp = false
  lgOnly = false
  lgAndDown = false
  lgAndUp = false
  xlOnly = false

  name = ''

  height = 0
  width = 0

  thresholds = {
    xs: 600,
    sm: 960,
    md: 1280,
    lg: 1920
  }
  scrollbarWidth = 16

  private resizeTimeout = 0

  constructor (options: Partial<VuetifyBreakpointOptions> = {}) {
    super()
    this.thresholds = {
      ...this.thresholds,
      ...options.thresholds
    }
    this.scrollbarWidth = (
      options.scrollBarWidth ||
      this.scrollbarWidth
    )

    this.init()
  }

  onResize () {
    clearTimeout(this.resizeTimeout)

    // Added debounce to match what
    // v-resize used to do but was
    // removed due to a memory leak
    // https://github.com/vuetifyjs/vuetify/pull/2997
    this.resizeTimeout = window.setTimeout(this.update.bind(this), 200)
  }

  init () {
    /* istanbul ignore if */
    if (typeof window === 'undefined') return

    window.addEventListener(
      'resize',
      this.onResize.bind(this),
      { passive: true }
    )

    this.update()
  }

  /* eslint-disable-next-line max-statements */
  update () {
    const height = this.getClientHeight()
    const width = this.getClientWidth()

    const xs = width < this.thresholds.xs
    const sm = width < this.thresholds.sm && !xs
    const md = width < (this.thresholds.md - this.scrollbarWidth) && !(sm || xs)
    const lg = width < (this.thresholds.lg - this.scrollbarWidth) && !(md || sm || xs)
    const xl = width >= (this.thresholds.lg - this.scrollbarWidth)

    this.height = height
    this.width = width

    this.xs = xs
    this.sm = sm
    this.md = md
    this.lg = lg
    this.xl = xl

    this.xsOnly = xs
    this.smOnly = sm
    this.smAndDown = (xs || sm) && !(md || lg || xl)
    this.smAndUp = !xs && (sm || md || lg || xl)
    this.mdOnly = md
    this.mdAndDown = (xs || sm || md) && !(lg || xl)
    this.mdAndUp = !(xs || sm) && (md || lg || xl)
    this.lgOnly = lg
    this.lgAndDown = (xs || sm || md || lg) && !xl
    this.lgAndUp = !(xs || sm || md) && (lg || xl)
    this.xlOnly = xl

    switch (true) {
      case (xs):
        this.name = 'xs'
        break
      case (sm):
        this.name = 'sm'
        break
      case (md):
        this.name = 'md'
        break
      case (lg):
        this.name = 'lg'
        break
      default:
        this.name = 'xl'
        break
    }
  }

  // Cross-browser support as described in:
  // https://stackoverflow.com/questions/1248081
  private getClientWidth () {
    /* istanbul ignore if */
    if (typeof document === 'undefined') return 0 // SSR
    return Math.max(
      document.documentElement!.clientWidth,
      window.innerWidth || 0
    )
  }

  private getClientHeight () {
    /* istanbul ignore if */
    if (typeof document === 'undefined') return 0 // SSR
    return Math.max(
      document.documentElement!.clientHeight,
      window.innerHeight || 0
    )
  }
}
