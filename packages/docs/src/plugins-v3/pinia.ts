import { createPinia } from 'pinia'
import type { PiniaPlugin } from '@/types'

export const usePinia: PiniaPlugin = ({ app }) => {
  app.use(createPinia())
}
