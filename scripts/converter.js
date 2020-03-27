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
    case 'alert': return `>${value} ${kebabCase(lang)}`
    case 'heading': return `## ${kebabCase(lang)}`
    case 'markup': return genCode(value)
    case 'text': return kebabCase(lang)
  }

  const string = value ? JSON.stringify(value, null, 2) : ''
  let values = ''

  if (string) {
    if (string.startsWith('[') || string.startsWith('{')) {
      values = `value="${string.replace(/"/g, "'")}"`
      values = `${values.slice(0, -2)}\xa0\xa0${values.slice(-2, -1)}"`
    } else {
      values = ` value=${string}`
    }
  }

  return `<${type}
\xa0\xa0${values}
></${type}>`
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
  // fs.unlinkSync(file)
}
