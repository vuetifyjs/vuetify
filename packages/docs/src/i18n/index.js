// Vue
import Vue from 'vue'
import VueI18n from 'vue-i18n'

// Data
import languages from '@/data/i18n/languages.json'
import en from '@/lang/en'

Vue.use(VueI18n)

export function createI18n (ssrContext, router) {
  const fallbackLocale = 'en'
  const globalLanguages = {}
  const hasDocument = typeof document !== 'undefined'
  const loadedLanguages = []

  let locale = fallbackLocale

  if (ssrContext && ssrContext.lang) {
    locale = ssrContext.lang
  } else if (hasDocument) {
    locale = document.documentElement.lang
  }

  const i18n = new VueI18n({
    fallbackLocale,
    locale,
    messages: { en },
    silentFallbackWarn: true,
  })

  function setI18nLanguage (lang) {
    i18n.locale = lang

    if (!ssrContext && hasDocument) {
      document.querySelector('html').setAttribute('lang', lang)
    }

    return lang
  }

  function loadLanguageAsync (lang) {
    if (!loadedLanguages.includes(lang)) {
      const { locale } = languages.find(l => lang === l.alternate || lang === l.locale) || {}

      if (!locale) return Promise.reject(new Error('Language not found'))

      return import(
        /* webpackChunkName: "lang-[request]" */
        `@/lang/${locale}`
      ).then(msgs => {
        loadedLanguages.push(lang)
        globalLanguages[lang] = msgs.default
        i18n.setLocaleMessage(lang, globalLanguages[lang])

        return Promise.resolve(setI18nLanguage(lang))
      }).catch(err => {
        console.log(err)
        throw err
      })
    }

    return Promise.resolve(setI18nLanguage(lang))
  }

  router.beforeEach((to, from, next) => {
    loadLanguageAsync(to.params.lang)
      .then(() => next())
      .catch(() => {})
  })

  return i18n
}
