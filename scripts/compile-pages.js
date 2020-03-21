// Utilities

const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const marked = require('marked')
const { camelCase, upperCase } = require('lodash')

marked.setOptions({
  headerIds: false,
})

function parse (type, lang, value) {
  return { type, lang, value }
}

function getNodeType (node) {
  switch (true) {
    case node.startsWith('<br>'): return 'break'
    case node.startsWith('#'): return 'heading'
    case node.startsWith('>'): return 'alert'
    case node.startsWith('<'): return 'comment'
    case node.startsWith('**'): return 'component'
    case node.startsWith('`'): return 'snippet'
    case node.startsWith('!'): return 'img'
    case node.startsWith(' '): return ''
    default: return 'text'
  }
}

function getLineMethod (node) {
  switch (getNodeType(node)) {
    case 'alert': return parseAlert
    case 'comment': return parseComment
    case 'component': return parseComponent
    case 'heading': return parseHeading
    case 'img': return parseImg
    case 'snippet': return parseSnippet
    case 'break': return parseBreak
    case 'text': return parseText
    default: return () => {}
  }
}

function parseAlert (node) {
  const [value, lang] = node
    .replace(/>/, '')
    .split(' ')

  return parse('alert', camelCase(lang), value)
}

function parseComment () {
  return undefined
}

function parseBreak () {
  return undefined
}

function parseComponent (node, page) {
  const index = page.indexOf(node)
  const values = []

  for (const line of page.slice(index + 1)) {
    if (!line.startsWith('  * ')) break

    values.push(line.replace('  * ', ''))
  }

  return parse(node.replace(/\*\*/g, ''), undefined, values)
}

function parseHeading (node) {
  const [, lang] = node.split(' ')

  return parse('heading', camelCase(lang))
}

function parseImg (node) {
  const regexp = new RegExp(/!\[(.*)\]\((.*)\)/)

  const [lang, value] = node.match(regexp).slice(1, 3)

  return parse('img', camelCase(lang), value)
}

function parseSnippet (node) {
  const value = node
    .replace(/(`|-|\s)/g, (matched, i, original) => {
      if (matched === '`') return ''
      if (['-', ' '].includes(matched)) return '_'
      return matched
    })

  return parse('markup', undefined, value)
}

function parseText (node) {
  const text = camelCase(node)

  return parse('text', text)
}

function genSection (children = []) {
  return {
    type: 'section',
    children,
  }
}

function isHeading (node) {
  return getNodeType(node) === 'heading'
}

function isBreak (node) {
  return getNodeType(node) === 'break'
}

function setup () {
  const path = '../packages/docs/src/data/pages-new/getting-started/QuickStart.md'

  return fs.readFileSync(resolve(path), 'utf8')
    .split('\n')
    .filter(v => v)
}

function parseLine (node, page) {
  return getLineMethod(node)(node, page)
}

function run () {
  const page = setup()
  const output = []
  let children = []

  for (const line of page) {
    const parsed = parseLine(line, page)

    // Don't push empty lines
    if (!parsed && !isBreak(line)) continue

    // Push regular lines
    if (isHeading(line) || isBreak(line)) {
      children.length && output.push(
        genSection(children)
      )

      children = []
    }

    children.push(parsed)
  }

  children.length && output.push(
    genSection(children)
  )

  const json = { children: output }

  fs.writeFileSync(resolve('../packages/docs/src/data/pages/getting-started/QuickStart.json'), JSON.stringify(json, 2, 2), 'utf8')
}

run()
