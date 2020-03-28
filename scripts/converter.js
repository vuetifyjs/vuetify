// Utilities
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const stringify = require('stringify-object')
const resolve = file => path.resolve(__dirname, file)

function genCode (value) {
  const [lang, name] = value.split('_', 2)

  return `:code(${lang} src="${name}")`
}

function parse (child) {
  const {
    lang,
    type,
    value,
  } = child

  switch (type) {
    case 'alert': return `alert(value="${value}") lang`
    case 'heading': return `h2 lang`
    case 'markup': return genCode(value)
    case 'text': return `| ${lang}`
  }

  let ret = 'type'

  if (value) {
    ret += ' ('
    if (typeof value === 'string') {
      ret += `value="${value}"`
    } else if (typeof value === 'object') {
      ret += `value=\`${stringify(value, { indent: '  ' })}\``
    }
    ret += ')'
  }
  if (lang) ret += ` ${lang}`

  return ret
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

  fs.writeFileSync(loc(`${path}.pug`), children, 'utf8')
  fs.unlinkSync(file)
}
