// Imports
const { readFileSync, readdirSync } = require('fs')
const { resolve } = require('path')

// pseudo code to mock api-gen
function generateAPI (comp, locale) {
  const api = {}

  // defaults if file doesn't exist
  let compMap = {
    props: [{ name: 'empty', type: '', default: '', source: '' }],
    mixins: ['empty'],
    slots: [{ name: 'empty', props: '' }],
    events: [{ name: 'empty', value: '' }],
    functions: [{ name: 'empty', signature: '' }],
    sass: [{ name: 'empty', default: '' }],
  }
  let compLocale = {
    props: { empty: '' },
    slots: { empty: '' },
    events: { empty: '' },
    functions: { empty: '' },
    sass: { empty: '' },
  }

  try {
    const mapFile = require(`./maps/${comp}`)[comp]
    compMap = mapFile
    console.log(comp)
  } catch (e) {
    console.log(`map: ${comp} not found`)
  }
  const localePath = resolve(__dirname, `./locale/${locale}/${comp}.json`)
  try {
    const localeFile = JSON.parse(readFileSync(localePath, 'utf8'))
    compLocale = localeFile
  } catch (e) {
    console.log(`locale: ${locale} not found`)
  }

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
  const mapPath = resolve(__dirname, './locale/en')
  const files = readdirSync(mapPath, 'utf8')
  const compList = []
  for (const item of files) {
    compList.push(item.split('.')[0])
  }
  return compList
}

function generateLocaleList () {
  return ['en', 'eo-UY', 'sv-SE']
}

module.exports = {
  generateAPI,
  generateCompList,
  generateLocaleList,
}
