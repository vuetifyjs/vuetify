// Utilities
import { differenceInDays } from 'date-fns'
import { make } from 'vuex-pathify'
import merge from 'lodash/merge'

// Globals
import { IN_BROWSER } from '@/util/globals'

const state = () => {
  let data
  if (IN_BROWSER) {
    data = JSON.parse(localStorage.getItem('vuetify@user')) || {}

    // Reset local store if using old variables
    if (Object(data.last) !== data.last) {
      delete data.last
      delete data.promotion
    }
  }

  return merge({
    drawer: {
      alphabetical: false,
      mini: false,
    },
    last: {
      install: null,
      notification: null,
      promotion: null,
    },
    notifications: [],
    rtl: false,
    theme: {
      dark: false,
      system: false,
      // Provides a 3rd state for the
      // light theme w/ dark fences
      mixed: false,
    },
  }, data)
}

const mutations = make.mutations(state)

const actions = {
  fetch ({ commit }) {
    if (!IN_BROWSER) return

    const data = state()

    for (const key in data) {
      commit(key, data[key])
    }
  },
  update ({ state }) {
    if (!IN_BROWSER) return

    localStorage.setItem('vuetify@user', JSON.stringify(state))
  },
}

const getters = {
  hasRecentlyViewed: state => {
    const notification = state.last.notification

    return notification
      ? differenceInDays(Date.now(), Number(notification)) < 1
      : false
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
