import { createApp as createClientApp, createSSRApp } from 'vue'
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import createVuetify from './vuetify'
import App from './App.vue'

import { routes } from './router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

export function createApp (head) {
  const app = process.env.VITE_SSR ? createSSRApp(App) : createClientApp(App)
  const router = createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  })

  // vuetify's theme looks for the head plugin on install
  app.use(head)
  app.use(router)
  app.use(createVuetify())
  app.component('FontAwesomeIcon', FontAwesomeIcon)

  return { app, router }
}
