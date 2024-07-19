// Utilities
import { inject, ref } from 'vue'

// Types
import type { InjectionKey, Ref } from 'vue'

export interface SSRHandler {
  isHydrated: Ref<boolean>
  isClient: boolean
  isServer: boolean
  registerHydratedCallback?: (callback: () => void) => void
}

export const SSRSymbol: InjectionKey<SSRHandler> = Symbol.for('vuetify:ssr')

export function createSSRHandler (ssrHandler?: SSRHandler): SSRHandler {
  return ssrHandler ?? {
    isHydrated: ref(false),
    isClient: typeof window !== 'undefined',
    isServer: typeof window === 'undefined',
  }
}

export function useSSRHandler () {
  return inject(SSRSymbol) ?? createSSRHandler()
}
