import Vue from 'vue'
import Vuetify from 'vuetify'

const version: string = Vuetify.version

Vuetify.install(Vue)

Vuetify.install(Vue, {
  theme: false
})

Vuetify.install(Vue, {
  theme: {
    primary: '#123456',
    accent: '#123456',
    secondary: '#123456',
    info: '#123456',
    warning: '#123456',
    error: '#123456',
    success: '#123456',

    'something-else': '#123456',
    'as-number': 123456
  },
  iconfont: 'fa',
  icons: {
    cancel: 'custom icon'
  },
  rtl: true,
  lang: {
    locales: {
      es: {
        noDataText: ''
      }
    }
  },
  options: {
    themeVariations: ['primary', 'secondary'],
    cspNonce: 'asdf123'
  }
})
