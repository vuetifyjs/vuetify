import Vue from 'vue'
import App from './App.vue'
import { registerPlugins } from './plugins'
import { createVuetify } from './plugins/vuetify'
import { createStore } from '@/store/index'
import { createRouter } from '@/router/index'
import { i18n } from '@/plugins/i18n'
import './registerServiceWorker'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

const router = createRouter()
const vuetify = createVuetify()
const store = createStore()

sync(store, router)

registerPlugins(Vue)

new Vue({
  router,
  vuetify,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
