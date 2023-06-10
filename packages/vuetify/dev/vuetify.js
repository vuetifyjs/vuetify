import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/src/styles/main.sass'
import { createVuetify } from 'vuetify/src/framework'
import { aliases } from 'vuetify/src/iconsets/mdi-svg'
import { mdi } from 'vuetify/src/iconsets/mdi'
import { fa } from 'vuetify/src/iconsets/fa-svg'
import { ar, en, ja, sv } from 'vuetify/src/locale'
import * as directives from 'vuetify/src/directives'
import datefnssv from 'date-fns/locale/sv'
import datefnsen from 'date-fns/locale/en-US'
import DateIoDateFnsAdapter from '@date-io/date-fns'

export default createVuetify({
  directives,
  ssr: !!process.env.VITE_SSR,
  locale: {
    messages: {
      en,
      ar,
      sv,
      ja,
    },
  },
  date: {
    // adapter: DateIoDateFnsAdapter,
    locale: {
      en: 'en-US',
      // en: 'en-AU',
      // en: datefnsen,
      // sv: datefnssv,
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
