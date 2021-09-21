import { h } from 'vue'

const home = {
  setup: () => () => h('div', 'hello'),
}
const page1 = {
  setup: () => () => h('div', 'hello'),
}
const page2 = {
  setup: () => () => h('div', 'hello'),
}
const nested1 = {
  setup: () => () => h('div', 'hello'),
}
const nested2 = {
  setup: () => () => h('div', 'hello'),
}

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: home,
  },
  {
    path: '/page1',
    name: 'Page 1',
    component: page1,
  },
  {
    path: '/page2',
    name: 'Page 2',
    component: page2,
  },
  {
    path: '/nested/page1',
    name: 'Nested 1',
    component: nested1,
  },
  {
    path: '/nested/page2',
    name: 'Nested 2',
    component: nested2,
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]
