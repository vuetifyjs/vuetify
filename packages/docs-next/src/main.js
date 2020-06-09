import Vue from 'vue'
import App from './App.vue'
import { registerPlugins } from './plugins'
import { createVuetify } from './plugins/vuetify'
import { createStore } from '@/store/index'
import { createRouter } from '@/router/index'
import { createI18n } from '@/i18n'
import './registerServiceWorker'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

const vuetify = createVuetify()
const i18n = createI18n()
const store = createStore()
const router = createRouter(store, i18n)

sync(store, router)

registerPlugins(Vue)

new Vue({
  router,
  vuetify,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
