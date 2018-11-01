import Vue from 'vue'
import Router from 'vue-router'
import VueAnalytics from 'vue-analytics'
import Routes from '@/data/routes.json'
import scrollBehavior from './scroll-behavior'
import Root from '@/components/views/Root'

Vue.use(Router)

// language regex:
// /^[a-z]{2,3}(?:-[a-zA-Z]{4})?(?:-[A-Z]{2,3})?$/
// /^[a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3}$/
const languageRegex = /^\/([a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3})(?:\/.*)?$/

function getLanguageCookie () {
  if (typeof document === 'undefined') return
  return new Map(document.cookie.split('; ').map(c => c.split('='))).get('currentLanguage')
}

export function createRouter (store) {
  function route (path, view, fullscreen, props, children) {
    const hasChildren = Array.isArray(children)

    return {
      path,
      meta: { fullscreen },
      name: hasChildren ? undefined : view,
      props,
      component: () => import(`@/pages/${view}Page.vue`),
      children: hasChildren
        ? children.map(r => route(
          r.route,
          r.page,
          r.fullscreen,
          r.props,
          r.children
        ))
        : []
    }
  }

  const routes = Routes.map(r => route(
    r.route,
    r.page,
    r.fullscreen,
    r.props,
    r.children
  ))

  routes.unshift({
    path: '/',
    name: 'home/Home',
    meta: { fullscreen: true },
    component: () => import(
      /* webpackChunkName: "home" */
      '@/pages/home/HomePage.vue'
    )
  })

  const router = new Router({
    base: __dirname,
    mode: 'history',
    scrollBehavior,
    routes: [
      {
        path: '/:lang([a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3})',
        component: Root,
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
      page: process.env.NODE_ENV !== 'development',
      pageviewOnLoad: false
    },
    debug: process.env.DEBUG ? {
      enabled: true,
      trace: false,
      sendHitTask: true
    } : false
  })

  return router
}
