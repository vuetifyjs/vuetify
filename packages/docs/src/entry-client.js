// Imports
import 'es6-promise/auto'
import 'intersection-observer'
import 'vuetify/dist/vuetify.css'
import WebFontLoader from 'webfontloader'
import { createApp } from './main'

// async load fonts
WebFontLoader.load({
  google: {
    families: [
      'Roboto:100,300,400,500,700,900',
      'Roboto+Mono:500',
      'Material+Icons',
    ],
  },
  custom: {
    families: [
      'Material Design Icons',
      'Font Awesome 5',
    ],
    urls: [
      'https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css',
      'https://use.fontawesome.com/releases/v5.0.8/css/all.css',
    ],
  },
})

createApp({
  start ({ app, router, store }) {
    // prime the store with server-initialized state.
    // the state is determined during SSR and inlined in the page markup.
    if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
      store.replaceState(window.__INITIAL_STATE__)
    }

    // Add router hook for handling asyncData.
    // Doing it after initial route is resolved so that we don't double-fetch
    // the data that we already have. Using router.beforeResolve() so that all
    // async components are resolved.
    router.beforeResolve((to, from, next) => {
      let diffed = false
      const matched = router.getMatchedComponents(to)
      const prevMatched = router.getMatchedComponents(from)
      const activated = matched.filter((c, i) => {
        return diffed || (diffed = (prevMatched[i] !== c))
      })

      if (!activated.length) return next()

      Promise.all(
        activated.map(c => {
          return c.asyncData
            ? c.asyncData({
              store,
              route: to,
            })
            : Promise.resolve()
        })
      ).finally(next)
    })

    // wait until router has resolved all async before hooks
    // and async components...
    router.onReady(() => {
      // actually mount to DOM
      app.$mount('#app')
    })
  },
})
