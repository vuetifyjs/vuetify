const Vue = require('vue')
const Vuetify = require('vuetify').default
const fs = require('fs')
const map = require('./map')
const deepmerge = require('deepmerge')

function arrayMerge (a, b) {
  const arr = a.slice()
  for (let i = 0; i < b.length; i++) {
    const found = a.findIndex(item => item.name == b[i].name)
    if (found >= 0) {
      arr[found] = deepmerge(a[found], b[i])
    } else {
      arr.push(b[i])
    }
  }
  return arr
}

Vue.use(Vuetify)

function uppercase (str) {
  return str.substr(0, 1) + str.slice(1)
}

function parseFunctionParams (func) {
  const groups = /function\s_.*\((.*)\)\s\{.*/i.exec(func)
  if (groups && groups.length > 1) return `(${groups[1]}) => {}`
  else return 'null'
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
  if (type.match(/Function/)) return 'Function'

  return 'Any'
}

function getPropDefault (def, type) {
  if (def === '' ||
    (def == null && type !== 'Boolean' && type !== 'Function')
  ) {
    return 'undefined'
  } else if (typeof(def) === 'function' && type !== 'Function') {
    def = def()
  }

  switch (type) {
    case 'Boolean':
    if (def) return 'true'
    else return 'false'
    case 'Function': return parseFunctionParams(def)
    case 'Array':
    case 'Number':
    case 'String':
    case 'Object': return def
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

  return array.sort((a, b) => a.name > b.name)
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

  return mixins.sort((a, b) => a > b)
}

const components = {}

const installedComponents = Vue.options._base.options.components

Object.keys(installedComponents).forEach(key => {
  const name = key
  if (name.match(/v-/)) {
    const component = installedComponents[key]
    let options = parseComponent(component.options)

    if (map[name]) {
      options = deepmerge(options, map[name], { arrayMerge })
    }

    components[name] = options
  }
})

function writeApiFile (obj, file) {
  const stream = fs.createWriteStream(file)

  const comment = `/*
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED USING THE VUETIFY-HELPER-JSON TOOL.
 *
 * CHANGES MADE TO THIS FILE WILL BE LOST!
 */

`

  stream.once('open', () => {
    stream.write(comment)
    stream.write('module.exports = ')
    stream.write(JSON.stringify(obj, null, 2))
    stream.end()
  })
}

function writeJsonFile (obj, file) {
  const stream = fs.createWriteStream(file)

  stream.once('open', () => {
    stream.write(JSON.stringify(obj, null, 2))
    stream.end()
  })
}


const tags = Object.keys(components).reduce((t, k) => {
  t[k] = {
    attributes: components[k].props.map(p => p.name.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)),
    description: ''
  }

  return t
}, {})


const attributes = Object.keys(components).reduce((attrs, k) => {
  const tmp = components[k].props.reduce((a, prop) => {
    let type = prop.type
    if (Array.isArray(type)) type = type.map(t => t.toLowerCase()).join('|')
    else type = type.toLowerCase()

    const name = prop.name.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)

    a[`${k}/${name}`] = {
      type,
      description: ''
    }

    return a
  }, {})

  return Object.assign(attrs, tmp)
}, {})

writeJsonFile(tags, 'dist/tags.json')
writeJsonFile(attributes, 'dist/attributes.json')

components['$vuetify'] = map['$vuetify']
writeApiFile(components, 'dist/api.js')
