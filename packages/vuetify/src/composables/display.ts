// Utilities
import { computed, effectScope, inject, shallowRef, toRef } from 'vue'
import { createBreakpoints, getCurrentInstanceName, isNull, isNumber, isObject, mergeDeep, propsFactory } from '@/util'
import { IN_BROWSER, SUPPORTS_MATCH_MEDIA, SUPPORTS_TOUCH } from '@/util/globals'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'

export const breakpoints = ['sm', 'md', 'lg', 'xl', 'xxl'] as const // no xs

export type Breakpoint = typeof breakpoints[number]

export type DisplayBreakpoint = 'xs' | Breakpoint

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

export interface InternalDisplayOptions {
  mobileBreakpoint: number | DisplayBreakpoint
  thresholds: DisplayThresholds
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

const defaultDisplayOptions: DisplayOptions = {
  mobileBreakpoint: 'lg',
  thresholds: {
    xs: 0,
    sm: 600,
    md: 840,
    lg: 1145,
    xl: 1545,
    xxl: 2138,
  },
}

const parseDisplayOptions = (options: DisplayOptions = defaultDisplayOptions) => {
  return mergeDeep(defaultDisplayOptions, options) as InternalDisplayOptions
}

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
  const { thresholds, mobileBreakpoint } = parseDisplayOptions(options)

  // `ssr: true` is the boolean form; createBreakpoints only accepts a size.
  const ssrSize = isObject(ssr)
    ? ssr
    : ssr
      ? { clientWidth: 0, clientHeight: 0 }
      : undefined

  const screen = createBreakpoints({
    breakpoints: thresholds,
    mobileBreakpoint,
    ssr: ssrSize,
  })

  const platform = shallowRef(getPlatform(ssr))

  // ssr defers the listener until update(), and that call happens after
  // createVuetify's scope has returned. The child scope is still stopped
  // with it, so unmount removes the listener.
  const resizeScope = ssrSize ? effectScope() : undefined

  function update () {
    if (resizeScope) resizeScope.run(() => screen.update())
    else screen.update()
    platform.value = getPlatform()
  }

  return {
    xs: screen.xs,
    sm: screen.sm,
    md: screen.md,
    lg: screen.lg,
    xl: screen.xl,
    xxl: screen.xxl,
    smAndUp: screen.smAndUp,
    mdAndUp: screen.mdAndUp,
    lgAndUp: screen.lgAndUp,
    xlAndUp: screen.xlAndUp,
    smAndDown: screen.smAndDown,
    mdAndDown: screen.mdAndDown,
    lgAndDown: screen.lgAndDown,
    xlAndDown: screen.xlAndDown,
    name: screen.name,
    height: screen.height,
    width: screen.width,
    mobile: screen.isMobile,
    mobileBreakpoint: shallowRef(mobileBreakpoint),
    platform,
    thresholds: shallowRef(thresholds),
    ssr: !!ssr,
    update,
  } as DisplayInstance
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

  // Same query createBreakpoints uses. Reading width subscribes this computed
  // to the existing resize listener, so the matchMedia() call does not.
  function isBelow (px: number, width: number) {
    if (SUPPORTS_MATCH_MEDIA) {
      return !window.matchMedia(`(min-width: ${px}px)`).matches
    }

    return width < px
  }

  const mobile = computed(() => {
    const width = display.width.value

    if (props.mobile) {
      return true
    } else if (isNumber(props.mobileBreakpoint)) {
      return isBelow(props.mobileBreakpoint, width)
    } else if (props.mobileBreakpoint) {
      return isBelow(display.thresholds.value[props.mobileBreakpoint], width)
    } else if (isNull(props.mobile)) {
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
