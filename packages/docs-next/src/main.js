// Packages
import Vue from 'vue'
import Vuetify from 'vuetify'

// Bootstrap
import { registerPlugins } from './plugins'
import { createVuetify } from './plugins/vuetify'
import { createStore } from '@/store/index'
import { createRouter } from '@/router/index'
import { createI18n } from '@/i18n'
import { sync } from 'vuex-router-sync'

// Service Worker
import './registerServiceWorker'

// Application
import App from './App.vue'

Vue.config.productionTip = false

registerPlugins(Vue)

Vue.config.performance = process.env.NODE_ENV === 'development'

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export async function createApp ({
  start = () => {},
} = {}, ssrContext) {
  // create store and router instances
  const store = createStore()
  const i18n = createI18n()
  const router = createRouter(store, i18n)
  const vuetify = createVuetify()

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
