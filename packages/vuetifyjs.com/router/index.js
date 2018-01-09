import Vue from 'vue'
import Router from 'vue-router'
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

    // Send a pageview to Google Analytics
    router.beforeEach((to, from, next) => {
      if (typeof ga !== 'undefined' && process.env.NODE_ENV !== 'development') {
        ga('set', 'page', to.path)
        ga('send', 'pageview')
      }
      next()
    })

    return router
}
