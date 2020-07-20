// Extensions
import { Service } from '../service'

// Types
import { VuetifyPreset } from 'vuetify/types/services/presets'
import { Breakpoint as IBreakpoint } from 'vuetify/types/services/breakpoint'

export class Breakpoint extends Service implements IBreakpoint {
  public static property: 'breakpoint' = 'breakpoint'

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

  // Value is xs to match v2.x functionality
  public name: IBreakpoint['name'] = 'xs'

  public height = 0

  public width = 0

  // TODO: Add functionality to detect this dynamically in v3
  // Value is true to match v2.x functionality
  public mobile = true

  public mobileBreakpoint: IBreakpoint['mobileBreakpoint']

  public thresholds: IBreakpoint['thresholds']

  public scrollBarWidth: IBreakpoint['scrollBarWidth']

  private resizeTimeout = 0

  constructor (preset: VuetifyPreset) {
    super()

    const {
      mobileBreakpoint,
      scrollBarWidth,
      thresholds,
    } = preset[Breakpoint.property]

    this.mobileBreakpoint = mobileBreakpoint
    this.scrollBarWidth = scrollBarWidth
    this.thresholds = thresholds
  }

  public init () {
    this.update()

    /* istanbul ignore if */
    if (typeof window === 'undefined') return

    window.addEventListener(
      'resize',
      this.onResize.bind(this),
      { passive: true }
    )
  }

  /* eslint-disable-next-line max-statements */
  public update (ssr = false) {
    const height = ssr ? 0 : this.getClientHeight()
    const width = ssr ? 0 : this.getClientWidth()

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

    if (typeof this.mobileBreakpoint === 'number') {
      this.mobile = width < parseInt(this.mobileBreakpoint, 10)

      return
    }

    const breakpoints = {
      xs: 0,
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
    } as const

    const current = breakpoints[this.name]
    const max = breakpoints[this.mobileBreakpoint]

    this.mobile = current <= max
  }

  private onResize () {
    clearTimeout(this.resizeTimeout)

    // Added debounce to match what
    // v-resize used to do but was
    // removed due to a memory leak
    // https://github.com/vuetifyjs/vuetify/pull/2997
    this.resizeTimeout = window.setTimeout(this.update.bind(this), 200)
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
