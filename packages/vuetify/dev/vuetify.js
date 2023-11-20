import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/src/styles/main.sass'

import { createVuetify } from 'vuetify/src/framework'
import * as directives from 'vuetify/src/directives'
import { VuetifyDateAdapter } from 'vuetify/src/composables/date/adapters/vuetify'
import defaults from './vuetify/defaults'
import icons from './vuetify/icons'
import locale from './vuetify/locale'

export default createVuetify({
  date: {
    adapter: VuetifyDateAdapter,
  },
  directives,
  ssr: !!process.env.VITE_SSR,
  defaults,
  icons,
  locale,
  theme: { defaultTheme: 'light' },
})
