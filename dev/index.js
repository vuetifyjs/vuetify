import Vue from 'vue'
import App from './App'

import { VApp, VAlert } from 'vuetify/components'
// import { VApp } from 'vuetify/components/app'
// import { VAlert } from 'vuetify/components/alerts'

Vue.use(VApp)
Vue.use(VAlert)

new Vue(App).$mount('#app')
