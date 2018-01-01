import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from'./en-US'
import ru from'./ru-RU'

Vue.use(VueI18n)

export function createI18n () {
  return new VueI18n({
    locale: 'en-US',
    fallbackLocale: 'en-US',
    messages: {
      'en-US': en,
      'ru-RU': ru
    }
  })
}
