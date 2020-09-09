// Packages
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

// Bootstrap
import { registerPlugins } from './plugins'
import { createVuetify } from '@/vuetify'
import { createStore } from '@/store'
import { createRouter } from '@/router'
import { createI18n } from '@/i18n'
import { sync } from 'vuex-router-sync'

// Service Worker
import './registerServiceWorker'

// Application
import App from './App.vue'

// Globals
import { IS_PROD } from '@/util/globals'

Vue.config.productionTip = false

registerPlugins(Vue)

Vue.config.performance = !IS_PROD

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export async function createApp ({
  start = () => {},
} = {}, ssrContext) {
  // create store and router instances
  const store = createStore()
  const i18n = createI18n()
  const vuetify = createVuetify(store)
  const router = createRouter(vuetify, store, i18n)

  store.state.app.version = Vuetify.version

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    i18n,
    vuetify,
    render: h => h(App),
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  const entry = { app, router, store }

  await start(entry)

  return entry
}
