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

async function loadApi (locale) {
  return import(
    /* webpackChunkName: "api-items" */
    `@docs/${locale}/api/pages`
  )
}

const state = {
  frontmatter: {},
  tocs: {},
  pages: {},
}

const mutations = make.mutations(state)

const actions = {
  switch: async ({ commit }, { locale }) => {
    await loadLocale(locale)
    commit('tocs', (await loadHeadings(locale)).default)

    const pages = {
      ...(await loadPages(locale)).default,
      ...(await loadApi(locale)).default,
    }

    commit('pages', pages)
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
