import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Boilerplate from '@/components/Boilerplate'

Vue.component('boilerplate', Boilerplate)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
