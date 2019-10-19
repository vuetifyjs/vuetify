import Vue from 'vue'
import Router from 'vue-router'
import VueAnalytics from 'vue-analytics'
import scrollBehavior from './scroll-behavior'
// import redirects from './301.json'
// import languages from '@/data/i18n/languages.json'
import {
  // getLanguageCookie,
  layout,
  root,
  // redirect,
  route,
} from './util'

Vue.use(Router)

// language regex:
// /^[a-z]{2,3}(?:-[a-zA-Z]{4})?(?:-[A-Z]{2,3})?$/
// /^[a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3}$/
// const languageRegex = /^\/([a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3})(?:\/.*)?$/
// const fallbackLocale = languages.find(lang => lang.fallback === true).locale

const routes = root([
  layout('', 'Frontend', [
    route('', 'Home'),
  ]),
  layout(':namespace/:page/:section?', 'Backend', [
    route('', 'Documentation'),
  ]),
])

export function createRouter () {
  const router = new Router({
    base: __dirname,
    mode: 'history',
    scrollBehavior,
    routes,
    // routes: [
    //   {
    //     path: ,
    //     component: () => import(
    //       /* webpackChunkName: "root" */
    //       '@/views/Root.vue'
    //     ),
    //     props: route => ({ lang: route.params.lang }),
    //     children: [
    //       ...Object.keys(redirects).map(k => ({
    //         path: k.replace(/^\//, ''),
    //         redirect: () => redirects[k].replace(/^\//, ''),
    //       })),
    //       {
    //         path: '',
    //         name: 'home/Home',
    //         component: () => import(
    //           /* webpackChunkName: "home" */
    //           '@/pages/home/Page.vue'
    //         ),
    //       },
    //       {
    //         path: 'examples/layouts/:page',
    //         name: 'Layouts',
    //         props: true,
    //         component: () => import(
    //           /* webpackChunkName: "layouts" */
    //           '@/views/Layouts.vue'
    //         ),
    //       },
    //       {
    //         path: ':namespace/:page/:section?',
    //         name: 'Documentation',
    //         props: route => ({
    //           namespace: route.params.namespace,
    //           page: route.params.page,
    //           lang: route.params.lang,
    //         }),
    //         component: () => import(
    //           /* webpackChunkName: "documentation" */
    //           '@/pages/documentation/Page.vue'
    //         ),
    //       },
    //       {
    //         path: '*',
    //         redirect: to => {
    //           let lang = `/${getLanguageCookie() || fallbackLocale}`
    //           if (!languageRegex.test(lang)) lang = `/${fallbackLocale}`

    //           return `${lang}`
    //         },
    //       },
    //     ],
    //   },
    //   {
    //     path: '*',
    //     redirect: to => {
    //       let lang = `/${getLanguageCookie() || fallbackLocale}`
    //       if (!languageRegex.test(lang)) lang = `/${fallbackLocale}`

    //       return `${lang}/404`
    //     },
    //   },
    // ],
  })

  if (process.env.VUE_APP_GOOGLE_ANALYTICS) {
    Vue.use(VueAnalytics, {
      id: 'UA-75262397-3',
      router,
      autoTracking: {
        page: process.env.NODE_ENV !== 'development',
      },
      debug: process.env.DEBUG ? {
        enabled: true,
        trace: false,
        sendHitTask: true,
      } : false,
    })
  }

  return router
}
