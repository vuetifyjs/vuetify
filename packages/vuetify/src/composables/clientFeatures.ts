// Composables
import { createSSRHandler } from '@/composables/ssr'

// Utilities
import { inject } from 'vue'

// Types
import type { InjectionKey } from 'vue'
import type { SSRHandler } from '@/composables/ssr'

export interface ClientFeatures {
  supportsSelector: (selector: string) => boolean
  supportsIntersection: boolean
  supportsTouch: boolean
  supportsEyeDropper: boolean
}

export const ClientFeaturesSymbol: InjectionKey<ClientFeatures> = Symbol.for('vuetify:clientFeatures')

export function createClientFeatures (ssrHandler: SSRHandler = createSSRHandler()) {
  return {
    supportsSelector: selector => {
      if (ssrHandler.isServer) return false

      return typeof CSS !== 'undefined' &&
        typeof CSS.supports !== 'undefined' &&
        CSS.supports(`selector(${selector})`)
    },
    supportsIntersection: ssrHandler.isClient && 'IntersectionObserver' in window,
    supportsTouch: ssrHandler.isClient && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0),
    supportsEyeDropper: ssrHandler.isClient && 'EyeDropper' in window,
  } satisfies ClientFeatures
}

export function useClientFeatures () {
  return inject(ClientFeaturesSymbol) ?? createClientFeatures()
}
