// Utilities
import { toKebabCase } from '@vuetify/shared'
import { getCurrentInstance as _getCurrentInstance } from 'vue'

export function getCurrentInstance (name: string, message?: string) {
  const vm = _getCurrentInstance()

  if (!vm) {
    throw new Error(`[Vuetify] ${name} ${message || 'must be called from inside a setup function'}`)
  }

  return vm
}

export function getCurrentInstanceName (name = 'composables') {
  const vm = getCurrentInstance(name).type

  return toKebabCase(vm?.aliasName || vm?.name)
}
