"use strict"
const pug = require('pug')
const walk = require('pug-walk')
const compiler = require('vue-template-compiler')

module.exports = function (content) {
  this.cacheable()

  let ast
  pug.render(content, {
    compileDebug: false,
    filename: this.resourcePath,
    plugins: [{
      preFilters (_ast) {
        ast = _ast

        // Skip fully compiling the template
        return { type: 'Block', nodes: [], line: 0 }
      }
    }]
  })

  const page = { children: [] }
  let pageSection

  function startSection () {
    pageSection = {
      type: 'section',
      children: [],
    }
    page.children.push(pageSection)
  }

  const parents = []
  walk(ast, node => {
    const name = node.name || ''

    if (!pageSection || name.startsWith('h') || [
      'accessibility',
      'api',
      'examples',
      'parameters',
      'supplemental',
      'up-next',
      'usage',
      'usage-new',
    ].includes(name)) {
      startSection()
    }
    switch (node.type) {
      case 'Tag':
        if (name.startsWith('h')) {
          pageSection.children.push({
            type: 'heading',
            lang: node.block.nodes[0].val
          })
        } else if (node.name === 'code') {
          const lang = eval(node.attrs.find(attr => attr.name === 'lang').val)
          const src = eval(node.attrs.find(attr => attr.name === 'src').val)

          pageSection.children.push({
            type: 'markup',
            value: `${lang}_${src}`
          })
        } else {
          // Pug doesn't deal with attrs in a way that I like, so we're going
          // to pass them through vue's compiler to deal with binding for us
          // First concat them back into a name="val" string (would be easier if we had proper location data on the AST)
          const attrs = node.attrs.reduce((acc, attr) => acc + `${attr.name}="${eval(`(${attr.val})`)}" `, '')
          // Run that through vue-template-compiler
          const parsedAttrs = (compiler.compile(`<${node.name} ${attrs}/>`)
            // Then eval() a bound object or array into an actual object instead of a string
            // This is like JSON.parse() but with JS instead of JSON
            .ast.attrs || []).reduce((acc, attr) => (acc[attr.name] = eval(`(${attr.value})`), acc), {})
          const lang = node.block.nodes[0] && node.block.nodes[0].val
          const tag = { type: node.name, lang, ...parsedAttrs }
          pageSection.children.push(tag)
        }
        return false

      case 'Text':
        const lang = node.val.trim()
        if (lang) {
          pageSection.children.push({
            type: 'text',
            lang: node.val,
          })
        }
        break

      case 'Block':
        break

      default:
        throw new Error(`Unexpected token "${node.type}" on line ${node.line}`)
    }
  }, null, { parents })

  return 'module.exports = ' + JSON.stringify(page, null, 2)
}
