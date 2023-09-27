// Imports
import { createPinia } from 'pinia'
import { markRaw } from 'vue'

// Types
import type { ViteSSGContext } from '@vuetify/vite-ssg'

export const pinia = createPinia()

export function installPinia ({ app, router }: ViteSSGContext) {
  pinia.use(({ store }) => {
    store.router = markRaw(router)
  })

  app.use(pinia)
}
