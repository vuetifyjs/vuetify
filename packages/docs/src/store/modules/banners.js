// Imports
import bucket from '@/plugins/cosmicjs'

// Pathify
import { make } from 'vuex-pathify'

const state = {
  banner: null,
}

const mutations = make.mutations(state)

const actions = {
  fetch: async ({ commit }) => {
    if (!bucket.available) return

    const { objects } = await bucket.getObjects({
      type: 'banners',
      start_date: {
        $lte: '2022-09-12',
      },
      limit: 1,
      props: 'metadata,slug,title',
      status: 'published',
      sort: '-created_at',
    })

    commit('banner', objects[0] || null)
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
