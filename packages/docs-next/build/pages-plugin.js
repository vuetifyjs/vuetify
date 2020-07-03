const { differenceInDays, format } = require('date-fns')
const { md } = require('./markdown-it')
const fm = require('front-matter')
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const VirtualModulesPlugin = require('webpack-virtual-modules')
const { EN_LOCALE_ONLY } = require('../src/util/globals')

function readFile (filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

function getPages (files) {
  return files.reduce((pages, filePath) => {
    const { body, attributes } = fm(readFile(filePath))
    const { nav, meta = {} } = attributes
    const dir = filePath.replace(/^\.\/src\/pages/, '').replace(/\.\w+$/, '/')
    const tokens = md.parse(body, {})
    const firstIndex = tokens.findIndex(({ type }) => type === 'heading_open')
    const nextIndex = firstIndex + 1
    const heading = (tokens[nextIndex] || {}).content || ''

    // If there is no provided title
    // generate one from the first
    // content found on the page
    pages[dir] = (
      nav ||
      heading ||
      meta.title
    )

    return pages
  }, {})
}

function getModified (files) {
  return files.reduce((pages, filePath) => {
    const file = fs.statSync(filePath)

    // console.log(file)
    const dir = filePath.replace(/^\.\/src\/pages/, '').replace(/\.\w+$/, '/')
    const now = new Date()
    const birth = file.birthtime
    const modified = file.mtime

    pages[dir] = {
      birth: format(birth, 'P, pp'),
      modified: format(modified, 'P, pp'),
      new: differenceInDays(now, birth) < 15,
      updated: differenceInDays(now, modified) < 30,
    }

    return pages
  }, {})
}

function generateFiles () {
  const generatedFiles = {}
  const langDirectories = glob.sync('./src/pages/*')

  const pages = files => `module.exports = ${JSON.stringify(getPages(files))};`
  const modified = files => `module.exports = ${JSON.stringify(getModified(files))};`

  for (const langDir of langDirectories) {
    if (EN_LOCALE_ONLY && !langDir.endsWith('/en')) continue

    const files = glob.sync(`${langDir}/**/*.md`)
    const lang = path.basename(langDir)

    generatedFiles[`node_modules/@docs/${lang}/pages.js`] = pages(files)
    generatedFiles[`node_modules/@docs/${lang}/modified.js`] = modified(files)
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
