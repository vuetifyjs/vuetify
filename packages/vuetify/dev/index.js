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
import { intl } from './intl'
import { useIntl, provideIntl } from 'vue-intl'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

const rtl = {
  sv: false,
  en: false,
  ja: true,
}

const vueI18n = {
  createRoot: () => i18n.global,
  getScope: global => useI18n({ legacy: false, useScope: global ? 'global' : 'parent' }),
  createScope: (props) => {
    const scope = useI18n({
      legacy: false,
      useScope: 'local',
      messages,
      locale: props.locale,
      fallbackLocale: props.fallbackLocale,
      inheritLocale: !props.locale,
    })

    watch(() => props.locale, () => {
      scope.locale.value = props.locale
    })

    return scope
  },
  rtl,
}

const wrapVueIntl = instance => {
  const locale = ref(instance.locale)
  const fallbackLocale = ref(instance.defaultLocale)
  const messages = ref(instance.messages)

  return {
    locale,
    fallbackLocale,
    messages,
    t: (id, ...params) => instance.formatMessage({ id }),
  }
}

const vueIntl = {
  createRoot: () => {
    return wrapVueIntl(intl)
  },
  getScope: () => {
    const scope = useIntl()
    return wrapVueIntl(scope)
  },
  createScope: (props) => {
    const newScope = createIntl({ locale: props.locale, defaultLocale: props.fallbackLocale, messages: intlMessages[props.locale] })
    provideIntl(newScope)

    watch(() => props.locale, () => {
      newScope.locale = props.locale
    })

    return wrapVueIntl(newScope)
  },
  rtl,
}

const vuetify = createVuetify({
  locale: {
    locale: 'en',
    fallbackLocale: 'en',
    messages: { sv, en, ja },
    rtl,
  },
  // locale: vueI18n,
  // locale: vueIntl,
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
