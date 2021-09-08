// Utilities
import { consoleError } from '@/util'
import { getCurrentInstance as _getCurrentInstance } from 'vue'

export function getCurrentInstance (name: string, message?: string) {
  const vm = _getCurrentInstance()

  message = message || 'must be called from inside a setup function'

  if (!vm) consoleError(`${name} ${message}`)

  return vm
}
