// Extensions
import { Service } from '../service'

// Types
import { BreakpointOptions, Breakpoint as IBreakpoint } from 'vuetify/types/services/breakpoint'

export class Breakpoint extends Service implements IBreakpoint {
  public static property = 'breakpoint'

  // Public
  public xs = false

  public sm = false

  public md = false

  public lg = false

  public xl = false

  public xsOnly = false

  public smOnly = false

  public smAndDown = false

  public smAndUp = false

  public mdOnly = false

  public mdAndDown = false

  public mdAndUp = false

  public lgOnly = false

  public lgAndDown = false

  public lgAndUp = false

  public xlOnly = false

  public name = ''

  public height = 0

  public width = 0

  public thresholds = {
    xs: 600,
    sm: 960,
    md: 1280,
    lg: 1920,
  }

  public scrollBarWidth = 16

  private resizeTimeout = 0

  constructor (options: Partial<BreakpointOptions> = {}) {
    super()
    this.thresholds = {
      ...this.thresholds,
      ...options.thresholds,
    }
    this.scrollBarWidth = (
      options.scrollBarWidth ||
      this.scrollBarWidth
    )
    this.init()
  }

  public init () {
    /* istanbul ignore if */
    if (typeof window === 'undefined') return

    window.addEventListener(
      'resize',
      this.onResize.bind(this),
      { passive: true }
    )

    this.update()
  }

  private onResize () {
    clearTimeout(this.resizeTimeout)

    // Added debounce to match what
    // v-resize used to do but was
    // removed due to a memory leak
    // https://github.com/vuetifyjs/vuetify/pull/2997
    this.resizeTimeout = window.setTimeout(this.update.bind(this), 200)
  }

  /* eslint-disable-next-line max-statements */
  private update () {
    const height = this.getClientHeight()
    const width = this.getClientWidth()

    const xs = width < this.thresholds.xs
    const sm = width < this.thresholds.sm && !xs
    const md = width < (this.thresholds.md - this.scrollBarWidth) && !(sm || xs)
    const lg = width < (this.thresholds.lg - this.scrollBarWidth) && !(md || sm || xs)
    const xl = width >= (this.thresholds.lg - this.scrollBarWidth)

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
