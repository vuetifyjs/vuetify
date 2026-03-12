// Utilities
import { createBreakpoints, useWindowEventListener } from '@vuetify/v0'
import { computed, inject, readonly, shallowRef, toRef } from 'vue'
import { getCurrentInstanceName, propsFactory } from '@/util'
import { IN_BROWSER, SUPPORTS_TOUCH } from '@/util/globals'

// Types
import type { BreakpointName } from '@vuetify/v0'
import type { InjectionKey, PropType, Ref } from 'vue'

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
  xs: Ref<boolean>
  sm: Ref<boolean>
  md: Ref<boolean>
  lg: Ref<boolean>
  xl: Ref<boolean>
  xxl: Ref<boolean>
  smAndUp: Ref<boolean>
  mdAndUp: Ref<boolean>
  lgAndUp: Ref<boolean>
  xlAndUp: Ref<boolean>
  smAndDown: Ref<boolean>
  mdAndDown: Ref<boolean>
  lgAndDown: Ref<boolean>
  xlAndDown: Ref<boolean>
  xxlAndUp: Ref<boolean>
  xxlAndDown: Ref<boolean>
  name: Ref<DisplayBreakpoint>
  height: Ref<number>
  width: Ref<number>
  mobile: Ref<boolean>
  mobileBreakpoint: Ref<number | DisplayBreakpoint>
  platform: Ref<DisplayPlatform>
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
  const ssrOptions = typeof ssr === 'object'
    ? { clientWidth: ssr.clientWidth, clientHeight: ssr.clientHeight }
    : undefined

  const breakpoint = createBreakpoints({
    mobileBreakpoint: options?.mobileBreakpoint,
    breakpoints: options?.thresholds,
    ssr: ssrOptions,
  })

  const platform = shallowRef(getPlatform(ssr))

  function update () {
    breakpoint.update()
    platform.value = getPlatform()
  }

  if (IN_BROWSER) {
    breakpoint.update()

    useWindowEventListener('resize', () => breakpoint.update(), { passive: true })
  }

  // v0 returns Readonly<ShallowRef<T>> which doesn't satisfy Ref<T> at the
  // type level (Readonly removes the setter). ShallowRef extends Ref at runtime
  // so the cast is safe. DisplayInstance keeps Ref<T> to avoid public API break.
  type R<T> = Ref<T>
  const r = <T>(v: unknown) => v as R<T>

  return {
    xs: r<boolean>(breakpoint.xs),
    sm: r<boolean>(breakpoint.sm),
    md: r<boolean>(breakpoint.md),
    lg: r<boolean>(breakpoint.lg),
    xl: r<boolean>(breakpoint.xl),
    xxl: r<boolean>(breakpoint.xxl),
    smAndUp: r<boolean>(breakpoint.smAndUp),
    mdAndUp: r<boolean>(breakpoint.mdAndUp),
    lgAndUp: r<boolean>(breakpoint.lgAndUp),
    xlAndUp: r<boolean>(breakpoint.xlAndUp),
    smAndDown: r<boolean>(breakpoint.smAndDown),
    mdAndDown: r<boolean>(breakpoint.mdAndDown),
    lgAndDown: r<boolean>(breakpoint.lgAndDown),
    xlAndDown: r<boolean>(breakpoint.xlAndDown),
    xxlAndUp: r<boolean>(breakpoint.xxlAndUp),
    xxlAndDown: r<boolean>(breakpoint.xxlAndDown),
    name: r<DisplayBreakpoint>(breakpoint.name),
    height: r<number>(breakpoint.height),
    width: r<number>(breakpoint.width),
    mobile: r<boolean>(breakpoint.isMobile),
    mobileBreakpoint: toRef(() => options?.mobileBreakpoint ?? 'lg'), // 'lg' matches v0's default
    platform: readonly(platform) as Ref<DisplayPlatform>,
    thresholds: toRef(() => breakpoint.breakpoints as DisplayThresholds),
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
