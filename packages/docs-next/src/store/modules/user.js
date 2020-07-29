// Utilities
import { make } from 'vuex-pathify'

// Globals
import { IN_BROWSER } from '@/util/globals'

const state = {
  drawer: {
    alphabetical: false,
    mini: false,
  },
  last: null,
  notifications: [],
  rtl: false,
  theme: {
    dark: false,
    system: false,
    // Provides a 3rd state for the
    // light theme w/ dark fences
    mixed: false,
  },
}

const mutations = make.mutations(state)

const actions = {
  fetch: async ({ commit }) => {
    const local = localStorage.getItem('vuetify@user') || '{}'
    const user = JSON.parse(local)

    for (const key in user) {
      commit(key, user[key])
    }
  },
  update: ({ state }) => {
    if (!IN_BROWSER) return

    localStorage.setItem('vuetify@user', JSON.stringify(state))
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
