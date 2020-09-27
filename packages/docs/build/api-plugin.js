// Imports
const fs = require('fs')
const { resolve } = require('path')
const { getApi, getCompleteApi } = require('@vuetify/api-generator')
const rimraf = require('rimraf')

const localeList = require('../src/i18n/locales').map(item => item.locale)

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function genFrontMatter (component) {
  const fm = [
    `title: ${component} API`,
    `description: API for the ${component} component.`,
    `keywords: ${component}, api, vuetify`,
  ]

  return `---\nmeta:\n${fm.map(s => '  ' + s).join('\n')}\n---\n\n`
}

function genHeader (component) {
  const header = [
    genFrontMatter(component),
    `# ${component} API\n\n`,
    '<entry-ad />',
  ]

  return `${header.join('\n\n')}\n\n`
}

function genFooter () {
  const footer = [
    '<backmatter />',
  ]

  return `${footer.join('\n\n')}\n\n`
}

const sanitize = str => str.replace(/\$/g, '')

function createMdFile (component, data, locale) {
  let str = ''

  str += genHeader(component)

  for (const [header, value] of Object.entries(data)) {
    if (['mixins', 'name'].includes(header) || !value.length) continue

    str += header === 'sass'
      ? '## SASS Variables\n'
      : `## ${capitalize(header)}\n`

    str += `<api-table name="${sanitize(component)}" field="${header}" />\n\n`
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

  fs.writeFileSync(resolve(`${folder}/${sanitize(componentName)}.js`), `module.exports = ${JSON.stringify(componentApi, null, 2)}`)
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
    ...api.filter(item => item.component || item.name === '$vuetify').map(item => item.name),
  ]))
}

class ApiPlugin {
  apply (compiler) {
    rimraf.sync(resolve('src/api'))

    generateFiles()

    let changedFiles = []
    const sourcePaths = [resolve('../api-generator/src/maps'), (resolve('../api-generator/src/locale/en'))]

    compiler.hooks.afterCompile.tap('ApiPlugin', compilation => {
      sourcePaths.forEach(sourcePath => compilation.contextDependencies.add(sourcePath))
    })

    compiler.hooks.watchRun.tap('ApiPlugin', async comp => {
      const changedTimes = comp.watchFileSystem.watcher.mtimes

      changedFiles = Object.keys(changedTimes).filter(filePath => {
        return sourcePaths.some(path => filePath.startsWith(path))
      })

      // Make sure api-gen is using latest files
      changedFiles.forEach(filePath => {
        delete require.cache[filePath]
      })
    })

    compiler.hooks.compilation.tap('ApiPlugin', () => {
      if (!changedFiles.length) return

      for (const filePath of changedFiles) {
        const matches = /[/\\]([-a-z]+|\$vuetify)\.js(?:on)?$/i.exec(filePath)
        const [_, componentName] = matches
        const componentApi = getApi(componentName, localeList)
        writeData(componentName, componentApi)
      }

      changedFiles = []
    })
  }
}

module.exports = ApiPlugin
