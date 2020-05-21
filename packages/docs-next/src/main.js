import Vue from 'vue'
import App from './App.vue'
import './plugins'
import { createVuetify } from './plugins/vuetify'
import { createStore } from '@/store/index'
import { createRouter } from '@/router/index'
import './registerServiceWorker'

Vue.config.productionTip = false

const store = createStore()
const router = createRouter()
const vuetify = createVuetify()

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
