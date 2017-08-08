import Vue from 'vue'
import App from './App'

import {
  VApp,
  VAlert,
  VAvatar,
  VBottomNav,
  VBreadcrumbs,
  VBreadcrumbsItem,
  VBtn
} from 'vuetify/components'

Vue.use(VApp)
Vue.use(VAlert)
Vue.use(VAvatar)
Vue.use(VBottomNav)
Vue.use(VBreadcrumbs)
Vue.use(VBreadcrumbsItem)
Vue.use(VBtn)

new Vue(App).$mount('#app')
