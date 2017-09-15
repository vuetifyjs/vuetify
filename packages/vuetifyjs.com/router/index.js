import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// The meta data for your routes
const meta = require('./meta.json')

// Function to create routes
// Is default lazy but can be changed
function route (path, view) {
  return {
    path: path,
    meta: meta[path],
    component: resolve => import(`pages/${view}View.vue`).then(resolve)
  }
}

export function createRouter () {
    const router = new Router({
      base: __dirname,
      mode: 'history',
      scrollBehavior: () => ({ y: 0 }),
      routes: [
        route('/', 'Home'),
        // Getting Started
        route('/getting-started/quick-start', 'QuickStart'),
        // Global redirect for 404
        { path: '*', redirect: '/' }
      ]
    })

    // Send a pageview to Google Analytics
    router.beforeEach((to, from, next) => {
        if (typeof ga !== 'undefined') {
            ga('set', 'page', to.path)
            ga('send', 'pageview')
        }
        next()
    })

    return router
}
