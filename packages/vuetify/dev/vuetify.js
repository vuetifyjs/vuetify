import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/src/iconsets/mdi'
import { fa } from 'vuetify/src/iconsets/fa-svg'
import { en, ar } from 'vuetify/src/locale'

export default createVuetify({
  // lang: {
  //   locales,
  // },
  locale: {
    locales: {
      'en-US': en,
      ar,
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
