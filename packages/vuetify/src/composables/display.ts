// Utilities
import { inject, reactive, ref, shallowRef, toRefs, watchEffect } from 'vue'
import { mergeDeep } from '@/util'

// Globals
import { IN_BROWSER, SUPPORTS_TOUCH } from '@/util/globals'

// Types
import type { InjectionKey, Ref } from 'vue'

export type DisplayBreakpoint = keyof DisplayThresholds

export interface DisplayThresholds {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  xxl: number
}

export interface DisplayOptions {
  mobileBreakpoint?: number | DisplayBreakpoint
  thresholds?: Partial<DisplayThresholds>
}

export interface InternalDisplayOptions {
  mobileBreakpoint: number | DisplayBreakpoint
  thresholds: DisplayThresholds
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
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560,
  },
}

const parseDisplayOptions = (options: DisplayOptions = defaultDisplayOptions) => {
  return mergeDeep(defaultDisplayOptions, options) as InternalDisplayOptions
}

function getClientWidth (isHydrate?: boolean) {
  return IN_BROWSER && !isHydrate
    ? window.innerWidth
    : 0
}

function getClientHeight (isHydrate?: boolean) {
  return IN_BROWSER && !isHydrate
    ? window.innerHeight
    : 0
}

function getPlatform (isHydrate?: boolean): DisplayPlatform {
  const userAgent = IN_BROWSER && !isHydrate
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

export function createDisplay (options?: DisplayOptions, ssr?: boolean): DisplayInstance {
  const { thresholds, mobileBreakpoint } = parseDisplayOptions(options)

  const height = ref(getClientHeight(ssr))
  const platform = shallowRef(getPlatform(ssr))
  const state = reactive({} as DisplayInstance)
  const width = ref(getClientWidth(ssr))

  function updateSize () {
    height.value = getClientHeight()
    width.value = getClientWidth()
  }
  function update () {
    updateSize()
    platform.value = getPlatform()
  }

  // eslint-disable-next-line max-statements
  watchEffect(() => {
    const xs = width.value < thresholds.sm
    const sm = width.value < thresholds.md && !xs
    const md = width.value < thresholds.lg && !(sm || xs)
    const lg = width.value < thresholds.xl && !(md || sm || xs)
    const xl = width.value < thresholds.xxl && !(lg || md || sm || xs)
    const xxl = width.value >= thresholds.xxl
    const name =
      xs ? 'xs'
      : sm ? 'sm'
      : md ? 'md'
      : lg ? 'lg'
      : xl ? 'xl'
      : 'xxl'
    const breakpointValue = typeof mobileBreakpoint === 'number' ? mobileBreakpoint : thresholds[mobileBreakpoint]
    const mobile = width.value < breakpointValue

    state.xs = xs
    state.sm = sm
    state.md = md
    state.lg = lg
    state.xl = xl
    state.xxl = xxl
    state.smAndUp = !xs
    state.mdAndUp = !(xs || sm)
    state.lgAndUp = !(xs || sm || md)
    state.xlAndUp = !(xs || sm || md || lg)
    state.smAndDown = !(md || lg || xl || xxl)
    state.mdAndDown = !(lg || xl || xxl)
    state.lgAndDown = !(xl || xxl)
    state.xlAndDown = !xxl
    state.name = name
    state.height = height.value
    state.width = width.value
    state.mobile = mobile
    state.mobileBreakpoint = mobileBreakpoint
    state.platform = platform.value
    state.thresholds = thresholds
  })

  if (IN_BROWSER) {
    window.addEventListener('resize', updateSize, { passive: true })
  }

  return { ...toRefs(state), update, ssr: !!ssr }
}

export function useDisplay () {
  const display = inject(DisplaySymbol)

  if (!display) throw new Error('Could not find Vuetify display injection')

  return display
}
