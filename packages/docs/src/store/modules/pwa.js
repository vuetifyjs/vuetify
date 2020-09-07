// Utilities
import { differenceInDays } from 'date-fns'
import { make } from 'vuex-pathify'
import { wait } from '@/util/helpers'

const state = {
  installEvent: false,
  snackbar: false,
  updateEvent: false,
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: ({ commit, state, rootState }) => {
    const last = rootState.user.last.pwa

    if (
      !last ||
      differenceInDays(Date.now(), Number(last)) >= 30
    ) {
      window.addEventListener('beforeinstallprompt', e => {
        // Intercept default PWA install prompt
        e.preventDefault()

        // If updating, skip install
        if (state.updateEvent) return

        commit('installEvent', e)
        commit('snackbar', true)
      })
    }

    document.addEventListener('swUpdated', e => {
      commit('updateEvent', e.detail)
      commit('snackbar', true)
    })
  },
  install: async ({ commit, state, rootState }) => {
    const last = rootState.user.last.pwa

    if (
      !last ||
      differenceInDays(Date.now(), Number(last)) < 30
    ) {
      return
    }

    const { installEvent } = state || {}

    if (!installEvent) return

    await installEvent.prompt().userChoice

    commit('snackbar', false)
    // Wait for snackbar to hide
    await wait(500)
    commit('installEvent', false)
  },
  update: async ({ commit, state }) => {
    const { waiting } = state.updateEvent || {}

    if (!waiting) return

    waiting.postMessage('skipWaiting')

    commit('snackbar', false)

    // Wait for snackbar to hide
    await wait(500)

    commit('updateEvent', false)
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
