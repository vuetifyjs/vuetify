import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/src/styles/main.sass'
import { createVuetify } from 'vuetify/src/framework'
import { aliases, mdi } from 'vuetify/src/iconsets/mdi'
import { fa } from 'vuetify/src/iconsets/fa-svg'
import { ar, en, ja, sv } from 'vuetify/src/locale'
import * as directives from 'vuetify/src/directives'
import DateFnsAdapter from 'vuetify/src/adapters/vuetify'

export default createVuetify({
  directives,
  ssr: !!process.env.VITE_SSR,
  date: {
    adapter: DateFnsAdapter,
  },
  locale: {
    messages: {
      en,
      ar,
      sv,
      ja,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      fa,
    },
  },
})
