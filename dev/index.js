import Vue from 'vue'
import App from './App'

import { VApp, VAlert } from 'vuetify/components'

Vue.use(VApp)
Vue.use(VAlert)

new Vue(App).$mount('#app')
