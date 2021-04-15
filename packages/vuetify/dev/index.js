import { createApp, ref, watch } from 'vue'
import App from './App'
import { createI18n, useI18n } from 'vue-i18n'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/src/iconsets/mdi'
import { fa } from 'vuetify/src/iconsets/fa-svg'
import { messages, sv, en, ja, intlMessages } from './messages'
import { createIntl } from '@formatjs/intl'
import { useIntl, provideIntl } from 'vue-intl'
import { createVueI18nAdapter, createVueIntlAdapter } from 'vuetify/src/locale/adapters'
import { rtl } from 'vuetify/src/locale'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

// const intl = createIntl({ locale: 'en', defaultLocale: 'en', messages: intlMessages.en })

const vuetify = createVuetify({
  // locale: {
  //   current: 'en',
  //   fallback: 'en',
  //   messages: { sv, en, ja },
  //   rtl,
  // },
  // locale: createVueI18nAdapter({
  //   i18n,
  //   useI18n,
  //   rtl,
  // }),
  locale: createVueIntlAdapter({
    createIntl,
    useIntl,
    provideIntl,
    locale: 'en',
    defaultLocale: 'en',
    messages: intlMessages,
    rtl,
  }),
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      fa,
    },
  },
})

library.add(fas)

const app = createApp(App)

app.use(i18n)
// app.use(VueIntl, intl) // this doesn't work because plugin provides using 'intl' but composables use a symbol??
app.use(vuetify)
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
