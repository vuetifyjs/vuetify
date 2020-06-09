import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/i18n/messages/en'

Vue.use(VueI18n)

export function createI18n () {
  // const loadedLocales = ['en']
  const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
      en: messages,
    },
  })

  return i18n
}
