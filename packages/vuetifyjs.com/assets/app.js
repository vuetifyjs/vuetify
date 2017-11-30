// Polyfills for IE Support
import 'babel-polyfill'
import 'event-source-polyfill'

// Packages
import Vue from 'vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import axios from 'axios'

// Bootstrap
import { createStore } from '@/store/index'
import { createRouter } from '@/router/index'
import { createI18n } from '@/i18n/index'
import { sync } from 'vuex-router-sync'

// Application
import App from './App.vue'
import Components from '@/components'

// Requests
Vue.prototype.$http = axios.create({ baseURL: '/' })

Vue.use(VeeValidate, { inject: false })
Vue.use(Vuetify, {
  theme: {
    primary: '#1867C0',
    secondary: '#5CBBF6',
    accent: '#005CAF'
  }
})

// Bootstrap application components
Object.keys(Components).forEach(key => {
  Vue.component(key, Components[key])
})

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp (ssrContext) {
  // create store and router instances
  const store = createStore()
  const router = createRouter()
  const i18n = createI18n()

  store.state.currentVersion = Vuetify.version

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
    render: h => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
