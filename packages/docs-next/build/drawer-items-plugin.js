const frontmatter = require('front-matter')
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const VirtualModulesPlugin = require('webpack-virtual-modules')
const { kebabCase } = require('lodash')

const getItems = (files) => {
  return files.reduce((pages, filePath) => {
    const { attributes } = frontmatter(fs.readFileSync(filePath, 'utf-8'))

    if (!attributes.nav) return pages

    const dir = path.dirname(filePath.replace('./src/pages/en', ''))
    const file = kebabCase(path.basename(filePath, path.extname(filePath)))
    const group = dir.slice(1)
    const to = `${dir}/${file}`
    // If nav is boolean, get from fm title
    const title = typeof attributes.nav === 'boolean'
      ? attributes.title
      : attributes.nav

    pages[group] = pages[group] || []
    pages[group].push({ title, to })

    return pages
  }, {})
}

class Plugin {
  apply (compiler) {
    let shouldWrite = false
    const files = glob.sync('./src/pages/en/**/*.md')
    const content = files => `module.exports = ${JSON.stringify(getItems(files))};`

    const virtualModules = new VirtualModulesPlugin({
      'node_modules/@docs/pages.js': content(files),
    })

    virtualModules.apply(compiler)

    compiler.hooks.compilation.tap('@docs/pages', () => {
      if (!shouldWrite) return

      virtualModules.writeModule('node_modules/@docs/pages.js', content(files))

      shouldWrite = false
    })

    compiler.hooks.watchRun.tap('@docs/pages', (comp) => {
      const changedTimes = comp.watchFileSystem.watcher.mtimes
      const changedFiles = Object.keys(changedTimes)
        .filter(file => files.find(f => f.indexOf(path.basename(file)) >= 0))

      if (changedFiles.length) {
        shouldWrite = true
      }
    })
  }
}

module.exports = Plugin
