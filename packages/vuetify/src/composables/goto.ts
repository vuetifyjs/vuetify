// Utilities
import { inject } from 'vue'
import { clamp, consoleWarn, mergeDeep, refElement } from '@/util'

// Types
import type { ComponentPublicInstance, InjectionKey, Ref } from 'vue'
import type { LocaleInstance, RtlInstance } from './locale'

export interface GoToInstance {
  rtl: Ref<boolean>
  options: GoToOptions
}

export interface GoToOptions {
  container: ComponentPublicInstance | HTMLElement | string
  duration: number
  layout: boolean
  offset: number
  easing: string | ((t: number) => number)
  patterns: Record<string, (t: number) => number>
}

export const GoToSymbol: InjectionKey<GoToInstance> = Symbol.for('vuetify:goto')

function genDefaults () {
  return {
    container: undefined,
    duration: 300,
    layout: false,
    offset: 0,
    easing: 'easeInOutCubic',
    patterns: {
      linear: (t: number) => t,
      easeInQuad: (t: number) => t ** 2,
      easeOutQuad: (t: number) => t * (2 - t),
      easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t ** 2 : -1 + (4 - 2 * t) * t),
      easeInCubic: (t: number) => t ** 3,
      easeOutCubic: (t: number) => --t ** 3 + 1,
      easeInOutCubic: (t: number) => t < 0.5 ? 4 * t ** 3 : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
      easeInQuart: (t: number) => t ** 4,
      easeOutQuart: (t: number) => 1 - --t ** 4,
      easeInOutQuart: (t: number) => (t < 0.5 ? 8 * t ** 4 : 1 - 8 * --t ** 4),
      easeInQuint: (t: number) => t ** 5,
      easeOutQuint: (t: number) => 1 + --t ** 5,
      easeInOutQuint: (t: number) => t < 0.5 ? 16 * t ** 5 : 1 + 16 * --t ** 5,
    },
  }
}

function getContainer (el?: ComponentPublicInstance | HTMLElement | string) {
  return getTarget(el) ?? (document.scrollingElement || document.body) as HTMLElement
}

function getTarget (el: ComponentPublicInstance | HTMLElement | string | undefined) {
  return (typeof el === 'string') ? document.querySelector<HTMLElement>(el) : refElement(el)
}

function getOffset (target: any, horizontal?: boolean, rtl?: boolean): number {
  if (typeof target === 'number') return horizontal && rtl ? -target : target

  let el = getTarget(target)
  let totalOffset = 0
  while (el) {
    totalOffset += horizontal ? el.offsetLeft : el.offsetTop
    el = el.offsetParent as HTMLElement
  }

  return totalOffset
}

export function createGoTo (options: Partial<GoToOptions> | undefined, locale: LocaleInstance & RtlInstance) {
  return {
    rtl: locale.isRtl,
    options: mergeDeep(genDefaults(), options),
  }
}

export async function scrollTo (
  _target: ComponentPublicInstance | HTMLElement | number | string,
  _options: Partial<GoToOptions>,
  horizontal?: boolean,
  goTo?: GoToInstance,
) {
  const property = horizontal ? 'scrollLeft' : 'scrollTop'
  const options = mergeDeep(goTo?.options ?? genDefaults(), _options)
  const rtl = goTo?.rtl.value
  const target = (typeof _target === 'number' ? _target : getTarget(_target)) ?? 0
  const container = options.container === 'parent' && target instanceof HTMLElement
    ? target.parentElement!
    : getContainer(options.container)
  const ease = typeof options.easing === 'function' ? options.easing : options.patterns[options.easing]

  if (!ease) throw new TypeError(`Easing function "${options.easing}" not found.`)

  let targetLocation: number
  if (typeof target === 'number') {
    targetLocation = getOffset(target, horizontal, rtl)
  } else {
    targetLocation = getOffset(target, horizontal, rtl) - getOffset(container, horizontal, rtl)

    if (options.layout) {
      const styles = window.getComputedStyle(target)
      const layoutOffset = styles.getPropertyValue('--v-layout-top')

      if (layoutOffset) targetLocation -= parseInt(layoutOffset, 10)
    }
  }

  targetLocation += options.offset

  const startLocation = container[property] ?? 0

  if (targetLocation === startLocation) return Promise.resolve(targetLocation)

  const startTime = performance.now()

  return new Promise(resolve => requestAnimationFrame(function step (currentTime: number) {
    const timeElapsed = currentTime - startTime
    const progress = timeElapsed / options.duration
    const location = Math.floor(
      startLocation +
      (targetLocation - startLocation) *
      ease(clamp(progress, 0, 1))
    )

    container[property] = location

    // Allow for some jitter if target time has elapsed
    if (progress >= 1 && Math.abs(location - container[property]) < 10) {
      return resolve(targetLocation)
    } else if (progress > 2) {
      // The target might not be reachable
      consoleWarn('Scroll target is not reachable')
      return resolve(container[property])
    }

    requestAnimationFrame(step)
  }))
}

export function useGoTo (_options: Partial<GoToOptions> = {}) {
  const goTo = inject(GoToSymbol)

  if (!goTo) throw new Error('[Vuetify] Could not find injected goto instance')

  async function go (
    target: ComponentPublicInstance | HTMLElement | string | number,
    options?: Partial<GoToOptions>,
  ) {
    return scrollTo(target, mergeDeep(_options, options), false, goTo)
  }

  go.horizontal = async (
    target: ComponentPublicInstance | HTMLElement | string | number,
    options?: Partial<GoToOptions>,
  ) => {
    return scrollTo(target, mergeDeep(_options, options), true, goTo)
  }

  return go
}
