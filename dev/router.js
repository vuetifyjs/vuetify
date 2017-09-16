import VueRouter from 'vue-router'

const component1 = {
  template: `<div class="title">Page 1</div>`
}
const component2 = {
  template: `<div class="title">Page 2</div>`
}

const router = new VueRouter({
  routes: [
    {
      path: '/page1',
      name: 'Page 1',
      component: component1
    },
    {
      path: '/page2',
      name: 'Page 2',
      component: component2
    },
    { path: '*', redirect: '/page1' }
  ]
})

export default router
