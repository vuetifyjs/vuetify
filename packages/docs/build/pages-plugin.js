const { md } = require('./markdown-it')
const fm = require('front-matter')
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const VirtualModulesPlugin = require('webpack-virtual-modules')

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

function generateFiles (initial = false) {
  const generatedFiles = {}
  const langDirectories = glob.sync('./src/pages/*/')

  const pages = files => `module.exports = ${JSON.stringify(getPages(files))};`

  for (const langDir of langDirectories) {
    const files = glob.sync(`${langDir}/**/*.md`)
    const lang = path.basename(langDir)

    generatedFiles[`node_modules/@docs/${lang}/pages.js`] = pages(files)

    if (initial) {
      fs.writeFileSync(path.resolve(`src/pages/${lang}.js`), `export default require.context('./${lang}', true, /\\.md$/)\n`)
    }
  }

  return generatedFiles
}

class Plugin {
  apply (compiler) {
    const files = generateFiles(true)
    let shouldWrite = false

    const virtualModules = new VirtualModulesPlugin(files)

    virtualModules.apply(compiler)

    compiler.hooks.afterCompile.tapPromise('PagesPlugin', async () => {
      if (!shouldWrite) return

      for (const [key, value] of Object.entries(generateFiles())) {
        virtualModules.writeModule(key, value)
      }

      shouldWrite = false
    })

    compiler.hooks.watchRun.tapPromise('PagesPlugin', async compiler => {
      shouldWrite = !!Object.keys(compiler.watchFileSystem.watcher.mtimes)
        .find(path => path.indexOf('src/pages'))
    })
  }
}

module.exports = Plugin
