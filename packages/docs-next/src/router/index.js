// Imports
import Vue from 'vue'
import Router from 'vue-router'
import VueGtag from 'vue-gtag'
import { loadLocale } from '../plugins/i18n'

Vue.use(Router)

export function createRouter () {
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
            path: 'api/:page',
            component: () => import('@/layouts/default/Index'),
            children: [
              {
                path: '',
                name: 'Api',
                component: () => import('@/views/Api'),
              },
            ],
          },
          {
            path: ':category/:page',
            // Layouts allow you to define different
            // structures for different view
            component: () => import('@/layouts/default/Index'),
            children: [
              {
                path: '',
                name: 'Documentation',
                component: () => import('@/views/Documentation'),
              },
            ],
          },
        ],
        beforeEnter: (to, _, next) => {
          const locale = to.params.locale
          loadLocale(locale).then(next)
        },
      },
    ],
  })

  Vue.use(VueGtag, {
    bootstrap: process.env.NODE_ENV === 'production',
    config: { id: process.env.VUE_APP_GOOGLE_ANALYTICS },
  }, router)

  return router
}
