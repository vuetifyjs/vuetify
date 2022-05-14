import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify/src/entry-bundler'
import { aliases, mdi } from 'vuetify/src/iconsets/mdi'
import { fa } from 'vuetify/src/iconsets/fa-svg'
import { ar, en, ja, sv } from 'vuetify/src/locale'
import { md1 } from 'vuetify/src/blueprints/md1'

export default createVuetify({
  blueprint: md1,
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
