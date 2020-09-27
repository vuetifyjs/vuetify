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
        via: 'VueJobs',
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
