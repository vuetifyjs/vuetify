// Utilities
import { getCurrentInstance } from '@/util/getCurrentInstance'

// Types
import type { InjectionKey } from 'vue'

export function injectSelf<T>(key: InjectionKey<T> | string): T | undefined
export function injectSelf (key: InjectionKey<any> | string) {
  const { provides } = getCurrentInstance('injectSelf')

  if (provides && (key as string | symbol) in provides) {
    // TS doesn't allow symbol as index type
    return provides[key as string]
  }
}
