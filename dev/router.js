import VueRouter from 'vue-router'

import DailyStyling from './calendar/DailyStyling'

const router = new VueRouter({
  routes: [
    {
      path: '/styling',
      name: 'Test Daily Styling',
      component: DailyStyling
    },
    { path: '*', redirect: '/styling' }
  ]
})

export default router
