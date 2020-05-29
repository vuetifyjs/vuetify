// Pathify
import { make } from 'vuex-pathify'

// Plugins
import { i18n } from '@/plugins/i18n'

// Utilities
import { kebabCase } from 'lodash'
import { ROOT_DISPATCH } from '@/store'

// Data
import nav from '@/data/nav'

const state = {}

const mutations = make.mutations(state)

const actions = {
  init: ({ dispatch, rootState }) => {
    const { locale } = rootState.route.params

    dispatch('ads/fetch', null, ROOT_DISPATCH)
    dispatch('i18n/switch', { locale }, ROOT_DISPATCH)
  },
}

const getters = {
  nav: (_, __, rootState) => {
    const group = `/${rootState.route.params.locale}/`

    return nav.map(item => genItem(item, group, rootState))
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

function genItems (item, ...args) {
  return item.items
    ? item.items.map(i => genItem(i, ...args))
    : findItems(...args)
}

function findItems (group, { i18n }) {
  const pages = []

  for (const key in i18n.pages) {
    if (!key.startsWith(group) || group === key) continue

    pages.push({
      title: i18n.pages[key],
      to: key,
    })
  }

  return pages.length > 0 ? pages : undefined
}

function genItem (item, parent, rootState) {
  const path = kebabCase(item.to || item.title)
  const to = `${parent}${path}/`
  const pages = rootState.i18n.pages
  const title = pages[to] || i18n.t(item.title)

  return {
    href: item.href || undefined,
    icon: item.icon || undefined,
    items: genItems(item, to, rootState),
    title,
    to,
  }
}
