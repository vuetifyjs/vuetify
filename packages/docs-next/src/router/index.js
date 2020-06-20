// Imports
import Router from 'vue-router'
import scrollBehavior from './scroll-behavior'
import Vue from 'vue'
import VueGtag from 'vue-gtag'

// Globals
import { IS_PROD } from '@/util/globals'

import { trailingSlash } from '@/util/helpers'
import { locale, layout, route, redirect } from '@/util/routes'

// Setup
Vue.use(Router)

export function createRouter (vuetify, store, i18n) {
  const loadedLocales = ['en']
  const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: (...args) => scrollBehavior(vuetify, ...args),
    routes: [
      locale([
        layout('Home', [
          route('Home'),
        ]),

        layout('Documentation', [
          route('Documentation', {
            default: 'Documentation',
            api: 'Api',
          }),
        ], ':category/:page'),
      ]),

      // Redirect for language fallback
      redirect('/:locale(%s)/*', to => to.params.pathMatch),
      // The previous one doesn't match if there's no slash after the language code
      redirect('/:locale(%s)'),
      redirect(to => to.path),
    ],
  })

  function loadLocale (locale) {
    if (
      !locale ||
      i18n.locale === locale ||
      loadedLocales.includes(locale)
    ) return Promise.resolve()

    return import(
      /* webpackChunkName: "locale-[request]" */
      `@/i18n/messages/${locale}.json`
    ).then(messages => {
      i18n.setLocaleMessage(locale, messages.default)
      loadedLocales.push(locale)
      i18n.locale = locale
    })
  }

  router.beforeEach((to, from, next) => {
    return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
  })

  router.beforeEach((to, _, next) => {
    loadLocale(to.params.locale).then(() => next())
  })

  Vue.use(VueGtag, {
    bootstrap: IS_PROD,
    config: { id: process.env.VUE_APP_GOOGLE_ANALYTICS },
  }, router)

  return router
}
