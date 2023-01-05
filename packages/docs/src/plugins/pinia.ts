// Imports
import { createPinia } from 'pinia'
import { markRaw } from 'vue'

// Types
import type { PiniaPlugin } from '@/types'

export const pinia = createPinia()

export const usePinia: PiniaPlugin = ({ app, router }) => {
  pinia.use(({ store }) => {
    store.router = markRaw(router)
  })

  app.use(pinia)
}
