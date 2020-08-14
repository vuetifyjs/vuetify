const { differenceInDays, format, toDate } = require('date-fns')
const { md } = require('./markdown-it')
const fm = require('front-matter')
const fs = require('fs')
const GitDateExtractor = require('git-date-extractor')
const glob = require('glob')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
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

async function getModified () {
  const timestamps = await GitDateExtractor.getStamps({
    projectRootPath: resolve('../src/pages/en'),
  })

  const modified = Object.keys(timestamps).reduce((pages, path) => {
    let { created, modified } = timestamps[path]

    path = path
      .replace(/\.md/g, '')
      .replace(/\/[a-z]+\//, '')

    modified = toDate(modified * 1000)
    created = toDate(created * 1000)

    const now = Date.now()

    pages[`/${path}/`] = {
      created: format(created, 'P, pp'),
      modified: format(modified, 'P, pp'),
      recent: differenceInDays(now, created) < 7,
      stale: differenceInDays(now, modified) > 15,
    }

    return pages
  }, {})

  return modified
}

function generateFiles () {
  const generatedFiles = {}
  const langDirectories = glob.sync('./src/pages/*')

  const pages = files => `module.exports = ${JSON.stringify(getPages(files))};`

  for (const langDir of langDirectories) {
    const files = glob.sync(`${langDir}/**/*.md`)
    const lang = path.basename(langDir)

    generatedFiles[`node_modules/@docs/${lang}/pages.js`] = pages(files)
  }

  return generatedFiles
}

class Plugin {
  apply (compiler) {
    const files = generateFiles()
    let shouldWrite = false
    let shouldWriteModified = true

    files['node_modules/@docs/modified'] = 'module.exports = {};'

    const virtualModules = new VirtualModulesPlugin(files)

    virtualModules.apply(compiler)

    compiler.hooks.afterCompile.tapPromise('PagesPlugin', async () => {
      if (shouldWriteModified) {
        const modified = await getModified()

        virtualModules.writeModule(
          'node_modules/@docs/modified',
          `module.exports = ${JSON.stringify(modified)};`,
        )

        shouldWriteModified = false
      }

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
