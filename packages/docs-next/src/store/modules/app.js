// Pathify
import { make } from 'vuex-pathify'

// Utilities
import { getBranch } from '../../util/helpers'
import { ROOT_DISPATCH } from '@/store'

// Data

const state = {
  branch: getBranch(),
  drawer: true,
  modified: {},
  nav: [],
  pwaCanInstall: false,
  pwaInstallPrompt: null,
  pwaUpdateAvailable: false,
  pwaUpdateDetail: null,
  snackbar: {
    show: false,
    refresh: false,
    dismiss: false,
    message: '',
    timeout: 4000,
  },
  version: null,
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    dispatch('ads/fetch', null, ROOT_DISPATCH)
  },
  showSnackbar ({ state }, data) {
    state.snackbar = Object.assign(state.snackbar, data)
  },
  promptInstaller ({ commit, state }) {
    commit('pwaCanInstall', false)
    state.pwaInstallPrompt.prompt()
    state.pwaInstallPrompt.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        console.log('Installation Accepted')
      } else {
        console.log('Installation Denied')
      }
      commit('pwaInstallPrompt', null)
    })
  },
  refreshContent ({ commit, state }) {
    commit('pwaUpdateAvailable', false)
    if (!state.pwaUpdateDetail || !state.pwaUpdateDetail.waiting) return
    state.pwaUpdateDetail.waiting.postMessage('skipWaiting')
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
