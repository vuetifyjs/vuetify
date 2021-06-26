const home = {
  template: `<div class="title">Home</div>`,
}
const page1 = {
  template: `<div class="title">Page 1</div>`,
}
const page2 = {
  template: `<div class="title">Page 2</div>`,
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
  { path: '/:pathMatch(.*)*', redirect: '/' },
]
