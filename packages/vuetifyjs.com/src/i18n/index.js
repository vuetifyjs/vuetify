import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '@/lang/en'

Vue.use(VueI18n)

export function createI18n (ssrContext, router) {
  const loadedLanguages = []
  const globalLanguages = {}

  let locale
  if (ssrContext && ssrContext.lang) {
    locale = ssrContext.lang
  } else if (typeof document !== 'undefined') {
    locale = document.documentElement.lang
  }

  const i18n = new VueI18n({
    locale,
    messages: { en },
    fallbackLocale: 'en'
  })

  function setI18nLanguage (lang) {
    i18n.locale = lang

    if (!ssrContext) {
      document.querySelector('html').setAttribute('lang', lang)
    }

    return lang
  }

  function loadLanguageAsync (lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}`).then(msgs => {
        loadedLanguages.push(lang)
        globalLanguages[lang] = msgs.default
        i18n.setLocaleMessage(lang, globalLanguages[lang])
        return Promise.resolve(setI18nLanguage(lang))
      }).catch(err => {
        console.log(lang, err)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }

  router.beforeEach((to, from, next) => {
    loadLanguageAsync(
      to.params.lang
    ).then(() => next())
  })

  return i18n
}
