import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import viteSSR from 'vite-ssr/vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import vuetify from './vuetify'
import { routes } from './router'

library.add(fas)

export default viteSSR(App, { routes }, ({ app }) => {
  const head = createHead()

  // app.config.performance = true
  app.use(head)
  app.use(vuetify)
  app.component('FontAwesomeIcon', FontAwesomeIcon)

  return { head }
})
