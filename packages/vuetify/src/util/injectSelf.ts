// Utilities
import { getCurrentInstance } from '@/util/getCurrentInstance'

// Types
import type { ComponentInternalInstance, InjectionKey } from 'vue'

export function injectSelf<T>(key: InjectionKey<T> | string, vm?: ComponentInternalInstance): T | undefined
export function injectSelf (key: InjectionKey<any> | string, vm = getCurrentInstance('injectSelf')) {
  const { provides } = vm

  if (provides && (key as string | symbol) in provides) {
    // TS doesn't allow symbol as index type
    return provides[key as string]
  }
  return undefined
}
