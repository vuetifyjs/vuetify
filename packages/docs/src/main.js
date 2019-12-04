// Polyfills for IE Support
import 'babel-polyfill'
import 'event-source-polyfill'

// Packages
import Vue from 'vue'
import Vuetify from 'vuetify'

// Bootstrap
import '@/components'
import '@/plugins'
import { createI18n } from '@/i18n/index'
import { createRouter } from '@/router/index'
import { createStore } from '@/store/index'
import { createVuetify } from '@/vuetify/index'
import { sync } from 'vuex-router-sync'

// Application
import App from './App.vue'

Vue.config.performance = process.env.NODE_ENV === 'development'

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export async function createApp ({
  start = () => {},
} = {}, ssrContext) {
  // create store and router instances
  const store = createStore()
  const router = createRouter()
  const i18n = createI18n(ssrContext, router)
  const vuetify = createVuetify(ssrContext)

  store.state.app.currentVersion = Vuetify.version

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    ssrContext,
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
