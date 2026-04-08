// Utilities
import { createBreakpoints, useWindowEventListener } from '@vuetify/v0'
import { isObject } from '@vuetify/v0/utilities'
import { computed, inject, readonly, shallowRef, toRef } from 'vue'
import { getCurrentInstanceName, omit, propsFactory } from '@/util'
import { IN_BROWSER, SUPPORTS_TOUCH } from '@/util/globals'

// Types
import type { BreakpointName } from '@vuetify/v0'
import type { InjectionKey, PropType, Ref, ShallowRef } from 'vue'

export const breakpoints = ['sm', 'md', 'lg', 'xl', 'xxl'] as const // no xs

export type Breakpoint = typeof breakpoints[number]

export type DisplayBreakpoint = BreakpointName

export type DisplayThresholds = {
  [key in DisplayBreakpoint]: number
}

export interface DisplayProps {
  mobile?: boolean | null
  mobileBreakpoint?: number | DisplayBreakpoint
}

export interface DisplayOptions {
  mobileBreakpoint?: number | DisplayBreakpoint
  thresholds?: Partial<DisplayThresholds>
}

export type SSROptions = boolean | {
  clientWidth: number
  clientHeight?: number
}

export interface DisplayPlatform {
  android: boolean
  ios: boolean
  cordova: boolean
  electron: boolean
  chrome: boolean
  edge: boolean
  firefox: boolean
  opera: boolean
  win: boolean
  mac: boolean
  linux: boolean
  touch: boolean
  ssr: boolean
}

export interface DisplayInstance {
  xs: Readonly<ShallowRef<boolean>>
  sm: Readonly<ShallowRef<boolean>>
  md: Readonly<ShallowRef<boolean>>
  lg: Readonly<ShallowRef<boolean>>
  xl: Readonly<ShallowRef<boolean>>
  xxl: Readonly<ShallowRef<boolean>>
  smAndUp: Readonly<ShallowRef<boolean>>
  mdAndUp: Readonly<ShallowRef<boolean>>
  lgAndUp: Readonly<ShallowRef<boolean>>
  xlAndUp: Readonly<ShallowRef<boolean>>
  smAndDown: Readonly<ShallowRef<boolean>>
  mdAndDown: Readonly<ShallowRef<boolean>>
  lgAndDown: Readonly<ShallowRef<boolean>>
  xlAndDown: Readonly<ShallowRef<boolean>>
  name: Readonly<ShallowRef<DisplayBreakpoint>>
  height: Readonly<ShallowRef<number>>
  width: Readonly<ShallowRef<number>>
  mobile: Readonly<ShallowRef<boolean>>
  mobileBreakpoint: Ref<number | DisplayBreakpoint>
  platform: Readonly<Ref<DisplayPlatform>>
  thresholds: Ref<DisplayThresholds>

  /** @internal */
  ssr: boolean

  update (): void
}

export const DisplaySymbol: InjectionKey<DisplayInstance> = Symbol.for('vuetify:display')

function getPlatform (ssr?: SSROptions): DisplayPlatform {
  const userAgent = IN_BROWSER && !ssr
    ? window.navigator.userAgent
    : 'ssr'

  function match (regexp: RegExp) {
    return Boolean(userAgent.match(regexp))
  }

  const android = match(/android/i)
  const ios = match(/iphone|ipad|ipod/i)
  const cordova = match(/cordova/i)
  const electron = match(/electron/i)
  const chrome = match(/chrome/i)
  const edge = match(/edge/i)
  const firefox = match(/firefox/i)
  const opera = match(/opera/i)
  const win = match(/win/i)
  const mac = match(/mac/i)
  const linux = match(/linux/i)

  return {
    android,
    ios,
    cordova,
    electron,
    chrome,
    edge,
    firefox,
    opera,
    win,
    mac,
    linux,
    touch: SUPPORTS_TOUCH,
    ssr: userAgent === 'ssr',
  }
}

export function createDisplay (options?: DisplayOptions, ssr?: SSROptions): DisplayInstance {
  const breakpoint = createBreakpoints({
    mobileBreakpoint: options?.mobileBreakpoint,
    breakpoints: options?.thresholds,
    ssr: isObject(ssr) ? ssr : ssr === true ? { clientWidth: 0 } : undefined,
  })

  const platform = shallowRef(getPlatform(ssr))

  function update () {
    breakpoint.update()
    platform.value = getPlatform()
  }

  useWindowEventListener('resize', () => breakpoint.update(), { passive: true })

  return {
    ...omit(breakpoint, ['breakpoints', 'isMobile']),
    mobile: breakpoint.isMobile,
    mobileBreakpoint: toRef(() => breakpoint.mobileBreakpoint),
    platform: readonly(platform),
    thresholds: toRef(() => breakpoint.breakpoints),
    update,
    ssr: !!ssr,
  }
}

export const makeDisplayProps = propsFactory({
  mobile: {
    type: Boolean as PropType<boolean | null>,
    default: false,
  },
  mobileBreakpoint: [Number, String] as PropType<number | DisplayBreakpoint>,
}, 'display')

export function useDisplay (
  props: DisplayProps = { mobile: null },
  name = getCurrentInstanceName(),
) {
  const display = inject(DisplaySymbol)

  if (!display) throw new Error('Could not find Vuetify display injection')

  const mobile = computed(() => {
    if (props.mobile) {
      return true
    } else if (typeof props.mobileBreakpoint === 'number') {
      return display.width.value < props.mobileBreakpoint
    } else if (props.mobileBreakpoint) {
      return display.width.value < display.thresholds.value[props.mobileBreakpoint]
    } else if (props.mobile === null) {
      return display.mobile.value
    } else {
      return false
    }
  })

  const displayClasses = toRef(() => {
    if (!name) return {}

    return { [`${name}--mobile`]: mobile.value }
  })

  return { ...display, displayClasses, mobile }
}
