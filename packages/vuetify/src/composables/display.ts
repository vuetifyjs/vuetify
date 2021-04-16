// Utilities
import { computed, inject, ref } from 'vue'

// Globals
import { IN_BROWSER, SUPPORTS_INTERSECTION, SUPPORTS_TOUCH } from '@/util/globals'

// Types
import type { InjectionKey, Ref } from 'vue'
import { mergeDeep } from '@/util'

export type DisplayBreakpoint = keyof DisplayThresholds

export interface DisplayThresholds {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
}

export interface DisplayOptions {
  mobileBreakpoint?: number | DisplayBreakpoint
  scrollBarWidth?: number
  thresholds?: Partial<DisplayThresholds>
}

export interface InternalDisplayOptions {
  mobileBreakpoint: number | DisplayBreakpoint
  scrollBarWidth: number
  thresholds: DisplayThresholds
}

export interface DisplayInstance {
  display: Ref<{
    height: number
    lg: boolean
    lgAndDown: boolean
    lgAndUp: boolean
    lgOnly: boolean
    md: boolean
    mdAndDown: boolean
    mdAndUp: boolean
    mdOnly: boolean
    name: DisplayBreakpoint
    sm: boolean
    smAndDown: boolean
    smAndUp: boolean
    smOnly: boolean
    xl: boolean
    xlOnly: boolean
    xs: boolean
    xsOnly: boolean
    mobile: boolean
    mobileBreakpoint: number | DisplayBreakpoint
    thresholds: DisplayThresholds
    scrollBarWidth: number
    width: number
  }>
}

export const VuetifyDisplaySymbol: InjectionKey<DisplayInstance> = Symbol.for('vuetify:display')

const defaultDisplayOptions: DisplayOptions = {
  mobileBreakpoint: 'md',
  scrollBarWidth: 16,
  thresholds: {
    xs: 600,
    sm: 960,
    md: 1280,
    lg: 1920,
    xl: 3840,
  },
  // would be option
}

// need lookup table that matches user agents to sizes

const parseDisplayOptions = (options: DisplayOptions = defaultDisplayOptions) => {
  return mergeDeep(defaultDisplayOptions, options) as InternalDisplayOptions
}

// Cross-browser support as described in:
// https://stackoverflow.com/questions/1248081
function getClientWidth () {
  if (!IN_BROWSER) return 0 // SSR
  return Math.max(
    document.documentElement!.clientWidth,
    window.innerWidth || 0
  )
}

function getClientHeight () {
  /* istanbul ignore if */
  if (!IN_BROWSER) return 0 // SSR
  return Math.max(
    document.documentElement!.clientHeight,
    window.innerHeight || 0
  )
}

function getPlatform () {
  const userAgent = IN_BROWSER ? window.navigator.userAgent : 'ssr'

  function match (regexp: RegExp) {
    return Boolean(userAgent.match(regexp))
  }

  const android = match(/android/)
  const cordova = match(/cordova/)
  const electron = match(/electron/)
  const ios = match(/iphone|ipad|ipod/)
  const linux = match(/linux/)
  const mac = match(/mac/)
  const opera = match(/opera/)
  const ssr = match(/ssr/)
  const win = match(/win/)

  return {
    android,
    cordova,
    electron,
    intersection: SUPPORTS_INTERSECTION,
    ios,
    linux,
    mac,
    opera,
    ssr,
    touch: SUPPORTS_TOUCH,
    win,
  }
}

export function createDisplay (options?: DisplayOptions): DisplayInstance {
  const { thresholds, mobileBreakpoint, scrollBarWidth } = parseDisplayOptions(options)

  const platform = getPlatform()
  const width = ref(getClientWidth())
  const height = ref(getClientHeight())

  function onResize () {
    height.value = getClientHeight()
    width.value = getClientWidth()
  }

  const display = computed(() => {
    const xs = width.value < thresholds.xs
    const sm = width.value < thresholds.sm && !xs
    const md = width.value < (thresholds.md - scrollBarWidth) && !(sm || xs)
    const lg = width.value < (thresholds.lg - scrollBarWidth) && !(md || sm || xs)
    const xl = width.value >= (thresholds.lg - scrollBarWidth)
    const name = xs ? 'xs' : sm ? 'sm' : md ? 'md' : lg ? 'lg' : 'xl' as DisplayBreakpoint
    const breakpointValue = typeof mobileBreakpoint === 'number' ? mobileBreakpoint : thresholds[mobileBreakpoint]
    const mobile = !platform.ssr
      ? width.value < (breakpointValue - scrollBarWidth)
      : platform.android || platform.ios || platform.opera

    return {
      xs,
      sm,
      md,
      lg,
      xl,
      height: height.value,
      xsOnly: xs,
      smOnly: sm,
      smAndDown: (xs || sm) && !(md || lg || xl),
      smAndUp: !xs && (sm || md || lg || xl),
      mdOnly: md,
      mdAndDown: (xs || sm || md) && !(lg || xl),
      mdAndUp: !(xs || sm) && (md || lg || xl),
      lgOnly: lg,
      lgAndDown: (xs || sm || md || lg) && !xl,
      lgAndUp: !(xs || sm || md) && (lg || xl),
      xlOnly: xl,
      name,
      mobile,
      platform,
      thresholds,
      mobileBreakpoint,
      scrollBarWidth,
      width: width.value,
    }
  })

  if (IN_BROWSER) {
    window.addEventListener('resize', onResize, { passive: true })
  }

  return { display }
}

export function useDisplay () {
  const display = inject(VuetifyDisplaySymbol)

  if (!display) throw new Error('Could not find Vuetify display injection')

  return display
}
