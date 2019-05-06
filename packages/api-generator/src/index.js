const Vue = require('vue')
const Vuetify = require('vuetify')
const fs = require('fs')
const map = require('./map')
const deepmerge = require('deepmerge')

const hyphenateRE = /\B([A-Z])/g
function hyphenate (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
}

function arrayMerge (a, b) {
  const arr = a.slice()
  for (let i = 0; i < b.length; i++) {
    const found = a.findIndex(item => item.name === b[i].name)
    if (found >= 0) {
      arr[found] = deepmerge(a[found], b[i])
    } else {
      arr.push(b[i])
    }
  }
  return arr
}

Vue.use(Vuetify)

function parseFunctionParams (func) {
  const groups = /function\s_.*\((.*)\)\s\{.*/i.exec(func)
  if (groups && groups.length > 1) return `(${groups[1]}) => {}`
  else return 'null'
}

function getPropType (type) {
  if (Array.isArray(type)) {
    return type.map(t => getPropType(t))
  }

  if (!type) return 'any'

  return type.name.toLowerCase()
}

function getPropDefault (def, type) {
  if (def === '' ||
    (def == null && type !== 'boolean' && type !== 'function')
  ) {
    return 'undefined'
  } else if (typeof (def) === 'function' && type !== 'function') {
    def = def.call({})
  }

  if (type === 'boolean') {
    return def ? 'true' : 'false'
  }

  if (type === 'string') {
    return def ? `'${def}'` : def
  }

  if (type === 'function') {
    return parseFunctionParams(def)
  }

  return def
}

function getPropSource (name, mixins) {
  const source = null
  for (let i = 0; i < mixins.length; i++) {
    let mixin = mixins[i]
    if (mixin.name !== 'VueComponent') mixin = Vue.extend(mixin)

    if (mixin.options.name) {
      const source = Object.keys(mixin.options.props || {}).find(p => p === name) && mixin.options.name
      const found = getPropSource(name, [mixin.super].concat(mixin.options.extends).concat(mixin.options.mixins).filter(m => !!m)) || source
      if (found) return hyphenate(found)
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
  const options = component.options
  const mixins = [component.super].concat(options.extends).concat(options.mixins).filter(m => !!m)
  const props = options.props || {}

  Object.keys(props).forEach(prop => {
    const generated = genProp(prop, props, mixins)
    array.push(generated)
  })

  return array.sort((a, b) => a.name > b.name)
}

function parseMixins (component) {
  if (!component.options.mixins) return []

  let mixins = []
  for (let i = 0; i < component.options.mixins.length; i++) {
    let mixin = component.options.mixins[i]

    if (mixin.name !== 'VueComponent') mixin = Vue.extend(mixin)

    if (mixin.options.name) {
      mixins.push(mixin.options.name)

      if (mixin.options.mixins) {
        mixins = mixins.concat(parseMixins(mixin))
      }
    }
  }

  return mixins.sort((a, b) => a > b)
}

const components = {}
const directives = {}

const installedComponents = Vue.options._base.options.components
const installedDirectives = Vue.options._base.options.directives

const componentNameRegex = /^(?:V[A-Z]|v-[a-z])/
for (const name in installedComponents) {
  if (!componentNameRegex.test(name)) continue

  let component = installedComponents[name]

  if (component.options.$_wrapperFor) {
    component = component.options.$_wrapperFor
  }

  const kebabName = hyphenate(name)
  let options = parseComponent(component)

  if (map[kebabName]) {
    options = deepmerge(options, map[kebabName], { arrayMerge })
  }

  components[kebabName] = options
}

for (const key of ['Ripple', 'Resize', 'Scroll', 'Touch']) {
  if (!installedDirectives[key]) continue

  const lowerCaseVersion = key.toLowerCase()
  const vKey = `v-${lowerCaseVersion}`
  const directive = map[vKey]
  directive.type = getPropDefault(directive.default, directive.type)
  directives[vKey] = directive
}

function writeApiFile (obj, file) {
  const stream = fs.createWriteStream(file)

  const comment = `/*
  * THIS FILE HAS BEEN AUTOMATICALLY GENERATED USING THE API-GENERATOR TOOL.
  *
  * CHANGES MADE TO THIS FILE WILL BE LOST!
  */

`

  stream.once('open', () => {
    stream.write(comment)
    stream.write('module.exports = ')
    stream.write(JSON.stringify(obj, null, 2).replace(/'/g, '').replace(/"/g, '\''))
    stream.write('\n')
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

function writePlainFile (content, file) {
  const stream = fs.createWriteStream(file)

  stream.once('open', () => {
    stream.write(content)
    stream.end()
  })
}

const tags = Object.keys(components).reduce((t, k) => {
  t[k] = {
    attributes: components[k].props.map(p => p.name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)).sort(),
    description: ''
  }

  return t
}, {})

const attributes = Object.keys(components).reduce((attrs, k) => {
  const tmp = components[k].props.reduce((a, prop) => {
    let type = prop.type

    if (!type) type = ''
    else if (Array.isArray(type)) type = type.map(t => t.toLowerCase()).join('|')
    else type = type.toLowerCase()

    const name = prop.name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)

    a[`${k}/${name}`] = {
      type,
      description: ''
    }

    return a
  }, {})

  return Object.assign(attrs, tmp)
}, {})

const fakeComponents = ts => {
  const imports = [
    `import Vue from 'vue'`
  ]
  if (ts) imports.push(`import { PropValidator } from 'vue/types/options'`)
  const inspection = ts ? '' : `// noinspection JSUnresolvedFunction\n`

  return `${imports.join('\n')}\n\n` + Object.keys(components).map(component => {
    const propType = type => {
      if (type === 'any' || typeof type === 'undefined') return ts ? 'null as any as PropValidator<any>' : 'null'
      if (Array.isArray(type)) return `[${type.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(',')}]`
      return type.charAt(0).toUpperCase() + type.slice(1)
    }
    const quoteProp = name => name.match(/-/) ? `'${name}'` : name
    const componentProps = components[component].props
    componentProps.sort((a, b) => {
      if (a.name < b.name) return -1
      return a.name === b.name ? 0 : 1
    })
    let props = componentProps.map(prop => `    ${quoteProp(prop.name)}: ${propType(prop.type)}`).join(',\n')
    if (props) props = `\n  props: {\n${props}\n  }\n`
    return `${inspection}Vue.component('${component}', {${props}})`
  }).join('\n')
}

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', 0o755)
}

writeJsonFile(tags, 'dist/tags.json')
writeJsonFile(attributes, 'dist/attributes.json')
writePlainFile(fakeComponents(false), 'dist/fakeComponents.js')
writePlainFile(fakeComponents(true), 'dist/fakeComponents.ts')

components['$vuetify'] = map['$vuetify']
components['internationalization'] = map['internationalization']

writeApiFile({ ...components, ...directives }, 'dist/api.js')
