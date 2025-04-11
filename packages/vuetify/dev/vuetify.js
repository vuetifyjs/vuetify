import '@mdi/font/css/materialdesignicons.css'
import '@/styles/main.sass'

import { createVuetify } from '@/framework'
import * as directives from '@/directives'

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
  theme: false,
})
