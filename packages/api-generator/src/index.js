const Vue = require('vue')
const Vuetify = require('vuetify').default
const fs = require('fs')

Vue.use(Vuetify)

function getPropType (type) {
  type = (type || '').toString()
  if (type.match(/String/)) return 'String'
  if (type.match(/Boolean/)) return 'Boolean'
  if (type.match(/Array/)) return 'Array'
  if (type.match(/Object/)) return 'Object'

  return 'undefined'
}

function getPropDefault (string) {
  return string || 'undefined'
}

function genComponent (name, prop) {
  return {
    name,
    type: getPropType(prop.type),
    default: getPropDefault(prop.default)
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

const components = {}

const installedComponents = Vue.options._base.options.components

Object.keys(installedComponents).slice(8, 9).forEach(key => {
  const name = key
  if (name.match(/v-/)) {
    const component = installedComponents[key]
    console.log(component)
    components[name] = parseComponent(component.options)
  }
})

const stream = fs.createWriteStream('dist/api.js')

stream.once('open', () => {
  stream.write('module.exports = ')
  stream.write(JSON.stringify(components))
  stream.end()
})
