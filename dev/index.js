import Vue from 'vue'
import App from './App'

import Vuetify from 'vuetify'
Vue.use(Vuetify)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import router from './router'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
