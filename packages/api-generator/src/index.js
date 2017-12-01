const Vue = require('vue')
const Vuetify = require('vuetify').default
const fs = require('fs')
const map = require('./map')

Vue.use(Vuetify)

function uppercase (str) {
  return str.substr(0, 1) + str.slice(1)
}

function getPropType (type) {
  if (Array.isArray(type)) {
    return type.map(t => getPropType(t))
  }

  type = (type || '').toString()

  if (type.match(/Array/)) return 'Array'
  if (type.match(/Boolean/)) return 'Boolean'
  if (type.match(/Number/)) return 'Number'
  if (type.match(/Object/)) return 'Object'
  if (type.match(/String/)) return 'String'

  return 'Any'
}

function getPropDefault (def, type) {
  if (def === '' ||
    (def == null && type !== 'Boolean')
  ) {
    return 'undefined'
  }

  switch (type) {
    case 'Array':
      return def
    break
    case 'Boolean':
      if (def) return 'True'
      else return 'False'
    break
    case 'Number':
      return def
    break
    case 'String':
      return def
    break
    case 'Object':
      return def
    break
    default: return def
  }
}

function genComponent (name, prop) {
  const type = getPropType(prop.type)

  return {
    name,
    type,
    default: getPropDefault(prop.default, type)
  }
}

function parseComponent (component) {
  return {
    props: parseProps(component)
  }
}

function parseProps (component, array = []) {
  const mixins = component.mixins || []
  const props = component.props || {}
  
  Object.keys(props).forEach(prop => {
    array.push(genComponent(prop, props[prop]))
  })
  
  mixins.forEach(mixin => {
    array = array.concat(parseMixin(mixin, array))
  })

  const exists = []

  return array.filter(item => {
    if (!exists.includes(item.name)) {
      exists.push(item.name)

      return true
    }

    return false
  })
}

function parseMixin (mixin, array) {
  return parseProps(mixin)
}

function mapComponent (component, mapping) {
  return Object.assign(component, mapping)
} 

const components = {}

const installedComponents = Vue.options._base.options.components

Object.keys(installedComponents).forEach(key => {
  const name = key
  if (name.match(/v-/)) {
    const component = installedComponents[key]
    const options = parseComponent(component.options)

    if (map[name]) {
      mapComponent(options, map[name])
      console.log(options)
    }

    components[name] = options
  }
})

const stream = fs.createWriteStream('dist/api.js')

stream.once('open', () => {
  stream.write('module.exports = ')
  stream.write(JSON.stringify(components, null, 2))
  stream.end()
})
