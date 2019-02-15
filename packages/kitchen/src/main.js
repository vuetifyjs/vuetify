import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import CoreTitle from '@/components/CoreTitle.vue'
import CoreSection from '@/components/CoreSection.vue'
import MainHeader from '@/components/MainHeader'

Vue.config.productionTip = false

Vue.component('MainHeader', MainHeader)
Vue.component('CoreTitle', CoreTitle)
Vue.component('CoreSection', CoreSection)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
