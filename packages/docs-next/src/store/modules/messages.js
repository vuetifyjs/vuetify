// Pathify
// Utilities
import bucket from '@/plugins/cosmicjs'
import { make } from 'vuex-pathify'

const state = {
  notifications: [],
}

const mutations = make.mutations(state)

const actions = {
  fetch: async ({ commit }) => {
    const { objects: notifications } = await bucket.getObjects({
      type: 'notifications',
      props: 'created_at,metadata,slug,title',
      status: 'published',
      limit: 10,
      sort: '-created_at',
    })

    commit('notifications', notifications)
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
