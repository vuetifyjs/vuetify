// Imports
const { readFileSync, readdirSync } = require('fs')
const { resolve } = require('path')
const { IS_DEBUG } = require('../../src/util/globals')

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
    // make sure we're getting latest version of file
    delete require.cache[resolve(`build/api-gen/maps/${comp}.js`)]
    const mapFile = require(`./maps/${comp}`)[comp]
    compMap = mapFile
  } catch (e) {
    IS_DEBUG && console.log(`map: ${comp} not found`)
  }
  // fs is not useable when accessing via component
  // will need to find an alternative for the
  // merging of lang, possibly change to js
  const localePath = resolve(__dirname, `./locale/${locale}/${comp}.json`)
  try {
    const localeFile = JSON.parse(readFileSync(localePath, 'utf8'))

    if (Object.keys(localeFile).length > 0) {
      compLocale = localeFile
    }
  } catch (e) {
    IS_DEBUG && console.log(`locale: ${locale} not found`)
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

module.exports = {
  generateAPI,
  generateCompList,
}
