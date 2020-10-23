// Imports
import Vue from 'vue'
import VueI18n from 'vue-i18n'

// Messages
import en from '@/i18n/messages/en.json'

Vue.use(VueI18n)

export function createI18n () {
  // const loadedLocales = ['en']
  return new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en },
  })
}
