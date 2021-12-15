// Imports
const fs = require('fs')
const path = require('path')
const { resolve } = require('path')
const { startCase } = require('lodash')
const { getCompleteApi } = require('@vuetify/api-generator')
const rimraf = require('rimraf')

const localeList = require('../src/i18n/locales.json')
  .filter(item => item.enabled)
  .map(item => item.alternate || item.locale)

const pageToApi = require('../src/data/page-to-api')

function genApiLinks (component, header) {
  const links = Object.keys(pageToApi)
    .filter(page => pageToApi[page].includes(component))
    .reduce((acc, href) => {
      const name = href.split('/')[1]
      acc.push(`- [${startCase(name)}](/${href})`)
      return acc
    }, [])

  if (!links.length || !header) return ''

  const section = [
    `## ${header} {#links}`,
    links.join('\n'),
  ]

  return `${section.join('\n\n')}\n\n`
}

function genFrontMatter (component) {
  const fm = [
    `title: ${component} API`,
    `description: API for the ${component} component.`,
    `keywords: ${component}, api, vuetify`,
  ]

  return `---\nmeta:\n${fm.map(s => '  ' + s).join('\n')}\n---`
}

function genHeader (component) {
  const header = [
    genFrontMatter(component),
    `# ${component} API`,
    // '<entry-ad />', TODO: enable when component exists
  ]

  return `${header.join('\n\n')}\n\n`
}

function genFooter () {
  const footer = [
    '<backmatter />',
  ]

  return `${footer.join('\n\n')}\n`
}

const sanitize = str => str.replace(/\$/g, '')

function loadMessages (locale) {
  const prefix = path.resolve('./src/i18n/messages/')
  const fallback = require(path.join(prefix, 'en.json'))

  try {
    const messages = require(path.join(prefix, `${locale}.json`))

    return {
      ...fallback['api-headers'],
      ...(messages['api-headers'] || {}),
    }
  } catch (err) {
    return fallback['api-headers']
  }
}

function createMdFile (component, data, locale) {
  const messages = loadMessages(locale)
  let str = ''

  str += genHeader(component)
  str += genApiLinks(component, messages.links)

  for (const section of ['props', 'functions', 'events', 'slots', 'sass', 'options', 'argument', 'modifiers']) {
    if (Array.isArray(data[section]) && data[section].length) {
      str += `## ${messages[section]} {#${section}}\n\n`
      str += `<api-section name="${component}" section="${section}" />\n\n`
    }
  }

  str += genFooter()

  return str
}

function writeFile (componentName, componentApi, locale) {
  const folder = `src/api/${locale}`

  if (!fs.existsSync(resolve(folder))) {
    fs.mkdirSync(resolve(folder), { recursive: true })
  }

  fs.writeFileSync(resolve(`${folder}/${sanitize(componentName)}.md`), createMdFile(componentName, componentApi, locale))
}

function writeData (componentName, componentApi) {
  const folder = `src/api/data`

  if (!fs.existsSync(resolve(folder))) {
    fs.mkdirSync(resolve(folder), { recursive: true })
  }

  fs.writeFileSync(resolve(`${folder}/${componentName}.json`), JSON.stringify(componentApi, null, 2))
}

function generateFiles () {
  const api = getCompleteApi(localeList)

  for (const locale of localeList) {
    const pages = {}

    for (const item of api) {
      writeFile(item.name, item, locale)

      pages[`/${locale}/api/${sanitize(item.name)}/`] = item.name
    }

    fs.writeFileSync(resolve(`src/api/${locale}/pages.json`), JSON.stringify(pages, null, 2))
    fs.writeFileSync(resolve(`src/api/${locale}.js`), `export default require.context('./${locale}', true, /\\.md$/)`)
  }

  for (const item of api) {
    writeData(item.name, item)
  }

  fs.writeFileSync(resolve(`src/api/sass.json`), JSON.stringify([
    ...api.filter(item => item && item.sass && item.sass.length > 0).map(item => item.name),
  ]))
}

module.exports = function Api () {
  return {
    name: 'vuetify:api',
    buildStart () {
      rimraf.sync(resolve('src/api'))

      generateFiles()
    },
  }
}
