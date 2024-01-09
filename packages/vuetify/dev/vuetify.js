import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/src/styles/main.sass'

import { createVuetify } from 'vuetify/src/framework'
import * as directives from 'vuetify/src/directives'

import date from './vuetify/date'
import defaults from './vuetify/defaults'
import icons from './vuetify/icons'
import locale from './vuetify/locale'

export default createVuetify({
  directives,
  ssr: !!process.env.VITE_SSR,
  date,
  defaults,
  icons,
  locale,
  theme: { defaultTheme: 'light' },
})
