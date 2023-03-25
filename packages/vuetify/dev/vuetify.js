import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/src/styles/main.sass'
import { createVuetify } from 'vuetify/src/framework'
import { aliases, mdi } from 'vuetify/src/iconsets/mdi'
import { fa } from 'vuetify/src/iconsets/fa-svg'
import { ar, en, ja, sv } from 'vuetify/src/locale'
import * as directives from 'vuetify/src/directives'
import VuetifyDateAdapter from 'vuetify/src/adapters/vuetify'

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
    adapter: VuetifyDateAdapter,
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      fa,
    },
  },
  theme: {
    variations: {
      colors: ['primary', 'secondary'],
      darken: 3,
      lighten: 3,
    },
    themes: {
      light: {
        colors: {
          primary: '#3F51B5',
          secondary: '#FF4081',
          accent: '#009688',
        },
      },
    },
  },
})
