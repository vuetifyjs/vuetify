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
        description: 'Puts a border on the alert. Accepts **top** | **right** | **bottom** | **left**.',
      },
      {
        name: 'closeLabel',
        type: 'string',
        default: "'$vuetify.close'",
        source: 'v-alert',
        description: 'Text used for *aria-label* on **dismissible** alerts. Can also be customizing globally in [Internationalization](/customization/internationalization).',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
      },
      {
        name: 'coloredBorder',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
        description: 'Applies the defined **color** to the alert\'s border.',
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
        description: 'Hides the alert icon and decreases component\'s height.',
      },
      {
        name: 'dismissible',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
        description: 'Adds a close icon that can hide the alert.',
      },
      {
        name: 'elevation',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'elevatable',
        description: 'Designates an elevation applied to the component between 0 and 24. You can find more information on the [elevation page](/styles/elevation).',
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: 'Sets the height for the component.',
      },
      {
        name: 'icon',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-alert',
        description: 'Designates a specific icon.',
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: 'Applies the light theme variant to the component.',
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: 'Sets the maximum height for the component.',
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: 'Sets the maximum width for the component.',
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: 'Sets the minimum height for the component.',
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: 'Sets the minimum width for the component.',
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitionable',
        description: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
      },
      {
        name: 'origin',
        type: 'string',
        default: 'undefined',
        source: 'transitionable',
        description: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: 'Makes the background transparent and applies a thin border.',
      },
      {
        name: 'prominent',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
        description: 'Displays a larger vertically centered icon to draw more attention.',
      },
      {
        name: 'tag',
        type: 'string',
        default: "'div'",
        source: 'v-sheet',
        description: 'Specify a custom tag used on the root element.',
      },
      {
        name: 'text',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
        description: 'Applies the defined **color** to text and a low opacity background of the same.',
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'roundable',
        description: 'Removes the component\'s border-radius.',
      },
      {
        name: 'transition',
        type: 'string',
        default: 'undefined',
        source: 'transitionable',
        description: 'Sets the component transition. Can be one of the [built in transitions](/styles/transitions) or one your own.',
      },
      {
        name: 'type',
        type: 'string',
        default: 'undefined',
        source: 'v-alert',
        description: 'Specify a **success**, **info**, **warning** or **error** alert. Uses the contextual color and has a pre-defined icon.',
      },
      {
        name: 'value',
        type: 'boolean',
        default: 'true',
        source: 'toggleable',
        description: 'Controls whether the component is visible or hidden.',
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: 'Sets the width for the component.',
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
        description: 'Slot for icon at end of alert.',
      },
      {
        name: 'close',
        props: {
          toggle: 'Function',
        },
        description: 'Slot for icon used in **dismissible** prop.',
      },
      {
        name: 'prepend',
        description: 'Slot for icon at beginning of alert.',
      },
      {
        name: 'default',
        description: 'The default Vue slot.',
      },
    ],
    events: [
      {
        name: 'input',
        value: 'boolean',
        description: 'The updated bound model',
      },
    ],
    functions: [
      {
        name: 'toggle',
        signature: '(): void',
        description: 'Toggles the alert\'s active state. Available in the close slot and used as the click action in **dismissible**.',
      },
    ],
    sass: [
      {
        name: '$alert-border-opacity',
        default: '0.26 !default;',
        description: '',
      },
      {
        name: '$alert-border-radius',
        default: '$border-radius-root !default;',
        description: '',
      },
      {
        name: '$alert-border-width',
        default: '4px !default;',
        description: '',
      },
      {
        name: '$alert-dense-border-width',
        default: 'medium !default;',
        description: '',
      },
      {
        name: '$alert-font-size',
        default: '16px !default;',
        description: '',
      },
      {
        name: '$alert-icon-size',
        default: '24px !default;',
        description: '',
      },
      {
        name: '$alert-margin',
        default: '16px !default;',
        description: '',
      },
      {
        name: '$alert-outline',
        default: 'thin solid currentColor !default;',
        description: '',
      },
      {
        name: '$alert-padding',
        default: '16px !default;',
        description: '',
      },
      {
        name: '$alert-prominent-icon-font-size',
        default: '32px !default;',
        description: '',
      },
      {
        name: '$alert-prominent-icon-size',
        default: '48px !default;',
        description: '',
      },
    ],
  },
}

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
  const stream = createWriteStream(`${root}/${file}.md`)

  // gen front-matter
  const frontMatter = genFrontMatter()
  const title = '# V-Alert API\n\n'
  const footer = genFooter()

  stream.once('open', () => {
    stream.write(frontMatter)
    stream.write(title)
    for (const [header, value] of Object.entries(data)) {
      if (header !== 'mixins') {
        const headerLine = header === 'sass'
          ? '## SASS Variables\n'
          : `## ${capitalize(header)}\n`
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
  writeMdFile(comp, value)
}

console.log('finished')
