const { createWriteStream } = require('fs')

// just using v-alert api data that is exported from gen with description as a test
const mockApiData = {
  'v-alert': {
    props: [
      {
        name: 'border',
        type: 'string',
        default: 'undefined',
        source: 'v-alert',
        description: 'a',
      },
      {
        name: 'closeIcon',
        type: 'string',
        default: "'$cancel'",
        source: 'v-alert',
        description: 'b',
      },
      {
        name: 'closeLabel',
        type: 'string',
        default: "'$vuetify.close'",
        source: 'v-alert',
        description: 'c',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: '',
      },
      {
        name: 'coloredBorder',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
        description: '',
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: '',
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
        description: '',
      },
      {
        name: 'dismissible',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
        description: '',
      },
      {
        name: 'elevation',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'elevatable',
        description: '',
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: '',
      },
      {
        name: 'icon',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-alert',
        description: '',
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: '',
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: '',
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: '',
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: '',
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: '',
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitionable',
        description: '',
      },
      {
        name: 'origin',
        type: 'string',
        default: 'undefined',
        source: 'transitionable',
        description: '',
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: '',
      },
      {
        name: 'prominent',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
        description: '',
      },
      {
        name: 'rounded',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'roundable',
        description: '',
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: '',
      },
      {
        name: 'tag',
        type: 'string',
        default: "'div'",
        source: 'v-sheet',
        description: '',
      },
      {
        name: 'text',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
        description: '',
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'roundable',
        description: '',
      },
      {
        name: 'transition',
        type: 'string',
        default: 'undefined',
        source: 'transitionable',
        description: '',
      },
      {
        name: 'type',
        type: 'string',
        default: 'undefined',
        source: 'v-alert',
        description: '',
      },
      {
        name: 'value',
        type: 'boolean',
        default: 'true',
        source: 'toggleable',
        description: '',
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: '',
      },
    ],
    mixins: [
      'v-sheet',
      'colorable',
      'elevatable',
      'measurable',
      'roundable',
      'themeable',
      'toggleable',
      'transitionable',
    ],
    slots: [
      {
        name: 'append',
        description: '',
      },
      {
        name: 'close',
        props: {
          toggle: 'Function',
        },
        description: '',
      },
      {
        name: 'prepend',
        description: '',
      },
      {
        name: 'default',
        description: '',
      },
    ],
    events: [
      {
        name: 'input',
        value: 'boolean',
        description: '',
      },
    ],
    functions: [
      {
        name: 'toggle',
        signature: '(): void',
        description: '',
      },
    ],
  },
}

const camelizeRE = /-(\w)/g
const camelize = str => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
}

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const hyphenateRE = /\B([A-Z])/g
function hyphenate (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
}

function genFrontMatter () {
  const fm = [
    'layout: documentation',
    'title: V-Alert API',
    'description: API for the v-alert component.',
    'keywords: v-alert, alerts, api, vue alert component, vuetify alert component',
    'nav: v-alert-test',
  ]
  return `---\n${fm.join('\n')}\n---\n\n`
}

function genTableHeader (headers) {
  const headerLine = []
  const dividerLine = []
  for (const header in headers) {
    headerLine.push(capitalize(headers[header]))
    dividerLine.push('---')
  }
  return [
    genRowString(headerLine),
    genRowString(dividerLine),
  ]
}

function genTableRow (headers, row) {
  const headerRow = []
  for (const header in headers) {
    const value = !['name', 'type', 'source', 'description'].includes(headers[header])
      ? `\`\`\`${row[headers[header]]}\`\`\``
      : row[headers[header]]
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

  for (const row in tableData) {
    table.push(genTableRow(headers, tableData[row]))
  }

  return `${table.join('\n')}\n\n`
}

function genFooter () {
  const footer = [
    '<carbon-ad />',
    '<up-next />',
    '<vuetify-ad />',
    '<contribute />',
  ]
  return `${footer.join('\n\n')}\n\n`
}

function writeMdFile (file, data) {
  const root = './src/pages/en/api'
  const stream = createWriteStream(`${root}/${file}Test.md`)

  // gen front-matter
  const frontMatter = genFrontMatter()
  const title = '# V-Alert API\n\n'
  const footer = genFooter()

  stream.once('open', () => {
    stream.write(frontMatter)
    stream.write(title)
    for (const [header, value] of Object.entries(data)) {
      if (header !== 'mixins') {
        const headerLine = `## ${capitalize(header)}\n`
        const table = genTable(value)
        stream.write(headerLine)
        stream.write(table)
      }
    }
    stream.write(footer)
    // stream.write(JSON.stringify(obj, null, 2))
    stream.end()
  })
}

// generate md file
for (const [comp, value] of Object.entries(mockApiData)) {
  const file = capitalize(camelize(comp))
  writeMdFile(file, value)
}

console.log('finished')
