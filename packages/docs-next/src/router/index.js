// Imports
import Vue from 'vue'
import Router from 'vue-router'
import VueGtag from 'vue-gtag'

Vue.use(Router)

export function createRouter (store, i18n) {
  const loadedLocales = ['en']
  const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: (to, from, savedPosition) => {
      if (to.hash) return { selector: to.hash }
      if (savedPosition) return savedPosition

      return { x: 0, y: 0 }
    },
    routes: [
      {
        path: '/:locale',
        component: () => import('@/layouts/locale/Index'),
        children: [
          {
            path: ':category/:page',
            // Layouts allow you to define different
            // structures for different view
            component: () => import('@/layouts/documentation/Index'),
            children: [
              {
                path: '',
                name: 'Documentation',
                components: {
                  default: () => import('@/views/Documentation'),
                  api: () => import('@/views/Api'),
                },
              },
            ],
          },
        ],
      },
    ],
  })

  function loadLocale (locale) {
    if (
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

  router.beforeEach((to, _, next) => {
    loadLocale(to.params.locale).then(() => next())
  })

  Vue.use(VueGtag, {
    bootstrap: process.env.NODE_ENV === 'production',
    config: { id: process.env.VUE_APP_GOOGLE_ANALYTICS },
  }, router)

  return router
}
