// Imports
import { createPinia } from 'pinia'

// Types
import type { PiniaPlugin } from '@/types'

export const pinia = createPinia()

export const usePinia: PiniaPlugin = ({ app }) => {
  app.use(pinia)
}
