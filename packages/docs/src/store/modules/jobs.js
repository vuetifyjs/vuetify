// Pathify
import { make } from 'vuex-pathify'

// Globals
import { IN_BROWSER } from '@/util/globals'

// Imports
import bucket from '@/plugins/cosmicjs'
import { differenceInWeeks } from 'date-fns'

// Data
const state = {
  all: [],
}

const mutations = make.mutations(state)

const actions = {
  fetch: async ({ commit }) => {
    if (!IN_BROWSER) return

    let vuetifyJobs = []
    const jobs = await fetch('https://vuejobs.com/api/jobs', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())

    if (bucket.available) {
      const { objects } = await bucket.getObjects({
        type: 'jobs',
        props: 'metadata,slug,title,published_at,_id',
        status: 'published',
      })

      console.log(objects)
      vuetifyJobs = objects.map(job => {
        const { metadata } = job
        const date = new Date(job.published_at)
        const isNew = differenceInWeeks(date, new Date()) < 2
        const location = `${metadata.city}, ${metadata.country}`
        const types = metadata.job_type.split(',')
        return {
          avatar: metadata.company_image.url,
          date,
          description: metadata.job_description,
          id: job._id,
          isNew,
          location,
          name: metadata.company_title,
          title: metadata.job_title,
          type: types[0],
          url: 'https://vuetifyjs.com',
          via: 'Vuetfiy',
        }
      })
    }

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

    commit('all', [...all, ...vuetifyJobs])
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
