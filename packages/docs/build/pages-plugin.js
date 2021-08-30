const { md } = require('./markdown-it')
const fm = require('front-matter')
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const mkdirp = require('mkdirp')

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

    generatedFiles[`node_modules/.cache/@docs/${lang}/pages.js`] = pages(files)

    if (initial) {
      fs.writeFileSync(path.resolve(`src/pages/${lang}.js`), `export default require.context('./${lang}', true, /\\.md$/)\n`)
    }
  }

  for (const [key, value] of Object.entries(generatedFiles)) {
    mkdirp(path.dirname(path.resolve(key))).then(() => {
      fs.writeFileSync(path.resolve(key), value)
    })
  }
}

class Plugin {
  apply (compiler) {
    generateFiles(true)

    let shouldWrite = false
    compiler.hooks.afterCompile.tapPromise('PagesPlugin', async () => {
      if (shouldWrite) {
        generateFiles()
        shouldWrite = false
      }
    })

    compiler.hooks.watchRun.tapPromise('PagesPlugin', async compiler => {
      shouldWrite = !!Object.keys(compiler.watchFileSystem.watcher.getTimeInfoEntries())
        .find(path => path.indexOf('src/pages'))
    })
  }
}

module.exports = Plugin
