import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enUS from '@/lang/en-US'

Vue.use(VueI18n)

export function createI18n (ssrContext, router) {
  const fallbackLocale = 'en-US'
  const loadedLanguages = []
  const globalLanguages = {}

  let locale = fallbackLocale
  if (ssrContext && ssrContext.lang) {
    locale = ssrContext.lang
  } else if (typeof document !== 'undefined') {
    locale = document.documentElement.lang
  }

  // TODO: Hmm, if locale is set to something other than en-US by
  // ssr or document then what happens when it's not loaded?
  const i18n = new VueI18n({
    locale,
    messages: { [fallbackLocale]: enUS },
    fallbackLocale
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
        console.log(err)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }

  router.beforeEach((to, from, next) => {
    loadLanguageAsync(
      to.params.lang
    )
      .then(() => next())
      .catch(() => next('/en'))
  })

  return i18n
}
