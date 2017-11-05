import Vue from 'vue'
import Vuex from 'vuex'

const api = require('../api/api.js')

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      api,
      appDrawer: null,
      appFooter: null,
      currentVersion: null,
      resizeWatcher: false,
      routeWatcher: false
    },

    actions: {},

    mutations: {
      ['app/ROUTE_WATCHER'] (state, payload) {
        state.routeWatcher = payload
      },
      ['app/RESIZE_WATCHER'] (state, payload) {
        state.resizeWatcher = payload
      },
      ['app/DRAWER'] (state, payload) {
        state.appDrawer = payload
      },
      ['app/DRAWER_TOGGLE'] (state) {
        state.appDrawer = !state.appDrawer
      },
      ['app/FOOTER'] (state, payload) {
        state.appFooter = payload
      }
    },

    getters: {}
  })
}