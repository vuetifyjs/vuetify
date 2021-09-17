import { createPinia } from 'pinia'
import type { piniaPlugin } from '@/types'

export const usePinia: piniaPlugin = ({ app }) => {
  app.use(createPinia())
}
