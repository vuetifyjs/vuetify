/**
 * router/index.js
 *
 * vue-router documentation: https://router.vuejs.org/
 */

// Imports
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: (to, from, savedPosition) => {
      if (to.hash) return { selector: to.hash }
      if (savedPosition) return savedPosition

      return { x: 0, y: 0 }
    },
    routes: [
      {
        path: '/:lang',
        component: () => import('@/layouts/root/Index'),
        children: [
          {
            path: ':category/:page',
            // Layouts allow you to define different
            // structures for different view
            component: () => import('@/layouts/default/Index'),
            children: [
              {
                path: '',
                name: 'Documentation',
                component: () => import('@/views/Documentation'),
              },
            ],
          },
        ],
      },
    ],
  })

  return router
}
