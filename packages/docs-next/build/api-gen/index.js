// Imports
const { readFileSync } = require('fs')
const { resolve } = require('path')

// pseudo code to mock api-gen
function generateAPI (comp, locale) {
  const api = {}
  const compMap = require(`./maps/${comp}`)[comp]
  const localePath = resolve(__dirname, `./locale/${locale}/${comp}.json`)
  const compLocale = JSON.parse(readFileSync(localePath, 'utf8'))

  for (const [section, sValue] of Object.entries(compMap)) {
    const items = []

    if (section === 'mixins') {
      api.mixins = sValue

      continue
    }

    for (const item of sValue) {
      const description = compLocale[section][item.name] || ''

      items.push(Object.assign(item, { description }))
    }

    api[section] = items
  }

  return api
}

function generateCompList () {
  return ['v-alert']
}

function generateLocaleList () {
  return ['en', 'eo-UY', 'sv-SE']
}

module.exports = {
  generateAPI,
  generateCompList,
  generateLocaleList,
}
