// Pathify
import { make } from 'vuex-pathify'

// Globals
import { IN_BROWSER } from '@/util/globals'

// Data
const state = {
  all: [],
}

const mutations = make.mutations(state)

const actions = {
  fetch: async ({ commit }) => {
    if (!IN_BROWSER) return

    const jobs = await fetch('https://app.vuejobs.com/feed/vuetify?format=json', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())

    const all = jobs.data.map(job => {
      return {
        ...job,
        isNew: false,
        via: 'vue-jobs',
      }
    })

    commit('all', all)
  },
}

const getters = {
  newJobs: state => {
    return state.all.filter(job => job.isNew)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
