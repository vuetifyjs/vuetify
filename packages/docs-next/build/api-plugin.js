// Imports
const VirtualModulesPlugin = require('webpack-virtual-modules')
const {
  generateAPI,
  generateCompList,
  generateLocaleList,
} = require('./api-gen')

const isProduction = process.env.NODE_ENV === 'production'

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

function genTableHeader (headers) {
  const headerLine = []
  const dividerLine = []

  for (const header of headers) {
    headerLine.push(`${capitalize(header)}`)
    dividerLine.push('---')
  }

  return [
    genRowString(headerLine),
    genRowString(dividerLine),
  ]
}

function genTableRow (headers, row) {
  const headerRow = []

  for (const header of headers) {
    if (header === 'source' && isProduction) continue

    let value = row[header]

    if (['default', 'value', 'signature'].includes(header)) {
      value = `\`${row[header]}\``
    } else if (header === 'name') {
      value = `<div class="font-weight-bold text-mono">${row[header]}</div>`
    } else if (header === 'type') {
      value = `<div class="text-mono">${row[header]}</div>`
    }

    headerRow.push(value || '')
  }

  return genRowString(headerRow)
}

function genRowString (row) {
  return `| ${row.join(' | ')} |`
}

function genTable (tableData) {
  const headers = Object.keys(tableData[0])
  const table = genTableHeader(headers)

  for (const row of tableData) {
    table.push(genTableRow(headers, row))
  }

  return `${table.join('\n')}\n\n`
}

function genFooter () {
  const footer = [
    '<up-next />',
    '<vuetify-ad />',
    '<contribute />',
  ]

  return `${footer.join('\n\n')}\n\n`
}

function createMdFile (component, data) {
  let str = ''

  str += genFrontMatter(component)
  str += `# ${component} API\n\n`

  for (const [header, value] of Object.entries(data)) {
    if (header === 'mixins') continue

    const headerLine = header === 'sass'
      ? '## SASS Variables\n'
      : `## ${capitalize(header)}\n`
    const table = genTable(value)
    str += headerLine
    str += table
  }

  str += genFooter()

  return str
}

const toJs = data => `module.exports = ${JSON.stringify(data)};`

function generateFiles () {
  const components = generateCompList()
  const files = {}
  const locales = generateLocaleList()

  for (const locale of locales) {
    const pages = {}

    for (const component of components) {
      const data = generateAPI(component, locale)
      const target = `/${locale}/api/${component}`

      files[`node_modules/@docs${target}.md`] = createMdFile(component, data)
      pages[`${target}/`] = component
    }

    files[`node_modules/@docs/${locale}/api/pages.js`] = toJs(pages)
  }

  return files
}

class ApiPlugin {
  apply (compiler) {
    const files = generateFiles()
    const virtualModules = new VirtualModulesPlugin(files)

    virtualModules.apply(compiler)
  }
}

module.exports = ApiPlugin
