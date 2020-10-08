// Imports
import Router from 'vue-router'
import scrollBehavior from './scroll-behavior'
import Vue from 'vue'
import VueGtag from 'vue-gtag'
import { localeLookup } from '@/i18n/util'
import redirects from './301.json'

// Globals
import { IS_SERVER } from '@/util/globals'

import {
  abort,
  locale,
  layout,
  route,
  rpath,
  redirect,
} from '@/util/routes'

// Setup
Vue.use(Router)

export function createRouter (vuetify, store, i18n) {
  const loadedLocales = ['en']
  const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: (...args) => scrollBehavior(vuetify, store, ...args),
    routes: [
      locale([
        ...Object.keys(redirects).map(k => ({
          path: k.replace(/^\//, ''),
          redirect: () => redirects[k].replace(/^\//, ''),
        })),
        layout('Home', [route('Home')]),
        layout('Default', [route('Documentation')], ':category/:page/'),
        layout('Wireframe', [route('Wireframes', 'examples/wireframes/:wireframe/')]),
        layout('Default', [abort()]),
      ]),
      // Redirect for language fallback
      redirect('/:locale(%s)/*', to => {
        // fallbackLocale regex is too aggressive and catches 'api' as well
        if (to.params.locale === 'api') return to.path
        return to.params.pathMatch
      }),
      // The previous one doesn't match if there's no slash after the language code
      redirect('/:locale(%s)'),
      redirect(),
    ],
  })

  function loadLocale (locale) {
    if (
      !locale ||
      i18n.locale === locale ||
      loadedLocales.includes(locale)
    ) return Promise.resolve()

    const messagesFile = localeLookup(locale)

    return import(
      /* webpackChunkName: "locale-[request]" */
      `@/i18n/messages/${messagesFile}.json`
    ).then(messages => {
      i18n.setLocaleMessage(locale, messages.default)
      loadedLocales.push(locale)
      i18n.locale = locale
    })
  }

  router.beforeEach(({ path }, from, next) => {
    return path.endsWith('/') ? next() : next(rpath(path))
  })

  router.beforeEach((to, _, next) => {
    loadLocale(to.params.locale).then(() => next())
  })

  router.afterEach((to, from) => {
    if (to.path !== from.path && store.state.pwa.sw.update) {
      store.dispatch('pwa/update')
    }
  })

  Vue.use(VueGtag, {
    bootstrap: !IS_SERVER,
    config: { id: 'UA-75262397-3' },
  }, router)

  return router
}
