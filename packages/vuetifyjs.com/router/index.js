import Vue from 'vue'
import Router from 'vue-router'
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

export function createRouter () {
    const router = new Router({
      base: release ? `/releases/${release}` : __dirname,
      mode: release ? 'hash' : 'history',
      scrollBehavior,
      routes: [
        route('/404', 'general/404'),
        route('/', 'Home'),
        // Getting Started
        route('/getting-started/quick-start', 'getting-started/QuickStart'),
        route('/getting-started/why-vuetify', 'getting-started/WhyVuetify'),
        route('/getting-started/frequently-asked-questions', 'getting-started/FrequentlyAskedQuestions'),
        route('/getting-started/sponsors-and-backers', 'getting-started/SponsorsAndBackers'),
        route('/getting-started/contributing', 'getting-started/Contributing'),
        route('/getting-started/roadmap', 'getting-started/Roadmap'),
        // Application Layout
        route('/layout/pre-defined', 'layout/PreDefined'),
        route('/layout/spacing', 'layout/Spacing'),
        route('/layout/alignment', 'layout/Alignment'),
        route('/layout/display', 'layout/Display'),
        route('/layout/elevation', 'layout/Elevation'),
        route('/layout/sandbox', 'layout/Sandbox'),
        // Base Styles
        route('/style/colors', 'style/Colors'),
        route('/style/theme', 'style/Theme'),
        route('/style/typography', 'style/Typography'),
        route('/style/content', 'style/Content'),
        // Motion & Transitions
        route('/motion/transitions', 'motion/Transitions'),
        // Extra
        route('/pre-made-themes', 'PremadeThemes'),
        // Guides
        route('/guides/server-side-rendering', 'guides/SSR'),
        route('/guides/a-la-carte', 'guides/ALaCarte'),
        // Dynamic
        route('/examples/:example+', 'examples/Example'),
        route('/:section/:component', 'components/Doc'),
        // Global redirect for 404
        { path: '*', redirect: '/404' }
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
