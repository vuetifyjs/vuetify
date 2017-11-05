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
        route('/getting-started/why-vuetify', 'WhyVuetify'),
        route('/getting-started/frequently-asked-questions', 'Faq'),
        route('/getting-started/sponsors-and-backers', 'Sponsors'),
        route('/getting-started/contributing', 'Contributing'),
        route('/playground', 'Playground'),
        route('/components/alerts', 'components/Alerts'),
        route('/components/avatars', 'components/Avatars'),
        route('/components/badges', 'components/Badges'),
        route('/components/breadcrumbs', 'components/Breadcrumbs'),
        route('/components/bottom-navigation', 'components/BottomNavigation'),
        route('/components/bottom-sheets', 'components/BottomSheets'),
        route('/components/buttons', 'components/Buttons'),
        route('/components/floating-action-buttons', 'components/Fabs'),
        route('/components/cards', 'components/Cards'),
        route('/components/carousels', 'components/Carousels'),
        route('/components/chips', 'components/Chips'),
        route('/components/data-tables', 'components/DataTables'),
        route('/components/dialogs', 'components/Dialogs'),
        route('/components/dividers', 'components/Dividers'),
        route('/components/expansion-panels', 'components/ExpansionPanels'),
        route('/components/footer', 'components/Footer'),
        route('/components/grid-lists', 'GridLists'),
        route('/components/icons', 'Icons'),
        route('/components/lists', 'Lists'),
        route('/components/menus', 'Menus'),
        route('/components/navigation-drawers', 'NavigationDrawers'),
        route('/components/pagination', 'Pagination'),
        route('/components/parallax', 'Parallax'),
        route('/components/pickers', 'Pickers'),
        route('/components/progress', 'Progress'),
        route('/components/selects', 'Selects'),
        route('/components/selection-controls', 'SelectionControls'),
        route('/components/sliders', 'Sliders'),
        route('/components/snackbars', 'Snackbars'),
        route('/components/steppers', 'Steppers'),
        route('/components/subheaders', 'Subheaders'),
        route('/components/tabs', 'Tabs'),
        route('/components/text-fields', 'TextFields'),
        route('/components/toolbars', 'Toolbars'),
        route('/components/tooltips', 'Tooltips'),
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
