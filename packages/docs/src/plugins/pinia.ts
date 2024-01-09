// Imports
import { createPinia } from 'pinia'
import { markRaw } from 'vue'

// Types
import type { App } from 'vue'
import type { Router } from 'vue-router'

export const pinia = createPinia()

export function installPinia (app: App, router: Router) {
  pinia.use(({ store }) => {
    store.router = markRaw(router)
    store.url = import.meta.env.VITE_API_SERVER_URL
  })

  app.use(pinia)
}
