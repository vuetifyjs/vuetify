import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './plugins'
import { createStore } from '@/store/index'
import { createRouter } from '@/router/index'
import './registerServiceWorker'

Vue.config.productionTip = false

const store = createStore()
const router = createRouter()

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
