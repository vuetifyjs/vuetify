import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/i18n/messages/en'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: messages,
  },
})

const loadedLocales = ['en']

export function setLocale (locale) {
  i18n.locale = locale
}

export function loadLocale (locale) {
  if (i18n.locale === locale) {
    return Promise.resolve(setLocale(locale))
  }

  if (loadedLocales.includes(locale)) {
    return Promise.resolve(setLocale(locale))
  }

  return import(/* webpackChunkName: "lang-[request]" */ `@/i18n/messages/${locale}.json`).then(messages => {
    i18n.setLocaleMessage(locale, messages.default)
    loadedLocales.push(locale)
    return setLocale(locale)
  })
}
