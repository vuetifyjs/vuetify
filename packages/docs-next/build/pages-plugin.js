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
    const { body } = frontmatter(readFile(filePath))
    const dir = filePath.replace(/^\.\/src\/pages/, '').replace(/\.\w+$/, '/')
    const tokens = md.parse(body)
    const firstIndex = tokens.findIndex(({ type }) => type === 'heading_open')
    const text = tokens[firstIndex + 1].content

    pages[dir] = text

    return pages
  }, {})
}

function getHeadings (files) {
  return files.reduce((headings, filePath) => {
    const file = readFile(filePath)
    const { body } = frontmatter(file)

    const category = path.dirname(filePath.replace(/^\.\/src\/pages\/\w+(-\w+)?\//, ''))
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

function generateFiles () {
  const generatedFiles = {}
  const langDirectories = glob.sync('./src/pages/*')

  const pages = files => `module.exports = ${JSON.stringify(getPages(files))};`
  const headings = files => `module.exports = ${JSON.stringify(getHeadings(files))};`

  for (const langDir of langDirectories) {
    const files = glob.sync(`${langDir}/**/*.md`)
    const lang = path.basename(langDir)

    generatedFiles[`node_modules/@docs/${lang}/pages.js`] = pages(files)
    generatedFiles[`node_modules/@docs/${lang}/headings.js`] = headings(files)
  }

  return generatedFiles
}

class Plugin {
  apply (compiler) {
    const files = generateFiles()
    let shouldWrite = false

    const virtualModules = new VirtualModulesPlugin(files)

    virtualModules.apply(compiler)

    compiler.hooks.compilation.tap('PagesPlugin', () => {
      if (!shouldWrite) return

      for (const [key, value] of Object.entries(generateFiles())) {
        virtualModules.writeModule(key, value)
      }

      shouldWrite = false
    })

    compiler.hooks.watchRun.tap('PagesPlugin', async (comp) => {
      const changedTimes = comp.watchFileSystem.watcher.mtimes
      const changedFiles = Object.keys(changedTimes).map(filePath => filePath.replace(/\\/g, '/'))
        .filter(filePath => filePath.indexOf('src/pages') >= 0)

      if (changedFiles.length) {
        shouldWrite = true
      }
    })
  }
}

module.exports = Plugin
