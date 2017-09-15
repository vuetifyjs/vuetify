import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      appDrawer: null,
      appFooter: null,
      routeWatcher: true
    },

    actions: {},

    mutations: {
      ['app:disable-route-watcher'] (state, payload) {
        state.routeWatcher = payload
      },
      ['app:drawer'] (state, payload) {
        state.appDrawer = payload
      },
      ['app:footer'] (state, payload) {
        state.appFooter = payload
      }
    },

    getters: {}
  })
}