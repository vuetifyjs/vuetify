// Utilities
const { kebabCase } = require('lodash')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const resolve = file => path.resolve(__dirname, file)

function genCode (value) {
  const [file, ...strings] = value.split('_')

  return `\`\`\`${file}
  ${strings.join('-')}
\`\`\``
}

function parse (child) {
  const {
    lang,
    type,
    value,
  } = child

  switch (type) {
    case 'alert': return `>${value} ${lang}`
    case 'heading': return `## ${lang}`
    case 'markup': return genCode(value)
    case 'text': return kebabCase(lang)
  }

  // Assumed custom component
  const values = value ? ` values="${JSON.stringify(value).replace(/"/g, "'")}"` : ''

  return `<${type}${values}></${type}>`
}

function recurse (children = []) {
  return children.reduce((acc, cur) => {
    if (cur.children && cur.children.length) {
      acc = [].concat(acc, recurse(cur.children))
    } else {
      acc.push(parse(cur))
    }

    return acc
  }, [])
}

const loc = str => resolve(`../packages/docs/src/data/pages/${str}`)
const files = glob.sync(resolve(`../packages/docs/src/data/pages/**/*.json`))

for (const file of files) {
  const path = file
    .split('/pages/')
    .pop()
    .split('/')
    .map(i => i.replace(/\.json/, ''))
    .join('/')
  const read = JSON.parse(fs.readFileSync(loc(`${path}.json`), 'utf8'))
  const children = recurse([read]).join('\n\n')

  fs.writeFileSync(loc(`${path}.md`), children, 'utf8')
  fs.unlinkSync(file)
}
