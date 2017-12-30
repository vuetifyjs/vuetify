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

function getPropSource (name, mixins) {
  let source = null
  for (let i = 0; i < mixins.length; i++) {
    const mixin = mixins[i]
    if (mixin.name) {
      const source = Object.keys(mixin.props || {}).find(p => p === name) && mixin.name
      let found = getPropSource(name, mixin.mixins || []) || source
      if (found) return found
    }
  }

  return source
}

function genProp (name, props, mixins) {
  const prop = props[name]
  const type = getPropType(prop.type)
  const source = getPropSource(name, mixins)

  return {
    name,
    type,
    default: getPropDefault(prop.default, type),
    source
  }
}

function parseComponent (component) {
  return {
    props: parseProps(component),
    mixins: parseMixins(component)
  }
}

function parseProps (component, array = [], mixin = false) {
  const mixins = component.mixins || []
  const props = component.props || {}
  
  Object.keys(props).forEach(prop => {
    let generated = genProp(prop, props, mixins)
    array.push(generated)
  })
  
  return array
}

function parseMixins (component) {
  if (!component.mixins) return []

  let mixins = []
  for (let i = 0; i < component.mixins.length; i++) {
    const mixin = component.mixins[i]
    
    if (mixin.name) {
      mixins.push(mixin.name)

      if (mixin.mixins) {
        mixins = mixins.concat(parseMixins(mixin))
      }
    }
  }
  
  return mixins
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
