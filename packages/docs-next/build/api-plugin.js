// Imports
const fs = require('fs')
const { resolve } = require('path')
const api = require('./api')
const sassApi = require('./sass-api')
const genTable = require('../src/util/tables')
const rimraf = require('rimraf')

/* const camelizeRE = /-(\w)/g
const camelize = str => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
} */

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/* const hyphenateRE = /\B([A-Z])/g
function hyphenate (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
} */

function genFrontMatter (component) {
  const fm = [
    `title: ${component} API`,
    `description: API for the ${component} component.`,
    `keywords: ${component}, api, vuetify`,
  ]

  return `---\n${fm.join('\n')}\n---\n\n`
}

function genFooter () {
  const footer = [
    '<backmatter />',
  ]

  return `${footer.join('\n\n')}\n\n`
}

function createMdFile (component, data, locale) {
  let str = ''

  str += genFrontMatter(component)
  str += `# ${component} API\n\n`

  if (sassApi[component]) {
    data.sass = sassApi[component]
  }

  for (const [header, value] of Object.entries(data)) {
    if (header === 'mixins' || !value.length) continue

    const headerLine = header === 'sass'
      ? '## SASS Variables\n'
      : `## ${capitalize(header)}\n`
    const table = genTable(value, locale)
    str += headerLine
    str += table
  }

  str += genFooter()

  return str
}

function writeFile (component, locale) {
  const data = api[component]
  const folder = `src/api/${locale}`

  if (!fs.existsSync(resolve(folder))) {
    fs.mkdirSync(resolve(folder), { recursive: true })
  }

  const file = `${folder}/${component}.md`

  fs.writeFileSync(resolve(file), createMdFile(component, data, locale))
}

const generateLocaleList = () => fs.readdirSync(resolve('./src/pages'))

function generateFiles () {
  const components = Object.keys(api)
  const files = {}
  const locales = generateLocaleList()

  for (const locale of locales) {
    const pages = {}

    for (const component of components) {
      writeFile(component, locale)

      pages[`/${locale}/api/${component}/`] = component
    }

    fs.writeFileSync(resolve(`src/api/${locale}/pages.json`), JSON.stringify(pages, null, 2))
  }

  return files
}

class ApiPlugin {
  apply (compiler) {
    rimraf.sync(resolve('src/api'))

    generateFiles()

    let changedFiles = []
    const sourcePath = resolve('build/api-gen')

    compiler.hooks.afterCompile.tap('ApiPlugin', compilation => {
      compilation.contextDependencies.add(sourcePath)
    })

    compiler.hooks.watchRun.tap('ApiPlugin', async (comp) => {
      const changedTimes = comp.watchFileSystem.watcher.mtimes

      changedFiles = Object.keys(changedTimes).filter(filePath => filePath.startsWith(sourcePath))
    })

    compiler.hooks.compilation.tap('ApiPlugin', () => {
      if (!changedFiles.length) return

      for (const filePath of changedFiles) {
        if (filePath.indexOf('maps') >= 0) {
          // re-generate all locales
          const matches = /[/\\]([-a-z]+)\.js$/i.exec(filePath)
          const [_, component] = matches
          for (const locale of generateLocaleList()) {
            writeFile(component, locale)
          }
        } else if (filePath.indexOf('locale') >= 0) {
          // re-generate only specific locale
          const matches = /[/\\]([-a-z]+)[/\\]([-a-z]+)\.json$/i.exec(filePath)
          const [_, locale, component] = matches
          writeFile(component, locale)
        }
      }

      changedFiles = []
    })
  }
}

module.exports = ApiPlugin
