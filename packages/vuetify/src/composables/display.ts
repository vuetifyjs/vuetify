// Utilities
import { computed, inject, provide, ref, watch } from 'vue'

// Globals
import { IN_BROWSER } from '@/util/globals'

// Types
import type { InjectionKey, Ref, SetupContext } from 'vue'

export type DisplayBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface DisplayOptions {
  mobileBreakpoint?: number | DisplayBreakpoint
  scrollBarWidth?: number
  thresholds?: Partial<DisplayThresholds>
}

export interface DisplayThresholds {
  xs: number
  sm: number
  md: number
  lg: number
}

export interface DisplayInstance {
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
  width: number
  xl: boolean
  xlOnly: boolean
  xs: boolean
  xsOnly: boolean
  mobile: boolean
  mobileBreakpoint: number | DisplayBreakpoint
  thresholds: DisplayThresholds
  scrollBarWidth: number
}

export const VuetifyDisplaySymbol: InjectionKey<DisplayInstance> = Symbol.for('vuetify:display')

const parseDisplayOptions = (options: any) => {

}

export function createDisplay (options?: any) {
  if (!IN_BROWSER) return

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
}

export function provideDisplay () {

}

export function useDisplay () {
  const display = inject(VuetifyDisplaySymbol)

  if (!display) throw new Error('Could not find Vuetify display injection')

  return display
}

export interface BreakpointInstance {
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
  width: number
  xl: boolean
  xlOnly: boolean
  xs: boolean
  xsOnly: boolean
  mobile: boolean
  mobileBreakpoint: number | DisplayBreakpoint
  thresholds: DisplayThresholds
  scrollBarWidth: number
}
