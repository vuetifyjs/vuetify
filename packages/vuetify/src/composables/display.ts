// Utilities
import { computed, inject, ref } from 'vue'

// Globals
import { IN_BROWSER } from '@/util/globals'

// Types
import type { InjectionKey, Ref } from 'vue'
import { mergeDeep } from '@/util'

export type DisplayBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface DisplayOptions {
  mobileBreakpoint: number | DisplayBreakpoint
  scrollBarWidth: number
  thresholds: DisplayThresholds
}

export interface DisplayThresholds {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
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

const parseDisplayOptions = (options: Partial<DisplayOptions> = defaultDisplayOptions) => {
  return mergeDeep(defaultDisplayOptions, options) as DisplayOptions
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

export function createDisplay (options?: Partial<DisplayOptions>): DisplayInstance {
  const { thresholds, mobileBreakpoint, scrollBarWidth } = parseDisplayOptions(options)

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
    const mobile = width.value < (breakpointValue - scrollBarWidth)

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
      thresholds,
      mobileBreakpoint,
      scrollBarWidth,
      width: width.value,
    }
  })

  window.addEventListener('resize', onResize, { passive: true })

  return { display }
}

export function useDisplay () {
  const display = inject(VuetifyDisplaySymbol)

  if (!display) throw new Error('Could not find Vuetify display injection')

  // check breakpoint on component
  // check breakpoint in display
  // return whichever exists

  return display
}
