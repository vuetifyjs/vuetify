const { camelCase, capitalize } = require('lodash')

const kebabCase = str => {
  let kebab = ''
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i)
    if (charCode >= 65 && charCode <= 90) {
      kebab += `${i > 0 ? '-' : ''}${str[i].toLowerCase()}`
    } else {
      kebab += str[i]
    }
  }
  return kebab
}

const pascalize = str => str.split('-').map(capitalize).join('')

module.exports = {
  camelCase,
  capitalize,
  kebabCase,
  pascalize,
}
