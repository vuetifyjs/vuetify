import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      appDrawer: null,
      appFooter: true,
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
      }
    },

    getters: {}
  })
}
