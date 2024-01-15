// Utilities
import { inject } from 'vue'
import { mergeDeep } from '@/util'

// Types
import type { InjectionKey } from 'vue'

export interface GoToInstance {
  container: HTMLElement
  options: GoToOptions
}

export interface GoToOptions {
  container?: string | Element
  duration?: number
  offset?: number
  easing?: string | ((t: number) => number)
}

export const GoToSymbol: InjectionKey<GoToInstance> = Symbol.for('vuetify:goto')

function genDefaults () {
  return {
    container: (document.scrollingElement as HTMLElement | null) || document.body || document.documentElement,
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

function getElement (el: any) {
  if (typeof el === 'string') {
    return document.querySelector<HTMLElement>(el)
  }

  if (el instanceof HTMLElement) {
    return el
  }

  if (el?.$el instanceof HTMLElement) {
    return (el.$el) as HTMLElement
  }

  throw typeof el === 'string'
    ? new Error(`Container element "${el}" not found.`)
    : new TypeError(`Container must be a Selector/HTMLElement/VueComponent, received ${el} instead.`)
}

function getOffset (target: any): number {
  if (typeof target === 'number') return target

  let el = getElement(target)
  let totalOffset = 0
  while (el) {
    totalOffset += el.offsetTop
    el = el.offsetParent as HTMLElement
  }

  return totalOffset
}

export function createGoTo (options: GoToOptions | undefined) {
  const _options = mergeDeep(genDefaults(), options)

  return {
    options: _options,
  }
}

export function useGoTo (options?: Partial<GoToOptions>, container?: HTMLElement) {
  const goTo = inject(GoToSymbol)

  if (!goTo) throw new Error('[Vuetify] Could not find injected goto instance')

  const _options = !options ? goTo.options : mergeDeep(options, goTo.options)
  const _container = getElement(container ?? _options.container)

  if (!_container) throw new Error('[Vuetify] Container element not found.')

  return async function (target: HTMLElement | string | number) {
    const startTime = performance.now()

    let targetLocation: number
    if (typeof target === 'number') {
      targetLocation = getOffset(target)
    } else {
      targetLocation = getOffset(target) - getOffset(_container)
    }

    const startLocation = _container.scrollTop
    if (targetLocation === startLocation) return Promise.resolve(targetLocation)

    const ease = typeof _options.easing === 'function'
      ? _options.easing
      : _options.patterns[_options.easing]
    if (!ease) throw new TypeError(`Easing function "${_options.easing}" not found.`)

    return new Promise(resolve => requestAnimationFrame(function step (currentTime: number) {
      const timeElapsed = currentTime - startTime
      const progress = Math.abs(_options.duration ? Math.min(timeElapsed / _options.duration, 1) : 1)

      _container.scrollTop = Math.floor(startLocation + (targetLocation - startLocation) * ease(progress))

      const clientHeight = _container === document.body ? document.documentElement.clientHeight : _container.clientHeight
      const reachBottom = clientHeight + _container.scrollTop >= _container.scrollHeight
      if (
        progress === 1 ||
        // Need to go lower but reach bottom
        (targetLocation > _container.scrollTop && reachBottom)
      ) {
        return resolve(targetLocation)
      }

      requestAnimationFrame(step)
    }))
  }
}
