const Vue = require('vue')
const Vuetify = require('vuetify')
const { components: excludes } = require('./helpers/excludes')
const { camelCase, kebabCase, pascalize } = require('./helpers/text')
const { parseComponent, parseSassVariables, parseGlobalSassVariables } = require('./helpers/parsing')
const deepmerge = require('./helpers/merge')

Vue.use(Vuetify)

const loadLocale = (componentName, locale, fallback = {}) => {
  try {
    const data = require(`./locale/${locale}/${componentName}`)
    return Object.assign(fallback, data)
  } catch (err) {
    return fallback
  }
}

const loadMap = (componentName, fallback = {}) => {
  try {
    const { [componentName]: map } = require(`./maps/${componentName}`)

    // Make sure all prop names are kebab-case
    const combined = Object.assign(fallback, {
      ...map,
      props: (map.props || []).map(item => ({
        ...item,
        name: kebabCase(item.name),
      })),
    })

    // Make sure things are sorted
    const categories = ['slots', 'events', 'functions']
    categories.forEach(category => combined[category].sort((a, b) => a.name.localeCompare(b.name)))
    return combined
  } catch {
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
      ...api.mixins.map(mixin => loadLocale(mixin, localeName)),
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
  const pascalName = pascalize(componentName)

  let component = Vue.options._base.options.components[pascalName]

  if (component.options.$_wrapperFor) {
    component = component.options.$_wrapperFor
  }

  if (!component) throw new Error(`Could not find component: ${componentName}`)

  const propsAndMixins = parseComponent(component)
  const slotsEventsAndFunctions = loadMap(componentName, { slots: [], events: [], functions: [] })
  const sassVariables = parseSassVariables(componentName)

  const api = deepmerge(propsAndMixins, slotsEventsAndFunctions, { name: componentName, sass: sassVariables, component: true })
  api.props = api.props.sort((a, b) => a.name.localeCompare(b.name))

  return addComponentApiDescriptions(componentName, api, locales)
}

const getDirectiveApi = (directiveName, locales) => {
  const pascalName = pascalize(directiveName.slice(2))

  const directive = Vue.options._base.options.directives[pascalName]

  if (!directive) throw new Error(`Could not find directive: ${directiveName}`)

  const api = deepmerge(loadMap(directiveName), { name: directiveName, directive: true })

  return addDirectiveApiDescriptions(directiveName, api, locales)
}

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

const getApi = (name, locales) => {
  if (name === '$vuetify') return getVuetifyApi(locales)
  if (name === 'internationalization') return getInternationalizationApi(locales)
  if (DIRECTIVES.includes(name)) return getDirectiveApi(name, locales)
  else return getComponentApi(name, locales)
}

const getComponentsApi = locales => {
  const components = []
  const installedComponents = Vue.options._base.options.components
  const componentNameRegex = /^(?:V[A-Z]|v-[a-z])/

  for (const componentName in installedComponents) {
    if (!componentNameRegex.test(componentName)) continue
    if (excludes.includes(componentName)) continue

    const kebabName = kebabCase(componentName)

    components.push(getComponentApi(kebabName, locales))
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
    getVuetifyApi(locales),
    getInternationalizationApi(locales),
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
