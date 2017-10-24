import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      appDrawer: null,
      appFooter: null,
      resizeWatcher: true,
      routeWatcher: true
    },

    actions: {},

    mutations: {
      ['app/DISABLE_ROUTE_WATCHER'] (state, payload) {
        state.routeWatcher = payload
      },
      ['app/ENABLE_RESIZE_WATCHER'] (state, payload) {
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