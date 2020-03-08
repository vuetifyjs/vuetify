// Vue
import Vue from 'vue'
import Router from 'vue-router'
import VueAnalytics from 'vue-analytics'

// Settings
import redirects from './301.json'
import scrollBehavior from './scroll-behavior'

// Utilities
import {
  layout,
  root,
  route,
  trailingSlash,
} from './util'

Vue.use(Router)

const routes = root([
  layout('', 'Frontend', [
    ...Object.keys(redirects).map(k => ({
      path: k.replace(/^\//, ''),
      redirect: () => redirects[k].replace(/^\//, ''),
    })),
    route('', 'Home'),
  ]),
  layout('examples/layouts/:page', 'Layouts'),
  layout(':namespace/:page/:section?', 'Documentation', [
    route('', 'Page'),
  ]),
  {
    component: () => import('@/layouts/frontend/Index.vue'),
    path: '*',
    children: [{
      name: 'NotFound',
      path: '',
      component: () => import('@/pages/general/404.vue'),
    }],
  },
])

export function createRouter () {
  const router = new Router({
    base: __dirname,
    mode: 'history',
    routes,
    scrollBehavior,
  })

  router.beforeEach((to, from, next) => {
    return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
  })

  Vue.use(VueAnalytics, {
    autoTracking: {
      page: process.env.NODE_ENV !== 'development',
    },
    debug: process.env.DEBUG ? {
      enabled: true,
      trace: false,
      sendHitTask: true,
    } : false,
    id: 'UA-75262397-3',
    router,
  })

  return router
}
