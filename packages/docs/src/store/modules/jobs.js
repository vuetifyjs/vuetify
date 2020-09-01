// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  all: [],
  initializing: false,
}

const mutations = make.mutations(state)

const actions = {
  fetch: async ({ commit, state }) => {
    commit('initializing', true)
    const jobs = await fetch('https://vuejobs.com/api/jobs', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())

    const all = jobs.map(job => {
      const {
        company,
        published_at: publishedAt = { for_humans: '' },
        ...values
      } = job

      return {
        ...values,
        ...company,
        isNew: publishedAt.for_humans.indexOf('day') > -1,
        via: 'vue-jobs',
      }
    })

    commit('all', all)
    commit('initializing', false)
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
