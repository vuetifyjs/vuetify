import store from '@/store-v3'
import type { storePlugin } from '@/types'

export const useStore: storePlugin = ({ app }) => {
  app.use(store)
}
