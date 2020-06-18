// Pathify
import { make } from 'vuex-pathify'

const state = {
  canInstall: false,
  installPrompt: null,
  updateAvailable: false,
  updateDetail: null,
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  promptInstaller ({ commit, state }) {
    commit('canInstall', false)
    state.installPrompt.prompt()
    state.installPrompt.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        console.log('Installation Accepted')
      } else {
        console.log('Installation Denied')
      }
      commit('installPrompt', null)
    })
  },
  refreshContent ({ commit, state }) {
    commit('updateAvailable', false)
    if (!state.updateDetail || !state.updateDetail.waiting) return
    state.updateDetail.waiting.postMessage('skipWaiting')
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
