const camelizeRE = /-(\w)/g
const camelize = str => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
}

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const hyphenateRE = /\B([A-Z])/g
const hyphenate = str => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
}

const pascalize = str => str.split('-').map(capitalize).join('')

module.exports = {
  camelize,
  capitalize,
  hyphenate,
  pascalize,
}
