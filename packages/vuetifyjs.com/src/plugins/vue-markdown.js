// Packages
import Vue from 'vue'

Vue.component('markdown', () => ({
  component: import(
    /* webpackChunkName: "markdown" */
    'vue-markdown'
  )
}))
