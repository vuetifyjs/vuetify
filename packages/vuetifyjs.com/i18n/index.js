import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '@/lang/en'

Vue.use(VueI18n)

export function createI18n () {
  return new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
      en
    }
  })
}
