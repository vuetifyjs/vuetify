import Vue from 'vue'
import Router from 'vue-router'
import VueAnalytics from 'vue-analytics'
import scrollBehavior from './scroll-behavior'
import redirects from './301.json'
import {
  layout,
  root,
  redirectLang,
  route,
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
    redirectLang('/404'),
  ]),
  redirectLang(),
])

export function createRouter () {
  const router = new Router({
    base: __dirname,
    mode: 'history',
    scrollBehavior,
    routes,
  })

  Vue.use(VueAnalytics, {
    id: 'UA-75262397-3',
    router,
    autoTracking: {
      page: process.env.NODE_ENV !== 'development',
    },
    debug: process.env.DEBUG ? {
      enabled: true,
      trace: false,
      sendHitTask: true,
    } : false,
  })

  return router
}
