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
        'variable-api',
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

function getNamespace (namespace) {
  switch (namespace) {
    case 'introduction': return 'introduction/why-vuetify'
    case 'getting-started': return 'getting-started/quick-start'
    case 'styles': return 'styles/colors'
    case 'components': return 'components/api-explorer'
    case 'directives': return 'components/api-explorer'
    case 'professional-support': return 'professional-support/consulting'
    default: return ''
  }
}

function addFooterAd (children = []) {
  if (!children.length) return

  const index = children.length - 1
  const childChildren = children[index].children || []

  childChildren.push({ type: 'ad-exit' })
  children[index].children = childChildren
}

const state = {
  deprecatedIn: require('@/data/deprecated.json'),
  links: require('@/data/drawerItems.json'),
  namespace: null,
  newIn: require('@/data/new.json'),
  page: null,
  structure: null,
  templates: require('@/data/templates.json'),
  toc: [],
}

const mutations = make.mutations(state)

const actions = {}

const getters = {
  breadcrumbs (state, getters, rootState) {
    if (!rootState.route) return []

    const namespace = rootState.route.params.namespace

    if (!namespace) return []

    const lang = rootState.route.params.lang
    const path = rootState.route.path
    const text = getNamespace(namespace)

    return [
      {
        text: upperFirst(namespace.split('-').join(' ')),
        to: text ? `/${lang}/${text}` : undefined,
        disabled: !text,
      },
      {
        text: upperFirst(rootState.route.params.page.split('-').join(' ')),
        to: path,
        disabled: true,
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
