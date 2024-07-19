// Utilities
import { inject } from 'vue'

// Types
import type { InjectionKey } from 'vue'

export interface SSRHandler {
  isClient: boolean
  isServer: boolean
  registerSuspenseResolve?: (callback: () => void) => void
}

export const SSRSymbol: InjectionKey<SSRHandler> = Symbol.for('vuetify:ssr')

export function createSSRHandler (ssrHandler?: SSRHandler): SSRHandler {
  return ssrHandler ?? {
    isClient: typeof window !== 'undefined',
    isServer: typeof window === 'undefined',
  }
}

export function useSSRHandler () {
  const ssrHandler = inject(SSRSymbol)

  if (!ssrHandler) throw new Error('Could not find Vuetify SSR handler injection')

  return ssrHandler
}
