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
      `@/pages/${view}Page.vue`
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
        route('/getting-started/quick-start', 'getting-started/QuickStart'),
        route('/getting-started/starter-templates', 'getting-started/StarterTemplates'),
        route('/getting-started/why-vuetify', 'getting-started/WhyVuetify'),
        route('/getting-started/frequently-asked-questions', 'getting-started/Faq'),
        route('/getting-started/sponsors-and-backers', 'getting-started/Sponsors'),
        route('/getting-started/contributing', 'getting-started/Contributing'),
        // Application Layout
        route('/layout/pre-defined', 'layout/PreDefined'),
        // Base Styles
        route('/style/colors', 'style/Colors'),
        route('/style/theme', 'style/Theme'),
        route('/style/typography', 'style/Typography'),
        route('/style/content', 'style/Content'),
        // Motion & Transitions
        route('/motion/transitions', 'motion/Transitions'),
        // Components
        route('/components/alerts', 'components/Alerts'),
        route('/components/avatars', 'components/Avatars'),
        route('/components/badges', 'components/Badges'),
        route('/components/breadcrumbs', 'components/Breadcrumbs'),
        route('/components/bottom-navigation', 'components/BottomNav'),
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
        route('/components/grid-lists', 'components/GridLists'),
        route('/components/icons', 'components/Icons'),
        route('/components/lists', 'components/Lists'),
        route('/components/menus', 'components/Menus'),
        route('/components/navigation-drawers', 'components/NavigationDrawers'),
        route('/components/pagination', 'components/Pagination'),
        route('/components/parallax', 'components/Parallax'),
        route('/components/pickers', 'components/Pickers'),
        route('/components/progress', 'components/Progress'),
        route('/components/selects', 'components/Selects'),
        route('/components/selection-controls', 'components/SelectionControls'),
        route('/components/sliders', 'components/Sliders'),
        route('/components/snackbars', 'components/Snackbars'),
        route('/components/steppers', 'components/Steppers'),
        route('/components/subheaders', 'components/Subheaders'),
        route('/components/tabs', 'components/Tabs'),
        route('/components/text-fields', 'components/TextFields'),
        route('/components/toolbars', 'components/Toolbars'),
        route('/components/tooltips', 'components/Tooltips'),
        // Directives
        route('/directives/touch-support', 'directives/Touch'),
        //
        route('/pre-made-themes', 'PremadeThemes'),
        // Guides
        route('/guides/server-side-rendering', 'guides/SSR'),
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
