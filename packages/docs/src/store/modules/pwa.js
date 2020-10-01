// Utilities
import { make } from 'vuex-pathify'

// Globals
import { IN_BROWSER } from '@/util/globals'

const state = {
  snackbar: false,
  sw: {
    install: null,
    update: null,
  },
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: ({ commit }) => {
    if (!IN_BROWSER) return

    window.addEventListener('beforeinstallprompt', e => {
      // Intercept default PWA install prompt
      e.preventDefault()

      commit('sw', { ...state.sw, install: e })
    })

    document.addEventListener('swupdatefound', e => {
      commit('sw', { ...state.sw, update: e.detail })
    })
  },
  install: async ({ commit, state }) => {
    const response = await state.sw.install.prompt()
    const accepted = response.userChoice.outcome === 'accepted'

    if (accepted) console.log(`[sw:vuetify] Installing Vuetify Documentation App...`)

    commit('snackbar', false)
  },
  update: async ({ commit, state }) => {
    console.log(`[sw:vuetify] Updating documentation content...`)

    state.sw.update.waiting.postMessage('sw:update')

    commit('snackbar', false)
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
