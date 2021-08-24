import '@mdi/font/css/materialdesignicons.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import viteSSR from 'vite-ssr/vue'
import App from './App.vue'
import vuetify from './vuetify'
import { routes } from './router'

library.add(fas)

export default viteSSR(App, { routes }, ({ app }) => {
  app.use(vuetify)
  app.component('FontAwesomeIcon', FontAwesomeIcon)
})
