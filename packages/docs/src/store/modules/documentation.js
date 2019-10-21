// Utilities
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import { make } from 'vuex-pathify'

function addHeadingAndAd (children) {
  children.splice(0, 0, {
    type: 'section',
    children: [
      { type: 'heading', lang: 'heading' },
      { type: 'base-text', lang: 'headingText' },
      { type: 'ad-entry' },
    ],
  })
}

function getHeadings (children, toc = []) {
  for (const child of children) {
    if (child.children) {
      getHeadings(child.children, toc)

      continue
    }

    if (
      ![
        'accessibility',
        'api',
        'examples',
        'heading',
        'up-next',
        'usage-new',
      ].includes(child.type)
    ) continue

    if (child.type === 'heading') {
      toc.push(child.lang)
    } else {
      toc.push(`Generic.Pages.${camelCase(child.type)}`)
    }
  }

  return toc
}

function addFooterAd (children) {
  if (!children.length) return

  children[children.length - 1].children.push({ type: 'ad-exit' })
}

const state = {
  deprecatedIn: require('@/data/deprecated.json'),
  links: require('@/data/drawerItems.json'),
  newIn: require('@/data/new.json'),
  namespace: null,
  page: null,
  structure: null,
  toc: [],
  templates: require('@/data/templates.json'),
}

const mutations = make.mutations(state)
const actions = {}
const getters = {
  breadcrumbs (state, getters, rootState) {
    if (!rootState.route) return []

    return [
      {
        text: upperFirst(rootState.route.params.namespace.split('-').join(' ')),
        disabled: true,
      },
      {
        text: upperFirst(rootState.route.params.page.split('-').join(' ')),
        href: '#',
      },
    ]
  },
  headings (state, getters) {
    return getHeadings(getters.structure)
  },
  namespace (state, getters, rootState) {
    return !rootState.route
      ? undefined
      : upperFirst(camelCase(rootState.route.params.namespace))
  },
  page (state, getters, rootState) {
    return !rootState.route
      ? undefined
      : upperFirst(camelCase(rootState.route.params.page))
  },
  structure (state, getters, rootState) {
    const children = JSON.parse(JSON.stringify((state.structure || {}).children || []))

    if (!children.length) return children

    addHeadingAndAd(children)
    addFooterAd(children)

    return children
  },
  themes (state) {
    return Object.values(state.templates)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
