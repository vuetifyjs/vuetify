// Utilities
import { computed, shallowRef, toValue, watch } from 'vue'
import { clamp } from './helpers'
import { PREFERS_REDUCED_MOTION } from '@/util/globals'

// Types
import type { MaybeRefOrGetter, Ref } from 'vue'

export const standardEasing = 'cubic-bezier(0.4, 0, 0.2, 1)'
export const deceleratedEasing = 'cubic-bezier(0.0, 0, 0.2, 1)' // Entering
export const acceleratedEasing = 'cubic-bezier(0.4, 0, 1, 1)' // Leaving

export type EasingFunction = (n: number) => number

export const easingPatterns = {
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
  instant: (t: number) => 1,
} as const

export type EasingOptions = {
  duration?: number
  transition?: EasingFunction
}

type InternalEasingOptions = {
  duration: number
  transition: EasingFunction
}

export function useTransition (source: MaybeRefOrGetter<number>, options: MaybeRefOrGetter<EasingOptions>) {
  const defaultTransition: InternalEasingOptions = {
    duration: 300,
    transition: easingPatterns.easeInOutCubic,
  }

  let raf = -1
  const outputRef = shallowRef(toValue(source))

  watch(() => toValue(source), async to => {
    cancelAnimationFrame(raf)
    const easing = { ...defaultTransition, ...toValue(options) }
    await executeTransition(outputRef, outputRef.value, to, easing)
  })

  function executeTransition (out: Ref<number>, from: number, to: number, options: InternalEasingOptions) {
    const startTime = performance.now()
    const ease = PREFERS_REDUCED_MOTION() ? easingPatterns.instant
      : options.transition ?? easingPatterns.easeInOutCubic

    return new Promise<void>(resolve => {
      raf = requestAnimationFrame(function step (currentTime: number) {
        const timeElapsed = currentTime - startTime
        const progress = timeElapsed / options.duration
        out.value = from + (to - from) * ease(clamp(progress, 0, 1))

        if (progress < 1) {
          raf = requestAnimationFrame(step)
        } else {
          out.value = to
          resolve()
        }
      })
    })
  }

  return computed(() => outputRef.value)
}
