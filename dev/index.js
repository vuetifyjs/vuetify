import Vue from 'vue'
import App from './App'
import Boilerplate from './Boilerplate'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.performance = true

Vue.use(Vuetify)
Vue.use(VueRouter)

Vue.component(Boilerplate.name, Boilerplate)

const vm = new Vue({
  render: h => h(App),
  router
})

// Prevent layout jump while waiting for styles
window.addEventListener('load', () => {
  vm.$mount('#app')
})
