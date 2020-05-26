const frontmatter = require('front-matter')
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const { md } = require('./markdown-it')
const VirtualModulesPlugin = require('webpack-virtual-modules')
const { kebabCase } = require('lodash')

function readFile (filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

function getPages (files) {
  return files.reduce((pages, filePath) => {
    const { attributes } = frontmatter(readFile(filePath))

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

function getHeadings (files) {
  return files.reduce((headings, filePath) => {
    const file = readFile(filePath)
    const { body } = frontmatter(file)

    const category = path.dirname(filePath.replace('./src/pages/en/', ''))
    const page = kebabCase(path.basename(filePath, path.extname(filePath)))

    headings[category] = headings[category] || {}
    headings[category][page] = getPageHeadings(body)

    return headings
  }, {})
}

function getPageHeadings (page) {
  const headings = []
  const tokens = md.parse(page)
  const length = tokens.length

  for (let i = 0; i < length; i++) {
    const token = tokens[i]

    if (token.type !== 'heading_open') continue

    // heading level by hash length '###' === h3
    const level = token.markup.length
    const next = tokens[i + 1]
    const link = next.children[0]
    const text = next.content
    const [, href] = link.attrs.find(([attr]) => attr === 'href')

    headings.push({
      text,
      href,
      level,
    })
  }

  return headings
}

class Plugin {
  apply (compiler) {
    let shouldWrite = false
    const files = glob.sync('./src/pages/en/**/*.md')
    const pages = files => `module.exports = ${JSON.stringify(getPages(files))};`
    const headings = files => `module.exports = ${JSON.stringify(getHeadings(files))};`

    const virtualModules = new VirtualModulesPlugin({
      'node_modules/@docs/headings.js': headings(files),
      'node_modules/@docs/pages.js': pages(files),
    })

    virtualModules.apply(compiler)

    compiler.hooks.compilation.tap('@docs/pages', () => {
      if (!shouldWrite) return

      virtualModules.writeModule('node_modules/@docs/pages.js', pages(files))

      shouldWrite = false
    })

    compiler.hooks.compilation.tap('@docs/headings', () => {
      virtualModules.writeModule('node_modules/@docs/headings.js', headings(files))
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
