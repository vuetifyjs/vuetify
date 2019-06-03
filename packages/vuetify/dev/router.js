import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const component1 = {
  template: `<div class="title">Page 1</div>`,
}
const component2 = {
  template: `<div class="title">Page 2</div>`,
}

const router = new Router({
  routes: [
    {
      path: '/page1',
      name: 'Page 1',
      component: component1,
    },
    {
      path: '/page2',
      name: 'Page 2',
      component: component2,
    },
    { path: '*', redirect: '/page1' },
  ],
})

export default router
