import 'vuetify/dist/vuetify.css'
import '@mdi/font/css/materialdesignicons.css'
import 'docsearch.js/dist/cdn/docsearch.min.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'es6-promise/auto'

import axios from 'axios'
import { createApp } from './main'

createApp({
  start ({ app, router, store }) {
    // prime the store with server-initialized state.
    // the state is determined during SSR and inlined in the page markup.
    if (window.__INITIAL_STATE__) {
      store.replaceState(window.__INITIAL_STATE__)
    }

    // Used for examples
    window.axios = axios

    // wait until router has resolved all async before hooks
    // and async components...
    router.onReady(() => {
      // actually mount to DOM
      app.$mount('#app')
    })
  }
})
