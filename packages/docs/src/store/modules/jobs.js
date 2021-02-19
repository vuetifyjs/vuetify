// Pathify
import { make } from 'vuex-pathify'

// Globals
import { IN_BROWSER } from '@/util/globals'

// Imports
import bucket from '@/plugins/cosmicjs'
import { differenceInWeeks, formatDistanceToNow, formatISO } from 'date-fns'

function parseVueJob (job) {
  const {
    company,
    published_at = { date: '', for_humans: '' },
    ...values
  } = job

  return {
    ...values,
    ...company,
    isHighlighted: false,
    isNew: differenceInWeeks(new Date(published_at.date), new Date()) < 2,
    via: 'VueJobs',
  }
}

function parseVuetifyJob (job) {
  const { metadata } = job
  const date = new Date(job.published_at)
  const isNew = differenceInWeeks(date, new Date()) < 2
  const location = `${metadata.city}, ${metadata.country}`
  const types = metadata.job_type.split(',')

  return {
    avatar: metadata.company_image.url,
    description: metadata.job_description,
    id: job._id,
    name: metadata.company_title,
    isNew,
    isHighlighted: true,
    location,
    published_at: {
      date: job.published_at.slice(0, 10),
      for_humans: formatDistanceToNow(date),
    },
    title: metadata.job_title,
    type: types[0],
    url: 'https://vuetifyjs.com',
    via: 'Vuetify',
  }
}

// Data
const state = {
  all: [],
}

const mutations = make.mutations(state)

const actions = {
  fetch: async ({ commit }) => {
    if (!IN_BROWSER) return

    const all = []

    if (bucket.available) {
      const { objects: vuetifyjobs } = await bucket.getObjects({
        type: 'jobs',
        props: 'metadata,slug,title,published_at,_id',
        status: 'published',
      })

      vuetifyjobs.forEach(job => all.push(parseVuetifyJob(job)))
    }

    const vuejobs = await fetch('https://vuejobs.com/api/jobs', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())

    vuejobs.forEach(job => all.push(parseVueJob(job)))

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
