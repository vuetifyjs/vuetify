// Pathify
import { make } from 'vuex-pathify'

// Language
import { loadLocale } from '@/plugins/i18n'

async function loadHeadings (locale) {
  return import(
    /* webpackChunkName: "headings" */
    `@docs/${locale}/headings`
  )
}

async function loadPages (locale) {
  return import(
    /* webpackChunkName: "nav-items" */
    `@docs/${locale}/pages`
  )
}

const state = {
  tocs: {},
  pages: {},
}

const mutations = make.mutations(state)

const actions = {
  switch: async ({ commit }, { locale }) => {
    await loadLocale(locale)
    commit('tocs', (await loadHeadings(locale)).default)
    commit('pages', (await loadPages(locale)).default)
  },
}

const getters = {
  translating: (state, getters, rootState) => {
    return rootState.route.params.locale === 'eo-UY'
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
