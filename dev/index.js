import Vue from 'vue'
import App from './App'
import Boilerplate from './Boilerplate'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import router from './router'

Vue.config.performance = true

Vue.use(Vuetify)
Vue.use(VueRouter)

Vue.component(Boilerplate.name, Boilerplate)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
