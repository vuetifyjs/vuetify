const { createApp } = require('vue')
const { createVuetify } = require('vuetify')
const { components: excludes } = require('./helpers/excludes')
const { sortBy } = require('lodash')
const { camelCase, kebabCase } = require('./helpers/text')
const { getPropType, parseSassVariables } = require('./helpers/parsing')
const deepmerge = require('./helpers/merge')

const app = createApp()
const vuetify = createVuetify()

app.use(vuetify)

const loadLocale = (componentName, locale, fallback = {}) => {
  try {
    const data = require(`./locale/${locale}/${componentName}`)
    return Object.assign(fallback, data)
  } catch (err) {
    return fallback
  }
}

const loadMap = (componentName, group, fallback = {}) => {
  try {
    const data = require(`./maps/${group}/${componentName}`)
    const map = data[componentName] ? data[componentName] : data
    return Object.assign(fallback, { ...map })
  } catch (err) {
    return fallback
  }
}

const getSources = api => {
  return ['props', 'events', 'slots'].reduce((arr, category) => {
    for (const item of api[category]) {
      if (!arr.includes(item.source)) arr.push(item.source)
    }
    return arr
  }, [])
}

const addComponentApiDescriptions = (componentName, api, locales) => {
  for (const localeName of locales) {
    const sources = [
      loadLocale(componentName, localeName),
      ...getSources(api).map(source => loadLocale(source, localeName)),
      loadLocale('generic', localeName),
    ]

    for (const category of ['props', 'events', 'slots', 'functions', 'sass']) {
      for (const item of api[category]) {
        const name = category === 'props' ? camelCase(item.name) : item.name
        let description = ''
        if (category === 'sass') {
          description = (sources[0] && sources[0][category] && sources[0][category][name]) || ''
        } else {
          description = sources.reduce((str, source) => {
            if (str) return str
            return source[category] && source[category][name]
          }, null)
        }

        if (!item.description) item.description = {}

        item.description[localeName] = description || ''
      }
    }
  }

  return api
}

const addDirectiveApiDescriptions = (directiveName, api, locales) => {
  if (api.argument.length) {
    for (const localeName of locales) {
      const source = loadLocale(directiveName, localeName)
      if (!api.argument[0].description) api.argument[0].description = {}

      api.argument[0].description[localeName] = source.argument || ''
    }
  }

  if (api.modifiers) {
    api = addGenericApiDescriptions(directiveName, api, locales, ['modifiers'])
  }

  return api
}

const addGenericApiDescriptions = (name, api, locales, categories) => {
  for (const localeName of locales) {
    const source = loadLocale(name, localeName)
    for (const category of categories) {
      for (const item of api[category]) {
        if (!item.description) item.description = {}

        item.description[localeName] = source[category] ? source[category][item.name] : ''
      }
    }
  }

  return api
}

const getComponentApi = (componentName, locales) => {
  // if (!component) throw new Error(`Could not find component: ${componentName}`)
  const kebabName = kebabCase(componentName)
  const componentMap = loadMap(kebabName, 'components', { props: [], slots: [], events: [], functions: [] })

  const component = app._context.components[componentName]
  const props = Object.keys(component.props).reduce((arr, key) => {
    const prop = component.props[key]

    const type = getPropType(prop.type)

    return [...arr, {
      name: kebabCase(key),
      source: prop.source || kebabName,
      default: prop.default(),
      type,
    }]
  }, [])

  const sassVariables = parseSassVariables(componentName)

  const api = deepmerge(componentMap, { name: kebabName, props, sass: sassVariables, component: true })

  // Make sure things are sorted
  const categories = ['props', 'slots', 'events', 'functions']
  for (const category of categories) {
    componentMap[category] = sortBy(componentMap[category], 'name')
  }

  return addComponentApiDescriptions(componentName, api, locales)
}

const getDirectiveApi = (directiveName, locales) => {
  // if (!directive) throw new Error(`Could not find directive: ${directiveName}`)

  const api = deepmerge(loadMap(directiveName, 'directives'), { name: directiveName, directive: true })

  return addDirectiveApiDescriptions(directiveName, api, locales)
}

/*
const getVuetifyApi = locales => {
  const name = '$vuetify'
  const sass = parseGlobalSassVariables()
  const api = deepmerge(loadMap(name), { name, sass })

  return addGenericApiDescriptions(name, api, locales, ['functions', 'sass'])
}

const getInternationalizationApi = locales => {
  const name = 'internationalization'
  const api = deepmerge(loadMap(name), { name })

  return addGenericApiDescriptions(name, api, locales, ['functions', 'props'])
}

const DIRECTIVES = ['v-mutate', 'v-intersect', 'v-ripple', 'v-resize', 'v-scroll', 'v-touch', 'v-click-outside']
*/

const DIRECTIVES = ['v-intersect', 'v-ripple', 'v-resize', 'v-scroll', 'v-touch']

const getApi = (name, locales) => {
  // if (name === '$vuetify') return getVuetifyApi(locales)
  // if (name === 'internationalization') return getInternationalizationApi(locales)
  if (DIRECTIVES.includes(name)) return getDirectiveApi(name, locales)
  else return getComponentApi(name, locales)
}

const getComponentsApi = locales => {
  const components = []
  const componentList = Object.keys(app._context.components)
    .filter(name => !excludes.includes(name))
    .filter(name => !name.endsWith('Transition')) // TODO: Filter out transitions for now

  for (const componentName of componentList) {
    components.push(getComponentApi(componentName, locales))
  }

  return components
}

const getDirectivesApi = locales => {
  const directives = []

  for (const directiveName of DIRECTIVES) {
    directives.push(getDirectiveApi(directiveName, locales))
  }

  return directives
}

const getCompleteApi = locales => {
  return [
    // getVuetifyApi(locales),
    // getInternationalizationApi(locales),
    ...getComponentsApi(locales),
    ...getDirectivesApi(locales),
  ].sort((a, b) => a.name.localeCompare(b.name))
}

const getHeaderLocale = locale => {
  const { headers } = loadLocale('generic', locale)
  return headers || {}
}

module.exports = {
  getApi,
  getCompleteApi,
  getComponentsApi,
  getDirectivesApi,
  getHeaderLocale,
}
