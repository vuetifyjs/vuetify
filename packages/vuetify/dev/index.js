import vuetify from './vuetify'
import App from './App.vue'

import { routes } from './router'
import viteSSR from 'vite-ssr/vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { createThemePlugin } from './theme.ts'

library.add(fas)

export default viteSSR(App, { routes }, ({ app }) => {
  app.use(vuetify)
  app.use(createThemePlugin())
  app.component('FontAwesomeIcon', FontAwesomeIcon)
})
