import VueRouter from 'vue-router'

const testCases = require.context('./e2e/cases', false, /\.vue$/)
  .keys()
  .map(k => k.substring(2))
  .map(k => [k.slice(0, -4), import(`./e2e/cases/${k}`)])

function component (text) {
  return {
    render: h => h('div', { staticClass: 'title' }, [text])
  }
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('./Playground.vue'),
      children: [
        {
          path: 'page1',
          name: 'Page 1',
          component: component('Page 1')
        },
        {
          path: 'page2',
          name: 'Page 2',
          component: component('Page 2')
        },
      ]
    }
    {
      path: '/e2e',
      component: () => import('./e2e/Main.vue')
      children: testCases.map(c => ({
        path: c[0],
        component: () => c[1]
      }))
    },
    { path: '*', redirect: '/page1' }
  ]
})

export default router
