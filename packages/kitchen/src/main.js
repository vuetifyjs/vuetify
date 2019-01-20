import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import CoreTitle from '@/components/CoreTitle.vue'
import CoreSection from '@/components/CoreSection.vue'

Vue.config.productionTip = false

Vue.component('CoreTitle', CoreTitle)
Vue.component('CoreSection', CoreSection)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
