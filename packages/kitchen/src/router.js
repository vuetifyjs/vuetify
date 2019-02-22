import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/theme',
      name: 'Theme',
      component: () => import('@/views/Theme')
    },
    {
      path: '/:component',
      name: 'Bootstrapper',
      component: () => import('@/views/Bootstrapper')
    },
    {
      path: '*',
      name: 'Home',
      component: () => import('@/views/Home')
    }
  ]
})

// Bootstrap Analytics
// Set in .env
// https://github.com/MatteoGabriele/vue-analytics
if (process.env.VUE_APP_GOOGLE_ANALYTICS) {
  Vue.use(require('vue-analytics').default, {
    id: process.env.VUE_APP_GOOGLE_ANALYTICS,
    router,
    autoTracking: {
      page: process.env.NODE_ENV !== 'development'
    }
  })
}

export default router
