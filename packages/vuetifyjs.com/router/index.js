import Vue from 'vue'
import Router from 'vue-router'
import VueAnalytics from 'vue-analytics'
import paths from './paths'
import scrollBehavior from './scroll-behavior'

Vue.use(Router)

// The meta data for your routes
const meta = require('./meta.json')
const release = process.env.RELEASE

// Function to create routes
// Is default lazy but can be changed
function route (path, view) {
  return {
    path: path,
    meta: meta[path],
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/${view}Page.vue`
    )
  }
}

const routes = paths.map(path => {
  return route(`/${path.shift()}`, path)
})

routes.push({ path: '*', redirect: '/404' })

export function createRouter () {
    const router = new Router({
      base: release ? `/releases/${release}` : __dirname,
      mode: release ? 'hash' : 'history',
      scrollBehavior,
      routes
    })

    Vue.use(VueAnalytics, {
      id: 'UA-75262397-3',
      router,
      autoTracking: {
        page: process.env.NODE_ENV !== 'development'
      },
      debug: false ? {
        enabled: true,
        trace: false,
        sendHitTask: true
      } : false
    })

    return router
}
