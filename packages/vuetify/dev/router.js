import { h } from 'vue'

const home = {
  setup: () => () => h('div', 'hello'),
}
const page1 = {
  setup: () => () => h('div', 'page1'),
}
const page2 = {
  setup: () => () => h('div', 'page2'),
}
const nested1 = {
  setup: () => () => h('div', 'nested1'),
}
const nested2 = {
  setup: () => () => h('div', 'nested2'),
}

export const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
  },
  {
    path: '/page1',
    name: 'page1',
    component: page1,
  },
  {
    path: '/page2',
    name: 'page2',
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
