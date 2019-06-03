import 'vuetify/dist/vuetify.css'
import '@mdi/font/css/materialdesignicons.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'es6-promise/auto'

import { createApp } from './main'
import WebFontLoader from 'webfontloader'

// async load fonts
WebFontLoader.load({
  google: {
    families: [
      'Roboto:100,300,400,500,700,900',
      'Roboto+Mono:500',
    ],
  },
})

createApp({
  start ({ app, router, store }) {
    // prime the store with server-initialized state.
    // the state is determined during SSR and inlined in the page markup.
    if (window.__INITIAL_STATE__) {
      store.replaceState(window.__INITIAL_STATE__)
    }

    // Add router hook for handling asyncData.
    // Doing it after initial route is resolved so that we don't double-fetch
    // the data that we already have. Using router.beforeResolve() so that all
    // async components are resolved.
    router.beforeResolve((to, from, next) => {
      const matched = router.getMatchedComponents(to)
      const prevMatched = router.getMatchedComponents(from)
      let diffed = false
      const activated = matched.filter((c, i) => {
        return diffed || (diffed = (prevMatched[i] !== c))
      })

      if (!activated.length) return next()

      Promise.all([
        ...activated.map(c => {
          if (c.asyncData) {
            return c.asyncData({
              store,
              route: to,
            })
          }
        }),
      ]).finally(next)
    })

    // wait until router has resolved all async before hooks
    // and async components...
    router.onReady(() => {
      // actually mount to DOM
      app.$mount('#app')
    })
  },
})
