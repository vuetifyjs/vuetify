import Vue from 'vue'
import Router from 'vue-router'

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
      `@pages/${view}Page.vue`
    )
  }
}

export function createRouter () {
    const router = new Router({
      base: release ? `/releases/${release}` : __dirname,
      mode: release ? 'hash' : 'history',
      async scrollBehavior (to, from, savedPosition) {
        if (document.readyState !== 'complete') {
          await new Promise(resolve => {
            const cb = () => {
              window.requestAnimationFrame(resolve)
              window.removeEventListener('load', cb)
            }
            window.addEventListener('load', cb)
          })
        }

        if (savedPosition) {
          return savedPosition
        }

        if (to.hash) {
          return {
            selector: to.hash,
            offset: { y: 80 }
          }
        }

        return { y: 0 }
      },
      routes: [
        route('/', 'Home'),
        // Getting Started
        route('/getting-started/quick-start', 'QuickStart'),
        route('/playground', 'Playground'),
        route('/components/alerts', 'Alerts'),
        // Global redirect for 404
        { path: '*', redirect: '/' }
      ]
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
