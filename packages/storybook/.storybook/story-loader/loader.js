const { parse } = require('@vue/component-compiler-utils');
const vueTemplateCompiler = require('vue-template-compiler');
const path = require('path');

function getAttribute (block, attribute) {
  if (!block.attrs) return null

  for (const attr of [attribute, `:${attribute}`]) {
    if (block.attrs[attr]) return block.attrs[attr]
  }

  return null
}

module.exports = function loader (source) {
  const filename = path.basename(this.resourcePath)
  const context = this.rootContext || process.cwd()
  const sourceRoot = path.dirname(path.relative(context, this.resourcePath))
  const descriptor = parse({
    source,
    compiler: vueTemplateCompiler,
    compilerParseOptions: { pad: "space" },
    filename,
    sourceRoot,
    needMap: false
  })

  let id = 0

  const defaultExport = descriptor.script.content.trim()
  const namedExports = descriptor.customBlocks.map(block => {
    const prefix = `export const ${block.attrs.name || `story${id++}`} = () => `
    const props = getAttribute(block, 'props')
    if (props) {
      return `${prefix}({ props: ${props}, template: \`${block.content.trim()}\` })`
    }
    return `${prefix}\`${block.content.trim()}\``
  }).join('\n')

  return `${defaultExport}\n${namedExports}`
}
