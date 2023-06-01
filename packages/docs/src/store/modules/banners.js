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

    try {
      const today = (new Date()).toISOString().substring(0, 10)
      const { objects } = await bucket.objects.find({
        type: 'banners',
        'metadata.start_date': {
          $lte: today,
        },
        'metadata.end_date': {
          $gte: today,
        },
      })
        .props('metadata,slug,title')
        .sort('metadata.start_date')
        .status('published')
        .limit(1)

      commit('banner', objects[0] || null)
    } catch (err) {
      console.log(err)
    }
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
