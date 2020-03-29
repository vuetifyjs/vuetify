"use strict"
const pug = require('pug')
const walk = require('pug-walk')
const compiler = require('vue-template-compiler')

module.exports = function (content) {
  this.cacheable()

  const page = { children: [] }
  let pageSection

  function startSection () {
    pageSection = {
      type: 'section',
      children: [],
    }
    page.children.push(pageSection)
  }

  pug.render(content, {
    compileDebug: false,
    filename: this.resourcePath,
    filters: {
      code: text => text
    },
    plugins: [{
      preFilters (ast) {
        const parents = []
        walk(ast, node => {
          if (!pageSection || ['h2', 'up-next', 'usage', 'usage-new', 'api', 'examples'].includes(node.name)) {
            startSection()
          }
          switch (node.type) {
            case 'Tag':
              if (node.name === 'h2') {
                pageSection.children.push({
                  type: 'heading',
                  lang: node.block.nodes[0].val
                })
              } else if (node.name === 'code') {
                const lang = eval(node.attrs.find(attr => attr.name === 'lang').val)
                const src = eval(node.attrs.find(attr => attr.name === 'src').val)
                // TODO: inline code
                pageSection.children.push({
                  type: 'markup',
                  val: `${lang}_${src}`
                })
              } else {
                const attrs = node.attrs.reduce((acc, attr) => acc + `${attr.name}="${eval(`(${attr.val})`)}" `, '')
                const parsedAttrs = (compiler.compile(`<${node.name} ${attrs}/>`)
                  .ast.attrs || []).reduce((acc, attr) => (acc[attr.name] = eval(`(${attr.value})`), acc), {})
                const lang = node.block.nodes[0] && node.block.nodes[0].val
                const tag = { type: node.name, lang, ...parsedAttrs }
                pageSection.children.push(tag)
              }
              return false

            case 'Text':
              pageSection.children.push({
                type: 'text',
                lang: node.val,
              })
              break

            case 'Block':
              break

            default:
              throw new Error(`Unexpected token "${node.type}" on line ${node.line}`)
          }
        }, null, { parents })

        // Skip fully compiling the template
        return { type: 'Block', nodes: [], line: 0 }
      }
    }]
  })

  return 'module.exports = ' + JSON.stringify(page, null, 2)
}
