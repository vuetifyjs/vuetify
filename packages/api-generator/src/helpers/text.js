const { camelCase, capitalize, kebabCase } = require('lodash')

const pascalize = str => str.split('-').map(capitalize).join('')

module.exports = {
  camelCase,
  capitalize,
  kebabCase,
  pascalize,
}
