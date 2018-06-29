import Vue from 'vue'
import Router from 'vue-router'
import VueAnalytics from 'vue-analytics'
import Routes from '@/data/routes.json'
import scrollBehavior from './scroll-behavior'

Vue.use(Router)

// language regex:
// /^[a-z]{2,3}(?:-[a-zA-Z]{4})?(?:-[A-Z]{2,3})?$/
// /^[a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3}$/
const languageRegex = /^\/([a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3})(?:\/.*)?$/

const release = process.env.RELEASE

function getLanguageCookie () {
  if (typeof document === 'undefined') return
  return new Map(document.cookie.split('; ').map(c => c.split('='))).get('currentLanguage')
}

export function createRouter (store) {
  function route (path, view, fullscreen, props) {
    return {
      path: path,
      meta: { fullscreen },
      name: view,
      props,
      component: () => import(`@/pages/${view}Page.vue`)
    }
  }

  const routes = [
    // Temp until I figure out a way
    // to implement this into admin
    route(
      'store/product/:id',
      'store/Product',
      null,
      r => ({ id: r.params.id })
    )
  ]

  routes.push(
    ...Routes.map(r => {
      return route(
        r.route,
        r.page,
        r.fullscreen,
        r.props
      )
    })
  )

  const router = new Router({
    base: release ? `/releases/${release}` : __dirname,
    mode: release ? 'hash' : 'history',
    scrollBehavior,
    routes: [
      {
        path: '/:lang([a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3})',
        component: () => import(/* webpackChunkName: "routes" */'@/components/views/RootView.vue'),
        props: route => ({ lang: route.params.lang }),
        children: routes
      },
      {
        path: '*',
        redirect: to => {
          let lang = getLanguageCookie() || 'en'
          if (!languageRegex.test('/' + lang)) lang = 'en'
          return `/${lang}${to.path}`
        }
      }
    ]
  })

  router.beforeEach((to, from, next) => {
    if (to.meta.fullscreen || from.meta.fullscreen) {
      store.commit('app/FULLSCREEN', !!to.meta.fullscreen)
    }
    next()
  })

  Vue.use(VueAnalytics, {
    id: 'UA-75262397-3',
    router,
    autoTracking: {
      page: process.env.NODE_ENV !== 'development'
    },
    debug: process.env.DEBUG ? {
      enabled: true,
      trace: false,
      sendHitTask: true
    } : false
  })

  return router
}
