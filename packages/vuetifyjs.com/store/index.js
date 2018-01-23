import Vue from 'vue'
import Vuex from 'vuex'

import storeModule from './storeModule'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    modules: {
      store: storeModule
    },

    state: {
      appDrawer: null,
      appFooter: true,
      appSnackbar: {
        color: 'success',
        msg: '',
        text: 'Close'
      },
      appToolbar: null,
      currentVersion: null,
      isFullscreen: false,
      loadedLangs: [],
      releases: [],
      stateless: false
    },

    actions: {},

    mutations: {
      'app/STATELESS' (state, payload) {
        state.stateless = payload
      },
      'app/DRAWER' (state, payload) {
        state.appDrawer = payload
      },
      'app/DRAWER_TOGGLE' (state) {
        state.appDrawer = !state.appDrawer
      },
      'app/RELEASES' (state, payload) {
        state.releases = payload
      },
      'app/LOAD_LANG' (state, payload) {
        state.loadedLangs.push(payload)
      },
      'app/FULLSCREEN' (state, payload) {
        state.isFullscreen = payload
        state.stateless = payload
        state.appDrawer = !payload && null
        state.appToolbar = !payload
      },
      'app/SNACKBAR': (state, payload) => {
        state.appSnackbar = payload
      }
    },

    getters: {}
  })
}
