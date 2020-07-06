// Utilities
import { differenceInDays } from 'date-fns'
import { make } from 'vuex-pathify'

// Globals
import { IN_BROWSER } from '@/util/globals'

const state = {
  dark: false,
  drawer: {
    advanced: false,
    mini: false,
  },
  // Provides a 3rd state for the
  // light theme w/ dark fences
  mixed: false,
  notifications: [],
  rtl: false,
  snackbar: Date.now(),
}

const mutations = make.mutations(state)

const actions = {
  fetch: ({ commit }) => {
    const local = localStorage.getItem('vuetify@user') || '{}'
    const user = JSON.parse(local)

    for (const key in user) {
      commit(key, user[key])
    }

    if (user.dark === undefined) {
      commit('dark', window.matchMedia('(prefers-color-scheme: dark)'))
    }
  },
  update: ({ state }) => {
    if (!IN_BROWSER) return

    localStorage.setItem('vuetify@user', JSON.stringify(state))
  },
}

const getters = {
  hasRecentlyViewed: (_, __, rootState) => {
    const last = rootState.user.snackbar

    if (!last) return false

    return differenceInDays(Date.now(), Number(last)) < 2
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
