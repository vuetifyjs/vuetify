// Utilities
import { getCurrentInstance as _getCurrentInstance } from 'vue'
import { toKebabCase } from '@/util'

export function getCurrentInstance (name = 'composables', message?: string) {
  const vm = _getCurrentInstance()

  if (!vm) {
    throw new Error(`[Vuetify] ${name} ${message || 'must be called from inside a setup function'}`)
  }

  return vm
}

export function getCurrentInstanceName (name = '') {
  return toKebabCase(name || getCurrentInstance(name).type?.name)
}
