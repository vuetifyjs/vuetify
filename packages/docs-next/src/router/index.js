// Imports
import Router from 'vue-router'
import scrollBehavior from './scroll-behavior'
import Vue from 'vue'
import VueGtag from 'vue-gtag'
import languages from '@/i18n/locales'

// Globals
import { IS_PROD } from '@/util/globals'

// Setup
Vue.use(Router)

// Matches allowed languages
export const languagePattern = languages.map(lang => lang.alternate || lang.locale).join('|')
export const languageRegexp = new RegExp('^(' + languagePattern + ')$')
// Matches any language identifier
export const genericLanguageRegexp = /[a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3}/

export function preferredLanguage () {
  return typeof document === 'undefined'
    ? 'en'
    : window.localStorage.getItem('currentLanguage') || navigator.languages.find(l => l.match(languageRegexp)) || 'en'
}

export function redirect (redirect) {
  return { path: '*', redirect }
}

export function trailingSlash (str) {
  return str.endsWith('/') ? str : str + '/'
}

export function createRouter (vuetify, store, i18n) {
  const loadedLocales = ['en']
  const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: (...args) => scrollBehavior(vuetify, ...args),
    routes: [
      {
        path: `/:locale(${languagePattern})`,
        component: () => import(
          /* webpackChunkName: "layouts-local" */
          '@/layouts/locale/Index'
        ),
        children: [
          {
            path: '',
            component: () => import(
                /* webpackChunkName: "layouts-home" */
                '@/layouts/home/Index'
              ),
            children: [{
              path: '',
              component: () => import(
                /* webpackChunkName: "views-home" */
                '@/views/Home'
              ),
              name: 'Home',
            }],
          },
          {
            path: ':category/:page',
            // Layouts allow you to define different
            // structures for different view
            component: () => import(
              /* webpackChunkName: "layouts-documentation" */
              '@/layouts/documentation/Index'
            ),
            children: [
              {
                path: '',
                name: 'Documentation',
                components: {
                  default: () => import(
                    /* webpackChunkName: "views-documentation" */
                    '@/views/Documentation'
                  ),
                  api: () => import(
                    /* webpackChunkName: "views-api" */
                    '@/views/Api'
                  ),
                },
              },
            ],
          },
        ],
      },
      {
        path: `/:lang(${genericLanguageRegexp.source})/*`,
        redirect: to => trailingSlash(`/${preferredLanguage()}/${to.params.pathMatch || ''}`),
      },
      {
        // The previous one doesn't match if there's no slash after the language code
        path: `/:lang(${genericLanguageRegexp.source})`,
        redirect: () => `/${preferredLanguage()}/`,
      },
      redirect(to => trailingSlash(`/${preferredLanguage()}${to.path}`)),
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
