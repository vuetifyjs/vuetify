// Utilities

const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const { camelCase, upperCase } = require('lodash')

function parse (type, lang, value) {
  return { type, lang, value }
}

function getNodeType (node) {
  switch (true) {
    case node.startsWith(' '): return ''
    case node.startsWith('></'): return ''
    case node.startsWith('<br>'): return 'break'
    case node.startsWith('#'): return 'heading'
    case node.startsWith('>'): return 'alert'
    case node.startsWith('<!--'): return 'comment'
    case node.startsWith('<'): return 'component'
    case node.startsWith('```'): return 'code'
    case node.startsWith('!'): return 'img'
    default: return 'text'
  }
}

function getLineMethod (node) {
  switch (getNodeType(node)) {
    case 'alert': return parseAlert
    case 'component': return parseComponent
    case 'heading': return parseHeading
    case 'img': return parseImg
    case 'code': return parseCode
    case 'text': return parseText
    default: return () => {}
  }
}

function parseAlert (index, page) {
  const node = page[index]

  const [value, lang] = node
    .replace(/>/, '')
    .split(' ')

  return parse('alert', camelCase(lang), value)
}

function parseComponent (index, page) {
  const node = page[index]
  const [,type] = node.match(/^<([a-z|-]*)/)
  const stopRE = `</${type}>`
  const stop = node.indexOf(stopRE) > -1
    ? index
    : page.findIndex(line => line.indexOf(stopRE) > -1)
  const values = (
    (
      page
        .slice(index, stop + 1)
        .join(' ')
        .match(/value="(.*)".+><\//) || []
    )[1] || ''
  ).replace(/'/g, '"')

  return parse(type, undefined, values && JSON.parse(values))
}

function parseHeading (index, page) {
  const node = page[index]
  const [, lang] = node.split(' ')

  return parse('heading', camelCase(lang))
}

function parseImg (index, page) {
  const node = page[index]
  const regexp = new RegExp(/!\[(.*)\]\((.*)\)/)

  const [lang, value] = node.match(regexp).slice(1, 3)

  return parse('img', camelCase(lang), value)
}

function parseCode (index, page) {
  const type = page[index].replace(/```/g, '')
  const file = page[index + 1].trim()
  const value = `${type}_${file.replace(/-/g, '_')}`

  return parse('markup', undefined, value)
}

function parseText (index, page) {
  const node = page[index]
  const text = camelCase(node)

  return parse('text', text)
}

function genSection (children = []) {
  return {
    type: 'section',
    children: children.filter(c => c),
  }
}

function isHeading (node) {
  return getNodeType(node) === 'heading'
}

function isBreak (node) {
  return getNodeType(node) === 'break'
}

function parseLine (index, page) {
  const node = page[index]

  return getLineMethod(node)(index, page)
}

function shouldParse (line) {
  return (
    line &&
    line !== '```' &&
    !line.startsWith(' ')
  )
}

module.exports = function (content) {
  this.cacheable()

  const page = content.split('\n')
    .filter(v => v)

  const output = []
  let children = []

  page.forEach((line, index) => {
    if (!shouldParse(line)) return

    const parsed = parseLine(index, page)

    // Push regular lines
    if (isHeading(line) || isBreak(line)) {
      children.length && output.push(
        genSection(children)
      )

      children = []
    }

    children.push(parsed)
  })

  children.length && output.push(
    genSection(children)
  )

  const json = { children: output }

  return 'module.exports = ' + JSON.stringify(json, null, 2)
}
