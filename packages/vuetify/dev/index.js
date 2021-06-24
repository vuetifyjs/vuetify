import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import vuetify from './vuetify'

import '@mdi/font/css/materialdesignicons.css'

library.add(fas)

const component1 = {
  template: `<div class="title">Page 1</div>`,
}
const component2 = {
  template: `<div class="title">Page 2</div>`,
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/page1',
      name: 'Page 1',
      component: component1,
    },
    {
      path: '/page2',
      name: 'Page 2',
      component: component2,
    },
    { path: '/:pathMatch(.*)*', redirect: '/page1' },
  ],
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
