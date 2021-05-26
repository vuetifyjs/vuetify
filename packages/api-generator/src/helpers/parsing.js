const Vue = require('vue')
const fs = require('fs')
const { props: excludes } = require('./excludes')
const { kebabCase, pascalize } = require('./text')

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
      if (found) return kebabCase(found)
    }
  }

  return source
}

function genProp (name, prop, mixins, cmp) {
  const type = getPropType(prop.type)
  const propSource = getPropSource(name, mixins) || kebabCase(cmp)
  const source = (propSource.slice(-10) === 'transition') ? 'transitions' : propSource

  return {
    name: kebabCase(name),
    type,
    default: getPropDefault(prop.default, type),
    source,
  }
}

function parseProps (component, array = [], mixin = false) {
  const options = component.options
  const name = component.options.name
  const mixins = [component.super].concat(options.extends).concat(options.mixins).filter(m => !!m)
  const props = options.props || {}

  Object.keys(props).forEach(key => {
    if (excludes[name] && excludes[name].includes(key)) return
    const generated = genProp(key, props[key], mixins, name)
    array.push(generated)
  })

  return array.sort((a, b) => a.name.localeCompare(b.name))
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

  return mixins.sort((a, b) => a.localeCompare(b))
}

function processVariableFile (path) {
  if (fs.existsSync(path)) {
    const varFile = fs.readFileSync(path, 'utf8')
    const vars = varFile.split(/;[\n]*/g)
    const varValues = []
    for (const [ind, varString] of vars.entries()) {
      const varArr = varString.split(':')
      if (varArr.length >= 2 && varArr[0].charAt(0) === '$') {
        const varName = varArr.shift().trim()
        let varDefault = (vars[ind + 1].charAt(0) === '@')
          ? vars[ind + 1]
          : varArr.join(':')
        varDefault = `${varDefault.trim()};`
        const lastIndex = varValues.findIndex(item => item.name === varName)
        if (lastIndex > -1) {
          varValues[lastIndex].default = varDefault
        } else {
          varValues.push({
            name: varName,
            default: varDefault,
          })
        }
      }
    }
    return varValues
  }

  return []
}

const parseSassVariables = componentName => {
  const rootDir = './../vuetify/src/components'
  return processVariableFile(`${rootDir}/${pascalize(componentName)}/_variables.scss`)
}

function parseGlobalSassVariables () {
  return [
    './../vuetify/src/styles/settings/_colors.scss',
    './../vuetify/src/styles/settings/_dark.scss',
    './../vuetify/src/styles/settings/_elevations.scss',
    './../vuetify/src/styles/settings/_light.scss',
    './../vuetify/src/styles/settings/_theme.scss',
    './../vuetify/src/styles/settings/_variables.scss',
  ].reduce((acc, path) => {
    acc.push(...processVariableFile(path))
    return acc
  }, []).sort((a, b) => a.name.localeCompare(b.name))
}

function parseComponent (component) {
  return {
    props: parseProps(component),
    mixins: parseMixins(component),
  }
}

module.exports = {
  parseSassVariables,
  parseGlobalSassVariables,
  parseComponent,
}
