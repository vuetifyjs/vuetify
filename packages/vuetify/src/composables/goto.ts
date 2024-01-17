// Utilities
import { inject } from 'vue'
import { mergeDeep } from '@/util'

// Types
import type { ComponentPublicInstance, InjectionKey, Ref } from 'vue'
import type { LocaleInstance, RtlInstance } from './locale'

export interface GoToInstance {
  rtl: Ref<boolean>
  options: GoToOptions
}

export interface GoToOptions {
  duration: number
  offset: number
  easing: string | ((t: number) => number)
  patterns: Record<string, (t: number) => number>
}

export const GoToSymbol: InjectionKey<GoToInstance> = Symbol.for('vuetify:goto')

function genDefaults () {
  return {
    duration: 500,
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

function getTarget (el: ComponentPublicInstance | HTMLElement | string | undefined) {
  if (typeof el === 'string') return document.querySelector<HTMLElement>(el)
  if (el instanceof HTMLElement) return el
  if (el && '$el' in el && el?.$el instanceof HTMLElement) return (el.$el) as HTMLElement

  return null
}

function getContainer (el?: ComponentPublicInstance | HTMLElement | string) {
  return getTarget(el) ?? (document.scrollingElement || document.body) as HTMLElement
}

function getOffset (target: any, horizontal?: boolean, rtl?: boolean): number {
  if (typeof target === 'number') {
    return horizontal && rtl ? -target : target
  }

  let el = getTarget(target)
  let totalOffset = 0
  while (el) {
    totalOffset += horizontal ? el.scrollLeft : el.offsetTop
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

async function scrollTo (
  _target: ComponentPublicInstance | HTMLElement | number | string,
  _container: ComponentPublicInstance | HTMLElement | string | 'parent',
  options: GoToOptions,
  horizontal?: boolean,
  rtl?: boolean,
) {
  const target = (typeof _target === 'number' ? _target : getTarget(_target)) ?? 0
  const container = _container === 'parent' && _target instanceof HTMLElement ? _target.parentElement! : getContainer(_container)
  const ease = typeof options.easing === 'function' ? options.easing : options.patterns[options.easing]

  if (!ease) throw new TypeError(`Easing function "${options.easing}" not found.`)

  let targetLocation: number
  if (typeof target === 'number') {
    targetLocation = getOffset(target, horizontal, rtl)
  } else {
    targetLocation = getOffset(target, horizontal, rtl) - getOffset(container, horizontal, rtl)
  }

  targetLocation += options.offset

  const startLocation = (horizontal ? container.scrollLeft : container.scrollTop) ?? 0

  if (targetLocation === startLocation) return Promise.resolve(targetLocation)

  const startTime = performance.now()

  return new Promise(resolve => requestAnimationFrame(function step (currentTime: number) {
    const timeElapsed = currentTime - startTime
    const progress = Math.abs(options.duration ? Math.min(timeElapsed / options.duration, 1) : 1)
    const location = Math.floor(startLocation + (targetLocation - startLocation) * ease(progress))

    container[horizontal ? 'scrollLeft' : 'scrollTop'] = location

    if (progress === 1) return resolve(targetLocation)

    let clientSize
    let reachEnd

    if (!horizontal) {
      clientSize = container === document.body ? document.documentElement.clientHeight : container.clientHeight
      reachEnd = clientSize + container.scrollTop >= container.scrollHeight

      if (targetLocation > container.scrollTop && reachEnd) {
        return resolve(targetLocation)
      }
    } else {
      clientSize = container === document.body ? document.documentElement.clientWidth : container.clientWidth
      reachEnd = clientSize + container.scrollLeft >= container.scrollWidth

      if (targetLocation > container.scrollLeft && reachEnd) {
        return resolve(targetLocation)
      }
    }

    requestAnimationFrame(step)
  }))
}

export function useGoTo (options?: Partial<GoToOptions>) {
  const goTo = inject(GoToSymbol)

  if (!goTo) throw new Error('[Vuetify] Could not find injected goto instance')

  async function go (
    target: ComponentPublicInstance | HTMLElement | string | number,
    container: ComponentPublicInstance | HTMLElement | string | 'parent' = 'parent'
  ) {
    return scrollTo(target, container, mergeDeep(goTo?.options, options) as GoToOptions, false, goTo?.rtl.value)
  }

  go.horizontal = async (
    target: ComponentPublicInstance | HTMLElement | string | number,
    container: ComponentPublicInstance | HTMLElement | string | 'parent' = 'parent'
  ) => {
    return scrollTo(target, container, mergeDeep(goTo?.options, options) as GoToOptions, true, goTo?.rtl.value)
  }

  return go
}
