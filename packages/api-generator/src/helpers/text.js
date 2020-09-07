const { capitalize, kebabCase } = require('lodash')

const pascalize = str => str.split('-').map(capitalize).join('')

module.exports = {
  capitalize,
  kebabCase,
  pascalize,
}
