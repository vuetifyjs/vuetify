/* eslint-disable camelcase */

// Imports
import Cosmic from 'cosmicjs'

// Pathify
import { make } from 'vuex-pathify'

const api = Cosmic()
const read_key = process.env.VUE_APP_COSMIC_BUCKET_READ_KEY_STORE
const slug = process.env.VUE_APP_COSMIC_BUCKET_SLUG_STORE
const bucket = api.bucket({ slug, read_key })

const state = {
  all: [],
}

const mutations = make.mutations(state)

const actions = {
  fetch: async ({ commit }) => {
    if (!(slug && read_key)) return

    const { objects } = await bucket.getObjects({
      limit: 1,
      props: 'slug,title,metadata',
      sort: '-created_at',
    })

    const products = objects && objects.length ? JSON.parse(objects[0].metadata.products) : []

    commit('all', products)

    return products
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
